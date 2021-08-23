import React, { useState } from "react";

const Layout = ({
  layout,
  setLayout,
  clickTile,
  dragOverTile,
  solution,
  setSolution,
}) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [isHold, setIsHold] = useState(false);

  const holdStyle = (row, col, layout, solution = null, isEmpty) => {
    let topLeft = "50%";
    let topRight = "50%";
    let bottomRight = "50%";
    let bottomLeft = "50%";

    if (
      layout[row - 1] &&
      !layout[row - 1][col].isEmpty &&
      layout[row][col].holdType === layout[row - 1][col].holdType
    ) {
      topLeft = "0";
      topRight = "0";
    }
    if (
      layout[row + 1] &&
      !layout[row + 1][col].isEmpty &&
      layout[row][col].holdType === layout[row + 1][col].holdType
    ) {
      bottomLeft = "0";
      bottomRight = "0";
    }
    if (
      layout[row][col - 1] &&
      !layout[row][col - 1].isEmpty &&
      layout[row][col].holdType === layout[row][col - 1].holdType
    ) {
      topLeft = "0";
      bottomLeft = "0";
    }
    if (
      layout[row][col + 1] &&
      !layout[row][col + 1].isEmpty &&
      layout[row][col].holdType === layout[row][col + 1].holdType
    ) {
      topRight = "0";
      bottomRight = "0";
    }

    let myStyle = {
      background: layout[row][col].holdType,
      borderRadius:
        topLeft + " " + topRight + " " + bottomRight + " " + bottomLeft
    };

    let placement = "";

    if (solution) {
      const handFeet = ["lh", "rh", "lf", "rf"];

      for (let i = 0; i < solution.length; i++) {
        if (
          solution[i][0] &&
          row === solution[i][0] &&
          col === solution[i][1]
        ) {
          placement += handFeet[i];
        }
      }
    }

    if (isEmpty) {
      return (
        <div className="hold" style={{ background: "white" }}>
          {solution ? <p className="tileText">{placement}</p> : null}
        </div>
      );
    } else {
      return (
        <div className="hold" style={myStyle}>
          {solution ? <p className="tileText">{placement}</p> : null}
        </div>
      );
    }
  };

  return (
    <div className="layout">
      {layout && setLayout && clickTile && dragOverTile
        ? layout.map((row, i) => {
            return row.map((col, j) => {
              return (
                <div
                  className="tile"
                  key={col.id}
                  onMouseDown={(e) =>
                    clickTile(
                      e,
                      i,
                      j,
                      layout,
                      setLayout,
                      mouseDown,
                      setMouseDown,
                      setIsHold
                    )
                  }
                  onMouseUp={() => setMouseDown(!mouseDown)}
                  onMouseEnter={(e) =>
                    mouseDown
                      ? dragOverTile(e, i, j, layout, setLayout, isHold)
                      : null
                  }
                >
                  {holdStyle(i, j, layout, col.isEmpty)}
                </div>
              );
            });
          })
        : layout.map((row, i) => {
            return row.map((col, j) => {
              return (
                <div
                  className="tile"
                  key={col.id}
                  onMouseDown={(e) =>
                    clickTile ? clickTile(e, i, j, solution, setSolution) : null
                  }
                >
                  {holdStyle(i, j, layout, solution, col.isEmpty)}
                </div>
              );
            });
          })}
    </div>
  );
};

export default Layout;
