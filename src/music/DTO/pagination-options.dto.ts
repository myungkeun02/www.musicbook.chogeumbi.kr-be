import { IsEnum, IsOptional, IsPositive } from 'class-validator';

enum SortOptions {
  TITLE_ASC = 'title:asc',
  TITLE_DESC = 'title:desc',
  ARTIST_ASC = 'artist:asc',
  ARTIST_DESC = 'artist:desc',
  CREATED_AT_ASC = 'created_at:asc',
  CREATED_AT_DESC = 'created_at:desc',
}

export class PaginationOptionsDto {
  @IsOptional()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsEnum(SortOptions)
  sort?: SortOptions;
}
