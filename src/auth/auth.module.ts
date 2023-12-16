import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/commons/entites/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
