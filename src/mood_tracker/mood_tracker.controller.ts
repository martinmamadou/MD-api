import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MoodTrackerService } from './mood_tracker.service';
import { CreateMoodTrackerDto } from './dto/create-mood_tracker.dto';
import { UpdateMoodTrackerDto } from './dto/update-mood_tracker.dto';

@Controller('mood-tracker')
export class MoodTrackerController {
  constructor(private readonly moodTrackerService: MoodTrackerService) {}

  @Post('/create')
  create(@Body() createMoodTrackerDto: CreateMoodTrackerDto) {
    return this.moodTrackerService.create(createMoodTrackerDto);
  }

  @Get()
  findAll() {
    return this.moodTrackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moodTrackerService.findOne(+id);
  }

  @Put('/edit/:id')
  update(@Param('id') id: string, @Body() updateMoodTrackerDto: UpdateMoodTrackerDto) {
    return this.moodTrackerService.update(+id, updateMoodTrackerDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.moodTrackerService.remove(+id);
  }
}
