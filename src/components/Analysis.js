import React from "react";
import '../styles/stats.css';
import Nava from './Nava';
import stats from '../imgs/stats.png'

function Analysis() {
return (
<>
    <div id="nav1"><Nava/></div>
    <br/>
    <div class="container" id="dome15">
        <h2 id="tres15">University Name Research Activity Analysis:</h2>
        <img src={stats} alt="stats" id="pfp15"></img>
    </div>
    <br/>
</>
)
}
;
export default Analysis;