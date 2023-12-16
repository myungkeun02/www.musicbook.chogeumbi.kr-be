import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from 'src/commons/entites/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './DTO/create-music.dto';
import { UpdateMusicDto } from './DTO/update-music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepo: Repository<MusicEntity>,
  ) {}

  async findAll(): Promise<MusicEntity[]> {
    const musicList = await this.musicRepo.find();
    return musicList;
  }

  async findOne(musicId): Promise<MusicEntity> {
    const music = await this.musicRepo.findOne({
      where: {
        id: musicId,
      },
    });
    return music;
  }

  async createMusic(createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    const music = this.musicRepo.create(createMusicDto);
    return this.musicRepo.save(music);
  }

  async updateMusic(
    musicId: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<MusicEntity> {
    const music = await this.findOne(musicId);
    return this.musicRepo.save({ ...music, ...updateMusicDto });
  }

  async deleteMusic(musicId: number): Promise<void> {
    const music = await this.findOne(musicId);
    await this.musicRepo.remove(music);
  }
}
