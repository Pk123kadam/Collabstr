
import brandModel from '../model/brandModel';
import { brand_storage } from '../multer/mult';
import creatorModel from '../model/creatorModel';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';
import fs from "fs"




// export const login = async (req, res) => {
//     try {

//         const { Email, Password } = req.body
//         console.log(Password)

//         const data = await brandModel.findOne({ Email: Email })
//         console.log(data)
//         if (!data) {
//             return res.status(404).json({
//                 message: "user not found"
//             })
//         }


//         const match = await bcrypt.compare(Password, data.Password)
//         if (match) {
//             const token = jwt.sign({ data }, "secret")
//             return res
//                 .cookie("access_token", token).status(200)
//                 .json({ message: "Logged in successfully 😊 👌" });
//         } else {
//             return res.status(400).json({
//                 message: "Invalid credentials"
//             })
//         }

//     } catch (err) {
//         return res.status(500).json({
//             message: err.message
//         })
//     }
// }

export const getBrands = async (req, res) => {
    try {
        const data = await brandModel.find().populate("Content")

        if (data) {
            return res.status(200).json({
                data: data,
                message: "fetched"
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


export const addBrand = async (req, res) => {
    try {
        const upload = multer({ storage: brand_storage })
        const uploadData = upload.single("image")

        uploadData(req, res, async function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            const { Name, Email, Password, Brand, Platform, Image, Describe, Title, Content } = req.body

            const existUser = await brandModel.findOne({ Email: Email });
            const existUser_2 = await creatorModel.findOne({ Email: Email })

            if (existUser || existUser_2) {
                if (req.file) {
                    fs.unlinkSync(`uploads/brand.image/${req.file.filename}`)
                }
                return res.status(403).json({
                    message: 'User already exists'
                })
            }
            const image = req.file.filename
            const hashPassword = bcrypt.hashSync(Password, 10);

            const add = new brandModel({
                Name, Email, Password: hashPassword, Brand, Platform, Image: image, Describe, Title, Content
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

        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



export const updateBrand = (req, res) => {
    try {

        const upload = multer({ storage: brand_storage })
        const uploadData = upload.single('image');

        uploadData(req, res, async (err) => {

            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }




            const { Name, Email, Password, Brand, Platform, Image, Describe, Title, Content } = req.body;

            const olduserData = await brandModel.findOne({ _id: req.id })
            let image;

            if (req.file) {
                image = req.file.filename
                fs.unlink(`uploads/brand.image/${olduserData.Image}`, async (err) => {
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


            const updateData = await brandModel.updateOne({ _id: req.id }, { $set: { Name, Email, Password: pass, Brand, Platform, Image: image, Describe, Title, Content } })
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

export const deleteBrand = async (req, res) => {
    try {

        const data = await brandModel.findOne({ _id: req.id })
        fs.unlinkSync(`uploads/brand.image/${data.Image}`)

        const del = await brandModel.deleteOne({ _id: req.id })
        if (del) {
            return res.status(200).json({
                data: del,
                message: "deleted"
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

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt")
        res.end()





    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


