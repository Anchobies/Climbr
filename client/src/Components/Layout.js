import React, { useState } from 'react';

const Layout = ({ initialLayout, clickTile }) => {
    const [layout, setLayout] = useState(initialLayout);

    return (
        <div className="layout" onClick={clickTile}>
                    {
                        layout.map((row, i) => {
                            return (
                                row.map((col, j) => {
                                    return (
                                        <div className="tile" key={col.id}>
                                            <p>{col.isEmpty ? 'Empty' : 'Tile ' + col.id}</p>
                                        </div>
                                    )
                                })
                            )
                        })
    }
                </div>
    )
}

export default Layout
