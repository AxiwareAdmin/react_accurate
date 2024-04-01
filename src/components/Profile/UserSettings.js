import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Theme from '../Theme/Theme';
import axios from 'axios';

function UserSettings() {

    const [userList,setUserList]=useState([]);

    const [userDO,setUserDO]=useState({
        userId:"",
        userName:"",
        accountNumber:"",
        ifscCode:"",
        designation:"",
        bankName:"",
        dept:"",
        branch:"",
        phone:"",
        email:"",
        loginId:"",
        password:"",
        userStatus:"",
        registerId:"",
        joiningDate:"",
        employeeId:"",
        panNumber:"",
        passportNumber:"",

        pfNumber:"",
        uanNumber:"",
        qualification:"",
        experience:"",
        gender:"",
        birthDate:"",

        branch1:"",

        linkedIn:"",

        twitter:"",

        facebook:"",

        instagram:"",

        banking:"",

        cashbook:"",

        accounting:"",

        sales:"",

        purchase:"",

        inventory:"",

        quotation:"",

        purchaseOrder:""
    })

    var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+localStorage.getItem("token")
        }
      }


    useState(()=>{
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/users`,header).then((res)=>{
            if(res.data.res) return;

            setUserList(res.data)
        })
    },[])

    
    useEffect(()=>{

		
		debugger;
	    const script11 = document.createElement("script");
        script11.src = "/assets/js/jquery-3.6.0.min.js";
        script11.async = false;
    
        document.body.appendChild(script11);

		const script10 = document.createElement("script");
        script10.src = "/assets/js/bootstrap.bundle.min.js";
        script10.async = false;
    
        document.body.appendChild(script10); //can be uncommented


		const script8 = document.createElement("script");
        script8.src = "/assets/plugins/moment/moment.min.js";
        script8.async = false;
    
        document.body.appendChild(script8);

		const script7 = document.createElement("script");
        script7.src = "/assets/js/bootstrap-datetimepicker.min.js";
        script7.async = false;
    
        document.body.appendChild(script7); //can be uncommented
    
      
    
       
    
        const script9 = document.createElement("script");
        script9.src = "/assets/js/jquery.slimscroll.min.js";
        script9.async = false;
    
        document.body.appendChild(script9); //can be uncommented
    
       
    
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
	},[])

  return (
    <div>
        <Theme/>
      <Navbar/>
      <Sidebar/>
      <div class="main-wrapper">








			
            <div class="page-wrapper">
			
                <div class="content container-fluid">

                <div class="crms-title row bg-white">
            <div class="col  p-0">
                <h3 class="page-title m-0">
                <span class="page-title-icon bg-gradient-primary text-white me-2">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                </span> Settings </h3>
            </div>
            <div class="col p-0 text-end">
                <ul class="breadcrumb bg-white float-end m-0 ps-0 pe-0">
                    <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li class="breadcrumb-item active">Settings</li>
                </ul>
            </div>
        </div>

        <div class="settings-menu-links">
						<ul class="nav nav-tabs menu-tabs">
							<li class="nav-item ">
								<a class="nav-link" href="/generalSettings">General Settings</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/userSettings">Users</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="payment-settings.html">Payment Settings</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="email-settings.html">Email Settings</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="social-settings.html">Social Media Login</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="social-links.html">Social Links</a>
							</li>
						
						</ul>
					</div>
        

					<div class="page-header pt-3 mb-0 ">
						<div class="row">
							<div class="col">
								<div class="dropdown">
									<a class="dropdown-toggle recently-viewed" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Recently Viewed</a>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Recently Viewed</a>
                        				<a class="dropdown-item" href="#">Items I'm following</a>
                        				<a class="dropdown-item" href="#">All Contacts</a>
                       					<a class="dropdown-item" href="#">Contacts added in the last 24 hours</a>
                        				<a class="dropdown-item" href="#">Contacts added in the last 7 days</a>
                        				<a class="dropdown-item" href="#">Contacts with no notes in the last month</a>
                        				<a class="dropdown-item" href="#">Contacts with no notes in the last 7 days</a>
									</div>
								</div>
							</div>
							<div class="col text-end">
								<ul class="list-inline-item ps-0">
					                <li class="nav-item dropdown list-inline-item add-lists">
					                    <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
					                        <div class="nav-profile-text">
					                          <i class="fa fa-th" aria-hidden="true"></i>
					                        </div>
					                    </a>
					                    <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
					                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#add-new-list">Add New List View</a>
					                    </div>
					                </li>
					                <li class="list-inline-item">
					                    <button class="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" id="add-task" data-bs-toggle="modal" data-bs-target="#add_contact">Create User</button>
					                </li>
					            </ul>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card mb-0">
								<div class="card-body">
									<div class="table-responsive">
										<table class="table table-striped table-nowrap custom-table mb-0 datatable">
											<thead>

											
												<tr style={{backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
													<th style={{color:"#fff", fontWeight:"bold"}}>
														Sr.No
													</th>
													<th style={{color:"#fff" ,fontWeight:"bold"}}>Designation</th>
													<th style={{color:"#fff" ,fontWeight:"bold"}}>Name</th>
													<th style={{color:"#fff" ,fontWeight:"bold"}}>Phone</th>
													<th style={{color:"#fff" ,fontWeight:"bold"}}>Email</th>
													<th style={{color:"#fff" ,fontWeight:"bold"}}>Status</th>
											
													<th style={{color:"#fff" ,fontWeight:"bold"}} class="text-end">Actions</th>
												</tr>
											</thead>
											<tbody>
                                                    {
                                                        userList.map((user,index)=>{
                                                            return <tr>
                                                                <td>{index+1}</td>
                                                                <td>{user.designation}</td>
                                                                <td>{user.userName}</td>
                                                                <td>{user.phone}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.userStatus}</td>
                                                                <td></td>
                                                            </tr>
                                                        })
                                                    }
											</tbody>
										</table>
									</div>
								</div>
							</div>		
						</div>
					</div>


			<div class="modal right fade" id="add_contact" tabindex="-1" role="dialog" aria-modal="true">
				<div class="modal-dialog" role="document">
					<button type="button" class="close md-close" data-bs-dismiss="modal" aria-label="Close"> </button>
					<div class="modal-content">

						<div class="modal-header">
		                    <h4 class="modal-title text-center">Add Contact</h4>
		                    <button type="button" class="btn-close xs-close" data-bs-dismiss="modal"></button>
		                  </div>

						<div class="modal-body">
							<div class="row">
						        <div class="col-md-12">
						            <form action="usersdb.php" method="POST">
						            	<h4>User Detail's</h4>
						            	<div class="form-group row">
				                            <div class="col-md-12"></div>
				                            <div class="col-md-9">
												<label class="col-form-label">Name <span class="text-danger">*</span></label>
				                                <input class="form-control" onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.userName=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } type="text" placeholder="User Name" name="username"/>
				                            </div>

											<div class="col-sm-3">
												<label class="col-form-label">Status</label>
					                            <select onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.userStatus=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } name="status" class="form-control">
					                                <option>Select Status</option>
					                                <option>Active</option>
					                                <option>Inactive</option>
                                                    
					                            </select>
											</div>
				                        </div>
						                <div class="form-group row">
											
											<div class="col-sm-6">
												<label class="col-form-label">Designation</label>
                            					<input onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.designation=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } type="text" class="form-control"  name="designation" placeholder="Title"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Department</label>
					                            <select onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.dept=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } name="department" class="form-control">
					                                <option>Select Department</option>
					                                <option>Accounts</option>
					                                <option>Sales</option>
                                                    <option>Purchase</option>
                                                    <option>Hr & Admin</option>
                                                    <option>Management</option>
					                            </select>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Phone</label>
                            					<input onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.phone=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } type="text" class="form-control" name="phone" placeholder="Phone"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Email</label>
                            					<input onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.email=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } type="text" class="form-control"  name="email" placeholder="Email"/>
											</div>

                                            
											<div class="col-sm-6">
												<label class="col-form-label">Date Of Joining <span class="text-danger">*</span></label>
				                                <div onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.joiningDate=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } class="cal-icon"><input class="form-control datetimepicker" type="text" name="joining_date" placeholder="MM/DD/YY"/></div>
											</div>
											<div class="col-sm-6">
												<label class="col-form-label">Employee ID</label>
                            					<input onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.employeeId=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } type="text" class="form-control" name="employee_id" placeholder="Phone"/>
											</div>
										
										</div>
										<h4>Contact Details</h4>
										<div class="form-group row">
											
											<div class="col-sm-6">
												<label class="col-form-label">PAN No</label>
                            					<input onChange={
                                                    (e)=>{
                                                        let tempUser={...userDO};

                                                        tempUser.panNumber=e.target.value;

                                                        setUserDO(tempUser);
                                                    }
                                                } type="text" class="form-control"  name="pan_no" placeholder="Phone"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Passport No</label>
                            					<input  type="text" class="form-control"  name="passport_no" placeholder="Phone"/>
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-6">
												<label class="col-form-label">PF No</label>
                            					<input type="text" class="form-control" name="pf_no" placeholder="Phone"/>
											</div>
											<div class="col-sm-6">
												<label class="col-form-label">UAN No</label>
                            					<input type="text" class="form-control" id="o-phone" name="uan_no" placeholder="Phone"/>
											</div>
										</div>

                                        <div class="form-group row">
											<div class="col-sm-6">
												<label class="col-form-label">Qualification</label>
                            					<input type="text" class="form-control" name="qualification" placeholder="Phone"/>
											</div>
											<div class="col-sm-6">
												<label class="col-form-label">Experience</label>
                            					<input type="text" class="form-control" id="o-phone" name="experience" placeholder="Phone"/>
											</div>
										</div>

										<div class="form-group row">
											
											<div class="col-sm-6">
												<label class="col-form-label">Gender</label>
					                            <select name="gender" class="form-control">
					                                <option>Select Gender</option>
					                                <option>Male</option>
					                                <option>Female</option>
					                            </select>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Date of Birth <span class="text-danger">*</span></label>
				                                <div class="cal-icon"><input class="form-control datetimepicker" name="dob" type="text" placeholder="MM/DD/YY"/></div>
											</div>
										</div>
										
										<h4>Address Information</h4>
										<div class="form-group row">
											<div class="col-sm-12">
												<label class="col-form-label">Mailing Address</label>
                            					<input class="form-control"  name="mailing-address" placeholder="Address"/>
											</div>
									
                                            <div class="col-sm-6 mt-3">
												<label class="col-form-label">City</label>
                            					<input type="text" class="form-control" placeholder="Mailing City" name="mailing-city"/>
											</div>

                                            <div class="col-sm-6 mt-3">
												<label class="col-form-label">State</label>
                            					<input type="text" class="form-control" placeholder="Mailing City" name="mailing-state"/>
											</div>

                                            <div class="col-sm-6 mt-3">
												<label class="col-form-label">Pin Code</label>
                            					<input type="text" class="form-control" placeholder="Mailing City" name="pincode"/>
											</div>
											
                                            <div class="col-sm-6 mt-3">
                                                <label for="" class="col-form-label">Country</label>
												<input type="text" class="form-control" placeholder="Mailing Postal code" Value="India" name="country"/>
											</div>
										</div>
										

                                        <h4>Bank Details</h4>
										<div class="form-group row">
											<div class="col-sm-6">
												<label class="col-form-label">Bank Name</label>
                            					<input type="text" class="form-control"  name="bank_name" placeholder="Email"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Account Number</label>
                            					<input type="text" class="form-control"  name="account_no" placeholder="Email"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">IFSC Code</label>
                            					<input type="text" class="form-control"  name="ifsc_code" placeholder="Email"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Branch</label>
                            					<input type="text" class="form-control"  name="branch" placeholder="Email"/>
											</div>
										</div>
										
										<h4>Social Links</h4>
										<div class="form-group row">
                                        
											<div class="col-sm-6">
												<label class="col-form-label">Linkedin</label>
                            					<input type="text" class="form-control"  name="linkedin" placeholder="linkedin"/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Twitter</label>
                            					<input type="text" class="form-control"  name="twitter" placeholder="Twitter"/>
											</div>
										</div>
										<div class="form-group row">
											<div class="col-sm-6">
												<label class="col-form-label">Facebook</label>
                            					<input type="text" class="form-control"  name="fb" placeholder="Facebook"/>
											</div>
											<div class="col-sm-6">
												<label class="col-form-label">Instagram</label>
                            					<input type="text" class="form-control"  name="instagram" placeholder="Twitter"/>
											</div>
										</div>
										
										<h4>Permissions</h4>
										<div class="form-group row">
											<div class="col-sm-12">
                                            <div class="table-responsive m-t-15">
                                                <table class="table table-striped custom-table">
                                                    <thead>
                                                        <tr style={{width:"100%"}}>
                                                            <th style={{width:"70%"}} >Module Permission</th>
                                                            <th class="text-center">View Only</th>
                                                            <th class="text-center">All Permission</th>
                                                            </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                    <td>Banking</td>
                                                    <td class="text-center">
                                                    <input name="bankingview" type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="bankingall" type="checkbox"/>
                                                    </td>
                                                   
                                                    </tr>
                                                    <tr>
                                                    <td>Cashbook</td>
                                                    <td class="text-center">
                                                    <input name="cashbookview" type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="cashbookall" type="checkbox"/>
                                                    </td>
                                                    
                                                    </tr>
                                                    <tr>
                                                    <td>Accounting</td>
                                                    <td class="text-center">
                                                    <input name="accountingview" type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="accountingall" type="checkbox"/>
                                                    </td>
                                                    
                                                    </tr>
                                                    <tr>
                                                    <td>Sales</td>
                                                    <td class="text-center">
                                                    <input name="salesview" type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="salesall" type="checkbox"/>
                                                    </td>
                                                    </tr>

                                                    <tr>
                                                    <td>Purchase</td>
                                                    <td class="text-center">
                                                    <input name="purchaseview" type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="purchaseall" type="checkbox"/>
                                                    </td>
                                                    </tr>

                                                    <tr>
                                                    <td>Quotation</td>
                                                    <td class="text-center">
                                                    <input name="quotationview"  type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="quotationall"  type="checkbox"/>
                                                    </td>
                                                    </tr>

                                                    <tr>
                                                    <td>Purchase Order</td>
                                                    <td class="text-center">
                                                    <input name="purchaseorderview"  type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="purchaseorderall" type="checkbox"/>
                                                    </td>
                                                    </tr>

                                                    <tr>
                                                    <td>Inventory</td>
                                                    <td class="text-center">
                                                    <input name="inventoryview" type="checkbox"/>
                                                    </td>
                                                    <td class="text-center">
                                                    <input name="inventoryall" type="checkbox"/>
                                                    </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </div>
											</div>
											

											<h4>User Credentials</h4>
										<div class="form-group row">
											<div class="col-sm-6">
												<label class="col-form-label">UserId</label>
                            					<input type="email" class="form-control"  name="userid" placeholder="Enter Your Email Here.."/>
											</div>

                                            <div class="col-sm-6">
												<label class="col-form-label">Password</label>
                            					<input type="text" class="form-control"  name="password" placeholder="Email"/>
											</div>
										</div>
										
										</div>
						                <div class="text-center py-3">
						                	<button type="button" class="border-0 btn btn-primary btn-gradient-primary btn-rounded">Save</button>&nbsp;&nbsp;
						                	<button type="button" class="btn btn-secondary btn-rounded">Cancel</button>
						                </div>
						            </form>
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
  )
}

export default UserSettings;
