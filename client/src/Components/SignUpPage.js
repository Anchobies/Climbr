import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

const SignUpPage = ({ setToggle, toggle, onLogin }) => {
    const initialUser = {
        email: "",
        password: "",
        username: "",
        first_name: "",
        last_name: ""        
    }

    const history = useHistory();

    const [newUser, setNewUser] = useState(initialUser);
    const [userErrors, setUserErrors] = useState([]);

    const handleSubmitUser = e => {
        e.preventDefault();
        
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(json => {
            if (!json.errors) {
                onLogin(json);
                history.push("/create");
            } else {
                setUserErrors(json.errors);
            }
        })
    };

    const handleNewUser = e => {
        const userCopy = { ...newUser };
        userCopy[e.target.name] = e.target.value;
        setNewUser(userCopy);
    };

    return (
        <div>
            <header>Sign Up</header>
            <form onSubmit={handleSubmitUser} >
                <br />
                <label>
                    <input onChange={handleNewUser} name="email" value={newUser.email} type="email" placeholder="Mobile Number or Email" />
                </label>
                <br />
                <label>
                    <input onChange={handleNewUser} name="first_name" value={newUser["first_name"]} type="text" placeholder="First Name" />
                </label>
                <br />
                <label>
                    <input onChange={handleNewUser} name="last_name" value={newUser["last_name"]} type="text" placeholder="Last Name" />
                </label>
                <br />
                <label>
                    <input onChange={handleNewUser} name="username" value={newUser.username} type="text" placeholder="Username" />
                </label>
                <br />
                <label>
                    <input onChange={handleNewUser} name="password" value={newUser.password} type="password" placeholder="Password" />
                </label>
                {/* <label>
                    <input type="password" placeholder="Confirm Password" />
                </label> */}
                <br />
                <br />
                <button>Sign Up</button>
                <br />
                <br />
            </form>
            {userErrors.map(userError => <p className="error-message" key={userError}>{userError}</p>)}
            <Button onClick={() => setToggle(!toggle)} type="submit" color="primary" variant="contained">
                Log In{" "}
            </Button>
        </div>
    )
}

export default SignUpPage;