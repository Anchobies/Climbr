import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Layout from "./Layout";
import { Button } from "@material-ui/core"

const Solve = ({ currentUser }) => {
    const problemId = useParams().problem_id

    const step = useParams().step

    const history = useHistory();

    const [problem, setProblem] = useState({
        name: "",
        difficulty: "",
        categories: [],
        layout: [],
        wall_id: 1
    })

    useEffect(() => {
        fetch(`/problems/${problemId}`)
            .then(res => res.json())
            .then(data => {
                setProblem(data)
            }
            )
    }, [problemId]);

    return (
        <div>
            <header>Solve {problem.name}</header>
            <h4>Step {step}:</h4>
            <Layout layout={problem.layout} />
            <Button variant="contained" color="primary">
                Previous step
            </Button>
            <Button variant="contained" color="primary">
                Next step
            </Button>
            <Button variant="contained" color="primary" onClick={() => history.push(`/climbs`)}>
                Create Approach
            </Button>
        </div>
    )
}

export default Solve
