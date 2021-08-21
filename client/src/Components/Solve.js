import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Button } from "@material-ui/core";

const Solve = ({ currentUser, solution, setSolution }) => {
  console.log(solution);
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

  const [solveErrors, setSolveErrors] = useState([]);

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

  const clickTile = (
    row,
    col,
    stepSolution,
    setStepSolution,
    solutionStep,
    setSolutionStep
  ) => {
    if (solutionStep === 5) {
      return;
    }

    let newStepSolution = [...stepSolution];

    if (
      stepSolution[solutionStep - 1] &&
      stepSolution[solutionStep - 1][0] === row &&
      stepSolution[solutionStep - 1][1] === col
    ) {
      console.log("hi");
      newStepSolution[solutionStep - 1] = [null, null];
      if (solutionStep > 0) {
        setSolutionStep(solutionStep - 1);
      }
    } else if (solutionStep < 4) {
      newStepSolution[solutionStep] = [row, col];
      setSolutionStep(solutionStep + 1);
    }

    setStepSolution(newStepSolution);
  };

  return (
    <div>
      <header>Solve {problem.name}</header>
      <h4>Step {step}:</h4>
      <Layout
        layout={problem.layout}
        solution={solution[step - 1]}
        setSolution={(newSolution) => {
          let copySolution = [...solution];
          copySolution[step - 1] = newSolution;
          setSolution(copySolution);
        }}
        clickTile={clickTile}
      />
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
          if (!solution[step - 1][0][0]) {
            setSolveErrors(["You must select a tile"]);
            return;
          }

          setSolveErrors([]);
          
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
      {solveErrors.map((solveError) => (
        <p className="error-message" key={solveError}>
          {solveError}
        </p>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push(`/climbs`);
        }}
      >
        Create Approach
      </Button>
    </div>
  );
};

export default Solve;
