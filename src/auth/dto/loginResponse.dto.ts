import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'user@test.com' })
  email: string;

  @ApiProperty({ example: '61d433863260b40e79f87db1' })
  _id: string;

  @ApiProperty()
  token: string;
}
