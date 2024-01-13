//import logo from './logo.svg';
import './App.css';
import MainInfo from './components/MainInfo';

function App() {
  return (
    <div className="App p-4">
      <header className="text-white d-flex flex-column pt-3 pb-5">
        <h1 className="fs-1">Covid Tracker</h1>
        <p className="fs-6 fst-italic font-cursive">By Region</p>
        
        {/* <button type="button" onClick={handleData} className="btn btn-light">Get Data</button> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <MainInfo />
    </div>
  );
}

export default App;
