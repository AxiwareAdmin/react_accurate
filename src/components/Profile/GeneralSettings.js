import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Theme from '../Theme/Theme';
import axios from 'axios';
import Swal from "sweetalert2";

function GeneralSettings() {

    


    const stateList=['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

    const [clientDO,setClientDO]=useState({});

    const [logoUrl,setLogoUrl]=useState("");

    const [signatureUrl,setSignatureUrl]=useState("");

    const [newSignatureFile,setNewSignatureFile]=useState(null);

    const [newLogoFile,setNewLogoFile]=useState(null);

    var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+localStorage.getItem("token")
        }
      }

      // Function to convert image to JPEG format
const convertToJPEG = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            'image/jpeg', // Specify JPEG format
            1 // JPEG image quality (0-1)
          );
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = event.target.result;
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  
  // Example usage
  const handleFileChange = (event) => {
    debugger;
    const file = event.target.files[0];

    
    if (FileReader && file && checkExtension(file.name)) {
        var fr = new FileReader();
        fr.onload = function () {
            debugger;
            const base64UrlEncodedImage = fr.result.split(',')[1];
            setNewLogoFile(base64UrlEncodedImage);
            document.getElementById("logoImage").src = fr.result;
        }
        fr.readAsDataURL(file);
    }else{
        alert("please upload either JPG or PNG images.")
    }
  };
  

  const onSignatureFileChange=(event) => {
    debugger;
    const file = event.target.files[0];

    
    if (FileReader && file && checkExtension(file.name)) {
        var fr = new FileReader();
        fr.onload = function () {
            debugger;
            const base64UrlEncodedImage = fr.result.split(',')[1];
            setNewSignatureFile(base64UrlEncodedImage);
            document.getElementById("signatureImage").src = fr.result;
        }
        fr.readAsDataURL(file);
    }else{
        alert("please upload either JPG or PNG images.")
    }
  };
  

    function checkExtension(filename){
        let extension=filename.split(".")[1];
        if(extension!='jpg' && extension!='jpeg' && extension!='png') return false;

        return true;
    }


    const uploadImage = async (jpegBlob) => {
          // Convert the JPEG blob to a byte array
          const byteArray = await jpegBlob.arrayBuffer();
          const uint8Array = new Uint8Array(byteArray);


          return uint8Array;
    }

      


      const updateForm=async (e)=>{
        e.preventDefault();

        if(newLogoFile){
            clientDO.logo=newLogoFile;
        }
        else{
            clientDO.logo="";
        }


        if(newSignatureFile){
            clientDO.signature=newSignatureFile;
        }
        else{
            clientDO.signature="";
        }

        axios.post(`${process.env.REACT_APP_LOCAL_URL}/saveClient`,clientDO,header).then((res)=>{
            Swal.fire(
                '',
                'Client updated successfully!!',
                'success'
              )	
        }).catch(()=>{
            
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is some issue to updating client',
            footer: ''
            })
        });
    }

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/getClientDOForUser`,header)
        .then((res)=>{
            if(!res.data.res){
            setClientDO(res.data);
            
            
            // Assuming res.data.logo contains the byte array received from the server
            let byteArray = new Uint8Array(res.data.logo);
            let blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type based on the image format
            
            // Convert blob to data URL
            let imageUrl = 'data:image/jpeg;base64,'+res.data.logo;
            console.log("logo::")
            console.log(imageUrl);
            setLogoUrl(imageUrl);


            byteArray=new Uint8Array(res.data.signature);
            blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust type based on the image format
            
            // Convert blob to data URL
            imageUrl = 'data:image/jpeg;base64,'+res.data.signature;
            setSignatureUrl(imageUrl);


            localStorage.setItem("financialYear",res.data.financialYear);
            }
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
        
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Company Profile</h5>
                    </div>
                    <div class="card-body pt-0">
                        <form action="settingdb.php" method = "POST">	
                            <div class="settings-form">
                                <div class="form-group">
                                    <label>Company Name <span class="star-red">*</span></label>
                                    <input type="text" class="form-control" value={clientDO.companyName} onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.companyName=e.target.value;

                                        setClientDO(tempObj);
                                    }}  name="company_name" placeholder="Enter Your Company Name"/>
                                </div>

                                <div class="form-group">
                                    <label>Address Line 1 <span class="star-red">*</span></label>
                                    <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.address1=e.target.value;

                                        setClientDO(tempObj);
                                    }} type="text" class="form-control" value={clientDO.address1} name="address1" placeholder="Enter Address Line 1"/>
                                </div>
                                <div class="form-group">
                                    <label>Address Line 2 <span class="star-red">*</span></label>
                                    <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.address2=e.target.value;

                                        setClientDO(tempObj);
                                    }}
                                    type="text" name="address1" value={clientDO.address2} class="form-control" placeholder="Enter Address Line 2"/>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>City <span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.city=e.target.value;

                                        setClientDO(tempObj);
                                    }}
                                    type="text" value={clientDO.city} name = "city" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>State/Province <span class="star-red">*</span></label>
                                            <select onChange={(e)=>{
                                                  let tempObj={...clientDO};
                                                  debugger;

                                                  tempObj.state=e.target.value;
                                                  setClientDO(tempObj);
                                            }} class="form-control" name="state" id="state">
                                                

                                               { 
                                               stateList.map((state)=>{
                                                    return (
                                                        
                                                        <option selected={clientDO.state==state}>{state}</option>

                                                    )
                                                })

                                              }
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Zip/Postal Code <span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.pinCode=e.target.value;

                                        setClientDO(tempObj);
                                    }} type="text" value={clientDO.pinCode} name="pin_code" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Country <span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.country=e.target.value;

                                        setClientDO(tempObj);
                                    }} type="text" value={clientDO.country} class="form-control" name="country" />
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group mb-0 d-none">
                                    <div class="settings-btns">
                                        <button type="submit"  class="border-0 btn btn-primary btn-gradient-primary btn-rounded">Update Form</button>&nbsp;&nbsp;
                                        <button type="submit" class="btn btn-secondary btn-rounded">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">Other Details</h5>
                    </div>
                    <div class="card-body pt-0">
                    <form>
                            <div class="settings-form">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Contact Person<span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.contactPerson=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.contactPerson} type="text" name="contact_person" class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email Id</label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.email=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.email}  type="text" name="email" class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Contact Number 1</label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.mobile=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.mobile}  type="text" name="contact" class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Contact Number 2</label>
                                            <input type="text" name="contact2" class="form-control"/>
                                        </div>
                                    </div>


                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>GST NO<span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.gstNo=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.gstNo} type="text" name="gstno" class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>PAN NO<span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.panNumber=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.panNumber}  type="text" name="pan" class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>CRN No. / MSME No.</label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.crnMsme=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.crnMsme} type="text" name="MSME" class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Website<span class="star-red">*</span></label>
                                            <input onChange={(e)=>{
                                        let tempObj={...clientDO};

                                        tempObj.website=e.target.value;

                                        setClientDO(tempObj);
                                    }} value={clientDO.website} type="text" name="Website" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Financial Year <span class="star-red">*</span></label>
                                            <input disabled value={localStorage.getItem("financialYear")} type="text" name="Website" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email Id</label>
                                            <input type="text" name="email2" class="form-control"/>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                    <div class="form-group">
                                        <p class="settings-label">Logo <span class="star-red">*</span></p>
                                        <div class="settings-btn">
                                            <input type="file" accept="image/*" name="logoimage" id="file" onChange={handleFileChange} class="hide-input"/>
                                            <label for="file" class="upload">
                                                <i class="feather-upload"></i>
                                            </label>
                                        </div>
                                        <p class="settings-size" style={{fontSize:"12px"}}>Recommended Format is png , jpg , jpeg</p>

                                    </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="upload-images">
                                            <img src={logoUrl} alt="Image" id="logoImage"/>
                                            <a href="javascript:void(0);" class="btn-icon logo-hide-btn">
                                                <i class="feather-x-circle"></i>
                                            </a>
                                        </div>
                                    </div>


                                </div>
                                </div>


                                <div class="row">
                                <div class="col-md-6">
                                <div class="form-group">
                                    <p class="settings-label">Upload Signature<span class="star-red">*</span></p>
                                    
                                    <div class="settings-btn">
                                        <input type="file" accept="image/*" name="signimage" id="files" onChange={onSignatureFileChange} class="hide-input"/>
                                        <label for="files" class="upload">
                                            <i class="feather-upload"></i>
                                        </label>
                                    </div>
                                    <div class="form-group mt-2">
                                            <div class="status-toggle d-flex justify-content-between align-items-center">
                                                <p class="mb-0" style={{fontStyle:"italic",fontSize:"12px"}}>Print Stamp & Signature</p>
                                                <input type="checkbox" id="status_1" class="check"/>
                                                <label for="status_1" class="checktoggle" style={{width:"35px",height:"17px"}}>checkbox</label>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                
                                    <div class="upload-images upload-size">
                                        <img src={signatureUrl} id="signatureImage" alt="Image"/>
                                        <a href="javascript:void(0);" class="btn-icon logo-hide-btn">
                                            <i class="feather-x-circle"></i>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                {/* </div>

                                </div> */}
                                <div class="form-group mb-0">
                                    <div class="settings-btns">
                                        <button type="submit" onClick={updateForm} class="border-0 btn btn-primary btn-gradient-primary btn-rounded">Update</button>&nbsp;&nbsp;
                                        <button type="submit" class="btn btn-secondary btn-rounded">Cancel</button>
                                    </div>
                                </div>
                            {/* </div> */}
                        </form>
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

export default GeneralSettings;
