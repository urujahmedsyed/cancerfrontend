import React from "react";
import "../styles/hstyle.css";
import Navu from './Navu';
import res from '../imgs/res.png'
// import AboutUs from './AboutUs';
function Homep1() {
return (
<>
    <div id="nav1"><Navu/></div>
    <div class="container" id="some12">
        <img src={res} alt="ok" id="pfp12"></img>
    </div>
    <div class="container" id="dome12">
        <div class="container" id="resdesc12">
            <br/>
            <h2 style={{"color": "white","fontSize":44}}>Breast Cancer Detection Site</h2>
        </div>
        {/* <div id="descbut">
            <br/>
            <br/>
            <a class="btn btn-lg btn-light" href="/research" role="button" id="su" style={{"font-weight":"500"}}>View Research</a>
        </div> */}
    </div>
    {/* <AboutUs/> */}
</>
)
}
;
export default Homep1;