import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./Auth/Login";
import Dashboard from "./Dashboard/Dashboard"
import Navbar from "./shared/components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Login />}/>
        <Route path="/main" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
