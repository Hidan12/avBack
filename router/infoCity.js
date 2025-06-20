import { Router } from "express";
import { infoCity } from "../controllers/informacion/infoCity.js";

const router = Router()

router.get("/country",infoCity)

export default router