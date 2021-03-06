import "./App.css";

import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import MyClimbs from "./Components/MyClimbs";
import Approach from "./Components/Approach";
import Create from "./Components/Create";
import User from "./Components/User";
import Login from "./Components/Login";
import Problem from "./Components/Problem";
import Profile from "./Components/Profile";
import Search from "./Components/Search";
import SignUp from "./Components/SignUp";
import SolveParent from "./Components/SolveParent";
import EditParent from "./Components/EditParent";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [toggle, setToggle] = useState(true);

  const history = useHistory();

  if (!currentUser) {
    if (window.location.pathname !== "/") {
      history.push("/");
    }

    if (toggle) {
      return <Login setToggle={setToggle} toggle={toggle} onLogin={setCurrentUser} />;
    } else {
      return <SignUp setToggle={setToggle} toggle={toggle} onLogin={setCurrentUser} />;
    }
  }

  function timeDifference(current, previous) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return (
        "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
      );
    } else {
      return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }

  return (
    <div className="App">
      <Header onLogin={setCurrentUser} setToggle={setToggle} />
      <Switch>
        <Route
          exact
          path="/create"
          component={() => <Create currentUser={currentUser} />}
        />
        <Route
          exact
          path="/users/:user_id"
          component={() => <User currentUser={currentUser} />}
        />
        <Route
          exact
          path="/approaches/:approach_id/:step"
          component={() => <Approach currentUser={currentUser} />}
        />
        <Route
          exact
          path="/problems/:problem_id"
          component={() => <Problem currentUser={currentUser} />}
        />
        <Route
          exact
          path="/profile"
          component={() => <Profile currentUser={currentUser} />}
        />
        <Route
          exact
          path="/climbs"
          component={() => (
            <MyClimbs
              currentUser={currentUser}
              timeDifference={timeDifference}
            />
          )}
        />
        <Route
          exact
          path="/search/:type/:query"
          component={() => <Search currentUser={currentUser} />}
        />
        <Route
          exact
          path="/solve/:problem_id/:step"
          component={() => <SolveParent currentUser={currentUser} />}
        />
        <Route
          exact
          path="/edit/:approach_id/:step"
          component={() => <EditParent currentUser={currentUser} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
