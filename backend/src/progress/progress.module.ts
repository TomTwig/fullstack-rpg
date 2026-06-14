import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerProgress } from './player-progress.entity';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

Module({
  controllers: [ProgressController],
  imports: [TypeOrmModule.forFeature([PlayerProgress])],
  exports: [],
  providers: [ProgressService],
});
export class ProgressModule {}
