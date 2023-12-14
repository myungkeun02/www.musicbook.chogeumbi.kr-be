import { IsNotEmpty } from 'class-validator';

export class LoginInputDTO {
  @IsNotEmpty({ message: '이메일은 비워둘 수 없습니다.' })
  eamil: string;

  @IsNotEmpty({ message: '비밀번호는 비워둘 수 없습니다.' })
  password: string;
}