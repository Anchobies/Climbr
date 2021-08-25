import React, { useState, useEffect } from 'react'
import Solve from "./Solve";
import { useParams } from "react-router-dom";

const EditParent = ({ currentUser }) => {
    const approachId = useParams().approach_id;

    const [editedApproach, setEditedApproach] = useState([
        [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ]
      ]);

      const [approachName, setApproachName] = useState("");

      const [probId, setProbId] = useState(1);

      useEffect(() => {
        fetch(`/approaches/${approachId}`)
          .then((res) => res.json())
          .then((data) => {
              setProbId(data.problem.id);
            setEditedApproach(JSON.parse(data.solution.steps));
            setApproachName(data.solution.name);
          });
      }, [approachId]);

    return (
        <Solve currentUser={currentUser} solution={editedApproach} setSolution={setEditedApproach} solutionName={approachName} probId={probId} approachId={approachId}/>
    )
}

export default EditParent
