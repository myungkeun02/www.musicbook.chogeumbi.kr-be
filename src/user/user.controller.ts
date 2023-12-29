import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/commons/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInputDTO } from './dto/create-user-input.dto';

@Controller('user')
export class UserController {
  PASSWORD_SALT = 10;
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() input: CreateUserInputDTO): Promise<UserEntity> {
    const hashedPassowrd = await bcrypt.hash(
      input.password,
      this.PASSWORD_SALT,
    );
    const hashUser = {
      ...input,
      password: hashedPassowrd,
    };
    console.log(hashUser);
    return this.userService.create(hashUser);
  }
}
