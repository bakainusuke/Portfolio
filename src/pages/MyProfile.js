import { fromUnixTime } from "date-fns";
import React from "react";
const USER_KEY = "user";

function MyProfile(props) {
  let user = [];
  user = JSON.parse(localStorage.getItem(USER_KEY));
  console.log(user.dateCreated);

  if (user.dateCreated === undefined) {
    var userDate = "Unknown";
  } else {
    const result = fromUnixTime(user.dateCreated);
    var userDate = `${result.getDate()}/${
      result.getMonth() + 1
    }/${result.getFullYear()}`;
  }

  return (
    <div>
      <h1 className="display-4">
        <strong>Details</strong>
      </h1>
      <h3>User Name: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Join Date: {userDate}</h3>
    </div>
  );
}

export default MyProfile;
