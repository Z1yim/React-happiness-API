import { useHistory } from "react-router-dom";
import React, { useState } from "react";

export default function Login(props) {
  const MESSAGE_MISSING_INFO =
    "Request body incomplete, both email and password are required";
  const MESSAGE_WRONG_INFO = "Incorrect email or password";

  let history = useHistory();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMissingInfo, setErrorMissingInfo] = useState(false);
  const [errorWrongInfo, setErrorWrongInfo] = useState(false);

  function onClickLogin() {
    if (errorMissingInfo) setErrorMissingInfo(false);
    if (errorWrongInfo) setErrorWrongInfo(false);

    return getLogin(inputEmail, inputPassword).then((res) => {
      if (res.error) {
        if (res.message === MESSAGE_MISSING_INFO) setErrorMissingInfo(true);
        if (res.message === MESSAGE_WRONG_INFO) setErrorWrongInfo(true);
      } else {
        localStorage.setItem("token", res.token);
        props.setLoginState(true);
        history.push("./");
      }
    });
  }

  return (
    <div className="hero">
      <h1>Login Page</h1>
      <div className="main-content">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onClickLogin();
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
          <button type="submit">Login</button>
        </form>
      </div>
      {errorMissingInfo && (
        <div className="error-message">
          Please fill in your e-mail and password to log in.
        </div>
      )}
      {errorWrongInfo && (
        <div className="error-message">Incorrect e-mail or password.</div>
      )}
    </div>
  );
}

function getLogin(email, password) {
  const url = "http://131.181.190.87:3000/user/login";
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
