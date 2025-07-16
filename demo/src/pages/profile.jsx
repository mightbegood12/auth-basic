import React from "react";

const Profile = () => {
  return (
    <div className="home-container">
      <div className="profile-container">
        <div className="profile-title">
          User Profile
          <img
            src="/profile_icon.png"
            alt="Profile"
            width="40px"
            height="40px"
          />
        </div>
      </div>
      {/* <div>Stats</div> */}
    </div>
  );
};

export default Profile;
