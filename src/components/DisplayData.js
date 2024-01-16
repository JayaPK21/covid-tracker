import React from "react";
import { NavLink } from 'react-router-dom';

function DisplayData() {
    return(
        <>
            <ul data-testid="dataPageTabs" className="nav nav-pills">
                <li className="nav-item">
                    <NavLink to="chart" className="nav-link" activeclassname="active">
                        Graph
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="table" className="nav-link">
                        Table
                    </NavLink>
                </li>
            </ul>    
        </>
    );
};

export default DisplayData;