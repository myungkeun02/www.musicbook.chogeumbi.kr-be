import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Admin } from './admin.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  album_art: string;

  @Column()
  youtube_link: string;

  @ManyToOne(() => Admin, (admin) => admin.id)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  update_at: Date;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  delete_at: Date;
}
