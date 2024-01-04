import React,{useEffect , useRef, useState} from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation,useParams,useNavigate } from "react-router-dom";
import Navbar from "./Navbar";




export default function ViewInvoice (){

  var token=localStorage.getItem("token")
	var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+token
        }
      }

  const initilized = useRef(false);


   function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    const printButtonClicked=(e)=>{
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

        var nWindow = window.open('');

        // append the canvas to the body
        nWindow.document.body.appendChild(canvas);
    
        // focus on the window
        nWindow.focus();
    
        // print the window
        nWindow.print();

    });
    

    }

    function ImageSourcetoPrint(source) {
      return "<html><head><script>function step1(){\n" +
     "setTimeout('step2()', 10);}\n" +
     "function step2(){window.print();window.close()}\n" +
     "</scri" + "pt></head><body onload='step1()'>\n" +
     "<img src='" + source + "' /></body></html>";
   }
  
   function ImagePrint(source) {
     var Pagelink = "about:blank";
     var pwa = window.open(Pagelink, "_new");
     pwa.document.open();
     pwa.document.write(ImageSourcetoPrint(source));
     pwa.document.close();
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

      }, [])  

                  
      useEffect(() => {
        


          var url=new URL(window.location.href);
          let id1=url.searchParams.get("id");
          let action=url.searchParams.get("action");
          let serviceChkT = url.searchParams.get("serviceChk");
          setBillToAddrShow(serviceChkT);
          
          if(!initilized.current){  
            initilized.current=true;
            axios
            .get("http://localhost:8080/viewInvoice?invId="+id1,header)
            .then((res) => {
              
              setinvNo(res.data.invoiceNo);

            setServiceCheck(res.data.serviceCheck);

          let billingaddr = res.data.billingAddress;
          if(billingaddr !=null && billingaddr != undefined && billingaddr != "")
          setToAddr(billingaddr);
          
          let custName = res.data.customerName;
          if(custName != null && custName != undefined && custName != "")
          setcustName(custName);
          
          let fromaddr1 = res.data.shippingAddress;
          if(fromaddr1 != null && fromaddr1 != undefined && fromaddr1 != "")
          setfromAddr(fromaddr1);
         
          let toCustName = res.data.shippingCustomerName;
          if(toCustName != null && toCustName != undefined && toCustName != "")
          setcmpName(toCustName);

          let ponum = res.data.poNumber;
          if(ponum != null && ponum != undefined && ponum != "")
          setpoNum(ponum);

          let tIssueDate = res.data.createdDate;
          if(tIssueDate != null && tIssueDate != undefined && tIssueDate != "")
          setissDt(formatDate(tIssueDate));

          let tDueDt=res.data.dueDate;
          if(tDueDt != null && tDueDt != undefined && tDueDt != "")
          setDueDt(formatDate(tDueDt));

          let payTermT = res.data.paymentTerms;
          if(payTermT != null && payTermT != undefined && payTermT != "")
          setpayTerm(payTermT);

          let taxableT = res.data.taxableValue;
          if(taxableT != null && taxableT != undefined && taxableT != "")
          settaxable(taxableT);

          let addchrgs = res.data.additionalCharges;
          if(addchrgs != null && addchrgs != undefined && addchrgs != "")
          setaddChrg(addchrgs);

          let discnt = res.data.discount;
          if(discnt != null && discnt != undefined && discnt != "")
          setdiscount(discnt);

          let tot = res.data.invoiceValue;
          if(tot != null && tot != undefined && tot != "")
          settotal(tot);

         res.data.invoiceProductDO.map(ele => {

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
           textEle = document.createTextNode("$"+ele.rate);
           tdEle.appendChild(textEle);
           trEle.appendChild(tdEle);

           tdEle = document.createElement("td");
           textEle = document.createTextNode(ele.quantity);
           tdEle.appendChild(textEle);
           trEle.appendChild(tdEle);

           tdEle = document.createElement("td");
           textEle = document.createTextNode(ele.discount+"%");
           tdEle.appendChild(textEle);
           trEle.appendChild(tdEle);

           tdEle = document.createElement("td");
           tdEle.className = "text-end";
           textEle = document.createTextNode("$"+ele.amount);
           tdEle.appendChild(textEle);
           trEle.appendChild(tdEle);

           document.querySelector("#productTable").appendChild(trEle);



         });

         if(action == "download" && action != null && action != "" && action != undefined){
            
            setTimeout(function () {
              downloadpdf(res.data.invoiceNo);
          }, 500);
        }
      
        }).catch((e)=>{
          console.log(e)
        })

      }

      });
       
      const invoicepdf = useRef(null);
      // useEffect (() =>{
     
      //   if(initilized.current){
     const downloadpdf = (invoiceNo) =>{
          html2canvas(invoicepdf.current).then((canvas) => {
					const imgData = canvas.toDataURL("image/png");
					const pdf = new jsPDF();
					pdf.addImage(imgData, "JPEG", 0, 0,210,310);
					pdf.save(invoiceNo+".pdf");
          
				//   });
        // }

      });
      
    }

      const [invNo,setinvNo]=useState(null);
  const [compName , setcmpName] = useState("");
  const [fromAddr , setfromAddr] = useState("");
  const [custName , setcustName] = useState("");
  const [toAddr, setToAddr] = useState('');
  const [poNum , setpoNum] = useState("");
  const [issDt , setissDt] = useState("");
  const [dueDt , setDueDt] = useState("");
  const [dueAmt , setdueAmt] = useState("");
  const [taxable , settaxable] = useState("");
  const [addChrg , setaddChrg] = useState("");
  const [discount , setdiscount] = useState("");
  const [total , settotal] = useState("");
  const [subTotal , setsubTotal] = useState("");
  const [payTerm , setpayTerm] = useState("");
  const [billToAddrShow , setBillToAddrShow] = useState(false);

  const [serviceCheck,setServiceCheck]=useState("false")
  
  return (
    <div>
       <Navbar/>
		<Sidebar />
    <div class="page-wrapper" ref={invoicepdf}>
			
      
              <div class="content container-fluid">

                <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="card invoice-info-card">
              <div class="card-body">
                <div class="invoice-item invoice-item-one">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="invoice-logo">
                        <img src="assets/img/logo.png" alt="logo"/>
                      </div>
                      <div class="invoice-head">
                        <h2>Invoice</h2>
                        <p>Invoice Number : {invNo}</p>
                      </div>
                    </div>
                    {/* <div class="col-md-6">
                      <div class="invoice-info">
                        <strong class="customer-text-one">Invoice From</strong>
                        <h6 class="invoice-name">Company Name : {compName}</h6>
                        <p class="invoice-details"/>
                         {fromAddr}
                        <p/>
                      </div>
                    </div> */}
                     
                      <div class="col-md-4" style={{display:'flex',flexDirection:'column'}}>
                        <div class="invoice-item-box">
                          <p>Invoice No. : {payTerm}</p>
                          <p class="mb-0">Invoice Date : {poNum}</p>
                        </div>
              
                        <div class="invoice-item-box">
                          <p>PO No. : {poNum}</p>
                          <p class="mb-0">PO Date : {}</p>
                        </div>
                       
                        </div>
                  </div>
                </div>
                
               
                <div class="invoice-item invoice-item-two">
                  <div class="row">
                   {serviceCheck=='false' &&<div class="col-md-6">
                      <div class="invoice-info" style={billToAddrShow ? {display:"none"} : {display : "block"}}>
                        <strong class="customer-text-one">Billed to</strong>
                        <h6 class="invoice-name">Customer Name : {custName}</h6>
                        <p class="invoice-details invoice-details-two"/>
                         {toAddr}
                        <p/>
                      </div>
                    </div>}
                    <div class={`col-md-${serviceCheck=='false'?6:12}`}>
                      <div class="invoice-info invoice-info2">
                        <strong class="customer-text-one">Payment Details</strong>
                        <p class="invoice-details"/>
                          Debit Card <br/>
                          XXXXXXXXXXXX-2541 <br/>
                          HDFC Bank
                        <p/>
                        {/*
                        check it again
                        <div class="invoice-item-box">
                          <p>Recurring : {payTerm}</p>
                          <p class="mb-0">PO Number : {poNum}</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
               
                <div class="invoice-issues-box">
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
                </div>
               
                <div class="invoice-item invoice-table-wrap">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <table class="invoice-table table table-center mb-0">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Category</th>
                              <th>Rate/Item</th>
                              <th>Quantity</th>
                              <th>Discount (%)</th>
                              <th class="text-end">Amount</th>
                            </tr>
                          </thead>
                          <tbody id="productTable">
                            {/* <tr>
                              <td>Apple Ipad</td>
                              <td>Ipad</td>
                              <td>$11,500</td>
                              <td>1</td>
                              <td>10%</td>
                              <td class="text-end">$11,000</td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                

                <div class="row align-items-center justify-content-center">
                  <div class="col-lg-6 col-md-6">
                    <div class="invoice-terms">
                      <h6>Notes:</h6>
                      <p class="mb-0">Enter customer notes or any other details</p>
                    </div>
                    <div class="invoice-terms">
                      <h6>Terms and Conditions:</h6>
                      <p class="mb-0">Enter customer notes or any other details</p>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="invoice-total-card">
                      <div class="invoice-total-box">
                        <div class="invoice-total-inner">
                          <p>Taxable <span>${taxable}</span></p>
                          <p>Additional Charges <span>${addChrg}</span></p>
                          <p>Discount <span>${discount}</span></p>
                          <p class="mb-0">Sub total <span>$3,300.00</span></p>
                        </div>
                        <div class="invoice-total-footer">
                          <h4>Total Amount <span>${total}</span></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="invoice-sign text-end">
                <h4>Company name here:</h4>
                  <img class="img-fluid d-inline-block" src="assets/img/signature.png" alt="sign"/>
                  <span class="d-block">Authorized Signatory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="page-header invoices-page-header">
<div class="row align-items-center">
<div class="col-lg-9 col-md-12"><a style={{color:'grey'}}/>

<div class="form-group float-end mb-0">
<button onClick={printButtonClicked} class="btn btn-primary"  id="submitButton" type="submit" value="Submit">Print</button>
</div>

</div>
</div>
</div>






    </div>

    <iframe id="ifmcontentstoprint" style={{height: '0px', width: '0px', position: 'absolute'}}></iframe>

   </div>
 );
}