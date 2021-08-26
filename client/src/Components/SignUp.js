import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

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

const SignUp = ({ setToggle, toggle, onLogin }) => {
  const initialUser = {
    email: "",
    password: "",
    username: "",
    full_name: "",
  };

  const history = useHistory();

  const [newUser, setNewUser] = useState(initialUser);
  const [userErrors, setUserErrors] = useState([]);

  const handleSubmitUser = (e) => {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.errors) {
          history.push("/create");
          onLogin(json);
        } else {
          setUserErrors(json.errors);
        }
      });
  };

  const handleNewUser = (e) => {
    const userCopy = { ...newUser };
    userCopy[e.target.name] = e.target.value;
    setNewUser(userCopy);
  };

  return (
    <div className="login">
      <div
        onClick={() => setToggle(true)}
        onMouseLeave={(e) => (e.target.className = "climbr")}
        onMouseEnter={(e) => (e.target.className = "climbr-hover")}
        className="climbr"
      ></div>
      <div className="signUpForm">
        <form onSubmit={handleSubmitUser}>
          <br />
          <label>
            <input
              onChange={handleNewUser}
              name="email"
              value={newUser.email}
              type="email"
              className="loginInput"
              placeholder="Mobile Number or Email"
            />
          </label>
          <br />
          <br />
          <label>
            <input
              onChange={handleNewUser}
              name="username"
              value={newUser.username}
              type="text"
              className="loginInput"
              placeholder="Username"
            />
          </label>
          <br />
          <br />
          <label>
            <input
              onChange={handleNewUser}
              name="full_name"
              value={newUser["full_name"]}
              type="text"
              className="loginInput"
              placeholder="Full Name"
            />
          </label>
          <br />
          <br />
          <label>
            <input
              onChange={handleNewUser}
              name="password"
              value={newUser.password}
              type="password"
              className="loginInput"
              placeholder="Password"
            />
          </label>
          {/* <label>
                        <input type="password" placeholder="Confirm Password" />
                    </label> */}
          <br />
          <br />
          <Button
            style={style2}
            type="submit"
            color="secondary"
            variant="contained"
            className="loginButton4"
          >
            Sign Up
          </Button>
          <br />
          <br />
        </form>
        <br/>
        {userErrors.map((userError) => (
          <p className="error-message" key={userError}>
            {userError}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SignUp;
