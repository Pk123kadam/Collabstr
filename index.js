import bodyParser from "body-parser"
import * as dotenv from "dotenv"

dotenv.config()
import express from "express"
import mongoose from "mongoose"
import creatorRoute from "./router/creatorRoute"
import packageRouter from "./router/packageRouter"
import cookieParser from "cookie-parser"
import brandRoute from "./router/brandRoute"
import contentRoute from "./router/contentRouter"
import brandlist from "./router/brand_listRoute"
    
mongoose.connect('mongodb://127.0.0.1:27017/collabstr').then(() => { console.log("connected to database") })

const app = express()

app.use(bodyParser.json())

app.use(express.static(__dirname))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(creatorRoute)
app.use(brandRoute)
app.use(packageRouter)
app.use(contentRoute)
app.use(brandlist)


app.listen(process.env.PORT, () => {
    console.log("connected to port 6060")
})