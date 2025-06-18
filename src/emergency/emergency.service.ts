import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { Repository } from 'typeorm';
import { Emergency } from './entities/emergency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmergencyCategory } from 'src/emergency_category/entities/emergency_category.entity';
import { Reward } from 'src/rewards/entities/reward.entity';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(Emergency)
    private emergencyRepository: Repository<Emergency>,
    @InjectRepository(EmergencyCategory)
    private categoryRepository: Repository<EmergencyCategory>
  ) {

  }
  async create(createEmergencyDto: CreateEmergencyDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createEmergencyDto.category_id }
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const emergency = this.emergencyRepository.create({
      ...createEmergencyDto,
      category
    });

    return await this.emergencyRepository.save(emergency);
  }


  async findAll() {
    return await this.emergencyRepository.find();
  }

  async findOne(id: number) {
    const emergency = await this.emergencyRepository.findOne({ where: { id }, relations: ['category'] })
    if (!emergency) throw new NotFoundException('Emergency not found')
    return emergency
  }

  async update(id: number, updateEmergencyDto: UpdateEmergencyDto) {
    const emergency = await this.findOne(id);
    if(!emergency) throw new NotFoundException('Emergency not found');
    return await this.emergencyRepository.update(id, updateEmergencyDto);
  }

  async remove(id: number) {
    const emergency = await this.findOne(id);
    if(!emergency) throw new NotFoundException('Emergency not found');
    return await this.emergencyRepository.delete(id);
  }

  async findByCategory(categoryId: number) {
    return await this.emergencyRepository.find({
      relations: ['category'],
      where: {
        category: {
          id: categoryId
        }
      }
    });
  }
}
