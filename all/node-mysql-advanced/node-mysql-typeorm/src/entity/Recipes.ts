import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { Customer } from './Customer'
import { Product } from './Product';


export enum Status {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  img: number

  @Column()
  Ingredients: string

  @Column()
  Instructions: string

  @Column()
  name: string

  @Column()
  phone: number
  
  @Column({nullable: true, default: true})
  approval: boolean

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
