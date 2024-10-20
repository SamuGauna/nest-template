import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { apiErrorWrapper } from 'src/utils/factories/apiErrorWrapper.factory';
import { ErrorResponseDto } from 'src/utils/dto/error.dto';
import { apiResponseWrapper } from 'src/utils/factories/apiResponseWrapper.factory';
import { CreateUserResponseDto } from 'src/auth/dto/createUserResponse.dto';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/createUserRequest.dto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Sign up with email' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper(CreateUserResponseDto),
    description: 'User create success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Email already exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Internal server error',
  })
  @Post()
  create(@Body() user: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.userService.create(user);
  }
}
