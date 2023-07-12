import React from "react";
import '../styles/dash.css';
import Nava from './Nava';

function Adash() {
return (
<>
    <div id="nav1"><Nava/></div>
    <div class="container" id="dome11">
        <div class="container" id="resdesc11">
            <h2 style={{"color": "white"}}><br/>Welcome, Admin!</h2>
        </div>
        <div id="loginfrms11">

            <button type="button" class="btn btn-lg btn-primary" id="btn111">Append University Research</button>
            <br/>
            <button type="button" class="btn btn-lg btn-primary" id="btn211">Download University Research</button>
            <br/>
            <button type="button" class="btn btn-lg btn-primary" id="btn311">Empty Template</button>
        </div>
    </div>
    <br/>
    <br/>
</>
)
}
;
export default Adash;