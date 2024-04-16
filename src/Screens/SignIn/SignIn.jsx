import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../Services/users.js";
import "./SignIn.css";

function SignIn({ setUser, setProfile }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      const userData = await signIn(form);
      setUser(userData.user);
      setProfile(userData.userProfile)

      navigate("/browse");
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Invalid Credentials",
        password: "",
      }));
    }
  };

  const renderError = () => {
    const toggleForm = form.isError ? "danger" : "";

    if (form.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {" "}
          {form.errorMsg}
        </button>
      );
    } else {
      return (
        <button className="signin-button" type="submit">
          Log In
        </button>
      );
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="siginin-logo-wrapper">
        <img
          className="signin-logo-img"
          src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
          alt="signin logo"/>
      </div>
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="signin-user-wrapper">
            <input
              className="signin-user"
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter Username"
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="signin-password-wrapper">
            <input
              className="signin-password"
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
        <Link
        className="link-sign-in"
        to={"/signup"}
      >
        No account?
        Sign up <span className="here">here.</span>
      </Link>
      </div>
    </div>
  );
}

export default SignIn;
