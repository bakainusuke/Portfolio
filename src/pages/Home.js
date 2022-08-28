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
      <p>Wellcome new user</p>
      <p>Loop Agile Now or LAN is new social media for workload.</p>
      <p>
        Feel free to make post in <strong>Forum</strong> page
      </p>
    </div>
  );
}

export default Home;
