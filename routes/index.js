import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("User", userSchema);

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi from backend");
});

router.post("/register", (req, res) => {
  const salt = uuidv4();
  const user = new Contact();
  user.name = req.body.name;
  user.email = req.body.email;
  user.hashed = crypto
    .pbkdf2Sync(req.body.password, salt, 100, 32, "sha256")
    .toString("hex");
  user.salt = salt;
  user
    .save()
    .then((data) => {
      res.status(200).json({ message: "Signup Successful" });
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
      console.log(error.code);
      if (error.code == 11000) {
        // res.render("signup", { message: "User already Present" });
        res.json({ message: "User already Present" });
      } else {
        // res.render("signup", { message: error.message });
        res.json({ message: error.message });
      }
    });
});

router.post("/login", (req, res) => {
  Contact.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      const hashed_pass = crypto
        .pbkdf2Sync(req.body.password, user.salt, 100, 32, "sha256")
        .toString("hex");
      if (hashed_pass == user.hashed) {
        const token = jwt.sign({ id: user._id }, "qwerty", {
          expiresIn: "1h",
        });
        console.log(token);
        res.cookie("token", token);
        res.status(200).json({ message: "Sign in sucessful " });
        // });
        // res.redirect("/dashboard");
      }
    })
    .catch((error) => {
      // res.render("index", { message: error });
      res.status(400).json({ error });
    });
});

export default router;
