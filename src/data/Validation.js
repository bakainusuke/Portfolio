const USER_KEY = "users";
const validate = (values) => {
  const errors = {};
  let getUser = [];
  getUser = JSON.parse(localStorage.getItem(USER_KEY));

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  for (const i in getUser) {
    if (values.username === getUser[i].username) {
      errors.username = "Already taken";
    }
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  for (const i in getUser) {
    if (values.email === getUser[i].email) {
      errors.email = "Already taken";
    }
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Must be the same";
  }

  return errors;
};

export { validate };
