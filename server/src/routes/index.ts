import {Router} from "express";

const router = Router();

router.use("/users", require("./users"));
router.use("/chats", require("./chats"));
router.use("/messages", require("./messages"));

router.all("/ping", async (req, res) => {
    res.json({"pong":(new Date()).toISOString()});
});