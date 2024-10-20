import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { BCRYPT } from '../bcrypt/bcrypt.const';
import { Bcrypt } from '../bcrypt/bcrypt.provider';
import { CreateUserResponseDto } from './dto/createUserResponse.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { User } from '../modules/users/users.entity';
import { UserInterface } from '../utils/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(BCRYPT) public bcryptProvider: Bcrypt,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<CreateUserResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      user.password &&
      this.bcryptProvider.compareSync(password, user.password)
    ) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = {
      email: user.email,
      _id: user.id,
    };

    return {
      ...payload,
      token: this.jwtService.sign(payload),
    };
  }

  async logout(user: UserInterface): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(user);
  }

  sign(user: User): string {
    return this.jwtService.sign(user);
  }
}
