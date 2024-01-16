import React from "react"
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react"
import MainInfo from "../components/MainInfo"

import { store } from "../state/store"
import { Provider } from 'react-redux';

import axios from "axios";

// Mock the ResizeObserver
// jest.mock('resize-observer', () => ({
//     __esModule: true,
//     default: jest.fn().mockImplementation(() => ({
//       observe: jest.fn(),
//       unobserve: jest.fn(),
//       disconnect: jest.fn(),
//     })),
// }));


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
    it('First Test', async () => {
    //     jest.mock('../components/GraphData', () => {
    //         return () => null; // Mock the component to return null
    //       });
        
        render(<Provider store={store}><MainInfo /></Provider>);
        const regionSelection = screen.getByTestId("regionSelection");
        fireEvent.change(regionSelection, { target: { value: 'North West' } });

        axios.get.mockResolvedValue({"data": dummyResult});

        act(() => {
            fireEvent.click(screen.getByTestId('getData'));
        });
        
        const dataDisplayed = await waitFor(() => screen.getByTestId("dataPageTabs"));
        expect(dataDisplayed).toBeInTheDocument();
    });

});