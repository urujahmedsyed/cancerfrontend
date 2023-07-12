import React from "react";
import '../styles/lstyle.css';
import Navu from './Navu';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const Navigate=useNavigate();
    const [uname, setUname]=useState('');
    const [password, setPassword]=useState('');

    async function loginUser(event){
        event.preventDefault();
        const response = await fetch('https://cancerserver.onrender.com/api/login',{
        method:'POST',    
        headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                uname,
                password,
            }),
            credentials: 'include'
        })

        const data= await response.json();

        if(data.user){
            alert('login successful')
            Navigate('/predict')
            localStorage.setItem('token', data.user);
        }
        else{
            alert('invalid username or password')
        }
        console.log(data);
    }
return (
<>
    <div id="nav1"><Navu/></div>
    <div class="container" id="dome13">
        <div class="container" id="resdesc13">
            <h2 style={{"color": "white"}}><br/>Login</h2>
        </div>
        <div id="loginfrms13">
            <form onSubmit={loginUser}>
                <div class="mb-3">
                    <label for="exampleInputUsername1"class="form-label">Username</label>
                    <input
                        value={uname}
                        onChange={(e)=>setUname(e.target.value)}
                        type="text"
                        class="form-control"
                        id="exampleInputUsername1"
                        placeholder="Username"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"/>
                </div>
                <br/>
                {/* <a class="btn btn-primary" href="/adash">Login</a> */}
                <button type="submit" class="btn btn-primary">Login</button>
            </form>

        </div>
    </div>
</>
)
}
;
export default Login;