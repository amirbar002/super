import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany,OneToMany,JoinTable } from 'typeorm'

import { Order } from './Order'

@Entity('customers')
export class Customer extends BaseEntity {
  @Column()
 id: number

  @Column()
 enail: string

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
