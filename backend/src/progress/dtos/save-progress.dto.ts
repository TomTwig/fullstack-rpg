import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SaveProgressDto {
  @IsNotEmpty()
  @IsString()
  playerId!: string;

  @IsNumber()
  @Min(0)
  xp!: number;

  @IsNumber()
  @Min(1)
  level!: number;
}
