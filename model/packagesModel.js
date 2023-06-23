import mongoose from "mongoose";

const Schema = mongoose.Schema
const packageSchema = new Schema({
    platform: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    posts: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export default mongoose.model("packages", packageSchema)