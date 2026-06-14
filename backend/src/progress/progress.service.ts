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
      where: { playerName: dto.playerName },
    });

    if (exist) {
      exist.xp = dto.xp;
      exist.level = dto.level;
      return this.repo.save(exist);
    }

    const newEntry = this.repo.create(dto);
    return this.repo.save(newEntry);
  }

  async findByPlayerId(playerName: string): Promise<PlayerProgress | null> {
    const exist = await this.repo.findOne({
      where: { playerName },
    });

    if (exist) {
      return exist;
    } else {
      throw new NotFoundException(
        `Kein Fortschritt für den Spieler ${playerName} gefunden `,
      );
    }
  }
}
