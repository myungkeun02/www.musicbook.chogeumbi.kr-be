import { IsEnum, IsOptional, IsPositive } from 'class-validator';

// 정렬 옵션을 나타내는 enum
enum SortOptions {
  TITLE_ASC = 'title:asc',
  TITLE_DESC = 'title:desc',
  ARTIST_ASC = 'artist:asc',
  ARTIST_DESC = 'artist:desc',
  CREATED_AT_ASC = 'created_at:asc',
  CREATED_AT_DESC = 'created_at:desc',
}

export class PaginationOptionsDto {
  // 페이지 번호, 양수이어야 함 (옵션)
  @IsOptional()
  @IsPositive()
  page?: number;

  // 페이지당 항목 수, 양수이어야 함 (옵션)
  @IsOptional()
  @IsPositive()
  limit?: number;

  // 정렬 옵션, SortOptions enum에 속해야 함 (옵션)
  @IsOptional()
  @IsEnum(SortOptions)
  sort?: SortOptions;
}
