import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicEntity } from 'src/entites/music.entity';
import { CreateMusicDto } from './DTO/create-music.dto';
import { UpdateMusicDto } from './DTO/update-music.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  async getMusicList(): Promise<MusicEntity[]> {
    return await this.musicService.findAll();
  }
  // GET
  // /music
  // 노래 리스트

  @Get(':music_idx')
  async getMusicDetail(
    @Param('music_idx', ParseIntPipe) musicId: number,
  ): Promise<MusicEntity> {
    return await this.musicService.findOne(musicId);
  }
  // GET
  // /music/{music_idx}
  // 노래 상세정보 조회

  @UseGuards(AuthGuard('access'))
  @Post()
  async createMusic(
    @Body() createMusicDto: CreateMusicDto,
  ): Promise<MusicEntity> {
    return await this.musicService.createMusic(createMusicDto);
  }
  // POST
  // /music
  // 노래 추가

  @UseGuards(AuthGuard('access'))
  @Put(':music_idx')
  async updateMusic(
    @Param('music_idx', ParseIntPipe) musicId: number,
    @Body() updateMusicDto: UpdateMusicDto,
  ): Promise<MusicEntity> {
    return this.musicService.updateMusic(musicId, updateMusicDto);
  }
  // PUT
  // /music/{music_idx}
  // 노래 수정

  @UseGuards(AuthGuard('access'))
  @Delete(':music_idx')
  async deleteMusic(
    @Param('music_idx', ParseIntPipe) musicId: number,
  ): Promise<void> {
    return this.musicService.deleteMusic(musicId);
  }
  // DELETE
  // /music/{music_idx}
  // 노래 삭제
}

// GET
// /music/search/album_cover/{keyword}
// 앨범아트 검색
