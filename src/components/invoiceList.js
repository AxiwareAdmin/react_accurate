import React,{useEffect ,useState} from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import ViewInvoice from "./view-Invoice";


export default function InvoiceList () {

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

    useEffect(() => {

		window.nadimid=1;
        axios.get("http://localhost:8081/erp/invoices").then((res) => {
            res.data.map(elem=>{
            let trElem=document.createElement("tr");

            let tdElem=document.createElement("td");

            let textElem=document.createTextNode(elem.invoiceNo );//set data

            let inputElem=document.createElement("input");

            let spanElem=document.createElement("span");

            let labelElem=document.createElement("label")

            labelElem.className="custom_check";

            inputElem.type="checkbox";

            inputElem.name="invoice";

            spanElem.className="checkmark";

            labelElem.appendChild(inputElem);
            labelElem.appendChild(spanElem);

            tdElem.appendChild(labelElem);

            let aElem=document.createElement("a");

            aElem.className="invoice-link";

		    aElem.href="/viewInvoice?id="+elem.invoiceNo;

             aElem.appendChild(textElem)

            tdElem.appendChild(aElem);

            trElem.appendChild(tdElem);


            //invoice category
            tdElem=document.createElement("td");

            textElem=document.createTextNode("Advertising")

            tdElem.appendChild(textElem);

            trElem.appendChild(tdElem);



            tdElem=document.createElement("td");

            textElem=document.createTextNode(formatDate(elem.createdDate));

            tdElem.appendChild(textElem);

            trElem.appendChild(tdElem)


            tdElem=document.createElement("td");

            textElem=document.createTextNode(elem.customerName);

            tdElem.appendChild(textElem);

            trElem.appendChild(tdElem)


            tdElem=document.createElement("td");

            tdElem.className="text-primary";

            textElem=document.createTextNode(elem.invoiceValue);

            tdElem.appendChild(textElem);

            trElem.appendChild(tdElem)  


            tdElem=document.createElement("td");

            textElem=document.createTextNode(formatDate(elem.dueDate));

            tdElem.appendChild(textElem);

            trElem.appendChild(tdElem) 
            
            
            tdElem=document.createElement("td");
            spanElem=document.createElement("span")

            spanElem.className="badge bg-success-light"


            textElem=document.createTextNode(elem.invoiceStatus);

            spanElem.appendChild(textElem)

            tdElem.appendChild(spanElem);

            trElem.appendChild(tdElem)  

            tdElem=document.createElement("td");
            tdElem.className="text-end";
            trElem.appendChild(tdElem) 

            document.querySelector(".datatable tbody").appendChild(trElem);
        })

          });

        // <tr>
		// 											<td>
		// 												<label class="custom_check">
		// 													<input type="checkbox" name="invoice"/>
		// 													<span class="checkmark"></span> 
		// 												</label>
		// 												<a href="view-invoice.html" class="invoice-link">IN093439#@09</a>
		// 											</td>
		// 											<td>Advertising</td>
		// 											<td>16 Mar 2022</td>
		// 											<td>
		// 												<h2 class="table-avatar">
		// 													<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-04.jpg" alt="User Image"/> Barbara Moore</a>
		// 												</h2>
		// 											</td>
		// 											<td class="text-primary">$1,54,220</td>
		// 											<td>23 Mar 2022</td>
		// 											<td><span class="badge bg-success-light">Paid</span></td>
		// 											<td class="text-end">
		// 												<div class="dropdown dropdown-action">
		// 													<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
		// 													<div class="dropdown-menu dropdown-menu-end">
		// 														<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
		// 														<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
		// 														<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
		// 														<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
		// 														<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
		// 														<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
		// 													</div>
		// 												</div>
		// 											</td>
		// 										</tr>

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
  
  return (
    <div>
		<Sidebar />
        {/* <div style={{color:'white',backgroundColor:'red',textAlign:'center'}}>
            Hello Axiware <h1> I am here </h1>
        </div> */}

        <div class="page-wrapper">
			
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
                 {/* Report filter start */}
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
                    {/* Report filter End */}

                    <div class="card invoices-tabs-card">
						<div class="card-body card-body pt-0 pb-0">
							<div class="invoices-main-tabs">
								<div class="row align-items-center">
									<div class="col-lg-8 col-md-8">
										<div class="invoices-tabs">
											<ul>
												<li><a href="invoices.html" class="active">All Invoice</a></li>
												<li><a href="invoices-paid.html">Paid</a></li>	
												<li><a href="invoices-overdue.html">Overdue</a></li>		
												<li><a href="invoices-draft.html">Draft</a></li>	
												<li><a href="invoices-recurring.html">Recurring</a></li>
												<li><a href="invoices-cancelled.html">Cancelled</a></li>
											</ul>
										</div>
									</div>
									<div class="col-lg-4 col-md-4">
										<div class="invoices-settings-btn">
											<a href="invoices-settings.html" class="invoices-settings-icon">
												<i data-feather="settings"></i>
											</a>
											<a href="add-invoice.html" class="btn">
												<i data-feather="plus-circle"></i> New Invoice
											</a>
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
											<div class="inovices-amount">$8,78,797</div>
										</div>
									</div>
									<p class="inovices-all">All Invoices <span>50</span></p>
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
											<div class="inovices-amount">$4,5884</div>
										</div>
									</div>
									<p class="inovices-all">Paid Invoices <span>60</span></p>
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
											<div class="inovices-amount">$2,05,545</div>
										</div>
									</div>
									<p class="inovices-all">Unpaid Invoices <span>70</span></p>
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
											<div class="inovices-amount">$8,8,797</div>
										</div>
									</div>
									<p class="inovices-all">Cancelled Invoices <span>80</span></p>
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
												   <th>Invoice ID</th>
												   <th>Category</th>
												   <th>Created on</th>
												   <th>Invoice to</th>
												   <th>Amount</th>
												   <th>Due date</th>
												   <th>Status</th>
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
														<Link to={{pathname:"view-invoice",useState:"1234",}} class="invoice-link">IN093439#@09</Link>
													</td>
													<td>Advertising</td>
													<td>16 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-04.jpg" alt="User Image"/> Barbara Moore</a>
														</h2>
													</td>
													<td class="text-primary">$1,54,220</td>
													<td>23 Mar 2022</td>
													<td><span class="badge bg-success-light">Paid</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
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
													<td>Food</td>
													<td>14 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-06.jpg" alt="User Image"/> Karlene Chaidez</a>
														</h2>
													</td>
													<td class="text-primary">$1,222</td>
													<td>18 Mar 2022</td>
													<td><span class="badge bg-danger-light">Overdue</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
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
													<td>Marketing</td>
													<td>7 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-08.jpg" alt="User Image"/> Russell Copeland</a>
														</h2>
													</td>
													<td class="text-primary">$3,470</td>
													<td>10 Mar 2022</td>
													<td><span class="badge bg-primary-light">Cancelled</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
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
													<td>Repairs</td>
													<td>24 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-10.jpg" alt="User Image"/> Joseph Collins</a>
														</h2>
													</td>
													<td class="text-primary">$8,265</td>
													<td>30 Mar 2022</td>
													<td><span class="badge bg-success-light">Paid</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
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
													<td>Software</td>
													<td>17 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-11.jpg" alt="User Image"/> Jennifer Floyd</a>
														</h2>
													</td>
													<td class="text-primary">$5,200</td>
													<td>20 Mar 2022</td>
													<td><span class="badge bg-danger-light">Overdue</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
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
        </div>
     </div>


  );

}