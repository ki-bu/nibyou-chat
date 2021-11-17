import {Document, Model, Schema, Query, model, ObjectId} from "mongoose";

interface User {
    _id: ObjectId
    /**The user's account id provided by the authentication provider.*/
    acc_id?: string;
    /**The user's name*/
    name: string;
    /**The user's email*/
    email: string;
    /**The user's Health Insurance Number*/
    hin: string;
    /**The user's public key*/
    publicKey?: string;
    /**The user's private key*/
    _enc_privateKey?: string;
    /**The user's Data Keys*/
    _enc_dataKeys: Array<any>;
    /**The user's avatar blob*/
    avatar?: string;
    /**DateTime the account was created at*/
    createdAt?: Date;
    /**DateTime the account was updated at*/
    updatedAt?: Date;
}

const schema = new Schema<User>({
    acc_id: {type: String, required: false, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    hin: {type: String, required: true, unique: true},
    publicKey: {type: String, required: false, unique: true},
    _enc_privateKey: {type: String, required: false},
    _enc_dataKeys: {type: [Object], required: true},
    avatar: {type: String, required: false},
    createdAt: {type: Date, required: false, default: () => new Date()},
    updatedAt: {type: Date, required: false, default: () => new Date()}
});

interface UserQueryHelpers {
    byEmail(email: string): Query<any, Document<User>> & UserQueryHelpers;
    byHin(hin: string): Query<any, Document<User>> & UserQueryHelpers;
    byAccId(acc_id: string): Query<any, Document<User>> & UserQueryHelpers;
    byPublicKey(publicKey: string): Query<any, Document<User>> & UserQueryHelpers;
}

/**
 * Get a user by email
 * @param email
 */
schema.query.byEmail = function(email: string): Query<any, Document<User>> & UserQueryHelpers {
    return this.find({email: email});
};

/**
 * Get a user by Health Insurance Number
 * @param hin
 */
schema.query.byHin = function(hin: string): Query<any, Document<User>> & UserQueryHelpers {
    return this.find({hin: hin});
};

/**
 * Get a user by auth account id
 * @param acc_id
 */
schema.query.byAccId = function(acc_id: string): Query<any, Document<User>> & UserQueryHelpers {
    return this.find({acc_id: acc_id});
};

/**
 * Get a user by public key
 * @param publicKey
 */
schema.query.byPublicKey = function(publicKey: string): Query<any, Document<User>> & UserQueryHelpers {
    return this.find({publicKey: publicKey});
};

schema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const User = model<User, Model<User, UserQueryHelpers>>("User", schema);

export default User;