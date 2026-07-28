const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


const analyzeResumeAI = async (resumeText, jobDescription = "") => {

    const text = resumeText.toLowerCase();

    const technicalSkills = [
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "java",
        "python",
        "sql",
        "git",
        "github",
        "docker",
        "aws",
        "typescript",
        "mysql"
    ];

    const foundSkills = technicalSkills.filter(
        skill => text.includes(skill)
    );

    let score = 45;

    score += foundSkills.length * 4;

    if (text.includes("project")) score += 10;
    if (text.includes("education")) score += 5;
    if (text.includes("internship")) score += 8;
    if (text.includes("certificate")) score += 5;

    if (jobDescription) {

        const jd = jobDescription.toLowerCase();

        const matchedJD = technicalSkills.filter(
            skill => jd.includes(skill) && text.includes(skill)
        );

        score += matchedJD.length * 2;

    }

    score = Math.min(score, 95);

    const missingSkills = technicalSkills.filter(
        skill => !foundSkills.includes(skill)
    );

    return {

        atsScore: score,

        strengths: [

            foundSkills.length
                ? `Includes ${foundSkills.length} relevant technical skills`
                : "Resume contains readable text content",

            text.includes("project")
                ? "Contains project-related information"
                : "Has a clear resume structure",

            text.includes("education")
                ? "Includes education details"
                : "Provides candidate background information"

        ],

        missingSkills: missingSkills.slice(0, 3),

        suggestions: [

            "Add measurable achievements in projects or internships",

            "Include GitHub, LinkedIn, or portfolio links",

            "Add certifications, internships, or deployment experience"

        ]

    };

};


const matchJobDescriptionAI = async (resumeText, jobDescription) => {

    const resume = resumeText.toLowerCase();

    const jd = jobDescription.toLowerCase();

    const skills = [
        "html",
        "css",
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "java",
        "python",
        "sql",
        "git",
        "github",
        "docker",
        "aws",
        "typescript"
    ];

    const requiredSkills = skills.filter(
        skill => jd.includes(skill)
    );

    const matchedSkills = requiredSkills.filter(
        skill => resume.includes(skill)
    );

    const missingSkills = requiredSkills.filter(
        skill => !resume.includes(skill)
    );

    const matchScore = requiredSkills.length === 0
        ? 60
        : Math.round(
            (matchedSkills.length / requiredSkills.length) * 100
        );

    return {

        matchScore,

        matchedSkills,

        missingSkills

    };

};


module.exports = {

    analyzeResumeAI,

    matchJobDescriptionAI

};