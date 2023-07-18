import React from 'react'

export default function Navbar() {
  return (
    <div>
      


            <div className="header" id="heading">
			

                <div className="header-left">
                    <a href="index.html" className="logo">
						<img src="assets/img/logo.png"  alt="Logo" className="sidebar-logo"/>
						<img src="assets/img/s-logo.png"  alt="Logo" className="mini-sidebar-logo"/>
					</a>
                </div>
				
				<a id="toggle_btn" href="javascript:void(0);">
					<span className="bar-icon">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</a>
				

                <div className="page-title-box">
					<div className="top-nav-search">
							<a href="javascript:void(0);" className="responsive-search">
								<i className="fa fa-search"></i>
						   </a>
							<form action="search.html">
								<input className="form-control" type="text" placeholder="Search here"/>
								<button className="btn" type="submit"><i className="fa fa-search"></i></button>
							</form>
						</div>
                </div>
				
				<a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars"></i></a>
				

				<ul className="nav user-menu">
					<li className="nav-item">
						
					</li>
					<li className="nav-item dropdown has-arrow flag-nav">
						<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
							<img src="assets/img/flags/us.png" alt="" height="20"/> <span>English</span>
						</a>
						<div className="dropdown-menu dropdown-menu-right">
							<a href="javascript:void(0);" className="dropdown-item">
								<img src="assets/img/flags/us.png" alt="" height="16"/> English
							</a>
							<a href="javascript:void(0);" className="dropdown-item">
								<img src="assets/img/flags/fr.png" alt="" height="16"/> French
							</a>
							<a href="javascript:void(0);" className="dropdown-item">
								<img src="assets/img/flags/es.png" alt="" height="16"/> Spanish
							</a>
							<a href="javascript:void(0);" className="dropdown-item">
								<img src="assets/img/flags/de.png" alt="" height="16"/> German
							</a>
						</div>
					</li>
					<li className="nav-item dropdown">
						<a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
							<i className="fa fa-bell-o"></i> <span className="badge rounded-pill">3</span>
						</a>
						<div className="dropdown-menu notifications">
							<div className="topnav-dropdown-header">
								<span className="notification-title">Notifications</span>
								<a href="javascript:void(0)" className="clear-noti"> Clear All </a>
							</div>
							<div className="noti-content">
								<ul className="notification-list">
									<li className="notification-message">
										<a href="activities.html">
											<div className="media d-flex">
												<span className="avatar flex-shrink-0">
													<img alt="" src="assets/img/profiles/avatar-02.jpg"/>
												</span>
												<div className="media-body flex-grow-1">
													<p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
													<p className="noti-time"><span className="notification-time">4 mins ago</span></p>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="activities.html">
											<div className="media d-flex">
												<span className="avatar flex-shrink-0">
													<img alt="" src="assets/img/profiles/avatar-03.jpg"/>
												</span>
												<div className="media-body flex-grow-1">
													<p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
													<p className="noti-time"><span className="notification-time">6 mins ago</span></p>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="activities.html">
											<div className="media d-flex">
												<span className="avatar flex-shrink-0">
													<img alt="" src="assets/img/profiles/avatar-06.jpg"/>
												</span>
												<div className="media-body flex-grow-1">
													<p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
													<p className="noti-time"><span className="notification-time">8 mins ago</span></p>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="activities.html">
											<div className="media d-flex">
												<span className="avatar flex-shrink-0">
													<img alt="" src="assets/img/profiles/avatar-17.jpg"/>
												</span>
												<div className="media-body flex-grow-1">
													<p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
													<p className="noti-time"><span className="notification-time">12 mins ago</span></p>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="activities.html">
											<div className="media d-flex">
												<span className="avatar flex-shrink-0">
													<img alt="" src="assets/img/profiles/avatar-13.jpg"/>
												</span>
												<div className="media-body flex-grow-1">
													<p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
													<p className="noti-time"><span className="notification-time">2 days ago</span></p>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
							<div className="topnav-dropdown-footer">
								<a href="activities.html">View all Notifications</a>
							</div>
						</div>
					</li>
					<li className="nav-item dropdown">
						<a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
							<i className="fa fa-comment-o"></i> <span className="badge rounded-pill">8</span>
						</a>
						<div className="dropdown-menu notifications">
							<div className="topnav-dropdown-header">
								<span className="notification-title">Messages</span>
								<a href="javascript:void(0)" className="clear-noti"> Clear All </a>
							</div>
							<div className="noti-content">
								<ul className="notification-list">
									<li className="notification-message">
										<a href="#">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-09.jpg"/>
													</span>
												</div>
												<div className="list-body">
													<span className="message-author">Richard Miles </span>
													<span className="message-time">12:28 AM</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="#">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-02.jpg"/>
													</span>
												</div>
												<div className="list-body">
													<span className="message-author">John Doe</span>
													<span className="message-time">6 Mar</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="#">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-03.jpg"/>
													</span>
												</div>
												<div className="list-body">
													<span className="message-author"> Tarah Shropshire </span>
													<span className="message-time">5 Mar</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="#">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-05.jpg"/>
													</span>
												</div>
												<div className="list-body">
													<span className="message-author">Mike Litorus</span>
													<span className="message-time">3 Mar</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
									<li className="notification-message">
										<a href="#">
											<div className="list-item">
												<div className="list-left">
													<span className="avatar">
														<img alt="" src="assets/img/profiles/avatar-08.jpg"/>
													</span>
												</div>
												<div className="list-body">
													<span className="message-author"> Catherine Manseau </span>
													<span className="message-time">27 Feb</span>
													<div className="clearfix"></div>
													<span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
								</ul>
							</div>
							<div className="topnav-dropdown-footer">
								<a href="#">View all Messages</a>
							</div>
						</div>
					</li>

					<li className="nav-item dropdown has-arrow main-drop">
						<a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
							<span className="user-img"><img src="assets/img/profiles/avatar-21.jpg" alt=""/>
							<span className="status online"></span></span>
							<span>Admin</span>
						</a>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="profile.html">My Profile</a>
							<a className="dropdown-item" href="settings.html">Settings</a>
							<a className="dropdown-item" href="login.html">Logout</a>
						</div>
					</li>
				</ul>
				<div className="dropdown mobile-user-menu">
					<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
					<div className="dropdown-menu dropdown-menu-right">
						<a className="dropdown-item" href="profile.html">My Profile</a>
						<a className="dropdown-item" href="settings.html">Settings</a>
						<a className="dropdown-item" href="login.html">Logout</a>
					</div>
				</div>
				
            </div>













    </div>
  )
}
