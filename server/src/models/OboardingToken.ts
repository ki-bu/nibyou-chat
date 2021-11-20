/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */

import {Document, model, Model, ObjectId, Schema} from 'mongoose';

interface OnboardingToken {
    _id: ObjectId;
    practitionerId: ObjectId;
    patientId: ObjectId;
    createdAt: Date;
    expiresAt: Date;
}

const schema = new Schema<OnboardingToken>({
    practitionerId: {type: Schema.Types.ObjectId, required: true, ref: 'Practitioner'},
    patientId: {type: Schema.Types.ObjectId, required: true, ref: 'Patient'},
    createdAt: {type: Date, required: true, default: () => new Date()},
    expiresAt: {type: Date, required: true, default: () => new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7))} // valid for 7 days
});

const OnboardingToken = model<OnboardingToken>('OnboardingToken', schema);

export default OnboardingToken;