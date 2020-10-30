import React from "react";
import DrawnNumber from "../components/DrawnNumber";
import WinnerStatus from "../components/WinnerStatus";

const winners = [
  { prize: "First Row", name: "John" },
  { prize: "Corners", name: "Mary" },
  { prize: "Second Row", name: "Mary" }
];
const StatusLayout = ({ user, firebase, gameId }) => (
  <>
    <div id="status-board">
      <div className="status-board">
        <WinnerStatus firebase={firebase} user={user} gameId={gameId} />
      </div>
      <DrawnNumber firebase={firebase} />
    </div>
  </>
);

export default StatusLayout;
