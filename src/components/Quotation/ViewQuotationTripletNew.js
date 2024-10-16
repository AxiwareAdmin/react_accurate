import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Navbar from "../Navbar";
import Theme from "../Theme/Theme";

export default function ViewQuotationTriplet() {

  
  // const location=useLocation();

    const invoicepdf = useRef(null);
    const navigate=useNavigate();

    // const [invoiceType,setInvoiceType]=useState(null);

    // useEffect(()=>{
    //   if(location.state.invoiceType)
    //   setInvoiceType(location.state.invoiceType)
    // },[])

    // if(location.state && location.state.invoiceType!=null) setInvoiceType(location.state.invoiceType);

    const [invoiceNumber,setInvoiceNumber]=useState("");
    const [displayFlag,setDisplayFlag]=useState(null)
    // useEffect (() =>{
  
    //   if(initilized.current){
    const downloadpdfold = (invoiceNo) => {
      html2canvas(invoicepdf.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 310);
        pdf.save(invoiceNo + ".pdf");
  
        //   });
        // }
      });
    };
    
    

    const downloadpdf = () => {
      const { clientWidth, clientHeight } = invoicepdf.current;
      // 
  
      var nodeList=document.querySelectorAll(".page-wrapper");
      for(let i=0;i<nodeList.length;i++){
          nodeList[i].style='margin:0;'
      }
      setDisplayFlag("true");
      html2canvas(invoicepdf.current).then((canvas) => {
        var imgData = canvas.toDataURL('image/png');

        /*
        Here are the numbers (paper width and height) that I found to work. 
        It still creates a little overlap part between the pages, but good enough for me.
        if you can find an official number from jsPDF, use them.
        */
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        var doc = new jsPDF('p', 'mm',null,true);
        var position = 0;
  
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save(`${invoiceNumber}.pdf`);﻿

        
        setDisplayFlag(null)
      });

  nodeList.forEach(elem=>elem.style='margin-left:230px')
  }

    const printButtonClicked = (e) => {
        var nodeList=document.querySelectorAll(".page-wrapper");
        for(let i=0;i<nodeList.length;i++){
            nodeList[i].style='margin:0;'
        }
        console.log(invoicepdf.current)

        invoicepdf.current.querySelectorAll(".signatureContainer").forEach(elem=>elem.style.display='none');
        // 
        html2canvas(invoicepdf.current, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

          // 
          
          const printWindow = window.open('', '_blank');
          printWindow.document.open();
          printWindow.document.write('<html><head><title>Print</title>\
          <style>\
                @media print {\
                  body {\
                    margin: 0; /* Reset margin to avoid blank page */\
                  }\
                  body * {\
                    visibility: hidden;\
                  }\
                  #printImage, #printImage * {\
                    visibility: visible;\
                  }\
                }\
              </style>\
          \
          </head><body>');
          printWindow.document.write(`<img id="printImage" src="${imgData}" style="width: 100%; height: auto;" onload="window.print()" />`);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          // printWindow.print();
        });
    
        nodeList.forEach(elem=>elem.style='margin-left:230px')
          invoicepdf.current.querySelectorAll(".signatureContainer").forEach(elem=>elem.style.display='block');
        // html2canvas(data) // useCORS is optional if your images are externally hosted somewhere like s3
        // .then(canvas => {
        //   const contentDataURL = canvas.toDataURL('image/png')
        //   let pdf = new jsPDF('p', 'mm',[canvas.width,canvas.height]);
        //   var pdfWidth = pdf.internal.pageSize.getWidth();
        //   var pdfHeight = pdf.internal.pageSize.getHeight();
        //   pdf.addImage(contentDataURL, 'PNG', 0, 5,pdfWidth, pdfHeight);
        //   //  pdf.save('new-file.pdf');
        //   window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        // });


        // html2canvas(invoicepdf.current,{scrollY: -window.screenY,scale:1}).then((canvas) => {
        //   const myImage = canvas.toDataURL("image/png");
    
        //   var nWindow = window.open("");

        //   const pdf=new jsPDF(
        //     'p',
        //     'pt',
        //     [canvas.width,canvas.height]
        //   )

        //   const imgProps=pdf.getImageProperties(myImage);
        //   const pdfWidth=pdf.internal.pageSize.getWidth();
        //   const pdfHeight=pdf.internal.pageSize.getHeight();

        //   pdf.addImage(myImage,'PNG',pdfWidth,pdfHeight);

          

          
    
        //   // append the canvas to the body
        //   nWindow.open(pdf.output('bloburl',{filename:'new.pdf'}),'_blank');
    
        //   // focus on the window
        //   // nWindow.focus();
    
        //   // print the window
        //   // nWindow.print();
        // });
      };
    const fetchId=()=>{
        var url = new URL(window.location.href);
      let id1 = url.searchParams.get("id");
        console.log("id:"+id1);
      return id1;
    }

    const fetchInvoiceType=()=>{
      var url = new URL(window.location.href);
    let id1 = url.searchParams.get(process.env.REACT_APP_INVOICE_TYPE);
    return id1;
  }
  return (
    <div>
      <Theme/>
        <Navbar />
        <Sidebar />
        <Loader display={displayFlag}/>
    <div ref={invoicepdf}>
      
      <ViewInvoice invoiceType={fetchInvoiceType()} id={fetchId()} setInvoiceNumber={setInvoiceNumber} productTableId="productTable1" gstContainerId="gstContainer1" label="Original"/>
      <ViewInvoice invoiceType={fetchInvoiceType()} id={fetchId()} productTableId="productTable2" gstContainerId="gstContainer2" label="Duplicate"/>
      <ViewInvoice invoiceType={fetchInvoiceType()} id={fetchId()} productTableId="productTable3" gstContainerId="gstContainer3" label="Tripicate"/>
      </div>
      <div class="page-header invoices-page-header">
            <div class="row">
              <div class="col-lg-11 col-md-12">
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

                  <button
                    onClick={()=>downloadpdf("123")}
                    class="btn btn-primary"
                    id="submitButton"
                    type="submit"
                    value="Submit"
                    style={{margin:'0 0 0 5px'}}
                  >
                    Download
                  </button>
                  
  
                  <button
                    onClick={()=>navigate(-2)}
                    class="btn btn-primary"
                    id="submitButton"
                    type="submit"
                    value="Submit"
                    style={{margin:'0 0 0 5px'}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            </div>
    
    </div>
    
  )
}

function ViewInvoice(props) {
  //  console.log("viewInvoicce:invoieType::"+props.invoiceType)
    var token = localStorage.getItem("token");
    var header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };


  
  const[tempGstPercentageVal,setTempGstPercentageVal] =useState([])
    const [invNo, setinvNo] = useState(null);
    const [compName, setcmpName] = useState("Shivansh infotech");
    const [fromAddr, setfromAddr] = useState("");
    const [custName, setcustName] = useState(null);
    const [toAddr, setToAddr] = useState("");
    const [poNum, setpoNum] = useState("");
    const [issDt, setissDt] = useState("");
    const [dueDt, setDueDt] = useState("");
    const [dueAmt, setdueAmt] = useState(0);
    const [taxable, settaxable] = useState(0);
    const [addChrg, setaddChrg] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, settotal] = useState(0);
    const [subTotal, setsubTotal] = useState(0);
    const [payTerm, setpayTerm] = useState("");
    const [billToAddrShow, setBillToAddrShow] = useState(false);
    const [invoiceDate, setInvoiceDate] = useState("");
    const [poDate, setPoDate] = useState("");
    const [invoiceDetails,setInvoiceDetails]=useState({})
  
    const [challanNumber, setChallanNumber] = useState("");
  
    const [challanDate, setChallanDate] = useState("");
    const [transportMode, setTransportMode] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
  
    const [clientDetails,setClientDetails]=useState({});
  
    const [customerDetails,setCustomerDetails]=useState({});
  
    const [userDetails,setUserDetails]=useState({});
  
    const [gstPercentageArr,setGstPercentageArr]=useState([]);
  
    const [gstPercentageVal, setGstPercentageVal] = useState([]);
  
    const [gstCalculationVal,setGstCalculationVal]=useState({})
  
    const [serviceCheck, setServiceCheck] = useState("false");
  
    const [additionalTerms,setAdditionalTerms]=useState("");
  
    const [remarks,setRemarks]=useState("");
  
    const initilized = useRef(false);


    useEffect(()=>{
      console.log("useEffect gst % val");
      console.log(gstPercentageVal)
      console.log(gstPercentageVal[0])
    },[gstPercentageVal])
  
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
  
      return [day, month, year].join("-");
    }
  
    function currencyFormat(num) {
      console.log("printing:")
      console.log(typeof gstPercentageVal)
      console.log(gstPercentageVal[0])
      console.log(gstPercentageVal.length>0 && gstPercentageVal.reduce((x, y) => x + y))
      return (num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
  }
  
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
    function manageDiscount(tempPercentageArr,tempPercentageVal,tempCalculation,discountlocal){
      
      let sortable = [];
      
      for (var calculation in tempCalculation) {
          sortable.push([calculation, tempCalculation[calculation]]);
      }
      
      sortable.sort(function(a, b) {
          return (a[1] - b[1])*-1;
      });
      
      // console.log(sortable);
      
      sortable.map((arr,k)=>{
        // console.log(arr);
        if(discountlocal>0){
      
        if(parseFloat(arr[1])>discountlocal){
          let index=tempPercentageArr.indexOf(parseFloat(arr[0]));
          // console.log("index:"+index);
          // tempPercentageVal[index]=tempPercentageVal[index]-discount;
      
      let  tempDis=discountlocal-tempCalculation[parseFloat(arr[0])];
          tempCalculation[parseFloat(arr[0])]=tempCalculation[parseFloat(arr[0])]-discountlocal;
      
          discountlocal=tempDis;
          // console.log(tempPercentageArr);
      
          // console.log(tempPercentageVal);
      
          // console.log(tempCalculation);
        }else{
          console.log("executed")
          discountlocal=discountlocal-parseFloat(arr[1]);
          let index=tempPercentageArr.indexOf(parseFloat(arr[0]));
          tempPercentageArr.splice(index,1);
          tempPercentageVal.splice(index,1);
          delete tempCalculation[parseFloat(arr[0])];
        }
        }
      })
      
      Object.keys(tempCalculation).forEach((a)=>{
        let key=parseFloat(a);
      
        let val=tempCalculation[key];
        let index=tempPercentageArr.indexOf(key);
      
        tempPercentageVal[index]=val*key/100
      })
        }
      
  
    function addGstElems(gstPercentageArr, gstPercentageVal, gstCalculationVal) {

      debugger;
      let state=customerDetails.state;

      
      let clientState=clientDetails.state;
    if(!state  || !clientState) return;
      manageDiscount(gstPercentageArr,gstPercentageVal,gstCalculationVal,discount)

      setTempGstPercentageVal(gstPercentageVal);     
      if(clientState.toLowerCase()==state.toLowerCase()){

        gstPercentageArr.map((elem)=>{
          let index=gstPercentageArr.indexOf(elem);
  
          let divElem=document.createElement("div");
          divElem.className="invoice-total-footer";
          let h4Elem=document.createElement("h4");
          let aElem=document.createElement("a");
          
          h4Elem.style="font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between"
    
          aElem.style="color:grey;display:flex;flex-direction:column";
    
          let textElem=document.createTextNode("SGST "+(parseFloat(elem)/2)+" %");
          let spanElem=document.createElement("span")
  
          spanElem.appendChild(textElem)
          aElem.appendChild(spanElem);
  
  
          textElem=document.createTextNode("(Amount: "+convertToAccountingStandard(gstCalculationVal[parseFloat(elem)])+")")
          spanElem=document.createElement("span")
  
          spanElem.style='text-transform:capitaize;font-size:18px'
          spanElem.appendChild(textElem)
          aElem.appendChild(spanElem);
  
          textElem=document.createTextNode(toCurrency(fromCurrency(gstPercentageVal[index]+"")/2).replace(/[\$]/g,''));
  
          spanElem=document.createElement("span");
          spanElem.appendChild(textElem);
  
          spanElem.style='color:grey'
    
          h4Elem.appendChild(aElem);
  
          h4Elem.appendChild(spanElem)
    
          divElem.appendChild(h4Elem);
  
          document.querySelector(`.${props.gstContainerId}`).append(divElem);
  
           divElem=document.createElement("div");
          divElem.className="invoice-total-footer";
           h4Elem=document.createElement("h4");
           aElem=document.createElement("a");
          
          h4Elem.style="font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between"
    
          aElem.style="color:grey;display:flex;flex-direction:column";
    
           textElem=document.createTextNode("CGST "+(parseFloat(elem)/2)+" %");
            spanElem=document.createElement("span")
  
            spanElem.appendChild(textElem)
           
           
           aElem.appendChild(spanElem);
  
           textElem=document.createTextNode("(Amount: "+convertToAccountingStandard(gstCalculationVal[parseFloat(elem)])+")")
           spanElem=document.createElement("span")
   
           spanElem.style='text-transform:capitaize;font-size:18px'
           spanElem.appendChild(textElem)
           aElem.appendChild(spanElem);
           
          spanElem=document.createElement("span");
  
           textElem=document.createTextNode(toCurrency(fromCurrency(gstPercentageVal[index]+"")/2).replace(/[\$]/g,''));
  
           spanElem.appendChild(textElem);
  
           spanElem.style='color:grey'
  
          h4Elem.appendChild(aElem);
  
          h4Elem.appendChild(spanElem)
    
          divElem.appendChild(h4Elem);
  
          document.querySelector(`.${props.gstContainerId}`).append(divElem);
  
  
  
        })
      }

      else{
        
        gstPercentageArr.map((elem)=>{
          let index=gstPercentageArr.indexOf(elem);
  
          let divElem=document.createElement("div");
          divElem.className="invoice-total-footer";
          let h4Elem=document.createElement("h4");
          let aElem=document.createElement("a");
          
          h4Elem.style="font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between"
    
          aElem.style="color:grey;display:flex;flex-direction:column";
    
          let textElem=document.createTextNode("IGST "+(parseFloat(elem))+" %");
          let spanElem=document.createElement("span")
  
          spanElem.appendChild(textElem)
          aElem.appendChild(spanElem);
  
  
          textElem=document.createTextNode("(Amount: "+convertToAccountingStandard(gstCalculationVal[parseFloat(elem)])+")")
          spanElem=document.createElement("span")
  
          spanElem.style='text-transform:capitaize;font-size:18px'
          spanElem.appendChild(textElem)
          aElem.appendChild(spanElem);
  
          textElem=document.createTextNode(toCurrency(fromCurrency(gstPercentageVal[index]+"")).replace(/[\$]/g,''));
  
          spanElem=document.createElement("span");
          spanElem.appendChild(textElem);
  
          spanElem.style='color:grey'
    
          h4Elem.appendChild(aElem);
  
          h4Elem.appendChild(spanElem)
    
          divElem.appendChild(h4Elem);
  
          document.querySelector(`.${props.gstContainerId}`).append(divElem);
  
          //  divElem=document.createElement("div");
          // divElem.className="invoice-total-footer";
          //  h4Elem=document.createElement("h4");
          //  aElem=document.createElement("a");
          
          // h4Elem.style="font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between"
    
          // aElem.style="color:grey;display:flex;flex-direction:column";
    
          //  textElem=document.createTextNode("CGST "+(parseFloat(elem)/2)+" %");
          //   spanElem=document.createElement("span")
  
          //   spanElem.appendChild(textElem)
           
           
          //  aElem.appendChild(spanElem);
  
          //  textElem=document.createTextNode("(Amount: "+convertToAccountingStandard(gstCalculationVal[parseFloat(elem)])+")")
          //  spanElem=document.createElement("span")
   
          //  spanElem.style='text-transform:capitaize;font-size:18px'
          //  spanElem.appendChild(textElem)
          //  aElem.appendChild(spanElem);
           
          // spanElem=document.createElement("span");
  
          //  textElem=document.createTextNode(toCurrency(fromCurrency(gstPercentageVal[index]+"")/2).replace(/[\$]/g,''));
  
          //  spanElem.appendChild(textElem);
  
          //  spanElem.style='color:grey'
  
          // h4Elem.appendChild(aElem);
  
          // h4Elem.appendChild(spanElem)
    
          // divElem.appendChild(h4Elem);
  
          // document.querySelector(".gstContainer").append(divElem);
  
  
  
        })
      }

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

    useEffect(()=>{
      if(gstPercentageArr.length>0 && Object.keys(clientDetails).length>0 && Object.keys(customerDetails).length>0)
      addGstElems(
        gstPercentageArr,
        gstPercentageVal,
        gstCalculationVal
      );
    },[discount,gstCalculationVal,gstPercentageArr,gstPercentageVal,clientDetails,customerDetails])

    useEffect(() => {
      var url = new URL(window.location.href);
      let id1 = props.id;
      let action = url.searchParams.get("action");
  
      if (!initilized.current) {
        initilized.current = true;
        axios
          .get(`${process.env.REACT_APP_LOCAL_URL}/viewQuotation?invId=` + id1, header)
          .then((res) => {
            
  
            setInvoiceDetails(res.data);
  
            setinvNo(res.data.invoiceNo);

            props.setInvoiceNumber && props.setInvoiceNumber(res.data.invoiceNo)
  
            setInvoiceDate(getFormattedDate(new Date(res.data.invoiceDate)));
  
            setPoDate(getFormattedDate(new Date(res.data.poDate)));
  
            debugger;
            setServiceCheck(true);
  
            let billingaddr = res.data.billingAddress;
            if (
              billingaddr != null &&
              billingaddr != undefined &&
              billingaddr != ""
            )
              setToAddr(billingaddr);
  
            let tempCustName = res.data.customerName;
            if (tempCustName != null && tempCustName != undefined && tempCustName != "")
              setcustName(tempCustName);
  
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
            // if (discnt != null && discnt != undefined && discnt != "")
              setDiscount(discnt + otherDiscount);
  
            let tot = res.data.invoiceValue;
            if (tot != null && tot != undefined && tot != "") settotal(tot);
  
            let totalAmount = 0;
            let tempGstPercentageArr = [];
            let tempGstPercentageVal = [];
            let tempGstCalculationVal = {};
  
            res.data.invoiceProductDO && res.data.invoiceProductDO.map((ele) => {
              let trEle = document.createElement("tr");
              let tdEle = document.createElement("td");
              let textEle = document.createTextNode(ele.productName +" - "+ele.productDescription);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              // tdEle = document.createElement("td");
              // textEle = document.createTextNode(ele.productDescription);
              // tdEle.appendChild(textEle);
              // trEle.appendChild(tdEle);
  
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
              textEle = document.createTextNode("GST @" + ele.tax + "%");
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);
  
              document.querySelector("#"+props.productTableId).appendChild(trEle);
  
              let index = tempGstPercentageArr.indexOf(parseFloat(ele.tax));
              if (index < 0) {
                tempGstPercentageArr = [...tempGstPercentageArr, parseFloat(ele.tax)];
                tempGstPercentageVal = [
                  ...tempGstPercentageVal,
                  roundNum((ele.amount * ele.tax) / 100),
                ];
                var tempTax = parseFloat(ele.tax);
                tempGstCalculationVal[tempTax] = parseFloat(ele.amount);
              } else {
                tempGstPercentageVal[index] =
                  tempGstPercentageVal[index] +
                  roundNum((ele.amount * ele.tax) / 100);
                tempGstCalculationVal[parseFloat(ele.tax)] =
                  tempGstCalculationVal[parseFloat(ele.tax)] + parseFloat(ele.amount);
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

            setGstPercentageArr(tempGstPercentageArr)

            setGstCalculationVal(tempGstCalculationVal)
            
            
  
            settaxable(totalAmount);
  
            
          
          })
          .catch((e) => {
            console.log(e);
          });
  
          axios.get(`${process.env.REACT_APP_LOCAL_URL}/getClientDOForUser`,header)
          .then((res)=>{
            if(res.data!='client not found'){
              setClientDetails(res.data);
            }
          }).catch((error)=>{
            alert("error:"+error)
          })
  
          axios.get(`${process.env.REACT_APP_LOCAL_URL}/user`,header)
          .then((res)=>{
              setUserDetails(res.data);
          }).catch((error)=>{
            console.log(error)
          })
  
  
  
      }
    },[]);
  

  
  
    useEffect(()=>{
        if(custName==null) return;
  
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/customer/custname/${custName}`,header).then((res)=>{
          
            if(res!='Customers not found'){
              setCustomerDetails(res.data);
            }
        })
  
  
    },[custName])
  
   
  
    
    return (
      <div>
       
        <div class="page-wrapper">
          <div class="content container-fluid">
            <div class="row justify-content-center">
              <div class="col-xl-12">
                <div class="card invoice-info-card" style={{border:'1px solid black'}}>
                  <div class="card-body">
                    <div class="invoice-item invoice-item-one" style={{borderBottom:'1px solid black'}}>
  
                      <div class="row">
                      <div class="col-md-12">
                          <div class="invoice-info" style={{borderBottom:'1px solid black',display:'flex'}}>
                            <strong class="customer-text-one" style={{textAlign:'center',flexGrow:'1'}}>
                             Customer Quotation
                            </strong>

                            {/* <strong class="customer-text-one" style={{textAlign:'end'}}>
                            {props.label}
                            </strong> */}
                            <p>
                            {props.label}
                            </p>

                          </div>
                        </div>
                      </div>
  
  
                      <div class="row">
                        <div class="col-md-8">
                          <div class="invoice-logo">
                            <img src="assets/img/logo.png" alt="logo" />
                          </div>
                          <div class="invoice-head">
                          <div class="invoice-info">
                            <h6 class="invoice-name">
                             {clientDetails.companyName}
                            </h6>
                            <p class="invoice-details" />
                            {clientDetails.address1},{clientDetails.address2},<br/>
                            {clientDetails.city},{clientDetails.state}-{clientDetails.pinCode},<br/>
                            GST No.{clientDetails.gstNo}<br/>
                            Email : {clientDetails.email}<br/>
                            conact : {clientDetails.mobile}<br/>
                            {clientDetails.website}
                            <p />
                        </div>
                          </div>
                        </div>
                        
  
                        <div
                          class="col-md-4"
                          style={{ display: "flex", flexDirection: "column", alignItems:"end" }}
                        >
                          <div class="invoice-item-box">
                            <p>Quotation No. : {invNo}</p>
                            <p class="mb-0">Quotation Date : {invoiceDate}</p>
                          </div>
  
                          <div class="invoice-item-box">
                            <p>PO No. : {poNum}</p>
                            <p class="mb-0">PO Date : {poDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="invoice-item invoice-item-two" style={{borderBottom:'1px solid black',padding:'10px',marginBottom:'7px'}}>
                      <div class="row">
                          <div class={`col-md-${serviceCheck == "false" ? 6 : 12}`} >
                            <div
                              class="invoice-info"
                            >
                              <strong class="customer-text-one">Billing Address</strong>
                              <h6 class="invoice-name" style={{margin:'0'}}>
                                {custName}
                              </h6>
                              <p class="invoice-details invoice-details-two" style={{margin:'0'}}/>
                              {customerDetails.address1},{customerDetails.address2}<br/>
                              {customerDetails.city} {customerDetails.pincode}<br/>
                              State: {customerDetails.state}, Code-{customerDetails.stateCode}<br/>
                              GST No. {customerDetails.gstNo}<br/>
                              Contact person: {customerDetails.contactPerson}<br/>
                              Contact No. {customerDetails.contactNumber}
  
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
                          <div class="col-md-6" style={{borderLeft:'1px solid black'}}>
                            <div
                              class="invoice-info"
                            >
                              <strong class="customer-text-one">Shipping Address</strong>
                              <h6 class="invoice-name" style={{margin:'0'}}>
                                {custName}
                              </h6>
                              <p class="invoice-details invoice-details-two" style={{margin:'0'}}/>
                               {customerDetails.shippingAddress1},{customerDetails.shippingAddress2}<br/>
                              {customerDetails.shippingCity} {customerDetails.shippingPinCode}<br/>
                              State: {customerDetails.shippingState}, Code-{customerDetails.shippingStateCode}<br/>
                              GST No. {customerDetails.shippingGstNo}<br/>
                              Contact person: {customerDetails.shippingContactPerson}<br/>
                              Contact No. {customerDetails.shippingContactNumber}
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
                      <div class="row d-flex justify-content-around">
                        <div class="col-lg-2 col-md-2 d-none">
                          <div class="invoice-issues-date">
                            <p>
                              Challan No. <br /> {challanNumber}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2 d-none">
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
  
                        <div class="col-lg-2 col-md-2 d-none" style={{borderLeft:'1px solid black'}}>
                          <div class="invoice-issues-date">
                            <p>
                              Transport Mode <br /> {transportMode}
                            </p>
                          </div>
                        </div>
  
                        <div class="col-lg-2 col-md-2 d-none">
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
                                  <th>Product Name/ Description</th>
                                  {/* <th>Description</th> */}
                                  <th>HSN/SAC</th>
                                  <th>Quantity</th>
                                  <th>Unit</th>
                                  <th>Rate</th>
                                  <th>Dis (%)</th>
                                  <th>Amount</th>
                                  <th>GST Rate</th>
                                </tr>
                              </thead>
                              <tbody id={props.productTableId}>
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
  
                    <div class="row" >
                      <div class="col-lg-8 col-md-8">
                      {/* <div class={`col-md-${serviceCheck == "false" ? 6 : 12}`}> */}
                          <div class="invoice-info invoice-info2">
                            <strong class="customer-text-one">
                              Bank Details
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
                              <td>: {userDetails.userName}</td>
                            </tr>
  
                            <tr>
                              <td>Bank Name</td>
                              <td>: {userDetails.bankName}</td>
                            </tr>
  
                            <tr>
                              <td>A/C No</td>
                              <td>: {userDetails.accountNumber}</td>
                            </tr>
  
                            <tr>
                              <td>IFSC Code</td>
                              <td>: {userDetails.ifscCode}</td>
                            </tr>
  
                            <tr>
                              <td>Branch</td>
                              <td>: {userDetails.branch}</td>
                            </tr>
                          </table>
                          {/* </div> */}
                        </div>
                        <div class="invoice-terms">
                          <h6>Remarks:</h6>
                          <p class="mb-0"  style={{border:'1px solid black',padding:'20px'}}>
                            {remarks||'Enter customer notes or any other details'}
                          </p>
                        </div>
                        <div class="invoice-terms">
                          <h6>Terms and Conditions:</h6>
                          <p class="mb-0" style={{border:'1px solid black',padding:'20px'}}>
                            {additionalTerms||"Enter customer notes or any other details"}
                          </p>
                        </div>
                        <div>
                          Amount In Words:
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
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
                                  &#x20B9;{taxable + addChrg - discount}
                                </span>
                              </p>
                            </div>
                            <div className={props.gstContainerId}></div>
                            <div class="invoice-total-footer">
                              <h4>
                                Total Amount{" "}
                                <span>
                                  &#x20B9;
                                  {currencyFormat(taxable +
                                    addChrg -
                                    discount +
                                    (tempGstPercentageVal.length > 0
                                      ? tempGstPercentageVal.reduce((x, y) => x + y)
                                      : 0)
                                    )
                                    }
                                      
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-8" style={{display:'flex',flexDirection:'column',justifyContent:'end'}}>
                      <h4>Declaration:</h4>
                      <p style={{margin:'0'}}>We Declare that this Invoice shows the actual price of the Goods/Services described and that all particular are true and correct</p>
                      </div>
                      <div class="col-lg-4">
                    <div class="invoice-sign text-end">
  
  
                      <h4>{clientDetails.companyName}</h4>
                      <div class="signatureContainer">
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
  