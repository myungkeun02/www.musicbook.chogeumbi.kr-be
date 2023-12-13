import { IsString, IsUrl, IsOptional } from 'class-validator';

export class UpdateMusicDto {
  @IsString({ message: '유효한 문자열이어야 합니다.' })
  @IsOptional()
  title?: string;

  @IsString({ message: '유효한 문자열이어야 합니다.' })
  @IsOptional()
  artist?: string;

  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  @IsOptional()
  album_art?: string;

  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  @IsOptional()
  musci_youtube_link?: string;

  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  @IsOptional()
  karaoke_youtube_link?: string;
}
