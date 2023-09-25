import React from 'react'
import { useEffect } from 'react';

function Register() {
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
  return (
    <div>
        <div class="main-wrapper">
			<div class="account-content">
				
				<div class="container">
				

					<div class="account-logo">
						<a href="index.html"><img src="assets/img/logo.png" alt="Dreamguy's Technologies"/></a>
					</div>
					<div class="account-box">
						<div class="account-wrapper">
							<h3 class="account-title">Register</h3>
							<p class="account-subtitle">Access to our dashboard</p>
							

							<form action="index.html">
								<div class="form-group">
									<label>Email</label>
									<input class="form-control" type="text"/>
								</div>
								<div class="form-group">
									<label>Password</label>
									<input class="form-control" type="password"/>
								</div>
								<div class="form-group">
									<label>Repeat Password</label>
									<input class="form-control" type="password"/>
								</div>
								<div class="form-group text-center">
									<button class="btn btn-primary account-btn" type="submit">Register</button>
								</div>
								<div class="account-footer">
									<p>Already have an account? <a href="/">Login</a></p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
        </div>

		<div class="modal right fade settings" id="settings"  role="dialog" aria-modal="true">
			<div class="toggle-close">
				  <div class="toggle" data-bs-toggle="modal" data-bs-target="#settings"><i class="fa fa-cog fa-w-16 fa-spin fa-2x"></i>
				  </div>
	   
			</div>
			<div class="modal-dialog" role="document">
				<div class="modal-content">

					<div class="modal-header p-3">
						<h4 class="modal-title" id="myModalLabel2">Theme Customizer</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
					</div>

					<div class="modal-body pb-3">
						<div class="scroll">
						
						<div>
							<ul class="list-group">
								<li class="list-group-item border-0">
								  <div class="row">
									<div class="col">
									  <h5 class="pb-2">Primary Skin</h5>
									</div>
									<div class="col text-end d-none">
									  <a class="reset text-white bg-dark" id="ChangeprimaryDefault">Reset Default</a>
									</div>
								  </div>
								  <div class="theme-settings-swatches">
									 <div class="themes">
											<div class="themes-body">
												<ul id="theme-changes" class="theme-colors border-0 list-inline-item list-unstyled mb-0">
													
													<li class="theme-title">Solid Color</li>
													<li class="list-inline-item"><span onclick="toggleTheme('style')" class="theme-defaults bg-warnings"  ></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-green')" class="theme-solid-purple bg-warnings"  ></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-blue')" class="theme-solid-black bg-blue"></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-orange')" class="theme-solid-pink bg-orange"></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-pink')" class="theme-solid-pink bg-pink"></span></li> 
													<li class="list-inline-item"><span onclick="toggleTheme('style-purple')" class="theme-solid-purle bg-purple"></span></li> 
													<li class="list-inline-item"><span onclick="toggleTheme('style-red')" class="theme-solid-danger bg-danger"></span></li> 
													<li><br /></li>
													<li><hr /></li>

													<li class="theme-title">Gradient Color</li>
													

													<li class="list-inline-item"><span onclick="toggleTheme('style-gradient-blue')" class="theme-orange bg-sunny-mornings"></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-gradient-green')" class="theme-blue bg-tempting-azures"></span></li> 
													<li class="list-inline-item"><span onclick="toggleTheme('style-gradient-maroon')" class="theme-grey bg-amy-crisps"></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-gradient-orange')" class="theme-lgrey bg-mean-fruits"></span></li>
													<li class="list-inline-item"><span onclick="toggleTheme('style-gradient-pink')" class="theme-dblue bg-malibu-beachs"></span></li> 
												</ul>
											</div>
										</div>

									 
								  </div>
								  </li>
							  </ul>
						  </div>
						  <div>
							<ul class="list-group">
							  <li class="list-group-item border-0">
								 <div class="row">
								  <div class="col">
									<h5 class="pb-2">Header Style</h5>
								  </div>
								  <div class="col text-end">
									<a class="reset text-white bg-dark" id="ChageheaderDefault">Reset Default</a>
								  </div>
								</div>
								<div class="theme-settings-swatches">
									<div class="themes">
										<div class="themes-body">
											<ul id="theme-change1" class="theme-colors border-0 list-inline-item list-unstyled mb-0">
													<li class="theme-title">Solid Color</li>
													<li class="list-inline-item"><span class="header-solid-black bg-black"></span></li>
													<li class="list-inline-item"><span class="header-solid-pink bg-primary"></span></li>
													<li class="list-inline-item"><span class="header-solid-orange bg-secondary1"></span></li> 
													<li class="list-inline-item"><span class="header-solid-purple bg-success"></span></li>
													<li class="list-inline-item"><span class="header-solid-green bg-warnings"></span></li>
													<li><br/></li>
													<li><hr/></li>

													<li class="theme-title">Gradient Color</li>

													<li class="list-inline-item"><span class="header-gradient-color1 bg-sunny-morning"></span></li>
													<li class="list-inline-item"><span class="header-gradient-color2 bg-tempting-azure"></span></li> 
													<li class="list-inline-item"><span class="header-gradient-color3 bg-amy-crisp"></span></li>
													<li class="list-inline-item"><span class="header-gradient-color4 bg-mean-fruit"></span></li>
													<li class="list-inline-item"><span class="header-gradient-color5 bg-malibu-beach"></span></li> 
													<li class="list-inline-item"><span class="header-gradient-color6 bg-ripe-malin"></span></li> 
													<li class="list-inline-item"><span class="header-gradient-color7 bg-plum-plate"></span></li>
													
											</ul>
										</div>
									</div>
									
								  </div>
							  </li>
							</ul>
						  </div>
						  <div>
							<ul class="list-group m-0">
								<li class="list-group-item border-0">
								  <div class="row">
									<div class="col">
									  <h5 class="pb-2">Apps Sidebar Style</h5>
									</div>
									<div class="col  text-end">
									  <a class="reset text-white bg-dark" id="ChagesidebarDefault">Reset Default</a>
									</div>
								  </div>
								  <div class="theme-settings-swatches">
									  <div class="themes">
										  <div class="themes-body">
											  <ul id="theme-change2" class="theme-colors border-0 list-inline-item list-unstyled">
													  <li class="theme-title">Solid Color</li>
													  <li class="list-inline-item"><span class="sidebar-solid-black bg-black"></span></li>
													  <li class="list-inline-item"><span class="sidebar-solid-pink bg-primary"></span></li>
													  <li class="list-inline-item"><span class="sidebar-solid-orange bg-secondary1"></span></li> 
													  <li class="list-inline-item"><span class="sidebar-solid-purple bg-success"></span></li>
													  <li class="list-inline-item"><span class="sidebar-solid-green bg-warnings"></span></li>
													  <li><br/></li>
													  <li><hr/></li>

													  <li class="theme-title">Gradient Color</li>

													  <li class="list-inline-item"><span class="sidebar-gradient-color1 bg-sunny-morning"></span></li>
													  <li class="list-inline-item"><span class="sidebar-gradient-color2 bg-tempting-azure"></span></li> 
													  <li class="list-inline-item"><span class="sidebar-gradient-color3 bg-amy-crisp"></span></li>
													  <li class="list-inline-item"><span class="sidebar-gradient-color4 bg-mean-fruit"></span></li>
													  <li class="list-inline-item"><span class="sidebar-gradient-color5 bg-malibu-beach"></span></li> 
													  <li class="list-inline-item"><span class="sidebar-gradient-color6 bg-ripe-malin"></span></li> 
													  <li class="list-inline-item"><span class="sidebar-gradient-color7 bg-plum-plate"></span></li>
													  
											  </ul>
										  </div>
									  </div>
									  
									</div>
								</li>
							  </ul>
							<div class="row Default-font">
								<div class="col">
									<h5 class="pb-2">Font Style</h5>
								</div>
								<div class="col text-end">
									<a class="reset text-white bg-dark font-Default">Reset Default</a>
								</div>
							</div>
							<ul class="list-inline-item list-unstyled font-family border-0 p-0" id="theme-change">
							  
							  <li class="list-inline-item roboto-font" >Roboto</li>
							  <li class="list-inline-item poppins-font">Poppins</li>
							  <li class="list-inline-item montserrat-font" >Montserrat</li>
							  <li class="list-inline-item inter-font">Inter</li>
							</ul>
						</div>
						
					</div>
					</div>

				</div>
			</div>
		</div>
    </div>
  )
}

export default Register
