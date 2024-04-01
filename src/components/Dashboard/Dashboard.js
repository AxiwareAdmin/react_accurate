import React,{useEffect, useState} from 'react'
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import axios from 'axios';
import $ from 'jquery';
import BarChart from "../Chart/BarChart"
import Theme from '../Theme/Theme';

function Dashboard() {

    // var toggleTheme;

    let token=localStorage.getItem("token");
    var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+token
        }
      }

      

    const [sales,setSales]=useState(0);

    const [salesCount,setSalesCount]=useState(0);
    

    const [purchase,setPurchase]=useState(0);

    const [purchaseCount,setPurchaseCount]=useState(0);

    const [outstandingPayable,setOutstandingPayable]=useState(0);

    const [outstandingPayableCount,setOutstandingPayableCount]=useState(0);

    const [outstandingReceivable,setOutstandingReceivable]=useState(0);

    const [outstandingReceivableCount,setOutstandingReceivableCount]=useState(0);

    const [salesBarLabel,setSalesBarLabel]=useState([]);

    const [salesBarVales,setSalesBarValues]=useState([]);

    const [purchaseBarLabel,setPurchaseBarLabel]=useState([]);

    const [purchaseBarVales,setPurchaseBarValues]=useState([]);


    useEffect(()=>{

		
		debugger;
	    const script11 = document.createElement("script");
        script11.src = "/assets/js/jquery-3.6.0.min.js";
        script11.async = false;
    
        document.body.appendChild(script11);

		const script10 = document.createElement("script");
        script10.src = "/assets/js/bootstrap.bundle.min.js";
        script10.async = false;
    
        document.body.appendChild(script10); //can be uncommented


		const script8 = document.createElement("script");
        script8.src = "/assets/plugins/moment/moment.min.js";
        script8.async = false;
    
        document.body.appendChild(script8);

		const script7 = document.createElement("script");
        script7.src = "/assets/js/bootstrap-datetimepicker.min.js";
        script7.async = false;
    
        document.body.appendChild(script7); //can be uncommented
    
      
    
       
    
        const script9 = document.createElement("script");
        script9.src = "/assets/js/jquery.slimscroll.min.js";
        script9.async = false;
    
        document.body.appendChild(script9); //can be uncommented
    
       
    
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
	},[])


      useEffect(()=>{


        axios.post(`${process.env.REACT_APP_LOCAL_URL}/viewSalesReg`,{financialYear:localStorage.getItem("financialYear")},header).then((res)=>{
            if(res.data.res) return;
            console.log("Got data:")

            let tempSalesBarLabel=[];
            let tempSalesBarvalues=[];
            
            res.data.map((invoiceDO)=>{
                debugger;
                invoiceDO=JSON.parse(invoiceDO)
                tempSalesBarLabel.push(invoiceDO.month);
                tempSalesBarvalues.push(invoiceDO.amount);
            })

            setSalesBarLabel(tempSalesBarLabel);
            setSalesBarValues(tempSalesBarvalues);
            

        })


        axios.post(`${process.env.REACT_APP_LOCAL_URL}/getPurchases`,{financialYear:localStorage.getItem("financialYear")},header).then((res)=>{
            if(res.data.res) return;
            console.log("Got data:")

            let tempPurchaseBarLabel=[];
            let tempPurchaseBarvalues=[];
            
            res.data.map((invoiceDO)=>{
                debugger;
                invoiceDO=JSON.parse(invoiceDO)
                tempPurchaseBarLabel.push(invoiceDO.month);
                tempPurchaseBarvalues.push(invoiceDO.amount);
            })

            setPurchaseBarLabel(tempPurchaseBarLabel);

            setPurchaseBarValues(tempPurchaseBarvalues);

        })

        

        axios.get(`${process.env.REACT_APP_LOCAL_URL}/invoices/year/${localStorage.getItem("financialYear")}`,header)
        .then((res)=>{
            if(res.data.res) return;
            let totalAmt=0;
            let count=0;
            res.data.map((invoice)=>{
                totalAmt=totalAmt+invoice.invoiceValue;
                count=count+1;
            })

            setSales(totalAmt);

            setSalesCount(count);
        })


        axios.get(`${process.env.REACT_APP_LOCAL_URL}/outstandingCustomer/year/${localStorage.getItem("financialYear")}`,header)
        .then((res)=>{

            if(res.data.res) return;

            let totalAmt=0;
            let count=0;
            let srno=1;
            res.data.map((invoice)=>{
                let trElem = document.createElement("tr");
                let tdElem = document.createElement("td");
                let textElem=document.createTextNode(srno);

                tdElem.appendChild(textElem);
                trElem.appendChild(tdElem);


                tdElem = document.createElement("td");
                textElem=document.createTextNode(invoice[0]);

                tdElem.appendChild(textElem);
                trElem.appendChild(tdElem);


                tdElem = document.createElement("td");
                textElem=document.createTextNode(invoice[1]);

                tdElem.appendChild(textElem);
                trElem.appendChild(tdElem);


                document.querySelector(".receivableTable tbody").appendChild(trElem);

                totalAmt=totalAmt+invoice[1];
                count=count+invoice[2];
                srno+=1;
            })

        
            setOutstandingReceivable(totalAmt)
            setOutstandingReceivableCount(count);

        })



        axios.get(`${process.env.REACT_APP_LOCAL_URL}/outstandingSupplier/year/${localStorage.getItem("financialYear")}`,header)
        .then((res)=>{
            if(res.data.res) return;
            let totalAmt=0;
            let count=0;
            let srno=1;
            res.data.map((invoice)=>{

                let trElem = document.createElement("tr");
                let tdElem = document.createElement("td");
                let textElem=document.createTextNode(srno);

                tdElem.appendChild(textElem);
                trElem.appendChild(tdElem);


                tdElem = document.createElement("td");
                textElem=document.createTextNode(invoice[0]);

                tdElem.appendChild(textElem);
                trElem.appendChild(tdElem);


                tdElem = document.createElement("td");
                textElem=document.createTextNode(invoice[1]);

                tdElem.appendChild(textElem);
                trElem.appendChild(tdElem);


                document.querySelector(".payableTable tbody").appendChild(trElem);

                totalAmt=totalAmt+invoice[1];
                count=count+invoice[2];
                srno+=1;

                totalAmt=totalAmt+invoice[1];
                count=count+invoice[2];
            })

            setOutstandingPayable(totalAmt)
            setOutstandingPayableCount(count);
        })

        axios.post(`${process.env.REACT_APP_LOCAL_URL}/purchases`,{financialYear:localStorage.getItem("financialYear")},header)
        .then((res)=>{
            if(res.data.res) return;
            let totalAmt=0;
            let count=0;
            res.data.map((invoice)=>{
                totalAmt=totalAmt+invoice.invoiceValue;
                count=count+1;
            })

            setPurchase(totalAmt);

            setPurchaseCount(count);
        })
      },[])

  return (
    <div>
        <Theme/>
         <Navbar/>
		<Sidebar />
      
      <div class="main-wrapper">

<div class="page-wrapper">
    <div class="content container-fluid">

        
        <div class="crms-title row bg-white mb-4">
            <div class="col">
                <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="la la-table"></i>
                </span> <span>Dashboard</span></h3>
            </div>
            <div class="col text-end">
                <ul class="breadcrumb bg-white float-end m-0 ps-0 pe-0">
                    <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li class="breadcrumb-item active">Deals Dashboard</li>
                </ul>
            </div>
        </div>
        
        
        <div class="row">
            <div class="col-xl-3 col-sm-6 col-12">
                <div class="card inovices-card">
                    <div class="card-body">
                        <div class="inovices-widget-header">
                            <span class="inovices-widget-icon">
                                <img src="assets/img/invoices-icon1.svg" alt=""/>
                            </span>
                            <div class="inovices-dash-count">
                                <div class="inovices-amount">₹{sales}</div>
                            </div>
                        </div>
                        <p class="inovices-all">Sales <span>{salesCount}</span></p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <div class="card inovices-card">
                    <div class="card-body">
                        <div class="inovices-widget-header">
                            <span class="inovices-widget-icon">
                                <img src="assets/img/invoices-icon2.svg" alt=""/>
                            </span>
                            <div class="inovices-dash-count">
                                <div class="inovices-amount">₹{purchase}</div>
                            </div>
                        </div>
                        <p class="inovices-all">Purchase <span>{purchaseCount}</span></p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <div class="card inovices-card">
                    <div class="card-body">
                        <div class="inovices-widget-header">
                            <span class="inovices-widget-icon">
                                <img src="assets/img/invoices-icon3.svg" alt=""/>
                            </span>
                            <div class="inovices-dash-count">
                                <div class="inovices-amount">₹{outstandingReceivable}</div>
                            </div>
                        </div>
                        <p class="inovices-all">Outstanding Receivable<span>{outstandingReceivableCount}</span></p>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <div class="card inovices-card">
                    <div class="card-body">
                        <div class="inovices-widget-header">
                            <span class="inovices-widget-icon">
                                <img src="assets/img/invoices-icon4.svg" alt=""/>
                            </span>
                            <div class="inovices-dash-count">
                                <div class="inovices-amount">₹{outstandingPayable}</div>
                            </div>
                        </div>
                        <p class="inovices-all">Outstanding Payable <span>{outstandingPayableCount}</span></p>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="row ">
            <div class="col-md-4">
                <div class="card h-100">
                  <div class="card-body">
                      <h3 class="card-title">Display Ledger</h3>
                     <canvas id="pie-chart" width="800" height="250"></canvas>
                  </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">Profit and Loss</h3>
                      <canvas id="bar-chart-horizontal" width="800" height="250"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">Bank Accounts</h3>
                      <canvas id="bar-chart-horizontal" width="800" height="250"></canvas>
                    </div>
                </div>
            </div>
        </div><br/><br/>
        
        <div class="row graphs">
            <div class="col-md-4">	
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Cash Book</div>
                    </div>
                    <div class="card-body">
                        <div class="h-250" id="flotPie1"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">	
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Fund Flow</div>
                    </div>
                    <div class="card-body">
                        <div class="h-250" id="morrisDonut1"></div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">	
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">Expenses</div>
                    </div>
                    <div class="card-body">
                        <div class="h-250" id="flotPie2"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row graphs">
            <div class="col-md-6">	
                <div class="card">
                        <div class="card-header">
                            <div class="card-title">Sales / Gradient Bar Chart</div>
                        </div>
                        <div class="card-body">
                            <div>
                                <BarChart label={salesBarLabel} values={salesBarVales} salesVal={sales}/>
                                {/* <canvas id="chartBar3" class="h-300"></canvas> */}
                            </div>
                        </div>
                    </div>
            </div>
            <div class="col-md-6">	
                <div class="card">
                        <div class="card-header">
                            <div class="card-title">Purchase / Gradient Bar Chart</div>
                        </div>
                        <div class="card-body">
                            <div>
                            <BarChart label={purchaseBarLabel} values={purchaseBarVales} salesVal={purchase}/>
                                {/* <canvas id="chartBar3" class="h-300"></canvas> */}
                            </div>
                        </div>
                    </div>
            </div>
            
        </div>
<div class="row graphs">
            <div class="col-md-6">	
                <div class="card">
                        <div class="card-header">
                            <div class="card-title">Outstanding Receivable</div>
                        </div>
                        <div class="card-body">
                            <div>
                                {/* <canvas id="chartBar3" class="h-300"></canvas> */}

                                <table class="table table-striped receivableTable table-nowrap custom-table mb-0 datatable">
											<thead class="thead-light">
												<tr style={{background: "linear-gradient(90deg, rgba(67,203,255,1) 25%, rgba(151,8,204,1) 100%)",color:"white"}}>
													<th>Sr No</th>
												    <th>Customer Name</th>
                                                    <th>Total</th>
												</tr>
											</thead>
											<tbody>
												
											</tbody>
											<tfoot id="tableFooter">
												
											</tfoot>
										</table>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="col-md-6">	
                <div class="card">
                        <div class="card-header">
                            <div class="card-title">Outstanding Payable</div>
                        </div>
                        <div class="card-body">
                            <div>
                                {/* <canvas id="chartBar3" class="h-300"></canvas> */}

                                <table class="table table-striped payableTable table-nowrap custom-table mb-0 datatable">
											<thead class="thead-light">
												<tr style={{background: "linear-gradient(90deg, rgba(67,203,255,1) 25%, rgba(151,8,204,1) 100%)",color:"white"}}  >
													<th>Sr No</th>
												    <th>Supplier Name</th>
                                                    <th>Total</th>
												</tr>
											</thead>
											<tbody>
												
											</tbody>
											<tfoot id="tableFooter">
												
											</tfoot>
										</table>
                            </div>
                        </div>
                    </div>
            </div>
            
        </div>
        
        
    </div>			
</div>

</div>

    </div>
  )
}

export default Dashboard
