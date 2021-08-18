import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Layout from "./Layout";
import { Button } from "@material-ui/core"

const Problem = ({ currentUser }) => {
    const problemId = useParams().problem_id

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
            <header>{problem.name}</header>
            <h4>Difficulty: {problem.difficulty}</h4>
            <Layout layout={problem.layout} />
            <h3>User Approaches: </h3>
            <Button variant="contained" color="primary" onClick={() => history.push(`/solve/${problem.id}/1`)}>
                Solve
            </Button>
        </div>
    )
}

export default Problem
