const express = require("express");
const cors = require("cors");
const app =  express();
const dotenv =  require("dotenv") 
dotenv.config() 
var corOptions ={
    origin:"https://localhost:8081"
}



// middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const authantication = require('./middleware/auth.js')
// routers
const router = require('./routes/productRouter.js')
const authrouter = require('./routes/authRoutes.js')
app.use('/api/products',authantication, router)
app.use('/api/auth',authrouter)

// static image folder
app.use('/Images',express.static('./Images'))
// testing api
app.get("/",(req,res)=>{
    res.json({message:"hello from api" })
})

// port

const PORT =  process.env.PORT || 8080


// server

app.listen(PORT,()=>{
    console.log(`server is runnig at port:${PORT}`)
})