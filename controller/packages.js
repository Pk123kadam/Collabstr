
import creatorModel from "../model/creatorModel"
import packagesModel from "../model/packagesModel"


export const addPackage = (req, res) => {
    try {

        const { platform, content, posts, price } = req.body

        const add = new packagesModel({
            platform, content, posts, price
        })

        const save = add.save()
        if (save) {
            return res.status(201).json({
                data: add,
                message: "successfully created"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const getPackage = async (req, res) => {
    try {

        const data = await packagesModel.find()
        if (data) {
            return res.status(201).json({
                data: data,
                message: "successfully created"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}




export const updatePackage = async (req, res) => {
    try {

        const { platform, content, posts, price } = req.body

        const upd = await packagesModel.updateOne({ _id: req.params.ids }, { $set: { platform, content, posts, price } })


        if (upd) {
            return res.status(201).json({
                data: upd,
                message: "successfully created"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


export const deletePackage = async (req, res) => {
    try {



        const del = await packagesModel.deleteOne({ _id: req.params.ids })


        if (del) {
            return res.status(201).json({
                data: del,
                message: "successfully created"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}