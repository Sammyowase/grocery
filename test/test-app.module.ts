import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../src/auth/auth.module';
import { GroceryModule } from '../src/grocery/grocery.module';
import { HttpExceptionFilter } from '../src/core/filters/http-exception.filter';
import { CustomThrottlerGuard } from '../src/core/guards/throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI
        ? process.env.MONGODB_URI.replace(/\/[^\/]*$/, '/grocery-delivery-test')
        : 'mongodb://localhost:27017/grocery-delivery-test'
    ),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000, // 1 minute for testing
        limit: 1000, // High limit for testing
      },
    ]),
    AuthModule,
    GroceryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class TestAppModule {}
