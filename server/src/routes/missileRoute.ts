import  express from "express";
import { login, register } from "../controllers/authControoler";
import {getOrganization} from "../controllers/organizationController";
import { getAttackData } from "../controllers/attackController";

const router = express.Router();

router.route("/defends").post(getOrganization);
router.route("/attack").post(getAttackData);
// router.route("/candidates").get(getAllCandidates);

export default router
