import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"

const UserPage = () => {
    const userId = useParams().user_id;

    const initialUser = {
        user: {
            first_name: "",
            last_name: "",
            img_url: ""
        },
        friends: false
    };

    const [user, setUser] = useState(initialUser);
    const [userHives, setUserHives] = useState([]);

    useEffect(() => {
        fetch(`/users/${userId}`)
        .then(response => response.json())
        .then(json => setUser(json))
        
        fetch(`/hives`)
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

    const handleFriend = () => {
        fetch(`/relationships/${userId}`, {
            method: "PATCH"
        })
        .then(response => response.json())
        .then(json => {
            const userCopy = {...user}
            userCopy.friends = json;
            setUser(userCopy);
        })
    }

    return (
        <div>
            <header>{user.user.first_name} {user.user.last_name}</header>
            {user.user.img_url ? <img src={user.user.img_url} alt="User" className="img-circle" /> :
                                      <img src="https://image.flaticon.com/icons/png/128/809/809052.png" alt="User" className="default" />
                    }
            <br />
            <button onClick={handleFriend}>{user.friends ? "Remove friend" : "Add friend"}</button>
            <br />
            <h3>{user.user.first_name}'s Hives</h3>
            <ul>
                {userHivesArray}
            </ul>
        </div>
    )
}

export default UserPage;
