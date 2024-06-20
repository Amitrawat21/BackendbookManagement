import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
import bookRouter from "./routes/bookRoutes.js"
import cors from "cors"
import "./dataConnect/Connect.js"
import dotenv from "dotenv"


dotenv.config()
const app = express()
const port = process.env.PORT || 8000



app.use(cookieParser())
app.use(cors())
app.use(express.json())


app.use('/user',userRouter);
app.use('/book',bookRouter);




app.listen(port , ()=>{
    console.log(`port is running in ${port}`)
})