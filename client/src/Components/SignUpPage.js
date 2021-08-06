import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import HiveFive3 from '../HiveFive3.png'

const style = {
    background: '#ffda5b',
    borderRadius: 3,
    border: "0",
    color: 'black',
    height: 48,
    padding: '0 30px',
};

const style2 = {
    background: 'linear-gradient(45deg, #FE3B8B 10%, #Ff6E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

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
        <div className="loginPage">
            <img src={HiveFive3} className="loginLogo" alt="logo"/>
            <p className="loginDescription">A safe space to build each <br /> other up anonymously.</p>
            <div className="signUpForm">
                <form onSubmit={handleSubmitUser} >
                    <br />
                    <label>
                        <input onChange={handleNewUser} name="email" value={newUser.email} type="email" className="signUpInput" placeholder="Mobile Number or Email" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <input onChange={handleNewUser} name="username" value={newUser.username} type="text" className="signUpInput" placeholder="Username" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <input onChange={handleNewUser} name="first_name" value={newUser["first_name"]} type="text" className="signUpInput4" placeholder="First Name" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <input onChange={handleNewUser} name="last_name" value={newUser["last_name"]} type="text" className="signUpInput2" placeholder="Last Name" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <input onChange={handleNewUser} name="password" value={newUser.password} type="password" className="signUpInput3" placeholder="Password" />
                    </label>
                    {/* <label>
                        <input type="password" placeholder="Confirm Password" />
                    </label> */}
                    <br />
                    <br />
                    <Button style={style} type="submit" color="secondary" variant="contained" className="signUpButton1">Sign Up</Button>
                    <br />
                    <br />
                </form>
                {userErrors.map(userError => <p className="error-message" key={userError}>{userError}</p>)}
                <Button style={style2} onClick={() => setToggle(!toggle)} type="submit" color="primary" variant="contained" className="signUpButton2">
                    Log In{" "}
                </Button>
            </div>
        </div>
    )
}

export default SignUpPage;