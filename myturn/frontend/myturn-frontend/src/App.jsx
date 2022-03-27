import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import { useEffect, useCallback, useState } from "react";

import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./shared/components/Footer";
import Navbar from "./shared/components/Navbar";

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
    setUserId(null);
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

  if (token) {
    //usuario logeado
    routes = (
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/main" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    //usuario no logeado
    routes = (
      <Routes>
        <Route path="/main" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, //true if there's no token
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navbar />
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
