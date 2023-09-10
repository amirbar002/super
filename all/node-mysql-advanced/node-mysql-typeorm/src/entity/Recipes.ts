import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, Long} from 'typeorm'

@Entity('recipes')
export class Recipes extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('longblob', {nullable: true})
  img: Buffer;

  @Column()
  Ingredients: string

  @Column()
  Instructions: string

  @Column()
  type_of_food: number

  @Column({ default: 0 })
  type_of_food_two: number

  @Column()
  name: string

  @Column()
  phone: number
  
  @Column()
  foodName: string

}
