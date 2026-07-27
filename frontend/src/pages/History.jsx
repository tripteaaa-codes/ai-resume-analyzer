import { useEffect, useState } from "react";
import api from "../services/api";


function History(){

    const [resumes, setResumes] = useState([]);


    useEffect(()=>{

        fetchHistory();

    },[]);



    const fetchHistory = async()=>{

        try{

            const response = await api.get("/resume/history");

            setResumes(response.data.resumes);

        }catch(error){

            console.log(error);

        }

    };


    return(

        <div>

            <h1>
                My Resumes
            </h1>


            {
                resumes.length === 0 ? (

                    <p>
                        No resumes uploaded yet.
                    </p>

                ) : (

                    resumes.map((resume)=>(

                        <div key={resume._id}>

                            <h3>
                                {resume.originalName}
                            </h3>


                            <p>
                                Status: {resume.status}
                            </p>


                            {
                                resume.atsScore && (

                                    <p>
                                        ATS Score: {resume.atsScore}
                                    </p>

                                )
                            }


                            <p>
                                Uploaded on: {new Date(resume.createdAt).toLocaleDateString()}
                            </p>


                        </div>

                    ))

                )
            }


        </div>

    );

}


export default History;