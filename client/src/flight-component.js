
import React, { useState } from "react";
import axios from 'axios';
function FlightComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [userNameInput, setUserNameInput] = useState("");
  const [deleteUserName, setDeleteUserName] = useState("");
  const [updateAirlineID, setUpdateAirlineID] = useState("");
  const [updateFlightID, setUpdateFlightID] = useState("");
  const [searchUpdate, setSearchUpdate] = useState("");
  const [complexSearch1, setComplexSearch1] = useState("");
  const [complexSearch2, setComplexSearch2] = useState("");
  const [currentTable,setCurrentTable] = useState("");
  const [outputMessage, setOutputMessage] = useState("");
  // var user = "hello";
  // var password = "21321";
  // // since we used the proxy, the baseurl will be our proxy
  // //'Referrer-Policy': /no-referrer'
  // const params = {
  //   user:user,
  //   password: 'password'
  // }
  // const options = {
  //   method: "POST",
  //   body: JSON.stringify(params)
  // }
  // fetch(`http://localhost:8080/insertUser/`,options).then((response) => response.json());
  //fetch(`/deleteUser` + user).then((response) => response.json());
  //fetch(`/insertUser` + user).then((response) => response.json());
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
// axios.baseURL="http://localhost:1030";
// // axios.portNumber
// axios.get('/')
//     .then(res => {
//         console.log(res.data)
//   }).catch(err => console.error(err))
  async function handleTab1Submit() {
    // handle submit logic here
    setUserNameInput(userNameInput);
    const returnUserName = userNameInput;
    // const params = {
    //   user: returnUserName,
    //   password: '12312321'
    // }
    // const options = {
    //   method: "POST",
    //   body: JSON.stringify(params),
    //   mode: "cors"
    // }
    // http://localhost:8080/insertUser + '/' + userNameInput + '/' + 12321
    // fetch(`http://localhost:8080/insertUser?userLogin=${userNameInput}&password=${"12321"}`, {
    //   method: "POST",
    //   mode: "cors"
    // }).then((response) => console.log(response.json()));

    try {
      await axios.post("http://localhost:8080/addUser/", {
        data: {user:returnUserName,
        password:"1234"},
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    try {
      let arr = []
      await axios.get("http://localhost:8080/getUser/")
        .then((res) => {arr = res.data}).catch((err) => console.log(err));
      //currentTable = response.data
      console.log(arr)
      let data = "";
      arr.map((entry)=>{ return(data += '\n' + entry['LoginID'] + '\t' + entry['Password'] + '\n');})
      console.log(data);
      await setCurrentTable(data);
      setOutputMessage("Added user successfully!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  };

  async function handleTab2Submit() {
    // handle submit logic here
    setDeleteUserName(deleteUserName)
    const returnDeleteUserName = deleteUserName;
    try {
      await axios.delete("http://localhost:8080/deleteUser/", {
        data: {user:returnDeleteUserName},
      });
      setOutputMessage("Deleted user successfully!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }

    try {
      let arr = []
      await axios.get("http://localhost:8080/getUser/")
        .then((res) => {arr = res.data}).catch((err) => console.log(err));
      //currentTable = response.data
      console.log(arr)
      let data = "";
      arr.map((entry)=>{ return(data += '\n' + entry['LoginID'] + '\t' + entry['Password'] + '\n');})
      console.log(data);
      await setCurrentTable(data);
      setOutputMessage("Deleted user successfully!")
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
    // const returnDeleteUserName = deleteUserName;
    // const params = {
    //   user:returnDeleteUserName,
    //   }
    //   const options = {
    //     method: "DELETE",
    //     body: JSON.stringify(params)
    //     }
    //   return fetch(`http://localhost:8080/deleteUser/`,options).then((response) => response.json());
  };

  async function handleTab3Submit() {
    // handle submit logic here
    setUpdateAirlineID(updateAirlineID);
    setUpdateFlightID(updateFlightID);
    const returnUpdateFlightID = updateFlightID;
    const returnUpdateAirlineID = updateAirlineID;
    try {
      await axios.put("http://localhost:8080/updateFlight/", {
        data: {airlineID:returnUpdateAirlineID,
                  flightID:returnUpdateFlightID},
      });
      setCurrentTable()
      setOutputMessage("Updated flight successfully!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
    try {
      let arr = []
      await axios.get("http://localhost:8080/getFlight/")
        .then((res) => {arr = res.data}).catch((err) => console.log(err));
      //currentTable = response.data
      console.log(arr)
      let data = "";
      arr.map((entry)=>{ return(data += '\n' + entry['AirportID'] + '\t' + entry['FlightID'] + '\n');})
      console.log(data);
      await setCurrentTable(data);
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  };

  async function handleTab4Submit() {
    setSearchUpdate(searchUpdate);
    const returnSearchUpdate = searchUpdate;

    // handle submit logic here
    try {
      let arr = []
      await axios.post("http://localhost:8080/searchAirport/", {
        data: {airportID:returnSearchUpdate},
      }).then((res) => {arr = res.data}).catch((err) => console.log(err));
      //currentTable = response.data
      
      console.log(arr)
      let data = "";
      arr.map((entry)=>{ return(data += '\n' + entry['AirportID'] + '\t' + entry['FlightID'] + '\n');})
      
      await setCurrentTable(data);
      setOutputMessage("Searched Airport successfully!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  };

  async function handleTab5Submit(){
    // handle submit logic here
    setComplexSearch1(complexSearch1);
    const returnComplexSearch1 = complexSearch1;
     try {
      let arr = []
      await axios.post("http://localhost:8080/searchNAirport/", {
        data: {count:returnComplexSearch1},
      }).then((res) => {arr = res.data}).catch((err) => console.log(err));
      //currentTable = response.data
      console.log(arr)
      let data = "";
      arr.map((entry)=>{ return(data += '\n' + entry['Airports'] + '\t' + entry['City'] +'t' +entry['Count'] + '\n');})
      console.log(data);
      await setCurrentTable(data);
      setOutputMessage("Searched Airports successfully!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
      }
  };

  async function handleTab6Submit() {
    // handle submit logic here
    setComplexSearch2(complexSearch2);
    const returnComplexSearch2 = complexSearch2;
     try {
      let arr = []
      await axios.post("http://localhost:8080/flightDepartArrive/", {
        data: {airportID:returnComplexSearch2},
      }).then((res) => {arr = res.data}).catch((err) => console.log(err));
       let data = "";
      arr.map((entry)=>{ return(data += '\n' + entry['AirportID'] + '\t' + entry['FlightID'] + '\n');})
      //currentTable = response.data
      console.log(currentTable)
      await setCurrentTable(data);
      setOutputMessage("Searched Flights Departing and Arriving successfully!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
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
            <h2>Delete User</h2>
            <input
              type="text"
              placeholder="Enter username"
              value={deleteUserName}
              onChange={(e) => setDeleteUserName(e.target.value)}
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
      <div>!! For collections with a lot of entries we printed out the data that makes it most unique !!</div>
      <div>{outputMessage}</div>
      <div>{currentTable}</div>
    </div>
  );
}
export default FlightComponent;