// spotipy/spotipy.controller.ts
import { Controller, Get, Query, Post } from '@nestjs/common';
import { SpotifyService } from './spotipy.service';
import { SearchTracksDto, SearchTracksResponseDto } from './DTO/spotypy.dto';

@Controller('spotipy')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('search')
  async searchTracks(
    @Query() searchTracksDto: SearchTracksDto,
  ): Promise<SearchTracksResponseDto> {
    const results = await this.spotifyService.searchTracks(
      searchTracksDto.query,
    );

    if (!results) {
      return { tracks: [] };
    }

    const tracksDto = results.map((track) => ({
      title: track.title,
      artist: track.artist,
      album_art: track.album_art,
    }));

    return { tracks: tracksDto };
  }

  @Post('token')
  async getAccessToken(): Promise<{ access_token: string }> {
    const token = await this.spotifyService.getAccessToken();
    console.log(token);
    return { access_token: token };
  }
}
