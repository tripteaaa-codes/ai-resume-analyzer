import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [file, setFile] = useState(null);

    const [uploadedResume, setUploadedResume] = useState(null);

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(false);


    const handleUpload = async () => {

        if (!file) {
            return alert("Please select a resume");
        }

        try {

            const formData = new FormData();

            formData.append("resume", file);

            const res = await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setUploadedResume(res.data.resume);

            alert("Resume uploaded successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );

        }

    };


    const handleAnalyze = async () => {

        if (!uploadedResume) {
            return alert("Upload a resume first");
        }

        setLoading(true);

        try {

            const res = await api.post(
                `/resume/${uploadedResume._id}/analyze`
            );

            setAnalysis(res.data.analysis);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Analysis failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <>

            <Navbar />

            <div className="container">

                <div className="card">

                    <h1>Dashboard</h1>

                    <h3>Upload Resume</h3>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button onClick={handleUpload}>
                        Upload Resume
                    </button>


                    {uploadedResume && (

                        <div style={{ marginTop: "20px" }}>

                            <h3>Uploaded Resume</h3>

                            <p>
                                {uploadedResume.originalName}
                            </p>

                            <button onClick={handleAnalyze}>

                                {loading
                                    ? "Analyzing..."
                                    : "Analyze Resume"
                                }

                            </button>

                        </div>

                    )}


                    {analysis && (

                        <div style={{ marginTop: "30px" }}>

                            <h2>ATS Score: {analysis.atsScore}</h2>


                            <h3>Strengths</h3>

                            <ul>

                                {analysis.strengths.map((item, index) => (

                                    <li key={index}>
                                        {item}
                                    </li>

                                ))}

                            </ul>


                            <h3>Missing Skills</h3>

                            <ul>

                                {analysis.missingSkills.map((item, index) => (

                                    <li key={index}>
                                        {item}
                                    </li>

                                ))}

                            </ul>


                            <h3>Suggestions</h3>

                            <ul>

                                {analysis.suggestions.map((item, index) => (

                                    <li key={index}>
                                        {item}
                                    </li>

                                ))}

                            </ul>

                        </div>

                    )}

                </div>

            </div>

        </>

    );

}

export default Dashboard;
