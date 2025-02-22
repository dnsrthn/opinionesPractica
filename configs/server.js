import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import userRoutes from "../routes/user.routes.js"
import authRoutes from "../routes/auth.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = async (app) =>{
    app.use("/opinionsAdmin/v1/auth", authRoutes)
    app.use("/opinionsAdmin/v1/user", userRoutes)
    app.use("/opinionsAdmin/v1/publication", publicationRoutes)
    app.use("/opinionsAdmin/v1/comment", commentRoutes)
    
}


const connectDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        connectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}