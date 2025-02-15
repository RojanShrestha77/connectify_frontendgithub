import React, { useState } from "react";
import "./SideNav.css";
import Logo from "../assets/Images/Connectify.png";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const SideNav = () => {
    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const makepost = (event) => {
        event.preventDefault();
        navigate('/createpost');
    };

    const goToFeed = (event) => {
        event.preventDefault();
        navigate('/Feed');
    };

    const toggleLogout = (event) => {
        event.preventDefault();
        setShowLogout(!showLogout);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        navigate('/LoginSignup');
    };

    return (
        <div className="sidenav">
            <img className="sidenav_logo" src={Logo} alt="Connectify Logo" width="150" height="150" />
            <div className="sidenav_buttons">
                <button className="sidebutton" onClick={goToFeed}>
                    <HomeIcon />
                    <span>Home</span>
                </button>
                <button className="sidebutton">
                    <SearchIcon />
                    <span>Search</span>
                </button>
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
            </div>
            <div className="sidebutton_more">
                <button className="sidebutton" onClick={toggleLogout}>
                    <MenuIcon />
                    <span>More</span>
                </button>
                {showLogout && (
                    <button className={`sidebutton logout-button ${showLogout ? 'visible' : ''}`} onClick={handleLogout}>
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SideNav;