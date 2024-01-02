import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from 'src/commons/entity/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { PaginationOptionsDto } from './dto/pagination-options.dto';

// 음악 정렬 옵션을 나타내는 enum
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

  // 음악 목록을 페이징하여 반환하는 메서드
  async findAll(
    options: PaginationOptionsDto,
    search?: string,
    category?: string,
  ): Promise<MusicEntity[]> {
    const { page, limit, sort } = options;

    const queryBuilder = this.musicRepo.createQueryBuilder('music');

    // 검색어가 주어진 경우, 제목 또는 아티스트에 대한 검색 수행
    if (search) {
      queryBuilder.andWhere(
        '(music.title LIKE :search OR music.artist LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // 카테고리가 주어진 경우, 해당 카테고리의 음악만 필터링
    if (category) {
      queryBuilder.andWhere('music.category = :category', { category });
    }

    // 정렬 옵션이 주어진 경우, 해당 옵션에 따라 정렬
    if (sort) {
      const [column, order] = sort.split(':');
      const isValidSortOption = Object.values(SortOptions).includes(
        sort as SortOptions,
      );

      // 유효한 정렬 옵션이 주어진 경우, 해당 열 및 순서로 정렬
      if (isValidSortOption) {
        queryBuilder.orderBy(
          `music.${column}`,
          order.toUpperCase() as 'ASC' | 'DESC',
        );
      } else {
        // 그렇지 않은 경우, 생성 날짜를 기준으로 내림차순 정렬
        queryBuilder.orderBy('music.created_at', 'DESC');
      }
    }

    try {
      // 페이징 옵션을 적용하여 음악 목록을 조회
      const musicList = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();

      return musicList;
    } catch (error) {
      // 오류가 발생한 경우, 내부 서버 오류 예외를 던짐
      throw new InternalServerErrorException(
        '음악 목록을 가져오는 중에 오류가 발생했습니다.',
      );
    }
  }

  // 주어진 musicId에 해당하는 음악을 조회하는 메서드
  async findOne(musicId: number): Promise<MusicEntity> {
    // 유효한 musicId인지 확인
    if (!Number.isInteger(musicId) || musicId <= 0) {
      throw new BadRequestException('유효하지 않은 musicId입니다');
    }

    try {
      // 주어진 musicId에 해당하는 음악을 조회
      const music = await this.musicRepo.findOne({
        where: {
          id: musicId,
        },
      });

      return music;
    } catch (error) {
      // 오류가 발생한 경우, 내부 서버 오류 예외를 던짐
      throw new InternalServerErrorException(
        '음악을 찾는 중에 오류가 발생했습니다.',
      );
    }
  }

  // 주어진 데이터로 음악을 생성하는 메서드
  async createMusic(createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    try {
      // 주어진 데이터로 음악 엔터티를 생성하고 저장
      const music = this.musicRepo.create(createMusicDto);
      return await this.musicRepo.save(music);
    } catch (error) {
      // 오류가 발생한 경우, 내부 서버 오류 예외를 던짐
      throw new InternalServerErrorException(
        '음악을 생성하는 중에 오류가 발생했습니다.',
      );
    }
  }

  // 주어진 musicId에 해당하는 음악을 업데이트하는 메서드
  async updateMusic(
    musicId: number,
    updateMusicDto: UpdateMusicDto,
  ): Promise<MusicEntity> {
    // 주어진 musicId에 해당하는 음악을 조회
    const music = await this.findOne(musicId);

    try {
      // 주어진 업데이트 데이터로 음악을 업데이트 (부드러운 삭제 사용)
      return this.musicRepo.softRemove({ ...music, ...updateMusicDto });
    } catch (error) {
      // 오류가 발생한 경우, 내부 서버 오류 예외를 던짐
      throw new InternalServerErrorException(
        '음악을 업데이트하는 중에 오류가 발생했습니다.',
      );
    }
  }

  // 주어진 musicId에 해당하는 음악을 삭제하는 메서드
  async deleteMusic(musicId: number): Promise<void> {
    // 주어진 musicId에 해당하는 음악을 조회
    const music = await this.findOne(musicId);

    try {
      // 주어진 음악을 부드러운 삭제로 표시
      await this.musicRepo.softRemove(music);
    } catch (error) {
      // 오류가 발생한 경우, 내부 서버 오류 예외를 던짐
      throw new InternalServerErrorException(
        '음악을 삭제하는 중에 오류가 발생했습니다.',
      );
    }
  }
}
