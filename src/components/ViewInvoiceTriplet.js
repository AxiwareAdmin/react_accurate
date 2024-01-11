import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function ViewInvoiceTriplet() {
    const fetchId=()=>{
        var url = new URL(window.location.href);
      let id1 = url.searchParams.get("id");
        console.log("id:"+id1);
      return id1;
    }
  return (
    <div>
      <ViewInvoice id={fetchId()}/>
      <ViewInvoice id={fetchId()}/>
      <ViewInvoice id={fetchId()}/>
    </div>
  )
}

    function ViewInvoice(props) {
    var token = localStorage.getItem("token");
    var header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
  
    const initilized = useRef(false);
  
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
  
      return [day, month, year].join("-");
    }
  
    const printButtonClicked = (e) => {
      // var content = document.getElementsByClassName("page-wrapper")[0];
      // var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      // pri.document.open();
      // pri.document.write(content.innerHTML);
      // pri.document.close();
      // pri.focus();
      // pri.print();
  
      // var panel = document.getElementsByClassName("page-wrapper")[0];
      // var printWindow = window.open();
  
      // printWindow.document.write(panel.innerHTML);
  
      // printWindow.document.close();
      // setTimeout(function () {
      //     printWindow.print();
      // }, 500);
  
      html2canvas(invoicepdf.current).then((canvas) => {
        const myImage = canvas.toDataURL("image/png");
  
        var nWindow = window.open("");
  
        // append the canvas to the body
        nWindow.document.body.appendChild(canvas);
  
        // focus on the window
        nWindow.focus();
  
        // print the window
        nWindow.print();
      });
    };
  
    function ImageSourcetoPrint(source) {
      return (
        "<html><head><script>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</scri" +
        "pt></head><body onload='step1()'>\n" +
        "<img src='" +
        source +
        "' /></body></html>"
      );
    }
  
    function toCurrency(value) {
      try {
        if (isNaN(Number(value))) return value;
        return Number(value).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      } catch (err) {
        throw err;
      }
    }
    function fromCurrency(value) {
      try {
        let num = Number((value + "").replace(/[\$,]/g, ""));
        return isNaN(num) ? 0 : num;
      } catch (err) {
        throw err;
      }
    }
    const roundNum = (num) => {
      num = fromCurrency(toCurrency(num));
      // num=toCurrency(fromCurrency(e.target.value)).replace(/[\$]/g,'')
      return num;
    };
  
    function getFormattedDate(date) {
      var year = date.getFullYear();
  
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;
  
      var day = date.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
  
      return day + "/" + month + "/" + year;
    }
  
    function convertToAccountingStandard(num) {
      num = toCurrency(fromCurrency(num)).replace(/[\$]/g, "");
  
      return num;
    }
  
    function ImagePrint(source) {
      var Pagelink = "about:blank";
      var pwa = window.open(Pagelink, "_new");
      pwa.document.open();
      pwa.document.write(ImageSourcetoPrint(source));
      pwa.document.close();
    }
  
    function addGstElems(gstPercentageArr, gstPercentageVal, gstCalculationVal) {
      gstPercentageArr.map((elem) => {
        let index = gstPercentageArr.indexOf(elem);
  
        let divElem = document.createElement("div");
        divElem.className = "invoice-total-footer";
        let h4Elem = document.createElement("h4");
        let aElem = document.createElement("a");
  
        h4Elem.style =
          "font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between";
  
        aElem.style = "color:grey;display:flex;flex-direction:column";
  
        let textElem = document.createTextNode(
          "SGST " + parseFloat(elem) / 2 + " %"
        );
        let spanElem = document.createElement("span");
  
        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);
  
        textElem = document.createTextNode(
          "(Amount: " +
            convertToAccountingStandard(gstCalculationVal[parseFloat(elem)]) +
            ")"
        );
        spanElem = document.createElement("span");
  
        spanElem.style = "text-transform:capitaize;font-size:18px";
        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);
  
        textElem = document.createTextNode(
          toCurrency(fromCurrency(gstPercentageVal[index] + "") / 2).replace(
            /[\$]/g,
            ""
          )
        );
  
        spanElem = document.createElement("span");
        spanElem.appendChild(textElem);
  
        spanElem.style = "color:grey";
  
        h4Elem.appendChild(aElem);
  
        h4Elem.appendChild(spanElem);
  
        divElem.appendChild(h4Elem);
  
        document.querySelector(".gstContainer").append(divElem);
  
        divElem = document.createElement("div");
        divElem.className = "invoice-total-footer";
        h4Elem = document.createElement("h4");
        aElem = document.createElement("a");
  
        h4Elem.style =
          "font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between";
  
        aElem.style = "color:grey;display:flex;flex-direction:column";
  
        textElem = document.createTextNode("CGST " + parseFloat(elem) / 2 + " %");
        spanElem = document.createElement("span");
  
        spanElem.appendChild(textElem);
  
        aElem.appendChild(spanElem);
  
        textElem = document.createTextNode(
          "(Amount: " +
            convertToAccountingStandard(gstCalculationVal[parseFloat(elem)]) +
            ")"
        );
        spanElem = document.createElement("span");
  
        spanElem.style = "text-transform:capitaize;font-size:18px";
        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);
  
        spanElem = document.createElement("span");
  
        textElem = document.createTextNode(
          toCurrency(fromCurrency(gstPercentageVal[index] + "") / 2).replace(
            /[\$]/g,
            ""
          )
        );
  
        spanElem.appendChild(textElem);
  
        spanElem.style = "color:grey";
  
        h4Elem.appendChild(aElem);
  
        h4Elem.appendChild(spanElem);
  
        divElem.appendChild(h4Elem);
  
        document.querySelector(".gstContainer").append(divElem);
      });
    }
  
    useEffect(() => {
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
  
    useEffect(() => {
      var url = new URL(window.location.href);
      let id1 = props.id;
      let action = url.searchParams.get("action");
      let serviceChkT = url.searchParams.get("serviceChk");
      setBillToAddrShow(serviceChkT);
  
      if (!initilized.current) {
        initilized.current = true;
        axios
          .get("http://localhost:8080/viewInvoice?invId=" + id1, header)
          .then((res) => {
            debugger;
  
            setinvNo(res.data.invoiceNo);
  
            setInvoiceDate(getFormattedDate(new Date(res.data.invoiceDate)));
  
            setPoDate(getFormattedDate(new Date(res.data.poDate)));
  
            setServiceCheck(res.data.serviceCheck);
  
            let billingaddr = res.data.billingAddress;
            if (
              billingaddr != null &&
              billingaddr != undefined &&
              billingaddr != ""
            )
              setToAddr(billingaddr);
  
            let custName = res.data.customerName;
            if (custName != null && custName != undefined && custName != "")
              setcustName(custName);
  
            let tempRemarks=res.data.remarks;
            if(tempRemarks!=null && tempRemarks!=undefined && tempRemarks!=""){
              setRemarks(tempRemarks);
            }
  
            let tempAdditionalTerms=res.data.additionalTerms;
  
            if(tempAdditionalTerms && tempAdditionalTerms!=''){
              setAdditionalTerms(tempAdditionalTerms)
            }
  
            let fromaddr1 = res.data.shippingAddress;
            if (fromaddr1 != null && fromaddr1 != undefined && fromaddr1 != "")
              setfromAddr(fromaddr1);
  
            let toCustName = res.data.shippingCustomerName;
            if (toCustName != null && toCustName != undefined && toCustName != "")
              setcmpName(toCustName);
  
            let ponum = res.data.poNumber;
            if (ponum != null && ponum != undefined && ponum != "")
              setpoNum(ponum);
  
            let tIssueDate = res.data.createdDate;
            if (tIssueDate != null && tIssueDate != undefined && tIssueDate != "")
              setissDt(formatDate(tIssueDate));
  
            let tDueDt = res.data.dueDate;
            if (tDueDt != null && tDueDt != undefined && tDueDt != "")
              setDueDt(formatDate(tDueDt));
  
            let payTermT = res.data.paymentTerms;
            if (payTermT != null && payTermT != undefined && payTermT != "")
              setpayTerm(payTermT);
  
            let challanNo = res.data.challanNo;
            if (challanNo != null && challanNo != undefined && challanNo != "")
              setChallanNumber(challanNo);
  
            let challanDt = res.data.challanDate;
  
            if (challanDt != null && challanDt != undefined && challanDt != "")
              setChallanDate(getFormattedDate(new Date(challanDt)));
  
            let transportMode = res.data.transportMode;
  
            if (
              transportMode != null &&
              transportMode != undefined &&
              transportMode != ""
            )
              setTransportMode(transportMode);
  
            let vehicleNo = res.data.vehicleNo;
            if (vehicleNo != null && vehicleNo != undefined && vehicleNo != "")
              setVehicleNumber(vehicleNo);
  
            // let taxableT = res.data.taxableValue;
            // if(taxableT != null && taxableT != undefined && taxableT != "")
            // settaxable(taxableT);
  
            let addchrgs =
              res.data.additionalCharges == null ||
              res.data.additionalCharges == undefined
                ? 0
                : parseFloat(res.data.additionalCharges);
            let transportCharge =
              res.data.transportCharges == null ||
              res.data.transportCharges == undefined
                ? 0
                : parseFloat(res.data.transportCharges);
  
            setaddChrg(addchrgs + transportCharge);
  
            let discnt =
              res.data.discount == null || res.data.discount == undefined
                ? 0
                : parseFloat(res.data.discount);
            let otherDiscount =
              res.data.otherDiscount == null ||
              res.data.otherDiscount == undefined
                ? 0
                : parseFloat(res.data.otherDiscount);
            if (discnt != null && discnt != undefined && discnt != "")
              setdiscount(discnt + otherDiscount);
  
            let tot = res.data.invoiceValue;
            if (tot != null && tot != undefined && tot != "") settotal(tot);
  
            let totalAmount = 0;
            let tempGstPercentageArr = [];
            let tempGstPercentageVal = [];
            let tempGstCalculationVal = {};
  
            res.data.invoiceProductDO.map((ele) => {
              let trEle = document.createElement("tr");
              let tdEle = document.createElement("td");
              let textEle = document.createTextNode(ele.productName);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              textEle = document.createTextNode(ele.productDescription);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              textEle = document.createTextNode(ele.hsnSac);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              textEle = document.createTextNode(ele.quantity);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              textEle = document.createTextNode(ele.unit);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              textEle = document.createTextNode("\u20B9" + ele.rate);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              textEle = document.createTextNode(ele.discount + "%");
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              tdEle = document.createElement("td");
              //  tdEle.className = "text-end";
              textEle = document.createTextNode("\u20B9" + ele.amount);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              totalAmount = totalAmount + parseFloat(ele.amount);
  
              tdEle = document.createElement("td");
              //  tdEle.className = "text-end";
              textEle = document.createTextNode("\u20B9" + ele.tax + "%");
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              document.querySelector("#productTable").appendChild(trEle);
  
              let index = tempGstPercentageArr.indexOf(ele.tax);
              if (index < 0) {
                tempGstPercentageArr = [...tempGstPercentageArr, ele.tax];
                tempGstPercentageVal = [
                  ...tempGstPercentageVal,
                  roundNum((ele.amount * ele.tax) / 100),
                ];
                var tempTax = ele.tax;
                tempGstCalculationVal[tempTax] = ele.amount;
              } else {
                tempGstPercentageVal[index] =
                  tempGstPercentageVal[index] +
                  roundNum((ele.amount * ele.tax) / 100);
                tempGstCalculationVal[ele.tax] =
                  tempGstCalculationVal[ele.tax] + ele.amount;
              }
            });
            let transportChargesGst = res.data.transportGst;
            let otherChargesGst = res.data.additionalChargesGst;
  
            //adding transport charge to gst calsulation
            var tempTransportGstRate = roundNum(transportChargesGst);
            let index = tempGstPercentageArr.indexOf(tempTransportGstRate);
            if (roundNum(transportCharge) > 0 && tempTransportGstRate > 0) {
              if (index >= 0) {
                tempGstPercentageVal[index] =
                  tempGstPercentageVal[index] +
                  roundNum(
                    (roundNum(transportCharge) * roundNum(tempTransportGstRate)) /
                      100
                  );
                tempGstCalculationVal[tempTransportGstRate] =
                  tempGstCalculationVal[tempTransportGstRate] +
                  roundNum(transportCharge);
              } else {
                tempGstPercentageArr = [
                  ...tempGstPercentageArr,
                  tempTransportGstRate,
                ];
                tempGstPercentageVal = [
                  ...tempGstPercentageVal,
                  roundNum(
                    (roundNum(transportCharge) * roundNum(tempTransportGstRate)) /
                      100
                  ),
                ];
                tempGstCalculationVal[tempTransportGstRate] =
                  roundNum(transportCharge);
              }
            }
  
            //adding other charge to gst
            var tempOtherChargesGstRate = roundNum(otherChargesGst);
            index = tempGstPercentageArr.indexOf(tempOtherChargesGstRate);
            if (roundNum(addchrgs) > 0 && tempOtherChargesGstRate > 0) {
              if (index >= 0) {
                tempGstPercentageVal[index] =
                  tempGstPercentageVal[index] +
                  roundNum(
                    (roundNum(addchrgs) * roundNum(tempOtherChargesGstRate)) / 100
                  );
                tempGstCalculationVal[tempOtherChargesGstRate] =
                  tempGstCalculationVal[tempOtherChargesGstRate] +
                  roundNum(addchrgs);
              } else {
                tempGstPercentageArr = [
                  ...tempGstPercentageArr,
                  tempOtherChargesGstRate,
                ];
                tempGstPercentageVal = [
                  ...tempGstPercentageVal,
                  roundNum(
                    (roundNum(addchrgs) * roundNum(tempOtherChargesGstRate)) / 100
                  ),
                ];
                tempGstCalculationVal[tempOtherChargesGstRate] =
                  roundNum(addchrgs);
              }
            }
  
            setGstPercentageVal(tempGstPercentageVal);
  
            addGstElems(
              tempGstPercentageArr,
              tempGstPercentageVal,
              tempGstCalculationVal
            );
  
            settaxable(totalAmount);
  
            if (
              action == "download" &&
              action != null &&
              action != "" &&
              action != undefined
            ) {
              setTimeout(function () {
                downloadpdf(res.data.invoiceNo);
              }, 500);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  
    const invoicepdf = useRef(null);
    // useEffect (() =>{
  
    //   if(initilized.current){
    const downloadpdf = (invoiceNo) => {
      html2canvas(invoicepdf.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 310);
        pdf.save(invoiceNo + ".pdf");
  
        //   });
        // }
      });
    };
  
    const [invNo, setinvNo] = useState(null);
    const [compName, setcmpName] = useState("Shivansh infotech");
    const [fromAddr, setfromAddr] = useState("");
    const [custName, setcustName] = useState("");
    const [toAddr, setToAddr] = useState("");
    const [poNum, setpoNum] = useState("");
    const [issDt, setissDt] = useState("");
    const [dueDt, setDueDt] = useState("");
    const [dueAmt, setdueAmt] = useState(0);
    const [taxable, settaxable] = useState(0);
    const [addChrg, setaddChrg] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [total, settotal] = useState(0);
    const [subTotal, setsubTotal] = useState(0);
    const [payTerm, setpayTerm] = useState("");
    const [billToAddrShow, setBillToAddrShow] = useState(false);
    const [invoiceDate, setInvoiceDate] = useState("");
    const [poDate, setPoDate] = useState("");
  
    const [challanNumber, setChallanNumber] = useState("");
  
    const [challanDate, setChallanDate] = useState("");
    const [transportMode, setTransportMode] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
  
    // const [gstPercentageArr,setGstPercentageArr]=useState([]);
  
    const [gstPercentageVal, setGstPercentageVal] = useState([]);
  
    // const [gstCalculationVal,setGstCalculationVal]=useState({})
  
    const [serviceCheck, setServiceCheck] = useState("false");
  
    const [additionalTerms,setAdditionalTerms]=useState("");
  
    const [remarks,setRemarks]=useState("");
    
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div class="page-wrapper" ref={invoicepdf}>
          <div class="content container-fluid">
            <div class="row justify-content-center">
              <div class="col-xl-10">
                <div class="card invoice-info-card">
                  <div class="card-body">
                    <div class="invoice-item invoice-item-one">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="invoice-logo">
                            <img src="assets/img/logo.png" alt="logo" />
                          </div>
                          <div class="invoice-head">
                            <h2>Invoice</h2>
                            <p>Invoice Number : {invNo}</p>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="invoice-info">
                            <strong class="customer-text-one">
                              Invoice From
                            </strong>
                            <h6 class="invoice-name">
                              Company Name : {compName}
                            </h6>
                            <p class="invoice-details" />
                            {fromAddr}
                            <p />
                          </div>
                        </div>
  
                        <div
                          class="col-md-4"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div class="invoice-item-box">
                            <p>Invoice No. : {invNo}</p>
                            <p class="mb-0">Invoice Date : {invoiceDate}</p>
                          </div>
  
                          <div class="invoice-item-box">
                            <p>PO No. : {poNum}</p>
                            <p class="mb-0">PO Date : {poDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="invoice-item invoice-item-two">
                      <div class="row">
                          <div class={`col-md-${serviceCheck == "false" ? 6 : 12}`}>
                            <div
                              class="invoice-info"
                            >
                              <strong class="customer-text-one">Billed to</strong>
                              <h6 class="invoice-name">
                                Customer Name : {custName}
                              </h6>
                              <p class="invoice-details invoice-details-two" />
                              {toAddr}
                              <p />
                            </div>
                          </div>
                        {/* <div class={`col-md-${serviceCheck == "false" ? 6 : 12}`}> */}
                          {/* <div class="invoice-info invoice-info2"> */}
  
                            {/* <p class="invoice-details"/>
                            Debit Card <br/>
                            XXXXXXXXXXXX-2541 <br/>
                            HDFC Bank
                          <p/> */}
                            {/*
                          check it again
                          <div class="invoice-item-box">
                            <p>Recurring : {payTerm}</p>
                            <p class="mb-0">PO Number : {poNum}</p>
                          </div> */}
  
                         
                          {/* </div> */}
  
                          
                        {/* </div> */}
  
                        {serviceCheck == "false" && (
                          <div class="col-md-6">
                            <div
                              class="invoice-info"
                            >
                              <strong class="customer-text-one">Shipping to</strong>
                              <h6 class="invoice-name">
                                Customer Name : {custName}
                              </h6>
                              <p class="invoice-details invoice-details-two" />
                              {toAddr}
                              <p />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
  
                    {/* <div class="invoice-issues-box">
                    <div class="row">
                      <div class="col-lg-4 col-md-4">
                        <div class="invoice-issues-date">
                          <p>Issue Date : {issDt}</p>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="invoice-issues-date">
                          <p>Due Date : {dueDt}</p>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="invoice-issues-date">
                          <p>Due Amount : ₹ {dueAmt} </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
  
                    <div class="invoice-issues-box">
                      <div class="row">
                        <div class="col-lg-2 col-md-2">
                          <div class="invoice-issues-date">
                            <p>
                              Challan No. <br /> {challanNumber}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2">
                          <div class="invoice-issues-date">
                            <p>
                              Challan Date <br /> {challanDate}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2">
                          <div class="invoice-issues-date">
                            <p>
                              Payment Terms <br /> {payTerm}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2">
                          <div class="invoice-issues-date">
                            <p>
                              Due Date <br /> {dueDt}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2">
                          <div class="invoice-issues-date">
                            <p>
                              Transport Mode <br /> {transportMode}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2">
                          <div class="invoice-issues-date">
                            <p>
                              Vehicle No. <br /> {vehicleNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="invoice-item invoice-table-wrap">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table class="invoice-table table table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Category</th>
                                  <th>Description</th>
                                  <th>HSN/SAC</th>
                                  <th>Quantity</th>
                                  <th>Unit</th>
                                  <th>Rate/Item</th>
                                  <th>Discount (%)</th>
                                  <th>Amount</th>
                                  <th>Gst Rate</th>
                                </tr>
                              </thead>
                              <tbody id="productTable">
                                {/* <tr>
                                <td>Apple Ipad</td>
                                <td>Ipad</td>
                                <td>&#x20B9;11,500</td>
                                <td>1</td>
                                <td>10%</td>
                                <td class="text-end">&#x20B9;11,000</td>
                              </tr> */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                      {/* <div class={`col-md-${serviceCheck == "false" ? 6 : 12}`}> */}
                          <div class="invoice-info invoice-info2">
                            <strong class="customer-text-one">
                              Payment Details
                            </strong>
                            {/* <p class="invoice-details"/>
                            Debit Card <br/>
                            XXXXXXXXXXXX-2541 <br/>
                            HDFC Bank
                          <p/> */}
                            {/*
                          check it again
                          <div class="invoice-item-box">
                            <p>Recurring : {payTerm}</p>
                            <p class="mb-0">PO Number : {poNum}</p>
                          </div> */}
                          <table class="paymentDetailsTable">
                            <tr>
                              <td>A/C Holder's Name</td>
                              <td>: Shivansh Infotech Solutions</td>
                            </tr>
  
                            <tr>
                              <td>Bank Name</td>
                              <td>: ICICI Bank Ltd</td>
                            </tr>
  
                            <tr>
                              <td>A/C No</td>
                              <td>: 098605500845</td>
                            </tr>
  
                            <tr>
                              <td>IFSC Code</td>
                              <td>: ICIC0000986</td>
                            </tr>
  
                            <tr>
                              <td>Branch</td>
                              <td>: Hinjewadi, Pune</td>
                            </tr>
                          </table>
                          {/* </div> */}
                        </div>
                        <div class="invoice-terms">
                          <h6>Notes:</h6>
                          <p class="mb-0">
                            {remarks||'Enter customer notes or any other details'}
                          </p>
                        </div>
                        <div class="invoice-terms">
                          <h6>Terms and Conditions:</h6>
                          <p class="mb-0">
                            {additionalTerms||"Enter customer notes or any other details"}
                          </p>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6">
                        <div class="invoice-total-card">
                          <div class="invoice-total-box">
                            <div class="invoice-total-inner">
                              <p>
                                Taxable <span>&#x20B9;{taxable}</span>
                              </p>
                              <p>
                                Additional Charges <span>&#x20B9;{addChrg}</span>
                              </p>
                              <p>
                                Discount <span>&#x20B9;{discount}</span>
                              </p>
                              <p class="mb-0">
                                Sub total{" "}
                                <span>
                                  &#x20B9;{taxable + addChrg + discount}
                                </span>
                              </p>
                            </div>
                            <div className="gstContainer"></div>
                            <div class="invoice-total-footer">
                              <h4>
                                Total Amount{" "}
                                <span>
                                  &#x20B9;
                                  {taxable +
                                    addChrg +
                                    discount +
                                    (gstPercentageVal.length > 0
                                      ? gstPercentageVal.reduce((x, y) => x + y)
                                      : 0)}
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="invoice-sign text-end">
                      <h4>{compName}</h4>
                      <img
                        class="img-fluid d-inline-block"
                        src="assets/img/signature.png"
                        alt="sign"
                      />
                      <span class="d-block">Authorized Signatory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="page-header invoices-page-header">
            <div class="row align-items-center">
              <div class="col-lg-9 col-md-12">
                <a style={{ color: "grey" }} />
  
                <div class="form-group float-end mb-0">
                  <button
                    onClick={printButtonClicked}
                    class="btn btn-primary"
                    id="submitButton"
                    type="submit"
                    value="Submit"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <iframe
          id="ifmcontentstoprint"
          style={{ height: "0px", width: "0px", position: "absolute" }}
        ></iframe>
      </div>
    );
  }
  
