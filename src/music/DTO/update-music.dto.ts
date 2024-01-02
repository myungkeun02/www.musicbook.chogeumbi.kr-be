import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateMusicDto {
  // 제목 필드, 유효한 문자열이어야 함 (옵션)
  @IsString({ message: '유효한 문자열이어야 합니다.' })
  @IsOptional()
  title?: string;

  // 아티스트 필드, 유효한 문자열이어야 함 (옵션)
  @IsString({ message: '유효한 문자열이어야 합니다.' })
  @IsOptional()
  artist?: string;

  // 앨범 아트 URL 필드, 유효한 URL이어야 함 (옵션)
  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  @IsOptional()
  album_art?: string;

  // Music_YouTube 링크 필드, 유효한 URL이어야 함 (옵션)
  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  @IsOptional()
  music_youtube_link?: string;

  // Karaoke_YouTube 링크 필드, 유효한 URL이어야 함 (옵션)
  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  @IsOptional()
  karaoke_youtube_link?: string;
}
