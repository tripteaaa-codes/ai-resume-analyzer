const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const analyzeResumeAI = async (resumeText, jobDescription = "") => {

    const prompt = `

You are an expert ATS Resume Analyzer.

Analyze ONLY the resume provided below.
Do not use previous responses.
Do not give a fixed score.
Calculate the ATS score based on the actual skills, projects, education, experience, formatting, and relevance of this resume.

${jobDescription ? `
Compare the resume with this job description:

${jobDescription}
` : ""}


Resume Content:

${resumeText}


Return ONLY valid JSON.

Use exactly this structure:

{
    "atsScore": number,
    "strengths": [
        "strength 1",
        "strength 2",
        "strength 3"
    ],
    "missingSkills": [
        "skill 1",
        "skill 2",
        "skill 3"
    ],
    "suggestions": [
        "suggestion 1",
        "suggestion 2",
        "suggestion 3"
    ]
}

Rules:

- atsScore must be between 0 and 100.
- Give a different score depending on the resume quality.
- strengths must come from the provided resume.
- missingSkills should mention technologies or skills absent but valuable.
- suggestions should be specific improvements for this resume.
- Never return the same response for different resumes.

`;


    try {

        console.log(
            "Analyzing resume:",
            resumeText.substring(0, 200)
        );


        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt,

            config: {
                temperature: 0.8
            }

        });


        const text = response.text;


        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();


        return JSON.parse(cleaned);


    } catch (error) {

        console.log("Gemini Error:", error);

        throw error;

    }

};


module.exports = analyzeResumeAI;