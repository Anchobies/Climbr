import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Button } from "@material-ui/core";

const Solve = ({ currentUser, solution, setSolution, solutionName="", probId=1, approachId=1 }) => {
  let problemId = useParams().problem_id;

  if (!problemId) {
    problemId = probId;
  }

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

  const [approachName, setApproachName] = useState("");

  const [approachErrors, setApproachErrors] = useState([]);

  useEffect(() => {
    if (solutionName) {
      setApproachName(solutionName);
    }
  }, [solutionName])

  if (!solution[+step - 1]) {
    !solutionName ? history.push(`/solve/${problemId}/1`) : history.push(`/edit/${problemId}/1`);
  }

  useEffect(() => {
    fetch(`/problems/${problemId}`)
      .then((res) => res.json())
      .then((data) => {
        let dataCopy = {...data};
        dataCopy.layout = JSON.parse(dataCopy.layout);
        setProblem(dataCopy);
      });
  }, [problemId]);

  const clickTile = (row, col, stepSolution, setStepSolution) => {
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

  return (
    <div>
      {!solutionName ? <header>Solve {problem.name}</header> : <header>Edit Approach for {problem.name}: {solutionName}</header>}
      <div className="form-group">
          <label htmlFor="name">Approach Name:</label>
          <input
            type="text"
            className="form-control"
            value={approachName}
            onChange={(e) => setApproachName(e.target.value)}
            id="approach-name"
            placeholder="Enter approach name..."
          />
        </div>
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
      <div className="legend">
        <h3>Legend</h3>
        <p style={{color:"#FF00FF"}} htmlFor="#FF00FF">Start</p>
        <p style={{color:"red"}} htmlFor="red">Jug</p>
        <p style={{color:"orange"}} htmlFor="orange">Sloper</p>
        <p style={{color:"yellow"}} htmlFor="yellow">Pocket</p>
        <p style={{color:"green"}} htmlFor="green">Pinch</p>
        <p style={{color:"blue"}} htmlFor="blue">Crimp</p>
        <p style={{color:"purple"}} htmlFor="purple">Volume</p>
        <p style={{color:"cyan"}} htmlFor="cyan">End</p>
      </div>
      {+step !== 1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => !solutionName ? history.push(`/solve/${problemId}/${+step - 1}`) : history.push(`/edit/${approachId}/${+step - 1}`)}
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

          setSolutionStep("0")

          !solutionName ? history.push(`/solve/${problemId}/${+step + 1}`) : history.push(`/edit/${approachId}/${+step + 1}`)
        }}
      >
        Next step
      </Button>
      {solveErrors.map((solveError) => (
        <p className="error-message" key={solveError}>
          {solveError}
        </p>
      ))}
      <Button onClick={() => {
        let newSolution = [...solution];
        newSolution[step - 1] = [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ];
        setSolution(newSolution);
        setSolutionStep("0");
      }} color="primary" variant="contained">
          Clear
        </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
            !solutionName ? (fetch("/approaches", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({steps: solution, problem_id: problemId, name: approachName})
            })
            .then((res) => res.json())
            .then((data) => {
              if (!data.errors) {
                history.push("/climbs");
              } else {
                setApproachErrors(data.errors);
              }
            }))
            : (fetch(`/approaches/${approachId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({steps: solution, name: approachName})
            })
            .then((res) => res.json())
            .then((data) => {
              if (!data.errors) {
                history.push("/climbs");
              } else {
                setApproachErrors(data.errors);
              }
            }))
        }}
      >
        {!solutionName ? "Create Approach" : "Edit Approach"}
      </Button>
      {approachErrors.map((approachError) => (
        <p className="error-message" key={approachError}>
          {approachError}
        </p>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => +step > 1 ? history.push("/climbs") : history.goBack()}
      >
        Cancel
      </Button>
    </div>
  );
};

export default Solve;
