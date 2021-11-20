/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */

import {Router} from 'express';
import OnboardingToken from '../models/OboardingToken';

const router = Router();

router.get("/:token", async (req, res) => {
    const token = req.params.token;
    const onboardingToken = await OnboardingToken.findById(token);
    if (onboardingToken) {
        // user is on frontend onboarding site, 
    } else {
        res.redirect("/");
    }
});