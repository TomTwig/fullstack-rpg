import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerProgress {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ unique: true })
  playerId!: string;
  @Column({ default: 0 })
  xp!: number;
  @Column({ default: 1 })
  level!: number;
}
