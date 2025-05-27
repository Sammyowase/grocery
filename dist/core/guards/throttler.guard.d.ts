import { ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';
export declare class CustomThrottlerGuard extends ThrottlerGuard {
    protected throwThrottlingException(context: ExecutionContext, throttlerLimitDetail: {
        totalHits: number;
        timeToExpire: number;
        isBlocked: boolean;
    }): Promise<void>;
    protected addHeaders(response: Response, totalHits: number, timeToExpire: number, limit: number): void;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
