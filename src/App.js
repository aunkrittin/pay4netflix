import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [monthAt, setMonthAt] = useState("");
  const [timeAt, setTimeAt] = useState("");
  const [confirmed, setConfirmed] = useState(0);

  const [showdataList, setDataList] = useState([]);

  const getData = () => {
    axios.get("http://localhost:3001/showdata").then((response) => {
      setDataList(response.data);
    });
  };

  const addData = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        monthAt: monthAt,
        timeAt: timeAt,
        confirmed: confirmed,
      })
      .then(() => {
        setDataList([
          ...showdataList,
          {
            name: name,
            monthAt: monthAt,
            timeAt: timeAt,
            confirmed: confirmed,
          },
        ]);
      });
  };
  return (
    <div className="App container">
      <h1>Payment Monthly</h1>
      <h3>NETFLIX</h3>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="month" className="form-label">
              Month:
            </label>
            <input
              type="month"
              min="2022-01"
              className="form-control"
              placeholder="Enter Date"
              onChange={(event) => {
                setMonthAt(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Time:
            </label>
            <input
              type="time"
              className="form-control"
              placeholder="Enter Time"
              onChange={(event) => {
                setTimeAt(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Confirmed:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="0"
              onChange={(event) => {
                setConfirmed(event.target.value);
              }}
              readOnly
            />
          </div>
          <button className="btn btn-success" onClick={addData}>
            Add Data
          </button>
        </form>
      </div>
      <hr />
      <div className="showdata">
        <button className="btn btn-primary">Show Data</button>
        <br />
        <br />
        {getData}
        {showdataList.map((val, key) => {
          return (
            <div className="data card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Month: {val.monthAt}</p>
                <p className="card-text">Time: {val.timeAt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
