import { UserEntity } from 'src/entites/user.entity';

export interface IOAuthUser {
  user: Pick<UserEntity, 'id' | 'email' | 'name'>;
}
