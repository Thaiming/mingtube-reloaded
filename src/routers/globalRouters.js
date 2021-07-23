import express from "express";
import {
    join
} from "../userController";
import {
    trending
} from "../videoController";


const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("join", join);

export default globalRouter;