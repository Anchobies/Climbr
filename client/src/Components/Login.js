import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const style = {
  background: "#b5d1fc",
  borderRadius: 3,
  border: "0",
  color: "black",
  height: 48,
  fontWeight: "bold",
  padding: "0 30px",
  width: "285px",
};

const style2 = {
  background: "#ffda5b",
  borderRadius: 3,
  border: 0,
  color: "black",
  height: 48,
  fontWeight: "bold",
  padding: "0 30px",
  width: "285px",
};

const Login = ({ setToggle, toggle, onLogin }) => {
  const initialUser = {
    password: "",
    username: "",
  };

  const history = useHistory();

  const [cred, setCred] = useState(initialUser);
  const [loginErrors, setLoginErrors] = useState([]);
  const [loginToggle, setLoginToggle] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cred),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.errors) {
          history.push("/create");
          onLogin(json);
        } else {
          setLoginErrors(json.errors);
        }
      });
  };

  const handleCred = (e) => {
    const credCopy = { ...cred };
    credCopy[e.target.name] = e.target.value;
    setCred(credCopy);
  };

  return (
    <div className="Login">
      <div
        onClick={() => setLoginToggle(false)}
        onMouseLeave={(e) => (e.target.className = "climbr")}
        onMouseEnter={(e) => (e.target.className = "climbr-hover")}
        className="climbr"
      ></div>
      {!loginToggle ? (
        <>
          <p className="loginDescription">
            Set your climb
            <br />
            Solve your climb
            <br />
            Save your climb
          </p>
          <br />
          <Button
            style={style}
            onClick={() => setLoginToggle(!loginToggle)}
            type="submit"
            color="primary"
            variant="contained"
            className="loginButton1"
          >
            Log In{" "}
          </Button>
          <br />
          <br />
          <Button
            style={style2}
            onClick={() => setToggle(!toggle)}
            type="submit"
            color="primary"
            variant="contained"
            className="loginButton2"
          >
            Sign Up{" "}
          </Button>
        </>
      ) : (
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <br />
            <label>
              <input
                onChange={handleCred}
                name="username"
                value={cred.username}
                type="text"
                className="loginInput"
                placeholder="Username"
              />
            </label>
            <br />
            <br />
            <label>
              <input
                onChange={handleCred}
                name="password"
                value={cred.password}
                type="password"
                className="loginInput"
                placeholder="Password"
              />
            </label>
            <Button
              style={style2}
              type="submit"
              color="secondary"
              variant="contained"
              className="loginButton3"
            >
              Log In
            </Button>
            <br />
          </form>
          <br/>
          <br/>
          <br/>
          <br/>
          {loginErrors.map((loginError) => (
            <p className="error-message" key={loginError}>
              {loginError}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Login;
