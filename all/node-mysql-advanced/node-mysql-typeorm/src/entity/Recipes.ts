import { Column, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('recipes')
export class Recipes extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('blob')
  img: Buffer;

  @Column()
  Ingredients: string

  @Column()
  Instructions: string

  @Column()
  type_of_food: number

  @Column()
  type_of_food_two: number

  @Column()
  name: string

  @Column()
  phone: number
  
  @Column({nullable: true, default: true})
  approval: boolean

  // @ManyToOne(()=> Customer, customer => customer.orders, {onDelete: "RESTRICT", onUpdate: "CASCADE"})
  // @JoinColumn({name: 'customer_id'})
  // customer: Customer

  // @ManyToMany(() => Product, (product) => product.orders)
  // @JoinTable({
  //   name: 'orders-products',
  //   joinColumn: {
  //     name: 'order_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'product_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // products: Product[]
}


// 1 בשרי
// 2 חלבי
// 3 פרווה
// 4 טבעוני 
// 5 קינוח
//עד שילוב אחד בין כל דבר