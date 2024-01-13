import React from "react";
import axios from 'axios';

function MainInfo() {
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
                code: "areaCode",
                "dailyCases": "newCasesByPublishDate",
                "cumulativeCases": "cumCasesByPublishDate",
                "changeInCases": "changeInNewCasesBySpecimenDate"
            };

        const
            apiParams = {
                filters: filters.join(";"),
                structure: JSON.stringify(structure),
            };

        const result = await getData(apiParams);

        console.log(JSON.stringify(result));

    };  // main
    
    const handleData = () => {
        main().catch(err => {
            console.error(err);
            process.exitCode = 1;
        });
    };
    return(
        <>
            <div class="card w-25">
                <div class="card-body">
                    <h5 class="card-title">Covid-19 Cases</h5>
                    <p class="card-text">Welcome to this page where you can know how cases of Covid-19 have been changing over time in a region in UK.</p>
                    <p>Please select your region from the list below:</p>
                    <button type="button" onClick={handleData} className="btn btn-light">Get Data</button>
                </div>
            </div>
        </>
    );
};

export default MainInfo;