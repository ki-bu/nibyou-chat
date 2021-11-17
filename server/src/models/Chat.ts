import {Schema, model, ObjectId} from "mongoose";

interface Chat {
    _id: ObjectId;
    /**ObjectIds of Chat participants*/
    participants: Array<ObjectId>;
    /**ObjectId of Chat Admin*/
    admin: ObjectId;
    /**Last message in Chat*/
    lastMessage: ObjectId;
    /**DateTime the Chat was created at*/
    createdAt: Date;
    /**DateTime the Chat was last updated at*/
    updatedAt: Date;
}

const ObjectIdVal = Schema.Types.ObjectId;

const schema = new Schema<Chat>({
    participants: {type: [ObjectIdVal], required: true},
    admin: {type: ObjectIdVal, required: true},
    lastMessage: {type: ObjectIdVal, required: false},
    createdAt: {type: Date, required: true, default: () => new Date()},
    updatedAt: {type: Date, required: true, default: () => new Date()}
});

const Chat = model<Chat>("Chat", schema);

export default Chat;