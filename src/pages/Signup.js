import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getUnixTime } from "date-fns";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "../data/Validation";
const USER_KEY = "users";

const Signup = (props) => {
  const notifySuccess = () => {
    toast.success("Success Signup!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  let navigate = useNavigate();
  const unixTime = getUnixTime(Date.now());
  const {
    values,
    errors,
    touched,
    setSubmitting,
    resetForm,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      await handleSubmitValues(values);
      setSubmitting(false);
      resetForm(true);
    },
  });
  const handleSubmitValues = async (values) => {
    await notifySuccess();

    setTimeout(() => {
      let getUser = [];
      getUser = JSON.parse(localStorage.getItem(USER_KEY));
      let userID = uuid();
      getUser.push({
        email: values.email,
        password: values.password,
        username: values.username,
        dateCreated: unixTime,
        userId: userID,
      });
      localStorage.setItem(USER_KEY, JSON.stringify(getUser));
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: userID,
          username: values.username,
          email: values.email,
          dateCreated: unixTime,
        })
      );
      navigate("/profile");
      props.loginUser(values.username);
    }, 3000);
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <hr />
      <div className="row" style={{ width: "1000px" }}>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "100px" }}>
                  <i className="">User Name</i>
                </span>
              </div>
              <input
                id="username"
                className="form-control "
                name="username"
                type="username"
                placeholder="User name"
                onChange={handleChange}
                value={values.name}
              />
              {touched.username && errors.username ? (
                <span className="text-danger">{errors.username}</span>
              ) : null}
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend ">
                <span className="input-group-text  " style={{ width: "100px" }}>
                  <i className="">Email</i>
                </span>
              </div>
              <input
                id="email"
                className="form-control"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email ? (
                <span className="text-danger">{errors.email}</span>
              ) : null}
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "100px" }}>
                  <i className="">Password</i>
                </span>
              </div>
              <input
                id="password"
                className="form-control"
                name="password"
                type="password"
                placeholder="Create password"
                onChange={handleChange}
                value={values.password}
              />
              {touched.password && errors.password ? (
                <span className="text-danger">{errors.password}</span>
              ) : null}
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" style={{ width: "100px" }}>
                  <i className="">Password</i>
                </span>
              </div>
              <input
                id="confirmPassword"
                className="form-control"
                name="confirmPassword"
                type="password"
                placeholder="Repeat password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <span className="text-danger">{errors.confirmPassword}</span>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary">
              Create
            </button>
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
};

export default Signup;
