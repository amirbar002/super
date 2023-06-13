// import {
//   Column,
//   Entity,
//   BaseEntity,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   JoinColumn,
//   ManyToMany,
//   OneToMany,
//   JoinTable,
// } from "typeorm";

// import { Order } from "./Recipes";

// @Entity("customers")
// export class Customer extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   email: string;

//   @OneToMany(() => Order, (order) => order.customer)
//   orders: Order[];
// }
