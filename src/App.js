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

import CreateQuotation from "./components/Quotation/CreateQuotationNew";
import SalesRegisterQuotation from "./components/Quotation/SalesRegisterNew";
import QuotationList from "./components/Quotation/QuotationListNew";
import ViewQuotation from "./components/Quotation/ViewQuotationsNew";
import ViewQuotationTriplet from "./components/Quotation/ViewQuotationTripletNew";


import CreateSupplierQuotation from "./components/SupplierQuotation/CreateSupplierQuotationNew";
import SalesRegisterSupplierQuotation from "./components/SupplierQuotation/SupplierSalesRegisterNew";
import SupplierQuotationList from "./components/SupplierQuotation/SupplierQuotationListNew";
import ViewSupplierQuotation from "./components/SupplierQuotation/ViewSupplierQuotationNew";
import ViewSupplierQuotationTriplet from "./components/SupplierQuotation/ViewSupplierQuotationTripletNew";

import SalesRegisterCustomerPO from "./components/CustomerPurchaseOrder/SalesRegisterNew";
import CreateCustomerPo from "./components/CustomerPurchaseOrder/CreateCustomerPoNew";
import CustomerPurchaseOrderList from "./components/CustomerPurchaseOrder/CustomerPurchaseOrderListNew";
import ViewCustomerPurchaseOrder from "./components/CustomerPurchaseOrder/ViewCustomerPurchaseOrderNew";
import ViewCustomerPurchaseOrderTriplet from "./components/CustomerPurchaseOrder/ViewCustomerPurchaseOrderTripletNew";


import CreateSupplierPo from "./components/SupplierPurchaseOrder/CreateSupplierPurchaseOrderNew";
import SalesRegisterSupplierPo from "./components/SupplierPurchaseOrder/SupplierPoSalesRegisterNew";
import SupplierPoList from "./components/SupplierPurchaseOrder/SupplierPurchaseOrderListNew";
import ViewSupplierPo from "./components/SupplierPurchaseOrder/ViewSupplierPoNew";
import ViewSupplierPoTriplet from "./components/SupplierPurchaseOrder/ViewSupplierPoTripletNew";


import CreateMaterialInward from "./components/MaterialInward/CreateMaterialInwardNew";
import SalesRegisterMaterialInward from "./components/MaterialInward/MaterialInwardSalesRegisterNew";
import MaterialInwardList from "./components/MaterialInward/MaterialInwardListNew";
import ViewMaterialInward from "./components/MaterialInward/ViewMaterialInwardNew";
import ViewMaterialInwardTriplet from "./components/MaterialInward/ViewMaterialInwardTripletNew";


import CreateMaterialOutward from "./components/MaterialOutward/CreateMaterialOutwardNew";
import SalesRegisterMaterialOutward from "./components/MaterialOutward/SalesRegisterNew";
import MaterialOutwardList from "./components/MaterialOutward/MaterialOutwardListNew";
import ViewMaterialOutward from "./components/MaterialOutward/ViewMaterialOutwardNew";
import ViewMaterialOutwardTriplet from "./components/MaterialOutward/ViewMaterialOutwardTripletNew";


import CreateDebitNote from "./components/DebitNote/CreateDebitNote";
import SalesRegisterDebitNote from "./components/DebitNote/SalesRegister";
import DebitNoteList from "./components/DebitNote/DebitNoteList";
import ViewDebitNote from "./components/DebitNote/viewDebitNote";
import ViewDebitNoteTriplet from "./components/DebitNote/ViewDebitNoteTriplet";


import CreateCreditNote from "./components/CreditNote/CreateCreditNote";
import SalesRegisterCreditNote from "./components/CreditNote/SalesRegister";
import CreditNoteList from "./components/CreditNote/CreditNoteList";
import ViewCreditNote from "./components/CreditNote/ViewCreditNote";
import ViewCreditNoteTriplet from "./components/CreditNote/ViewCreditNoteTriplet";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import GeneralSettings from "./components/Profile/GeneralSettings";
import UserSettings from "./components/Profile/UserSettings";

function App() {

  const BACKEND_SERVER="http://localhost:8080"

  function checkJwtTokenValidity(){
    var token=localStorage.getItem("token");

    if(token==null || token==undefined){
      return false;
    }
    
    var flag=false;


    var http=new XMLHttpRequest();

    var url=`${process.env.REACT_APP_LOCAL_URL}/validate`;

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
          <Route  path="/dashboard" element={<Dashboard/>} />
          <Route  path="/register" element={<Register/>} />
	        <Route path="/DocumentSequence" element={<DocumentSequence/>} />
          <Route path="/CreateQuotation" element={<CreateQuotation/>} />
          <Route path="/SalesRegisterQuotation" element={<SalesRegisterQuotation/>} />
          <Route path="/QuotationList" element={<QuotationList/>} /> 
          <Route path="/ViewQuotation" element={<ViewQuotation/>} /> 
          <Route path="/ViewQuotationTriplet" element={<ViewQuotationTriplet/>} /> 

          <Route path="/CreateSupplierQuotation" element={<CreateSupplierQuotation/>} />
          <Route path="/SalesRegisterSupplierQuotation" element={<SalesRegisterSupplierQuotation/>} />
          <Route path="/SupplierQuotationList" element={<SupplierQuotationList/>} /> 
          <Route path="/ViewSupplierQuotation" element={<ViewSupplierQuotation/>} /> 
          <Route path="/ViewSupplierQuotationTriplet" element={<ViewSupplierQuotationTriplet/>} /> 

          <Route path="/SalesRegisterCustomerPO" element={<SalesRegisterCustomerPO/>} />
          <Route path="/CreateCustomerPo" element={<CreateCustomerPo/>} />
          <Route path="/CustomerPoList" element={<CustomerPurchaseOrderList/>} /> 
          <Route path="/ViewCustomerPo" element={<ViewCustomerPurchaseOrder/>} /> 
          <Route path="/ViewCustomerPoTriplet" element={<ViewCustomerPurchaseOrderTriplet/>} />


          <Route path="/CreateSupplierPo" element={<CreateSupplierPo/>} />
          <Route path="/SalesRegisterSupplierPo" element={<SalesRegisterSupplierPo/>} />
          <Route path="/SupplierPoList" element={<SupplierPoList/>} /> 
          <Route path="/ViewSupplierPo" element={<ViewSupplierPo/>} /> 
          <Route path="/ViewSupplierPoTriplet" element={<ViewSupplierPoTriplet/>} /> 



          <Route path="/CreateMaterialInward" element={<CreateMaterialInward/>} />
          <Route path="/SalesRegisterMaterialInward" element={<SalesRegisterMaterialInward/>} />
          <Route path="/MaterialInwardList" element={<MaterialInwardList/>} /> 
          <Route path="/ViewMaterialInward" element={<ViewMaterialInward/>} /> 
          <Route path="/ViewMaterialInwardTriplet" element={<ViewMaterialInwardTriplet/>} /> 


          <Route path="/CreateMaterialOutward" element={<CreateMaterialOutward/>} />
          <Route path="/SalesRegisterMaterialOutward" element={<SalesRegisterMaterialOutward/>} />
          <Route path="/MaterialOutwardList" element={<MaterialOutwardList/>} /> 
          <Route path="/ViewMaterialOutward" element={<ViewMaterialOutward/>} /> 
          <Route path="/ViewMaterialOutwardTriplet" element={<ViewMaterialOutwardTriplet/>} /> 




          <Route path="/CreateDebitNote" element={<CreateDebitNote/>} />
          <Route path="/SalesRegisterDebitNote" element={<SalesRegisterDebitNote/>} />
          <Route path="/DebitNoteList" element={<DebitNoteList/>} /> 
          <Route path="/ViewDebitNote" element={<ViewDebitNote/>} /> 
          <Route path="/ViewDebitNoteTriplet" element={<ViewDebitNoteTriplet/>} /> 

          <Route path="/CreateCreditNote" element={<CreateCreditNote/>} />
          <Route path="/SalesRegisterCreditNote" element={<SalesRegisterCreditNote/>} />
          <Route path="/CreditNoteList" element={<CreditNoteList/>} /> 
          <Route path="/ViewCreditNote" element={<ViewCreditNote/>} /> 
          <Route path="/ViewCreditNoteTriplet" element={<ViewCreditNoteTriplet/>} /> 


          <Route path="/generalSettings" element={<GeneralSettings/>} /> 
          <Route path="/userSettings" element={<UserSettings/>} /> 

  {/* <Route path="/" element={<Login/>} /> */}
          <Route path="/" element={<Landing/>} />
        </Routes>
        )
        :
        <Routes>

        {/* <Route  path="/*" element={<Login/>} /> */}
        {/* <Navigate replace to="/" /> */}
        {/* <Route path="/" element={<Login/>} /> */}

        <Route path="/" element={<Landing/>} />
        <Route path="/*" element={<Navigate replace to="/" />} />
        {/* <Redirect to='/login'/> */}
        </Routes>
        }
        </BrowserRouter>
    </>
  );
}

export default App;
