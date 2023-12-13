import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/entites/music.entity';
import { MusicController } from './music.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity])],
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService],
})
export class MusicModule {}
