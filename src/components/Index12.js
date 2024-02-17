import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
export default function Index1() {

 useEffect(() => {

  const script11 = document.createElement("script");
  script11.src = "/assets/js/jquery-3.6.0.min.js";
  script11.async = false;

  document.body.appendChild(script11);

        const script10 = document.createElement('script');
        script10.src = "/assets/js/bootstrap.bundle.min.js";
        script10.async = false;
      
        document.body.appendChild(script10);//can be uncommented

        const script9 = document.createElement('script');
        script9.src = "/assets/js/jquery.slimscroll.min.js";
        script9.async = false;
      
        document.body.appendChild(script9);//can be uncommented

		const script4 = document.createElement('script');
		script4.src = "/assets/js/morris.js";

		script4.async = false;
		document.body.appendChild(script4);
		
    const script7 = document.createElement("script");
    script7.src = "/assets/js/select2.min.js";
    script7.async = false;

    document.body.appendChild(script7); //can be uncommented
		
		const script5 = document.createElement('script');
		script5.src = "/assets/plugins/raphael/raphael.min.js";

		script5.async = false;
		document.body.appendChild(script5);
		
		
		
		const script2 = document.createElement('script');
		script2.src = "/assets/js/chart.js";

		script2.async = false;
		document.body.appendChild(script2);


		const script1 = document.createElement('script');
		script1.src = "/assets/js/linebar.min.js";

		script1.async = false;
		document.body.appendChild(script1);
		


		const script = document.createElement('script');
		script.src = "/assets/js/pieChart.js";
		
		script.async = false;
		document.body.appendChild(script);


		
//uncomment
		const script3 = document.createElement('script');
		script3.src = "/assets/js/apex.min.js";

		script3.async = false;
		document.body.appendChild(script3);

		const script6 = document.createElement('script');
        script6.src = "/assets/js/app.js";
        script6.async = false;
      
        document.body.appendChild(script6);
	
		
	  return () => {
      document.body.removeChild(script11);
		document.body.removeChild(script9);
		document.body.removeChild(script10);
		document.body.removeChild(script5);
		  document.body.removeChild(script);
		  document.body.removeChild(script1);
		  document.body.removeChild(script4);
		  document.body.removeChild(script3);//uncomment
		  document.body.removeChild(script2);
		  document.body.removeChild(script6);//uncomment
		  document.body.removeChild(script7);
		}
	  },[]);

    
  
  return (
    <div>
       <Navbar/>
		<Sidebar />
        <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="crms-title row bg-white mb-4">
            <div className="col">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="la la-table"></i>
                </span>{" "}
                <span>Deals Dashboard</span>
              </h3>
            </div>
            <div className="col text-end">
              <ul className="breadcrumb bg-white float-end m-0 ps-0 pe-0">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Deals Dashboard</li>
              </ul>
            </div>
          </div>

          <div className="row graphs">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Total Lead</h3>

                  <canvas id="pie-chart" width="800" height="450"></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Products Yearly Sales</h3>
                  <canvas
                    id="bar-chart-horizontal"
                    width="800"
                    height="450"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="row graphs">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Sales Overview</h3>
                  <div id="line-charts"></div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Total Sales</h3>
                  <div id="chart"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row graphs">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Yearly Projects</h3>
                  <canvas id="bar-chart" width="800" height="550"></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Total Revenue</h3>
                  <div id="bar-charts"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row graphs">
            <div className="col-md-6 mb-0">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Sales Statistics</h3>
                  <canvas
                    id="bar-chart-grouped"
                    width="800"
                    height="450"
                  ></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-0">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Completed Tasks</h3>
                  <canvas id="mixed-chart" width="800" height="450"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       </div>
  );
}
