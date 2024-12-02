import React from "react";
import Sidebar from "../NavComponents/Sidebar";
import Profile from "./Profile";
import Notification from "../NotificationComponents/Notifications";

const PageProfile = () => {
  const id = parseInt(Cookies.get("roomieId"));
  return (
    <div className="flex h-full min-h-screen">
      {/* Sidebar con margen derecho */}
      <div className="w-1/4 h-full">
        <Sidebar />
      </div>
      {/* Profile con separación */}
      <div className="w-3/4 h-full px-10  ">
        <Profile />
      </div>
    </div>
  );
};

export default PageProfile;
