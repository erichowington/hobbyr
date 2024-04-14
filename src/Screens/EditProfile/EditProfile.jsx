import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditProfile.css"
import { getUserProfile, updateUserProfile } from '../../Services/userProfile';

function EditProfile() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username:'',
    profile_pic: '',
    bio:''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getUserProfile(profileId);
        setProfile({
          ...fetchedProfile,
        });
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, [profileId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('profile_pic', profile.profile_pic);
    formData.append('bio', profile.bio);

    try {
      await updateUserProfile(profileId, formData);
      navigate(`/profile/${profileId}`); 
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  return (
    <form className='edit-form' onSubmit={handleSubmit} encType='multipart/form-data'>
      <input
        className='input-title-form'
        placeholder='username'
        name='username'
        value={profile.username}
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        className='project-image-form'
        placeholder='Profile Picture URL'
        name='profile_pic'
        value={profile.profile_pic}
        onChange={handleChange}
        required
      />
      <textarea
        className='profile-bio'
        placeholder='bio'
        name='bio'
        value={profile.bio}
        onChange={handleChange}
        required
        rows={5}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditProfile;