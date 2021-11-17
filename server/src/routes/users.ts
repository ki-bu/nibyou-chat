import {Router} from "express";
import User from "../models/User";

const router = Router();

router.get("/", async (req, res) => {
    if(process.env.ENV === "dev") {
        const users = await User.find();
        res.json(users);
    } else {
        res.status(403).json({message: "Forbidden"});
    }
});

