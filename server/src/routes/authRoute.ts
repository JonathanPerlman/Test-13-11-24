import  express from "express";
import { login, register } from "../controllers/authControoler";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/candidates").get(getAllCandidates);

export default router
