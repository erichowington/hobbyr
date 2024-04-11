import React from 'react'
import { NavLink } from 'react-router-dom'

import "./Nav.css"


function Nav(){

const navOptions = (
    
  <div className='nav-icons'>
    <NavLink className='nav-link' to='/feed'><img className='nav-icon' src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/home-icon.png?raw=true'/></NavLink>
    <NavLink className='nav-link' to='/createproject'><img className='nav-icon' src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/create-icon.png?raw=true'/></NavLink>
    <NavLink className='nav-link' to='/browse'><img className='browse-icon'src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/browse-icon.png?raw=true'/></NavLink>
    <NavLink className='nav-link' to='/profile/:profileId'><img className='nav-icon'src='https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-icons/profile-icon.png?raw=true'/></NavLink>
  </div>)
 

 


  return (
    <div className='nav-container'>
      <div className='links'> { navOptions} </div>
    </div>
  )
}

export default Nav