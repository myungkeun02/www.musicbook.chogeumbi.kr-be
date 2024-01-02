import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from 'src/commons/entity/music.entity';
import { MusicController } from './music.controller';

@Module({
  // TypeORM을 사용하여 MusicEntity를 주입하기 위한 모듈 설정
  imports: [TypeOrmModule.forFeature([MusicEntity])],

  // MusicController를 모듈에 등록
  controllers: [MusicController],

  // MusicService를 모듈에 등록
  providers: [MusicService],

  // MusicService를 다른 모듈에서 사용할 수 있도록 모듈 밖으로 공개
  exports: [MusicService],
})
export class MusicModule {}
