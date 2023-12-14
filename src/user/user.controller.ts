import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/entites/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInputDTO } from './DTO/create-user-input.dto';

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
    const user = {
      ...input,
      password: hashedPassowrd,
    };

    return this.userService.create(user);
  }
}
