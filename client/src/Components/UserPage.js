import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"

const UserPage = () => {
    const userId = useParams().user_id;

    const initialUser = {
        first_name: "",
        last_name: "",
        img_url: ""
    };

    const [user, setUser] = useState(initialUser);
    const [userHives, setUserHives] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/users`)
        .then(response => response.json())
        .then(json => setUser(json))
        
        fetch(`http://localhost:3000/hives`)
        .then(response => response.json())
        .then(json => setUserHives(json))
    }, [userId]);

    const userHivesArray = userHives.map(userHive => {
        return (
            <li key={userHive.id}>
                <Link to={`/hives/${userHive.id}`}>
                    <h3>{userHive.name}</h3>
                    <img src={"https://www.svgrepo.com/show/212068/hive.svg"} alt="Beehive" className="default"/>
                </Link>
            </li>
        )
    })
    return (
        <div>
            <header>{user.first_name} {user.last_name}</header>
            {user.img_url ? <img src={user.img_url} alt="User" className="img-circle" /> :
                                      <img src="https://image.flaticon.com/icons/png/128/809/809052.png" alt="User" className="default" />
                    }
            <br />
            <h3>{user.first_name}'s Hives</h3>
            <ul>
                {userHivesArray}
            </ul>
        </div>
    )
}

export default UserPage;
