import React from "react";
import "./SideNav.css";
import Logo from "../assets/Images/Connectify.png";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from "react-router-dom";

const SideNav = () => {
    const navigate = useNavigate();
    const  makepost=(event)=>{
        event.preventDefault();
        navigate('/createpost');
    }
    return (
        <div className="sidenav">
            <img className="sidenav_logo" src={Logo} alt="Gym Logo" width="150" height="150" />
            <div className="sidenav_buttons">
                <button className="sidebutton">
                    <HomeIcon/>
                    <span>Home</span>
                </button>



                <button className="sidebutton">
                    <SearchIcon/>
                    <span>Search</span>
                </button>

                <button className="sidebutton">
                    <ExploreIcon/>
                    <span>Explore</span>
                </button>

                <button className="sidebutton">
                    <MailOutlineRoundedIcon/>
                    <span>Message</span>
                </button>

                <button className="sidebutton" onClick={makepost}>
                    <AddCircleOutlineIcon/>
                    <span>Create Post</span>
                </button>

                

                

            </div>
            <div className="sidebutton_more">
                <button className="sidebutton">
                    <MenuIcon/>
                    <span>More</span>
                    </button>
            </div>
        </div>
    );
}

export default SideNav; // Default export