import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: {
      totalHits: number;
      timeToExpire: number;
      isBlocked: boolean;
    },
  ): Promise<void> {
    const response = context.switchToHttp().getResponse<Response>();

    // Add rate limit headers
    response.setHeader('X-RateLimit-Limit', throttlerLimitDetail.totalHits.toString());
    response.setHeader('X-RateLimit-Remaining', '0');
    response.setHeader('X-RateLimit-Reset', new Date(Date.now() + throttlerLimitDetail.timeToExpire * 1000).toISOString());
    response.setHeader('Retry-After', Math.ceil(throttlerLimitDetail.timeToExpire).toString());

    throw new ThrottlerException('Too Many Requests');
  }

  protected addHeaders(
    response: Response,
    totalHits: number,
    timeToExpire: number,
    limit: number,
  ): void {
    response.setHeader('X-RateLimit-Limit', limit.toString());
    response.setHeader('X-RateLimit-Remaining', Math.max(0, limit - totalHits).toString());
    response.setHeader('X-RateLimit-Reset', new Date(Date.now() + timeToExpire * 1000).toISOString());
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const response = context.switchToHttp().getResponse<Response>();

    try {
      const result = await super.canActivate(context);

      // Add headers for successful requests
      if (result) {
        // Get throttler options from metadata or use defaults
        const throttlerOptions = this.reflector.getAllAndOverride('throttler:options', [
          context.getHandler(),
          context.getClass(),
        ]) || { default: { limit: 100, ttl: 900000 } };

        const limit = throttlerOptions.default?.limit || 100;
        const ttl = throttlerOptions.default?.ttl || 900000;

        this.addHeaders(response, 1, ttl / 1000, limit);
      }

      return result;
    } catch (error) {
      if (error instanceof ThrottlerException) {
        throw error;
      }
      throw error;
    }
  }
}
