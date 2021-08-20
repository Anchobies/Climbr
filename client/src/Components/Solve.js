import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Button } from "@material-ui/core";

const Solve = ({ currentUser, solution, setSolution }) => {
  const problemId = useParams().problem_id;

  const step = useParams().step;

  const history = useHistory();

  const [problem, setProblem] = useState({
    name: "",
    difficulty: "",
    categories: [],
    layout: [],
    wall_id: 1,
  });

  if (!solution[+step - 1]) {
    history.push(`/solve/${problemId}/1`);
  }

  useEffect(() => {
    fetch(`/problems/${problemId}`)
      .then((res) => res.json())
      .then((data) => {
        setProblem(data);
      });
  }, [problemId]);

  const clickTile = (row, col, layout, setLayout) => {
    
  }

  return (
    <div>
      <header>Solve {problem.name}</header>
      <h4>Step {step}:</h4>
      <Layout layout={problem.layout} />
      {step != 1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/solve/${problemId}/${+step - 1}`)}
        >
          Previous step
        </Button>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (!solution[step]) {
            let newSolution = [...solution];
            newSolution[step] = [
              [null, null],
              [null, null],
              [null, null],
              [null, null],
            ];
            setSolution(newSolution);
          }

          history.push(`/solve/${problemId}/${+step + 1}`);
        }}
      >
        Next step
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
            history.push(`/climbs`)
        }}
      >
        Create Approach
      </Button>
    </div>
  );
};

export default Solve;
