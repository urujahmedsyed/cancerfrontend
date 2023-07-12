import React from "react";
import '../styles/dash.css';
const data = [
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    {resname: "Research1",tag:"Tag1",uname: "University1",st:"State1",li:"Link1"},
    
    
  ]

  function Tabscript() {
    return (
      <div className="App">
        <table class="table table-striped" id="tab">
          <tr>
            <th>Research Name</th>
            <th>Tag</th>
            <th>University Name</th>
            <th>State</th>
            <th>Link</th>

          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.resname}</td>
                <td>{val.tag}</td>
                <td>{val.uname}</td>
                <td>{val.st}</td>
                <td>{val.li}</td>
                
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
    
  export default Tabscript;