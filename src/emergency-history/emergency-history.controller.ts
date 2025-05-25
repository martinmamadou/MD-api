import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EmergencyHistoryService } from './emergency-history.service';
import { CreateEmergencyHistoryDto } from './dto/create-emergency-history.dto';
import { UpdateEmergencyHistoryDto } from './dto/update-emergency-history.dto';

@Controller('emergency-history')
export class EmergencyHistoryController {
  constructor(private readonly emergencyHistoryService: EmergencyHistoryService) {}

  @Post('/admin/create')
  create(@Body() createEmergencyHistoryDto: CreateEmergencyHistoryDto) {
    return this.emergencyHistoryService.create(createEmergencyHistoryDto);
  }

  @Get()
  findAll() {
    return this.emergencyHistoryService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.emergencyHistoryService.findByUser(userId);
  }
  
  @Get('emergency/:emergencyId')
  findByEmergency(@Param('emergencyId') emergencyId: number) {
    return this.emergencyHistoryService.findByEmergency(emergencyId);
  }

  @Get('user/:userId/emergency/:emergencyId')
  findByUserAndEmergency(@Param('userId') userId: number, @Param('emergencyId') emergencyId: number) {
    return this.emergencyHistoryService.findByUserAndEmergency(userId, emergencyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyHistoryService.findOne(+id);
  }

  @Put('/admin/edit/:id')
  update(@Param('id') id: string, @Body() updateEmergencyHistoryDto: UpdateEmergencyHistoryDto) {
    return this.emergencyHistoryService.update(+id, updateEmergencyHistoryDto);
  }

  @Delete('admin/delete/:id')
  remove(@Param('id') id: string) {
    return this.emergencyHistoryService.remove(+id);
  }
}
