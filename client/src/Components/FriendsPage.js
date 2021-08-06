import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);

    const getFriends = () => {
        fetch("/relationships/friends")
        .then(response => response.json())
        .then(json => setFriends(json))
    }

    useEffect(() => {
       getFriends();
    }, []);

    const handleRemoveFriend = friend_id => {
        fetch(`/relationships/${friend_id}`, {
            method: "PATCH"
        })
        .then(() => getFriends())
    }

    const friendsArray = friends.map(friend => {
        return (
            <li className="friend" key={friend.id}>
                <Link to={`/users/${friend.id}`}>
                    <h4>{friend.first_name + " " + friend.last_name}</h4>
                    {friend.img_url ? <img src={friend.img_url} alt="User" className="img-circle" /> :
                                      <img src="https://image.flaticon.com/icons/png/128/809/809052.png" alt="User" className="default" />
                    }
                </Link>
                <br />
                <button onClick={() => handleRemoveFriend(friend.id)}>Remove friend</button>
                <br />
                <br />
            </li>
        );
    });

    return (
        <div>
            <header>My Friends</header>
            <ul>
                {friendsArray}
            </ul>
        </div>
    )
}

export default FriendsPage;
