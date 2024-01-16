import React from "react"
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react"
import MainInfo from "../components/MainInfo"

import { store } from "../state/store"
import { Provider } from 'react-redux';

import axios from "axios";

jest.mock('../components/LineChart', () => {
    return () => <></>; // Mock the LineChart component to return an empty value for tests.
});

jest.mock("axios");

const dummyResult = {
    "length":446,
    "maxPageLimit":2500,
    "totalRecords":1714,
    "data":[
        {
            "date":"2021-04-20",
            "name":"South West",
            "dailyCases":100,
            "cumulativeCases":3839002
        }, 
            
        {
            "date":"2021-04-19",
            "name":"South West",
            "dailyCases":20,
            "cumulativeCases":3838992
        },
    
        {
            "date":"2021-04-18",
            "name":"South West",
            "dailyCases":0,
            "cumulativeCases":3838972
        },
    
        {
            "date":"2021-04-17",
            "name":"South West",
            "dailyCases":20,
            "cumulativeCases":3838972
        }
    ],
    
    "requestPayload":{}
    };
    

describe('Tests to check the region selection', () => { 
    it('The value of region selection changes', () => {
        render(<Provider store={store}><MainInfo /></Provider>);

        const regionSelection = screen.getByTestId("regionSelection");

        fireEvent.change(regionSelection, { target: { value: 'Wales' } });
        expect(regionSelection).toHaveValue('Wales');
    });

    it('Get Data button renders when a region is selected', () => {
        render(<Provider store={store}><MainInfo /></Provider>);

        const regionSelection = screen.getByTestId("regionSelection");

        fireEvent.change(regionSelection, { target: { value: 'North West' } });
        
        expect(screen.queryByTestId("getData")).toBeInTheDocument();
        

    });

    it('Get Data button does not render when a region is not selected', () => {
        render(<Provider store={store}><MainInfo /></Provider>);

        const regionSelection = screen.getByTestId("regionSelection");

        fireEvent.change(regionSelection, { target: { value: '' } });
        
        expect(screen.queryByTestId('getData')).not.toBeInTheDocument()

    });
});


describe('API Tests', () => {
    it('The data is displayed when the API returns data', async () => {
        
        render(<Provider store={store}><MainInfo /></Provider>);
        const regionSelection = screen.getByTestId("regionSelection");
        fireEvent.change(regionSelection, { target: { value: 'South West' } });

        axios.get.mockResolvedValue({"data": dummyResult});

        act(() => {
            fireEvent.click(screen.getByTestId('getData'));
        });
        
        const dataDisplayed = await waitFor(() => screen.getByTestId("dataPageTabs"));
        expect(dataDisplayed).toBeInTheDocument();
    });

    it('An alternative text is displayed when no data is returned for region', async () => {
        
        render(<Provider store={store}><MainInfo /></Provider>);
        const regionSelection = screen.getByTestId("regionSelection");
        fireEvent.change(regionSelection, { target: { value: 'Wales' } });

        axios.get.mockResolvedValue({}); //Mock value represents empty response for the region.

        act(() => {
            fireEvent.click(screen.getByTestId('getData'));
        });
        
        const noDataDisplayed = await waitFor(() => screen.getByText("There is no data available for this region."));
        expect(noDataDisplayed).toBeInTheDocument();
    });

    it('Checks if the correct number of rows is displayed in the data table', async () => {
        
        render(<Provider store={store}><MainInfo /></Provider>);
        const regionSelection = screen.getByTestId("regionSelection");
        fireEvent.change(regionSelection, { target: { value: 'South West' } });

        axios.get.mockResolvedValue({"data": dummyResult});

        act(() => {
            fireEvent.click(screen.getByTestId('getData'));
        });

        const tableDisplayed = await waitFor(() => screen.getByText("Table"));
        fireEvent.click(tableDisplayed);
        
        const dataTableRows = await waitFor(() => screen.getAllByTestId("rowData"));
        expect(dataTableRows).toHaveLength(4);
    });

});