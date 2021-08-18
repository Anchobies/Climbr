import React from "react";

const Layout = ({ layout, setLayout, clickTile, holdStyle, dragOverTile }) => {

  return (
    <div className="layout">
      {layout && setLayout && clickTile && holdStyle && dragOverTile ? layout.map((row, i) => {
        return row.map((col, j) => {
          holdStyle(i, j, layout, setLayout)
          return (
            <div
              className="tile"
              key={col.id}
              onMouseDown={() => clickTile(i, j, layout, setLayout)}
              onDragOver={() => dragOverTile(i, j, layout, setLayout)}
            >
              {col.isEmpty ? null : <div className="hold" style={col.myStyle}/>}
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
            >
              {col.isEmpty ? null : <div className="hold" style={col.myStyle}/>}
            </div>
          );
        });
      })
      }
    </div>
  );
};

export default Layout;
