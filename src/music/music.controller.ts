// music.controller.ts
import {
  Controller,
  Get,
  // Post,
  // Put,
  // Delete,
  // Body,
  Param,
} from '@nestjs/common';
import { MusicService } from './music.service';
// import { MusicDto } from './dto/music.dto';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  getAllMusic() {
    return this.musicService.getAllMusic();
  }

  @Get('search/title/:title')
  searchByTitle(@Param('title') title: string) {
    return this.musicService.searchByTitle(title);
  }

  @Get('search/artist/:artist')
  searchByArtist(@Param('artist') artist: string) {
    return this.musicService.searchByArtist(artist);
  }

  @Get('sort/title')
  sortByTitleAsc() {
    return this.musicService.sortByTitleAsc();
  }

  @Get('category/:categoryId')
  getByCategory(@Param('categoryId') categoryId: number) {
    return this.musicService.getByCategory(categoryId);
  }

  @Get('sort/artist')
  sortByArtistAsc() {
    return this.musicService.sortByArtistAsc();
  }

  @Get('sort/date')
  sortByDateAsc() {
    return this.musicService.sortByDateAsc();
  }

  // @Get(':id')
  // getMusicById(@Param('id') id: number) {
  //   return this.musicService.getMusicById(id);
  // }

  // @Post()
  // createMusic(@Body() musicDto: MusicDto) {
  //   return this.musicService.createMusic(musicDto);
  // }

  // @Put(':id')
  // updateMusic(@Param('id') id: number, @Body() musicDto: MusicDto) {
  //   return this.musicService.updateMusic(id, musicDto);
  // }

  // @Delete(':id')
  // deleteMusic(@Param('id') id: number) {
  //   return this.musicService.deleteMusic(id);
  // }
}
