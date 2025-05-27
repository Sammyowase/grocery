"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
let CustomThrottlerGuard = class CustomThrottlerGuard extends throttler_1.ThrottlerGuard {
    async throwThrottlingException(context, throttlerLimitDetail) {
        const response = context.switchToHttp().getResponse();
        response.setHeader('X-RateLimit-Limit', throttlerLimitDetail.totalHits.toString());
        response.setHeader('X-RateLimit-Remaining', '0');
        response.setHeader('X-RateLimit-Reset', new Date(Date.now() + throttlerLimitDetail.timeToExpire * 1000).toISOString());
        response.setHeader('Retry-After', Math.ceil(throttlerLimitDetail.timeToExpire).toString());
        throw new throttler_1.ThrottlerException('Too Many Requests');
    }
    addHeaders(response, totalHits, timeToExpire, limit) {
        response.setHeader('X-RateLimit-Limit', limit.toString());
        response.setHeader('X-RateLimit-Remaining', Math.max(0, limit - totalHits).toString());
        response.setHeader('X-RateLimit-Reset', new Date(Date.now() + timeToExpire * 1000).toISOString());
    }
    async canActivate(context) {
        const response = context.switchToHttp().getResponse();
        try {
            const result = await super.canActivate(context);
            if (result) {
                const throttlerOptions = this.reflector.getAllAndOverride('throttler:options', [
                    context.getHandler(),
                    context.getClass(),
                ]) || { default: { limit: 100, ttl: 900000 } };
                const limit = throttlerOptions.default?.limit || 100;
                const ttl = throttlerOptions.default?.ttl || 900000;
                this.addHeaders(response, 1, ttl / 1000, limit);
            }
            return result;
        }
        catch (error) {
            if (error instanceof throttler_1.ThrottlerException) {
                throw error;
            }
            throw error;
        }
    }
};
exports.CustomThrottlerGuard = CustomThrottlerGuard;
exports.CustomThrottlerGuard = CustomThrottlerGuard = __decorate([
    (0, common_1.Injectable)()
], CustomThrottlerGuard);
//# sourceMappingURL=throttler.guard.js.map