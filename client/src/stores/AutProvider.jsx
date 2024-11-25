import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext({
  id: undefined,
  role: undefined,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return {
        ...state,
        id: action.payload.id,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default function AutProvider({ children }) {
  const [userState, dispatch] = useReducer(reducer, {
    id: undefined,
    role: undefined,
  });
  const setUser = (id, role) => {
    dispatch({ type: "set_user", payload: { id, role } });
  };
  const returnValue = {
    userState,
    setUser,
  };
  return (
    <AuthContext.Provider value={returnValue}>{children}</AuthContext.Provider>
  );
}

AutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
