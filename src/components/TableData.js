import React from "react";
import { format } from 'date-fns';

import { useSelector } from 'react-redux';

function TableData() {
    //useSelectors for accessing data from the redux store
    const datainfo = useSelector(state => state.datainfo);

    console.log("Information from Table Data component:");
    console.log(datainfo.regionName);

    const formatDate = (dateString) => {
        const parsedDate = new Date(dateString);
        return format(parsedDate, 'dd-MM-yyyy');
    };

    return(
        <>
            <div className="p-2 px-5">
                <h5 className="text-white">Following table lists the daily cases of Covid-19 registered over a period of one month in the {datainfo.data[0].name} region of UK.</h5>
                <p className="text-white">Records with more than 100 daily cases are highlighted.</p>
                <table className="table m-4 table-info table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Region</th>
                            <th scope="col">Daily Cases</th>
                            <th scope="col">Cumulative Cases</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            datainfo.data.map((record, index) => {
                                if(record.dailyCases >= 100){
                                    return (
                                        <tr key={index} className="table-warning" >
                                            <th scope="row">{formatDate(record.date)}</th>
                                            <td>{record.name}</td>
                                            <td>{record.dailyCases}</td>
                                            <td>{record.cumulativeCases}</td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={index} >
                                            <th scope="row">{formatDate(record.date)}</th>
                                            <td>{record.name}</td>
                                            <td>{record.dailyCases}</td>
                                            <td>{record.cumulativeCases}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </>
    );
};

export default TableData;