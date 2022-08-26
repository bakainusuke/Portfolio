import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.password = "Must be the same";
  }

  return errors;
};

const Signup = () => {
  const {
    values,
    errors,
    touched,
    // isSubmitting,
    //handleBlur,
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(errors);

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label For="username">User Name</label>
        <input
          id="username"
          class="form-control "
          name="username"
          type="username"
          placeholder="Enter your Username"
          onChange={handleChange}
          value={values.name}
        />
        {touched.username && errors.username ? (
          <div>{errors.username}</div>
        ) : null}
      </div>

      <div class="form-group">
        <label For="email">Email</label>
        <input
          id="email"
          class="form-control"
          name="email"
          type="email"
          placeholder="Enter your Email"
          onChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}
      </div>

      <div class="form-group">
        <label For="password">Password</label>
        <input
          id="password"
          class="form-control"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={values.password}
        />
        {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}
      </div>

      <div class="form-group">
        <label For="confirmPassword">Password</label>
        <input
          id="confirmPassword"
          class="form-control"
          name="confirmPassword"
          type="password"
          placeholder="Renter your password"
          onChange={handleChange}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <div>{errors.confirmPassword}</div>
        ) : null}
      </div>

      <button type="submit" class="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default Signup;
