import React, { useState } from 'react';

const Layout = ({ initialLayout, clickTile }) => {
    const [layout, setLayout] = useState(initialLayout);

    return (
        <div className="layout">
                    {
                        layout.map((row, i) => {
                            return (
                                row.map((col, j) => {
                                    return (
                                        <div className="tile" key={col.id} onClick={e => clickTile(e, i, j, layout, setLayout)}>
                                            {col.isEmpty ? null : <div className="hold" />}
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
