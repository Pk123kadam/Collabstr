import express from "express"
import { login, addCreator, updateCreator, deleteCreator, getCreators } from "../controller/creatorController"
import auth from "../middlewares/creator_auth"


const creatorRoute = express.Router()
creatorRoute.patch("/creator/update", auth, updateCreator)
creatorRoute.delete("/creator/delete", auth, deleteCreator)

creatorRoute.post("/login", login)
creatorRoute.get("/creators", getCreators)

creatorRoute.post("/creator/add", addCreator)

export default creatorRoute