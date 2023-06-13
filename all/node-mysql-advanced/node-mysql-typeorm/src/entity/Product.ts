import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Order } from './Order';



@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string

  @Column({ type: 'blob' })
  image: Buffer;

  @Column()
  quantity: number

  @Column()
  description: string

  @Column()
  unit_price: number

  @ManyToMany(() => Order, (order) => order.products, {onDelete: "CASCADE", onUpdate: "CASCADE"})
  orders: Order[]
}
