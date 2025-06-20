import { log } from "console"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const infoCity = (req,res)=>{
    const { country } = req.query
    console.log("Llegó a infoCity con:", country)
    const ruta = path.join(__dirname, "..", "..", "capturas", country, "captura.png")
    console.log(ruta);
    

    if (!fs.existsSync(ruta)) {
        return res.status(404).json({ error: "Informacion no encontrada" })
    }

  res.sendFile(ruta)
}

export {infoCity}