import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SearchPage = ({ currentUser }) => {
  const { query, type } = useParams();

  const [users, setUsers] = useState([]);
  const [hives, setHives] = useState([]);

  useEffect(() => {
    fetch("/users/all")
      .then((response) => response.json())
      .then((json) => setUsers(json));

    fetch("/hives/all")
      .then((response) => response.json())
      .then((json) => setHives(json));
  }, []);

  let queriedUsers = users;
  let queriedHives = hives;

  let usersArray = [];
  let hivesArray = [];

  if (users.length > 0) {
    if (query !== "All") {
      queriedUsers = users.filter(
        (user) =>
          user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    usersArray = queriedUsers.map((user) => {
      return (
        <li className="user" key={user.id}>
          {user.id === currentUser.id ? (
            <>
              <h4>{user.username} (Me)</h4>
              {user.img_url ? (
                <img src={user.img_url} alt="User" className="img-circle" />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/png/128/809/809052.png"
                  alt="User"
                  className="default"
                />
              )}
              <br />
            </>
          ) : (
            <>
              <Link to={`/users/${user.id}`}>
                <h4>{user.username}</h4>
                {user.img_url ? (
                  <img src={user.img_url} alt="User" className="img-circle" />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/png/128/809/809052.png"
                    alt="User"
                    className="default"
                  />
                )}
              </Link>
              <br />
            </>
          )}
        </li>
      );
    });
  }

  if (hives.length > 0) {
    if (query !== "All") {
      queriedHives = hives.filter(
        (hive) => hive.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    hivesArray = queriedHives.map((hive) => {
      return (
        <li className="hive" key={hive.id}>
          <Link to={`/hives/${hive.id}`}>
            <h4>{hive.name}</h4>
            <img
              src="https://www.svgrepo.com/show/212068/hive.svg"
              alt="Bee hive"
              className="default"
            />
          </Link>
          <br />
        </li>
      );
    });
  }

  return (
    <div className="pageDiv">
      <header>{type === "users" ? "Users" : "Hives"}</header>
      {type === "users" ? usersArray : hivesArray}
    </div>
  );
};

export default SearchPage;
