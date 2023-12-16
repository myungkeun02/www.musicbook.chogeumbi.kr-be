import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInputDTO } from './DTO/create-user-input.dto';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/commons/entites/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(hashUser: CreateUserInputDTO): Promise<UserEntity> {
    const user = await this.findOne(hashUser.email);
    console.log(user);
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    const result = await this.userRepo.save({
      ...hashUser,
    });
    return result;
  }

  async findOne(email): Promise<any> {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }
}
