import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { Repository } from 'typeorm';
import { ChallengeCategory } from 'src/challenge_category/entities/challenge_category.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(ChallengeCategory)
    private categoryRepository: Repository<ChallengeCategory>
  ) { }

  async create(createChallengeDto: CreateChallengeDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createChallengeDto.category_id }
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const challenge = this.challengeRepository.create({
      ...createChallengeDto,
      category
    });

    return await this.challengeRepository.save(challenge);
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

  async findByCategory(categoryId: number) {
    return await this.challengeRepository.find({
      relations: ['category'],
      where: {
        category: {
          id: categoryId
        }
      }
    });
  }

  async uploadBadge(id: number, file: Express.Multer.File): Promise<Challenge> {
    const challenge = await this.findOne(id);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    challenge.badge_url = `${file.filename}`;
    return this.challengeRepository.save(challenge);
  }
}
