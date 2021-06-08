import React from "react";
import "./Psychiatrist.css";
import data from "./data/data";
import profile from "./assest/profile.png";

function Psychiatrist() {
  return (
    <div className="psychiatrist">
      <div className="psy-wrapper">
        {data.map((data) => {
          return (
            <div className="psy-content">
              <div className="psy-header">
                <img className="psy-profile" src={profile} />
                <div className="psy-header-right">
                  <h3>{data.name} </h3>
                  <p> {data.email} </p>
                </div>
              </div>
              <div className="psy-body">
                <h1> About </h1>
                <h4>{data.about} </h4>
                <h1> Education </h1>
                <h4>{data.education} </h4>
                <h1> Work Experience </h1>
                <h4>{data.work} </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Psychiatrist;
