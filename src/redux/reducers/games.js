import { SET_GAMES, SET_TICKET } from "../../constants/actions";

const INITIAL_STATE = {
  game: {}
};

function games(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_GAMES: {
      return {
        ...state,
        game: action.payload
      };
    }

    case SET_TICKET:
      console.log(state);
      state.game["ticket"] = action.payload;

      return {
        ...state
      };

    default:
      return state;
  }
}

export default games;
