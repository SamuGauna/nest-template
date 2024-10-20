import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Company } from '../company/entities/company.entity';
import { Client } from '../client/entities/client.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'boolean', default: false })
  isCompany?: boolean;

  @Column({ type: 'boolean', default: false })
  isClient?: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked?: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage?: string;

  @Column({ type: 'varchar', length: 255 })
  tokenEmailVerification?: string;

  @Column({ type: 'date' })
  tokenEmailVerificationCreatedAt?: Date;

  @Column({ type: 'boolean', default: false })
  isEmailVerified?: boolean;

  @OneToOne(() => Company, (company) => company.id)
  company?: Company;

  @OneToMany(() => Client, (client) => client.id)
  client?: Client[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
