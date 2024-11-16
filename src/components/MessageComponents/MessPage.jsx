import React from "react";
import Sidebar from "../NavComponents/Sidebar";
import Message from './Message'

const Messpage = () => {

    return(
        <div className="flex-direction-column ">
            {/* Sidebar ocupa 1/4 del ancho */}
            <Sidebar/>
            {/* Profile ocupa 3/4 del ancho */}
            <Message />
        </div>
    )

}

export default Messpage;