import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import LoginSignup from "./Components/LoginSignup";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/profile/:username" element={<Profile />} /> {/* Use :username */}
      </Routes>
    </div>
  );
}

export default App;