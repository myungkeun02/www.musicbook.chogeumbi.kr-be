import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    comment: '유저 고유 식별자',
  })
  id: number;

  @Column({
    length: 255, //
    nullable: false,
    comment: '유저 이름',
  })
  name: string;

  @Column({
    length: 255,
    nullable: false,
    unique: true,
    comment: '유저 이메일',
  })
  email: string;

  @Column({
    length: 255, //
    nullable: false,
    comment: '유저 비밀번호 (암호화)',
  })
  password: string;

  @Column({
    length: 255, //
    nullable: true,
    comment: 'jwt 리프레시 토큰',
  })
  refresh_token: string;

  @CreateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
    comment: '생성일자',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
    comment: '계정 수정일자',
  })
  updated_at: Date;

  @Column({
    default: 0, //
    nullable: false,
    comment: '유저 삭제여부',
  })
  is_deleted: boolean;

  @DeleteDateColumn({
    type: 'datetime',
    precision: 6,
    nullable: true,
    comment: '유저 삭제일시',
  })
  deleted_at: Date;
}
