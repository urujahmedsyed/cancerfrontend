import React from "react";
import '../styles/Nav.css';
import { Link } from "react-router-dom";
function Nava() {
return (
<>
<nav class="navbar navbar-expand-lg " style={{"background-color": "rgb(30, 30, 30)"}}>
        <div class="container-fluid">
            <Link class="navbar-brand" to="/"><i class="fa fa-rocket"></i>&nbsp; cCare</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/yolopred">Allred Score Breast</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/endo">Endometrium Cell Detection</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/predict">Malaria Predict</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/data">Malaria Database</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/hist">H&E Nuclei Segmentation</Link>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="/adash">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/analysis">Analysis</a>
                    </li> */}
                </ul>
                <Link class="btn btn-light" to="/" role="button" id="lg" style={{"font-weight":"500"}}>Logout</Link>
            </div>
        </div>
    </nav>
</>
)
}
;
export default Nava;