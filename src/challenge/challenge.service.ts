import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>
  ) {

  }
  async create(createChallengeDto: CreateChallengeDto) {
    return await this.challengeRepository.save(createChallengeDto);
  }

  async findAll() {
    return await this.challengeRepository.find()
  }

  async findOne(id: number) {
    const challenge = await this.challengeRepository.findOne({ where: { id } })
    if (!challenge) {
      console.log('challenge inexistant')
    }
    return challenge
  }

  async updateOne(idToUpdate: number, updateChallengeDto: UpdateChallengeDto) {
    return await this.challengeRepository.update(idToUpdate, updateChallengeDto);
  }

  async deleteOne(id: number) {
    const challenge = await this.challengeRepository.findOne({ where: { id } })
    await this.challengeRepository.delete(challenge)
    return challenge
  }

  async findByTarget(target: string) {
    return await this.challengeRepository.find({
      where: { target }
    });
  }
}
