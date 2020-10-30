import {
  SET_GAMES,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_TICKET
} from "../../constants/actions";
import * as ROUTES from "../../constants/routes";

export const getGames = (db) => (dispatch) => {
  db.collection("games")
    .where("status", "==", "ACTIVE")
    .get()
    .then((querySnapShot) => {
      dispatch({ type: CLEAR_ERRORS });

      if (querySnapShot.size < 1) {
        console.log("No Active games");
        return;
      }
      const gameData = [];
      querySnapShot.docs.forEach((game) => {
        let data = game.data();
        data["id"] = game.ref.id;
        gameData.push(data);
      });

      dispatch({ type: SET_GAMES, payload: gameData[0] });
      dispatch(getTicket(db, gameData));
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error
      });
    });
};

export const getTicket = (db, gameData) => (dispatch, getState) => {
  const user = getState().sessionState.authUser;

  db.collection("tickets")
    // .where(db.FieldPath.documentId(), "==", gameData)
    .where("userId", "==", user.uid)
    .where("status", "==", "APPROVED")
    .get()
    .then((ticketsSnapshot) => {
      dispatch({ type: CLEAR_ERRORS });

      if (ticketsSnapshot.size <= 0) {
        console.log("No tickets allocated ");
      }
      const tick = [];
      ticketsSnapshot.forEach((ticket) => {
        tick.push(ticket.data());
      });

      dispatch({ type: SET_TICKET, payload: tick[0] });
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: SET_ERRORS,
        payload: error
      });
    });
};
