import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BCRYPT } from '../bcrypt/bcrypt.const';
import { Bcrypt } from '../bcrypt/bcrypt.provider';
import { UsersService } from '../modules/users/users.service';
import { Role } from '../utils/enums/role.enum';
import { User } from '../modules/users/users.entity';
import { UserInterface } from '../utils/interface/user.interface';

jest.mock('@nestjs/jwt');
jest.mock('../users/users.service');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let bcryptProvider: Bcrypt;
  let jwtService: JwtService;

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'token'),
            decode: jest.fn(() => 'token'),
          },
        },
        {
          provide: BCRYPT,
          useValue: {
            genSaltSync: jest.fn(),
            hashSync: jest.fn(() => 'hash'),
            compareSync: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    authService = authModule.get<AuthService>(AuthService);
    usersService = authModule.get<UsersService>(UsersService);
    bcryptProvider = authModule.get<Bcrypt>(BCRYPT);
    jwtService = authModule.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(bcryptProvider).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('function login', () => {
    it('login user', async () => {
      const user = {
        _id: '62279f1a1d280cd5fa047e59',
        email: 'test@test.com',
        roles: [Role.ADMIN],
        password: 'Test',
      };

      const response = await authService.login((user as unknown) as User);
      expect(response).toBeDefined();
      expect(response._id).toBeDefined();
      expect(response.email).toBeDefined();
      expect(response.roles).toBeDefined();
    });
  });

  describe('logout', () => {
    it('Decode function', async () => {
      const userDecode: UserInterface = {
        _id: '62279f1a1d280cd5fa047e59',
        email: 'test@test.com',
        roles: [Role.ADMIN],
      };

      const response = await authService.logout(userDecode);

      expect(response).toBeUndefined();
    });
  });
});
