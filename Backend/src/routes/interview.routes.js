const express = require("express")  // this ia interview route , now it will be accesssed in app.js
const authMiddleware=require("../middlewares/auth.middleware")
const interviewRouter = express.Router()
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")
/**
 * 
 * @route POST /api/interview/generate-report
 * @description generate interview report based on resume,selfDescription and jobDescription
 * @access private
 * 
 */
interviewRouter.post("/",authMiddleware.authUser ,upload.single("resume"), interviewController.generateInterViewReportController)   // when user will hit this route then first authMiddleware will run and then interviewController will run;


module.exports=interviewRouter