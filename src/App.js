import "./App.css";
import Navbar from "./components/Navbar";
import Index1 from "./components/Index12";
import {React,useState} from "react";
import {Routes, Route, useLocation } from "react-router-dom";
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
import Login from "./components/Login";
import Register from "./components/Register";
import DocumentSequence from "./components/Manage/DocumentSequence";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";


function App() {

  const BACKEND_SERVER="http://localhost:8080"

  function checkJwtTokenValidity(){
    debugger;
    var token=localStorage.getItem("token");

    if(token==null || token==undefined){
      return false;
    }
    
    var flag=false;


    var http=new XMLHttpRequest();

    var url=BACKEND_SERVER+"/validate";

    var params='token='+token;

    http.open('POST',url,false);

    http.setRequestHeader('Content-type','application/x-www-form-urlencoded');

    http.onreadystatechange=function(){
      console.log('http.responseText:'+http.responseText);
      console.log('http.responseText.res'+JSON.parse(http.responseText).res);
      if(JSON.parse(http.responseText).res='success') flag=true;
    }
    
     http.send(params);




    return flag;
  }

  return (
    <>
    
    <BrowserRouter>
       
        {
        checkJwtTokenValidity()===true?(
        <Routes>
          <Route  path="/add-invoice" element={<InvoicePageWrapper/>} />
          <Route path="/invoiceList" element={<InvoiceList/>}/>
          <Route path="/viewInvoice" element={<ViewInvoice/>}/>
          <Route path="/salesRegister" element={<SalesRegister/>} />
          <Route path="/InvoicesPaid" element={<InvoicesPaid/>} />
          <Route path="/InvoicesOverDue" element={<InvoicesOverDue/>} />
          <Route path="/InvoicesDraft" element={<InvoicesDraft/>} />
          <Route path="/invoicesRecurring" element={<InvoicesRecurring/>} />
          <Route path="/InvoicesCancelled" element={<InvoicesCancelled/>} />
          <Route  path="/dashboard" element={<Index1 />} />
          <Route  path="/register" element={<Register/>} />
	        <Route path="/DocumentSequence" element={<DocumentSequence/>} />
          <Route  path="/" element={<Login/>} />
       
        </Routes>
        )
        :
        <Routes>

        {/* <Route  path="/*" element={<Login/>} /> */}
        {/* <Navigate replace to="/" /> */}
        <Route path="/" element={<Login/>} />
        <Route path="/*" element={<Navigate replace to="/" />} />
        {/* <Redirect to='/login'/> */}
        </Routes>
        }
        </BrowserRouter>
    </>
  );
}

export default App;
