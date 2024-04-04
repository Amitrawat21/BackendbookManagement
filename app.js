import express from "express"
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
import bookRouter from "./routes/bookRoutes.js"
import cors from "cors"
import "./dataConnect/Connect.js"



const app = express()
const PORT = 8000



app.use(cookieParser())
app.use(cors())
app.use(express.json())


app.use('/user',userRouter);
app.use('/book',bookRouter);




app.listen(PORT , ()=>{
    console.log(`port is running in ${PORT}`)
})