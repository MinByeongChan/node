import express from "express";
import Account from "../model/Account";

const router = express.Router();

router.post(
  "/register/local",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("register");
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.post(
  "/login/local",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("login");
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.get(
  "/exists/:key(email|username)/:value",
  async (req: express.Request, res: express.Response) => {
    try {
      console.log("existed");
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.post("/logout", async (req: express.Request, res: express.Response) => {
  try {
    console.log("logout");
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
