import React,{useState,useEffect} from "react";
import Sidebar from "./Sidebar";
import { Link, useLocation ,useNavigate } from "react-router-dom";


export default function InvoicesCancelled (){

    const location = useLocation();
	const [month , setMonth] = useState("");
    const [invoicedo , setInvoiceDo] = useState("");
	const [allInv , setAllInv] = useState(0);
	const [paidInv , setPaidInv] = useState(0);
	const [unPaidInv , setUnPaidInv] = useState(0);
	const [canInv , setCanInv] = useState(0);
	const [allInvVal , setAllInvVal] = useState(0);
	const [paidInvVal , setPaidInvVal] = useState(0);
	const [unpaidInvVal , setUnpaidInvVal] = useState(0);
	const [canInvVal , setCanInvVal] = useState(0);
	const navigate = useNavigate();
	  const rendertoinvList = () => {
		navigate("/invoiceList?month="+month);
	  };
      const rendertoInvPaid = () => {
		navigate("/InvoicesPaid", { state: invoicedo });
	  };
	  const rendertoInvOverDue = () => {
		navigate("/InvoicesOverDue", { state: invoicedo });
	  };
	  const rendertoInvDraft = () => {
		navigate("/InvoicesDraft", { state: invoicedo });
	  };
	  const rendertoInvRecur = () => {
		navigate("/invoicesRecurring", { state: invoicedo });
	  };

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
	  
	useEffect(() =>{
	
     const data = location.state;
	 let invdotmp =invoicedo;
	 console.log("temp invoice do"+invdotmp);
	 if(data != null && data != "" && invdotmp == ""){
		setMonth(data[0].month);
		setInvoiceDo(data);
		  let allinvs = 0;
		  let paidinvs = 0;
		  let unpaidinvs = 0;
		  let cancelinvs = 0;
		  let allinvvals = 0;
		  let paidinvvals = 0;
		  let unpaidinvvals = 0;
		  let caninvvals = 0;
		  let srNo = 0;
	 data.map((elem) => {
		   
		   allinvs = allinvs + 1;
		   setAllInv(allinvs);
		   allinvvals = allinvvals + parseInt(elem.invoiceValue);
		   setAllInvVal(allinvvals);


		   if(elem.invoiceStatus == "Paid")
		   {
		   paidinvs = paidinvs + 1;
		   setPaidInv(paidinvs);
		   paidinvvals = paidinvvals + parseInt(elem.invoiceValue);
		   setPaidInvVal(paidinvvals);
		   }
		   if(elem.invoiceStatus == "Overdue")
		   {
		   unpaidinvs = unpaidinvs + 1;
		   setUnPaidInv(unpaidinvs);
		   unpaidinvvals = unpaidinvvals + parseInt(elem.invoiceValue);
		   setUnpaidInvVal(unpaidinvvals);
		   }

		   if(elem.invoiceStatus == "Cancelled")
		   {
		   cancelinvs = cancelinvs + 1;
		   setCanInv(cancelinvs);
		   caninvvals = caninvvals + parseInt(elem.invoiceValue);
		   setCanInvVal(caninvvals);
		   }
        if(elem.invoiceStatus == "Cancelled"){

            srNo = srNo + 1;

            let trElem=document.createElement("tr");

			let tdElem = document.createElement("td");
			let textElem = document.createTextNode(srNo);
			tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

            tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.invoiceNo );//set data
            // let inputElem=document.createElement("input");
            // let spanElem=document.createElement("span");
            // let labelElem=document.createElement("label")
            // labelElem.className="custom_check";
            // inputElem.type="checkbox";
            // inputElem.name="invoice";
            // spanElem.className="checkmark";
            // labelElem.appendChild(inputElem);
            // labelElem.appendChild(spanElem);
            // tdElem.appendChild(labelElem);
            let aElem=document.createElement("a");
            aElem.className="invoice-link";
		    aElem.href="/viewInvoice?id="+elem.invoiceNo;
            aElem.appendChild(textElem)
            tdElem.appendChild(aElem);
            trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.customerName);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(elem.invoiceValue);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);

            tdElem=document.createElement("td");
            textElem=document.createTextNode(formatDate(elem.createdDate));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);
			
			tdElem=document.createElement("td");
            textElem=document.createTextNode(formatDate(elem.createdDate));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);

			// tdElem=document.createElement("td");
            // spanElem=document.createElement("span")
            // spanElem.className="badge bg-success-light"
			// textElem=document.createTextNode(elem.invoiceStatus);
            // spanElem.appendChild(textElem)
            // tdElem.appendChild(spanElem);
            // trElem.appendChild(tdElem) 

			tdElem = document.createElement("td");
			tdElem.className ="text-end";
            aElem = document.createElement("a");
			aElem.href = "#";
			aElem.className = "btn btn-sm btn-white text-success me-2";
			let iEle = document.createElement("i");
			iEle.className = "far fa-edit me-1";
			textElem = document.createTextNode("Edit");
			aElem.appendChild(iEle);
			aElem.appendChild(textElem);
			tdElem.appendChild(aElem);
			aElem = document.createElement("a");
			aElem.href = "#";
			aElem.className = "btn btn-sm btn-white text-danger";
			iEle = document.createElement("i");
			iEle.className = "far fa-trash-alt me-1";
			textElem = document.createTextNode("Delete");
			aElem.appendChild(iEle);
			aElem.appendChild(textElem);
			tdElem.appendChild(aElem);
			trElem.appendChild(tdElem);


			document.querySelector(".datatable tbody").appendChild(trElem);
		}
	 })
	 }
	},[]);


    useEffect(() =>{


    },[]);

    return(
        <div>
            <Sidebar/>

            {/* <!-- Page Wrapper --> */}
            <div class="page-wrapper">
			
				{/* <!-- Page Content --> */}
                <div class="content container-fluid">

                	<div class="crms-title row bg-white">
                		<div class="col  p-0">
                			<h3 class="page-title m-0">
			                <span class="page-title-icon bg-gradient-primary text-white me-2">
			                  <i class="fa fa-file" aria-hidden="true"></i>
			                </span> Invoice </h3>
                		</div>
                		<div class="col p-0 text-end">
                			<ul class="breadcrumb bg-white float-end m-0 ps-0 pe-0">
								<li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
								<li class="breadcrumb-item active">Invoice</li>
							</ul>
                		</div>
                	</div>

					<div class="row align-items-center">
						<div class="col">
						</div>
						<div class="col-auto py-3">
							<a href="invoices.html" class="invoices-links active">
								<i data-feather="list"></i>
							</a>
							<a href="invoice-grid.html" class="invoices-links">
								<i data-feather="grid"></i>
							</a>
						</div>
					</div>
					{/* <!-- Report Filter --> */}
					<div class="card report-card">
						<div class="card-body pb-0">
							<div class="row">
								<div class="col-md-12">
									<ul class="app-listing">
										<li>
											<div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="user-plus" class="me-1 select-icon"></i> Select User</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">Customer Search</p>
														<div class="form-custom">
															<input type="text" class="form-control bg-grey" placeholder="Enter Customer Name"/>
														</div>
														<div class="selectBox-cont">
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span>  Brian Johnson
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span>  Russell Copeland
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span>  Greg Lynch
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> John Blair
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> Barbara Moore
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> Hendry Evan
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> Richard Miles
															</label>
														</div>
														<button type="submit" class="btn w-100 btn-primary">Apply</button>
														<button type="reset" class="btn w-100 btn-grey">Reset</button>
													</form>
												</div>
											</div>
										</li>
										<li>
											<div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="calendar" class="me-1 select-icon"></i> Select Date</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">Date Filter</p>
														<div class="selectBox-cont selectBox-cont-one h-auto">
															<div class="date-picker">
																<div class="form-custom cal-icon">
																	<input class="form-control datetimepicker" type="text" placeholder="From"/>
																</div>
															</div>
															<div class="date-picker pe-0">
																<div class="form-custom cal-icon">
																	<input class="form-control datetimepicker" type="text" placeholder="To"/>
																</div>
															</div>
															<div class="date-list">
																<ul>
																	<li><a href="#" class="btn date-btn">Today</a></li>
																	<li><a href="#" class="btn date-btn">Yesterday</a></li>
																	<li><a href="#" class="btn date-btn">Last 7 days</a></li>
																	<li><a href="#" class="btn date-btn">This month</a></li>
																	<li><a href="#" class="btn date-btn">Last month</a></li>
																</ul>
															</div>
														</div>
													</form>
												</div>
											</div>
										</li>
										<li>
											<div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="book-open" class="me-1 select-icon"></i> Select Status</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">By Status</p>
														<div class="selectBox-cont">
															<label class="custom_check w-100">
																<input type="checkbox" name="name" checked/>
																<span class="checkmark"></span> All Invoices
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Paid
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Overdue
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Draft
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Recurring
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Cancelled
															</label>
														</div>
														<button type="submit" class="btn w-100 btn-primary">Apply</button>
														<button type="reset" class="btn w-100 btn-grey">Reset</button>
													</form>
												</div>
											</div>
										</li>
										<li>
											<div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="bookmark" class="me-1 select-icon"></i> By Category</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">Category</p>
														<div class="form-custom">
															<input type="text" class="form-control bg-grey" placeholder="Enter Category Name"/>
														</div>
														<div class="selectBox-cont">
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Advertising
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Food
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Marketing
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Repairs
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Software
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Stationary
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Travel
															</label>
														</div>
														<button type="submit" class="btn w-100 btn-primary">Apply</button>
														<button type="reset" class="btn w-100 btn-grey">Reset</button>
													</form>
												</div>
											</div>
										</li>
										<li>
											<div class="report-btn">
												<a href="#" class="btn">
													<img src="assets/img/invoices-icon5.svg" alt="" class="me-2"/>
													Generate report
												</a>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- /Report Filter --> */}
					<div class="card invoices-tabs-card">
						<div class="card-body card-body pt-0 pb-0">
							<div class="invoices-main-tabs">
								<div class="row align-items-center">
									<div class="col-lg-8 col-md-8">
										<div class="invoices-tabs">
											<ul>
                                                <li><a to="#" onClick={rendertoinvList}>All Invoice</a></li>
												<li><a to="#" onClick={rendertoInvPaid} >Paid</a></li>	
												<li><a to="#" onClick={rendertoInvOverDue} >Overdue</a></li>		
												<li><a to="#" onClick={rendertoInvDraft} >Draft</a></li>	
												<li><a to="#"  onClick={rendertoInvRecur}>Recurring</a></li>
												<li><a to="#" class="active">Cancelled</a></li>
											</ul>
										</div>
									</div>
									<div class="col-lg-4 col-md-4">
										<div class="invoices-settings-btn">
											<a href="invoices-settings.html" class="invoices-settings-icon">
												<i data-feather="settings"></i>
											</a>
											<Link to="/add-invoice" class="btn">
												<i data-feather="plus-circle"></i> New Invoice
											</Link>
										</div>
									</div>
								</div>
							</div>
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
											<div class="inovices-amount">${allInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">All Invoices <span>{allInv}</span></p>
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
											<div class="inovices-amount">${paidInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">Paid Invoices <span>{paidInv}</span></p>
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
											<div class="inovices-amount">${unpaidInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">Unpaid Invoices <span>{unPaidInv}</span></p>
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
											<div class="inovices-amount">${canInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">Cancelled Invoices <span>{canInv}</span></p>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-sm-12">
							<div class="card card-table"> 
								<div class="card-body p-4">
									<div class="table-responsive">
										<table class="table table-striped table-nowrap custom-table mb-0 datatable">
											<thead class="thead-light">
												<tr>
												   <th>Sr No</th> 
												   <th>Invoice ID</th>
												   <th>Invoice to</th>
												   <th>Amount</th>
												   <th>Created on</th>
												   <th>Cancelled on</th>
												   <th class="text-end">Action</th>
												</tr>
											</thead>
											<tbody>
												{/* <tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@09</a>
													</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-04.jpg" alt="User Image"/> Barbara Moore</a>
														</h2>
													</td>
													<td class="text-primary">$1,54,220</td>
													<td>16 Mar 2022</td>
													<td>23 Mar 2022</td>
													<td class="text-end">
														<a href="edit-invoice.html" class="btn btn-sm btn-white text-success me-2"><i class="far fa-edit me-1"></i> Edit</a> 
														<a class="btn btn-sm btn-white text-danger" href="#" data-bs-toggle="modal" data-bs-target="#delete_paid"><i class="far fa-trash-alt me-1"></i>Delete</a>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@10</a>
													</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-06.jpg" alt="User Image"/> Karlene Chaidez</a>
														</h2>
													</td>
													<td class="text-primary">$1,222</td>
													<td>14 Mar 2022</td>
													<td>18 Mar 2022</td>
													<td class="text-end">
														<a href="edit-invoice.html" class="btn btn-sm btn-white text-success me-2"><i class="far fa-edit me-1"></i> Edit</a> 
														<a class="btn btn-sm btn-white text-danger" href="#" data-bs-toggle="modal" data-bs-target="#delete_paid"><i class="far fa-trash-alt me-1"></i>Delete</a>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@11</a>
													</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-08.jpg" alt="User Image"/> Russell Copeland</a>
														</h2>
													</td>
													<td class="text-primary">$3,470</td>
													<td>7 Mar 2022</td>
													<td>10 Mar 2022</td>
													<td class="text-end">
														<a href="edit-invoice.html" class="btn btn-sm btn-white text-success me-2"><i class="far fa-edit me-1"></i> Edit</a> 
														<a class="btn btn-sm btn-white text-danger" href="#" data-bs-toggle="modal" data-bs-target="#delete_paid"><i class="far fa-trash-alt me-1"></i>Delete</a>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@12</a>
													</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-10.jpg" alt="User Image"/> Joseph Collins</a>
														</h2>
													</td>
													<td class="text-primary">$8,265</td>
													<td>24 Mar 2022</td>
													<td>30 Mar 2022</td>
													<td class="text-end">
														<a href="edit-invoice.html" class="btn btn-sm btn-white text-success me-2"><i class="far fa-edit me-1"></i> Edit</a> 
														<a class="btn btn-sm btn-white text-danger" href="#" data-bs-toggle="modal" data-bs-target="#delete_paid"><i class="far fa-trash-alt me-1"></i>Delete</a>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@13</a>
													</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-11.jpg" alt="User Image"/> Jennifer Floyd</a>
														</h2>
													</td>
													<td class="text-primary">$5,200</td>
													<td>17 Mar 2022</td>
													<td>20 Mar 2022</td>
													<td class="text-end">
														<a href="edit-invoice.html" class="btn btn-sm btn-white text-success me-2"><i class="far fa-edit me-1"></i> Edit</a> 
														<a class="btn btn-sm btn-white text-danger" href="#" data-bs-toggle="modal" data-bs-target="#delete_paid"><i class="far fa-trash-alt me-1"></i>Delete</a>
													</td>
												</tr> */}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
                </div>
				{/* <!-- /Page Content --> */}
				
            </div>
			{/* <!-- /Page Wrapper --> */}


        </div>
    );
}