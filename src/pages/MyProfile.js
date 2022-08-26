import { toDate } from "date-fns";
import React, { useState } from "react";
const USER_KEY = "user";

function MyProfile(props) {
  let user = [];
  user = JSON.parse(localStorage.getItem(USER_KEY));

  console.log(user.dateCreated);

  return (
    <div>
      <h1 className="display-4">
        <strong>Details</strong>
        <h3>User Name: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <h3>Join Date: {Date(user.dateCreated)}</h3>
      </h1>
    </div>
  );
}

export default MyProfile;
