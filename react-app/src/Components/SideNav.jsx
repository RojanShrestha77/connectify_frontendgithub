import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideNav.css";
import Logo from "../assets/Images/oglogo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideNav = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Toggle search input
  const [searchQuery, setSearchQuery] = useState(""); // Store search input
  const username = localStorage.getItem("username");

  const goToProfile = (event) => {
    event.preventDefault();
    if (username) {
      console.log("Navigating to profile for username:", username);
      navigate(`/profile/${username}`);
    } else {
      console.error("Username not found in localStorage");
      navigate("/LoginSignup"); // Redirect to login if not authenticated
    }
  };

  const makepost = (event) => {
    event.preventDefault();
    if (localStorage.getItem("userId")) {
      navigate("/createpost");
    } else {
      navigate("/LoginSignup");
    }
  };

  const goToFeed = (event) => {
    event.preventDefault();
    navigate("/Feed");
  };

  const toggleLogout = (event) => {
    event.preventDefault();
    setShowLogout(!showLogout);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("userId"); // Clear userId for consistency
    navigate("/LoginSignup");
  };

  const toggleSearch = (event) => {
    event.preventDefault();
    setShowSearch(!showSearch);
    setSearchQuery(""); // Clear search input when toggling
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for user:", searchQuery);
      navigate(`/profile/${searchQuery}`);
      setShowSearch(false); // Hide search input after search
      setSearchQuery(""); // Clear input
    } else {
      console.log("Search query is empty");
    }
  };

  return (
    <div className="sidenav">
      <img className="sidenav_logo" src={Logo} alt="Connectify Logo" width="150" height="150" />
      <div className="sidenav_buttons">
        <button className="sidebutton" onClick={goToFeed}>
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className="sidebutton" onClick={toggleSearch}>
          <SearchIcon />
          <span>Search</span>
        </button>
        {showSearch && (
          <div className="search-input">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter username"
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)} // Search on Enter
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        )}
        <button className="sidebutton">
          <ExploreIcon />
          <span>Explore</span>
        </button>
        <button className="sidebutton">
          <MailOutlineRoundedIcon />
          <span>Message</span>
        </button>
        <button className="sidebutton" onClick={makepost}>
          <AddCircleOutlineIcon />
          <span>Create Post</span>
        </button>
        <button className="sidebutton" onClick={goToProfile}>
          <AccountCircleIcon />
          <span>Profile</span>
        </button>
      </div>
      <div className="sidebutton_more">
        <button className="sidebutton" onClick={toggleLogout}>
          <MenuIcon />
          <span>More</span>
        </button>
        {showLogout && (
          <button className="sidebutton logout-button" onClick={handleLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SideNav;