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
    <div className="pageDiv">
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
      <br/>
      <br/>
      <Layout layout={problem.layout} />
      <div className="legend">
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Legend</h3>
        <p className="hold-form" style={{ color: "#FF00FF" }} htmlFor="#FF00FF">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start
        </p>
        <p className="hold-form" style={{ color: "red" }} htmlFor="red">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jug
        </p>
        <p className="hold-form" style={{ color: "orange" }} htmlFor="orange">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sloper
        </p>
        <p className="hold-form" style={{ color: "yellow" }} htmlFor="yellow">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pocket
        </p>
        <p className="hold-form" style={{ color: "green" }} htmlFor="green">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pinch
        </p>
        <p className="hold-form" style={{ color: "blue" }} htmlFor="blue">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Crimp
        </p>
        <p className="hold-form" style={{ color: "purple" }} htmlFor="purple">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Volume
        </p>
        <p className="hold-form" style={{ color: "cyan" }} htmlFor="cyan">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End
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
      <br/>
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
