import { adminRouter } from "./routes/admin.router";
import { userRouter } from "./routes/user.router";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import db from "./models/index";
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { SERVER_PORT } = process.env;
db.sequelize.sync().then(() => {
  app.listen(SERVER_PORT || 8080, (): void => {
    console.log(
      `Server is running on port ${process.env.PORT} : http://localhost:${SERVER_PORT}`
    );
  });
}).catch((err:Error)=>{console.log(err)});

// ===========Routes===========
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ welocme: "welcome to Online Course platform" });
});
userRouter(app);
adminRouter(app);
//=============================

// Error handler middleware
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    return res.status(500).json({ err });
  }
);

// notFound endpoint middleware
app.use((req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json({ err: "Not Found" });
});
