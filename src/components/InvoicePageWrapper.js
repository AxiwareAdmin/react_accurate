//invoice wrapper

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useAsyncError } from "react-router-dom";
export default function InvoicePageWrapper(props) {
  const [productUnits, setProductUnits] = useState([
    {
      id: 1,
      productName: null,
      description: null,
      hsnSac:0,
      tax:0,
      quantity: 0,
      price: 0,
      amount: 0,
      discount: null,
    },
  ]);

  const [productCount, setProductCount] = useState(1);
  function prodSelectOnChange(event) {
    console.log(event.target.value);
    axios
      .get("http://localhost:8081/erp/invoiceproduct/" + event.target.value)
      .then((res) => {
        var td = event.target.parentElement;
        var productId = td.querySelector("#productId").value;
        td = td.parentElement;
        var description = td.querySelector("#description").value;
        var hsnSac=td.querySelector("#hsnSac").value;
        var tax=td.querySelector("#tax").value;
        var quantity = td.querySelector("#quantity").value;
        var price = td.querySelector("#price").value;
        var discount = td.querySelector("#discount").value;
        var amount = td.querySelector("#amount").value;
        var productName = event.target.querySelector("option:checked").text;

        let tempProdUnits = [...productUnits];

        tempProdUnits.map((prodUnit) => {
          if (prodUnit.id == productId) {
            prodUnit.description=description;
            prodUnit.hsnSac=hsnSac;
            prodUnit.tax=tax;
            prodUnit.quantity = quantity;
            prodUnit.price = price;
            prodUnit.discount = discount;
            prodUnit.amount = amount;
            prodUnit.productName = productName;
          }
        });

        setProductUnits(tempProdUnits);

        setTotalAmt(calculateTotalAmt());

       
       

      });
  }



  function getProductCount() {
    return productCount;
  }

  function setProdCount(num) {
    var temp = {
      id: num,
      productName: null,
      description: null,
      hsnSac:0,
      tax:0,
      quantity: 0,
      price: 0,
      amount: 0,
      discount: null
    };

 
    // alert([...productUnits].push(temp));
    setProductCount(num);
    setProductUnits([...productUnits, temp]);
    console.log(productUnits.length);
  }

  const roundNum = (num) => {
    num = num * 100;
    num = Math.round(num);
    num = num / 100;

    return num;
  };

  // function testRegex(a){
  //   var reg = /^-?\d+\.?\d*$/;
  //   var regxp=new RegExp(reg);
  //   return regxp.test(a);
  // }

  // const checkRegex=(num)=>{
  //   if(num==null || num==undefined || num=='' || !testRegex(num)) return false;
  //   return true;
  // }

  const calculateTotalAmt = () => {
    let totalAmt = 0;
    let tempProdUnits = [...productUnits];
    tempProdUnits.map((product) => {
      let quantity = product.quantity;
      if (
        quantity == null ||
        quantity == undefined ||
        quantity == "" ||
        product.price == null ||
        product.price == "" ||
        product.amount == null ||
        product.amount == "" ||
        product.discount == null ||
        product.discount == "" ||
        product.productName == null ||
        product.productName == "--Select--"
      )
        return 0;

      let price = roundNum(product.price);
      let discount = roundNum(product.discount);
      product.amount = roundNum(
        quantity * price - quantity * price * (discount / 100)
      );

      totalAmt = roundNum(totalAmt + product.amount);
    });
    return totalAmt;
  };
  const [totalAmt, setTotalAmt] = useState(calculateTotalAmt());

  const onPriceChange = (event) => {
    var tr = event.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = tr.querySelector("#quantity").value;

    let price = tr.querySelector("#price").value;
    let discount = tr.querySelector("#discount").value;
    let amount = tr.querySelector("#amount").value;

    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.quantity = quantity;
        prodUnit.price = price;
        prodUnit.discount = discount;
        prodUnit.amount = amount;
      }
    });

    setProductUnits(tempProdUnits);
    setTotalAmt(calculateTotalAmt());
  };

  const onDiscountChange = (event) => {
    var tr = event.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = tr.querySelector("#quantity").value;

    let price = tr.querySelector("#price").value;
    let discount = tr.querySelector("#discount").value;
    let amount = tr.querySelector("#amount").value;

    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.quantity = quantity;
        prodUnit.price = price;
        prodUnit.discount = discount;
        prodUnit.amount = amount;
      }
    });

    setProductUnits(tempProdUnits);
    setTotalAmt(calculateTotalAmt());
  };

  const onQuantityChange = (event) => {
    var tr = event.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = event.target.value;

    let price = tr.querySelector("#price").value;
    let discount = tr.querySelector("#discount").value;
    let amount = tr.querySelector("#amount").value;

    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.quantity = quantity;
        prodUnit.price = price;
        prodUnit.discount = discount;
        prodUnit.amount = amount;
      }
    });

    setProductUnits(tempProdUnits);

    setTotalAmt(calculateTotalAmt());
  };

  const removeTr = (prodTrId) => {
    const index = productUnits.findIndex((prod) => prod.id == prodTrId); //use id instead of index
    if (index > -1) {
      //make sure you found it
      setProductUnits([
        ...productUnits.slice(0, index),
        ...productUnits.slice(index + 1),
      ]);
    }
  };

  function selectCustomer(e) {
    e.preventDefault();
    var a = document.querySelector("#customer option:checked");
    var customerId = a.value;

    axios.get("http://localhost:8081/erp/invoices").then((res) => {
      let invoiceLen = res.data.length;
      let invoiceNum = "S/" + getCurrentFinancialYear() + "/" + invoiceLen;
      console.log("invoice:" + invoiceNum);
      setInvoiceNumber(invoiceNum);
    });

    axios
      .get("http://localhost:8081/erp/customer/" + customerId)
      .then((res) => {
        var address1 = res.data.address1;
        var address2 = res.data.address2;

        if (address1 != null && address1 != undefined && address1 != "")
          setFromAddr1(address1);

        if (address2 != null && address2 != undefined && address2 != "")
          setFromAddr2(address2);

        var shippingAddr1 = res.data.shippingAddress1;

        var shippingAddr2 = res.data.shippingAddress2;

        setShippingAddress1(shippingAddr1);
        setShippingAddress2(shippingAddr2);

        let poNum = res.data.poNumber;
        if (poNum != null && poNum != undefined && poNum != "")
          setPoNumber(poNum);
      });
  }

  useEffect(() => {
    console.log("produnit changed" + productUnits);
    setTotalAmt(calculateTotalAmt());
    setTotalDiscount(parseFloat(roundNum(discountInRuppes))+(totalAmt*parseFloat(roundNum(discountInPercentage))/100));
    let tempTotalTaxableAmt=parseFloat(roundNum(totalAmt))+parseFloat(roundNum(transportCharge))+parseFloat(roundNum(otherCharge))-parseFloat(roundNum(totalDiscount))
    setTotalTaxableAmt(tempTotalTaxableAmt)
  }, [productUnits]);





  useEffect(() => {
    window.onDueDateChange=(e)=>{
      onDueDateChange(e);
    }

    window.onChallanDateChange=(e)=>{
      onChallanDateChange(e);
    }

    window.onPoDateChange=(e)=>{
      onPoDateChange(e);
    }

    window.onInvoiceDateChange=(e)=>{
      onInvoiceDateChange(e);
    }
    window.selectCustomer = (e) => {
      selectCustomer(e);
    };
    window.onQuantityChange = (e) => {
      onQuantityChange(e);
    };

    window.removeTr = (prodTrId) => {
      removeTr(prodTrId);
    };

    window.onDiscountChange = (e) => {
      onDiscountChange(e);
    };

    window.onPriceChange = (e) => {
      onPriceChange(e);
    };

    window.prodSelectOnChange = (e) => {
      prodSelectOnChange(e);
    };

    window.setProdCount = (num) => {
      setProdCount(num);
    };

    window.getProductCount = () => getProductCount();
  });
  useEffect(() => {
    // document.querySelectorAll("script").forEach(e => e.remove());
    // document.querySelectorAll("script[src]").forEach(a=>a.remove())
    // document.querySelectorAll(".sidebar-overlay").forEach(e => e.remove());
    axios.get("http://localhost:8081/erp/customers").then((res) => {
      console.log(res.data);
      res.data.map((a) => {
        // var label = document.createElement("label");
        // label.className = "custom_check w-100";
        // var span = document.createElement("span");
        // span.className = "checkmark";
        // var input = document.createElement("input");
        // input.type = "checkbox";
        // input.name = "username";

        // var hiddenInput = document.createElement("input");
        // hiddenInput.type = "hidden";
        // hiddenInput.value = a.customerId;
        // var customerName = document.createTextNode(a.customerName);

        // label.appendChild(input);
        // label.appendChild(span);
        // label.appendChild(customerName);
        // label.appendChild(hiddenInput);
        var option = document.createElement("option");
        option.value = a.customerId;
        option.append(document.createTextNode(a.customerName));
        document.querySelector("#customer").append(option);

        // var str='<label className="custom_check w-100"><input type="checkbox" name="username" /><span className="checkmark"></span>'+a.customerName+'</label>'
        // document.getElementById("customer").appendChild(label);
      });
    });

    axios.get("http://localhost:8081/erp/invoiceproducts").then((res) => {
      res.data.map((product) => {
        var option = document.createElement("option");
        option.value = product.invoiceProductId;
        option.append(document.createTextNode(product.productName));
        document.querySelector(".prodListSelect").append(option);
      });
    });

    const script11 = document.createElement("script");
    script11.src = "/assets/js/jquery-3.6.0.min.js";
    script11.async = false;

    document.body.appendChild(script11);

    const script8 = document.createElement("script");
    script8.src = "/assets/plugins/moment/moment.min.js";
    script8.async = false;

    document.body.appendChild(script8);

    const script10 = document.createElement("script");
    script10.src = "/assets/js/bootstrap.bundle.min.js";
    script10.async = false;

    document.body.appendChild(script10); //can be uncommented

    const script9 = document.createElement("script");
    script9.src = "/assets/js/jquery.slimscroll.min.js";
    script9.async = false;

    document.body.appendChild(script9); //can be uncommented

    const script7 = document.createElement("script");
    script7.src = "/assets/js/bootstrap-datetimepicker.min.js";
    script7.async = false;

    document.body.appendChild(script7); //can be uncommented

    const script6 = document.createElement("script");
    script6.src = "/assets/js/jquery.dataTables.min.js";
    script6.async = false;

    document.body.appendChild(script6); //can be uncommented

    const script5 = document.createElement("script");
    script5.src = "/assets/js/dataTables.bootstrap4.min.js";
    script5.async = false;

    document.body.appendChild(script5); //can be uncommented

    const script4 = document.createElement("script");
    script4.src = "/assets/js/feather.min.js";
    script4.async = false;

    document.body.appendChild(script4); //can be uncommented

    const script3 = document.createElement("script");
    script3.src = "/assets/js/select2.min.js";
    script3.async = false;

    document.body.appendChild(script3); //can be uncommented

    const script2 = document.createElement("script");
    script2.src = "/assets/js/theme-settings.js";
    script2.async = false;

    document.body.appendChild(script2); //can be uncommented

    const script = document.createElement("script");
    script.src = "/assets/js/app.js";
    script.async = false;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script4);
      document.body.removeChild(script5);
      document.body.removeChild(script6);
      document.body.removeChild(script7);
      document.body.removeChild(script8);
      document.body.removeChild(script9);
      document.body.removeChild(script10);
      //   document.body.removeChild(script11);
    };
  }, []);

  const [fromAddr1, setFromAddr1] = useState("");
  const [fromAddr2, setFromAddr2] = useState("");

  const [shippingAddress1, setShippingAddress1] = useState("");

  const [shippingAddress2, setShippingAddress2] = useState("");

  const [poNumber, setPoNumber] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [transportCharge, setTransportCharge]=useState(0);

  const [otherCharge,setOtherCharge]=useState(0);

  const [discountInRuppes,setDiscountInRupees]=useState(0);

  const [discountInPercentage, setDiscountInPercentage]=useState(0);

  const [totalDiscount,setTotalDiscount]=useState(0);

  const[totalTaxableAmt,setTotalTaxableAmt]=useState(0);

  const [finalAmt,setFinalAmt]=useState(0); 

  const [gstPercentageArr,setGstPercentageArr]=useState([]);

  const [gstPercentageVal,setGstPercentageVal]=useState([]);

  const [invoiceDate,setInvoiceDate]=useState("");

  const [poDate,setPoDate]=useState("");

  const [challanNumber,setChallanNumber]=useState("");

  const [challanDate,setChallanDate]=useState("");

  const [paymentTerms,setPaymentTerms]=useState("");

  const [dueDate,setDueDate]=useState("");

  const [transportMode,setTransportMode]=useState("");

  const [vehicleNumber,setVehicleNumber]=useState("");
useEffect(()=>{
    debugger;
    document.querySelector(".gstContainer").innerHTML='';
    let tempGstPercentageArr=[];
    let tempGstPercentageVal=[];
    productUnits.map((prodUnit)=>{
      if(prodUnit.productName==undefined || prodUnit.productName==null) return;

      let index=tempGstPercentageArr.indexOf(prodUnit.tax);
      if(index<0){
        tempGstPercentageArr=[...tempGstPercentageArr,prodUnit.tax];
        tempGstPercentageVal=[...tempGstPercentageVal,roundNum(prodUnit.amount*prodUnit.tax/100)]
      }
      else{
        tempGstPercentageVal[index]=tempGstPercentageVal[index]+roundNum(prodUnit.amount*prodUnit.tax/100);
      }
  })

  setGstPercentageArr(tempGstPercentageArr);
  setGstPercentageVal(tempGstPercentageVal);
},[totalAmt])

    useEffect(()=>{
      debugger;
     

      gstPercentageArr.map((elem)=>{
        let index=gstPercentageArr.indexOf(elem);

        let divElem=document.createElement("div");
        divElem.className="invoice-total-footer";
        let h4Elem=document.createElement("h4");
        let aElem=document.createElement("a");
        
        h4Elem.style="font-family:Times New Roman, Times, serif"
  
        aElem.style="color:grey";
  
        let textElem=document.createTextNode("SGST "+(parseFloat(elem)/2)+" %");
  
        aElem.appendChild(textElem);

        let spanElem=document.createElement("span");

        textElem=document.createTextNode(roundNum(roundNum(parseFloat(gstPercentageVal[index]))/2));

        spanElem.appendChild(textElem);

        spanElem.style='color:grey'
  
        h4Elem.appendChild(aElem);

        h4Elem.appendChild(spanElem)
  
        divElem.appendChild(h4Elem);

        document.querySelector(".gstContainer").append(divElem);

         divElem=document.createElement("div");
        divElem.className="invoice-total-footer";
         h4Elem=document.createElement("h4");
         aElem=document.createElement("a");
        
        h4Elem.style="font-family:Times New Roman, Times, serif"
  
        aElem.style="color:grey";
  
         textElem=document.createTextNode("CGST "+(parseFloat(elem)/2)+" %");

         
         
         aElem.appendChild(textElem);
         
        spanElem=document.createElement("span");

         textElem=document.createTextNode(roundNum(roundNum(parseFloat(gstPercentageVal[index]))/2));

         spanElem.appendChild(textElem);

         spanElem.style='color:grey'

        h4Elem.appendChild(aElem);

        h4Elem.appendChild(spanElem)
  
        divElem.appendChild(h4Elem);

        document.querySelector(".gstContainer").append(divElem);



      })
   

    },[gstPercentageArr,gstPercentageVal])

    useEffect(()=>{

      let totalGstVal=0;

      gstPercentageVal.map(elem=>{
        totalGstVal=roundNum(roundNum(parseFloat(totalGstVal))+roundNum(parseFloat(elem)))
      })
     
      setFinalAmt(roundNum(parseFloat(totalTaxableAmt)+totalGstVal))

    },[totalTaxableAmt])



  useEffect(()=>{
    let tempTotalTaxableAmt=parseFloat(roundNum(totalAmt))+parseFloat(roundNum(transportCharge))+parseFloat(roundNum(otherCharge))-parseFloat(roundNum(totalDiscount))
    setTotalTaxableAmt(tempTotalTaxableAmt)

  },[transportCharge,otherCharge,totalDiscount])

  useEffect(()=>{
   
    setTotalDiscount(parseFloat(roundNum(discountInRuppes))+(totalAmt*parseFloat(roundNum(discountInPercentage))/100));
  },[discountInPercentage,discountInRuppes])

  const onTransportChargeChange=(e)=>{
    setTransportCharge(e.target.value);
  }

  const onOtherChargeChange=(e)=>{
    setOtherCharge(e.target.value);

  }

  const onDiscountInPercentageChange=(e)=>{
    setDiscountInPercentage(e.target.value);
    
  }

  const onDiscountInRuppesChange=(e)=>{
    setDiscountInRupees(e.target.value);
   
  }

  function getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if (today.getMonth() + 1 <= 3) {
      fiscalyear = today.getFullYear() - 1 + "-" + today.getFullYear();
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1);
    }
    return fiscalyear;
  }

  const saveInvoice=(e)=>{
    e.preventDefault();
    let totalSgst=0;
    let totalCgst=0;

    gstPercentageVal.map(elem=>{
      totalSgst=roundNum(totalSgst+roundNum(parseFloat(elem)/2));
      totalCgst=roundNum(totalCgst+roundNum(parseFloat(elem)/2));
    })

    let invoiceData={
      invoiceNo:invoiceNumber,
      sgstValue:totalSgst,
      cgstValue:totalCgst,
      taxableValue:totalTaxableAmt,
      invoiceValue:finalAmt,
      transportCharges:transportCharge,
      additionalCharges:otherCharge,
      discount:discountInRuppes,
      otherDiscount:(roundNum(totalAmt*discountInPercentage/100)),
      shippingAddress:shippingAddress1+shippingAddress2,
      billingAddress:fromAddr1+fromAddr2,
      poNumber:poNumber,
      customerName:document.querySelector("#customer option:checked").innerText,
      invoiceDate:invoiceDate,
      poDate:poDate,
      challanNumber:challanNumber,
      challanDate:challanDate,
      paymentTerms:paymentTerms,
      dueDate:dueDate,
      transportMode:transportMode,
      vehicleNumber:vehicleNumber
    }

    console.log(invoiceData)

    axios.post('http://localhost:8081/erp/saveInvoice', invoiceData,{
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(function (response) {
      console.log(response)
      if(response!=null && response.data.res=='success'){
      props.onAlertChange("Invoice created successfully!!")

      setTimeout(()=>{
        props.onAlertChange(null)
      },2000)

      }
      else
        alert("There is some issue created invoice. kindly check wherether all the data is entered or not.")
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onInvoiceDateChange=(e)=>{
    setInvoiceDate(e.target.value)
  }

  const onPoDateChange=(e)=>{
    setPoDate(e.target.value)
  }

  const onChallanDateChange=(e)=>{
    setChallanDate(e.target.value);
  }

  const onDueDateChange=(e)=>{
    setDueDate(e.target.value)
  }

  const onChallanNumberChange=(e)=>{
    setChallanNumber(e.target.value);
  }

  const onPaymentTermsChange=(e)=>{
    setPaymentTerms(e.target.value);
  }

  const onTransportModeChange=(e)=>{
    setTransportMode(e.target.value)
  }

  const onVehicleNumberChange=(e)=>{
    setVehicleNumber(e.target.value)
  }
  return (
    <div>
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header invoices-page-header">
            <div className="row align-items-center">
              <div className="col">
                <ul className="breadcrumb invoices-breadcrumb">
                  <li className="breadcrumb-item invoices-breadcrumb-item">
                    <a href="invoices.html">
                      <i className="fa fa-chevron-left"></i> Back to Invoice
                      List
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-auto">
                <div className="invoices-create-btn">
                  <a
                    className="invoices-preview-link"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#invoices_preview"
                  >
                    <i className="fa fa-eye"></i> Preview
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_invoices_details"
                    className="btn delete-invoice-btn"
                  >
                    Delete Invoice
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#save_invocies_details"
                    className="btn save-invoice-btn"
                  >
                    Save Draft
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card invoices-add-card">
                <div className="card-body">
                  <form className="invoices-form">
                    <div className="invoices-main-form">
                      <div className="row">
                        <div className="col-xl-4 col-md-6 col-sm-12 col-12">
                          <p class="mg-b-10">Customer Name</p>
                          <select
                            class="form-control select2"
                            name="product"
                            id="customer"
                          >
                            <option value="-1">Select Customer</option>
                          </select>
                          {/* <div className="form-group"> */}
                          {/* <label>Customer Name</label> */}

                          {/* <div className="multipleSelection">
                              <div className="selectBox">
                                <p className="mb-0">Select Customer</p>
                                <span className="down-icon">
                                  <i data-feather="chevron-down"></i>
                                </span>
                              </div>
                              <div id="checkBoxes-one">
                                <p className="checkbox-title">
                                  Customer Search
                                </p>
                                <div className="form-custom">
                                  <input
                                    type="text"
                                    className="form-control bg-grey"
                                    placeholder="Enter Customer Name"
                                  />
                                </div>
                                <div className="selectBox-cont"></div>
                                <button
                                  type="submit"
                                  className="btn w-100 btn-primary"
                                  onClick={selectCustomer}
                                >
                                  Apply
                                </button>
                                <button
                                  type="reset"
                                  className="btn w-100 btn-grey"
                                >
                                  Reset
                                </button>
                              </div>
                            </div> */}
                          {/* </div> */}

                          {/* <div className="inovices-month-info"> */}
                          <div className="form-group mt-5">
                            <label className="custom_check w-100">
                              <input
                                type="checkbox"
                                id="enableTax"
                                name="invoice"
                              />
                              <span className="checkmark"></span> Enable tax
                            </label>
                            <label className="custom_check w-100">
                              <input
                                type="checkbox"
                                id="chkYes"
                                name="invoice"
                              />
                              <span className="checkmark"></span> Recurring
                              Invoice
                            </label>
                          </div>
                          {/*<div id="show-invoices">
                               <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <select className="select">
                                      <option>By month</option>
                                      <option>March</option>
                                      <option>April</option>
                                      <option>May</option>
                                      <option>June</option>
                                      <option>July</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Months"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>*/}
                          {/* </div>  */}
                        </div>

                        <div className="col-xl-3 col-md-12 col-sm-12 col-12">
                          <input type="hidden" />
                        </div>

                        <div className="col-xl-5 col-md-6 col-sm-12 col-12">
                          <h4 className="invoice-details-title">
                            Invoice details
                          </h4>
                          <div className="invoice-details-box">
                            <div className="invoice-inner-head">
                              <span>
                                Invoice No.{" "}
                                <a href="view-invoice.html">{invoiceNumber}</a>
                              </span>
                              <br />
                              <br />
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                Invoice Date.{" "}
                                <input
                                  className="form-control datetimepicker"
                                  type="text"
                                  placeholder="Select Date"
                                  value={invoiceDate}
                                  id="invoiceDate"
                                  style={{ border: "none", width: 120,color: "#9a55ff"}}
                                />
                              </span>
                            </div>
                            <div className="invoice-inner-footer">
                              <div className="row align-items-center">
                                <div className="col-lg-6 col-md-6">
                                  {/* <div className="invoice-inner-date">
                                    <span>
                                      Date{" "}
                                      <input
                                        className="form-control datetimepicker"
                                        type="text"
                                        placeholder="15/02/2022"
                                      />
                                    </span>
                                  </div> */}
                                  <div className="invoice-inner-date">
                                    <div className="form-group">
                                      Po Number
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter Reference Number"
                                        value={poNumber}
                                        style={{
                                          border: "1px solid #9a55ff",
                                          width: "100%",
                                          padding: "10px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="invoice-inner-date invoice-inner-datepic">
                                    <div className="form-group">
                                      <label>PO Date</label>
                                      <br />
                                      <input
                                        className="form-control datetimepicker"
                                        type="text"
                                        placeholder="Select"
                                        value={poDate}
                                        id="poDate"
                                        style={{
                                          border: "1px solid #9a55ff",
                                          width: "100%",
                                          padding: "10px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-item">
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                          <div className="invoice-info">
                            <strong className="customer-text">
                              Billing Address{" "}
                              <a className="small" href="edit-invoice.html">
                                Edit Address
                              </a>
                            </strong>
                            <p
                              id="fromAddress"
                              className="invoice-details invoice-details-two"
                            >
                              {fromAddr1} <br />
                              {fromAddr2}
                              <br />
                            </p>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                          <div className="invoice-info">
                            <strong className="customer-text">
                              Shipping Address
                            </strong>
                            <p
                              id="toAddress"
                              className="invoice-details invoice-details-two"
                            >
                              {shippingAddress1} <br />
                              {shippingAddress2} <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="invoice-details-box">
<div class="invoice-inner-footer">
<div class="row align-items-center">

<div class="col-lg-2 col-md-4">
<div class="invoice-inner-date">
<div class="form-group">
<label>Challan No.</label>
<input value={challanNumber} onChange={onChallanNumberChange}  style ={{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} class="form-control" type="text" />
</div>
</div>
</div>
<div class="col-lg-2 col-md-4">
<div class="invoice-inner-date invoice-inner-datepic">
<div class="form-group">
<label for="">Challan Date</label>
<input class="form-control datetimepicker" style ={{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} id="challanDate" type="text"  placeholder="Select"/>
</div>
</div>
</div>

<div class="col-lg-2 col-md-4">
<div class="invoice-inner-date">
<div class="form-group">
<label>Payment Terms</label>
<input value={paymentTerms} onChange={onPaymentTermsChange}  style = {{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} class="form-control" type="text" />
</div>
</div>
</div>
<div class="col-lg-2 col-md-4">
<div class="invoice-inner-date invoice-inner-datepic">
<div class="form-group">
<label for="">Due Date</label>
<input class="form-control datetimepicker" style ={{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} id="dueDate" type="text"  placeholder="Select"/>
</div>
</div>
</div>

<div class="col-lg-2 col-md-4">
<div class="invoice-inner-date">
<div class="form-group">
<label>Transport Mode</label>
<input value={transportMode} onChange={onTransportModeChange}  style ={{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} class="form-control" type="text" />
</div>
</div>
</div>
<div class="col-lg-2 col-md-4">
<div class="form-group">
<label for="">Vehicle No.</label>
<input value={vehicleNumber} onChange={onVehicleNumberChange}  style ={{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} class="form-control" type="text" />
</div>
</div>
</div>
</div>
</div>





                    <div className="invoice-add-table">
                      <h4>Item Details</h4>
                      <div className="table-responsive">
                        <table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Product Description</th>
                              <th>HSN/SAC</th>
                              <th>Quantity</th>
                              <th>Rate</th>
                              <th>Discount</th>
                              <th>Amount</th>
                              <th>Tax</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="add-row">
                              <td>
                                {/* <select class="form-select selectpicker form-select-lg mb-1" aria-label=".form-select-lg example">
								<option selected>Open this select menu</option>
  								<option value="1">One</option>
  								<option value="2">Two</option>
  								<option value="3">Three</option>
							</select> */}
                                <select
                                  class="prodListSelect prodListSelect1"
                                  name="state"
                                >
                                  <option value="-1">--Select--</option>
                                </select>
                                <input id="productId" type="hidden" value={1} />
                              </td>
                              <td>
                                <input
                                  id="description"
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td>
                                <input
                                  id="hsnSac"
                                  type="text"
                                  className="form-control quantity1"
                                />
                              </td>
                              <td>
                                <input
                                  id="quantity"
                                  type="text"
                                  className="form-control quantity1"
                                />
                              </td>
                              <td>
                                <input
                                  id="price"
                                  type="text"
                                  className="form-control price1"
                                />
                              </td>
                              <td>
                                <input
                                  id="discount"
                                  type="text"
                                  className="form-control discount1"
                                />
                              </td>
                              <td>
                                <input
                                  id="amount"
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                              <td>
                                <input
                                  id="tax"
                                  type="text"
                                  className="form-control"
                                />
                              </td>
                             
                             
                              <td className="add-remove text-end">
                                <a
                                  href="javascript:void(0);"
                                  className="add-btns me-2"
                                >
                                  <i className="fas fa-plus-circle"></i>
                                </a>
                                <a href="#" className="copy-btn me-2">
                                  <i className="fas fa-copy"></i>
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="remove-btn"
                                >
                                  <i className="fa fa-trash-alt"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-7 col-md-6">
                        <div className="invoice-fields">
                          <h4 className="field-title">More Fields</h4>
                          <div className="field-box">
                            <p>Payment Details</p>
                            <a
                              className="btn btn-primary"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#bank_details"
                            >
                              <i className="fas fa-plus-circle me-2"></i>Add
                              Bank Details
                            </a>
                          </div>
                        </div>
                        <div className="invoice-faq">
                          <div
                            className="panel-group"
                            id="accordion"
                            role="tablist"
                            aria-multiselectable="true"
                          >
                            <div className="faq-tab">
                              <div className="panel panel-default">
                                <div
                                  className="panel-heading"
                                  role="tab"
                                  id="headingTwo"
                                >
                                  <p className="panel-title">
                                    <a
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-parent="#accordion"
                                      href="#collapseTwo"
                                      aria-expanded="false"
                                      aria-controls="collapseTwo"
                                    >
                                      <i className="fas fa-plus-circle me-1"></i>{" "}
                                      Add Terms & Conditions
                                    </a>
                                  </p>
                                </div>
                                <div
                                  id="collapseTwo"
                                  className="panel-collapse collapse"
                                  role="tabpanel"
                                  aria-labelledby="headingTwo"
                                  data-bs-parent="#accordion"
                                >
                                  <div className="panel-body">
                                    <textarea className="form-control"></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="faq-tab">
                              <div className="panel panel-default">
                                <div
                                  className="panel-heading"
                                  role="tab"
                                  id="headingThree"
                                >
                                  <p className="panel-title">
                                    <a
                                      className="collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-parent="#accordion"
                                      href="#collapseThree"
                                      aria-expanded="false"
                                      aria-controls="collapseThree"
                                    >
                                      <i className="fas fa-plus-circle me-1"></i>{" "}
                                      Add Notes
                                    </a>
                                  </p>
                                </div>
                                <div
                                  id="collapseThree"
                                  className="panel-collapse collapse"
                                  role="tabpanel"
                                  aria-labelledby="headingThree"
                                  data-bs-parent="#accordion"
                                >
                                  <div className="panel-body">
                                    <textarea className="form-control"></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <div
                          class="invoice-total-card"
                          action="save_data.php"
                          method="post"
                        >
                          <h4 class="invoice-total-title" id="summary">
                            Summary
                          </h4>
                          <div class="invoice-total-box" id="GrossTotal">
                            <div class="invoice-total-inner">
                              {/* <a onchange="finalSum(),calculateDiscount(),calculateSGST12onvalue(),start();finalamount(),calculateSGST12(),calculateSGST18(),calculateSGST18onvalue(),calculateSGST28(),totalAmountWithTax(),calculateSGST28onvalue(),getNumberOFRowsInTable()"> */}
                              <h4>
                                {" "}
                                Gross Total
                                <span style={{marginLeft:"10%"}} id="grossTotal" name="grossTotal">{totalAmt}</span>
                              </h4>
                              <hr />
                              {/* <a onkeyup="finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateDiscount(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),calculateSGST18onvalue(),totalAmountWithTax(),getNumberOFRowsInTable()"> */}
                              <p>
                                Transport charge
                                <span>
                                  <input
                                    style={{
                                      width: "50px",
                                      marginLeft: "200px",
                                    }}
                                    type="text"
                                    id="transportCharge"
                                    value={transportCharge}
                                    onChange={onTransportChargeChange}
                                  />
                                </span>
                              </p>
                              {/* <a onkeyup="finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),calculateSGST18onvalue(),totalAmountWithTax(),getNumberOFRowsInTable()"> */}
                              <p>
                                Other charge
                                <span>
                                  <input
                                    style={{
                                      width: "50px",
                                      marginLeft: "200px",
                                    }}
                                    type="text"
                                    id="otherCharge"
                                    name="othercharges"
                                    value={otherCharge}
                                    onChange={onOtherChargeChange}
                                  />
                                </span>
                              </p>{" "}
                              <hr />
                              {/* <a onkeyup="calculateDiscount(),finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),totalAmountWithTax(),calculateSGST18onvalue(),getNumberOFRowsInTable(),"> */}
                              <p>
                                Other Discount
                                <span>
                                  <input
                                    style={{
                                      width: "50px",
                                      marginLeft: "200px",
                                    }}
                                    type="text"
                                    id="otherDiscount"
                                    value={discountInRuppes}
                                    onChange={onDiscountInRuppesChange}
                                  />
                                </span>
                              </p>
                              {/* <a onkeyup="calculateDiscount(),finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),totalAmountWithTax(),calculateSGST18onvalue(),getNumberOFRowsInTable(),TotalAmountTax()"> */}
                              <p>
                                Discount in %
                                <span>
                                  <input
                                    style={{
                                      width: "50px",
                                      marginLeft: "200px",
                                    }}
                                    type="text"
                                    value={discountInPercentage}
                                    onChange={onDiscountInPercentageChange}
                                  />
                                </span>
                              </p>
                              <p>
                                Total Discount in $<span id="finalDiscount">{totalDiscount}</span>
                              </p>
                              {/* </p> */}
                              <div class="invoice-total-footer">
                                <h4
                                  style={{
                                    fontFamily: "Times New Roman, Times, serif",
                                  }}
                                >
                                  <a
                                    style={{ color: "grey" }}
                                    href="javascript:void(0);"
                                    onchange=" updatemount(), calculateSGST12onvalue(),calculateSGST12(),calculateSGST18(),calculateSGST18onvalue(),calculateSGST28(),calculateSGST28onvalue(),totalAmountWithTax(),getNumberOFRowsInTable()"
                                  >
                                    Taxable Amount <span id="finalTotal">{totalTaxableAmt}</span>
                                  </a>
                                </h4>
                              </div>
                              <div className="gstContainer">

                              <div class="invoice-total-footer" id="cgst18">
                                <h4
                                  style={{
                                    fontFamily: "Times New Roman, Times, serif",
                                  }}
                                >
                                  <a style={{ color: "grey" }}>
                                    CGST 9%<span id="cgstAmount181"></span>
                                  </a>
                                </h4>
                                <span id="cgstAmount18"></span>
                              </div>
                              
                              <div class="invoice-total-footer" id="sgst18">
                                <h4
                                  style={{
                                    fontFamily: "Times New Roman, Times, serif",
                                  }}
                                >
                                  <a style={{ color: "grey" }}>
                                    SGST 9%<span id="sgstAmount181"></span>
                                  </a>
                                </h4>
                                <span id="sgstAmount18"></span>
                              </div>

                              <div class="invoice-total-footer" id="sgst18">
                                <h4
                                  style={{
                                    fontFamily: "Times New Roman, Times, serif",
                                  }}
                                >
                                  <a style={{ color: "grey" }}>
                                    SGST 18%<span id="sgstAmount181"></span>
                                  </a>
                                </h4>
                                <span id="sgstAmount18"></span>
                              </div>

                              </div>


                              <div class="invoice-total-footer">
                                <h4>
                                  Total Amount <span id="totalAmount">{finalAmt}</span>
                                </h4>
                              </div>
                            </div>
                           
                          </div>
                        </div>

                        {/* <div className="invoice-total-card">
                          <h4 className="invoice-total-title">Summary</h4>
                          <div className="invoice-total-box">
                            <div className="invoice-total-inner">
                              <p>
                                Taxable Amount <span>{totalAmt}</span>
                              </p>
                              <p>
                                Round Off
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggles"
                                >
                                  checkbox
                                </label>
                                <span>$54</span>
                              </p>
                              <div className="links-info-one">
                                <div className="links-info">
                                  <div className="links-cont">
                                    <a href="#" className="service-trash"></a>
                                  </div>
                                </div>
                              </div>
                              <a
                                href="javascript:void(0);"
                                className="add-links1"
                              >
                                <i className="fas fa-plus-circle me-1"></i>{" "}
                                Additional Charges
                              </a>
                              <div className="links-info-discount">
                                <div className="links-cont-discount">
                                  <a
                                    href="javascript:void(0);"
                                    className="add-links-one"
                                  >
                                    <i className="fas fa-plus-circle me-1"></i>{" "}
                                    Add more Discount
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="invoice-total-footer">
                              <h4>
                                Total Amount <span>$ 894.00</span>
                              </h4>
                            </div>
                          </div>
                        </div> */}
                        <div className="upload-sign">
                          <div className="form-group service-upload">
                            <span>Upload Sign</span>
                            <input type="file" multiple />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name of the Signatuaory"
                            />
                          </div>
                          <div className="form-group float-end mb-0">
                            <button className="btn btn-primary" onClick={saveInvoice}>
                              Save Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Invoices Preview Modal --> */}
      <div
        className="modal custom-modal fade invoices-preview"
        id="invoices_preview"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="card invoice-info-card">
                    <div className="card-body pb-0">
                      <div className="invoice-item invoice-item-one">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="invoice-logo">
                              <img src="assets/img/logo.png" alt="logo" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="invoice-info">
                              <div className="invoice-head">
                                <h2 className="text-primary">Invoice</h2>
                                <p>Invoice Number : In983248782</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Invoice Item --> */}
                      <div className="invoice-item invoice-item-bg">
                        <div className="invoice-circle-img">
                          <img
                            src="assets/img/invoice-circle1.png"
                            alt=""
                            className="invoice-circle1"
                          />
                          <img
                            src="assets/img/invoice-circle2.png"
                            alt=""
                            className="invoice-circle2"
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-12">
                            <div className="invoice-info">
                              <strong className="customer-text-one">
                                Billed to
                              </strong>
                              <h6 className="invoice-name">Customer Name</h6>
                              <p className="invoice-details invoice-details-two">
                                9087484288 <br />
                                Address line 1, <br />
                                Address line 2 <br />
                                Zip code ,City - Country
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                            <div className="invoice-info">
                              <strong className="customer-text-one">
                                Invoice From
                              </strong>
                              <h6 className="invoice-name">Company Name</h6>
                              <p className="invoice-details invoice-details-two">
                                9087484288 <br />
                                Address line 1, <br />
                                Address line 2 <br />
                                Zip code ,City - Country
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                            <div className="invoice-info invoice-info-one border-0">
                              <p>Issue Date : 27 Jul 2022</p>
                              <p>Due Date : 27 Aug 2022</p>
                              <p>Due Amount : $ 1,54,22 </p>
                              <p>Recurring Invoice : 15 Months</p>
                              <p className="mb-0">PO Number : 54515454</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /Invoice Item --> */}

                      {/* <!-- Invoice Item --> */}
                      <div className="invoice-item invoice-table-wrap">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="table-responsive">
                              <table className="invoice-table table table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Rate/Item</th>
                                    <th>Quantity</th>
                                    <th>Discount (%)</th>
                                    <th className="text-end">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Dell Laptop</td>
                                    <td>Laptop</td>
                                    <td>$1,110</td>
                                    <td>2</td>
                                    <td>2%</td>
                                    <td className="text-end">$400</td>
                                  </tr>
                                  <tr>
                                    <td>HP Laptop</td>
                                    <td>Laptop</td>
                                    <td>$1,500</td>
                                    <td>3</td>
                                    <td>6%</td>
                                    <td className="text-end">$3,000</td>
                                  </tr>
                                  <tr>
                                    <td>Apple Ipad</td>
                                    <td>Ipad</td>
                                    <td>$11,500</td>
                                    <td>1</td>
                                    <td>10%</td>
                                    <td className="text-end">$11,000</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /Invoice Item --> */}

                      <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6 col-md-6">
                          <div className="invoice-payment-box">
                            <h4>Payment Details</h4>
                            <div className="payment-details">
                              <p>Debit Card XXXXXXXXXXXX-2541 HDFC Bank</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="invoice-total-card">
                            <div className="invoice-total-box">
                              <div className="invoice-total-inner">
                                <p>
                                  Taxable <span>$6,660.00</span>
                                </p>
                                <p>
                                  Additional Charges <span>$6,660.00</span>
                                </p>
                                <p>
                                  Discount <span>$3,300.00</span>
                                </p>
                                <p className="mb-0">
                                  Sub total <span>$3,300.00</span>
                                </p>
                              </div>
                              <div className="invoice-total-footer">
                                <h4>
                                  Total Amount <span>$143,300.00</span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="invoice-sign-box">
                        <div className="row">
                          <div className="col-lg-8 col-md-8">
                            <div className="invoice-terms">
                              <h6>Notes:</h6>
                              <p className="mb-0">
                                Enter customer notes or any other details
                              </p>
                            </div>
                            <div className="invoice-terms mb-0">
                              <h6>Terms and Conditions:</h6>
                              <p className="mb-0">
                                Enter customer notes or any other details
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="invoice-sign text-end">
                              <img
                                className="img-fluid d-inline-block"
                                src="assets/img/signature.png"
                                alt="sign"
                              />
                              <span className="d-block">Harristemp</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Invoices Preview Modal --> */}

      {/* <!-- Add Invoices Modal --> */}
      <div
        className="modal custom-modal fade bank-details"
        id="bank_details"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="form-header text-start mb-0">
                <h4 className="mb-0">Add Bank Details</h4>
              </div>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="bank-inner-details">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Account Holder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Bank name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add Bank name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>IFSC Code</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Account Number</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <div className="bank-details-btn">
                <a
                  href="javascript:void(0);"
                  data-bs-dismiss="modal"
                  className="btn bank-cancel-btn me-2"
                >
                  Cancel
                </a>
                <a href="javascript:void(0);" className="btn bank-save-btn">
                  Save Item
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Add Invoices Modal --> */}

      {/* <!-- Delete Invoices Modal --> */}
      <div
        className="modal custom-modal fade"
        id="delete_invoices_details"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Invoice Details</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      href="javascript:void(0);"
                      data-bs-dismiss="modal"
                      className="btn btn-primary paid-continue-btn"
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="javascript:void(0);"
                      data-bs-dismiss="modal"
                      className="btn btn-primary paid-cancel-btn"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Delete Invoices Modal --> */}

      {/* <!-- Save Invoices Modal --> */}
      <div
        className="modal custom-modal fade"
        id="save_invocies_details"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Save Invoice Details</h3>
                <p>Are you sure want to save?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      href="javascript:void(0);"
                      data-bs-dismiss="modal"
                      className="btn btn-primary paid-continue-btn"
                    >
                      Save
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="javascript:void(0);"
                      data-bs-dismiss="modal"
                      className="btn btn-primary paid-cancel-btn"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Save Invoices Modal --> */}
    </div>
  );
}
