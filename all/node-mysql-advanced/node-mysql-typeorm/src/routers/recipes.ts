import { Router, Request, Response } from "express";
import { NOT_FOUND } from "../constants";
import {
  createOrder,
  findOrders,
  deleteOrder,
  updateOrder,
  findOrderId,

} from "../controllers/recipes";
import multer from "multer";
import { MulterRequest } from "../types/types";
import { log } from "console";

const router: Router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.single("image"),
  async (req: MulterRequest, res: Response) => {
    try {
      if (!req.file) {
        console.log("not uploaded");

        return new Error("no file uploaded");
      }
      console.log("uploading");
      console.log(req.file.buffer, "buffer");

      const order = { ...req.body, img: req.file.buffer };
      console.log(order, "order");

      const newOrder = await createOrder(order);
      console.log("gooda");

      res.send(newOrder);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

router.get("/search/:id", async (req: Request, res: Response) => {
  try {
    const order = await findOrders(req.params.id);
    console.log(order , 'orders');
    
    order ? res.send(order) : res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await findOrderId(+req.params.id);
    console.log(order , 'orders');
    order ? res.send(order) : res.sendStatus(404);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await findOrders(null, true);
    orders.length ? res.send(orders) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
});



router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const responseData: any = await updateOrder(+req.params.id, req.body);
    responseData === NOT_FOUND ? res.sendStatus(404) : res.send(responseData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteOrder(+req.params.id);
    isDeleted
      ? res.send(`order ${req.params.id} is deleted`)
      : res.send("Nothing is deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
