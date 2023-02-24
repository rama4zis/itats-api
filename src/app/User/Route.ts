import { Router } from "express";
import UserController from "./Controller";

const router = Router();
const controller = new UserController();

router.route('/user').get(controller.getUser);

export default router;