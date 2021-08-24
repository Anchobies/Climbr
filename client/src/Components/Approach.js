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
      });
  }, [approachId]);

  return (
    <div>
      <header>Anchobies's Approach to {problem.name}</header>
      <h4>Step {step}:</h4>
      <Layout layout={problem.layout} solution={approach[step - 1]} />

      {step != 1 ? (
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
