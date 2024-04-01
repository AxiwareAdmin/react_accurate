import { useScript } from '@uidotdev/usehooks';
import React,{useState} from 'react'
import { useEffect } from 'react';
import Alert from "./alert";

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login() {


  var token=localStorage.getItem("token")
	var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+token
        }
      }

  const BACKEND_SERVER="http://localhost:8080";

  const [alertMsg,setAlertMsg]=useState("");

    useEffect(() => {
    
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
          //   document.body.removeChild(script11);
        };
      }, []);

      const [userName,setUserName]=useState("");

      const [password,setPassword]=useState("");

      const navigate = useNavigate();
      const onLoginClick=(e)=>{
        e.preventDefault();
        debugger;
        console.log("clicked")
        axios.post(`${process.env.REACT_APP_LOCAL_URL}/login`,{username:userName,password}).then((res)=>{
          console.log(res.data)
          if(res.data!=null){
            localStorage.setItem("token",res.data.token)
            navigate("/dashboard")
          //  window.location.href="/dashboard"
          }
        }).catch((error)=>{
          // console.log(error.response.data)
          setAlertMsg("Username/Password is invalid!!")
    
          setTimeout(()=>{
            setAlertMsg(null)
          },4000);
          
        })
      }
      const onUserNameChange=(e)=>{
        setUserName(e.target.value)
      }

      const onPasswordChange=(e)=>{
        setPassword(e.target.value)
      }

  return (
    <div>
      <Alert msg={alertMsg} type='danger'/>
       <div class="main-wrapper">
			<div class="account-content">
				
				<div class="container">
					<div class="account-logo">
						<a href="index.html"><img src="assets/img/logo.png" alt="Dreamguy's Technologies"/></a>
					</div>
					
					<div class="account-box">
						<div class="account-wrapper">
							<h3 class="account-title">Login</h3>
							<p class="account-subtitle">Access to our dashboard</p>
							
	
							<form action="index.html">
								<div class="form-group">
									<label>Email Address</label>
									<input onChange={onUserNameChange} value={userName} class="form-control" type="text"/>
								</div>
								<div class="form-group">
									<div class="row">
										<div class="col">
											<label>Password</label>
										</div>
										<div class="col-auto">
											<a class="text-muted" href="forgot-password.html">
												Forgot password?
											</a>
										</div>
									</div>
									<input onChange={onPasswordChange} value={password} class="form-control" type="password"/>
								</div>
								<div class="form-group text-center">
									<button onClick={onLoginClick} class="btn btn-primary account-btn" type="submit">Login</button>
								</div>
								<div class="account-footer">
									<p>Don't have an account yet? <a href="/register">Register</a></p>
								</div>
							</form>
							
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
  )
}

export default Login
