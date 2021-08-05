import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
// import BeePage from './Components/BeePage';

const HivePage = () => {
    const hiveId = useParams().hive_id;

    // const history = useHistory();

    const [bees, setBees] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/bees/${hiveId}/bees`)
            .then(response => response.json())
            .then(json => setBees(json))
    }, [hiveId]);

    const beesArray = bees.map(bee => {
        return (
            <div key={bee.id}>
                <Link to={`/hives/${hiveId}/${bee.id}`}>
                    <h3>{bee.user.first_name} {bee.user.last_name}</h3>
                    <img src={bee.user.img_url ? bee.user.img_url : "https://image.flaticon.com/icons/png/128/809/809052.png"} alt="Bee" className={bee.user.img_url ? "img-circle" : "default"}/>
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