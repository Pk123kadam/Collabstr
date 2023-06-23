import mongoose from "mongoose";
import creatorModel from "./creatorModel";
import brandModel from "./brandModel";
const Schema = mongoose.Schema
const listSchema = new Schema({

    Name: { type: String, required: true },
    Brand: { type: String, required: true },

    creator: {
        type: Schema.Types.ObjectId, ref: creatorModel
    },


})

export default mongoose.model("list", listSchema)