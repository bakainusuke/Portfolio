import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes,  } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyProfile from "./pages/MyProfile";
import Forum from "./pages/Forum";
import { getUser, removeUser } from "./data/repository";

function App() {
  const [username, setUsername] = useState(getUser());
  console.log(username)
  const loginUser = (username) => {

    setUsername(username);
  };
  const logoutUser = () => {
    removeUser();
    setUsername(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Router>
        <Navbar username={username} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={username === null ? <Navigate to ="/login" /> :  <Home username={username} />} />
              <Route path="/login" element={ username === null ? <Login loginUser={loginUser} /> : <Navigate to ="/" />} />
              <Route path="/signup" element={username !== null ? <Navigate to="/" />: <Signup loginUser={loginUser} />} />
              <Route
                path="/profile"
                element={ <MyProfile username={username} />}
              />
              <Route path="/forum" element={ <Forum username={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
