import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";

const Search = ({ currentUser }) => {
  const { query, type } = useParams();

  const [users, setUsers] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch("/users/all")
      .then((response) => response.json())
      .then((json) => setUsers(json));

    fetch("/gyms/all")
      .then((response) => response.json())
      .then((json) => setGyms(json));

    fetch("/problems/all")
      .then((response) => response.json())
      .then((json) => setProblems(json));
  }, []);

  let queriedUsers = users;
  let queriedGyms = gyms;
  let queriedProblems = problems;

  let usersArray = [];
  let gymsArray = [];
  let problemsArray = [];

  if (users.length > 0) {
    if (query !== "All") {
      queriedUsers = users.filter(
        (user) =>
          user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    usersArray = queriedUsers.map((user) => {
      return (
        <Grid item xs={4} key={user.id}>
          <Card>
            <CardContent>
              {currentUser && user.id === currentUser.id ? (
                <Link to={`/profile`}>
                  <h4>{user.username} (Me)</h4>
                  {user.img_url ? (
                    <img src={user.img_url} alt="User" className="img-circle" />
                  ) : (
                    <img src="https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6" alt="User" className="default-img" />
                  )}
                </Link>
              ) : (
                <Link to={`/users/${user.id}`}>
                  <h4>{user.username}</h4>
                  {user.img_url ? (
                    <img src={user.img_url} alt="User" className="img-circle" />
                  ) : (
                    <img src="https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6" alt="User" className="default-img" />
                  )}
                </Link>
              )}
              <br />
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  if (gyms.length > 0) {
    if (query !== "All") {
      queriedGyms = gyms.filter(
        (gym) => gym.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    gymsArray = queriedGyms.map((gym) => {
      return (
        <Grid item xs={4} key={gym.id}>
          <Card>
            <CardContent>
              <Link to={`/gyms/${gym.id}`}>
                <h4>{gym.name}</h4>
                <img src={gym.img_url} alt="Gym" className="default-img" />
              </Link>
              <br />
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  if (problems.length > 0) {
    if (query !== "All") {
      queriedProblems = problems.filter(
        (problem) =>
          problem.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    problemsArray = queriedProblems.map((problem) => {
      return (
        <Grid item xs={4} key={problem.id}>
          <Card>
            <CardContent>
              <Link to={`/problems/${problem.id}`}>
                <h4>{problem.name}</h4>
                <p>{problem.difficulty}</p>
                <p>Gym: {problem.wall.gym.name}</p>
                <p>Wall: {problem.wall.name}</p>
              </Link>
              <br />
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <div className="pageDiv">
      <header>
        {type === "users" ? "Users" : type === "gyms" ? "Gyms" : "Problems"}
      </header>
      <br />
      <Grid justifyContent="center" container spacing={3}>
        {type === "users"
          ? usersArray
          : type === "gyms"
          ? gymsArray
          : problemsArray}
      </Grid>
    </div>
  );
};

export default Search;
