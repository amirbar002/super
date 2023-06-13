import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { Customer } from './Customer'
import { Product } from './Product';


export enum Status {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column()
  currency: string

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date

  @Column({ type: 'enum', enum: Status })
  status: Status

  @Column({type: 'varchar', length: 255, name:'notes', nullable: true})
  comments: string

  @Column({nullable: false})
  is_paid: boolean

  @ManyToOne(()=> Customer, customer => customer.orders, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
  @JoinColumn({name: 'customer_id'})
  customer: Customer

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'orders-products',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[]
}
