import React from "react";
const WinnerStatus = ({ winners }) => {
  return (
    <>
      {winners.map(winner => (
        <div className="alert alert-success" role="alert" key={winner.prize}>
          {winner.prize} won by {winner.name}
        </div>
      ))}
    </>
  );
};

export default WinnerStatus;
