import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
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
  const loginUser = (username) => {
    setUsername(username);
  };
  const logoutUser = () => {
    removeUser();
    setUsername(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">
      <Router>
        <Navbar username={username} logoutUser={logoutUser} />
       
          
            <Routes>
              {/* <Route
                path="/"
                element={
                  username === null ? (
                    <Navigate to="/home" />
                  ) : (
                    <Home />
                  )
                }
              /> */}
              
              
              
              <Route
                path="/home"
                element={
                  <Home  />
                }
              />
              <Route path="/forum" element={<Forum username={username} />} />
            </Routes>
          
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
