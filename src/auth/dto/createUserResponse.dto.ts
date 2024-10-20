import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserResponseDto {
  @Type(() => String)
  @ApiProperty({ example: '61d433863260b40e79f87db1' })
  id: string;
}
