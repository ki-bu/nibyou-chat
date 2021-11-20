/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */

import {Schema, ObjectId, model} from "mongoose";

interface Address {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface Practitioner {
    _id: ObjectId;
    /**The Practitioner's User Account ID */
    user_id: ObjectId;
    phone: string;
    address: Address;
}

const schema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    phone: String,
    address: {
        name: String,
        street: String,
        city: String,
        state: String,
        zip: String
    }
});

const Practitioner = model<Practitioner>('Practitioner', schema);

export default Practitioner;