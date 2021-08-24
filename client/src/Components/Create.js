import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Button } from "@material-ui/core";

const Create = ({ currentUser }) => {
  let initialLayout = [];

  for (let row = 0; row < 12; row++) {
    initialLayout.push([]);
    for (let col = 0; col < 16; col++) {
      initialLayout[row].push({
        id: row * 16 + col,
        isEmpty: true,
        placementType: null,
        startFinish: false,
      });
    }
  }
  const [layout, setLayout] = useState(initialLayout);
  const [problemInfo, setProblemInfo] = useState({
    name: "",
    gym: "",
    difficulty: "Intro",
  });
  const [holdType, setHoldType] = useState("red");
  const [problemErrors, setProblemErrors] = useState([]);
  const [hasStartFinish, setHasStartFinish] = useState(false);

  const history = useHistory();

  const clickTile = (
    e,
    row,
    col,
    layout,
    setLayout,
    mouseDown,
    setMouseDown,
    setIsHold
  ) => {
    let newLayout = [...layout];

    if (holdType === "#FF00FF" || holdType === "cyan") {
      setIsHold(!layout[row][col].startFinish);

      newLayout[row][col].startFinish = !newLayout[row][col].startFinish;
      if (e.target.className === "tile") {
        layout[row][col].startFinish
          ? (e.target.style.border = `4px solid ${holdType}`)
          : (e.target.style.border = "1px solid black");
      } else {
        layout[row][col].startFinish
          ? (e.target.parentElement.style.border = `4px solid ${holdType}`)
          : (e.target.parentElement.style.border = "1px solid black");
      }
    } else {
      setIsHold(!layout[row][col].isEmpty);

      newLayout[row][col].isEmpty = !newLayout[row][col].isEmpty;
      !layout[row][col].isEmpty
        ? (newLayout[row][col].holdType = holdType)
        : (newLayout[row][col].holdType = "white");
    }

    setLayout(newLayout);
    setMouseDown(!mouseDown);
  };

  const dragOverTile = (e, row, col, layout, setLayout, isHold) => {
    let newLayout = [...layout];

    if (holdType === "#FF00FF" || holdType === "cyan") {
      newLayout[row][col].startFinish = isHold;
      if (e.target.className === "tile") {
        layout[row][col].startFinish
          ? (e.target.style.border = `4px solid ${holdType}`)
          : (e.target.style.border = "1px solid black");
      } else {
        layout[row][col].startFinish
          ? (e.target.parentElement.style.border = `4px solid ${holdType}`)
          : (e.target.parentElement.style.border = "1px solid black");
      }
    } else {
      newLayout[row][col].isEmpty = isHold;
      !layout[row][col].isEmpty
        ? (newLayout[row][col].holdType = holdType)
        : (newLayout[row][col].holdType = "white");
    }

    setLayout(newLayout);
  };

  const handleRadioChange = (e) => {
    setHoldType(e.target.value);
  };

  const handleChangeInput = (e) => {
    let newProblemInfo = { ...problemInfo };
    newProblemInfo[e.target.id] = e.target.value;
    setProblemInfo(newProblemInfo);
  };

  return (
    <div className="pageDiv">
      <header>New Problem</header>
      <form
        className="problem-form"
        onSubmit={(e) => {
          e.preventDefault();

          fetch("/problems", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: problemInfo.name,
              // gym: problemInfo.gym,
              difficulty: problemInfo.difficulty,
              layout: layout,
              wall_id: 33,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.errors) {
                history.push("climbs");
              } else {
                setProblemErrors(data.errors);
              }
            });
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            value={problemInfo.name}
            onChange={handleChangeInput}
            id="name"
            placeholder="Enter problem name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="gym">Gym</label>
          <input
            className="form-control"
            id="gym"
            type="text"
            value={problemInfo.gym}
            onChange={handleChangeInput}
            placeholder="Enter gym name..."
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            value={problemInfo.difficulty}
            onChange={handleChangeInput}
            className="form-control"
            id="difficulty"
          >
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
        <Layout
          layout={layout}
          setLayout={setLayout}
          initialLayout={initialLayout}
          clickTile={clickTile}
          dragOverTile={dragOverTile}
        />
        <div className="form-group">
          <p>Select a hold type:</p>
          <div>
            <input
              type="radio"
              value="#FF00FF"
              checked={holdType === "#FF00FF"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label htmlFor="#FF00FF">Start</label>
          </div>
        </div>
        <div>
          <input
            type="radio"
            value="red"
            checked={holdType === "red"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="jug">Jug</label>
        </div>
        <div>
          <input
            type="radio"
            value="orange"
            checked={holdType === "orange"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="sloper">Sloper</label>
        </div>
        <div>
          <input
            type="radio"
            value="yellow"
            checked={holdType === "yellow"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="pocket">Pocket</label>
        </div>
        <div>
          <input
            type="radio"
            value="green"
            checked={holdType === "green"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="pinch">Pinch</label>
        </div>
        <div>
          <input
            type="radio"
            value="blue"
            checked={holdType === "blue"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="crimp">Crimp</label>
        </div>
        <div>
          <input
            type="radio"
            value="purple"
            checked={holdType === "purple"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="purple">Volume</label>
        </div>
        <div>
          <input
            type="radio"
            value="cyan"
            checked={holdType === "cyan"}
            onChange={handleRadioChange}
            className="hold-form"
          />
          <label htmlFor="cyan">Finish</label>
        </div>
        <div></div>
        <Button
          onClick={() => setLayout(initialLayout)}
          color="primary"
          variant="contained"
        >
          Clear
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Create Problem
        </Button>
      </form>
      {problemErrors.map((problemError) => (
        <p className="error-message" key={problemError}>
          {problemError}
        </p>
      ))}
    </div>
  );
};

export default Create;
