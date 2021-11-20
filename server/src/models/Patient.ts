/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */

import {Document, model, Model, ObjectId, Schema} from 'mongoose';

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface Patient {
    _id: ObjectId;
    user_id: ObjectId;
    address?: Address;
    phone?: string;
}

const schema = new Schema({
    user_id: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    address: {
        street: {type: String, required: false},
        city: {type: String, required: false},
        state: {type: String, required: false},
        zip: {type: String, required: false}
    },
    phone: {type: String, required: false}
});

const Patient = model<Patient>('Patient', schema);

export default Patient;