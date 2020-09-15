import React, { useState, useEffect } from "react";
import { getRandomIntInclusive } from "../utils/util";

const DrawnNumber = () => {
  const [drawnNumber, setDrawnNumber] = useState(10);

  useEffect(() => {
    const interval = setInterval(
      () => setDrawnNumber(getRandomIntInclusive(1, 99)),
      5000
    );
    return () => clearInterval(interval);
  }, [drawnNumber]);

  return <div className="drawnnumber">{drawnNumber}</div>;
};

export default DrawnNumber;
