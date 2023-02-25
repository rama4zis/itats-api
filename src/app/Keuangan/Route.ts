import { Router } from "express";
import KeuanganController from "./Controller";

const router = Router();
const controller = new KeuanganController();

router.route('/user/keuangan').get(controller.getTagihan);
// router.route('/user/kelas').get(controller.getRiwayatStudy);

export default router;