import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatsDto } from './dto/create-stats.dto';
import { UpdateStatsDto } from './dto/update-stats.dto';


@Controller('stats')

export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @Post()
  create(@Body() createStatDto: CreateStatsDto) {
    return this.statsService.createOne(createStatDto);
  }

  @Get('/all')
  async getStats() {
    return this.statsService.findAll();
  }

  @Get(':id')
  async getStatsByUser(@Param('id') id: string) {
    return this.statsService.getStatsByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStatDto: UpdateStatsDto) {
    return this.statsService.updateOne(+id, updateStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statsService.deleteOne(+id);
  }
}
