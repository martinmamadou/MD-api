import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { ChallengeModule } from './challenge/challenge.module';
import { Challenge } from './challenge/entities/challenge.entity';
import { StatsModule } from './stats/stats.module';
import { Stats } from './stats/entities/stats.entity';
import { RewardsModule } from './rewards/rewards.module';
import { Reward } from './rewards/entities/reward.entity';
import { MoodTrackerModule } from './mood_tracker/mood_tracker.module';
import { MoodTracker } from './mood_tracker/entities/mood_tracker.entity';
import { EmergencyModule } from './emergency/emergency.module';
import { UserChallengeModule } from './user_challenge/user_challenge.module';
import { UserChallenge } from './user_challenge/entities/user_challenge.entity';
import { Emergency } from './emergency/entities/emergency.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [User, Challenge, Stats, Reward, MoodTracker, UserChallenge, Emergency],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ChallengeModule,
    StatsModule,
    RewardsModule,
    MoodTrackerModule,
    EmergencyModule,
    UserChallengeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }
