import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { AccessToken } from './types/AccessToken';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { StatsService } from 'src/stats/stats.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private statsService: StatsService
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    await this.usersService.update(user.id, {
      login_date: new Date(),
    });
    await this.statsService.updateStats(user);
    const payload = { email: user.email, id: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = {
      ...user,
      password: hashedPassword,
      created_at: new Date(),
      login_date: null,
      role: 'user',
      points: 0,
      userChallenges: [],
      stats: [],
      packet_per_day: 1,
      packet_price: 10,
      smoker_type: 'regular',
      smoker_duration: 1,
      last_cigaret_smoked: new Date(),
      goal: 'quit'
    };

    const savedUser = await this.usersService.create(newUser);

    await this.statsService.updateStats(savedUser);

    return this.login(savedUser);
  }

  async updateUser(user: User): Promise<User> {
    await this.usersService.update(user.id, user);
    return this.usersService.findOne(user.id);
  }
}
