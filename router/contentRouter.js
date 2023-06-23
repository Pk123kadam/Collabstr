import express from "express"
import { addContent, updateContent, getContent, deleteContent } from "../controller/content"
import brand_auth from "../middlewares/brand_auth"


const contentRoute = express.Router()
contentRoute.patch("/brand/content/upd/:ids", brand_auth, updateContent)
contentRoute.delete("/brand/content/del/:ids", brand_auth, deleteContent)

contentRoute.post("/brand/content/add", brand_auth, addContent)
contentRoute.get("/brand/content", brand_auth, getContent)


export default contentRoute