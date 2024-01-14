import React from "react";
import LineChart from "./LineChart";

function GraphData() {
    return(
        <div className="p-2 px-5">
            <p className=" text-white">This tab displays Graph</p>
            <LineChart />
        </div>
    );
};

export default GraphData;