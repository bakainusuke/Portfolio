import React from "react";
import logo from "../logo.svg";
const USER_KEY = "user";

function Home(props) {
  let user = [];
  user = JSON.parse(localStorage.getItem(USER_KEY));

  return (
    <div className="text-center">
      <h1 className="display-4">Home</h1>

      <h4>
        <strong>Hello {user.username}!</strong>
      </h4>

      <img src={logo} className="w-50" alt="logo" />
    </div>
  );
}

export default Home;
