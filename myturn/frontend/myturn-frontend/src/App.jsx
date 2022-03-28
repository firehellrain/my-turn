import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";

import React, { useEffect, useCallback, useState } from "react";

import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./shared/components/Footer";
import Navbar from "./shared/components/Navbar";
import Meet from "./Meet/Meet";

function App() {
  const [token, setToken] = useState(null);

  const login = useCallback((token, expirationDate) => {
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 1 dia de expiración de token
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;

  if (!token) {
    //usuario no logeado
    routes = (
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    //usuario logeado

    routes = (
      <Switch>
        <Route path="/main">
          <Dashboard />
        </Route>
        <Route path="/meet/:mid">
          <Meet />
        </Route>
        <Redirect to="main" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, //this will be true if there is a token
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navbar />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
