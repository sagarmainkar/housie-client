import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import StatusLayout from "./containers/StatusLayout";
import TicketLayout from "./containers/TicketLayout";
import { getTicketNumbers, getAllUrlParams } from "./utils/util";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has("reset")) {
  console.log("Reset Mode");
  console.log(getAllUrlParams()["reset"]);
  if (getAllUrlParams()["reset"]) {
    localStorage.clear();
  }
} else {
  console.log("Normal Mode");
}

const date = localStorage.date;
if (date && date !== new Date().toLocaleString().split(",")[0]) {
  localStorage.removeItem("tickets");
  localStorage.removeItem("user");
  localStorage.removeItem("date");
} else {
  localStorage.setItem("date", new Date().toLocaleString().split(",")[0]);
}
let user = localStorage.user;
let tickets = localStorage.tickets;

if (tickets) {
  tickets = JSON.parse(tickets);
} else {
  tickets = [getTicketNumbers()];
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
export default function App() {
  return (
    <div className="App">
      <h1>Welcome to Housie </h1>
      <h2>
        <strong>{user ? user.toUpperCase() : null}</strong>
      </h2>
      {/* <StatusLayout /> */}
      {user ? <TicketLayout numbers={tickets} /> : <Welcome />}
    </div>
  );
}

const Welcome = () => {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    localStorage.setItem("user", name);
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label for="name">Please enter your name:</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <br />
        <input type="submit" value="Enter Game" />
      </form>
    </div>
  );
};
