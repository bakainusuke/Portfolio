import React from "react";
import logo from "../logo.svg";

function Home(props) {
  return (
    <div className="text-center">
      <h1 className="display-4">Home</h1>
      {props.username !== null && <h4><strong>Hello {props.username}!</strong></h4>}
      <img src={logo} className="w-50" alt="logo" />
    </div>
  );
}

export default Home;
