import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./shared/context/auth-context";

import React, { useEffect, useCallback, useState } from "react";

import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./shared/components/Footer";
import Navbar from "./shared/components/Navbar";
import Meet from "./Meet/Meet";
import Background from "./shared/components/Background";

function App() {
  const [token, setToken] = useState(null);
  const [userId,setUserId] = useState(null);
  const [username,setUsername] = useState(null);

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

    //extra info for user
    let config = {
      headers: {
        Authorization: "Token " + token,
      },
    };
    axios
      .get(`http://localhost:8000/backend/user_data`, config)
      .then((response) => {
        /* console.log(response.data); */
        setUsername(response.data.first_name + " " + response.data.last_name);
        setUserId(response.data.id);
        /* TODO:  GUARDAR EN LOCALSTORAGE Y HACER FETCH CUANDO RECARGUE*/
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logout = useCallback(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    let config = {
      headers: {
        Authorization: "Token " + storedData.token,
      },
    };

    //TODO: Y SI HAY ERROR DE CONEXIÓN ?
    axios
      .get("http://localhost:8000/backend/logout", config)
      .then((response) => {
        console.log(response.data);
        setToken(null);
        localStorage.removeItem("userData");
        console.log("se ha deslogeado al usuario");
      })
      .catch((err) => {
        console.log(err);
      });

    /* 
    //LO INICIAL
    setToken(null);
    localStorage.removeItem("userData"); */
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
        userId:userId,
        username:username,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Background>
          <Navbar />
          <main>{routes}</main>
          <Footer />
        </Background>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
