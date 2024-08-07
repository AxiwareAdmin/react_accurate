import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {


	function onLogoutButtonClick(e){
		localStorage.removeItem("token")
		window.location.href="/";
	}

	var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+localStorage.getItem("token")
        }
      }

	const [clientDO,setClienDO]=useState({});
	const [userDO,setUserDO]=useState({});

	const [financialYearList,setFinancialYearList]=useState([]);

	const [logoUrl,setLogoUrl]=useState("");



	useEffect(()=>{
			axios.get(`${process.env.REACT_APP_LOCAL_URL}/financialYearList`,header)
			.then((res)=>{
				if(res.data)
				setFinancialYearList(res.data);
			})


			axios.get(`${process.env.REACT_APP_LOCAL_URL}/me`,header)
			.then((res)=>{
				if(res.data!="user not found")
				setUserDO(res.data);
			})

			axios.get(`${process.env.REACT_APP_LOCAL_URL}/getClientDOForUser`,header)
			.then((res)=>{
				if(!res.data.res){
				setClienDO(res.data);


				 // Assuming res.data.logo contains the byte array received from the server
				 let byteArray = new Uint8Array(res.data.logo);
				 let blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type based on the image format
				 
				 // Convert blob to data URL
				 let imageUrl = 'data:image/jpeg;base64,'+res.data.logo;
				 console.log("logo::")
				 console.log(imageUrl);
				 setLogoUrl(imageUrl);

				localStorage.setItem("financialYear",res.data.financialYear);
				}
			})
	},[])

	function getCurrentFinancialYear() {
		var fiscalyear = "";
		var today = new Date();
		if (today.getMonth() + 1 <= 3) {
		  fiscalyear = today.getFullYear() - 1 + "-" + today.getFullYear().toString().substr(2);
		} else {
		  fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1).toString().substr(2);
		}
		return fiscalyear;
	  }

	  

	  function onFinancialYearClick(e){
		e.preventDefault();

		axios.post(`${process.env.REACT_APP_LOCAL_URL}/setFinancialYear`,{financialYear:e.target.innerText},header).then((res)=>{
			localStorage.setItem("financialYear",e.target.innerText);

			var loc=window.location.href.replace("http://","").replace("https://","").indexOf("/")
				window.location.href=window.location.href.replace("http://","").replace("https://","").substring(loc)
		})
	  }

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
				
				

                <div className="page-title-box" style={{width:'50%'}}>
					<div className="top-nav-search" style={{display:'flex',alignItems:'center',height:'100%',width:'100%'}}>
							{/* <a href="javascript:void(0);" className="responsive-search">
								<i className="fa fa-search"></i>
						   </a>
							<form action="search.html">
								<input className="form-control" type="text" placeholder="Search here"/>
								<button className="btn" type="submit"><i className="fa fa-search"></i></button>
							</form> */}
						

				<div id="clientlogo" style={{marginRight:'20px'}} className="logo">

				<img src={logoUrl} alt="Image" className='sidebar-logo logoImage' id="logoImage" style={{width:'120px',height:'60px'}}/>
				</div>
				<div id="clientName" style={{fontWeight:'bolder',fontSize:'20px'}}>{clientDO.companyName}</div>
				{/* <p style={{margin:'0px 0px 0px 5px',display:'flex',alignItems:'center',fontWeight:"bold",color:"#9a55ff"}}> */}
				{/* <li className="nav-item dropdown has-arrow flag-nav" style={{listStyleType:'none',display:'flex',alignItems:'center',fontWeight:"bold"}}>
				FY: 
				<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
					<img src="" alt="" height="20"/><span>{clientDO.financialYear}</span>
					</a>
				<div class="dropdown-menu dropdown-menu-right">

					{

						financialYearList.map((val,key)=>{
							return (
								<a onClick={onFinancialYearClick} href="javascript:void(0);" class="dropdown-item">
									 {val}
									</a>
							)
						})
					}

					</div>

					</li> */}
				{/* </p>  */}
                <input type="hidden" id="financialYear" value={clientDO.financialYear==""?"2023-24":clientDO.financialYear}/>
				</div>
				</div>
				<a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars"></i></a>
				

				<ul className="nav user-menu">
					<li className="nav-item">
						
					</li>

					<li className="nav-item dropdown has-arrow flag-nav" style={{listStyleType:'none',display:'flex',alignItems:'center'}}>
				FY: 
				<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
					<img src="" alt="" height="20"/><span>{clientDO.financialYear}</span>
					</a>
				<div class="dropdown-menu dropdown-menu-right">

					{

						financialYearList.map((val,key)=>{
							return (
								<a onClick={onFinancialYearClick} href="javascript:void(0);" class="dropdown-item">
									 {val}
									</a>
							)
						})
					}

					</div>

					</li>
					{/* <li className="nav-item dropdown has-arrow flag-nav">
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
					</li> */}
					<li className="nav-item dropdown">
						<a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
							<i style={{fontFamily:'FontAwesome'}} className="fa fa-bell-o"></i> <span className="badge rounded-pill">3</span>
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
							<i style={{fontFamily:'FontAwesome'}} className="fa fa-comment-o"></i> <span className="badge rounded-pill">8</span>
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
							<a className="dropdown-item" href="/generalSettings">Settings</a>
							<a className="dropdown-item" onClick={onLogoutButtonClick}>Logout</a>
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
