import { Router } from "express";
import country from "./infoCity.js"
const router = Router();

//product
router.use("/info", country)
//obtener ubicacion
router.get("/location", (req, res) => {
  const userLocation = req.headers["x-user-location"] || "Colombia";
  
  res.json({ location: userLocation });
})

export default router