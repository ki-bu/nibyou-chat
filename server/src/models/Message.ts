/*
 * Copyright (c) 2021. K&B Software Solutions
 * Licensed to K&B Software Solutions under one or more contributor license agreements. See the LICENSE
 * file distributed with this work for additional information regarding licensing.
 *
 */



import {Document, Model, Schema, Query, model, ObjectId} from "mongoose";

interface Message {
    _id: ObjectId;
    /**The message's content. Encrypted with Chat's Data Key.*/
    _enc_text?: string;
    /**The message's attachment. Encrypted with Chat's Data Key.*/
    _enc_attachments?: [ObjectId];
    /**The Chat the message belongs to.*/
    chat: ObjectId;
    /**The User who sent the message. */
    sender: ObjectId;
    /**DateTime the message was sent.*/
    createdAt: Date;
}

const ObjectIdVal = Schema.Types.ObjectId;
const schema = new Schema<Message>({
        _enc_text: {type: String, required: false,},
        _enc_attachments: {type: [ObjectIdVal], required: false,},
        chat: {type: ObjectIdVal, required: true, ref: "Chat"},
        sender: {type: ObjectIdVal, required: true, ref: "User"},
        createdAt: {type: Date, required: true, default: () => new Date()},
});

interface MessageQueryHelpers {
    byChat(chat: ObjectId): Query<any, Document<Message>[]> & MessageQueryHelpers;
    bySender(sender: ObjectId): Query<any, Document<Message>[]> & MessageQueryHelpers;
    byChatAndSender(chat: ObjectId, sender: ObjectId): Query<any, Document<Message>[]> & MessageQueryHelpers;
}

/**
 * Get messages by chat
 * @param chat
 */
schema.query.byChat = function(chat: ObjectId): Query<any, Document<Message>[]> & MessageQueryHelpers {
    return this.find({chat: chat});
};

/**
 * Get messages by sender
 * @param sender
 */
schema.query.bySender = function(sender: ObjectId): Query<any, Document<Message>[]> & MessageQueryHelpers {
    return this.find({sender: sender});
};

/**
 * Get messages by chat and sender
 * @param chat
 * @param sender
 */
schema.query.byChatAndSender = function(chat: ObjectId, sender: ObjectId): Query<any, Document<Message>[]> & MessageQueryHelpers {
    return this.find({chat: chat, sender: sender});
};

const Message = model<Message, Model<Message, MessageQueryHelpers>>("Message", schema);

export default Message;