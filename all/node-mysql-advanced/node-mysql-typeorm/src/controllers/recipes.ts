import { NOT_FOUND } from "../constants";
import { Recipes  } from "../entity/Recipes";
import { Buffer } from "buffer";


export const createOrder = async (record: Recipes, imageBlob: Buffer): Promise<Recipes> => {
  const recipes = Recipes.create(record);
  recipes.img = imageBlob; 
  return await recipes.save();
};

// export const createOrder = async (record: Recipes): Promise<Recipes> => {
//   const order = Order.create(record);

//   const promises: Promise<Product[]>[] = [];
//   for (const productId of productIds) {
//     promises.push(findProducts(productId));
//   }

//   const products = await Promise.all(promises);
//   order.products = products.flat();
//   return await order.save();
// };

export const findOrders = async (
  recipesId?: number,
  withRelations = false
): Promise<Recipes[]> => {
  return await Recipes.find({
    ...(recipesId ? { where: { id: recipesId } } : {}),
  })
}

// export const findOrders = async (
//   orderId?: number,
//   withRelations = false
// ): Promise<Recipes[]> => {
//   return await Recipes.find({
//     ...(orderId ? { where: { id: orderId } } : {}),
//     ...(withRelations
//       ? {
//           relations: {
//             customer: true,
//             products: true,
//           },
//         }
//       : {}),
//   });
// };

export const deleteOrder = async (orderId: number): Promise<boolean> => {
  const res = await Recipes.delete(orderId);
  return res.affected ? true : false;
};

export const updateOrder = async (
  recipesId: number,
  data: Recipes
): Promise<boolean> => {
  const res = await Recipes.update(recipesId, data)
  return res.affected ? true : false
}

// export const updateOrder = async (
//   orderId: number,
//   data: any
// ): Promise<Recipes | typeof NOT_FOUND> => {
//   const { products: productIds, customer: customerId, ...orderProps } = data;
//   const [order] = await findOrders(orderId);

//   if (!order) {
//     return NOT_FOUND;
//   }

//   if (data.customer) {
//     const [customer] = await findCustomers(customerId);

//     if (!customer) {
//       return NOT_FOUND;
//     }

//     order.customer = customer;
//   }

//   if (data.products && data.products.length) {
//     const promises: Promise<Product[]>[] = [];
//     for (const productId of productIds) {
//       promises.push(findProducts(productId));
//     }

//     const products = await Promise.all(promises);

//     if (!products.length) {
//       return NOT_FOUND;
//     }
//     order.products = products.flat();
//   }

//   for (const key in orderProps) {
//     order[key] = orderProps[key];
//   }

//   return await order.save();
// };

// export const joinAndGroupbyOrders = async (
//   status: Status,
//   lastNameArr: string[]
// ): Promise<any> => {
//   return await Order.createQueryBuilder("order")
//     .select(["order.is_paid", "product.currency", "customer.last_name"])
//     .addSelect("SUM(product.unit_price * product.quantity)", "sum")
//     .innerJoin("order.customer", "customer")
//     .innerJoin("order.products", "product")
//     .where("order.status = :theStatus", { theStatus: status })
//     .groupBy("order.is_paid")
//     .addGroupBy("customer.last_name")
//     .addGroupBy("product.currency")
//     .having("customer.last_name in (:lastNames)", { lastNames: lastNameArr })
//     .getRawMany();
// };
