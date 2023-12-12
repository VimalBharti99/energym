const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")

const encoder = bodyParser.urlencoded()

const trasnporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:"dreamteamdream1111@gmail.com",
        pass:"mtfdesahxkdnabcl"

    }
})
const app = express()
app.use(express.static(path.join(__dirname,"views/public")))
app.set("view engine","hbs")

hbs.registerPartials(path.join(__dirname,"views/partials"))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/service",(req,res)=>{
    res.render("service")
})

app.get("/contact",(req,res)=>{
    res.render("contact",{show:false})
})
app.post("/contact",encoder,(req,res)=>{
  let mailOptions = {
        from:"dreamteamdream1111@gmail.com",
        to:req.body.email,
        subject:req.body.subject,
        html:`
            <h2>Thanks</h2>
            <h3>Your Query Recieved</h3>
            <h3>Our Team will contact you soon</h3>
        `
    }
    trasnporter.sendMail(mailOptions,((error)=>{
        if(error){
            console.log(error)
        }
    }))
     mailOptions = {
        from:"dreamteamdream1111@gmail.com",
        to:"dreamteamdream1111@gmail.com",
        subject:"New Query Recieved",
        html:`
            <h1>New Query Recieved</h1>
            <table>
             <tbody>
              <tr>
              <th>Name</th>
              <td>${req.body.name}</td>
              </tr>
              <tr>
              <th>Email</th>
              <td>${req.body.email}</td>
             </tr>
             <tr>
             <th>Phone</th>
            <td>${req.body.phone}</td>
            </tr>
            <tr>
           <th>Subject</th>
           <td>${req.body.subject}</td>
           </tr>
           <tr>
           <th>Message</th>
           <td>${req.body.message}</td>
           </tr>
             </tbody>
            </table>
            <h3>Your Query Recieved</h3>
            <h3>Our Team will contact you soon</h3>
        `
    }
    trasnporter.sendMail(mailOptions,((error)=>{
        if(error){
            console.log(error)
        }
    }))
    res.render("contact",{show:true})
})

app.listen(8000,console.log("Server is Running at http://localhost:8000"))