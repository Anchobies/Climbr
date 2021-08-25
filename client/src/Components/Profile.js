import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom"
import { Grid, Card, CardContent } from "@material-ui/core"

const Profile = ({ currentUser }) => {
  const initialUser = { id: 1, username: "", full_name: "", email: "" };

  const [user, setUser] = useState(initialUser);

  const [updateUser, setUpdateUser] = useState(initialUser);

  const [isToggled, setToggle] = useState(false);

  const [userErrors, setUserErrors] = useState([]);

  const [problems, setProblems] = useState([]);
  
  const [approaches, setApproaches] = useState([]);

  useEffect(() => {
    fetch("/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
      });

      fetch("/approaches")
      .then((res) => res.json())
      .then((data) => {
        setApproaches(data);
      });

      fetch(`/users/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUpdateUser(data);
      });
  }, [user.id]);

  let problemsArray = [];

  if (problems.length > 0) {
    problemsArray = problems.map((problem) => {
      return (
        <Grid item xs={4} key={problem.id}>
          <Card>
            <CardContent>
              <Link to={`/problems/${problem.id}`}>
                <h3>{problem.name}</h3>
                <p>{problem.difficulty}</p>
                <p>Some wall or gym name</p>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  let approachesArray = [];

  if (approaches.length > 0) {
    approachesArray = approaches.map((approach) => {
      return (
        <Grid item xs={4} key={approach.id}>
          <Card>
            <CardContent>
              <Link to={`/approaches/${approach.id}/1`}>
                <h3>{approach.name}</h3>
                <p>For: {approach.problem.name}</p>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

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

    fetch(`/users/${user.id}`, configObj)
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
      <h3>My Problems</h3>
      <Grid justifyContent="center" container spacing={3}>
        {problemsArray}
      </Grid>
      <h3>My Approaches</h3>
      <Grid justifyContent="center" container spacing={3}>
        {approachesArray}
      </Grid>
    </div>
  );
};

export default Profile;
