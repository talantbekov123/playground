import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto, SigninDto } from './user.types';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async createUser(
    @Body() createUserDto: SignupDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = createUserDto;
    const accessToken = await this.userService.signup(username, password);
    return { accessToken };
  }

  @Post('signin')
  async login(
    @Body() loginDto: SigninDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { username, password } = loginDto;
    const tokens = await this.userService.signin(username, password);
    return tokens;
  }
}
