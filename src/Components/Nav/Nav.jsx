import { NavLink } from 'react-router-dom'
// import { NavLink , useParams } from 'react-router-dom'
// import { userProfile } from "../UserProfile/UserProfile.jsx"
// import { getUserProfile} from '../../Services/userProfile.js'
// import { useState, useEffect } from 'react'
import "./Nav.css"



function Nav({profile}) {
  
  // const [profile, setProfile] = useState();
  // let { id } = useParams(); // Destructuring to get id from URL parameters

  // useEffect(() => {
  //   const fetchProfileId = async () => {
  //     const profileData = await getUserProfile();

  //     console.log(profileData)

  //     setProfile(profileData);

  //     console.log(profileData)

  //   };

  //   if (id) { 
  //     fetchProfileId();
  //   }
  // }, []);

  // console.log(id)

     




const navOptions = (
    
  <div className='nav-icons'>
    <NavLink className='nav-link' to='/feed'><img className='nav-icon' src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/home-icon.png?raw=true'alt="logo"/></NavLink>
    <NavLink className='nav-link' to='/createproject'><img className='nav-icon' src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/create-icon.png?raw=true'alt="icon"/></NavLink>
    <NavLink className='nav-link' to='/browse'><img className='browse-icon'src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/browse-icon.png?raw=true'alt="logo"/></NavLink>
    <NavLink className='nav-link' to={`/profile/${profile.id}`}><img className='nav-icon'src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/profile-icon.png?raw=true'alt="logo"/></NavLink>
    
  </div>)
 

// function Nav() {
//   const { user } = useUser();

//   const navOptions = (
//     <div className='nav-icons'>
//       <NavLink className='nav-link' to='/feed'>
//         <img className='nav-icon' src='path_to_home_icon' alt='Home'/>
//       </NavLink>
//       <NavLink className='nav-link' to='/createproject'>
//         <img className='nav-icon' src='path_to_create_icon' alt='Create Project'/>
//       </NavLink>
//       <NavLink className='nav-link' to='/browse'>
//         <img className='browse-icon' src='path_to_browse_icon' alt='Browse'/>
//       </NavLink>
//       <NavLink className='nav-link' to={`/profile/${user?.id}`}>
//         <img className='nav-icon' src='path_to_profile_icon' alt='Profile'/>
//       </NavLink>
//     </div>
//   );

//   return (
//     <div className='nav-container'>
//       <div className='links'>{navOptions}</div>
//     </div>
//   );
// }

// export default Nav;


  return (
    <div className='nav-container'>
      <div className='links'> { navOptions} </div>
    </div>
  )
}

export default Nav;