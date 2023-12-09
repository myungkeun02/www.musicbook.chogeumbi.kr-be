// music.service.ts
import {
  Injectable,
  //  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from '../entities/music.entity';
// import { MusicDto } from './dto/music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async getAllMusic(): Promise<Music[]> {
    return this.musicRepository.find();
  }

  async searchByTitle(title: string): Promise<Music[]> {
    return this.musicRepository.find({ where: { title: title } });
  }

  async searchByArtist(artist: string): Promise<Music[]> {
    return this.musicRepository.find({ where: { artist: artist } });
  }

  async sortByTitleAsc(): Promise<Music[]> {
    return this.musicRepository.find({ order: { title: 'ASC' } });
  }

  async getByCategory(categoryId: number): Promise<Music[]> {
    return this.musicRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  async sortByArtistAsc(): Promise<Music[]> {
    return this.musicRepository.find({ order: { artist: 'ASC' } });
  }

  async sortByDateAsc(): Promise<Music[]> {
    return this.musicRepository.find({ order: { create_at: 'ASC' } });
  }

  // async getMusicById(id: number): Promise<Music> {
  //   const music = await this.musicRepository.findOne(id);
  //   if (!music) {
  //     throw new NotFoundException(`Music with ID ${id} not found`);
  //   }
  //   return music;
  // }

  // async createMusic(musicDto: MusicDto): Promise<Music> {
  //   const music = this.musicRepository.create(musicDto);
  //   return this.musicRepository.save(music);
  // }

  // async updateMusic(id: number, musicDto: MusicDto): Promise<Music> {
  //   await this.getMusicById(id); // Ensure music exists
  //   await this.musicRepository.update(id, musicDto);
  //   return this.musicRepository.findOne(id);
  // }

  // async deleteMusic(id: number): Promise<void> {
  //   await this.getMusicById(id); // Ensure music exists
  //   await this.musicRepository.delete(id);
  // }
}
