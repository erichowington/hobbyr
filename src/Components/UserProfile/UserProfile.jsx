import { getUserProfile } from '../../Services/userProfile';
import { Follow, Unfollow  } from '../../Services/follow.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./UserProfile.css";

function UserProfile() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile(profileId);
        setProfile(userProfile);
        setIsFollowing(userProfile.isFollowing);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleFollow = async () => {
    try {
      await Follow(profileId);
      setIsFollowing(true);
      alert('You are now following');
    } catch (error) {
      console.error('Failed to follow:', error);
      alert('Failed to follow the user');
    }
  };

  const handleUnfollow = async () => {
    try {
      await Unfollow(profileId);
      setIsFollowing(false);
      alert('You have unfollowed');
    } catch (error) {
      console.error('Failed to unfollow:', error);
      alert('Failed to unfollow the user');
    }
  };

  if (!profile) {
    return <div>Loading...</div>; 
  }

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
            <div className="profile-username">{profile.username}</div>
            {isFollowing ? (
              <button className="unfollow-button" onClick={handleUnfollow}>Unfollow</button>
            ) : (
              <button className="follow-button" onClick={handleFollow}>Follow</button>
            )}
          </div>
          <div className="profile-container-tr">
            <div className="follow-tracker">
              <div className="profile-followers">
                <div className="followers-header">Followers</div>
                <div className="follower-count"></div>
              </div>
              <div className="profile-following">
                <div className="following-header">Following</div>
                <div className="following-count">2</div>
              </div>
            </div>
            <div className="profile-bio">
              <div className="bio-container">
                <div className="bio-body">{profile.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
