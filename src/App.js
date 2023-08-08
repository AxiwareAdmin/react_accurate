import "./App.css";
import Navbar from "./components/Navbar";
import Index1 from "./components/Index12";
import {React,useState} from "react";
import {Routes, Route } from "react-router-dom";
import InvoicePageWrapper from "./components/InvoicePageWrapper";
import InvoiceList from "./components/invoiceList";
import Alert from "./components/alert";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [alertMsg,setAlertMsg]=useState("");
  const onAlertChange=(msg)=>{
    setAlertMsg(msg);
  }
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Alert msg={alertMsg}/>
        <Routes>
          <Route  path="/add-invoice" element={<InvoicePageWrapper onAlertChange={onAlertChange}/>} />
          <Route path="/invoiceList" element={<InvoiceList/>}/>
          <Route  path="/" element={<Index1 />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
