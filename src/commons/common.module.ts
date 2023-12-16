import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from './auth/jwt-access.strategy';

@Module({
  imports: [],
  providers: [JwtRefreshStrategy, JwtAccessStrategy],
  exports: [JwtRefreshStrategy, JwtAccessStrategy],
})
export class CommonModule {}
