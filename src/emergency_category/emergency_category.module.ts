import { Module } from '@nestjs/common';
import { EmergencyCategoryService } from './emergency_category.service';
import { EmergencyCategoryController } from './emergency_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyCategory } from './entities/emergency_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyCategory])],
  controllers: [EmergencyCategoryController],
  providers: [EmergencyCategoryService],
})
export class EmergencyCategoryModule {}
