import React, { useState } from "react";
import "./RouteForm.css";

const RouteForm = () => {
  const [routeName, setRouteName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [issues, setIssues] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted!");
    console.log("Route Name:", routeName);
    console.log("Driver Name:", driverName);
    console.log("Issues:", issues);
    // Reset form fields
    setRouteName("");
    setDriverName("");
    setIssues("");
  };

  return (
    <div className="route-form">
      <h2>Register Public Transportation Route</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="routeName">Route Name</label>
          <input
            type="text"
            id="routeName"
            name="routeName"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="driverName">Driver Name</label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="issues">Common Issues</label>
          <textarea
            id="issues"
            name="issues"
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RouteForm;
