import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromUsername, verifyUser } from "../data/repository";
import { ToastContainer, toast } from "react-toastify";

function Login(props) {
  const notify = () => {
    toast.error("Wrong password!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifySuccess = () => {
    toast.success("Wellcome back!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { username: fields.username, password: fields.password };
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verified = verifyUser(fields.username, fields.password);

    // If verified login the user.
    if (verified === true) {
      const dataFromuser = getUserFromUsername(fields.username);
      await notifySuccess();
      setTimeout(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: dataFromuser.userId,
            username: dataFromuser.username,
            email: dataFromuser.email,
            dateCreated: dataFromuser.dateCreated,
          })
        );
        navigate("/profile");
        props.loginUser(fields.username);
      }, 3000);
      setErrorMessage("");
    } else {
      notify();
      setErrorMessage("Username and / or password invalid, please try again.");
    }

    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div>
      <h1>Login</h1>
      <hr />
      <div className="row" style={{ width: "600px" }}>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">
                Username
              </label>
              <input
                name="username"
                id="username"
                className="form-control"
                value={fields.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={fields.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            {errorMessage !== null && (
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
