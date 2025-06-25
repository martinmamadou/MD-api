import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserChallengeService } from './user_challenge.service';
import { CreateUserChallengeDto } from './dto/create-user_challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user_challenge.dto';


@Controller('user-challenges')

export class UserChallengeController {
  constructor(private readonly userChallengeService: UserChallengeService) { }

  @Post()
  create(@Body() createUserChallengeDto: CreateUserChallengeDto) {
    return this.userChallengeService.create(createUserChallengeDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.userChallengeService.findByUser(userId);
  }

  @Get()
  findAll() {
    return this.userChallengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userChallengeService.findOne(+id);
  }

  @Put('/user/edit/:id')
  update(@Param('id') id: string, @Body() updateUserChallengeDto: UpdateUserChallengeDto) {
    return this.userChallengeService.update(+id, updateUserChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChallengeService.remove(+id);
  }

  @Get('user/:userId/challenge/:challengeId')
  findByUserAndChallenge(
    @Param('userId') userId: number,
    @Param('challengeId') challengeId: number
  ) {
    return this.userChallengeService.findByUserAndChallenge(userId, challengeId);
  }

  @Post('accept')
  accept(
    @Body() body: { userId: number; challengeId: number }
  ) {
    console.log('Données reçues dans le contrôleur:', body);
    console.log('userId reçu:', body.userId, 'type:', typeof body.userId);
    console.log('challengeId reçu:', body.challengeId, 'type:', typeof body.challengeId);
    return this.userChallengeService.accept(body.userId, body.challengeId);
  }

  @Post('complete')
  complete(
    @Body() body: { userId: number; challengeId: number }
  ) {
    return this.userChallengeService.complete(body.userId, body.challengeId);
  }

}
