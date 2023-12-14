// spotipy/spotipy.dto.ts
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class SearchTracksDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}

export class TrackDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  album_art: string;
}

export class SearchTracksResponseDto {
  @IsArray()
  tracks: TrackDto[];
}
