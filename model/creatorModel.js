import mongoose from "mongoose";
import creator_package from "../model/packagesModel"
const Schema = mongoose.Schema

const creatorModel = new Schema({

    Name: {
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
    Location: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Packages: [{
        type: Schema.Types.ObjectId, ref: creator_package
    }]
})

export default mongoose.model("creators", creatorModel)