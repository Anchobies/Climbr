import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Search = ({ currentUser }) => {
  const { query, type } = useParams();

  const [users, setUsers] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch("/users/all")
      .then((response) => response.json())
      .then((json) => setUsers(json));

    fetch("/gyms/all")
      .then((response) => response.json())
      .then((json) => setGyms(json));

    fetch("/problems/all")
      .then((response) => response.json())
      .then((json) => setProblems(json));  
  }, []);

  let queriedUsers = users;
  let queriedGyms = gyms;
  let queriedProblems = problems;

  let usersArray = [];
  let gymsArray = [];
  let problemsArray = [];

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
              <Link to={`/profile`}>
                <h4>{user.username} (Me)</h4>
                {user.img_url ? (
                  <img src={user.img_url} alt="User" className="img-circle" />
                ) : (
                  <img
                    src=""
                    alt="User"
                    className="default"
                  />
                )}
              </Link>
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
                    src=""
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

  if (gyms.length > 0) {
    if (query !== "All") {
      queriedGyms = gyms.filter(
        (gym) => gym.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    gymsArray = queriedGyms.map((gym) => {
      return (
        <li className="gym" key={gym.id}>
          <Link to={`/gyms/${gym.id}`}>
            <h4>{gym.name}</h4>
            <img
              src=""
              alt="Gym"
              className="default"
            />
          </Link>
          <br />
        </li>
      );
    });
  }

  if (problems.length > 0) {
    if (query !== "All") {
      queriedProblems = problems.filter(
        (problem) => problem.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }

    problemsArray = queriedProblems.map((problem) => {
      return (
        <li className="problem" key={problem.id}>
          <Link to={`/problems/${problem.id}`}>
            <h4>{problem.name}</h4>
            <img
              src=""
              alt="Problem"
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
      <header>{type === "users" ? "Users" : (type === "gyms" ? "Gyms" : "Problems")}</header>
      {type === "users" ? usersArray : (type === "gyms" ? gymsArray : problemsArray)}
    </div>
  );
};

export default Search;
