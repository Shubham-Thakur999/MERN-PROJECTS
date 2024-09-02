// OH MY GOD JUST DELETE THE BELOW IMPORTS ADDED BY VS CODE ON ITSELF.
// import { response } from 'express';


import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = async () => {
    console.log("Login function executed", formData);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const responseData = await response.json();
      console.log("Login responseData:", responseData); // Debugging log
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const signup = async () => {
    console.log("Signup function executed", formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, email: formData.email, password: formData.password }),
      });
      const responseData = await response.json();
      console.log("Signup responseData:", responseData); // Debugging log
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign up" && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Your Name'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email Address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Password'
          />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign up" ? (
          <p className="loginsignup-login">
            Already have an account
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account <span onClick={() => setState("Sign up")}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
