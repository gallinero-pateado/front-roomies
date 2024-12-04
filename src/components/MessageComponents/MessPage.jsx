import React from "react";
import Sidebar from "../NavComponents/Sidebar";
import Message from './Message'

const Messpage = () => {

    return(
        <div className="flex flex-col lg:flex-row mx-auto w-full max-w-screen-xl mt-10">
            {/* Sidebar ocupa 1/4 del ancho */}
            <Sidebar className="lg:w-2/4 w-full"/>
            {/* Profile ocupa 3/4 del ancho */}
            <Message className="lg:w-3/4 w-full px-4 lg:px-10" />
        </div>

    )

}

export default Messpage;