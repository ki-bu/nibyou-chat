/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */



import * as fs from "fs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {Request} from "express";

const cert = fs.readFileSync('../../public.pem');  // get public key shared from auth service

type AuthUser = {
    id: string;
    email: string;
    verified: boolean;
}

type AuthenticatedRequest = Request & {
    user: User;
    authUser: AuthUser;
};

/**
 * @description Verifies the JWT token
 * @param token JWT token
 * @returns {Promise<any>} JWT payload
 */
const verify = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, cert, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

/**
 * @description Verifies the authentication token and returns the user object to next middleware
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns void if token is invalid, user object if token is valid
 */
const isAuthenticated = (req: any, res: any, next: any) => {
    const token = req.headers.authorization || req.body.token || req.query.token;
    if (!token) {
        return res.status(401).send({
            message: "No token provided"
        });
    }
    verify(token)
        .then(async (decoded:any) => {
            req.authUser = decoded as AuthUser
            req.user = await User.find().byAccId((decoded as AuthUser).id);
            next();
        })
        .catch(() => {
            return res.status(403).send({
                message: "Invalid token"
            });
        });
};

export {
    verify,
    isAuthenticated,
    AuthenticatedRequest
}