const Resume = require("../models/Resume");
const extractTextFromPDF = require("../services/pdfService");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume"
            });
        }

        const extractedText = await extractTextFromPDF(req.file.path);

        const resume = await Resume.create({
            user: req.user._id,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileSize: req.file.size,
            extractedText
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
            _id: req.params._id,
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

module.exports = {
    uploadResume,
    getResumeHistory,
    getResumeById
};