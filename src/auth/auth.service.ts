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

    // Calcul du type de fumeur
    const smokerType = this.determineSmokerType(
      user.packet_per_day,
      user.packet_price,
      user.smoker_duration,
      user.goal,
      user.additional_info
    );

    

    const newUser: User = {
      ...user,
      password: hashedPassword,
      created_at: new Date(),
      login_date: null,
      role: 'user',
      smoker_type: smokerType,
      points: 0,
      userChallenges: [],
      stats: []
    };

    const savedUser = await this.usersService.create(newUser);

    await this.statsService.updateStats(savedUser);
    
    return this.login(savedUser);
  }

  private determineSmokerType(
    packetPerDay: number,
    packetPrice: number,
    smokerDuration: number,
    goal: string,
    additionalInfo: {
      peak_smoking_time: string,
      trigger_factor: string,
      previous_attempts: string
    }
  ): string {
    let score = 0;

    // 1. Consommation quotidienne (30% du score)
    const cigarettesPerDay = packetPerDay * 20;
    if (cigarettesPerDay <= 5) score += 10;
    else if (cigarettesPerDay <= 15) score += 20;
    else score += 30;

    // 2. Dépendance comportementale (30% du score)
    // Moment de consommation pic
    if (additionalInfo.peak_smoking_time === 'morning') score += 15; // Forte dépendance si fumeur du matin
    else if (additionalInfo.peak_smoking_time === 'night') score += 12;
    else score += 8;

    // Facteur déclencheur
    if (additionalInfo.trigger_factor === 'stress') score += 15;
    else if (additionalInfo.trigger_factor === 'habit') score += 12;
    else if (additionalInfo.trigger_factor === 'social') score += 8;
    else score += 5;

    // 3. Historique et durée (40% du score)
    // Tentatives d'arrêt précédentes
    if (additionalInfo.previous_attempts === 'multiple') score += 20;
    else if (additionalInfo.previous_attempts === 'once') score += 15;
    else score += 10;

    // Durée du tabagisme
    if (smokerDuration > 5) score += 20;
    else if (smokerDuration > 2) score += 15;
    else score += 10;

    // Détermination finale du type
    if (score <= 40) return "casual";
    if (score <= 70) return "regular";
    return "addicted";
  }
}
