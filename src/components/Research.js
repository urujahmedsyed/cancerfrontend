import React from "react";
import '../styles/restable.css';
import Navu from './Navu';
import Tabscript from './Tabscript';

function Research() {
return (
<>
    <Navu/>
    <div class="container" id="dome14">
        <div class="container" id="resdesc14">
            <h2 style={{"color": "white"}} id="some14"><br/>Research Activities</h2>
        </div>
        <br/>
        <form class="row ps-4 ms-2 g-2" id="okform14">
            <div class="col-md-4 form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="ResearchName"/>
                <label class="ms-2" for="floatingInput">Research Name</label>
            </div>
            <div class="col-md-1 form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="Tags"/>
                <label class="ms-2" for="floatingInput">Tags</label>
            </div>
            <div class="col-md-3 form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="UnivName"/>
                <label class="ms-2" for="floatingInput">University Name</label> 
            </div>
            <div class="col-md-2 form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="state"/>
                <label class="ms-2" for="floatingInput">State/Country</label> 
            </div>
            <div class="form-floating col-md-1" style={{"min-width":"103px;"}}>
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Date</option>
                  <option >Popular</option>
                </select>
                <label class="ms-2" for="floatingSelect">Sort By</label>
              </div>
        </form>
        <br></br>
        <div class="hold">
            <table class="table table-hover" id="tab"></table>
        </div>
        <Tabscript/>
        <br/>
        <br/>
    </div>
    <br/>
        
</>
)
}
;
export default Research;