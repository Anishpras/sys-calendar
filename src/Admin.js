import React, { useState } from "react";

const Admin = () => {
  const [mhpData, setMHPData] = useState({});
  const [name, setName] = useState("");
  const [photURL, setPhotURL] = useState("");
  const [bio, setBio] = useState("");
  const [fees, setFees] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(10);
  // const [availability, setAvailability] = useState([
  //   { monday: false },
  //   { tuesday: false },
  //   { wednesday: false },
  //   { thursday: false },
  //   { friday: false },
  //   { saturday: false },
  // ]);

  const saveDetails = (e) => {
    setMHPData({
      name: name,
      sessionDuration: sessionDuration,
      photoURL: photURL,
      fees: fees,
      bio: bio,
    });
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex", "flex-direction": "column", width: "10%" }}>
      <form>
        <label>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          required
        />
        <label>PhotoUrl</label>
        <input
          onChange={(e) => setPhotURL(e.target.value)}
          value={photURL}
          type="text"
          required
        />
        <label>Bio</label>
        <textarea
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          cols="5"
          rows="5"
          required
        />

        <label>Session-Duration</label>
        <input
          onChange={(e) => setSessionDuration(e.target.value)}
          value={sessionDuration}
          type="text"
          required
        />
        <label>Fees</label>
        <input
          onChange={(e) => setFees(e.target.value)}
          value={fees}
          type="number"
          required
        />
        {/* <label>Availability</label> */}
        <button onClick={saveDetails}>Save</button>
      </form>
      <h1>{mhpData.name}</h1>
      <h1>{mhpData.sessionDuration}</h1>
      <h1>{mhpData.photoURL}</h1>
      <h1>{mhpData.fees}</h1>
      <h1>{mhpData.bio}</h1>
    </div>
  );
};

export default Admin;
