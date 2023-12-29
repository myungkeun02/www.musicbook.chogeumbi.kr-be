import { UserEntity } from 'src/commons/entity/user.entity';

export interface IOAuthUser {
  user: Pick<UserEntity, 'id' | 'email' | 'name'>;
}
