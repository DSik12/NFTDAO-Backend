import * as ipfs from "ipfs-http-client";
import toBuffer from "it-to-buffer";
import fs from "fs";
const INFURA_ID = "2KxDO2PNOV13IytsfQkxycHI5Vw";
const INFURA_SECRET_KEY = "33d613aba4c02df19294f6d8c55b3cdb";
const auth =
  "Basic " +
  Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");
const client = ipfs.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
const client2 = ipfs.create({
  url: "https://mudemo.infura-ipfs.io",
  headers: {
    authorization: auth,
  },
});
const temp = {
  name: "nftserver",
  version: "1.0.0",
  description: "",
  main: "app.js",
  type: "module",
};
async function data(temp) {
  //
  // add data
  // const result = await client.add(temp, { pin: true });
  // console.log(result.cid.toString());

  // save file

  let data = fs.readFileSync("./logo.PNG");
  let options = {
    warpWithDirectory: false,
    progress: (prog) => console.log(`Saved :${prog}`),
  };
  let result = await client.add(data, options);
  console.log(result);

  // fetch data
  let asyncitr = client.cat(result.cid.toString());
  for await (const itr of asyncitr) {
    let data = Buffer.from(itr).toString();
    console.log(data);
  }

  return "hi";
}
const value = data(JSON.stringify(temp));

// const bufferedContents = await client; // returns a Buffer
// const stringContents = bufferedContents.toString();

// const result2 = await client2.get(
//   "QmNxZ5rgGQuqLjAok6vy3jXcemkdgP6DuRDYdsQXcF45Pv"
// );
// console.log(result2);
// const bufferedContents = await toBuffer(
//   client.cat("QmXs4ryhjS8aEnpoBxeziK7x9cK14UgCikfWbxPCbkJrFG")
// ); // returns a Buffer
// console.log(bufferedContents);
// const stringContents = bufferedContents.toString();
// console.log(stringContents);
//   for await (const chunk of client.cat(result.path)) {
//     console.info(chunk);
//   }
//   const stringContents = bufferedContents.toString();
//   console.log(stringContents);
