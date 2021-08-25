import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Layout from "./Layout";
import { Button, Grid, Card, CardContent } from "@material-ui/core";

const Problem = ({ currentUser }) => {
  const problemId = useParams().problem_id;

  const history = useHistory();

  const [problem, setProblem] = useState({
    name: "",
    difficulty: "",
    categories: [],
    layout: [],
    wall_id: 1,
    wall: {
      name: "",
      gym: { name: "" }
    }

  });

  useEffect(() => {
    fetch(`/problems/${problemId}`)
      .then((res) => res.json())
      .then((data) => {
        let dataCopy = { ...data };
        dataCopy.layout = JSON.parse(dataCopy.layout);
        setProblem(dataCopy);
      });
  }, [problemId]);

  let approachesArray = [];

  if (problem.approaches && problem.approaches.length > 0) {
    approachesArray = problem.approaches.map((approach, i) => {
      return (
        <Grid item xs={4} key={approach.id}>
          <Card>
            <CardContent>
              <Link to={`/approaches/${approach.id}/1`}>
                <h3>{approach.name}</h3>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <div>
      <header>{problem.name}</header>
      <h4>Difficulty: {problem.difficulty}</h4>
      <h4>Gym: {problem.wall.gym.name}</h4>
      <h4>Wall: {problem.wall.name}</h4>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        Back
      </Button>
      <Layout layout={problem.layout} />
      <div className="legend">
        <h3>Legend</h3>
        <p style={{ color: "#FF00FF" }} htmlFor="#FF00FF">
          Start
        </p>
        <p style={{ color: "red" }} htmlFor="red">
          Jug
        </p>
        <p style={{ color: "orange" }} htmlFor="orange">
          Sloper
        </p>
        <p style={{ color: "yellow" }} htmlFor="yellow">
          Pocket
        </p>
        <p style={{ color: "green" }} htmlFor="green">
          Pinch
        </p>
        <p style={{ color: "blue" }} htmlFor="blue">
          Crimp
        </p>
        <p style={{ color: "purple" }} htmlFor="purple">
          Volume
        </p>
        <p style={{ color: "cyan" }} htmlFor="cyan">
          End
        </p>
      </div>
      <h3>User Approaches: </h3>
      {approachesArray.length > 0 ? (
        <Grid justifyContent="center" container spacing={3}>
          {approachesArray}
        </Grid>
      ) : (
        <p>No Approaches Yet</p>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push(`/solve/${problem.id}/1`)}
      >
        Solve
      </Button>
    </div>
  );
};

export default Problem;
