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
    <div className="pageDiv">
      <header>Approach for {problem.name}: {solutionName}</header>
      <br/>
      <br/>
      <Button
        variant="contained"
        color="primary"
        onClick={() => +step > 1 ? history.push("/climbs") : history.goBack()}
      >
        Back
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`/edit/${approachId}/1`)
                }}
              >
                Edit
              </Button>
              &nbsp;&nbsp;&nbsp;
      <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  fetch(`/approaches/${approachId}`, {
                    method: "DELETE",
                  }).then(() => history.goBack());
                }}
              >
                Delete
              </Button>
      <h4>Step {step}:</h4>
      <Layout layout={problem.layout} solution={approach[step - 1]} />
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
      <br/>
      {+step !== 1 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/approaches/${approachId}/${+step - 1}`)}
        >
          Previous step
        </Button>
      ) : null}
      &nbsp; &nbsp;
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
