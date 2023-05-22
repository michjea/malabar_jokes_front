import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const API_URL = 'http://localhost:1234/api/auth/';

  var user = JSON.parse(localStorage.getItem('user'));
  const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

  const init = () => {
    const user_ = JSON.parse(localStorage.getItem('user'));
    if (user_) {
      initialState.status.loggedIn = true;
      initialState.user = user_;
    }
  }

  const login = (user_) => {
    initialState.status.loggedIn = true;
    initialState.user = user_;
    localStorage.setItem('user', JSON.stringify(user_))
    // refresh user data
    user = user_;
    console.log(user);
  }

  const logout = () => {
    initialState.status.loggedIn = false;
    initialState.user = null;
    localStorage.removeItem('user');

    // user is undefined, so we need to refresh it
    user = undefined;

    console.log(user);
  }

  return {
    API_URL, login, logout, initialState, user, init
  }
})
