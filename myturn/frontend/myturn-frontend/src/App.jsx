import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import { useEffect, useContext } from "react";

import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./shared/components/Footer";
import Navbar from "./shared/components/Navbar";

function App() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log(auth.isLoggedIn);
  }, []);



  return (
    <AuthContext.Provider value={{isLoggedIn: false}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/main" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
