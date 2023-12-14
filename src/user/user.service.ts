import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entites/user.entity';
import { CreateUserInputDTO } from './DTO/create-user-input.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(input: CreateUserInputDTO): Promise<UserEntity> {
    const user = await this.findOne(input.eamil);
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    const result = await this.userRepo.save({
      ...input,
    });
    return result;
  }

  async findOne(email): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }
}
