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
import { ChallengeCategoryModule } from './challenge_category/challenge_category.module';
import { ChallengeCategory } from './challenge_category/entities/challenge_category.entity';
import { RewardsCategoryModule } from './rewards-category/rewards-category.module';
import { RewardsCategory } from './rewards-category/entities/rewards-category.entity';
import { UserRewardModule } from './user-reward/user-reward.module';
import { UserReward } from './user-reward/entities/user-reward.entity';
import { EmergencyHistoryModule } from './emergency-history/emergency-history.module';
import { EmergencyHistory } from './emergency-history/entities/emergency-history.entity';
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
        entities: [User, Challenge, Stats, Reward, MoodTracker, UserChallenge, Emergency, ChallengeCategory, RewardsCategory, UserReward, EmergencyHistory],
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
    ChallengeCategoryModule,
    RewardsCategoryModule,
    UserRewardModule,
    EmergencyHistoryModule,
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
