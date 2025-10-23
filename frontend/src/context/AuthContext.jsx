import { useEffect, useReducer } from "react";
import {
  safeGetItem,
  safeGetJSON,
  safeSetItem,
  safeSetJSON,
} from "../utils/localStorage.js";
import { AuthContext } from "./AuthContext.js";

const getInitialState = () => {
  const token = safeGetItem("token");
  const user = safeGetJSON("user");
  const isAuthenticated = !!(token && user);

  return {
    user,
    token,
    isAuthenticated,
    isLoading: false,
    language: safeGetItem("language") || "en",
  };
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  // Listen for storage changes (e.g., from other tabs or API interceptor)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "user") {
        const token = safeGetItem("token");
        const user = safeGetJSON("user");

        if (token && user) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, token },
          });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    // Listen for both storage events and custom events
    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events that might be triggered by API interceptor
    const handleCustomStorageChange = () => {
      const token = safeGetItem("token");
      const user = safeGetJSON("user");

      if (token && user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    };

    window.addEventListener("auth-storage-change", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "auth-storage-change",
        handleCustomStorageChange
      );
    };
  }, []);

  const login = (userData, token) => {
    safeSetItem("token", token);
    safeSetJSON("user", userData);
    dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData, token } });
  };

  const logout = () => {
    safeSetItem("token", null);
    safeSetItem("user", null);
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData) => {
    safeSetJSON("user", userData);
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const setLanguage = (language) => {
    safeSetItem("language", language);
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    setLanguage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
