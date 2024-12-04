import React from "react";
import Sidebar from "../NavComponents/Sidebar";
import Profile from "./Profile";
import Notification from "../NotificationComponents/Notifications";
import cookie from "js-cookie";

const PageProfile = () => {

  return (
    <aside className="flex flex-col lg:flex-row mx-auto w-full max-w-screen-xl mt-10">
      {/* Sidebar con margen derecho */}
      <div className="lg:w-1/4 w-full">
        <Sidebar />
      </div>
      {/* Profile con separación */}
      <div className="lg:w-3/4 w-full px-4 lg:px-10">
        <Profile />
      </div>
    </aside>
  );
};

export default PageProfile;
