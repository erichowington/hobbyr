import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../Services/users.js';
import "./SignIn.css"



function SignIn({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState( {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  } );

  const handleChange = ( e ) => {
    const { name, value } = e.target;

    setForm( ( prevForm ) => ( {
      ...prevForm,
      [name]: value,
    } )
    )
  };

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const userData = await signIn(form);
        setUser(userData);

        navigate('/browse');
    } catch (error) {
        console.error(error);
        setForm((prevForm) => ({
            ...prevForm,
            isError: true,
            errorMsg: "Invalid Credentials",
            password: '',
        }));
    }
}

const renderError = () => {
  const toggleForm = form.isError ? "danger" : '';

  if( form.isError ) {
    return ( <button type='submit' className={toggleForm}> {form.errorMsg}</button>
    );
  } else {
    return <button type='submit'>Log In</button>
  }
  }




    return (
        <div className='signin-wrapper'>
            <div className='signin-container'>
        
                <form className='signin-form' onSubmit={handleSubmit}>

                    <input type="text"
                        name='username'
                        value={form.username}
                        placeholder='Enter Username'
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />
                    
                  
                    
                    <input type="password"
                        name='password'
                        value={form.password}
                        placeholder='Enter Password'
                        onChange={handleChange}
                        required
                        autoComplete='off'
                    />

                    {renderError()}
                    

                </form>
            </div>


        </div>
    );
}



export default SignIn
