import multer from "multer";
import fs from "fs"

export const creator_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync("uploads/" + "creator.image") == false) {

            fs.mkdirSync("uploads/" + "creator.image")
        }


        cb(null, "uploads/" + "creator.image")
    },
    filename: function (req, file, cb) {
        const name = file.originalname

        const arr = name.split(".")
        const ext = arr[arr.length - 1]
        arr.pop()

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, arr.join(".") + '-' + uniqueSuffix + "." + ext)

    }
})


export const content_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync("uploads/" + "content.image") == false) {

            fs.mkdirSync("uploads/" + "content.image")
        }


        cb(null, "uploads/" + "content.image")
    },
    filename: function (req, file, cb) {
        const name = file.originalname

        const arr = name.split(".")
        const ext = arr[arr.length - 1]
        arr.pop()

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, arr.join(".") + '-' + uniqueSuffix + "." + ext)

    }
})

export const brand_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync("uploads/" + "brand.image") == false) {

            fs.mkdirSync("uploads/" + "brand.image")
        }


        cb(null, "uploads/" + "brand.image")
    },
    filename: function (req, file, cb) {
        const name = file.originalname

        const arr = name.split(".")
        const ext = arr[arr.length - 1]
        arr.pop()

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, arr.join(".") + '-' + uniqueSuffix + "." + ext)

    }
})