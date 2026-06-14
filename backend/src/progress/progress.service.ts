import { Injectable, NotFoundException } from '@nestjs/common';
import { SaveProgressDto } from './dtos/save-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerProgress } from './player-progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(PlayerProgress)
    private readonly repo: Repository<PlayerProgress>,
  ) {}

  async save(dto: SaveProgressDto): Promise<PlayerProgress | null> {
    const exist = await this.repo.findOne({
      where: { playerId: dto.playerId },
    });

    if (exist) {
      exist.xp = dto.xp;
      exist.level = dto.level;
      return this.repo.save(exist);
    }

    const newEntry = this.repo.create(dto);
    return this.repo.save(newEntry);
  }

  async findByPlayerId(playerId: string): Promise<PlayerProgress | null> {
    const exist = await this.repo.findOne({
      where: { playerId },
    });

    if (exist) {
      return exist;
    } else {
      throw new NotFoundException(
        `Kein Fortschritt für den Spieler ${playerId} gefunden `,
      );
    }
  }
}
