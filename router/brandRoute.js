import express from "express"
import { addBrand, updateBrand, logout, deleteBrand, getBrands } from "../controller/brandController"
import brand_vali from "../middlewares/brand_auth"



const brandRoute = express.Router()

brandRoute.get("/brands", brand_vali, getBrands)

brandRoute.get("/logout", logout)
brandRoute.patch("/brand/update", brand_vali, updateBrand)
brandRoute.delete("/brand/delete", brand_vali, deleteBrand)

brandRoute.post("/brand/add", addBrand)


export default brandRoute