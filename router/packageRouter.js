import express from "express"
import auth from "../middlewares/creator_auth"
import { addPackage, deletePackage, updatePackage, getPackage } from "../controller/packages"


const packageRouter = express.Router()
packageRouter.get("/creator/packages", auth, getPackage)

packageRouter.delete("/creator/package/del/:ids", auth, deletePackage)
packageRouter.patch("/creator/package/update/:ids", auth, updatePackage)
// packageRouter.post("/creator/package/add", auth, addPackage)

packageRouter.post("/creator/package/add", auth, addPackage)

export default packageRouter