/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL||"mongodb://localhost:27017/test").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});