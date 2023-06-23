import mongoose from "mongoose";

import contentModel from "./contentModel";
const Schema = mongoose.Schema
const brandSchema = new Schema({

    Name: {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Platform: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Describe: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Content: [{
        type: Schema.Types.ObjectId, ref: contentModel
    }]

})

export default mongoose.model("brand", brandSchema)