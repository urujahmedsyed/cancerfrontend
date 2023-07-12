import React from "react";
import '../styles/signup.css';
import Navu from './Navu';
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const history=useNavigate();
    const [name, setName]=useState('');
    const [uname, setUname]=useState('');
    const [mobile, setMobile]=useState('');
    const [password, setPassword]=useState('');
    const [hospital, setHospital]=useState('');


    async function registerUser(event){
        event.preventDefault();
        const response = await fetch('https://cancerserver.onrender.com/api/signup',{
        method:'POST',    
        headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name,
                uname,
                mobile,
                password,
                hospital,
            }),
        })

        const data= await response.json();
        if(data.status ==='ok'){
            history.push('/login')
        }
    }
return (
<>
    <div id="nav1"><Navu/></div>
    <div class="container" id="dome21">
        <div class="container" id="resdesc21">
            <h2><br/>User Signup</h2>
        </div>
        <div id="loginfrms21">
            <form onSubmit={registerUser}>
                <div class="mb-3">
                    <label for="exampleInputName1" class="form-label">Name</label>
                    <input 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        type="text"
                        class="form-control"
                        id="exampleInputName1"
                        placeholder="Name"/>
                </div>
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
                    <label for="exampleInputHospital1"class="form-label">Hospital</label>
                    <input
                        value={hospital}
                        onChange={(e)=>setHospital(e.target.value)}
                        type="text"
                        class="form-control"
                        id="exampleInputHospital1"
                        placeholder="Hospital"/>
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
                
                <div class="mb-3">
                    <label for="exampleInputMobileNo1" class="form-label">Mobile No.</label>
                    <input
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value)}
                        type="number"
                        class="form-control"
                        id="exampleInputMobileNo1"
                        placeholder="Mobile Number"/>
                </div>
                {/* <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div> */}
                <br/>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>

        </div>
    </div>
    <br/>
    <br/>
</>
)
}
;
export default SignUp;