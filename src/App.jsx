import React from "react";

import Layout from './components/Layout';
import FlashCards from "./pages/FlashCards";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/flash-cards/:profile" element={<FlashCards />} />
        </Routes>
      </Layout>
  );
};

export default App;
