import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoodTrackerDto } from './dto/create-mood_tracker.dto';
import { UpdateMoodTrackerDto } from './dto/update-mood_tracker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoodTracker } from './entities/mood_tracker.entity';

@Injectable()
export class MoodTrackerService {
  constructor(
    @InjectRepository(MoodTracker)
    private moodTrackerRepository: Repository<MoodTracker>
  ) {

  }
  async create(createMoodTrackerDto: CreateMoodTrackerDto) {
    return await this.moodTrackerRepository.save(createMoodTrackerDto);
  }

  async findAll() {
    return await this.moodTrackerRepository.find();
  }

  async findOne(id: number) {
    const moodTracker = await this.moodTrackerRepository.findOne({where: {id}});
    if(!moodTracker) throw new NotFoundException('Mood tracker not found');
    return moodTracker;
  }

  async update(id: number, updateMoodTrackerDto: UpdateMoodTrackerDto) {
    const moodTracker = await this.findOne(id);
    if(!moodTracker) throw new NotFoundException('Mood tracker not found');
    return await this.moodTrackerRepository.update(id, updateMoodTrackerDto);
  }

  async remove(id: number) {
    const moodTracker = await this.findOne(id);
    if(!moodTracker) throw new NotFoundException('Mood tracker not found');
    return await this.moodTrackerRepository.delete(id);
  }
}
