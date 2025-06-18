import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emergency } from './entities/emergency.entity';
import { EmergencyCategory } from 'src/emergency_category/entities/emergency_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emergency, EmergencyCategory])],
  controllers: [EmergencyController],
  providers: [EmergencyService],
})
export class EmergencyModule {}
