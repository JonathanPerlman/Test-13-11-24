import  express from "express";
import { login, register } from "../controllers/authControoler";
import {getMissileResources} from "../controllers/missileController";

const router = express.Router();

router.route("/getMissileResources").post(getMissileResources);
// router.route("/candidates").get(getAllCandidates);

export default router
