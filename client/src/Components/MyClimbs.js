import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom"

const MyClimbs = ({ currentUser, timeDifference }) => {
  const [problems, setProblems] = useState([]);
  const [approaches, setApproaches] = useState([]);

  useEffect(() => {
    fetch("/problems")
      .then((res) => {
        console.log(res)
        return res.json()
      })
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
                <h3>{approach.problem.name}</h3>
                <p>{approach.problem.difficulty}</p>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }


  return (
    <div>
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

export default MyClimbs;
