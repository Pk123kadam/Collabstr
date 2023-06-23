
import creatorModel from "../model/creatorModel";
import packagesModel from "../model/packagesModel";

import brandModel from "../model/brandModel";
import multer from "multer";
import { creator_storage } from "../multer/mult";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import fs from "fs"


export const getCreators = async (req, res) => {
    try {

        let datas;
        let skip;

        let sel;
        const { loc, gen, tit, pri, plat, limit, sort, select } = req.query

        // if (loc && gen && tit && pri && plat) {
        //     const query1 = { $and: [{ Location: { $regex: `.*${loc}.*`, $options: "i" } }, { Gender: { $regex: `.*${gen}.*`, $options: "i" } }] };
        //     const query2 = { Title: { $regex: `.*${tit}.*`, $options: "i" } }
        //     await creatorModel.find({ $and: [query1, query2] }).populate({
        //         path: 'Packages',
        //         match: { $and: [{ platform: plat }, { price: { $lte: pri } }] }
        //     }).exec().then(posts => {
        //         datas = posts.filter((e) => e.Packages.length != 0)
        //     })
        //         .catch(err => {

        //             console.error(err);
        //         });

        // }
        // else if ((loc || gen || tit) && (pri || plat)) {
        //     console.log("kok")
        //     await creatorModel.find({
        //         $or: [
        //             { Location: { $regex: `.*${loc}.*`, $options: "i" } },
        //             { Gender: { $regex: `.*${gen}.*`, $options: "i" } },
        //             { Title: { $regex: `.*${tit}.*`, $options: "i" } },

        //         ],
        //     }).populate({
        //         path: 'Packages',
        //         match: { $or: [{ platform: plat }, { price: { $lte: pri } }] }
        //     }).exec().then(posts => {
        //         datas = posts.filter((e) => e.Packages.length != 0)
        //     })
        //         .catch(err => {

        //             console.error(err);
        //         });

        // }


        // else if (loc || gen || tit) {
        //     console.log("ll")
        //     await creatorModel.find({
        //         $or: [
        //             { Location: { $regex: `.*${loc}.*`, $options: "i" } },
        //             { Gender: { $regex: `.*${gen}.*`, $options: "i" } },
        //             { Title: { $regex: `.*${tit}.*`, $options: "i" } },

        //         ],
        //     }).populate({
        //         path: 'Packages',

        //     }).exec().then(posts => {
        //         datas = posts
        //     })
        //         .catch(err => {

        //             console.error(err);
        //         });

        // }
        // else if (pri || plat) {
        //     console.log("p")
        //     await creatorModel.find({}).populate({
        //         path: 'Packages',
        //         match: { $or: [{ platform: plat }, { price: { $lte: pri } }] }
        //     }).exec().then(posts => {
        //         datas = posts.filter((e) => e.Packages.length != 0)
        //     })
        //         .catch(err => {

        //             console.error(err);
        //         });

        // }


        // else {


        //     await creatorModel.find({})
        //         .populate({
        //             path: 'Packages',

        //         })
        //         .exec()
        //         .then(posts => {
        //             datas = posts
        //         })
        //         .catch(err => {
        //             // handle error case
        //             console.error(err);
        //         });
        // }
        const query_obj = {}
        const pop_obj = {}
        if (select) {
            sel = select.split(",").join(" ")

        }
        if (loc) {
            query_obj.Location = { $regex: `.*${loc}.*`, $options: "i" }
        }
        if (gen) {
            query_obj.Gender = { $regex: `.*${gen}.*`, $options: "i" }
        }
        if (tit) {
            query_obj.Title = { $regex: `.*${tit}.*`, $options: "i" }
        }
        if (pri) {

            pop_obj.path = "Packages"
            pop_obj.match = { price: { $lte: pri } }
        }
        if (plat) {

            pop_obj.path = "Packages"
            pop_obj.match = { platform: plat }
        }
        let page = Number(req.query.page) || 1
        skip = (page - 1) * limit

        if (Object.keys(pop_obj).length == 0) {

            console.log("not")
            datas = await creatorModel.find(query_obj).populate("Packages").limit(limit).skip(skip)
            console.log(datas)
        }

        else if (Object.keys(query_obj).length == 0) {

            console.log("got")
            console.log(pop_obj)
            const data = await creatorModel.find().populate(pop_obj).limit(limit).skip(skip)
            console.log(data)
            datas = data.filter((e) => e.Packages.length !== 0)

        }


        else {
            console.log("hii")
            const data = await creatorModel.find(query_obj).populate(pop_obj).limit(limit).skip(skip)
            datas = data.filter((e) => e.Packages.length !== 0)

        }
        if (datas) {
            return res.status(200).json({
                creators: datas,
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
export const login = async (req, res) => {
    try {

        const { Email, Password } = req.body
        console.log(Password)

        const data = await creatorModel.findOne({ Email: Email })
        const data_2 = await brandModel.findOne({ Email: Email })



        if (data_2) {

            const match = await bcrypt.compare(Password, data_2.Password)
            if (match) {

                const token = jwt.sign({ data_2 }, process.env.SECRET_KEY)
                return res
                    .cookie("jwt", token).status(200)
                    .json({ message: "Logged in successfully as a Brand 😊 👌" });
            } else {
                return res.status(400).json({
                    message: "Invalid credentials"
                })
            }

        }
        else if (data) {
            console.log("data")
            const match = await bcrypt.compare(Password, data.Password)
            if (match) {
                const token = jwt.sign({ data }, process.env.SECRET_KEY)
                return res
                    .cookie("jwt", token).status(200)
                    .json({ message: "Logged in successfully as a Creator 😊 👌" });
            } else {
                return res.status(400).json({
                    message: "Invalid credentials"
                })
            }
        } else {
            return res.status(404).json({
                message: "user not found"
            })

        }

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


export const addCreator = (req, res) => {
    try {
        const upload = multer({ storage: creator_storage })
        const uploadData = upload.single("image")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            const { Name, Email, Password, Location, Title, Description, Gender, Image, Packages } = req.body

            const existUser = await creatorModel.findOne({ Email: Email });
            const existUser_2 = await brandModel.findOne({ Email: Email })
            if (existUser || existUser_2) {
                if (req.file) {
                    fs.unlinkSync(`uploads/creator.image/${req.file.filename}`)
                }
                return res.status(403).json({
                    message: 'User already exists'
                })
            }
            const image = req.file.filename
            const hashPassword = bcrypt.hashSync(Password, 10);

            const add = new creatorModel({
                Name, Email, Password: hashPassword, Location, Title, Description, Gender, Image: image, Packages

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
        return res.status(500).json({
            message: err.message
        })
    }
}


export const updateCreator = (req, res) => {
    try {
        const upload = multer({ storage: creator_storage })
        const uploadData = upload.single('image');

        uploadData(req, res, async (err) => {

            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }


            const { Name, Email, Password, Location, Title, Description, Gender, Packages } = req.body;

            const olduserData = await creatorModel.findOne({ _id: req.id })
            let image;

            if (req.file) {
                image = req.file.filename
                fs.unlink(`uploads/creator.image/${olduserData.Image}`, async (err) => {
                    if (err) {
                        return res.status(400).json({ message: err })
                    }
                    console.log('deleted')
                })
            }
            let pass
            if (Password) {
                pass = bcrypt.hashSync(Password, 10)
            }


            const updateData = await creatorModel.updateOne({ _id: req.id }, { $set: { Name, Email, Password: pass, Location, Title, Description, Gender, Image: image, Packages } })
            if (updateData) {
                return res.status(200).json({
                    data: updateData,
                    message: 'Data updated!'

                })
            }
            else {
                return res.status(400).json({
                    message: 'Data updation failed!'
                })
            }

        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong: " + error.message
        })
    }
}


export const deleteCreator = async (req, res) => {
    try {

        const data = await creatorModel.findOne({ _id: req.id })
        fs.unlink(`uploads/creator.image/${data.Image}`, async (err) => {
            if (err) {
                return res.status(400).json({ message: err })
            }

        })

        const del = await creatorModel.deleteOne({ _id: req.id })
        if (del) {
            return res.status(200).json({
                message: "successfully deleted",
                data: del
            })
        } else {
            return res.status(400).json({
                message: "something went wrong"
            })
        }
    }

    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}