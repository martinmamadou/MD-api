import { Module } from '@nestjs/common';
import { EmergencyHistoryService } from './emergency-history.service';
import { EmergencyHistoryController } from './emergency-history.controller';
import { EmergencyHistory } from './entities/emergency-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emergency } from 'src/emergency/entities/emergency.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyHistory, User, Emergency])],
  controllers: [EmergencyHistoryController],
  providers: [EmergencyHistoryService],
})
export class EmergencyHistoryModule {}
