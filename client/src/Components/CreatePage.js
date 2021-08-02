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
  
    const handleNewHive = e => {
        e.preventDefault()
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
