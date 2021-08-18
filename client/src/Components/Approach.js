import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Layout from "./Layout";
import { Button } from "@material-ui/core"

const Approach = ({ currentUser }) => {
    const approachId = useParams().approach_id

    const step = useParams().step

    const [approach, setApproach] = useState({
        problem: {
            name: "",
            difficulty: "",
            categories: [],
            layout: [],
            wall_id: 1
        },
        steps: []
    })

    useEffect(() => {
        fetch(`/approaches/${approachId}`)
            .then(res => res.json())
            .then(data => {
                setApproach(data)
            }
            )
    }, [approachId]);

    return (
        <div>
            <header>Approach for {approach.problem.name}</header>
            <h4>Step {step}:</h4>
            <Layout layout={approach.problem.layout} />
            <Button variant="contained" color="primary">
                Previous step
            </Button>
            <Button variant="contained" color="primary">
                Next step
            </Button>
        </div>
    )
}

export default Approach
