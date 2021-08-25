import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
// import MyClimbs from "./MyClimbs";

const Profile = ({ currentUser }) => {
  const initialUser = { id: 1, username: "", full_name: "", email: "" };

  const [user, setUser] = useState(initialUser);

  const [updateUser, setUpdateUser] = useState(initialUser);

  const [isToggled, setToggle] = useState(false);

  const [userErrors, setUserErrors] = useState([]);

  useEffect(() => {
      fetch(`/users/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUpdateUser(data);
      });
  }, [currentUser.id]);

  const handleUpdates = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const submitUpdate = (e) => {
    e.preventDefault();

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateUser),
    };

    fetch(`/users/${currentUser.id}`, configObj)
      .then((response) => response.json())
      .then((data) => {
        if (!data.errors) {
          setUser(data);
        } else {
          setUserErrors(data.errors);
        }
      })
      .then(setToggle(false));
  };

  return (
    <div className="pageDiv">
      <h2>Profile</h2>
      {/* <img className="avatar" alt="User Avatar" src={user.avatar} /> */}
      {isToggled ? (
        <form onSubmit={submitUpdate}>
          <ul className="signup-form">
            <br />
            <li>
              Username: &nbsp;
              <input
                onChange={handleUpdates}
                type="text"
                name="username"
                value={updateUser.username}
              />
            </li>
            <br />
            <li>
              Full Name: &nbsp;
              <input
                onChange={handleUpdates}
                type="text"
                name="full_name"
                value={updateUser.full_name}
              />
            </li>
            <br />
            <li>
              Email: &nbsp;
              <input
                onChange={handleUpdates}
                name="email"
                type="text"
                value={updateUser.email}
              />
            </li>
            {/* <li>
                     Password: &nbsp;
                     <input
                        onChange={handleUpdates}
                        type="password"
                        name="password"
                        placeholder={updateUser.password}
                        value={updateUser.password}
                     />
                  </li>
                  <br /> */}
          </ul>
          <br />
          <Button type="submit" color="primary" variant="contained">
            Submit Changes
          </Button>
        </form>
      ) : (
        <ul className="signup-form-2">
          <br />
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <br />
          <li>
            <strong>Name :</strong> {user.full_name}
          </li>
          <br />
          <li>
            <strong>Email :</strong> {user.email}
          </li>
          {/* <br />
               <li>
                  <strong>About Me :</strong> {bio}
               </li> */}
        </ul>
      )}
      <br />
      <Button
        color="primary"
        variant="contained"
        onClick={() => setToggle(!isToggled)}
      >
        {isToggled ? "Cancel Edit" : "Edit Profile"}{" "}
      </Button>
      {userErrors.map((userError) => (
        <p className="error-message" key={userError}>
          {userError}
        </p>
      ))}
      {/* <MyClimbs /> */}
    </div>
  );
};

export default Profile;
