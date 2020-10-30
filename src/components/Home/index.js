import React from "react";
import { useSelector } from "react-redux";
import SignInPage from "../SignIn";
import StatusLayout from "../../containers/StatusLayout";
import TicketLayout from "../../containers/TicketLayout";

const NonAuthenticated = () => <SignInPage />;
function HOME({ firebase }) {
  const authenticated = useSelector((state) => state.sessionState.authUser);
  const gameId = useSelector((state) => state.data.game.id);
  const user = useSelector((state) => state.sessionState.authUser);
  const ticket = useSelector((state) => state.data.game.ticket);

  return authenticated ? (
    <div className="container">
      <h1>Welcome to Housie</h1>
      <StatusLayout user={user} firebase={firebase} gameId={gameId} />
      <TicketLayout
        user={user}
        firebase={firebase}
        numbers={ticket.numbers}
        gameId={gameId}
      />
    </div>
  ) : (
    <NonAuthenticated />
  );
}

export default HOME;
