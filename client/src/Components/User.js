import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Card, CardContent } from "@material-ui/core";

const User = () => {
  const userId = useParams().user_id;

  const initialUser = { id: 1, username: "", full_name: "", email: "" };

  const [user, setUser] = useState(initialUser);

  const [problems, setProblems] = useState([]);

  const [approaches, setApproaches] = useState([]);

  useEffect(() => {
    fetch(`/users/${userId}/problems`)
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
      });

    fetch(`/users/${userId}/approaches`)
      .then((res) => res.json())
      .then((data) => {
        setApproaches(data);
      });

    fetch(`/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [userId]);

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
                <p>Gym: {problem.wall.gym.name}</p>
                <p>Wall: {problem.wall.name}</p>
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

  return (
    <div className="pageDiv">
      <h2>Profile</h2>
      {/* <img className="avatar" alt="User Avatar" src={user.avatar} /> */}
      <ul className="signup-form-2">
        <br />
        <li>
          <strong>Username:</strong> {user.username}
        </li>
        <br />
        <li>
          <strong>Name :</strong> {user.full_name}
        </li>
        {/* <br />
               <li>
                  <strong>About Me :</strong> {bio}
               </li> */}
      </ul>
      <br />
      <h3>{user.full_name.split(" ")[0]}'s Problems</h3>
      <Grid justifyContent="center" container spacing={3}>
        {problemsArray}
      </Grid>
      <h3>{user.full_name.split(" ")[0]}'s Approaches</h3>
      <Grid justifyContent="center" container spacing={3}>
        {approachesArray}
      </Grid>
    </div>
  );
};

export default User;
