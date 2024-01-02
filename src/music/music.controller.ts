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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicEntity } from 'src/commons/entity/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationOptionsDto } from './dto/pagination-options.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  // 음악 목록을 가져오는 엔드포인트
  @Get()
  async getMusicList(
    @Query(new DefaultValuePipe(new PaginationOptionsDto()))
    options: PaginationOptionsDto,
    @Query('search') search: string,
    @Query('category') category: string,
  ): Promise<MusicEntity[]> {
    return await this.musicService.findAll(options, search, category);
  }

  // 특정 음악의 상세 정보를 가져오는 엔드포인트
  @Get(':music_idx')
  async getMusicDetail(
    @Param('music_idx', ParseIntPipe) musicId: number,
  ): Promise<MusicEntity> {
    return await this.musicService.findOne(musicId);
  }

  // 음악 생성 엔드포인트
  @UseGuards(AuthGuard('access'))
  @Post()
  async createMusic(
    @Body() createMusicDto: CreateMusicDto,
  ): Promise<MusicEntity> {
    return await this.musicService.createMusic(createMusicDto);
  }

  // 음악 업데이트 엔드포인트
  @UseGuards(AuthGuard('access'))
  @Put(':music_idx')
  async updateMusic(
    @Param('music_idx', ParseIntPipe) musicId: number,
    @Body() updateMusicDto: UpdateMusicDto,
  ): Promise<MusicEntity> {
    return await this.musicService.updateMusic(musicId, updateMusicDto);
  }

  // 음악 삭제 엔드포인트
  @UseGuards(AuthGuard('access'))
  @Delete(':music_idx')
  async deleteMusic(
    @Param('music_idx', ParseIntPipe) musicId: number,
  ): Promise<void> {
    return await this.musicService.deleteMusic(musicId);
  }
}
