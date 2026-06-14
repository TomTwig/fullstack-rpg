import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaveProgressDto } from './dtos/save-progress.dto';
import { ProgressService } from 'src/progress/progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('save')
  saveProgress(@Body() dto: SaveProgressDto) {
    return this.progressService.save(dto);
  }

  @Get(':playerId')
  findByPlayerId(@Param('playerId') id: string) {
    return this.progressService.findByPlayerId(id);
  }
}
