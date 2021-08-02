import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
// import BeePage from './Components/BeePage';

const HivePage = () => {
    const hiveId = useParams().hive_id;

    // const history = useHistory();

    const [bees, setBees] = useState([]);

    useEffect(() => {
        setBees([{
            id: 1,
            username: "Anchobies"
        }, 
        {
            id: 2,
            username: "Anthony"
        }, 
        {
            id: 3,
            username: "Hionu"
        }, 
        {
            id: 4,
            username: "Tony"
        }]);
    }, []);

    const beesArray = bees.map(bee => {
        return (
            <div key={bee.id}>
                <Link to={`/hives/${hiveId}/${bee.id}`}>
                    <h3>{bee.username}</h3>
                    <img src={"https://image.flaticon.com/icons/png/128/809/809052.png"} alt="Bee"/>
                </Link>
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