import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "./Layout";
import { Button } from "@material-ui/core";
import { Dropdown, Input } from "semantic-ui-react";

const Create = ({ currentUser }) => {
  let initialLayout = [];

  for (let row = 0; row < 16; row++) {
    initialLayout.push([]);
    for (let col = 0; col < 20; col++) {
      initialLayout[row].push({
        id: row * 20 + col + 1,
        isEmpty: true,
        placementType: null,
        startFinish: null,
      });
    }
  }
  const [layout, setLayout] = useState(initialLayout);
  const [problemInfo, setProblemInfo] = useState({
    name: "",
    gym: "",
    difficulty: "Intro",
  });
  const [holdType, setHoldType] = useState("#D65456");
  const [problemErrors, setProblemErrors] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);
  const [selectedWall, setSelectedWall] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetch("/gyms/all")
      .then((res) => res.json())
      .then((data) => setGyms(data));
  }, []);

  let gymOptions = [];
  let wallOptions = [];

  if (gyms.length > 0) {
    gymOptions = gyms.map((gym, index) => {
      return {
        key: gym.name,
        text: gym.name,
        value: index,
        icon: "map marker alternate",
        // image: { avatar: true, src: gym.img_url }
      };
    });
  }

  if (selectedGym !== null) {
    wallOptions = gyms[selectedGym].walls.map((wall) => {
      return {
        key: wall.id,
        text: wall.name,
        value: wall.id,
        icon: "stop",
        // image: { avatar: true, src: wall.img_url }
      };
    });
  }

  const clickTile = (
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

      newLayout[row][col].startFinish = layout[row][col].startFinish
        ? null
        : holdType;
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

  const dragOverTile = (row, col, layout, setLayout, isHold) => {
    let newLayout = [...layout];

    if (holdType === "#FF00FF" || holdType === "cyan") {
      newLayout[row][col].startFinish = !isHold ? null : holdType;
      // if (e.target.className === "tile") {
      //   isHold
      //     ? (e.target.style.border = `4px solid ${holdType}`)
      //     : (e.target.style.border = "1px solid black");
      // } else {
      //   layout[row][col].startFinish
      //     ? (e.target.parentElement.style.border = `4px solid ${holdType}`)
      //     : (e.target.parentElement.style.border = "1px solid black");
      // }
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
      <br />
      <form
        className="problem-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (selectedWall === null) {
            setProblemErrors(["A wall must be selected."]);
            return;
          }

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
              wall_id: selectedWall,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.errors) {
                history.push("/climbs");
              } else {
                setProblemErrors(data.errors);
              }
            });
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            className="form-control"
            value={problemInfo.name}
            id="name"
            placeholder="Enter problem name..."
            fluid
            onChange={e => handleChangeInput(e)}
          />
          <br/>
        </div>
        <div className="form-group">
          <label htmlFor="gym">Gym</label>
          <Dropdown
            id="gym"
            placeholder="Select Gym"
            fluid
            search
            selection
            options={gymOptions}
            onChange={(e, { value }) => {
              setSelectedGym(value);
              setSelectedWall(null);
            }}
          />
          <br/>
        </div>
        <div className="form-group">
          <label htmlFor="wall">Wall</label>
          <Dropdown
            id="wall"
            placeholder="Select Wall"
            fluid
            search
            selection
            options={wallOptions}
            onChange={(e, { value }) => setSelectedWall(value)}
          />
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          &nbsp; &nbsp;
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
        <br />
        <Layout
          layout={layout}
          setLayout={setLayout}
          initialLayout={initialLayout}
          clickTile={clickTile}
          dragOverTile={dragOverTile}
        />
        <br/>
        <div className="holds-group">
          <h3>Select a hold type:</h3>
          <div>
            <input
              type="radio"
              value="#FF00FF"
              checked={holdType === "#FF00FF"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#FF00FF" }} htmlFor="#FF00FF">
            &nbsp;&nbsp;Start
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="#D65456"
              checked={holdType === "#D65456"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#D65456" }} htmlFor="#D65456">
            &nbsp;&nbsp;Jug
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="#f28500"
              checked={holdType === "#f28500"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#f28500" }} htmlFor="#f28500">
            &nbsp;&nbsp;Sloper
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="#FAD261"
              checked={holdType === "#FAD261"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#FAD261" }} htmlFor="#FAD261">
            &nbsp;&nbsp;Pocket
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="#519F61"
              checked={holdType === "#519F61"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#519F61" }} htmlFor="#519F61">
            &nbsp;&nbsp;Pinch
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="#349AF1"
              checked={holdType === "#349AF1"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#349AF1" }} htmlFor="#349AF1">
            &nbsp;&nbsp;Crimp
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="#6f2da8"
              checked={holdType === "#6f2da8"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "#6f2da8" }} htmlFor="#6f2da8">
            &nbsp;&nbsp;Volume
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="cyan"
              checked={holdType === "cyan"}
              onChange={handleRadioChange}
              className="hold-form"
            />
            <label style={{ color: "cyan" }} htmlFor="cyan">
            &nbsp;&nbsp;Finish
            </label>
          </div>
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            let newLayout = [...layout];
            newLayout.push([]);
            for (let col = 0; col < 16; col++) {
              newLayout[newLayout.length - 1].push({
                id: (newLayout.length - 1) * 16 + col + 1,
                isEmpty: true,
                placementType: null,
                startFinish: false,
              });
            }
            setLayout(newLayout);
          }}
        >
          Add Row
        </Button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button
          onClick={() => setLayout(initialLayout)}
          color="primary"
          variant="contained"
        >
          Clear
        </Button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Button type="submit" color="primary" variant="contained">
          Create Problem
        </Button>
      </form>
      <br/>
      {problemErrors.map((problemError) => (
        <p className="error-message" key={problemError}>
          {problemError}
        </p>
      ))}
    </div>
  );
};

export default Create;
