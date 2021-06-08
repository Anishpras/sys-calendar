import React from "react";
import "./EventSection.css";
import profile from "./assest/profile.png";
function EventSection() {
  return (
    <div className="event">
      <div className="psychiatrist-sum">
        <img className="profile-pscy" src={profile} alt="" />
        <div className="psychiatrist-text">
          <h3> name of the </h3>
          <h3> name of the </h3>
        </div>
      </div>
      <div className="event-invoice">
        <h2 className="title">here we can add thr title of the session </h2>
        <div>
          <h1> all the other deltails </h1>
        </div>
      </div>
      <div className="buttons" >
        <button className="pay-button"> pay</button>
        <button className="pay-button"> pay</button>
      </div>
    </div>
  );
}

export default EventSection;
