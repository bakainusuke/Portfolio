import { fromUnixTime } from "date-fns";
import React, { useState } from "react";
import { getUser, removeUser, deleteUser } from "../data/repository";
import { useNavigate } from "react-router-dom";
const USER_KEY = "user";

function MyProfile(props) {
  let user = [];
  user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user.dateCreated === undefined) {
    var userDate = "Unknown";
  } else {
    const result = fromUnixTime(user.dateCreated);
    var userDate = `${result.getDate()}/${
      result.getMonth() + 1
    }/${result.getFullYear()}`;
  }
  const navigate = useNavigate();

  const handleDelete = (userId) => {
    console.log("delete not done");
    deleteUser(userId);
    // removeUser();
  };

  return (
    <div class="row">
      <div class=" col-xl-6 col-lg-7 col-md-12 " style={{ height: "300px" }}>
        <div class="card " style={{ height: "300px" }}>
          <div class="col-lg-8 col-md-8 col-12">
            <h1 className="form-group display-5 m-3">
              <strong>Details</strong>
            </h1>
            <div class=" form-group m-4">
              <h4 class="">
                User:
                <strong> {user.username}</strong>
              </h4>
              <span class="">Email: {user.email}</span>
              <p>Join Date: {userDate}</p>
            </div>

            <div class="form-group">
              <input
                type="submit"
                className="btn btn-primary btn-round m-3"
                value="Edit"
              />
              <input
                type="submit"
                className="btn btn-danger mr-5"
                value="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(user.userId);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
