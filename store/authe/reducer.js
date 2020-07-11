import { CHECK_AUTHENTICATE, LOGOUT } from "./actions";

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CHECK_AUTHENTICATE:
      return {
        token: actions.token,
        userId: actions.userId,
      };
      case LOGOUT:
        return initialState;
    default:
      return state;
  }
};

export default authReducer;
