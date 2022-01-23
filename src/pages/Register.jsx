import React, { useState } from "react";

export default function Register() {
  const MESSAGE_MISSING_INFO =
    "Request body incomplete, both email and password are required";
  const MESSAGE_USER_EXIST = "User already exists";

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMissingInfo, setErrorMissingInfo] = useState(false);
  const [errorUserExist, setErrorUserExist] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);

  function onClickRegister() {
    if (errorMissingInfo) setErrorMissingInfo(false);
    if (errorUserExist) setErrorUserExist(false);
    return getRegister(inputEmail, inputPassword).then((res) => {
      if (res.error) {
        if (res.message === MESSAGE_MISSING_INFO) setErrorMissingInfo(true);
        if (res.message === MESSAGE_USER_EXIST) setErrorUserExist(true);
      } else {
        setUserRegistered(true);
      }
    });
  }

  function contentForm() {
    return (
      <div className="main-content">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onClickRegister();
          }}
        >
          <div className="form-input">
            <label htmlFor="email">E-mail:</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(event) => {
                setInputEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(event) => {
                setInputPassword(event.target.value);
              }}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        {errorMissingInfo && (
          <div className="error-message">
            Please fill in your e-mail and password to register.
          </div>
        )}
        {errorUserExist && (
          <div className="error-message">User already Exists.</div>
        )}
      </div>
    );
  }

  function contentSuccess() {
    return (
      <div className="main-content">
        <h2>User successfully registered!</h2>
      </div>
    );
  }

  return (
    <div className="hero">
      <h1>Register</h1>
      {userRegistered ? contentSuccess() : contentForm()}
    </div>
  );
}

function getRegister(email, password) {
  const url = "http://131.181.190.87:3000/user/register";
  return fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => res.json());
}
