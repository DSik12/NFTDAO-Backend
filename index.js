import express from "express";
import * as ipfs from "ipfs-http-client";
import indexRouter from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = 3000;

const uri =
  "mongodb+srv://dummy:dummy%40123@cluster0.2unng.mongodb.net/MUDB?retryWrites=true&w=majority";
// Prints "MongoServerError: bad auth Authentication failed."
mongoose.set("strictQuery", true);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected sucessfully");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
