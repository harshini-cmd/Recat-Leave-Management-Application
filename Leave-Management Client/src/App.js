import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/employees" element={<Home/>} />
          <Route path="/leave" element={<Home/>} />
          <Route path="/leave-balance" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
