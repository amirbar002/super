
import { Recipes } from "../entity/Recipes";



export const createOrder = async (record: Recipes): Promise<Recipes> => {
  console.log(record, "record");
  const recipes = Recipes.create(record);
  return await recipes.save();
};



export const findOrders = async (
  recipesId?: string,
  withRelations = false
): Promise<Recipes[]> => {
  return await Recipes.find({
    ...(recipesId ? { where: { foodName: recipesId } } : {}),
  });
};

export const findOrderId = async (
  recipesId?: number,
  withRelations = false
): Promise<Recipes[]> => {
  return await Recipes.find({
    ...(recipesId ? { where: { type_of_food: recipesId } } : {}),
  });
};


export const deleteOrder = async (orderId: number): Promise<boolean> => {
  const res = await Recipes.delete(orderId);
  return res.affected ? true : false;
};

export const updateOrder = async (
  recipesId: number,
  data: Recipes
): Promise<boolean> => {
  const res = await Recipes.update(recipesId, data);
  return res.affected ? true : false;
};
