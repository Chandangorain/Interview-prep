const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewController(req, res) {
    try {
        // 1. Fix the PDF parsing logic
         const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body;

        // 2. Call the AI service (Ensure it's exported correctly in ai.service.js)
        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text, // resumeContent.text comes from pdf-parse
            selfDescription,
            jobDescription
        });

        // 3. Save to database
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi 
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = { generateInterviewController };