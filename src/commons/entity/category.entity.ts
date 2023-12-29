import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('music')
export class MusicEntity {
  @PrimaryGeneratedColumn({ comment: '카테고리 고유 식별자' })
  id: number;

  @Column({ length: 255, nullable: false, comment: '카테고리 이름' })
  name: string;

  @Column({ length: 255, nullable: false, comment: '카테고리 색상' })
  color: string;
}
