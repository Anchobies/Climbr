import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import anthonypic from "../anthonypic.jpg";
// import BeePage from './Components/BeePage';

const HivePage = () => {
    const hiveId = useParams().hive_id;

    // const history = useHistory();

    const [bees, setBees] = useState([]);

    useEffect(() => {
        setBees([{
            id: 1,
            first_name: "Antoine",
            last_name: "Chu",
            img_url: ""
        }, 
        {
            id: 2,
            first_name: "Anthony",
            last_name: "Chung",
            img_url: anthonypic
        }, 
        {
            id: 3,
            first_name: "Hionu",
            last_name: "Chong",
            img_url: ""
        }, 
        {
            id: 4,
            first_name: "Tony",
            last_name: "Chun",
            img_url: ""
        }]);
    }, []);

    const beesArray = bees.map(bee => {
        return (
            <div key={bee.id}>
                <Link to={`/hives/${hiveId}/${bee.id}`}>
                    <h3>{bee.first_name} {bee.last_name}</h3>
                    <img src={bee.img_url ? bee.img_url : "https://image.flaticon.com/icons/png/128/809/809052.png"} alt="Bee" className={bee.img_url ? "img-circle" : "default"}/>
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