import { Injectable } from '@nestjs/common';
import { CreateUserChallengeDto } from './dto/create-user_challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user_challenge.dto';
import { UserChallenge } from './entities/user_challenge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Challenge } from '../challenge/entities/challenge.entity';

@Injectable()
export class UserChallengeService {

  constructor(
    @InjectRepository(UserChallenge)
    private userChallengeRepository: Repository<UserChallenge>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) { }

  async create(createUserChallengeDto: CreateUserChallengeDto) {
    const { id_user, id_challenge } = createUserChallengeDto;

    const user = await this.userRepository.findOne({ where: { id: id_user } });
    const challenge = await this.challengeRepository.findOne({ where: { id: id_challenge } });

    if (!user || !challenge) {
      throw new Error('User or Challenge not found');
    }

    const existingUserChallenge = await this.userChallengeRepository.findOne({
      where: {
        user: { id: id_user },
        challenge: { id: id_challenge },
      },
    });

    if (existingUserChallenge) {
      throw new Error('User is already participating in this challenge');
    }

    return this.userChallengeRepository.save({
      user,
      challenge,
      joined_at: new Date(),
      is_completed: false,
      progress: 0,
    });
  }

  async findByUser(userId: number) {
    return this.userChallengeRepository.find({
      where: { user: { id: userId } },
      relations: ['challenge'],
    });
  }

  async findByChallenge(challengeId: number) {
    return this.userChallengeRepository.find({
      where: { challenge: { id: challengeId } },
      relations: ['user'],
    });
  }

  async findAll() {
    return await this.userChallengeRepository.find()
  }

  async findOne(id: number) {
    return await this.userChallengeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserChallengeDto: UpdateUserChallengeDto) {
    const userChallenge = await this.userChallengeRepository.findOne({ where: { id } });
    if (!userChallenge) {
      throw new Error('UserChallenge not found');
    }
    Object.assign(userChallenge, updateUserChallengeDto);
    return this.userChallengeRepository.save(userChallenge);
  }

  async remove(id: number) {
    return await this.userChallengeRepository.delete(id);
  }

  async findByUserAndChallenge(userId: number, challengeId: number) {
    return this.userChallengeRepository.findOne({
      where: {
        user: { id: userId },
        challenge: { id: challengeId }
      },
      relations: ['challenge', 'user']
    });
  }
}
