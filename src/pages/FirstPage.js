import React from "react";

function FirstPage() {
  const homePageFunction = () => {
    window.location.href = "/home";
  };

  return (
    <div className="first-page-container">
      <img
        src="https://sv1.picz.in.th/images/2023/06/06/I09RmQ.png"
        alt="LookkaingernLogo"
        className="logo-image"
      />

      <h4 className="welcome-text">
        <b>Welcome to our restaurant</b>
      </h4>

      <div className="button-group">
        <button onClick={homePageFunction} className="button-homepage">
          Home page
        </button>
      </div>
    </div>
  );
}

export default FirstPage;
