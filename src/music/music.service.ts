import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from 'src/commons/entites/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './DTO/create-music.dto';
import { UpdateMusicDto } from './DTO/update-music.dto';
import { PaginationOptionsDto } from './DTO/pagination-options.dto';

enum SortOptions {
  TITLE_ASC = 'title:asc',
  TITLE_DESC = 'title:desc',
  ARTIST_ASC = 'artist:asc',
  ARTIST_DESC = 'artist:desc',
  CREATED_AT_ASC = 'created_at:asc',
  CREATED_AT_DESC = 'created_at:desc',
}

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepo: Repository<MusicEntity>,
  ) {}

  async findAll(options: PaginationOptionsDto): Promise<MusicEntity[]> {
    const { page, limit, sort } = options;

    const queryBuilder = this.musicRepo.createQueryBuilder('music');

    if (sort) {
      const [column, order] = sort.split(':');
      const isValidSortOption = Object.values(SortOptions).includes(
        sort as SortOptions,
      );

      if (isValidSortOption) {
        queryBuilder.orderBy(
          `music.${column}`,
          order.toUpperCase() as 'ASC' | 'DESC',
        );
      } else {
        queryBuilder.orderBy('music.created_at', 'DESC');
      }
    }

    const musicList = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

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
