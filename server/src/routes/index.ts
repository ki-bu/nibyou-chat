/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */



import {Router} from "express";

const router = Router();

router.use("/users", require("./users"));
router.use("/chats", require("./chats"));
router.use("/messages", require("./messages"));

router.all("/ping", async (req, res) => {
    res.json({"pong":(new Date()).toISOString()});
});