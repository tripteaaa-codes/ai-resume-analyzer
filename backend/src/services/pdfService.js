const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    try {
        const buffer = fs.readFileSync(filePath);

        const data = await pdfParse(buffer);

        return data.text;
    } catch (error) {
        throw error;
    }
};

module.exports = extractTextFromPDF;