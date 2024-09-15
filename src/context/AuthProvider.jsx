import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const INITIAL_STATE = { user: null, isAuthenticated: false };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action!");
  }
};

const FAKE_USER = {
  name: "Alireza",
  email: "user@gmail.com",
  password: "@Test1234",
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
  const { user, isAuthenticated } = state;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "LOGIN", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside of a AuthProvider");
  }
  return context;
};
