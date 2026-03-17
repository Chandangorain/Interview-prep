const express=require('express');
const app=express();

app.use(express.json());

/* require all the routes here */
const authRouter = require("./routes/auth.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)        // api/auth is the prefix of all routes of authroutes.js. for /login = api/auth/login,

module.exports=app;