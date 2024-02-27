import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {


  return (
    <div>
      <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
					<div id="sidebar-menu" className="sidebar-menu">

					<ul>
							<li className="nav-item nav-profile">
				              <a href="#" className="nav-link">
				                <div className="nav-profile-image">
				                  <img src="assets/img/profiles/avatar-17.jpg" alt="profile"/>
				                  
				                </div>
				                <div className="nav-profile-text d-flex flex-column">
				                  <span className="font-weight-bold mb-2">David Grey. H</span>
				                  <span className="text-white text-small">Project Manager</span>
				                </div>
				                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
				              </a>
				            </li>
							<li className="menu-title"> 
								<span>Main</span>
							</li>
							<li>
							<Link to="/dashboard" className="active"><i className="fa fa-th-large"></i> <span> Dashboard</span> </Link>
							
								{/* <ul className="sub-menus">
									<li><Link to="/dashboard" className="active">Deals Dashboard</Link></li>
									<li><a href="projects-dashboard.html">Projects Dashboard</a></li>
									<li><a href="leads-dashboard.html">Leads Dashboard</a></li>
								</ul> */}
							</li>


							<li className="submenu">
								<a href="#"><i className="fa fa-university"></i> <span>  Banking </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><Link to="/salesRegister">Bank Transactions</Link></li>
									<li><a href="invoice-grid.html" >Bank Entry</a></li>
									<li><Link to="/add-invoice">Bank Reconciliation</Link></li>
								</ul>
							</li>


							<li className="submenu">
								<a href="#"><i className="feather-book"></i> <span>  Cash Book </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><Link to="/salesRegister">Cash Transactions</Link></li>
									<li><a href="invoice-grid.html" >Cash Entry</a></li>
								</ul>
							</li>

							<li className="submenu">
								<a href="#"><i className="fa fa-calculator"></i> <span>  Accounting </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><Link to="/salesRegister">Journal Voucher</Link></li>
									<li><a href="invoice-grid.html" >Debit Note</a></li>
									<li><Link to="/add-invoice">Credit Note</Link></li>
								</ul>
							</li>


							
							

						
{/* 							
							<li> 
								<a href="tasks.html"><i className="feather-check-square"></i> <span>Tasks</span></a>
							</li>
							<li> 
								<a href="contacts.html"><i className="feather-smartphone"></i> <span>Contacts</span></a>
							</li>
							<li> 
								<a href="companies.html"><i className="feather-database"></i> <span>Companies</span></a>
							</li>
							<li> 
								<a href="leads.html"><i className="feather-user"></i> <span>Leads</span></a>
							</li>
							
							<li> 
								<a href="deals.html"><i className="feather-radio"></i> <span>Deals</span></a>
							</li>
							<li> 
								<a href="projects.html"><i className="feather-grid"></i> <span>Projects</span></a>
							</li>
							<li> 
								<a href="reports.html"><i className="feather-bar-chart-2"></i> <span>Reports</span></a>
							</li>
							<li> 
								<a href="activities.html"><i className="feather-calendar"></i> <span>Activities</span></a>
							</li>	 */}
							
							<li className="submenu">
								<a href="#"><i className="feather-file-text"></i> <span>  Sales </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><Link to={`/salesRegister?${process.env.REACT_APP_INVOICE_TYPE}=${process.env.REACT_APP_GST_SALE_INVOICE}`}>GST Sale</Link></li>
									<li><Link to={`/salesRegister?${process.env.REACT_APP_INVOICE_TYPE}=${process.env.REACT_APP_CASH_SALE_INVOICE}`}>Cash Sale</Link></li>
									<li><Link to={`/salesRegister?${process.env.REACT_APP_INVOICE_TYPE}=${process.env.REACT_APP_PROFORMA_INVOICE}`}>Proforma Invoice</Link></li>
									<li><Link to={`/add-invoice?${process.env.REACT_APP_INVOICE_TYPE}=${process.env.REACT_APP_GST_SALE_INVOICE}`}>Create Invoice</Link></li>
									<li><a href="edit-invoice.html">Create Customer</a></li>
									<li><a href="edit-invoice.html">Create Product and Services</a></li>
									<li><a href="edit-invoice.html">Create E-Way Bill</a></li>
									<li><a href="view-invoice.html">Create E-Invoice</a></li>
									<li><a href="invoices-settings.html">Invoices Settings</a></li>
								</ul>
							</li>


							<li class="submenu">
								<a href="#"><i class="fa fa-cart-arrow-down"></i> <span> Purchase</span>
									<span class="menu-arrow"></span>
								</a>
								<ul class="sub-menus">
									<li><a href="/purchaseRegister" >Purchase Register</a></li>
									<li><a href="/add-purchase">Add Purchase</a></li>
									<li><a href="invoice.html">Create Supplier</a></li>
									<li><a href="invoice.html">Products And Services</a></li>
								</ul>
							</li>

							<li class="submenu">
								<a href="#"><i class="feather-clipboard"></i> <span> Quotation</span>
									<span class="menu-arrow"></span>
								</a>
								<ul class="sub-menus">
{/* 
									<li><a href="/CreateQuotation" >Create Quotation</a></li>
									<li><a href="/SalesRegisterQuotation" >All Quotation</a></li> */}

									<li><a href="/SalesRegisterQuotation" >Customer Quotation</a></li>
									<li><a href="/add-purchase">Supplier Quotation</a></li>
									<li><a href="invoice.html">Create Customer</a></li>
									<li><a href="invoice.html">Create Supplier</a></li>
									<li><a href="invoice.html">Products And Services</a></li>
								</ul>
							</li>

							<li class="submenu">
								<a href="#"><i class="fa fa-cart-plus"></i> <span> Purchase Order</span>
									<span class="menu-arrow"></span>
								</a>
								<ul class="sub-menus">
									<li><a href="/purchaseRegister" >Customer Purchase Order</a></li>
									<li><a href="/add-purchase">Supplier Purchase Order</a></li>
									<li><a href="invoice.html">Create Customer</a></li>
									<li><a href="invoice.html">Create Supplier</a></li>
									<li><a href="invoice.html">Products And Services</a></li>
								</ul>
							</li>

							<li class="submenu">
								<a href="#"><i class="feather-clipboard"></i> <span>Inventory</span>
									<span class="menu-arrow"></span>
								</a>
								<ul class="sub-menus">
									<li><a href="/purchaseRegister" >Material Inward</a></li>
									<li><a href="/add-purchase">Material Outward</a></li>
									<li><a href="invoice.html">Material Transfer</a></li>
									<li><a href="invoice.html">Products And Services</a></li>
								</ul>
							</li>


							<li class="submenu">
								<a href="#"><i class="feather-bar-chart-2"></i> <span>Reports</span>
								</a>
							</li>

							{/* <li> 
								<a href="email.html"><i className="feather-mail"></i> <span>Email</span></a>
							</li> */}
							{/* <li> 
								<a href="settings.html"><i className="feather-settings"></i> <span>Settings</span></a>
							</li> */}
							
							{/* <li className="menu-title"> 
								<span>Pages</span>
							</li> */}
							
							{/* <li className="submenu">
								<a href="#"><i className="feather-alert-triangle"></i> <span> Error Pages </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="error-404.html">404 Error </a></li>
									<li><a href="error-500.html">500 Error </a></li>
								</ul>
							</li> */}
							
							{/* <li className="submenu">
								<a href="#"><i className="feather-list"></i> <span> Pages </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="faq.html"> FAQ </a></li>
									<li><a href="terms.html"> Terms </a></li>
									<li><a href="privacy-policy.html"> Privacy Policy </a></li>
									<li><a href="blank-page.html"> Blank Page </a></li>
								</ul>
							</li> */}
							{/* <li className="menu-title"> 
								<span>UI Interface</span>
							</li>
							<li> 
								<a href="components.html"><i className="feather-layout"></i> <span>Components</span></a>
							</li>							
							<li className="submenu">
								<a href="#"><i className="feather feather-box"></i> <span>Elements </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="sweetalerts.html">Sweet Alerts</a></li>
									<li><a href="tooltip.html">Tooltip</a></li>
									<li><a href="popover.html">Popover</a></li>
									<li><a href="ribbon.html">Ribbon</a></li>
									<li><a href="clipboard.html">Clipboard</a></li>
									<li><a href="drag-drop.html">Drag & Drop</a></li>
									<li><a href="rangeslider.html">Range Slider</a></li>
									<li><a href="rating.html">Rating</a></li>
									<li><a href="toastr.html">Toastr</a></li>
									<li><a href="text-editor.html">Text Editor</a></li>
									<li><a href="counter.html">Counter</a></li>
									<li><a href="scrollbar.html">Scrollbar</a></li>
									<li><a href="spinner.html">Spinner</a></li>
									<li><a href="notification.html">Notification</a></li>
									<li><a href="lightbox.html">Lightbox</a></li>
									<li><a href="stickynote.html">Sticky Note</a></li>
									<li><a href="timeline.html">Timeline</a></li>
									<li><a href="horizontal-timeline.html">Horizontal Timeline</a></li>
									<li><a href="form-wizard.html">Form Wizard</a></li>
								</ul>
							</li>
							<li className="submenu">
								<a href="#"><i className="feather feather-bar-chart-2"></i> <span> Charts </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="chart-apex.html">Apex Charts</a></li>
									<li><a href="chart-js.html">Chart Js</a></li>
									<li><a href="chart-morris.html">Morris Charts</a></li>
									<li><a href="chart-flot.html">Flot Charts</a></li>
									<li><a href="chart-peity.html">Peity Charts</a></li>
									<li><a href="chart-c3.html">C3 Charts</a></li>
								</ul>
							</li>
							<li className="submenu">
								<a href="#"><i className="feather feather-award"></i> <span> Icons </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="icon-fontawesome.html">Fontawesome Icons</a></li>
									<li><a href="icon-feather.html">Feather Icons</a></li>
									<li><a href="icon-ionic.html">Ionic Icons</a></li>
									<li><a href="icon-material.html">Material Icons</a></li>
									<li><a href="icon-pe7.html">Pe7 Icons</a></li>
									<li><a href="icon-simpleline.html">Simpleline Icons</a></li>
									<li><a href="icon-themify.html">Themify Icons</a></li>
									<li><a href="icon-weather.html">Weather Icons</a></li>
									<li><a href="icon-typicon.html">Typicon Icons</a></li>
									<li><a href="icon-flag.html">Flag Icons</a></li>
								</ul>
							</li>
							<li className="submenu">
								<a href="#"><i className="feather-credit-card"></i> <span> Forms </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="form-basic-inputs.html">Basic Inputs </a></li>
									<li><a href="form-input-groups.html" >Input Groups </a></li>
									<li><a href="form-horizontal.html">Horizontal Form </a></li>
									<li><a href="form-vertical.html"> Vertical Form </a></li>
									<li><a href="form-mask.html"> Form Mask </a></li>
									<li><a href="form-validation.html"> Form Validation </a></li>
								</ul>
							</li>
							<li className="submenu">
								<a href="#"><i className="feather-box"></i> <span> Tables </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="tables-basic.html">Basic Tables </a></li>
									<li><a href="data-tables.html">Data Table </a></li>
								</ul>
							</li>
							<li className="menu-title"> 
								<span>Extras</span>
							</li>
							
							<li className="submenu">
								<a href="javascript:void(0);"><i className="feather-command"></i> <span>Multi Level</span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li className="submenu">
										<a href="javascript:void(0);"> <span>Level 1</span> <span className="menu-arrow"></span></a>
										<ul className="sub-menus">
											<li><a href="javascript:void(0);"><span>Level 2</span></a></li>
											<li className="submenu">
												<a href="javascript:void(0);"> <span> Level 2</span> <span className="menu-arrow"></span></a>
												<ul className="sub-menus">
													<li><a href="javascript:void(0);">Level 3</a></li>
													<li><a href="javascript:void(0);">Level 3</a></li>
												</ul>
											</li>
											<li><a href="javascript:void(0);"> <span>Level 2</span></a></li>
										</ul>
									</li>
									<li>
										<a href="javascript:void(0);"> <span>Level 1</span></a>
									</li>
								</ul>
							</li> */}
							{/* added manage menu code start */}

							<li class="submenu">
							<a href="#"><i class="feather-settings"></i> <span>Manage</span>
								<span class="menu-arrow"></span>
							</a>
							<ul class="sub-menus">
								<li><a href="customer.php">Customer</a></li>
								<li><a href="supplier.php">Supplier</a></li>
								<li><a href="ledger.php">Ledger</a></li>
								<li><a href="product.php">Products &amp; Services</a></li>
								<li><a href="/DocumentSequence">Document Sequence</a></li>
								<li><a href="blog-Categories.html">Import From Excel</a></li>
							</ul>
						</li>

							{/* manange menu code end */}
						</ul>
					</div>
                </div>
            </div>
    </div>
  )
}
