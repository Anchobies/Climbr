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

  const [solveErrors, setSolveErrors] = useState([]);

  const [solutionStep, setSolutionStep] = useState("0");

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

  const clickTile = (row, col, stepSolution, setStepSolution) => {
    const handFeet = ["lh", "rh", "lf", "rf"];

    if (+solutionStep === 5) {
      return;
    }

    let newStepSolution = [...stepSolution];

    if (
      stepSolution[+solutionStep] &&
      stepSolution[+solutionStep][0] === row &&
      stepSolution[+solutionStep][1] === col
    ) {
      newStepSolution[+solutionStep] = [null, null];
    } else if (solutionStep === "4") {
      newStepSolution[3] = [null, null];
      setSolutionStep("3");
    } else if (+solutionStep < 4) {
      newStepSolution[+solutionStep] = [row, col];
      setSolutionStep((+solutionStep + 1).toString());
    }

    setStepSolution(newStepSolution);
  };

  const handleRadioChange = (e) => {
    setSolutionStep(e.target.value);
  };

  console.log(solutionStep)

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

      <div className="form-group">
        <p>Select placement:</p>
        <div>
          <input
            type="radio"
            value="0"
            checked={solutionStep === "0"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="0">Left hand</label>
        </div>
        <div>
          <input
            type="radio"
            value="1"
            checked={solutionStep === "1"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="1">Right hand</label>
        </div>
        <div>
          <input
            type="radio"
            value="2"
            checked={solutionStep === "2"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="2">Left foot</label>
        </div>
        <div>
          <input
            type="radio"
            value="3"
            checked={solutionStep === "3" || solutionStep === "4"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="3">Right foot</label>
        </div>
      </div>

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
