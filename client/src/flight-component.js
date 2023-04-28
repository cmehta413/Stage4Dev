
import React, { useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import { AppBar, Toolbar, Typography} from '@mui/material';
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
function FlightComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const [userNameInput, setUserNameInput] = useState("");
  const [deleteUserName, setDeleteUserName] = useState("");
  const [updateAirlineID, setUpdateAirlineID] = useState("");
  const [updateFlightID, setUpdateFlightID] = useState("");
  const [searchUpdate, setSearchUpdate] = useState("");
  const [complexSearch1, setComplexSearch1] = useState("");
  const [complexSearch2, setComplexSearch2] = useState("");
  const [currentTable,setCurrentTable] = useState();
  const [outputMessage, setOutputMessage] = useState("");
  const[triggerFlightID, setTriggerFlightID] = useState()
  const[triggerAirlineID, setTriggerAirlineID] =  useState()
  const[triggerOriginAirport, setTriggerOriginAirport] = useState()
  const[triggerDestinationAirport, setTriggerDestinationAirport] = useState()
  const[triggerYear, setTriggerYear] = useState()
  const [triggerMonth, setTriggerMonth] = useState()
  const[triggerDay, setTriggerDay] = useState()
  const[triggerScheduleDeparture, setTriggerScheduleDeparture] = useState()
  const[triggerDepartureTime, setTriggerDepartureTime] = useState()
  const[triggerScheduledArrival, setTriggerScheduledArrival] = useState()
  const[triggerArrivalTime, setTriggerArrivalTime] = useState()
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

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
    },
    long_entry: {
      alignItems: 'center',
      justifyContent: "center",
    },
    input: {
      padding: '5px',
    },
    header: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    buttonGroup: {
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
    setCurrentTable(null)
  };

  function DataGrid(strings ) {
    console.log(strings)
      return (
        <Table>
          <TableBody>
            {strings.map((str, index) => (
              <TableRow key={index}>
                <TableCell>{str}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
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
      //console.log(arr)
      var data=[]
      arr.map((entry)=>{ return(data.push(entry['LoginID'] + ',' + entry['Password']));})
      const table = DataGrid(data)
      await setCurrentTable(table)
      //await setCurrentTable(DataGrid(arr))
      setOutputMessage("Added user successfully! List of users and passwords");
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
      let data = [];
      arr.map((entry)=>{ return(data.push(entry['LoginID'] + ',' + entry['Password']));})
      const table = DataGrid(data)
      await setCurrentTable(table)
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
      let data = [];
      arr.map((entry)=>{ return(data.push(entry['AIRLINE_ID'] + ',' + entry['Flight_ID']));})
      const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("AirlineID and FlightID shown below!");
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
      let data = [];
      arr.map((entry)=>{ return(data.push(entry['DESTINATION_AIRPORT'] + ',' + entry['Flight_ID']));})
      
      const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("Destination airport and Flight ID shown below!");
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
      let data = [];
      arr.map((entry)=>{ return(data.push(entry['Number_of_Airports'] + ',' + entry['City'] +',' +entry['State']));})
      const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("Searched Airports successfully! Number of airports, City, and State is shown below.");
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
       let data = [];
      arr.map((entry)=>{ return(data.push(entry["Destination_Airport"] + "," + entry['Air_Time']))})
      console.log(arr)
      //currentTable = response.data
      const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("Searched Flights Departing and Arriving successfully! Destination Airport and Air time shown below");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  };


  async function handleTab7Submit() { //new tab, handles the stored procedure which is static
    try {
      let arr = []
      await axios.get("http://localhost:8080/storedProcedure1/").then((res) => {arr = res.data}).catch((err) => console.log(err));
       let data = [];
      arr.map((entry)=>{ return(data.push(entry["Day_Of_Month"] + "," + entry['Airport_name'] + "," + entry['Status_Delay']))})
      console.log(arr)
      //currentTable = response.data
      const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("Stored Procedure Operation Successful! Days of the month, Airport name, and Status Delay shown below.");//dont know the fields for this.
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  }
  async function handleTab8Submit() { //new table, handles the trigger. An insert is prompted and then the trigger is called. Return results of flight table or alternative output.
    setTriggerFlightID(triggerFlightID)
    setTriggerAirlineID(triggerAirlineID)
    setTriggerOriginAirport(triggerOriginAirport)
    setTriggerDestinationAirport(triggerDestinationAirport)
    setTriggerYear(triggerYear)
    setTriggerMonth(triggerMonth)
    setTriggerDay(triggerDay)
    setTriggerScheduleDeparture(triggerScheduleDeparture)
    setTriggerDepartureTime(triggerDepartureTime)
    setTriggerScheduledArrival(triggerScheduledArrival)
    setTriggerArrivalTime(triggerArrivalTime)
    //does stuff

    var flightInfo = {
      flightID:triggerFlightID,
      airlineID: triggerAirlineID,
      originAirport:triggerOriginAirport,
      destinationAirport: triggerDestinationAirport,
      year: triggerYear,
      month:triggerMonth,
      day:triggerDay,
      scheduledDeparture:triggerScheduleDeparture,
      departureTime:triggerDepartureTime,
      scheduledArrivalTime:triggerScheduledArrival,
      arrivalTime:triggerArrivalTime
    }
    try {
      let arr = []
      await axios.post("http://localhost:8080/flightTriggerResponse/", {data:flightInfo}
      ).then((res) => {arr = res.data}).catch((err) => console.log(err));
      let data = []
      data.push(flightInfo['flightID'] + "," + flightInfo['airlineID'] + "," + flightInfo['originAirport'] + "," + flightInfo['destinationAirport']  )
      console.log(data)
      //currentTable = response.data
      const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("FlightID, AirlineID, Origin Airport, and destinationAirport are shown below!");
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  }
  async function handleTab9Submit() { //new tab, handles the stored procedure which is static
    try {
      let arr = []
      await axios.get("http://localhost:8080/storedProcedure2/").then((res) => {arr = res.data}).catch((err) => console.log(err));
       let data = [];
       arr.map((entry)=>{ return(data.push(entry["Airline"] + "," + entry['Percent_of_delays'] + "," + entry['Review'] + "\n"))})
       console.log(arr)
       //currentTable = response.data
       const table = DataGrid(data)
      await setCurrentTable(table)
      setOutputMessage("Airline, Percent of delays, and reviews are shown below!");
       //setOutputMessage("Stored Procedure Operation Successful!");//dont know the fields for this.
    } catch (error) {
      setOutputMessage("Error occurred: " + error);
      setCurrentTable("");
      console.error(error);
      throw error;
    }
  }

  ///New tabs: Stored Procedure-"Day_of_Month", "Delays", Status_Delay


  // const renderTabs = () => {
  //   const tabs = [];
  //   const values = ["Insert", "Delete", "Update", "Search", "N Airports", "Flights Departing and Arriving"];
  //   for (let i = 0; i < 6; i++) {
  //     tabs.push(
  //       <div key={i} className="tab">
  //         <button onClick={() => handleTabClick(i)}>{values[i]}</button>
  //       </div>
  //     );
  //   }
  //   return tabs;
  // };

  

  const renderPage = () => {
    switch (activeTab) {
      case 0:
        return (
          <div >

            <h2 style={styles.header}>User Login</h2>
            <div  style={styles.container}>
            <TextField style={styles.input} id="filled-basic" label="Enter username" variant="filled"value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
            <Button variant="contained" onClick={handleTab1Submit}>Enter</Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 style={styles.header}>Delete User</h2>
            <div style={styles.container}>
            <TextField style={styles.input} id="filled-basic" label="Enter username" variant="filled"value={deleteUserName} onChange={(e) => setDeleteUserName(e.target.value)} />
            <Button variant="contained" onClick={handleTab2Submit}>Enter</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 style={styles.header}> Update All flights with Airline ID with Flight ID</h2>
            <div style={styles.container}>
            <TextField style={styles.input} d="filled-basic" label="Enter Flight ID to change" variant="filled"value={updateFlightID} onChange={(e) => setUpdateFlightID(e.target.value)} />
          <TextField style={styles.input} id="filled-basic" label="Enter Airline ID" variant="filled"value={updateAirlineID} onChange={(e) => setUpdateAirlineID(e.target.value)} />
          <Button variant="contained" onClick={handleTab3Submit}>Enter</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 style={styles.header}>Search flight from Airport
            </h2>
            <div style={styles.container}>
            <TextField  style={styles.input} id="filled-basic" label="Enter Airport ID" variant="filled" onChange={(e) => setSearchUpdate(e.target.value)} />
           <Button variant="contained" onClick={handleTab4Submit}>Enter</Button>
            </div>

          </div>
        );
      case 4:
        return (
          <div>
            <h2 style={styles.header}>How many cities have more than N Airports?
            </h2>
            <div style={styles.container}>
            <TextField  style={styles.input} id="filled-basic" label="Enter Number of Airports" variant="filled" onChange={(e) => setComplexSearch1(e.target.value)}/>
            <Button variant="contained" onClick={handleTab5Submit}>Enter</Button>
            </div>
          </div>
        );
        case 5:
        return (
          <div>
            <h2 style={styles.header}> What flights are coming to and from your Airport?</h2>
            <div style={styles.container}>
            <TextField style={styles.input} id="filled-basic" label="Enter Airport Name" variant="filled" onChange={(e) => setComplexSearch2(e.target.value)}/>
           <Button variant="contained" onClick={handleTab6Submit}>Enter</Button>
           </div>
          </div>
        );
        case 6: //new tab
        return (
          <div>
            <h2 style={styles.header}>What day's are the best and worst to fly?
            </h2>
            <div style={styles.container}>
            <Button variant="contained" onClick={handleTab7Submit}>Click to find out!</Button>
            </div>
          </div>
        );

        case 7: //new tab
          return (
            <div>
              <h2 style={styles.header}>Add new Flight
              </h2>
              <div style={styles.long_entry}>
              <TextField style={styles.input} id="filled-basic" label="Enter Flight ID" variant="filled" onChange={(e) => setTriggerFlightID(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Airline ID" variant="filled" onChange={(e) => setTriggerAirlineID(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Origin Airport" variant="filled" onChange={(e) => setTriggerOriginAirport(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter  Destination Airport" variant="filled" onChange={(e) => setTriggerDestinationAirport(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Year" variant="filled" onChange={(e) => setTriggerYear(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Month" variant="filled" onChange={(e) => setTriggerMonth(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Day" variant="filled" onChange={(e) => setTriggerDay(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Scheduled departure" variant="filled" onChange={(e) => setTriggerScheduleDeparture(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter  Departure time" variant="filled" onChange={(e) => setTriggerDepartureTime(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Scheduled Arrival" variant="filled" onChange={(e) => setTriggerScheduledArrival(e.target.value)}/>
              <TextField style={styles.input} id="filled-basic" label="Enter Arrival Time" variant="filled" onChange={(e) => setTriggerArrivalTime(e.target.value)}/>
              <Button variant="contained" onClick={handleTab8Submit}>Enter</Button>
              </div>
            </div>
          );

          case 8: //new tab
        return (
          <div>
            <h2 style={styles.header}>What Airlines have the most delays ?
            </h2>
            <div style={styles.container}>
            <Button variant="contained" onClick={handleTab9Submit}>Click to find out!</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
    
  };
  return (
    <div>
      <div>
      <AppBar position="static" style={{ backgroundColor: '#5AF' }}>
        <Toolbar>
          <Typography variant="h2" style={{ flexGrow: 1, textAlign: 'center' }}>
          Flight Information</Typography>
        </Toolbar>
        <div style={styles.buttonGroup}>
          <ButtonGroup variant="contained" color="primary" aria-label="outlined button group">
          <Button  onClick={() => handleTabClick(0)}>Insert</Button>
          <Button onClick={() => handleTabClick(1)}>Delete</Button>
          <Button onClick={() => handleTabClick(2)}>Update</Button>
          <Button onClick={() => handleTabClick(3)}>Search</Button>
          <Button onClick={() => handleTabClick(4)}>N airports</Button>
          <Button onClick={() => handleTabClick(5)}>Flights Departing and Arriving</Button>
          <Button onClick={() => handleTabClick(6)}>Which days are best for traveling?</Button>
          <Button onClick={() => handleTabClick(7)}>Enter new flight information</Button>
          <Button onClick={() => handleTabClick(8)}>Which Airlines have the worst delays?</Button>
        </ButtonGroup>
        </div>
      </AppBar>
      </div>
      <div>{renderPage()}</div>
      <h3>!! For collections with a lot of entries we printed out the data that makes it most unique !!</h3>
      <div>{outputMessage}</div>
      <div>{currentTable}</div>
    </div>
  );
}
export default FlightComponent;