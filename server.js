import 'dotenv/config.js';
import express from "express";
import cors from "cors"
import morgan from "morgan"
import routesIndex from "./router/index.js"

const server = express() 
const PORT = process.env.PORT

const ready = () => console.log("server ready in port: ", PORT)
server.set('trust proxy', true)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())
server.use(morgan('dev'))

server.use("/api", routesIndex)
console.log("salio");



server.listen(PORT, ready)

