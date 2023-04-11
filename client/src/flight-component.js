import React, { useState } from "react";
import axios from 'axios';

function FlightComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [userNameInput, setUserNameInput] = useState("");
  const [flightNumInput, setFlightNumInput] = useState("");
  const [updateAirlineID, setUpdateAirlineID] = useState("");
  const [updateFlightID, setUpdateFlightID] = useState("");
  const [searchUpdate, setSearchUpdate] = useState("");
  const [complexSearch1, setComplexSearch1] = useState("");
  const [complexSearch2, setComplexSearch2] = useState("");
  //fetch()
  //fetch(`/`).then((response) => response.json());
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
axios.baseURL="http://localhost:1030";
// axios.portNumber
axios.get('/')
    .then(res => {
        console.log(res.data)
  }).catch(err => console.error(err))
  const handleTab1Submit = () => {
    // handle submit logic here
    setUserNameInput(userNameInput);
  };

  const handleTab2Submit = () => {
    // handle submit logic here
    setFlightNumInput(flightNumInput);
  };

  const handleTab3Submit = () => {
    // handle submit logic here
    setUpdateAirlineID(updateAirlineID);
    setUpdateFlightID(updateFlightID);
  };

  const handleTab4Submit = () => {
    // handle submit logic here
    setSearchUpdate(searchUpdate);
  };

  const handleTab5Submit = () => {
    // handle submit logic here
    setComplexSearch1(complexSearch1);
  };

  const handleTab6Submit = () => {
    // handle submit logic here
    setComplexSearch2(complexSearch2);
  };

  const renderTabs = () => {
    const tabs = [];
    const values = ["Insert", "Delete", "Update", "Search", "N Airports", "Flights Departing and Arriving"];
    for (let i = 0; i < 6; i++) {
      tabs.push(
        <div key={i} className="tab">
          <button onClick={() => handleTabClick(i)}>{values[i]}</button>
        </div>
      );
    }
    return tabs;
  };

  const renderPage = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            <h2>User Login</h2>
            <input
              type="text"
              placeholder="Enter username"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
            />
            <button onClick={handleTab1Submit}>Enter</button>
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Delete Flight with Flight Number</h2>
            <input
              type="text"
              placeholder="Enter Flight Number"
              value={flightNumInput}
              onChange={(e) => setFlightNumInput(e.target.value)}
            />
            <button onClick={handleTab2Submit}>Button</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Update All flights with Airline ID with Flight ID</h2>
            <input
              type="text"
              placeholder="Enter Airline ID"
              value={updateAirlineID}
              onChange={(e) => setUpdateAirlineID(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Flight ID to change"
              value={updateFlightID}
              onChange={(e) => setUpdateFlightID(e.target.value)}
            />
            <button onClick={handleTab3Submit}>Button</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Search flight from Airport
            </h2>
            <input type="search-Airport"
              onChange={(e) => setSearchUpdate(e.target.value)} placeholder="Enter Airport ID" />
            <button onClick={handleTab4Submit}>Button</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>How many cities have more than N Airports?
            </h2>
            <input type="complex1-N"
              onChange={(e) => setComplexSearch1(e.target.value)}placeholder="Enter Number of Airports" />
            <button onClick={handleTab5Submit}>Button</button>
          </div>
        );
        case 5:
        return (
          <div>
            <h2> What flights are coming to and from your Airport?</h2>
            <input type="complex2-N"
              onChange={(e) => setComplexSearch2(e.target.value)}placeholder="Enter Airport Name" />
            <button onClick={handleTab6Submit}>Button</button>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <h1>Flight Information</h1>
      <div>{renderTabs()}</div>
      <div>{renderPage()}</div>
    </div>
  );
}
export default FlightComponent;