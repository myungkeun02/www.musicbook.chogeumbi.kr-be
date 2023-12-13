import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  @IsNotEmpty({ message: '제목은 비워둘 수 없습니다.' })
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title: string;

  @IsNotEmpty({ message: '아티스트는 비워둘 수 없습니다.' })
  @IsString({ message: '아티스트는 문자열이어야 합니다.' })
  artist: string;

  @IsNotEmpty({ message: '앨범 아트 URL은 비워둘 수 없습니다.' })
  @IsUrl({}, { message: '앨범 아트 URL 형식이 올바르지 않습니다.' })
  album_art: string;

  @IsNotEmpty({ message: 'Music_YouTube 링크는 비워둘 수 없습니다.' })
  @IsUrl({}, { message: 'YouTube 링크의 형식이 올바르지 않습니다.' })
  music_youtube_link: string;

  @IsUrl({}, { message: 'Karaoke_YouTube 링크의 형식이 올바르지 않습니다.' })
  karaoke_youtube_link: string;
}
