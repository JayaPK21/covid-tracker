import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import DisplayData from "./DisplayData";
import TableData from './TableData';
import GraphData from './GraphData';

//import useDispatch and useSElector hooks from react-redux into the form
import { useDispatch, useSelector } from "react-redux";
import { setDataInfo } from "../state/datainfo";

function MainInfo() {
    
    const datainfo = useSelector(state => state.datainfo)
    const dispatch = useDispatch();

    const handleRegionChange = (event) => {
        const newRegion = event.target.value;
        console.log("Selected Region: " + newRegion);
        dispatch(setDataInfo({ ...datainfo, regionName: newRegion }))
    }

    const getData = async ( queries ) => {

        const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data';

        const { data, status, statusText } = await axios.get(endpoint, {
            params: queries,
            timeout: 10000
        });

        if ( status >= 400 )
            throw new Error(statusText);

        return data

    };  // getData
    
    
    const main = async () => {

        const
            AreaType = "region",
            AreaName = "South West";

        const
            filters = [
                `areaType=${ AreaType }`,
                `areaName=${ AreaName }`
            ],
            structure = {
                date: "date",
                name: "areaName",
                "dailyCases": "newCasesByPublishDate",
                "cumulativeCases": "cumCasesByPublishDate"
            };

        const
            apiParams = {
                filters: filters.join(";"),
                structure: JSON.stringify(structure),
            };

        const result = await getData(apiParams);

        const first30Records = result.data.slice(0, 30);
        console.log(first30Records);

        dispatch(setDataInfo({ ...datainfo, data: first30Records }))

    };  // main
    
    const handleData = () => {
        main().catch(err => {
            console.error(err);
            process.exitCode = 1;
        });
    };
    return(
        <Router>
            <div className="d-flex">
                <div className="card w-25 mx-3">
                    <div className="card-body">
                        <h5 className="card-title">Covid-19 Cases</h5>
                        <p className="card-text">Welcome to this page where you can know how cases of Covid-19 have been changing over time in a region in UK.</p>
                        <p>Please select your region from the list below:</p>
                        <select 
                            id="selectRegion"
                            className="form-select my-4" 
                            aria-label="Default select example"
                            value={datainfo.regionName}
                            onChange={(event) => handleRegionChange(event)}
                            >
                            <option defaultValue="">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>

                        <NavLink to="chart">
                            <button type="button" onClick={handleData} className="btn btn-light">
                                Get Data
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className="w-75 mx-4">
                    {datainfo.data ? <DisplayData /> : <></>}
                    <Routes>
                        <Route path="covid-tracker" element={<></>} />
                        <Route path="chart" element={<GraphData />} />
                        <Route path="table" element={<TableData />} />
                    </Routes>
                </div>
            </div>
            
        </Router>
    );
};

export default MainInfo;