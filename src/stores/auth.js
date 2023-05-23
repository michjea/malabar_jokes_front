import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const API_URL = "http://localhost:1234/api/auth/";

  let user = JSON.parse(localStorage.getItem("user"));
  const initialState = user
    ? { status: { loggedIn: true }, user: user }
    : { status: { loggedIn: false }, user: null };

  const init = () => {
    const user_ = JSON.parse(localStorage.getItem("user"));
    if (user_) {
      initialState.status.loggedIn = true;
      initialState.user = user_;
      user = user_;
      console.log("init", user);
      console.log("init initial state", initialState.user);
    }
  };

  const login = (user_) => {
    console.log("attempt to login ", user_);
    initialState.status.loggedIn = true;
    initialState.user = user_;
    localStorage.setItem("user", JSON.stringify(user_));
    // refresh user data
    user = user_;
    console.log("attempt to login user ", user);
    console.log("attempt to login user initial state", initialState.user);
  };

  const logout = () => {
    console.log("attempt to logout");
    initialState.status.loggedIn = false;
    initialState.user = null;
    localStorage.removeItem("user");

    // user is undefined, so we need to refresh it
    user = undefined;

    console.log("attempt to logout user ", user);
    console.log("attempt to logout user initial state", initialState.user);
  };

  return {
    API_URL,
    login,
    logout,
    initialState,
    user,
    init,
  };
});
