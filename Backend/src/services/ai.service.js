/*  resume+self description + job description -->Gemini AI -->Gemini generates structured response -->Validate response using Zod schema -->Return Interview Preparation Report JSON
*/



/*  resume+self description + job description -->Gemini AI -->Gemini generates structured response -->Validate response using Zod schema -->Return Interview Preparation Report JSON
*/

const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

/**
 * structure of output :
 * {
 *  matchScore,
 *  technicalQuestions[],
 *  behavioralQuestions[],
 *  skillGaps[],
 *  preparationPlan[],
 *  title
 * }
 */

const interviewReportSchema = z.object({

    matchScore: z.number(),

    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"])
    })),

    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string())
    })),

    title: z.string()

})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    // ✅ CHANGE HERE (Improved prompt to force schema structure)

    const prompt = `
Generate an interview preparation report STRICTLY matching this JSON schema:

{
 matchScore: number,
 technicalQuestions: [
   { question: string, intention: string, answer: string }
 ],
 behavioralQuestions: [
   { question: string, intention: string, answer: string }
 ],
 skillGaps: [
   { skill: string, severity: "low" | "medium" | "high" }
 ],
 preparationPlan: [
   { day: number, focus: string, tasks: string[] }
 ],
 title: string
}

Candidate Details:

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY valid JSON.
`


    const response = await ai.models.generateContent({

        // ✅ CHANGE HERE (stable model instead of preview version)

        model: "gemini-2.5-flash",

        contents: prompt,

        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })


    // ✅ CHANGE HERE (safe JSON parsing)

    try {
        return JSON.parse(response.text)
    } catch (error) {
        console.error("Invalid JSON received from Gemini:", response.text)
        throw error
    }

}


// ✅ CHANGE HERE (export style fixed)

module.exports =  generateInterviewReport 