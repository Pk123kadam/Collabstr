import mongoose from "mongoose";
const Schema = mongoose.Schema
const contentSchema = new Schema({


    Content: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Images: [{
        type: String,
        required: true
    }],

})

export default mongoose.model("content", contentSchema)