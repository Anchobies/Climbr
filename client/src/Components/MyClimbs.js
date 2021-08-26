import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

const MyClimbs = ({ currentUser, timeDifference }) => {
  const [problems, setProblems] = useState([]);
  const [approaches, setApproaches] = useState([]);
  const history = useHistory();;

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
  }, []);

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
              <br/>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`/edit/${approach.id}/1`)
                }}
              >
                Edit
              </Button>
              &nbsp; &nbsp; 
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  fetch(`/approaches/${approach.id}`, {
                    method: "DELETE",
                  }).then(() => {
                    fetch("/approaches")
                      .then((res) => res.json())
                      .then((data) => {
                        setApproaches(data);
                      });
                  });
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <div className="pageDiv">
      <h1>My Problems</h1>
      <Grid justifyContent="center" container spacing={3}>
        {problemsArray}
      </Grid>
      <br/>
      <h1>My Approaches</h1>
      <Grid justifyContent="center" container spacing={3}>
        {approachesArray}
      </Grid>
    </div>
  );
};

export default MyClimbs;
