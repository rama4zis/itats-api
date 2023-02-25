import { Router } from "express";
import UserController from "./Controller";

const router = Router();
const controller = new UserController();

router.route('/user').get(controller.getUser);
router.route('/user/riwayat').get(controller.getRiwayatStudy);

export default router;