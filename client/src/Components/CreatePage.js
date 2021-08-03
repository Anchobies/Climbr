import React, { useState } from 'react'
import { Button } from "@material-ui/core"

const CreatePage = () => {
    const [newHive, setNewHive] = useState("");
    const [newBees, setNewBees] = useState([]);
    const [numOfBees, setNumOfBees] = useState(3);
  
    const handleHive = e => setNewHive(e.target.value);
    const handleBees = (e, index) => {
        const newBeesCopy = [...newBees];
        newBeesCopy[index] = e.target.value;
        setNewBees(newBeesCopy);
    };
  
    const handleError = response => {
        if (!response.ok) { 
           throw Error(response.statusText);
        }
     };

    const handleNewHive = e => {
        e.preventDefault()

        fetch("http://localhost:3000/hives", {
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
        .then(handleError)
        .then(res => res.json()) 
        .then(data => console.log("Does something with data"))
        .catch(console.log);
    };

    const addAnotherBee = () => {
        setNumOfBees(numOfBees + 1)
    };

    const moreBees = [];
    for (let i = 3; i < numOfBees; i++) {
        const beeName = "bee" + (i + 1)
        moreBees.push(
            <li key={beeName}>
                <label htmlFor="bee1">Bee {i + 1}:</label>
                <input
                value={newBees[i] ? newBees[i] : ""}
                onChange={e => handleBees(e, i)}
                name="bee1"
                type="text"
                placeholder="Enter username ..."
                />
                <br />
            </li>
        )
    };

    return (
        <div>
            <header>Create a Hive</header>
            <form onSubmit={handleNewHive}>
            <br />
            <label htmlFor="name">Hive name:</label>
            <input
               value={newHive}
               onChange={handleHive}
               name="name"
               type="text"
               placeholder="Enter hive name ..."
            />
            <br />
            <label>Add bees:</label>
            <ul>
                <li>
                    <label htmlFor="bee1">Bee 1:</label>
                    <input
                    value={newBees[0] ? newBees[0] : ""}
                    onChange={e => handleBees(e, 0)}
                    name="bee1"
                    type="text"
                    placeholder="Enter username ..."
                    />
                    <br />
                </li>
                <li>
                    <label htmlFor="bee2">Bee 2:</label>
                    <input
                        value={newBees[1] ? newBees[1] : ""}
                    onChange={e => handleBees(e, 1)}
                    name="bee2"
                    type="text"
                    placeholder="Enter username ..."
                    />
                    <br />
                </li>
                <li>
                    <label htmlFor="bee3">Bee 3:</label>
                    <input
                        value={newBees[2] ? newBees[2] : ""}
                    onChange={e => handleBees(e, 2)}
                    name="bee3"
                    type="text"
                    placeholder="Enter username ..."
                    />
                    <br />
                </li>
                {moreBees}
            </ul>
            <button id="add-bee" onClick={addAnotherBee}>+ Add another bee</button>
            <br />
            <Button type="submit" color="primary" variant="contained">
               Create
            </Button>
            <br />
         </form>
        </div>
    )
}

export default CreatePage;
