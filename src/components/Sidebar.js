import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
	/*useEffect(() => {
		// document.querySelectorAll("script").forEach(e => e.remove());
		// document.querySelectorAll(".sidebar-overlay").forEach(e => e.remove());
		// const script11 = document.createElement('script');
        // script11.src = "/assets/js/jquery-3.6.0.min.js";
        // script11.async = false;
      
        // document.body.appendChild(script11);

    


        // const script9 = document.createElement('script');
        // script9.src = "/assets/js/jquery.slimscroll.min.js";
        // script9.async = false;
      
        // document.body.appendChild(script9);//can be uncommented




        // const script6 = document.createElement('script');
        // script6.src = "/assets/js/jquery.dataTables.min.js";
        // script6.async = false;
      
        // document.body.appendChild(script6);//can be uncommented





        // const script = document.createElement('script');
        // script.src = "/assets/js/app.js";
        // script.async = false;
      
        // document.body.appendChild(script);
		//testing


        return () => {
        //   document.body.removeChild(script);
        //   document.body.removeChild(script6);
        //   document.body.removeChild(script9);  
        //   document.body.removeChild(script11);
        }
      } );*/
  return (
    <div>
      <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                	<form action="search.html" className="mobile-view">
						<input className="form-control" type="text" placeholder="Search here"/>
						<button className="btn" type="button"><i className="fa fa-search"></i></button>
					</form>
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
							<li className="submenu">
								<a href="#"><i className="feather-home"></i> <span> Dashboard</span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><Link to="/" className="active">Deals Dashboard</Link></li>
									<li><a href="projects-dashboard.html">Projects Dashboard</a></li>
									<li><a href="leads-dashboard.html">Leads Dashboard</a></li>
								</ul>
							</li>
							
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
							</li>							
							<li className="submenu">
								<a href="#"><i className="feather-grid"></i> <span> Blogs</span>
									<span className="menu-arrow"></span>
								</a>
								<ul className="sub-menus">
									<li><a href="blog.html" >All Blogs</a></li>
									<li><a href="add-blog.html">Add Blog</a></li>
									<li><a href="edit-blog.html">Edit Blog</a></li>
									<li><a href="blog-Categories.html">Categories</a></li>
								</ul>
							</li>
							<li className="submenu">
								<a href="#"><i className="feather-clipboard"></i> <span>  Invoices </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="invoices.html" >Invoices List</a></li>
									<li><a href="invoice-grid.html" >Invoices Grid</a></li>
									<li><Link to="/add-invoice">Add Invoices</Link></li>
									<li><a href="edit-invoice.html">Edit Invoices</a></li>
									<li><a href="view-invoice.html">Invoices Details</a></li>
									<li><a href="invoices-settings.html">Invoices Settings</a></li>
								</ul>
							</li>
							<li> 
								<a href="email.html"><i className="feather-mail"></i> <span>Email</span></a>
							</li>
							<li> 
								<a href="settings.html"><i className="feather-settings"></i> <span>Settings</span></a>
							</li>
							
							<li className="menu-title"> 
								<span>Pages</span>
							</li>
							
							<li className="submenu">
								<a href="#"><i className="feather-alert-triangle"></i> <span> Error Pages </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="error-404.html">404 Error </a></li>
									<li><a href="error-500.html">500 Error </a></li>
								</ul>
							</li>
							
							<li className="submenu">
								<a href="#"><i className="feather-list"></i> <span> Pages </span> <span className="menu-arrow"></span></a>
								<ul className="sub-menus">
									<li><a href="faq.html"> FAQ </a></li>
									<li><a href="terms.html"> Terms </a></li>
									<li><a href="privacy-policy.html"> Privacy Policy </a></li>
									<li><a href="blank-page.html"> Blank Page </a></li>
								</ul>
							</li>
							<li className="menu-title"> 
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
							</li>
						</ul>
					</div>
                </div>
            </div>
    </div>
  )
}
