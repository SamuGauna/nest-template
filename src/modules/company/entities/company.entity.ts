import { User } from 'src/modules/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn()
  user: User;

  @OneToMany(() => Product, (product) => product.company)
  products: Product[];

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'varchar', length: 255 })
  legalName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  companyEmail: string;

  @Column({ type: 'varchar', length: 20 })
  contactPhone: string;

  @Column({ type: 'varchar', length: 255 })
  website: string;

  @Column({ type: 'varchar', length: 255 })
  taxId: string; // RUT or relevant tax identification number

  @Column({ type: 'date' })
  foundingDate: Date;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  residenceCountry?: string;

  @Column({ type: 'varchar', length: 255 })
  industry: string; // Rubro

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
