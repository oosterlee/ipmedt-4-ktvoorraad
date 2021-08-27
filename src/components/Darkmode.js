import React from "react";
import "../css/components/Darkmode.css";
import "../css/main.css";
const Darkmode = () => {
  return (
    <label className="darkmode">
      <input type="checkbox" />
      <span onClick={e => {
        let theme = localStorage.getItem("theme");
        if(theme == "licht"){
          theme = "dark";
        }
        else{
          theme = "licht";
        }
        //dark theme preferred, set document with a `data-theme` attribute
        if (theme=="dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        }
        else{
          document.documentElement.setAttribute("data-theme", "light");
        }
        localStorage.setItem("theme", theme);
      }}
      className="slider"/>
    </label>);
};
export default Darkmode;
