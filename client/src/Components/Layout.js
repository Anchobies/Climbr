import React, { useState } from "react";

const Layout = ({ layout, setLayout, clickTile, dragOverTile }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [isHold, setIsHold] = useState(false);

  const holdStyle = (row, col, layout) => {
    if (layout[row][col].isEmpty) {
      return;
    }

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
        topLeft + " " + topRight + " " + bottomRight + " " + bottomLeft,
    };

    return <div className="hold" style={myStyle}></div>;
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
                  onMouseDown={() => clickTile(i, j, layout, setLayout, mouseDown, setMouseDown, setIsHold)}
                  onMouseUp={() => setMouseDown(!mouseDown)}
                  onMouseEnter={() => mouseDown ? dragOverTile(i, j, layout, setLayout, isHold) : null}
                >
                  {col.isEmpty ? null : holdStyle(i, j, layout)}
                </div>
              );
            });
          })
        : layout.map((row, i) => {
            return row.map((col, j) => {
              return (
                <div className="tile" key={col.id}>
                  {col.isEmpty ? null : holdStyle(i, j, layout)}
                </div>
              );
            });
          })}
    </div>
  );
};

export default Layout;
