import express from "express"
import { addlist, getlist, dellist } from "../controller/brand_listController"
import brand_vali from "../middlewares/brand_auth"



const brandlist = express.Router()

brandlist.post("/brand/list/add", brand_vali, addlist)
brandlist.get("/brand/get/lists", brand_vali, getlist)
brandlist.delete("/brand/list/del/:ids", brand_vali, dellist)






export default brandlist