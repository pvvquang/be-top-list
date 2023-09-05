import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler.middleware";
import routes from "./routes/routes";
import * as dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

const app: Express = express();
dotenv.config();

app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

//Server activation
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10) || 8081;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
