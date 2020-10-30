import React, { useState, useEffect } from "react";
import { getRandomIntInclusive } from "../utils/util";
// import { messaging } from "../config/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const DrawnNumber = ({ firebase, gameId }) => {
  gameId = gameId ? gameId : "gjGLugGl8ZoQP9EdooNb";
  const [game, loading, error] = useDocumentData(
    firebase.firestore.doc(`games/${gameId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  let drawnNumber = game ? game.drawnNumbers[game.drawnNumbers.length - 1] : 0;

  return <div className="drawnnumber">{drawnNumber}</div>;
};

export default DrawnNumber;
