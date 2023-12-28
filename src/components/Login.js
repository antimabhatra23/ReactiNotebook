import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCreadentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the authtoken and redirect
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Logged in successfully", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCreadentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-2'>
            <h2 className='text-center my-3 fw-bold'>Login to continue to iNoteboook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="my-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="Password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login