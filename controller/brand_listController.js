
import brand_listModel from "../model/brand_listModel"
import creatorModel from "../model/creatorModel"
import packagesModel from "../model/packagesModel"



export const addlist = async (req, res) => {
    try {
        const { Name, Brand, creator } = req.body


        const add = new brand_listModel({
            Name, Brand, creator
        })

        const save = await add.save()

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
            messaeg: err.messaeg
        })
    }

}

export const getlist = async (req, res) => {
    try {

        const find = await brand_listModel.find({ Brand: req.id }).populate({
            path: "creator", populate: {
                path: "Packages",
                model: packagesModel
            }
        })

        console.log(req.id)
        if (find) {
            return res.status(200).json({
                data: find,
                message: "fetched"
            })
        } else {
            return res.status(400).json({
                message: "somehting went wrong"
            })
        }



    } catch (err) {
        return res.status(500).json({
            message: err.messaeg
        })
    }
}

export const dellist = async (req, res) => {
    try {
        const del = await brand_listModel.deleteOne({ _id: req.params.ids })
        if (del) {
            return res.status(200).json({
                message: "successfully deleted"
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

    } catch (err) {
        return res.status(500).json({
            message: err.messaeg
        })
    }
}