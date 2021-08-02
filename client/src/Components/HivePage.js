import React, { useState, useEffect } from 'react'
// import { useParams, useHistory } from "react-router-dom"
const HivePage = () => {
    // const hiveId = useParams().id;

    // const history = useHistory();

    const [bees, setBees] = useState([]);

    useEffect(() => {
        setBees(["Anchobies", "Anthony", "Hionu", "Tony"]);
    }, []);

    const beesArray = bees.map(bee => {
        return (
            <div key={bee}>
                <h3>{bee}</h3>
                <img src={"https://image.flaticon.com/icons/png/128/809/809052.png"} alt="Bee"/>
            </div>
        )
    })

    return (
        <div>
            <header>Hive 1</header>
            {beesArray}
        </div>
    )
}

export default HivePage;