import React from "react";
import Sidebar from './Sidebar';
import {RoomiesFavList} from './RoomieFavList';
import '../App.css'


const FavProfile = () =>{
    return(
        <div className="flex-direction-column">
            {/* Sidebar ocupa 1/4 del ancho */}
            <Sidebar/>
            {/* Profile ocupa 3/4 del ancho */}
            <RoomiesFavList />
        </div>
    )
}

export default FavProfile;

