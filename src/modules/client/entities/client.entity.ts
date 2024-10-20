import { CartItem } from 'src/modules/cart/entities/cartItems.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
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

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 10 })
  gender?: string;

  @Column({ type: 'date' })
  birth?: Date;

  @Column({ type: 'varchar', length: 100 })
  country?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  residenceCountry?: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', length: 255 })
  preferredPaymentMethod: string;

  @Column({ type: 'varchar', length: 255 })
  deliveryAddress: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.client)
  cart: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
