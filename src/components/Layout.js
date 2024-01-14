import React from "react";
import "../App.css";
import MainInfo from "./MainInfo";

function Layout() {
    return(
        <div className="App p-4">
            <header className="text-white d-flex flex-column pt-3 pb-5">
                <h1 className="fs-1">Covid Tracker</h1>
                <p className="fs-6 fst-italic font-cursive">By Region</p>
            </header>
            <MainInfo />
        </div>
    );
};

export default Layout;
