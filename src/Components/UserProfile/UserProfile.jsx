import React from 'react'
import { getUserProfile } from '../../Services/userProfile';
import { useState, useEffect  } from 'react';
import "./UserProfile.css"
import { useParams } from 'react-router-dom'


function UserProfile({ profile }) {
  const [current, setCurrent]= useState({ profile })

  const { profileId } = useParams()

  

  useEffect(()=>{
    const fetchProfile = async () => {
      const oneProfile = await getUserProfile(profileId);
      setCurrent(oneProfile)

     
    };
    fetchProfile();
   
    

  }, [])

return (

    <div className="profile-wrapper">
      <div className="profile-logo-wrapper">
        <img className="profile-logo" src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"/>
      </div>
      <div className="profile-container">
        <div className="profile-container-top">
          <div className="profile-container-tl">
            <div className="profile-img-wrapper">
              <img
                className="profile-img"
                src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-thumbnail-orange.png?raw=true"
                alt="user-icon"
              />
            </div>
            <div className="profile-username">{current.username}</div>
            <button className="follow-button">Follow</button>
          </div>
          <div className="profile-container-tr">
            <div className="follow-tracker">
              <div className="profile-followers">
                <div className="followers-header">Followers</div>
                <div className="follower-count">200</div>
              </div>
              <div className="profile-following">
                <div className="following-header">Following</div>
                <div className="following-count">2</div>
              </div>
            </div>
            <div className="profile-bio">
              <div className="bio-container">
                <div className="bio-body">{current.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile