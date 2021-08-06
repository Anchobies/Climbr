import React, { useState } from 'react'
import { Button } from "@material-ui/core"
// import HiveFive1 from '../HiveFive1.png'
// import HiveFive2 from '../HiveFive2.png'
import HiveFive3 from '../HiveFive3.png'

const style = {
    background: '#ffda5b',
    borderRadius: 3,
    border: "0",
    color: 'black',
    height: 48,
    padding: '0 30px',
};

// random comment

const style2 = {
    background: 'linear-gradient(45deg, #FE3B8B 10%, #Ff6E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

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
        <div className="loginPage">
            <img src={HiveFive3} className="loginLogo" alt="logo"/>
            <p className="loginDescription">A safe space to build each <br /> other up anonymously.</p>
            <div className="loginForm">
                <form onSubmit={handleLogin} >
                    <br />
                    <label>
                        <input onChange={handleCred} name="username" value={cred.username} type="text" className="loginInput" placeholder="Username" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <input onChange={handleCred} name="password" value={cred.password} type="password" className="loginInput" placeholder="Password" />
                    </label>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button style={style} type="submit" color="secondary" variant="contained" className="loginButton1">Log In</Button>
                    <br />
                </form>
                {loginErrors.map(loginError => <p className="error-message" key={loginError}>{loginError}</p>)}
                <Button style={style2} onClick={() => setToggle(!toggle)} type="submit" color="primary" variant="contained" className="loginButton2">
                    Create New Account{" "}
                </Button>
            </div>
        </div>
    )
}

export default LoginPage;