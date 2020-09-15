import React from "react";
import Square from "./Square";

const Row = ({ key, numbers }) => {
  let squares = [];

  numbers.forEach((num, index) =>
    squares.push(<Square key={index} value={num} />)
  );

  return (
    <div className="board-row" key={key}>
      {squares}
    </div>
  );
};

export default Row;
