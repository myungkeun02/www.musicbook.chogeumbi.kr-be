import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/entites/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity])],
  controllers: [],
  providers: [MusicService],
  exports: [MusicService],
})
export class AppModule {}
