import { Router } from "express";
import KelasController from "./Controller";

const router = Router();
const controller = new KelasController();

router.route('/kelas').get(controller.getKelas);
// router.route('/user/kelas').get(controller.getRiwayatStudy);

export default router;