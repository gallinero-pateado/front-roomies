import React from "react";
import Sidebar from './Sidebar';
import Profile from "./Profile";
import '../App.css'


const PageProfile = () =>{
    return(
        <div className="flex-direction-column">
        {/* Sidebar ocupa 1/4 del ancho */}
        <Sidebar/>
            {/* Profile ocupa 3/4 del ancho */}
            <Profile />
        </div>
    )
}

export default PageProfile;

