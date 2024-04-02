
import React,{useState,useEffect} from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Theme from "../Theme/Theme"


export default function MaterialInwardSalesRegister () {

    const navigate=useNavigate();

    var token=localStorage.getItem("token")
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


	var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+token
        }
      }

    function toCurrency(value) {
        try {
          if( isNaN(Number(value)) ) return value;
          return Number(value).toLocaleString("en-US",{style:"currency", currency:"USD"});    
        }
        catch(err) {
          throw err;
        }
      }
      function fromCurrency(value) {
        try {
          let num = Number(String(value).replace(/[\$,]/g,''));
          return isNaN(num) ? 0 : num;
        }
        catch(err) {
          throw err;
        }
      }

    useEffect(() =>{

       
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
          document.body.removeChild(script11);
        };
      }, []);

      useEffect(() =>{
        //clearing invoice list table
        document.querySelector("#invoiceListTable").innerHTML=''

        var totaInvoiceVal=0;
        var totalAmt=0;
        var closingBal=0;

        var tempTotal=0;
        
        axios.post(`${process.env.REACT_APP_LOCAL_URL}/viewSalesRegMaterialInward`,{financialYear:localStorage.getItem("financialYear")},header).then((res) =>{
        if(res.data.res) return;  
        res.data && res.data.map(ele => {
                if(ele != null && ele != "" && ele != undefined){
                let obj = JSON.parse(ele);
                tempTotal=tempTotal+fromCurrency(toCurrency(obj.amount));
                
                }
            }
            )

        }).finally(()=>{
        axios.post(`${process.env.REACT_APP_LOCAL_URL}/viewSalesRegMaterialInward`,{financialYear:localStorage.getItem("financialYear")},header).then((res) =>{
            if(res.data.res) return;
        res.data && res.data.map(ele => {
            if(ele != null && ele != "" && ele != undefined){
            let obj = JSON.parse(ele);
              console.log("map value"+obj.month);
              let trEle = document.createElement("tr");
              trEle.style='cursor:pointer;'
              trEle.addEventListener('click',()=>{
           
                window.location.href=`/materialInwardList?month=${obj.month}`;
              })
              let tdEle = document.createElement("td");
              let aEle = document.createElement("a");
              aEle.className="text-decoration-none";
              aEle.href = `/materialInwardList?month=${obj.month}`;
              let iEle = document.createElement("i");
              iEle.className = "fa fa-star";
              iEle.ariaHidden = "true";
              iEle.style = "padding-right:10px";
              let textEle = document.createTextNode(obj.month);
            //   aEle.appendChild(iEle); //not appending star in front of month name
              aEle.appendChild(textEle);
              tdEle.appendChild(aEle);
              trEle.appendChild(tdEle);

              tdEle = document.createElement("td");
              let divEle = document.createElement("div");
              divEle.className = "progress";
              let progBarDiv = document.createElement("div");
              progBarDiv.className = "progress-bar bg-gradient-danger";
              progBarDiv.role = "progressbar";

              console.log("invoice val:"+(fromCurrency(toCurrency(obj.amount))));

              console.log("total amt:"+tempTotal);
              console.log((fromCurrency(toCurrency(obj.amount))/tempTotal)*100)
              progBarDiv.style="width: "+Math.ceil((fromCurrency(toCurrency(obj.amount))/tempTotal)*100)+"%";
            //   progBarDiv.ariaValueNow = "30";
              progBarDiv.ariaValueMin = "0";
              progBarDiv.ariaValueMax = "100";
              divEle.appendChild(progBarDiv);
              tdEle.appendChild(divEle);
              trEle.appendChild(tdEle);

              tdEle = document.createElement("td");
              tdEle.className='textAlignEnd'
              aEle = document.createElement("a");
              aEle.href = `/materialInwardList?month=${obj.month}`;
            //   aEle.setAttribute(data-bs-toggle,"modal");
            //   aEle.setAttribute(data-bs-target,"#system-user");
            let tempTotInvoiceVal=toCurrency(fromCurrency(obj.totalInv)).replace(/[\$]/g,'');
            totaInvoiceVal=totaInvoiceVal+fromCurrency(toCurrency(obj.totalInv));
              textEle = document.createTextNode(tempTotInvoiceVal);
              aEle.appendChild(textEle);
              tdEle.appendChild(aEle);
              trEle.appendChild(tdEle);

              let tempAmt=toCurrency(fromCurrency(obj.amount)).replace(/[\$]/g,'');

              totalAmt=totalAmt+fromCurrency(toCurrency(obj.amount));

              tdEle = document.createElement("td");
              tdEle.className='textAlignEnd'
              textEle = document.createTextNode(tempAmt);
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);

              let tempClosingBalance=toCurrency(fromCurrency(obj.closingBal)).replace(/[\$]/g,'');//not used

              closingBal=closingBal+fromCurrency(toCurrency(obj.amount));

              tdEle = document.createElement("td");
              tdEle.className='textAlignEnd'
              textEle = document.createTextNode(toCurrency(closingBal).replace(/[\$]/g,''));
              tdEle.appendChild(textEle);
              trEle.appendChild(tdEle);

              document.querySelector("#invoiceListTable").appendChild(trEle);



            }
          });

        }).catch((e)=>{
            console.log(e)
          }).finally(()=>{

          

          let trElem = document.createElement("tr");
        let tdElem = document.createElement("td");
        trElem.style='background-color: #9a55ff'
        tdElem.style='color: #ffffff;font-weight:bold'

        let textElem=document.createTextNode("Grand Total");
        tdElem.appendChild(textElem);
        trElem.appendChild(tdElem);

        tdElem = document.createElement("td");
         textElem=document.createTextNode("");
         tdElem.appendChild(textElem);
        trElem.appendChild(tdElem);

        tdElem = document.createElement("td");
        tdElem.className='textAlignEnd'
        tdElem.style='color: #ffffff;font-weight:bold'
         textElem=document.createTextNode(toCurrency(totaInvoiceVal).replace(/[\$]/g,''));
         tdElem.appendChild(textElem);
        trElem.appendChild(tdElem);

        tdElem = document.createElement("td");
        tdElem.className='textAlignEnd'
        tdElem.style='color: #ffffff;font-weight:bold'
        textElem=document.createTextNode(toCurrency(totalAmt).replace(/[\$]/g,''));
         tdElem.appendChild(textElem);
        trElem.appendChild(tdElem);

        tdElem = document.createElement("td");
        tdElem.className='textAlignEnd'
        tdElem.style='color: #ffffff;font-weight:bold'
         textElem=document.createTextNode(toCurrency(closingBal).replace(/[\$]/g,''));
         tdElem.appendChild(textElem);
        trElem.appendChild(tdElem);

        document.querySelector("#invoiceListTable").append(trElem);
    })
})

      },[]);

      

    return(

      
        <div>
          <Theme/>
             <Navbar/>
            <Sidebar />
             
            <div class="page-wrapper">
			
           
            <div class="content container-fluid">

                <div class="crms-title row bg-white">
                    <div class="col  p-0">
                        <h3 class="page-title m-0">
                        <span class="page-title-icon bg-gradient-primary text-white me-2">
                          <i class="feather-check-square"></i>
                        </span> Material Inward Register </h3>
                    </div>
                    <div class="col p-0 text-end">
                        <ul class="breadcrumb bg-white float-end m-0 ps-0 pe-0">
                            <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li class="breadcrumb-item active">Material Inward Register</li>
                        </ul>
                    </div>
                </div>
                
               
                <div class="page-header pt-3 mb-0 ">
                    <div class="row">
                        
                        <div class="col text-end">
                            <ul class="list-inline-item ps-0">
                                <li class="nav-item dropdown list-inline-item add-lists">
                                    <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div class="nav-profile-text">
                                          <i class="fa fa-th" aria-hidden="true"></i>
                                        </div>
                                    </a>
                                    <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#add-new-list">Add New List View</a>
                                    </div>
                                </li>
                                <li class="list-inline-item">
                                    <Link class="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" to={`/CreateMaterialInward`}>Create Invoice</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
               
                <div class="row">
                    <div class="col-md-12">
                        <div class="card mb-0">
                            <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-nowrap custom-table mb-0 " style={{width:"100%"}}>
                                    <thead>
                                        <tr  style={{background: "linear-gradient(90deg, rgba(67,203,255,1) 25%, rgba(151,8,204,1) 100%)"}} >
                                            <th style={{color:"#fff",fontWeight:"bolder", width:"25%"}}>Month</th>
                                            <th style={{width:"60%"}}></th>
                                            <th style={{color:"#fff",fontWeight:"bolder"}}>Total Invoice</th>
                                            <th style={{color:"#fff",fontWeight:"bolder",width:"30%"}}>Amount</th>
                                            <th style={{color:"#fff",fontWeight:"bolder",paddingLeft:"15px"}}>Closing Balance</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody id="invoiceListTable">
                                   
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
               
                
            </div>
            
            
        </div> 

     </div>
       
    );

}