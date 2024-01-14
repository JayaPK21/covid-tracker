import React from "react";

import { useSelector } from 'react-redux';

function TableData() {
    //useSelectors for accessing data from the redux store
    const datainfo = useSelector(state => state.datainfo);

    console.log("Information from Table Data component:");
    console.log(datainfo.regionName);

    return(
        <>
            <p className=" text-white">This tab displays Table</p>
            <p className=" text-white">{JSON.stringify(datainfo.data)}</p>
        </>
    );
};

export default TableData;