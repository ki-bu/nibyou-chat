/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */



import {Router} from "express";
import User from "../models/User";
import {AuthenticatedRequest, isAuthenticated} from "../middleware/auth";
import Patient from "../models/Patient";
import OnboardingToken from "../models/OboardingToken";

const router = Router();

router.get("/", async (req, res) => {
    if(process.env.ENV === "dev") {
        const users = await User.find();
        res.json(users);
    } else {
        res.status(403).json({message: "Forbidden"});
    }
});

/**
 * @api {post} /addPatient Let's Practitioner add a patient
 */
router.post("/addPatient", isAuthenticated, (req, res) => {
    if((req as AuthenticatedRequest).user.userType === "practitioner") {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            hin: req.body.hin,
            userType: "patient"
        });
        user.save().then(u_patient => {
            const patient = new Patient({
                user_id: u_patient._id
            });
            patient.save().then(p_patient => {
                const onboardingToken = new OnboardingToken({
                    practitionerId: (req as AuthenticatedRequest).user._id,
                    patientId: p_patient._id
                });
                onboardingToken.save().then(token => {
                    res.json({
                        message: "Patient added successfully",
                        token: token._id
                    });
                });
            }).catch(err => {
                res.status(500).json({message: err.message});
            });
        }).catch((err) => {
            res.status(400).json({message: err});
        });
    } else {
        res.status(403).json({message: "Forbidden"});
    }
})