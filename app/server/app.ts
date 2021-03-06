import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// const postsRoute = require("./routes/posts");
import postsRoute from "./routes/posts";
import booksRoute from "./routes/books";
import authRoute from "./routes/auth";

const app: express.Application = express();

dotenv.config();

//Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/posts", postsRoute);
app.use("/books", booksRoute);
app.use("/auth", authRoute);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello Back-end");
});

app.use("/posts", () => {
  console.log(`This is a middleware running`);
});

app.use("/books", () => {
  console.log(`This is a book middleware running`);
});

// Node.js의 native Promise 사용
// mongoose는 프로미스를 지원한다. mongoose가 자체적으로 지원하는 mPromise는 deprecated되었으므로 Node.js가 지원하는 ES6의 promise를 사용한다.
mongoose.Promise = global.Promise;

const DB_CONNECTION: string = process.env.DB_CONNECTION!;

//Connect TO DB
mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to DB!!");
  })
  .catch((e) => {
    console.log("error:", e);
  });

app.listen(process.env.PORT);
