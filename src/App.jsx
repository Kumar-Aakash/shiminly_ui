import React, { useState, useEffect } from "react";

import Layout from './components/Layout';
import Dashboard from "./pages/Dashboard";
import FlashCards from "./pages/FlashCards";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flash-cards" element={<FlashCards />} />
        </Routes>
      </Layout>
  );
};

export default App;
