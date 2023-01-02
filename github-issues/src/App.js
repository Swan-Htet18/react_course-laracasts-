import React from "react";
import Detail from "./Detail";
import Issues from "./Issues";
import { Link, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Issues />} />
          <Route path="/issues/:id" element={<Detail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
