import React from "react";

import Layout from "./components/Layout";
import FlashCards from "./pages/FlashCards";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/flash-cards/:profile" element={<FlashCards />} />
        <Route path="/" element={<Navigate to="/flash-cards/Teacher" />} />
      </Routes>
    </Layout>
  );
};

export default App;
