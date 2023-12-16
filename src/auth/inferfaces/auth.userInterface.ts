import { UserEntity } from 'src/commons/entites/user.entity';

export interface IOAuthUser {
  user: Pick<UserEntity, 'id' | 'email' | 'name'>;
}
