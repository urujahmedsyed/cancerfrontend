import React, { useState } from 'react';
import Nava from './Nava';
import axios from 'axios';

export default function Predict(){
    const [file,setFile]=useState(null);
    const [predicting,setOut]=useState(null);
    const [predicted,setPredicted]=useState(null);
    const [prediction,setOutput]=useState(null);
    const [image,setImage]=useState('');
    const [radioValue, setRadioValue] = useState('');

    const FileChange=(e)=>{
        setOut(false);
        setPredicted(false);
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        reader.onloadend=()=>{
            setFile(selectedFile);
            setImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    const handleFormSubmit=async(event)=>{
        event.preventDefault();
        setOut(true);
        if(file){
            const formData = new FormData();
            formData.append('token',localStorage.getItem('token'))
            formData.append("image",file);
            formData.append("radioValue", radioValue);
            const {data} = await axios.post("https://cce9-2409-408c-1414-77ae-349f-579b-7ee0-17c8.ngrok.io/predict",formData);
            if(data){
                setOutput(data.prediction);
                setPredicted(true);
            }else{
                setPredicted(false);
            }
        }
        else{
            document.getElementById('filered').innerHTML="File Could not be Found.";
        }
        setOut(false);
    }

    return (
        <>
        <div id="nav1"><Nava/></div>
    <div className="container-fluid log-welcome">
    <form className="row justify-content-center" onSubmit={(e)=>handleFormSubmit(e)}>
        <div className="col-9 m-4 p-4 rounded bg-light">
            <p className="fw-bold m-2">Input Scan Image : </p>
            <input className="form-control form-control-sm" type="file" onChange={FileChange}/>
            <br></br>
            <div className="d-flex justify-content-center">
            
                <img src={image} alt='preview' style={{'width': '10%', 'height': '10%'}}/>
            </div>
            <h6><span className="fw-bold">What is the actual value: </span></h6>
                <h6>
                <label for="parasitized">Parasitized &nbsp;</label>
                <input type="radio" id="Parasitized" name="answer" value="Parasitized" onChange={handleRadioChange}></input>
                <br></br>
                <label for="uninfected">Uninfected &nbsp;</label>
                <input type="radio" id="Uninfected" name="answer" value="Uninfected" onChange={handleRadioChange}></input>
                </h6>
            <div className="d-flex justify-content-center">
            <br></br>
                <p id="filered" className="outred fs-6 fw-lighter"></p>
            </div>
            <div className="d-flex justify-content-end m-3">
                {
                    predicting?
                    <button className="btn log-button disabled" style={{"margin-right":"44.5%","font-weight": "500"}}>Predicting<div className='ms-2 spinner-border spinner-border-sm' role='status'><span className='visually-hidden'>Loading...</span></div></button>
                    :
                    <button className="btn log-button" type="submit" style={{"background":"#5d96f8","margin-right":"46.5%","font-weight": "500"}}>Predict</button>    
                }
            </div>
            <div className="container-fluid text-center">
                    {
            predicted?
            <>
                <br></br>
                <h3><span className="fw-bold">Prediction : </span><span>{prediction}</span></h3>
                <br></br>
            </>
            :
                <></>
            }</div>
        </div>
        </form>
    </div>
    </>
    );
}