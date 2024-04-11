import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../Services/users.js";
import "./SignUp.css"

function Register({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = await signUp(form);
      console.log(userData);
      setUser(userData);

      navigate("/browse");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Invalid credentials",
        email: "",
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {form.errorMsg}
        </button>
      );
    } else {
      return <button className="signup-button" type="submit">Register</button>;
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="siginin-logo-wrapper">
        <img
          className="signin-logo-img"
          src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
        />
      </div>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-user-wrapper">
            <input
              className="signup-user"
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter Username"
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="signup-email-wrapper">
            <input
              className="signup-email"
              type="text"
              name="email"
              value={form.email}
              placeholder="Enter Email"
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="signup-password-wrapper">
            <input
              className="signup-password"
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          {renderError()}
        </form>
      </div>
    </div>
  );
}

export default Register;
