import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';

import "./Nav.css"

const navOptions = (
    
  <>
    <NavLink className='nav-link' to='/profile'>User Profile</NavLink>
    <NavLink className='nav-link' to='/feed'>Feed</NavLink>
    <NavLink className='nav-link' to='/createproject'>Create Project</NavLink>
    <NavLink className='nav-link' to='/browse'>Browse</NavLink>
  </>)

function Nav () {

 


  return (
    <div className='nav-container'>
      <div className='links'> { navOptions} </div>
    </div>
  )
}

export default Nav