import React from 'react';
import Layout from './Layout';

const Create = ({ currentUser }) => {
    let initialLayout = [];

    for (let row = 0; row < 12; row++) {
        initialLayout.push([]);
        for (let col = 0; col < 12; col++) {
            initialLayout[row].push({id: row*12 + col, isEmpty: true});
        }
    }

    const clickTile = (e, row, col, layout, setLayout) => {
        let newLayout = [...layout];
        newLayout[row][col].isEmpty = !newLayout[row][col].isEmpty;
        setLayout(newLayout);
    }

    return (
        <div className="pageDiv">
            <header>New Problem</header>
            <form className="problem-form" onSubmit={(e) => { e.preventDefault() }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter problem name..." />
                </div>
                <div className="form-group">
                    <label htmlFor="gym">Gym</label>
                    <input className="form-control" id="gym" placeholder="Search gym..."></input>
                </div>
                <div className="form-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select className="form-control" id="difficulty">
                        <option value="Intro">Intro</option>
                        <option value="V0">V0</option>
                        <option value="V1">V1</option>
                        <option value="V2">V2</option>
                        <option value="V3">V3</option>
                        <option value="V4">V4</option>
                        <option value="V5">V5</option>
                        <option value="V6">V6</option>
                        <option value="V7">V7</option>
                        <option value="V8">V8</option>
                        <option value="V9">V9</option>
                        <option value="V10">V10</option>
                        <option value="Professional">Professional</option>
                    </select>
                </div>
                <Layout initialLayout={initialLayout} clickTile={clickTile}/>
                <div className="form-group">
                    <p>Select a hold type:</p>
                    <div>
                        <input type="radio" id="jug" name="holds" value="jug" className="form-control" />
                        <label htmlFor="jug">Jug</label>
                    </div>
                    <div>
                        <input type="radio" id="sloper" name="holds" value="sloper" className="form-control" />
                        <label htmlFor="sloper">Sloper</label>
                    </div>
                    <div>
                        <input type="radio" id="pocket" name="holds" value="pocket" className="form-control" />
                        <label htmlFor="pocket">Pocket</label>
                    </div>
                    <div>
                        <input type="radio" id="pinch" name="holds" value="pinch" className="form-control" />
                        <label htmlFor="pinch">Pinch</label>
                    </div>
                    <div>
                        <input type="radio" id="crimp" name="holds" value="crimp" className="form-control" />
                        <label htmlFor="crimp">Crimp</label>
                    </div>
                    <div>
                        <input type="radio" id="volume" name="holds" value="volume" className="form-control" />
                        <label htmlFor="volume">Volume</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Confirm Hold</button>
                <button type="submit" className="btn btn-primary">Save Draft</button>
                <button type="submit" className="btn btn-primary">Finish</button>
            </form>
        </div>
    )
}

export default Create
