import React from "react";
import DrawnNumber from "../components/DrawnNumber";
import WinnerStatus from "../components/WinnerStatus";

const winners = [
  { prize: "First Row", name: "John" },
  { prize: "Corners", name: "Mary" },
  { prize: "Second Row", name: "Mary" }
];
const StatusLayout = ({ number }) => (
  <>
    <div id="status-board">
      <div className="status-board">
        <WinnerStatus winners={winners} />
      </div>
      <DrawnNumber number={number} />
    </div>
  </>
);

export default StatusLayout;
