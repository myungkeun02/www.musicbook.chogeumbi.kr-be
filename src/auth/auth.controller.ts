import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginInputDTO } from './DTO/login-input.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { IOAuthUser } from './inferfaces/auth.userInterface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() input: LoginInputDTO, @Res() res: Response) {
    const user = await this.userService.findOne(input.eamil);

    if (!user) {
      throw new UnprocessableEntityException('이메일을 확인해주세요');
    }

    const isAuth = await bcrypt.compare(input.password, user.password);

    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호를 확인해주세요');
    }

    this.authService.setRefreshToken({ user, res });

    const jwt = this.authService.getAccessToken({ user });

    console.log(jwt);
    return res.status(200).send(jwt);
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  restoreAccessToken(@Req() req: Request & IOAuthUser) {
    return this.authService.getAccessToken({ user: req.user });
  }
}
