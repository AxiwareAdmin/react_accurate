import "./App.css";
import Navbar from "./components/Navbar";
import Index1 from "./components/Index12";
import {React,useState} from "react";
import {Routes, Route } from "react-router-dom";
import InvoicePageWrapper from "./components/InvoicePageWrapper";
import InvoiceList from "./components/invoiceList";
import Alert from "./components/alert";
import { BrowserRouter } from "react-router-dom";
import ViewInvoice from "./components/view-Invoice";
import SalesRegister from "./components/salesRegister";
import InvoicesPaid from "./components/InvoicesPaid";
import InvoicesOverDue from "./components/InvoicesOverDue";
import InvoicesDraft from "./components/InvoicesDraft";
import InvoicesRecurring from "./components/invoicesRecurring";
import InvoicesCancelled from "./components/InvoicesCancelled";
import DocumentSequence from "./components/Manage/DocumentSequence";

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
          <Route path="/viewInvoice" element={<ViewInvoice/>}/>
          <Route path="/salesRegister" element={<SalesRegister/>} />
          <Route path="/InvoicesPaid" element={<InvoicesPaid/>} />
          <Route path="/InvoicesOverDue" element={<InvoicesOverDue/>} />
          <Route path="/InvoicesDraft" element={<InvoicesDraft/>} />
          <Route path="/invoicesRecurring" element={<InvoicesRecurring/>} />
          <Route path="/InvoicesCancelled" element={<InvoicesCancelled/>} />
          <Route path="/DocumentSequence" element={<DocumentSequence/>} />
          <Route  path="/" element={<Index1 />} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
