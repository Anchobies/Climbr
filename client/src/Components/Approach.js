import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Button } from "@material-ui/core";

const Approach = ({ currentUser }) => {
  const approachId = useParams().approach_id;

  const step = useParams().step;

  const history = useHistory();

  const [problem, setProblem] = useState({
    name: "",
    difficulty: "",
    categories: [],
    layout: [],
    wall_id: 1,
  });

  const [approach, setApproach] = useState([
    [
      [null, null],
      [null, null],
      [null, null],
      [null, null],
    ],
  ]);

  const [solutionName, setSolutionName] = useState("");

  if (!approach[+step - 1]) {
    history.push(`/approaches/${approachId}/1`);
  }

  useEffect(() => {
    fetch(`/approaches/${approachId}`)
      .then((res) => res.json())
      .then((data) => {
        let dataCopy = {...data.problem};
        dataCopy.layout = JSON.parse(dataCopy.layout);
        setProblem(dataCopy);
        setApproach(JSON.parse(data.solution.steps));
        setSolutionName(data.solution.name);
      });
  }, [approachId]);

  return (
    <div>
      <header>Approach for {problem.name}: {solutionName}</header>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        Back
      </Button>
      <h4>Step {step}:</h4>
      <Layout layout={problem.layout} solution={approach[step - 1]} />
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
      {+step != 1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/approaches/${approachId}/${+step - 1}`)}
        >
          Previous step
        </Button>
      ) : null}
      {approach[+step] ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push(`/approaches/${approachId}/${+step + 1}`);
          }}
        >
          Next step
        </Button>
      ) : null}
    </div>
  );
};

export default Approach;
