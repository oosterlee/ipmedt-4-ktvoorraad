import React from "react";
import "../css/components/Darkmode.css";
import "../css/main.css";

const Darkmode = () => {
  return (
    <label className="darkmode">
      <input type="checkbox" />
      <span className="slider"/>
    </label>);
};

export default Darkmode;
