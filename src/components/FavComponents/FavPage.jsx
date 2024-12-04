import React from "react";
import Sidebar from '../NavComponents/Sidebar';
import { RoomiesFavList } from './RoomieFavList';

const FavProfile = () => {
    return (
        <div className="flex flex-col lg:flex-row mx-auto w-full max-w-screen-xl mt-10">
            {/* Sidebar ocupa 1/4 del ancho */}
            <div className="lg:w-1/4 w-full">
                <Sidebar />
            </div>
            {/* Profile ocupa 3/4 del ancho */}
            <div className="lg:w-3/4 w-full px-4 lg:px-10">
                <RoomiesFavList />
            </div>
        </div>
    );
};

export default FavProfile;
