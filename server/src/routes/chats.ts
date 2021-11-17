import {Router} from 'express';
import Chat from '../models/Chat';
import {AuthenticatedRequest, isAuthenticated} from "../middleware/auth";

const router = Router();

router.get("/", isAuthenticated, async (req, res) => {
    if(process.env.ENV === "dev") {
        const chats = await Chat.find();
        res.json(chats);
    } else {
        res.status(403).json({message: "Forbidden"});
    }
});

router.get("/:id", isAuthenticated, async (req, res) => {
    const chat = await Chat.findById(req.params.id);
    if(chat) {
        res.json(chat);
    } else {
        res.status(404).json({message: "Chat not found"});
    }
});

router.get("/own", isAuthenticated, async (req, res) => {
    const chats = await Chat.find({owner: (req as AuthenticatedRequest).user._id});
    res.json(chats);
});