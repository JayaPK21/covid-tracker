import React from "react";
import LineChart from "./LineChart";

function GraphData() {
    return(
        <div className="p-2 px-5">
            <p className=" text-white">The following graph represents daily cases of Covid-19 over a one month period.</p>
            <LineChart />
        </div>
    );
};

export default GraphData;