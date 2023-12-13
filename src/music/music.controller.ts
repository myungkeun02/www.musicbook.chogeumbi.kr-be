import { Controller, Get } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicEntity } from 'src/entites/music.entity';

@Controller('/music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  getMusicList(): Promise<MusicEntity[]> {
    return this.musicService.findAll();
  }
}
// GET
// /music
// 노래 리스트 (표준)

// POST
// /music
// 노래 추가

// GET
// /music/{music_idx}
// 노래 상세정보 조회

// PUT
// /music/{music_idx}
// 노래 수정

// DELETE
// /music/{music_idx}
// 노래 삭제

// GET
// /music/search/album_cover/{keyword}
// 앨범아트 검색
