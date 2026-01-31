import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./project/Login";
import Chat from "./project/Chat";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;