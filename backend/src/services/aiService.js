const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const analyzeResume = async (resumeText) => {

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

{
  "atsScore": number,
  "strengths": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt
    });

    return response.output_text;
};

module.exports = analyzeResume;