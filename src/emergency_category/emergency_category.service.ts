import { Injectable } from '@nestjs/common';
import { CreateEmergencyCategoryDto } from './dto/create-emergency_category.dto';
import { UpdateEmergencyCategoryDto } from './dto/update-emergency_category.dto';
import { EmergencyCategory } from './entities/emergency_category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmergencyCategoryService {
  constructor(
    @InjectRepository(EmergencyCategory)
    private categoryRepository: Repository<EmergencyCategory>
  ) {

  }
  async create(createEmergencyCategoryDto: CreateEmergencyCategoryDto) {
    return await this.categoryRepository.save(createEmergencyCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEmergencyCategoryDto: UpdateEmergencyCategoryDto) {
    return await this.categoryRepository.update(id, updateEmergencyCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
