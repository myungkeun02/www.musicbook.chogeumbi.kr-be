import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateMusicDto {
  // 제목 필드, 비어있으면 안 됨
  @IsNotEmpty({ message: '제목은 비워둘 수 없습니다.' })
  // 제목은 문자열이어야 함
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  title: string;

  // 아티스트 필드, 비어있으면 안 됨
  @IsNotEmpty({ message: '아티스트는 비워둘 수 없습니다.' })
  // 아티스트는 문자열이어야 함
  @IsString({ message: '아티스트는 문자열이어야 합니다.' })
  artist: string;

  // 앨범 아트 URL 필드, 비어있으면 안 됨
  @IsNotEmpty({ message: '앨범 아트 URL은 비워둘 수 없습니다.' })
  // 올바른 URL 형식이어야 함
  @IsUrl({}, { message: '앨범 아트 URL 형식이 올바르지 않습니다.' })
  album_art: string;

  // Music_YouTube 링크 필드, 비어있으면 안 됨
  @IsNotEmpty({ message: 'Music_YouTube 링크는 비워둘 수 없습니다.' })
  // 올바른 YouTube 링크 형식이어야 함
  @IsUrl({}, { message: 'YouTube 링크의 형식이 올바르지 않습니다.' })
  music_youtube_link: string;

  // Karaoke_YouTube 링크 필드, 올바른 YouTube 링크 형식이어야 함
  @IsUrl({}, { message: 'Karaoke_YouTube 링크의 형식이 올바르지 않습니다.' })
  karaoke_youtube_link: string;
}
