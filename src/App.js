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
import ViewInvoiceTriplet from "./components/ViewInvoiceTriplet";
import SalesRegister from "./components/SalesRegister";
import InvoicesPaid from "./components/InvoicesPaid";
import InvoicesOverDue from "./components/InvoicesOverDue";
import InvoicesDraft from "./components/InvoicesDraft";
import InvoicesRecurring from "./components/invoicesRecurring";
import InvoicesCancelled from "./components/InvoicesCancelled";
import Login from "./components/Login";
import PurchaseList from "./components/PurchaseList";
import PurchaseRegister from "./components/PurchaseRegister"
import ViewPurchase from "./components/ViewPurchase"
import Register from "./components/Register";
import DocumentSequence from "./components/Manage/DocumentSequence";
import PurchaseCreate from "./components/PurchaceCreate"
import ViewPurchaseTriplet from './components/ViewPurchaseTriplet'
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import SalesCashRegister from "./components/SalesCashRegister";
import CashInvoiceList from "./components/CashInvoiceList";
import CreateQuotation from "./components/Quotation/createQuotation";
import SalesRegisterQuotation from "./components/Quotation/SalesRegister";
import QuotationList from "./components/Quotation/QuotationList";
import ViewQuotation from "./components/Quotation/ViewQuotation";
import ViewQuotationTriplet from "./components/Quotation/ViewQuotationTriplet";


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
          <Route  path="/add-purchase" element={<PurchaseCreate/>} />
          <Route path="/invoiceList" element={<InvoiceList/>}/>
          <Route path="/cashInvoices" element={<CashInvoiceList/>}/>
          <Route path="/purchaseList" element={<PurchaseList/>}/>
          <Route path="/viewInvoiceTriplet" element={<ViewInvoiceTriplet/>}/>
          <Route path="/viewPurchaseTriplet" element={<ViewPurchaseTriplet/>}/>
          <Route path="/viewInvoice" element={<ViewInvoice/>}/>
          <Route path="/viewPurchase" element={<ViewPurchase/>}/>
          <Route path="/salesRegister" element={<SalesRegister/>} />
          <Route path="/salesCashRegister" element={<SalesCashRegister/>} />
          <Route path="/purchaseRegister" element={<PurchaseRegister/>} />
          <Route path="/InvoicesPaid" element={<InvoicesPaid/>} />
          <Route path="/InvoicesOverDue" element={<InvoicesOverDue/>} />
          <Route path="/InvoicesDraft" element={<InvoicesDraft/>} />
          <Route path="/invoicesRecurring" element={<InvoicesRecurring/>} />
          <Route path="/InvoicesCancelled" element={<InvoicesCancelled/>} />
          <Route  path="/dashboard" element={<Index1 />} />
          <Route  path="/register" element={<Register/>} />
	        <Route path="/DocumentSequence" element={<DocumentSequence/>} />
          <Route path="/CreateQuotation" element={<CreateQuotation/>} />
          <Route path="/SalesRegisterQuotation" element={<SalesRegisterQuotation/>} />
          <Route path="/QuotationList" element={<QuotationList/>} /> 
          <Route path="/ViewQuotation" element={<ViewQuotation/>} /> 
          <Route path="/ViewQuotationTriplet" element={<ViewQuotationTriplet/>} /> 
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
