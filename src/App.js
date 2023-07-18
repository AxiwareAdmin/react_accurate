import "./App.css";
import Navbar from "./components/Navbar";
import Index1 from "./components/Index12";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoicePageWrapper from "./components/InvoicePageWrapper";
function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route  path="/add-invoice" element={<InvoicePageWrapper />} />
          <Route  path="/" element={<Index1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
