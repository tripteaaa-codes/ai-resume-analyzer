import { useState } from "react";
import api from "../services/api";


function Dashboard(){

    const [file,setFile] = useState(null);
    const [resume,setResume] = useState(null);
    const [analysis,setAnalysis] = useState(null);


    const uploadResume = async()=>{

        const formData = new FormData();

        formData.append("resume", file);


        try{

            const response = await api.post(
                "/resume/upload",
                formData,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            );


            setResume(response.data.resume);

        }
        catch(error){

            console.log(error);

        }

    };


    const analyzeResume = async()=>{

        try{

            const response = await api.post(
                `/resume/${resume._id}/analyze`
            );


            setAnalysis(response.data.analysis);


        }
        catch(error){

            console.log(error);

        }

    };


    return(

        <div className="container">

            <div className="card">

                <h1>
                    Dashboard
                </h1>


                <h3>
                    Upload Resume
                </h3>


                <input

                    type="file"
                    accept=".pdf"
                    onChange={(e)=>setFile(e.target.files[0])}

                />


                <button onClick={uploadResume}>
                    Upload
                </button>



                {
                    resume && (

                        <div>

                            <h3>
                                Uploaded Resume
                            </h3>


                            <p>
                                {resume.originalName}
                            </p>


                            <button onClick={analyzeResume}>
                                Analyze Resume
                            </button>


                        </div>

                    )
                }



                {
                    analysis && (

                        <div>

                            <h2>
                                ATS Score: {analysis.atsScore}
                            </h2>


                            <h3>
                                Strengths
                            </h3>

                            {
                                analysis.strengths.map(
                                    (item,index)=>(
                                        <p key={index}>
                                            {item}
                                        </p>
                                    )
                                )
                            }


                            <h3>
                                Missing Skills
                            </h3>

                            {
                                analysis.missingSkills.map(
                                    (item,index)=>(
                                        <p key={index}>
                                            {item}
                                        </p>
                                    )
                                )
                            }


                            <h3>
                                Suggestions
                            </h3>

                            {
                                analysis.suggestions.map(
                                    (item,index)=>(
                                        <p key={index}>
                                            {item}
                                        </p>
                                    )
                                )
                            }


                        </div>

                    )
                }


            </div>

        </div>

    );

}


export default Dashboard;