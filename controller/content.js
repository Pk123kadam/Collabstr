import { content_storage } from "../multer/mult"
import contentModel from "../model/contentModel"
import multer from "multer"
import fs from "fs"

export const addContent = async (req, res) => {

    try {
        const upload = multer({ storage: content_storage })
        const uploadData = upload.array("images")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            const { Brand, Content, Quantity } = req.body
            let images = []
            req.files.forEach((e) => {
                images.push(e.filename)
            })

            const add = new contentModel({
                Brand,
                Content, Quantity, Images: images


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

        })

    } catch (err) {

    }
}

export const getContent = async (req, res) => {
    try {
        const data = await contentModel.find({})
        if (data) {
            return res.status(200).json({
                data: data,
                message: "successfully fetched"
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

export const updateContent = async (req, res) => {
    try {
        let upd;


        // const data = await contentModel.findOne({ Brand: req.id })

        const upload = multer({ storage: content_storage })
        const uploadData = upload.array("images")
        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            console.log(req.files.filename)
            const { Content, Quantity, imgg } = req.body

            if (req.files.length !== 0 && imgg) {

                imgg.split(" ").forEach(async (e) => {


                    fs.unlinkSync("uploads/" + "content.image/" + e)
                    await contentModel.updateOne({ _id: req.params.ids }, { $pull: { Images: e }, $set: { Content, Quantity } })
                })

                req.files.forEach(async (i) => {
                    await contentModel.updateOne({ _id: req.params.ids }, { $push: { Images: i.filename }, $set: { Content, Quantity } })

                })



            } else if (req.files.length == 0 && imgg) {
                imgg.split(" ").forEach(async (e) => {


                    fs.unlink("uploads/" + "content.image/" + e, function (err) {
                        if (err) {
                            return res.status(400).json({

                                message: "something went wrong"
                            })
                        }
                    })
                    await contentModel.updateOne({ _id: req.params.ids }, { $pull: { Images: e }, $set: { Content, Quantity } })
                })

            } else if (req.files.length !== 0) {
                req.files.forEach(async (i) => {
                    await contentModel.updateOne({ _id: req.params.ids }, { $push: { Images: i.filename }, $set: { Content, Quantity } })

                })
            }
            else {

                upd = await contentModel.updateOne({ _id: req.params.ids }, { $set: { Content, Quantity } })

            }

            if (upd) {
                return res.status(200).json({
                    data: upd,
                    message: "successfully updated"
                })
            } else {
                return res.status(400).json({
                    message: "something went wrong"
                })
            }

        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

export const deleteContent = async (req, res) => {

    try {


        const fin = await contentModel.findOne({ _id: req.params.ids })



        fin.Images.forEach((v) => {

            fs.unlink("uploads/" + "content.image/" + v, function (err) {
                if (err) {
                    res.status(400).json({

                        message: "something went wrong"
                    })
                }
            })
        })


        const del = await contentModel.deleteOne({ _id: req.params.ids })
        if (del) {
            res.status(200).json({
                message: "successfully deleted"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

}
