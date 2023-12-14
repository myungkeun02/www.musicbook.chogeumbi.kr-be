import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookie['refreshToken'];
        return cookie;
      },
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
