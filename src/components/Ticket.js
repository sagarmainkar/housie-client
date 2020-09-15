import React from "react";
import Row from "./Row";

const Ticket = ({ numbers, ticketId }) => {
  const firstRow = numbers.slice(0, 7);
  let secondRow = numbers.slice(7, 12);
  const thirdRow = numbers.slice(12, 19);

  secondRow.unshift(-1);
  secondRow.push(-1);

  return (
    <div className="ticket">
      <h2>Ticket Number: {ticketId}</h2>
      <Row numbers={firstRow} key="row1" />
      <Row numbers={secondRow} key="row2" />
      <Row numbers={thirdRow} key="row3" />
    </div>
  );
};

export default Ticket;
