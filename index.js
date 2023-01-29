import express from "express";
import * as ipfs from "ipfs-http-client";
import indexRouter from "./routes/index.js";
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
