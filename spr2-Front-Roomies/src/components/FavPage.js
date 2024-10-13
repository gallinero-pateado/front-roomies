import React from "react";
import Sidebar from './Sidebar';
import {RoomiesList} from './RoomieFavList';
import '../App.css'


const FavProfile = () =>{
    return(
        <div className="flex-direction-column">
            {/* Sidebar ocupa 1/4 del ancho */}
            <Sidebar/>
            {/* Profile ocupa 3/4 del ancho */}
            <RoomiesList />
        </div>
    )
}

export default FavProfile;

