const USERS_KEY = "users";
const USER_KEY = "user";

// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if (localStorage.getItem(USERS_KEY) !== null) return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      userId: "a225632d-3727-49c6-8697-b6b172d96a43",
      email: "mbolger@rmit.au",
      username: "mbolger",
      password: "abc123",
    },
    {
      userId: "f1c6faf1-b5d2-456b-b6e2-e3b80788dcb6",
      email: "huy@rmit.au",
      username: "huy",
      password: "123456",
    },
    {
      userId: "f79f3365-e46d-4151-892b-8011aba920f5",
      email: "shekhar@rmit.au",
      username: "she",
      password: "def456",
    },
  ];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, password) {
  const users = getUsers();
  for (const user of users) {
    if (username === user.username && password === user.password) {
      setUser(username);
      return true;
    }
  }

  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  let user = localStorage.getItem(USER_KEY);
  if (user === null) {
    return null;
  } else {
    let praseJSON = JSON.parse(user);
    console.log(praseJSON.username);
    return praseJSON.username;
  }
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}
function getUserFromUsername(username) {
  let getUser = localStorage.getItem(USERS_KEY);
  let userPrase = JSON.parse(getUser);
  console.log(userPrase.length);
  for (let i = 0; i < userPrase.length; i++) {
    if (username === userPrase[i].username) {
      return userPrase[i];
    }
  }
}

export { initUsers, verifyUser, getUser, removeUser, getUserFromUsername };
