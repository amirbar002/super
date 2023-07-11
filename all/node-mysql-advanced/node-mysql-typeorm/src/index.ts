import "dotenv/config";
import express, { Request, Response, Application } from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import orders from "./routers/recipes";
import bodyParser from "body-parser";

(async () => {
  try {
    await AppDataSource.initialize();

    console.log("Successfully connected to mysql");

    const app: Application = express();
    app.use(cors());

    app.use(express.json());
    app.use(express.json({ limit: "50mb"}));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(
      bodyParser.urlencoded({
        limit: "200mb",
        extended: true,
        parameterLimit: 1000000,
      })
    );

    app.use("/recipes", orders);

    app.use((req: Request, res: Response) => {
      res.status(400).send("Resource not found!");
    });

    app.listen(+process.env.APP_PORT, () =>
      console.log("Server is listening on port " + process.env.APP_PORT)
    );
  } catch (error) {
    console.error(error);
  }
})();
