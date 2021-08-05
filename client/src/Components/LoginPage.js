import React, { useState } from 'react'
import { Button } from "@material-ui/core"

const LoginPage = ({ setToggle, toggle, onLogin }) => {
    const initialUser = {
        password: "",
        username: ""   
    }

    const [cred, setCred] = useState(initialUser);
    const [loginErrors, setLoginErrors] = useState([]);

    const handleLogin = e => {
        e.preventDefault();
        
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(cred)
        })
        .then(response => response.json())
        .then(json => {
            if (!json.errors) {
                onLogin(json);
            } else {
                setLoginErrors(json.errors);
            }
        })
    };

    const handleCred = e => {
        const credCopy = { ...cred };
        credCopy[e.target.name] = e.target.value;
        setCred(credCopy);
    };

    return (
        <div>
            <header>Log In</header>
            <form onSubmit={handleLogin} >
                <br />
                <label>
                    <input onChange={handleCred} name="username" value={cred.username} type="text" placeholder="Username" />
                </label>
                <br />
                <label>
                    <input onChange={handleCred} name="password" value={cred.password} type="password" placeholder="Password" />
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