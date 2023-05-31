import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Order } from './Order';



@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  quantity: number

  @Column()
  description: string

  @Column()
  unit_price: number

  @ManyToMany(() => Order, (order) => order.products, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  orders: Order[]
}
