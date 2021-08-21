import React, { useState } from 'react'
import Solve from "./Solve";

const SolveParent = ({ currentUser }) => {
    const [solution, setSolution] = useState([
        [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ]
      ]);

    return (
        <Solve currentUser={currentUser} solution={solution} setSolution={setSolution} />
    )
}

export default SolveParent
