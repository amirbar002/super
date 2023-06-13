import { NOT_FOUND } from '../constants'
import { Order, Status } from '../entity/Recipes'
import { Product } from '../entity/Product'
import { findCustomers } from './customers'
import { findProducts } from './products'

export const createOrder = async (
  record: Order,
  productIds: number[]
): Promise<Order> => {
  const order = Order.create(record)

  const promises: Promise<Product[]>[] = []
  for (const productId of productIds) {
    promises.push(findProducts(productId))
  }

  const products = await Promise.all(promises)
  order.products = products.flat()
  return await order.save()
}

export const findOrders = async (
  orderId?: number,
  withRelations = false
): Promise<Order[]> => {
  return await Order.find({
    ...(orderId ? { where: { id: orderId } } : {}),
    ...(withRelations
      ? {
          relations: {
            customer: true,
            products: true,
          },
        }
      : {}),
  })
}

export const deleteOrder = async (orderId: number): Promise<boolean> => {
  const res = await Order.delete(orderId)
  return res.affected ? true : false
}


export const updateOrder = async (orderId: number, data:any): Promise<Order | typeof NOT_FOUND > => {
    const { products: productIds, customer: customerId, ...orderProps} = data
    const [order] = await findOrders(orderId)

    if(!order){
        return NOT_FOUND
    }

    if(data.customer){
        const [customer] = await findCustomers(customerId)

        if(!customer){
            return NOT_FOUND
        }

        order.customer = customer
    }

    if(data.products && data.products.length){
        const promises: Promise<Product[]>[] = []
        for (const productId of productIds) {
          promises.push(findProducts(productId))
        }
      
        const products = await Promise.all(promises)
    
        if(!products.length){
            return NOT_FOUND
        }
        order.products = products.flat()
    }

    for(const key in orderProps){
        order[key] = orderProps[key]
    }

    return await order.save()
}


export const joinAndGroupbyOrders = async (status: Status, lastNameArr: string[]): Promise<any> => {
    return await Order.createQueryBuilder('order')
    .select(['order.is_paid', 'product.currency', 'customer.last_name'])
    .addSelect('SUM(product.unit_price * product.quantity)', 'sum')
    .innerJoin('order.customer', 'customer')
    .innerJoin('order.products', 'product')
    .where('order.status = :theStatus', {theStatus: status})
    .groupBy('order.is_paid')
    .addGroupBy('customer.last_name')
    .addGroupBy('product.currency')
    .having('customer.last_name in (:lastNames)', {lastNames: lastNameArr})
    .getRawMany()
}