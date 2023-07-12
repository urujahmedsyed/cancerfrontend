import React from "react";
import '../styles/signup.css';
import Navu from './Navu';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [uname, setUname] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [hospital, setHospital] = useState('');

    async function registerUser(event) {
        event.preventDefault();
        const response = await fetch('https://cancerserver.onrender.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                uname,
                mobile,
                password,
                hospital,
            }),
        });

        const data = await response.json();
        if (data.status === 'ok') {
            // Display success alert
            window.alert('Signup successful!');
            history.push('/login');
        } else {
            // Display invalid signup alert
            window.alert('Invalid signup!');
        }
    }

    return (
        <>
            <div id="nav1"><Navu /></div>
            <div class="container" id="dome21">
                <div class="container" id="resdesc21">
                    <h2><br />User Signup</h2>
                </div>
                <div id="loginfrms21">
                    <form onSubmit={registerUser}>
                        {/* Form inputs... */}
                        <br />
                        <button type="submit" class="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
            <br />
            <br />
        </>
    );
}

export default SignUp;
