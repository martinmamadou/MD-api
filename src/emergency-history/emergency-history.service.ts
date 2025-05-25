import { Injectable } from '@nestjs/common';
import { CreateEmergencyHistoryDto } from './dto/create-emergency-history.dto';
import { UpdateEmergencyHistoryDto } from './dto/update-emergency-history.dto';
import { Repository } from 'typeorm';
import { EmergencyHistory } from './entities/emergency-history.entity';
import { User } from 'src/users/users.entity';
import { Emergency } from 'src/emergency/entities/emergency.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmergencyHistoryService {
  constructor(
    @InjectRepository(EmergencyHistory)
    private emergencyHistoryRepository: Repository<EmergencyHistory>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Emergency)
    private emergencyRepository: Repository<Emergency>,
  ) {}
  async create(createEmergencyHistoryDto: CreateEmergencyHistoryDto) {
    const { id_user, id_emergency } = createEmergencyHistoryDto;

    const user = await this.userRepository.findOne({ where: { id: id_user } });
    const emergency = await this.emergencyRepository.findOne({ where: { id: id_emergency } });

    if (!user || !emergency) {
      throw new Error('User or Emergency not found');
    }

    const existingUserEmergency = await this.emergencyHistoryRepository.findOne({
      where: {
        user: { id: id_user },
        emergency: { id: id_emergency },
      },
    });

    if (existingUserEmergency) {
      throw new Error('User is already participating in this emergency');
    }

    return this.emergencyHistoryRepository.save({
      user,
      emergency,
      view_date: new Date(),
    });
  }

  async findByUser(userId: number) {
    return this.emergencyHistoryRepository.find({
      where: { user: { id: userId } },
      relations: ['emergency'],
    });
  }

  async findByEmergency(emergencyId: number) {
    return this.emergencyHistoryRepository.find({
      where: { emergency: { id: emergencyId } },
      relations: ['user'],
    });
  }

  async findAll() {
    return await this.emergencyHistoryRepository.find();
  }

  async findOne(id: number) {
    return await this.emergencyHistoryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEmergencyHistoryDto: UpdateEmergencyHistoryDto) {
    const emergencyHistory = await this.emergencyHistoryRepository.findOne({ where: { id } });
    if (!emergencyHistory) {
      throw new Error('EmergencyHistory not found');
    }
    Object.assign(emergencyHistory, updateEmergencyHistoryDto);
    return this.emergencyHistoryRepository.save(emergencyHistory);
  }

  async remove(id: number) {
    return await this.emergencyHistoryRepository.delete(id);
  }

  async findByUserAndEmergency(userId: number, emergencyId: number) {
    return this.emergencyHistoryRepository.findOne({
      where: {
        user: { id: userId },
        emergency: { id: emergencyId }
      },
      relations: ['emergency', 'user']
    });
  }
}
