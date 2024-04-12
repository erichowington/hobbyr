import {useState, useEffect } from "react";
import UserProfile from "../../Components/UserProfile/UserProfile";


function Profile({profile}) {
  return (
   <div className="profile">
    <UserProfile profile={profile}/>

   </div>
  );
}

export default Profile;
