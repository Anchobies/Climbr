import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

const style = {
    background: '#FE3B8B',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 38,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
 };

const CreatePage = () => {
    const [newHive, setNewHive] = useState("");
    const [newBees, setNewBees] = useState([]);
    const [numOfBees, setNumOfBees] = useState(3);
    const [hiveErrors, setHiveErrors] = useState([]);
  
    const history = useHistory();

    const handleHive = e => setNewHive(e.target.value);
    const handleBees = (e, index) => {
        const newBeesCopy = [...newBees];
        newBeesCopy[index] = e.target.value;
        setNewBees(newBeesCopy);
    };

    const handleNewHive = e => {
        e.preventDefault()

        fetch("/hives", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(
                {
                    hive: {
                        name: newHive,
                        bees: newBees,
                        queen_bee_id: 1
                    }
                }
            )
        })
        .then(res => res.json())    
        .then(data => {
            if (!data.errors) {
                history.push("/climbs");
            } else {
                setProblemErrors(data.errors);
            }
        })
    };

    const addAnotherBee = () => {
        setNumOfBees(numOfBees + 1)
    };

    const moreBees = [];
    for (let i = 3; i < numOfBees; i++) {
        const beeName = "bee" + (i + 1)
        moreBees.push(
            <li key={beeName}>
                <label htmlFor="bee1">Bee {i + 1}:</label> &nbsp;
                <input
                className="searchInput"
                value={newBees[i] ? newBees[i] : ""}
                onChange={e => handleBees(e, i)}
                name="bee1"
                type="text"
                placeholder="Enter username ..."
                />
                <br />
                <br />
            </li>
        )
    };

    return (
        <div className="pageDiv">
            <form onSubmit={handleNewHive}>
            <br />
            <div id="hiveName">
                <label htmlFor="name">Hive name:</label> &nbsp;
                <input
                className="searchInput"
                value={newHive}
                onChange={handleHive}
                name="name"
                type="text"
                placeholder="Enter hive name ..."
                />
            </div>
            <br />
            <br />
            <label>Add bees:</label>
            <ul>
                <li>
                    <label htmlFor="bee1">Bee 1:</label> &nbsp;
                    <input
                    className="searchInput"
                    value={newBees[0] ? newBees[0] : ""}
                    onChange={e => handleBees(e, 0)}
                    name="bee1"
                    type="text"
                    placeholder="Enter username ..."
                    />
                    <br />
                    <br />
                </li>
                <li>
                    <label htmlFor="bee2">Bee 2:</label> &nbsp;
                    <input
                    className="searchInput"
                    value={newBees[1] ? newBees[1] : ""}
                    onChange={e => handleBees(e, 1)}
                    name="bee2"
                    type="text"
                    placeholder="Enter username ..."
                    />
                    <br />
                    <br />
                </li>
                <li>
                    <label htmlFor="bee3">Bee 3:</label> &nbsp;
                    <input
                    className="searchInput"
                    value={newBees[2] ? newBees[2] : ""}
                    onChange={e => handleBees(e, 2)}
                    name="bee3"
                    type="text"
                    placeholder="Enter username ..."
                    />
                    <br />
                    <br />
                </li>
                {moreBees}
            </ul>
            <p id="add-bee" onClick={e => {
                e.preventDefault();
                addAnotherBee(e)
                }}>+ Add another bee</p>
            <br />
            <Button style={style} type="submit" color="primary" variant="contained">
               Create
            </Button>
            <br />
         </form>
         {hiveErrors.map(hiveError => <p className="error-message" key={hiveError}>{hiveError}</p>)}
        </div>
    )
}

export default CreatePage;
