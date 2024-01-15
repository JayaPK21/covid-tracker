import React from "react"; // Importing the React library

import Chart from "chart.js/auto"; // Importing the Chart.js library

import { Line } from "react-chartjs-2"; // Importing the Line component from the react-chartjs-2 library

import { useSelector } from 'react-redux';
import { format } from 'date-fns';

// Initializing the labels for the x-axis of the chart
const labels = [];

Chart.defaults.color = '#FFF';
Chart.defaults.backgroundColor = '#FFF';

// Setting up the data for the chart, including the labels and datasets
const dataChart = {
  labels: labels,
  datasets: [
    {
      label: "Daily Cases", // Setting up the label for the dataset
      borderColor: "rgb(255, 99, 132)", 
      data: [], // Initializing the data for the dataset
    },
  ],

  
};

// Defining the LineChart component
const LineChart = () => {

    //useSelectors for accessing data from the redux store
    const datainfo = useSelector(state => state.datainfo);

    // Gets the list of dates from the response data
    const datesList = datainfo.data.map(item => item.date);
    
    // The order of dates are reversed from earliest to latest
    const reversedDatesList = datesList.reverse();

    // Formats all the dates in the list
    const formattedDates = reversedDatesList.map(dateString => {
        const parsedDate = new Date(dateString);
        return format(parsedDate, 'dd-MM-yyyy');
    });

    // Assigns the dates to the labels
    dataChart.labels = formattedDates;
    dataChart.datasets[0].data = datainfo.data.map(item => item.dailyCases).reverse();

  return (
    <div>
      <Line data={dataChart} />
    </div>
  );
};

export default LineChart; // Exporting the LineChart component as the default export of the module

