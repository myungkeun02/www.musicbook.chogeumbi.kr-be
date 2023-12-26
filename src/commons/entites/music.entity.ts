import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('music')
export class MusicEntity {
  @PrimaryGeneratedColumn({ comment: '음악 고유 식별자' })
  id: number;

  @Column({ length: 255, nullable: false, comment: '음악 이름' })
  title: string;

  @Column({ length: 255, nullable: false, comment: '음악 아티스트' })
  artist: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
    comment: '생성일시',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
    comment: '수정일시',
  })
  updated_at: Date;

  @Column({ default: 0, nullable: false, comment: '삭제여부' })
  is_deleted: boolean;

  @DeleteDateColumn({
    type: 'timestamp',
    precision: 6,
    nullable: true,
    comment: '삭제일시',
  })
  deleted_at: Date;

  @Column({ length: 255, nullable: false, comment: '앨범아트' })
  album_art: string;

  @Column({ length: 255, nullable: true, comment: '노래방 유튜브 링크' })
  karaoke_youtube_link: string;

  // 현재 페이지
  // 총 페이지
  
}
