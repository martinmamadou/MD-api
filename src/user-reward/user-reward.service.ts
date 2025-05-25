import { Injectable } from '@nestjs/common';
import { CreateUserRewardDto } from './dto/create-user-reward.dto';
import { UpdateUserRewardDto } from './dto/update-user-reward.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { UserReward } from './entities/user-reward.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from 'src/rewards/entities/reward.entity';
import { UpdateUserChallengeDto } from 'src/user_challenge/dto/update-user_challenge.dto';

@Injectable()
export class UserRewardService {
  constructor(
    @InjectRepository(UserReward)
    private userRewardRepository: Repository<UserReward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
  ) {}
  async create(createUserRewardDto: CreateUserRewardDto) {
    const { id_user, id_reward } = createUserRewardDto;

    const user = await this.userRepository.findOne({ where: { id: id_user } });
    const reward = await this.rewardRepository.findOne({ where: { id: id_reward } });

    if (!user || !reward) {
      throw new Error('User or Reward not found');
    }

    const existingUserReward = await this.userRewardRepository.findOne({
      where: {
        user: { id: id_user },
        reward: { id: id_reward },
      },
    });

    if (existingUserReward) {
      throw new Error('User is already participating in this reward');
    }

    return this.userRewardRepository.save({
      user,
      reward,
      reclaim_date: new Date(),
    });
  }

  async findByUser(userId: number) {
    return this.userRewardRepository.find({
      where: { user: { id: userId } },
      relations: ['reward'],
    });
  }

  
  async findByReward(rewardId: number) {
    return this.userRewardRepository.find({
      where: { reward: { id: rewardId } },
      relations: ['user'],
    });
  }

  async findByUserAndReward(userId: number, rewardId: number) {
    return this.userRewardRepository.findOne({
      where: {
        user: { id: userId },
        reward: { id: rewardId }
      },
      relations: ['reward', 'user']
    });
  }

  async findAll() {
    return await this.userRewardRepository.find();
  }

  async findOne(id: number) {
    return await this.userRewardRepository.findOne({ where: { id } });
  }
  
  async update(id: number, updateUserRewardDto: UpdateUserRewardDto) {
    const userReward = await this.userRewardRepository.findOne({ where: { id } });
    if (!userReward) {
      throw new Error('UserReward not found');
    }
    Object.assign(userReward, updateUserRewardDto);
    return this.userRewardRepository.save(userReward);
  }

  remove(id: number) {
    return this.userRewardRepository.delete(id);
  }
}
