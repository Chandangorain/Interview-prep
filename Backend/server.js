require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const {resume,selfDescription,jobDescription}=require("./src/services/temp")
const generateInterviewReport =require("./src/services/ai.service")
connectToDB()

async function runAI() {
    const report = await generateInterviewReport({
        resume,
        selfDescription,
        jobDescription
    })

    console.log("Interview Report Generated:\n", report)
}

runAI()
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})