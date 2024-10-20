import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { Match } from 'src/utils/decorators/match.decorator';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Jose' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Gomez' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'male' })
  @IsString()
  gender: string;

  @ApiProperty({ example: '2024-07-17T14:21:33.307+00:00' })
  @IsDate()
  @Type(() => Date)
  birth: Date;

  @ApiProperty({ example: 'arg' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'user@test.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user@test.com' })
  @IsString()
  @Match('email', { message: 'Emails must match' })
  confirmMail: string;
}
