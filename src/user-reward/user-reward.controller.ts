import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserRewardService } from './user-reward.service';
import { CreateUserRewardDto } from './dto/create-user-reward.dto';
import { UpdateUserRewardDto } from './dto/update-user-reward.dto';

@Controller('user-reward')
export class UserRewardController {
  constructor(private readonly userRewardService: UserRewardService) {}

  @Post('/create')
  create(@Body() createUserRewardDto: CreateUserRewardDto) {
    return this.userRewardService.create(createUserRewardDto);
  }

  @Get()
  findAll() {
    return this.userRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRewardService.findOne(+id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.userRewardService.findByUser(userId);
  }

  @Get('reward/:rewardId')
  findByReward(@Param('rewardId') rewardId: number) {
    return this.userRewardService.findByReward(rewardId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserRewardDto: UpdateUserRewardDto) {
    return this.userRewardService.update(+id, updateUserRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRewardService.remove(+id);
  }

  @Get('user/:userId/reward/:rewardId')
  findByUserAndReward(
    @Param('userId') userId: number,
    @Param('rewardId') rewardId: number
  ) {
    return this.userRewardService.findByUserAndReward(userId, rewardId);
  }
}
