import { IsNotEmpty } from 'class-validator';

export class CreateUserInputDTO {
  @IsNotEmpty({ message: '이름은 비워둘 수 없습니다.' })
  name: string;

  @IsNotEmpty({ message: '이메일은 비워둘 수 없습니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 비워둘 수 없습니다.' })
  password: string;
}
