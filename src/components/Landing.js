import React,{useEffect, useState} from 'react'


import Alert from "./alert";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import $ from 'jquery';

function Landing() {




    const [userName,setUserName]=useState("");

    const [userPassword,setUserPassword]=useState("");

    const [alertMsg,setAlertMsg]=useState("");

    const navigate=useNavigate();


    const onLoginClick=(e)=>{
        e.preventDefault();
        debugger;
        console.log("clicked")
        axios.post(`${process.env.REACT_APP_LOCAL_URL}/login`,{username:userName,password:userPassword}).then((res)=>{
          console.log(res.data)
            
          if(res.data!=null){
            localStorage.setItem("token",res.data.token)

            // window.location.href="/dashboard"
            // navigate("/dashboard")
           window.location.href="/dashboard"
          }
        }).catch((error)=>{
          // console.log(error.response.data)
          setAlertMsg("Username/Password is invalid!!")
    
          setTimeout(()=>{
            setAlertMsg(null)
          },4000);
          
        })
      }

    useEffect(()=>{

		
		const script1 = document.createElement("script");
        script1.src = "/assets1/js/jquery.min.js";
        script1.async = false;
    
        document.body.appendChild(script1);

        // const script13 = document.createElement("script");
        // script13.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js";
        // script13.async = false;
    
        // document.body.appendChild(script13);
        


        
// const script3 = document.createElement("script");
// script3.src = "assets1/js/bootstrap.min.js";
// script3.async = false;

// document.body.appendChild(script3);



const script2 = document.createElement("script");
        script2.src = "assets1/js/popper.min.js";
        script2.async = false;
    
        document.body.appendChild(script2);



const script4 = document.createElement("script");
        script4.src = "assets1/js/jquery.meanmenu.js";
        script4.async = false;
    
        document.body.appendChild(script4);


const script5 = document.createElement("script");
        script5.src = "assets1/js/tilt.jquery.js";
        script5.async = false;
    
        document.body.appendChild(script5);


const script6 = document.createElement("script");
        script6.src = "assets1/js/wow.min.js";
        script6.async = false;
    
        document.body.appendChild(script6);


const script7 = document.createElement("script");
        script7.src = "assets1/js/owl.carousel.min.js";
        script7.async = false;
    
        document.body.appendChild(script7);



const script8 = document.createElement("script");
        script8.src = "assets1/js/isotope.pkgd.min.js";
        script8.async = false;
    
        document.body.appendChild(script8);



        const script12 = document.createElement("script");
        script12.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
        script12.async = false;
    
        document.body.appendChild(script12);


    

    const script9 = document.createElement("script");
        script9.src = "assets1/js/jquery.magnific-popup.min.js";
        script9.async = false;
    
        document.body.appendChild(script9);



        const script10 = document.createElement("script");
        script10.src = "assets1/js/main.js";
        script10.async = false;
    
        document.body.appendChild(script10);


    
        return () => {
        //   document.body.removeChild(script);
        document.body.removeChild(script1);
          document.body.removeChild(script2);
        //   document.body.removeChild(script3);
          document.body.removeChild(script4);
          document.body.removeChild(script5);
          document.body.removeChild(script6);
          document.body.removeChild(script7);
          document.body.removeChild(script8);
          document.body.removeChild(script9);
          document.body.removeChild(script10);
         
        //   document.body.removeChild(script11);
          document.body.removeChild(script12);
        };
	},[])


    
    useEffect(()=>{
        setTimeout(()=>{
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
        },10000)
        
    },[])

    

  return (
    <div>

<Alert msg={alertMsg} onClose={()=>{
    setAlertMsg(null)
}} type='danger'/>
<div id="preloader">
        <div id="status">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>

<Helmet>
<link rel="stylesheet" href="assets1/css/bootstrap.min.css" />
    
    <link rel="stylesheet" href="assets1/css/animate.min.css" />
    
    <link rel="stylesheet" href="assets1/font/flaticon.css" />
    
    <link rel="stylesheet" href="assets1/css/magnific-popup.min.css" />
    
    <link rel="stylesheet" href="assets1/css/owl.carousel.min.css" />
    
    <link rel="stylesheet" href="assets1/css/fontawesome.all.min.css" /> 
    
    <link rel="stylesheet" href="assets1/css/icofont/icofont.min.css" />
    
   <link rel="stylesheet" href="assets1/css/meanmenu.css" />
    
    <link rel="stylesheet" href="assets1/css/color.css" />
    
    <link rel="stylesheet" href="assets1/css/style.css" />
    
    <link rel="stylesheet" href="assets1/css/responsive.css" />
    
    <link rel="icon" type="image/png" href="assets1/img/favicon.ico" />


    


</Helmet>


   

    <div className="navbar-area-three">
        <div className="plamb-responsive-nav">
            <div className="container">
                <div className="plamb-responsive-menu">
                    <div className="logo">
                        <a href="index.html">
                            <img src="assets1/img/common/logo-3.png" className="white-logo" alt="logo" style={{width:'50%'}}/>
                            <img src="assets1/img/common/logo-3.png" className="black-logo" alt="logo" style={{width:'50%'}}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div id="home-thre-nav">
        <div className="plamb-nav">
            <div className="container">
                <nav className="navbar navbar-expand-md navbar-light">
                    <a className="navbar-brand" href="index1.php">
                        <img src="assets1/img/common/logo-3.png" className="white-logo" alt="logo" style={{width:'45%'}} />
                        <img src="assets1/img/common/logo-3.png" className="black-logo" alt="logo" style={{width:'45%'}} />
                    </a>
                    <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item"> <a href="#!" className="nav-link active">
                                    Home
                                </a>
                                
                            </li>
                            <li className="nav-item"> <a href="#!" className="nav-link"></a>
                                <a href="#!" className="nav-link">    
                                    Features
                                </a>
                            </li>    
                            <li className="nav-item">
                                <a href="#!" className="nav-link">
                                    Modules
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#!" className="nav-link">
                                    Pricing
                                </a>
                            </li>
                            <li className="nav-item"> <a href="about.html" className="nav-link"/>
                                <a href="http://accurateerp.com/" className="nav-link">    
                                    Contact 
                                </a>
                            </li>
							    
                        </ul>
                        
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" style={{marginLeft: '39px'}}>
  Login
</button>
                        
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </div>

    <section id="banner-three">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="home-three-banner-content">
                        <h1 style={{fontFamily:'Arial Black'}}> ACCURATE</h1>
                        <h2>Online Accounting &
ERP Software</h2>
                        <p>
                            Start your free Trial Now..!
                        </p>
                        <div className="banner-three-btn pt30">
                            <a href="http://accurateerp.com/register.aspx" className="btn btn-theme">Get Started</a>
                            <a href="https://www.youtube.com/watch?v=QV2mtHygEYo&t=613s" title="ACCURATE ERP DEMO" className="banner-video video_btn">
                                <img src="assets1/img/svg/play-button.svg" alt="icon" style= {{width:'25%'}}/>
                                Watch Demo
                            </a> 
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="banner-img-three">
                        <img src="assets1/img/home-three-banner/computer.png" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="partner">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="logo-area-heading text-center pb30">
                        <h3>Trusted by Valuable Customers</h3>
                    </div>
                    <div className="logo-area owl-carousel owl-theme">
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/1.png" alt="img" /></a>
                        </div>
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/2.png" alt="img" /></a>
                        </div>
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/3.png" alt="img" /></a>
                        </div>
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/4.png" alt="img" /></a>
                        </div>
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/5.png" alt="img" /></a>
                        </div>
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/1.png" alt="img" /></a>
                        </div>
                        <div className="slider-logo">
                            <a href="#!"><img src="assets1/img/logo/2.png" alt="img" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="service" className="bg-color">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                    <div className="section-title-center text-center pb30">
                        <h3 className="pb10">Our Key Features</h3>
                        <h2>
                            Accurate ERP has a Wide Range Of Features not limited to
                        </h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="service-box animation-trnslate box-shadow border-radius   wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".1s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/1.png" alt="img" />
                            <h3><a href="#!">User Friendly</a></h3>
                            <p>
                                <li>Easy Implementation & User Friendly Accounting Modules</li>
                                <li>Simple & User friendly Accounting Modules</li>
                                <li>Anyone can operate software without having accounting Knowldge</li>
                                <li>Access and manage you accounts from any device</li>
                                <li>Get all Documents and Reports just on click</li>
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius  wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".2s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/2.png" alt="img" />
                            <h3><a href="#!">Easy & Fast Billing</a></h3>
                            <p>
                                <li>Easy and Simple Modules makes your Accounting hassle free</li>
                                <li>Anyone can Create GST Invoice without having accounting Knowldge</li>
                                <li>Generate GST Invoices in standard format within a minute.</li>
                                <li>Auto GST Calculation makes easy to create GST Invoice</li>
                                
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="service-box animation-trnslate box-shadow border-radius  wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".4s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/3.png" alt="img" />
                            <h3><a href="#!">Multiple Access</a></h3>
                            <p>
                                <li>Access and Manage your Books of Accounts anytime anywhere using multiple devices e.g. computer, laptop, tablet, or smartphone.</li>
                                <li>You can define role and permit userbase access to your colleague or accountant</li>
                                <li>You can permit Multiple Access to a single Account, and can access same account at a time</li>
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".6s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/4.png" alt="img" />
                            <h3><a href="#!">Accounting</a></h3>
                            <p>
                                <li>Maintain Bank and Cash Transactions and get reports on a click</li>
                                <li>Keep a record and track your expenses in simple module</li>
                                <li>Maintain and Track Customer's and Supplier's Outstanding</li>
                                <li>Create Debite Note & Credit Note within a minute</li>
                                <li>Set due dates of Payment which helps you to collect payments on time.</li>
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius  wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".8s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/5.png" alt="img" />
                            <h3><a href="#!">Cash Book</a></h3>
                            <p>
                                <li>Know your Cash balance at your dashboard and track your expenses</li>
                                <li>You Can Book all cash transactions & Expenses in Cash Book</li>
                                <li>Easy to keep record of your cash Transactions.</li>
                                <li>Maintain all cash receipts and payments, including bank deposits and withdrawals.</li>
                            </p>
                            <a href="#!">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius  wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay="1s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/6.png" alt="img" />
                            <h3><a href="#!">Banking</a></h3>
                            <p>
                                <li>You Can keep record of all your Bank Transactions in a simple way.</li>
                                <li>You can do Bank Reconciliation of all Banks on same page.</li>
                                <li>Easy Reconciliation of Books of Accounts with Bank Statement</li>
                                <li>Know and Keep a track of your Bank Balance from your Dashboard.</li>
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".6s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/4.png" alt="img" />
                            <h3><a href="#!">Inventory Management</a></h3>
                            <p>
                                <li>Maintain Inward, Outward and Material Transfer of Inventory</li>
                                <li>Get Stock Statement Report on click in Excel & PDF Format.</li>
                                <li>Monitor and track availability of stock.</li>
                                <li>Set due dates of Payment which helps you to collect payments on time.</li>
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius  wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay=".8s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/5.png" alt="img" />
                            <h3><a href="#!">Accounting & Statutory Reports</a></h3>
                            <p>
                                <li>Get all Accounting & Financial Reports in a standard format.</li>
                                <li>GST Reports e.g. GSTR1, GSTR2A & GSTR3B</li>
                                <li>Accounts Receivable & Payable</li>
                                <li>Bank Account Statement</li>
                                <li>Fund Flow Statement</li>
                                <li>Trial Balance / Profit & Loss</li>
                                <li>Balance Sheet</li>
                            </p>
                            <a href="#!">Read More ...</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="service-box animation-trnslate box-shadow border-radius  wow fadeInUp" data-wow-duration="2.0s"
                        data-wow-delay="1s">
                        <div className="service-box-inner text-center">
                            <img src="assets1/img/service/6.png" alt="img" />
                            <h3><a href="#!">24x7 Support</a></h3>
                            <p>
                                <li>Our Customer support is available at 24x7</li>
                                <li>We will solve your query on time without any questions</li>
                                <li>You can contact us on helpline Number or you can also raise the query</li>
                                <li>If necessary Our Executive will visit and resolve the problems you are facing</li>
                            </p>
                            <a href="service-details.html">Read More ...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about" className="py100">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="left-side-title">
                        <h3>About Us</h3>
                        <h2 className="pt10">
                            ACCURATE ERP SOFTWARE
                        </h2>
                    </div>
                    <div className="about-detauls pt10">
                        <p>
                            “ACCURATE ERP” is an online accounting & ERP software developed and marketed by Shivansh Innovative Solutions. It helps to access and manage your Books of Accounts from anywhere at anytime. ACCURATE ERP allows you to access and update data using any device connected to internet, including your Mobile phone, tablet, PC or laptop. MIS alerts keep you updated about your business and BI (Business Intelligence) dashboard with built-in Analytics help you take informed decisions.
                        </p> 
                        <p>    ACCURATE ERP is focused mainly toward small and medium-sized businesses and offers accounting applications as well as cloud-based versions that allows an organization to use a system of integrated application to manage the business transactions. Accurate ERP system typically integrates all facets of business transactions - including Sales, Purchase, Banking, Cash, Taxation — in a single database, application and user interface.
                        </p>
                        <p>We caters to the needs of multiple industry segments, through innovative, easy-to-use, secured, integrated, hosted solutions in a simple business model. Accurate ERP serves its clients with the help of best practices gained through its global experience, domestic market reach, skills, and delivery capabilities.
                        </p>
                        <ul className="pt20">
                            <li className="wow zoomIn" data-wow-duration="2.0s" data-wow-delay=".1s">
                                <img src="assets1/img/about/tick.png" alt="img" />Simple Modules
                            </li>
                            <li className="wow zoomIn" data-wow-duration="2.0s" data-wow-delay=".2">
                                <img src="assets1/img/about/tick.png" alt="img" />Easy to Use
                            </li>
                            <li className="wow zoomIn" data-wow-duration="2.0s" data-wow-delay=".3s">
                                <img src="assets1/img/about/tick.png" alt="img" />Standard Documents Format
                            </li>
                            <li className="wow zoomIn" data-wow-duration="2.0s" data-wow-delay=".4s">
                                <img src="assets1/img/about/tick.png" alt="img" />Outstanding Followup
                            </li>
                        </ul>
                        <a href="#!" className="btn btn-theme mt30">Start Free Trial</a>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="anitmation-img animation-img-one">
                        <img src="assets1/img/about/1.png" alt="img" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    
    <section id="about-area-two" className="bg-color">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="anitmation-img animation-img-one">
                        <img src="assets1/img/about/2.png" alt="img"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="right-side-about">
                        <h2>Why us?</h2>
                        <div className="right-area-about-list">
                            <div className="media  media wow fadeInUp" data-wow-duration="2.0s" data-wow-delay=".1s">
                                <img className="mr-3" src="assets1/img/small-icon/1.png" alt="image" />
                                <div className="media-body">
                                    <h3 className="mt-0">Save Your Time</h3>
                                    <p>
                                        Our easy to use and simple modules helps you to save your valuable time.
                                    </p>
                                </div>
                            </div>
                            <div className="media  media wow fadeInUp " data-wow-duration="2.0s " data-wow-delay=".2s ">
                                <img className="mr-3 " src="assets1/img/small-icon/2.png" alt="image " />
                                <div className="media-body ">
                                    <h3 className="mt-0 ">Manage Business Easily</h3>
                                    <p>
                                        Using our cloudbase software you Can access & manage your bunsiness transactions form anywhere at anytime.
                                    </p>
                                </div>
                            </div>
                            <div className="media  media wow fadeInUp" data-wow-duration="2.0s" data-wow-delay=".3s">
                                <img className="mr-3" src="assets1/img/small-icon/3.png" alt="image" />
                                <div className="media-body">
                                    <h3 className="mt-0">Trusted Partner</h3>
                                    <p>
                                        We are not only provides accounting solutions but we are you trusted business partner who helps you to manage your business hassle free.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
    <section id="recent-work" className="py100 bg-color">
        <div className=" container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="left-side-title">
                        <h3>Our Modules</h3>
                   
                    </div>
                </div>
            </div>
            <div className="row">    
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="button-group works-button">
                        <button className="box-shadow active" data-filter="*">
                            Dashboard
                        </button>
                        <button className="box-shadow" data-filter=".business">
                            Banking
                        </button>
                        <button className="box-shadow" data-filter=".e-commerce">
                            CashBook
                        </button>
                        <button className="box-shadow " data-filter="*">
                            Accounting
                        </button>
                        <button className="box-shadow" data-filter=".business">
                            Sales
                        </button>
                        <button className="box-shadow" data-filter=".e-commerce">
                            Purchase
                        </button>
                        <button className="box-shadow" data-filter=".e-commerce">
                            Quotation
                        </button>
                        <button className="box-shadow" data-filter=".e-commerce">
                            Purchase Order
                        </button>
                        <button className="box-shadow" data-filter=".business">
                            Inventory
                        </button>
                        <button className="box-shadow" data-filter=".e-commerce">
                            Reports
                        </button>
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="grid">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 grid-item business">
                        <div className="work-item">
                            <img src="assets1/img/recent-work/1.png" alt="img" />
                            <div className="overlay-arae">
                                <a href="project-details.html"> <i className="flaticon-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12  grid-item business">
                        <div className="work-item">
                            <img src="assets1/img/recent-work/2.png" alt="img" />
                            <div className="overlay-arae">
                                <a href="project-details.html"> <i className="flaticon-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12  grid-item e-commerce">
                        <div className="work-item">
                            <img src="assets1/img/recent-work/3.png" alt="img" />
                            <div className="overlay-arae">
                                <a href="project-details.html"> <i className="flaticon-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12  grid-item e-commerce">
                        <div className="work-item">
                            <img src="assets1/img/recent-work/4.png" alt="img" />
                            <div className="overlay-arae">
                                <a href="project-details.html"> <i className="flaticon-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 grid-item business e-commerce">
                        <div className="work-item">
                            <img src="assets1/img/recent-work/5.png" alt="img" />
                            <div className="overlay-arae">
                                <a href="project-details.html"> <i className="flaticon-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="pricing-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title-center text-center pb30">
                        <h3 className="pb10">Our Pricing Plan</h3>
                        <h2>Best Solutions For Startup</h2>
                    </div>
                </div>
            </div>
            <div className="row">
             <div className="col-lg-12 col-sm-12 col-12">
                <div className="tabs-box">
                    <div className="upper-box clearfix">
                        <div className="tab-btn-box">
                            <ul className="tab-btns tab-buttons clearfix">
                                <li className="tab-btn active-btn" data-tab="#tab-1">Monthly</li>
                                <li className="tab-btn" data-tab="#tab-2">Yearly</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tabs-content">
                        <div className="tab active-tab" id="tab-1">
                            <div className="row clearfix praent">
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12 pricing-block">
                                    <div className="pricing-table box-shadow border-radius">
                                        <div className="pricing-table-header">
                                            <h3>Standard Plan</h3>
                                            <h2>₹999</h2>
                                        </div>
                                        <div className="pricing-table-content">
                                            <ul>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Unlimited Users
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Userbase Access
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Inventory Management
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> All Accounting Features
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Intigrated CRM
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> HR & Payroll Modules
                                                </li>
												<li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Yearly Renewal
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> 24/7 Customer Support
                                                </li>
                                            </ul>
                                            <div className="pricing-table-btn text-center">
                                                <a className="btn btn-pricing" href="#!">BUY NOW</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12 pricing-block single-item-mt-2">
                                    <div className="pricing-table box-shadow border-radius">
                                        <div className="pricing-table-header">
                                            <h3>Prime Plan</h3>
                                            <h2>₹2699</h2>
                                        </div>
                                        <div className="pricing-table-content">
                                            <ul>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Unlimited Users
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Userbase Access
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Inventory Management
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> All Accounting Features
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Intigrated CRM
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> HR & Payroll Modules
                                                </li>
												<li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Yearly Renewal
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> 24/7 Customer Support
                                                </li>
                                            </ul>
                                            <div className="pricing-table-btn text-center">
                                                <a className="btn btn-pricing" href="#!">BUY NOW</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12 pricing-block">
                                    <div className="pricing-table box-shadow border-radius responsive-mt-30">
                                        <div className="pricing-table-header">
                                            <h3>Advance Plan</h3>
                                            <h2>₹4999</h2>
                                        </div>
                                        <div className="pricing-table-content">
                                            <ul>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Unlimited Users
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Userbase Access
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Inventory Management
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> All Accounting Features
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> Intigrated CRM
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> HR & Payroll Modules
                                                </li>
												<li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Yearly Renewal
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> 24/7 Customer Support
                                                </li>
                                            </ul>
                                            <div className="pricing-table-btn text-center">
                                                <a className="btn btn-pricing" href="#!">BUY NOW</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab" id="tab-2">
                            <div className="row  clearfix praent"> 
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12 pricing-block ">
                                    <div className="pricing-table box-shadow border-radius">
                                        <div className="pricing-table-header">
                                            <h3>Standard Plan</h3>
                                            <h2>₹9999</h2>
                                        </div>
                                        <div className="pricing-table-content">
                                            <ul>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Unlimited Users
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Userbase Access
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Inventory Management
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> All Accounting Features
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Intigrated CRM
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> HR & Payroll Modules
                                                </li>
												<li>
                                                    <i className="icofont-tick-boxed disabled"></i> Yearly Renewal
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> 24/7 Customer Support
                                                </li>
                                            </ul>
                                            <div className="pricing-table-btn text-center">
                                                <a className="btn btn-pricing" href="#!">BUY NOW</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12 pricing-block single-item-mt-2">
                                    <div className="pricing-table box-shadow border-radius">
                                        <div className="pricing-table-header">
                                            <h3>Prime Plan</h3>
                                            <h2>₹26999</h2>
                                        </div>
                                        <div className="pricing-table-content">
                                            <ul>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Unlimited Users
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Userbase Access
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Inventory Management
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> All Accounting Features
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> Intigrated CRM
                                                </li>
                                                <li className="disabled">
                                                    <i className="icofont-tick-boxed disabled"></i> HR & Payroll Modules
                                                </li>
												<li>
                                                    <i className="icofont-tick-boxed disabled"></i> No Renewal Upto 5 Years
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> 24/7 Customer Support
                                                </li>
                                            </ul>
                                            <div className="pricing-table-btn text-center">
                                                <a className="btn btn-pricing" href="#!">BUY NOW</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12 pricing-block responsive-mt-30">
                                    <div className="pricing-table box-shadow border-radius">
                                        <div className="pricing-table-header">
                                            <h3>Advance Plan</h3>
                                            <h2>₹49999</h2>
                                        </div>
                                        <div className="pricing-table-content">
                                            <ul>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Unlimited Users
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Userbase Access
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> Inventory Management
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed"></i> All Accounting Features
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> Intigrated CRM
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> HR & Payroll Modules
                                                </li>
												<li>
                                                    <i className="icofont-tick-boxed disabled"></i> Yearly Renewal
                                                </li>
                                                <li>
                                                    <i className="icofont-tick-boxed disabled"></i> 24/7 Customer Support
                                                </li>
                                            </ul>
                                            <div className="pricing-table-btn text-center">
                                                <a className="btn btn-pricing" href="#!">BUY NOW</a>
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
        </div>
    </section>

    <section id="one-testimonial" className="py100 bg-color">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title-center text-center pb30">
                        <h3 className="pb10">Testimonials</h3>
                        <h2>What Our Client Say</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="testimonials-slider-area owl-carousel owl-theme">
                        <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment ">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “This is the best Accounting Software ever! It is so easy to enter transactions from beginning to end. The support team is incredibly responsive. And the willingness to continue to develop functions to accommodate user needs is simply remarkable. I cannot wait to have all my clients in Accurate ERP.”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/1.png" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Dada Kadam</h3>
                                    <p>CEO, RD Automation</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “ACCURATE ERP helps other businesses in the area with their accounting and GST filing. The clean interface, cloudbase access, advanced features, and easy Modules of Accurate ERP made a easy accounting Work.”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/3.png" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mrs. Snehal Patil</h3>
                                    <p>CFO, ASHWAMEGH ENTERPRISES</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                     “I have used a LOT of accounting software, and this is one of the most well-thought out pieces I have ever seen. It’s intuitive, easy to get around and I love it!”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/2.png" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Sanket Ingale</h3>
                                    <p>CEO, SOURABH INNOVATIVE PVT LTD</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “Your Software is right in there price wise, and customer support is very appreciated. This software helps you to spend less time entering transactions.”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/2.png" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Yogesh Bhandare</h3>
                                    <p>MD, TYPHON AUTOMATION AND ROBOTICS PVT. LTD.</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “Accurate software is an amazing platform and I like several elements. First, this software is an amazing Userbase Access tool within our organization, this platform has greatly helped in controlling all accounting data within one workplace.”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/1.png" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Amit Maske</h3>
                                    <p>MD, NEW TRADE GLOBAL INDUSTRIES PVT LTD</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “Simply the best small business accounting software available today! We could run our business hassle free with Accurate ERP!”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/12.jpg" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Ganesh Patil</h3>
                                    <p>MD, DK ENGINEERING SOLUTIONS</p>
                                </div>
                            </div>
                        </div>
                    <div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “It is the BEST value for money accounting software bar none. I've tried the others and they're too confusing. But this Software is Simple and easy to use, so I love it.”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/2.png" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Jayant Patil</h3>
                                    <p>CEO, AISHWARYA ENGINEERING</p>
                                </div>
                            </div>
                        </div>
						<div className="testimonial-box box-shadow border-radius">
                            <div className="testimonial-comment">
                                <i className="fas fa-quote-left"></i>
                                <p>
                                    “I always wanted an online accounting software which is user friendly and I could use it from anywhere I want to. Accurate ERP allows me to view and monitor our business from wherever I am. Everything right now looks perfect.”
                                </p>
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="assets1/img/testimonial/4.jpg" alt="img" />
                                </div>
                                <div className="testimonial-name">
                                    <h3>Mr. Vishal Suryavanshi</h3>
                                    <p>MD, RENUKA ENGINEERS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cta-area">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="news-letter-text  pr80 ">
                        <h2 className="white-color">Sign Up For Newsletter</h2>
                        <p className="white-color">And Receive 10% Discount</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="cta-search-area">
                      <div className="input-group">
                          <input type="text" className="form-control" placeholder="Tyep Your Email Address.." />
                          <div className="input-group-append">
                              <button className="btn btn-cta" type="button">
                                  Subscribe Now
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </section>
    <footer id="footer" className="py100">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="footer-about-area">
                        <a href="index.html"><img src="assets1/img/common/logo.png" alt="img" style={{width:'50%'}} /></a>
                        <p className="pt30">
                            ACCURATE ERP - Online Accounting & ERP Software. 
It is Simplified & Innovative Accounting Solutions, which helps to access and manage your Business Transactions from anywhere at anytime. Get real time access from any device and keep your business up to date.
                        </p>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                   <div className="footer-list-wedget pl20 single-item-mt-3 responsive-mt-60">
                       <div className="fooote-heading">
                           <h5>Usefull Links</h5>
                       </div>
                       <div className="footer-list pt40">
                           <ul>
                               <li><a href="index.html">Home </a></li>
                               <li><a href="faqs.html"> Features</a></li>
                               <li><a href="faqs.html"> Modules</a></li>
                               <li><a href="faqs.html"> Pricing</a></li>
                               <li><a href="shop.html"> About Us</a></li>
                               <li><a href="blog.html"> Contact Us</a></li>
                           </ul>
                          
                       </div>
                   </div>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <div className="footer-list-wedget pl20 single-item-mt-3 responsive-mt-60">
                        <div className="fooote-heading">
                            <h5>Services</h5>
                        </div>
                        <div className="footer-list pt40">
                           <ul>
                               <li><a href="about.html">About</a></li>
                               <li><a href="service.html">Features</a></li>
                               <li><a href="about.html"> Modules</a></li>
                               <li><a href="contact.html"> Contact Us</a></li>
                               <li><a href="privacy-policy.html"> Praivcy Policy</a></li>
                           </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div className="footer-list-wedget pl20 responsive-mt-60">
                        <div className="fooote-heading">
                            <h5>Contact Info</h5>
                        </div>
                        <div className="footer-contact-area footer-list pt40">
                           <ul>
                               <li>
                                   <i className="icofont-location-pin"></i> Office No.107, B-Wing, Jai Ganesh Vision,
                                    Akurdi, Pimpri Chinchwad, Pune, Maharashtra - 411035

                               </li>
                               <li>
                                   <i className="icofont-phone"></i><a href="tel:012-3-456-789">+91 9527145556</a>
                               </li>
                               <li>
                                   <i className="icofont-email"></i><a href="malto:info@gmail.com">Info@accurateerp.com</a>
                               </li>
                           </ul>
                       </div>  
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom-img">
               <img src="assets1/img/svg/footer.svg" alt="img"/>
        </div>
    </footer>

    <div className="modal" id="myModal">
    
            <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{width:'80%', marginTop: '95px', marginLeft: '75px'}}>
                    <div className="modal-header text-center" style={{background: 'linear-gradient(166.66deg, rgb(31, 117, 206) 4.62%, rgb(23, 121, 207) 4.62%, rgb(116, 75, 196) 86.29%)'}}>
                        <h5 className="modal-title" id="myModalLabel" style={{color:'#fff'}}>Login Now</h5>

                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                    </div>
                    <div className="modal-body">
                        <div className="login px-4 mx-auto mw-100">

                        <div className="form-group">
                            <form action="index1db.php" method="POST">
                            <div className="form-group">
                                <label className="mb-2">Register Email ID</label>
                                <input name="Email" value={userName} onChange={(e)=>setUserName(e.target.value)} type="text"  className="form-control"  placeholder="Enter your username" required/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                    anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label className="mb-2">Your Password</label>
                                <input name="Password" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Your Password" required />
                            </div>
                            
                            <div className="row">
                                    
                                <div className="col-md-12">
                                    <input type="submit" onClick={onLoginClick} name="login" value="Sign In" id="Button2" className="btn btn-primary submit mt-2" style={{float: 'right'}}/>
                                </div>
                            </div>
                        </form>
                            

                            <div className="row">
                                <div className="col-md-6">
                                    <p><a href="register1.php">Don't have an account?</a></p>

                                </div>

                                <div className="col-md-6">
                                    <p><a href="#modal-2" data-toggle="modal" style={{float: "right"}} data-target="#myModal1" data-dismiss="modal">Forgot Password?</a></p>

                                </div>
                            </div>



                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    </div>
 <div className="copy-right">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="copy-text">
                    <p>Shivansh Innovative Solutions © 2022. All Rights Reserved</p>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="copy-icon text-lg-right">
                    <ul>
                        <li><a href="https://www.facebook.com/shivanshinnovative"target="_blank"><i className="fab fa-facebook-f icon"></i></a></li>
                        <li><a href="https://twitter.com/shivanshinfotec"target="_blank"><i className="fab fa-twitter icon"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/shivansh-innovative"target="_blank"><i className="fab fa-linkedin-in icon"></i></a></li>
                        <li><a href="https://www.youtube.com/channel/UC_5WsDtULsBhAVGK8Yl9lmg"target="_blank"><i className="fab fa-youtube icon"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    <div className="go-top">
        <i className="fas fa-chevron-up"></i>
        <i className="icofont-long-arrow-up"></i>
    </div>
{/* 
    <Helmet>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" defer></script>

<script src="assets1/js/jquery.min.js" defer></script>

<script src="assets1/js/popper.min.js" defer></script>

<script src="assets1/js/bootstrap.min.js" defer></script>

<script src="assets1/js/jquery.meanmenu.js" defer></script>

<script src="assets1/js/tilt.jquery.js" defer></script>

<script src="assets1/js/wow.min.js" defer></script>

<script src="assets1/js/owl.carousel.min.js" defer></script>

<script src="assets1/js/isotope.pkgd.min.js" defer></script>

<script src="assets1/js/jquery.magnific-popup.min.js" defer></script>

<script src="assets1/js/main.js" defer></script>
    </Helmet> */}

    </div>
  )
}

export default Landing
