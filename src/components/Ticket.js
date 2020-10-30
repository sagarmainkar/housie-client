import React, { useState } from "react";
import Row from "./Row";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import { useDocumentData } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",

    display: "block"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Ticket = ({ user, firebase, numbers, gameId }) => {
  // const firestore = firebase.firestore();
  const [game, loading, error] = useDocumentData(
    firebase.firestore.doc(`games/${gameId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false }
    }
  );

  const drawnNumbers = game ? game.drawnNumbers : [];
  const firstRowWin = game ? game.firstRow : {};
  const secondRowWin = game ? game.secondRow : {};
  const thirdRowWin = game ? game.thirdRow : {};
  const fullHouseWin = game ? game.fullHouse : {};

  const [FH, setFH] = useState(false);
  const [FR, setFR] = useState(false);
  const [SR, setSR] = useState(false);
  const [TR, setTR] = useState(false);

  const [markedMap, setMarkedMap] = useState(new Map());
  const [firstRowMap, setFirstRowMap] = useState(new Map());
  const [secondRowMap, setSecondRowMap] = useState(new Map());
  const [thirdRowMap, setThirdRowMap] = useState(new Map());

  const classes = useStyles();

  const firstRow = numbers.slice(0, 7);
  let secondRow = numbers.slice(7, 12);
  const thirdRow = numbers.slice(12, 19);

  secondRow.unshift(-1);
  secondRow.push(-1);

  numbers.forEach((num) => {
    if (markedMap.get(num) === undefined && num > 0) {
      markedMap.set(num, false);
    }
  });

  firstRow.forEach((num) => {
    if (firstRowMap.get(num) === undefined && num > 0) {
      firstRowMap.set(num, false);
    }
  });

  secondRow.forEach((num) => {
    if (secondRowMap.get(num) === undefined && num > 0) {
      secondRowMap.set(num, false);
    }
  });

  thirdRow.forEach((num) => {
    if (thirdRowMap.get(num) === undefined && num > 0) {
      thirdRowMap.set(num, false);
    }
  });

  const onChange = (num, marked) => {
    setMarkedMap(markedMap.set(num, marked));

    if (firstRowMap.has(num)) {
      setFirstRowMap(firstRowMap.set(num, marked));
    }
    if (secondRowMap.has(num)) {
      setSecondRowMap(secondRowMap.set(num, marked));
    }
    if (thirdRowMap.has(num)) {
      setThirdRowMap(thirdRowMap.set(num, marked));
    }
    // console.log(checkAllMarked());
    setFH(isFH());

    let [fr, sr, tr] = isRowComplete();
    // console.log(fr, sr, tr);

    setFR(fr);
    setSR(sr);
    setTR(tr);
  };

  const isFH = () => {
    let fh = true;
    markedMap.forEach(function (marked, num) {
      // if (!marked) console.log(`Num: ${num} Marked :${marked}`);
      if (!marked) fh = false;
    });
    if (fh && !includesAll(drawnNumbers, Array.from(markedMap.keys())))
      fh = false;
    return fh;
  };

  const includesAll = (larger, smaller) => {
    let includes = true;
    const BreakException = {};
    try {
      smaller.forEach((num) => {
        if (!larger.includes(num)) {
          throw BreakException;
        }
      });
    } catch (e) {
      includes = false;
    }

    return includes;
  };

  const isRowComplete = () => {
    let frComplete = true;
    let srComplete = true;
    let trComplete = true;

    firstRowMap.forEach(function (marked, num) {
      if (!marked) frComplete = false;
    });

    if (
      (frComplete &&
        !includesAll(drawnNumbers, Array.from(firstRowMap.keys()))) ||
      firstRowWin !== undefined
    )
      frComplete = false;

    secondRowMap.forEach(function (marked, num) {
      if (!marked) srComplete = false;
    });

    if (
      (srComplete &&
        !includesAll(drawnNumbers, Array.from(secondRowMap.keys()))) ||
      secondRowWin !== undefined
    )
      srComplete = false;

    thirdRowMap.forEach(function (marked, num) {
      if (!marked) trComplete = false;
    });
    if (
      (trComplete &&
        !includesAll(drawnNumbers, Array.from(thirdRowMap.keys()))) ||
      thirdRowWin !== undefined
    )
      trComplete = false;

    return [frComplete, srComplete, trComplete];
  };

  const claimPrize = (type) => {
    let allIncluded = true;

    switch (type) {
      case 1:
        Array.from(firstRowMap.keys()).forEach((num) => {
          if (!drawnNumbers.includes(num)) allIncluded = false;
        });
        if (allIncluded) {
          firebase.firestore
            .collection("games")
            .doc(gameId)
            .set(
              {
                firstRow: {
                  id: user.uid,
                  name: user.displayName,
                  email: user.email
                }
              },
              { merge: true }
            );
        }
        break;
      case 2:
        Array.from(secondRowMap.keys()).forEach((num) => {
          if (!drawnNumbers.includes(num)) allIncluded = false;
        });
        if (allIncluded) {
          firebase.firestore
            .collection("games")
            .doc(gameId)
            .set(
              {
                secondRow: {
                  id: user.uid,
                  name: user.displayName,
                  email: user.email
                }
              },
              { merge: true }
            );
        }
        break;
      case 3:
        Array.from(thirdRowMap.keys()).forEach((num) => {
          if (!drawnNumbers.includes(num)) allIncluded = false;
        });

        if (allIncluded) {
          firebase.firestore
            .collection("games")
            .doc(gameId)
            .set(
              {
                thirdRow: {
                  id: user.uid,
                  name: user.displayName,
                  email: user.email
                }
              },
              { merge: true }
            );
        }
        break;
      case 4:
        Array.from(markedMap.keys()).forEach((num) => {
          if (!drawnNumbers.includes(num)) allIncluded = false;
        });

        if (allIncluded) {
          firebase.firestore
            .collection("games")
            .doc(gameId)
            .set(
              {
                fullHouse: {
                  id: user.uid,
                  name: user.displayName,
                  email: user.email
                }
              },
              { merge: true }
            );
        }
        break;
      default:
        allIncluded = false;
        break;
    }

    if (allIncluded) {
    } else {
      console.log("Not all numbers are drawn yet");
    }
  };

  return (
    <>
      <div className="ticket">
        <br />
        <Row
          firebase={firebase}
          gameid={gameId}
          numbers={firstRow}
          key="row1"
          onRowChange={onChange}
        />

        <Row
          firebase={firebase}
          gameid={gameId}
          numbers={secondRow}
          key="row2"
          onRowChange={onChange}
        />
        <Row
          firebase={firebase}
          gameid={gameId}
          numbers={thirdRow}
          key="row3"
          onRowChange={onChange}
        />
      </div>
      <div className={classes.root}>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button
            variant="contained"
            color="primary"
            disabled={!FR}
            onClick={(e) => claimPrize(1)}
          >
            FR
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!SR}
            onClick={(e) => claimPrize(2)}
          >
            SR
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!TR}
            onClick={(e) => claimPrize(3)}
          >
            TR
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!FH}
            onClick={(e) => claimPrize(4)}
          >
            FH
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default Ticket;
