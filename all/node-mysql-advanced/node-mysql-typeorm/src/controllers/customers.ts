import { Customer } from '../entity/Customer'

export const createCustomer = async (record: Customer): Promise<Customer> => {
  const customer = Customer.create(record)
  return await customer.save()
}

export const findCustomers = async (
  customerId?: number,
  withRelations = false
): Promise<Customer[]> => {
  return await Customer.find({
    ...(customerId ? { where: { id: customerId } } : {}),
    ...(withRelations
      ? {
          relations: {
            orders: true,
          },
        }
      : {}),
  })
}

export const updateCustomer = async (
  customerId: number,
  data: Customer
): Promise<boolean> => {
  const res = await Customer.update(customerId, data)
  return res.affected ? true : false
}

export const deleteCustomer = async (customerId: number): Promise<boolean> => {
  const res = await Customer.delete(customerId)
  return res.affected ? true : false
}

// SELECT first_name, last_name, name as product_name FROM
// customers c
// join orders o on o.customer_id = c.id
// join `orders-products` op on o.id = op.order_id
// join products p on p.id = op.product_id
// where is_paid = true
// export const findCustomerOrdersProductsByPaidStatus = async (
//   customerId: number,
//   isPaid: boolean
// ): Promise<Customer[]> => {
//   return await Customer.find({
//     select: {
     
//       last_name: true,
//       points: true,
//       orders: {
//         order_date: true,
//         status: true,
//         is_paid: true,
//         products: {
//           name: true,
//           quantity: true,
//           unit_price: true,
        
//         },
//       },
//     },
//     where: {
//       id: customerId,
//       orders: { is_paid: isPaid },
//     },
//     relations: { orders: { products: true } },
//   })
// }
