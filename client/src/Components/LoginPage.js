import React, { useState } from 'react'
import { Button } from "@material-ui/core"

const LoginPage = ({ setToggle, toggle, onLogin }) => {
    const initialUser = {
        password: "",
        username: ""   
    }

    const [credentials, setCredentials] = useState(initialUser);
    const [loginErrors, setLoginErrors] = useState([]);

    const handleLogin = e => {
        e.preventDefault();
        
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        // .then(response => response.json())
        // .then(json => {
        //     if (!json.errors) {
        //         onLogin(json);
        //     } else {
        //         setLoginErrors(json.errors);
        //     }
        // })
    };

    const handleCredentials = e => {
        const credentialsCopy = { ...credentials };
        credentialsCopy[e.target.name] = e.target.value;
        setCredentials(credentialsCopy);
    };

    return (
        <div>
            <header>Log In</header>
            <form onSubmit={handleLogin} >
                <br />
                <label>
                    <input onChange={handleCredentials} name="username" value={credentials.username} type="text" placeholder="Username" />
                </label>
                <br />
                <label>
                    <input onChange={handleCredentials} name="password" value={credentials.password} type="password" placeholder="Password" />
                </label>
                <br />
                <br />
                <button>Log In</button>
                <br />
                <br />
            </form>
            {loginErrors.map(loginError => <p className="error-message" key={loginError}>{loginError}</p>)}
            <Button onClick={() => setToggle(!toggle)} type="submit" color="primary" variant="contained">
                Register{" "}
            </Button>
        </div>
    )
}

export default LoginPage;