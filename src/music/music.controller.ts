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

  @Get()
  async getMusicList(
    @Query(new DefaultValuePipe(new PaginationOptionsDto()))
    options: PaginationOptionsDto,
  ): Promise<MusicEntity[]> {
    return await this.musicService.findAll(options);
  }

  @Get(':music_idx')
  async getMusicDetail(
    @Param('music_idx', ParseIntPipe) musicId: number,
  ): Promise<MusicEntity> {
    return await this.musicService.findOne(musicId);
  }

  @UseGuards(AuthGuard('access'))
  @Post()
  async createMusic(
    @Body() createMusicDto: CreateMusicDto,
  ): Promise<MusicEntity> {
    return await this.musicService.createMusic(createMusicDto);
  }

  @UseGuards(AuthGuard('access'))
  @Put(':music_idx')
  async updateMusic(
    @Param('music_idx', ParseIntPipe) musicId: number,
    @Body() updateMusicDto: UpdateMusicDto,
  ): Promise<MusicEntity> {
    return this.musicService.updateMusic(musicId, updateMusicDto);
  }

  @UseGuards(AuthGuard('access'))
  @Delete(':music_idx')
  async deleteMusic(
    @Param('music_idx', ParseIntPipe) musicId: number,
  ): Promise<void> {
    return this.musicService.deleteMusic(musicId);
  }
}
