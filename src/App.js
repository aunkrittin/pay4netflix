import "./App.css";
import { collection, onSnapshot, setDoc, doc } from "firebase/firestore";
// import axios from "axios";
import { useState, useEffect } from "react";
import db from "./firebase";

export default function App() {
  const [users, setUsers] = useState([]);
  const [months, setMonths] = useState([
    { name: "January", Status: false },
    { name: "February", Status: false },
    { name: "March", Status: false },
    { name: "April", Status: false },
    { name: "May", Status: false },
    { name: "June", Status: false },
    { name: "July", Status: false },
    { name: "August", Status: false },
    { name: "September", Status: false },
    { name: "October", Status: false },
    { name: "November", Status: false },
    { name: "December", Status: false },
  ]);

  const [usrId, setUsrId] = useState();
  const [timeAt, setTimeAt] = useState();
  const [dateAt, setDateAt] = useState();

  function getUserMonth(event) {
    let id = event.target.value;
    let usr = users.find((e) => e.id === id);
    setUsrId(id);
    let m = [
      { name: "January", Status: false },
      { name: "February", Status: false },
      { name: "March", Status: false },
      { name: "April", Status: false },
      { name: "May", Status: false },
      { name: "June", Status: false },
      { name: "July", Status: false },
      { name: "August", Status: false },
      { name: "September", Status: false },
      { name: "October", Status: false },
      { name: "November", Status: false },
      { name: "December", Status: false },
    ];
    m.map((e, index) => {
      if (usr.month[index]) {
        e.Status = usr.month[index].Status;
        if (usr.month[index].time) {
          e.time = usr.month[index].time;
        }
        if (usr.month[index].dateAt) {
          e.dateAt = usr.month[index].dateAt;
        }
        if (usr.month[index].checked) {
          e.checked = usr.month[index].checked;
        }
      }
    });
    console.log(months);
    setMonths(m);
  }

  function selectMonth(event) {
    let m = months.map((m) => {
      if (m.name === event.target.value) {
        m.Status = !m.Status;
        m.change = true;
      }
      return m;
    });
    setMonths(m);
  }

  const handleEdit = async () => {
    const docRef = doc(db, "users", usrId);
    months.map((m) => {
      if (m.change) {
        m.time = timeAt;
        m.dateAt = dateAt;
      }
    });
    const payload = {
      month: months,
    };
    //console.log(usrId); //User ID
    try {
      await setDoc(docRef, payload, { merge: true });
      window.location.reload(false);
    } catch (error) {
      alert(error);
      window.location.reload(false);
    }

    console.log(payload);
  };

  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => {
            let data = doc.data();
            //console.log(data.month);
            return { id: doc.id, ...data };
          })
        )
      ),
    []
  );

  // const [name, setName] = useState("");
  // const [monthAt, setMonthAt] = useState("");
  // const [timeAt, setTimeAt] = useState("");
  // const [confirmed, setConfirmed] = useState(false);
  // const [showdataList, setDataList] = useState([]);

  // const getData = () => {
  //   axios.get("http://localhost:3001/showdata").then((response) => {
  //     setDataList(response.data);
  //   });
  // };

  // const addData = () => {
  //   axios
  //     .post("http://localhost:3001/create", {
  //       name: name,
  //       monthAt: monthAt,
  //       timeAt: timeAt,
  //       confirmed: confirmed,
  //     })
  //     .then(() => {
  //       setDataList([
  //         ...showdataList,
  //         {
  //           name: name,
  //           monthAt: monthAt,
  //           timeAt: timeAt,
  //           confirmed: confirmed,
  //         },
  //       ]);
  //     });
  // };
  return (
    <div className="App container">
      <h1>Payment Monthly</h1>
      <h3>NETFLIX</h3>
      <div className="information">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <select
            name="cars"
            id="cars"
            className="form-control"
            onChange={getUserMonth}
          >
            <option value="" selected disabled>
              Please select your name
            </option>
            {users.map((val) => {
              return <option value={val.id}>{val.name}</option>;
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="month" className="form-label">
            Month:
          </label>
          {months.map((val) => {
            return (
              <div
                style={
                  val.checked
                    ? { backgroundColor: "#00ff00" }
                    : { backgroundColor: "#ea4335" }
                }
                className="form-check"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  disabled={val.checked}
                  checked={val.Status}
                  onChange={selectMonth}
                  value={val.name}
                />
                <label className="form-check-label">{val.name}</label>
              </div>
            );
          })}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Date:
          </label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter Date"
            onChange={(event) => {
              setDateAt(event.target.value);
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
        <button className="btn btn-success" onClick={handleEdit}>
          Add Data
        </button>
      </div>
      <hr />
      <footer>
        <p>This is an early-access. The website may bug pls contact me.</p>
        <p>Created by Krittin Chayasophat && Jomson. 2022</p>
      </footer>
    </div>
  );
}
