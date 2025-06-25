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

  async accept(userId: number, challengeId: number) {
    console.log(`Tentative d'acceptation - User ID: ${userId}, Challenge ID: ${challengeId}`);

    // Vérifier si l'utilisateur et le défi existent
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const challenge = await this.challengeRepository.findOne({ where: { id: challengeId } });

    console.log(`User trouvé:`, user ? `ID ${user.id}` : 'Non trouvé');
    console.log(`Challenge trouvé:`, challenge ? `ID ${challenge.id}` : 'Non trouvé');

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (!challenge) {
      throw new Error(`Challenge with ID ${challengeId} not found`);
    }

    // Chercher si l'entrée existe déjà
    let userChallenge = await this.userChallengeRepository.findOne({
      where: {
        user: { id: userId },
        challenge: { id: challengeId }
      }
    });

    console.log(`UserChallenge existant:`, userChallenge ? `ID ${userChallenge.id}` : 'Non trouvé');

    if (!userChallenge) {
      // Créer une nouvelle entrée si elle n'existe pas
      userChallenge = this.userChallengeRepository.create({
        user,
        challenge,
        is_completed: false,
        created_at: new Date(),
        updated_at: new Date(),
        points_earned: 0
      });
      console.log('Nouvelle entrée UserChallenge créée');
    } else {
      // Mettre à jour l'entrée existante
      userChallenge.is_completed = false;
      userChallenge.updated_at = new Date();
      console.log('Entrée UserChallenge mise à jour');
    }

    const savedUserChallenge = await this.userChallengeRepository.save(userChallenge);
    console.log('UserChallenge sauvegardé avec succès:', savedUserChallenge.id);

    return savedUserChallenge;
  }

  async complete(userId: number, challengeId: number) {
    const userChallenge = await this.userChallengeRepository.findOne({
      where: {
        user: { id: userId },
        challenge: { id: challengeId }
      }
    });

    if (!userChallenge) {
      throw new Error('UserChallenge not found');
    }

    userChallenge.is_completed = true;
    userChallenge.updated_at = new Date();

    return this.userChallengeRepository.save(userChallenge);
  }
}
