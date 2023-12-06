import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;


