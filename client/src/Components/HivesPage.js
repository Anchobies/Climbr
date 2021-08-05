import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const HivesPage = () => {
    const [hives, setHives] = useState([])

    useEffect(() => {
        fetch("/hives")
        .then(response => response.json())
        .then(json => setHives(json))
    }, [])

    const hivesArray = hives.map(hive => {
        
        return (
            <li key={hive.id}>
                <Link to={`/hives/${hive.id}`}>
                    <h3>{hive.name}</h3>
                    <img src="https://www.svgrepo.com/show/212068/hive.svg" alt="Bee hive" className="default"/>
                </Link>
            </li>
        )
    })
    return (
        <div>
            <header>My Hives</header>
            <ul>
                {hivesArray}
            </ul>
        </div>
    )
}

export default HivesPage;
