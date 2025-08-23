import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  clientName: string;

  @Column({ type: 'varchar', length: 15 })
  clientPhone: string;

  @Column({ type: 'enum', enum: ['MANICURE', 'PEDICURE', 'HAIRCUT'] })
  service: string;

  @Column()
  startsAt: Date;

  @Column({ type: 'varchar', length: 280, nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
