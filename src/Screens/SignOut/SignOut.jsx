import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../Services/users';


function SignOut ( { setUser } ) {
  const navigate = useNavigate()

  useEffect( () => { 
    const signOutUser = async () => { 
      await signOut()
      setUser( null )
      navigate('/signin')
    }
    signOutUser()

  }, [navigate, setUser])
  return ''

}

export default SignOut