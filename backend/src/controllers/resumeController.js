const Resume = require("../models/Resume");
const extractTextFromPDF = require("../services/pdfService");
const {analyzeResumeAI, matchJobDescriptionAI} = require("../services/aiService");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume"
            });
        }

        const extractedText = await extractTextFromPDF(req.file.path);
        console.log("Extracted Text Type:", typeof extractedText);
        console.log("Extracted Text Length:", extractedText?.length);
        console.log("Extracted Text Preview:");
        console.log(extractedText?.substring(0, 200));

        const resume = await Resume.create({
            user: req.user._id,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileSize: req.file.size,
            extractedText,
            status: "uploaded"
        });

        res.status(201).json({
            message: "Resume uploaded successfully",
            extractedText,
            resume
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getResumeHistory = async (req, res) => {

    try {

        const resumes = await Resume.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            total: resumes.length,
            resumes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getResumeById = async(req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const analyzeResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const analysisResult = await analyzeResumeAI(resume.extractedText);

        resume.analysis = analysisResult;
        resume.atsScore = analysisResult.atsScore;
        resume.status = "analyzed";

        await resume.save();

        res.status(200).json({
            message: "Resume analyzed successfully",
            analysis: analysisResult,
            resume
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

const matchJobDescription = async (req, res) => {

    try {

        const { jobDescription } = req.body;

        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const result = await matchJobDescriptionAI(
            resume.extractedText,
            jobDescription
        );

        resume.jobDescription = jobDescription;
        resume.matchScore = result.matchScore;
        resume.matchedSkills = result.matchedSkills;
        resume.missingSkillsFromJD = result.missingSkills;

        await resume.save();

        res.status(200).json({
            message: "Job matched successfully",
            result,
            resume
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};    

module.exports = {
    uploadResume,
    getResumeHistory,
    getResumeById,
    analyzeResume,
    matchJobDescription
};