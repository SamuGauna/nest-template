import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Bcrypt } from 'src/bcrypt/bcrypt.provider';
import { BCRYPT } from 'src/bcrypt/bcrypt.const';
import { AuthService } from 'src/auth/auth.service';
import { Emails } from '../../emails/interfaces/emails.interface';
import { EMAIL_PROVIDER } from '../../emails/constants/emailProviders.constant';
import { User } from './users.entity';
import { CreateUserResponseDto } from './dto/createUserResponse.dto';
import { CreateUserRequestDto } from './dto/createUserRequest.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(EMAIL_PROVIDER) private emailProvider: Emails,
    @Inject(BCRYPT)
    public bcryptProvider: Bcrypt,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async sendVerificationEmail(user: User, token: string): Promise<void> {
    const sender = this.configService.get<string>('FROM_EMAIL');
    const templateIdSignUp = this.configService.get<string>(
      'TEMPLATE_ID_SIGN_UP',
    );
    const hostBling = this.configService.get<string>('HOST_BLING');
    const urlRedirectWithToken = `${hostBling}/verify?token=${token}`;

    const emailData = {
      from: sender,
      to: [user.email],
      subject: '¡Un paso más!',
      templateId: templateIdSignUp,
      extraPayload: {
        urlRedirectWithToken,
      },
    };
    await this.emailProvider.send(emailData);
  }

  generateVerificationToken(): string {
    return `BT.${this.bcryptProvider.genSaltSync()}`;
  }

  generateResponseJwt(user: User): string {
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
    };
    const token = this.authService.sign(payload);
    return token;
  }

  async create(
    createUser: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const existUser = await this.findByEmail(createUser.email);
    if (existUser) {
      throw new ConflictException('Email already exists');
    }
    const token = this.generateVerificationToken();
    const newUser = await this.userRepository.save({
      ...createUser,
      tokenEmailVerification: token,
      tokenEmailVerificationCreatedAt: new Date(),
    });
    await this.sendVerificationEmail(newUser, token);
    const jwtToken = this.generateResponseJwt(newUser);
    return {
      token: jwtToken,
      firstName: newUser.firstName,
      id: newUser.id,
      email: newUser.email,
    };
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
