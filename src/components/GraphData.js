import React from "react";
import LineChart from "./LineChart";

import { useSelector } from 'react-redux';

function GraphData() {
    //useSelectors for accessing data from the redux store
    const datainfo = useSelector(state => state.datainfo);

    return(
        <div className="p-2 px-5">
            <h5 className=" text-white">The following graph represents daily cases of Covid-19 over a one month period for {datainfo.data[0].name} region.</h5>
            <LineChart />
        </div>
    );
};

export default GraphData;