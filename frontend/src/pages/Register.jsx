import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Register(){

    const navigate = useNavigate();


    const [form,setForm]=useState({

        name:"",
        age:"",
        mobile:"",
        email:"",
        address:"",
        governmentId:"",
        password:""

    });



    const handleChange=(e)=>{

        setForm({

            ...form,
            [e.target.name]:e.target.value

        });

    };



    const register=async(e)=>{

        e.preventDefault();


        try{

            await api.post(
                "/auth/signup",
                form
            );


            alert("Registered successfully");


            navigate("/");


        }catch(error){

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };



    return(

        <div className="container">

            <div className="card">


            <h2>
                Register
            </h2>


            <form onSubmit={register}>


            <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            />


            <input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            />


            <input
            name="mobile"
            placeholder="Mobile"
            onChange={handleChange}
            />


            <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            />


            <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            />


            <input
            name="governmentId"
            placeholder="Government ID"
            onChange={handleChange}
            />


            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            />


            <button>
                Register
            </button>


            </form>


            </div>

        </div>

    );

}


export default Register;