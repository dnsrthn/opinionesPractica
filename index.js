import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import {defaultAdmin} from "./configs/createAdmin.js"

config()
initServer()
defaultAdmin()