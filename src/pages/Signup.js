import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function signup(props) {
  return (
    <div>
      <h1 className="display-4">My Profile</h1>
      <h4>
        <strong>Hello {props.username}!</strong>
      </h4>
    </div>
  );
}
export default signup;
