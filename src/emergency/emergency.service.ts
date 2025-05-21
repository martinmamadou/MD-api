import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { Repository } from 'typeorm';
import { Emergency } from './entities/emergency.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(Emergency)
    private emergencyRepository: Repository<Emergency>
  ) {

  }
  async create(createEmergencyDto: CreateEmergencyDto) {
    return await this.emergencyRepository.save(createEmergencyDto);
  }

  async findAll() {
    return await this.emergencyRepository.find();
  }

  async findOne(id: number) {
    const emergency = await this.findOne(id)
    return await this.emergencyRepository.findOne({where: {id}});
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
}
