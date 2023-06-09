const express=require("express")
//const emp=require("./employees")
const cors=require("cors")
const bodyparser=require("body-parser")
//const mongoose=require("mongoose")
const { default: mongoose } = require("mongoose")
const app=express()
const Content= require('./schema')
const port= process.env.PORT|| 4000;

app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(bodyparser.json())

app.use(cors())

mongoose.connect("mongodb+srv://BharathK:BharathK@cluster0.cjyjzid.mongodb.net/firstdb?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Mongodb connected successfully")
        //console.log(Content)
    })
    .catch((err)=>{
        console.log(err)
    })
app.get("/",(req,res)=>{
    res.send("API IS WORKING")
})

app.get("/users",async(req,res)=>{
    await Content.find()
        .then(found=>res.json(found))
})

app.post("/store",(req,res)=>{
    const {username,password}=req.body
    const newData=new Content({
        username,password
    })
     newData.save()
})

// app.post("/store",async(req,res)=>{
//     const {username,password}=req.body
//     //const username="abc",password="1234"
//     const newData=new Content({
//         username,password
//     })
//     //newData.save()
//     const val=await newData.save()
//     res.json(val)
// })


app.listen(port,()=>console.log("server started successfully"))

// app.get("/bring",(req,res)=>{
//     res.send("Hello World")
// })

// app.get("/add",(req,res)=>{
//     res.send("ADD")
// })

// app.get("/emp",(req,res)=>{
//     return res.json(emp)
// })

// app.post("/store-employee",(req,res)=>{
//     //console.log(req.body)
//     const {username,password}=req.body
//     console.log(username,password)
// })

//app.listen(5000,()=>console.log("server started successfully"))
