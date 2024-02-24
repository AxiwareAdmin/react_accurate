import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddCustomer(props) {

    //const [customerId , setCustomerId] = useState();
    const [alertMsg,setAlertMsg]=useState(null);
    const [customerName , setCustomerName] = useState();
    const [gstNo , setGstNo] = useState();
    const [shippingGstNo , setShippingGstNo] = useState();
    const [address1 , setAddress1] = useState();
    const [address2 , setAddress2] = useState();
    const [city , setCity] = useState();
    const [pincode , setPincode] = useState();
    const [state , setState] = useState();
    const [shippingState , setShippingState] = useState();
    const [country , setCountry] = useState();
    const [email , setEmail] = useState();
    const [contactNo , setContactNo] = useState();
    const [shippingAddress1 , setShippingAddress1] = useState();
    const [paymentTerms , setPaymentTerms] = useState("Y");
    const [sameAddressChk , setSameAddressChk] = useState(false);
    const [shippingCustomerName , setShippingCustomerName] = useState();
    const [shippingAddress2 , setShippingAddress2] = useState();
    const [shippingCity , setShippingCity] = useState();
    const [shippingPincode , setShippingPincode] = useState();
    const [shippingCountry , setShippingCountry] = useState();

     const BACKEND_SERVER="http://localhost:8080";

     function checksum(g){
        let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(g)
         if(regTest){
            let a=65,b=55,c=36;
            return Array['from'](g).reduce((i,j,k,g)=>{ 
               var p=(p=(j.charCodeAt(0)<a?parseInt(j):j.charCodeAt(0)-b)*(k%2+1))>c?1+(p-c):p;
               return k<14?i+p:j==((c=(c-(i%c)))<10?c:String.fromCharCode(c+b));
            },0); 
        }
        return regTest
    }

     function saveCustomer(e){
         e.preventDefault();

         if(customerName == null || customerName == "" || customerName == undefined){
            validations("Please Enter Billing Customer Name.");
         }else if(gstNo == null || gstNo == "" || gstNo == undefined){
            validations("Please Enter Billing GST_NO");
         }
         //27AAPFU0939F1ZV--true
         //27AASCS2460H1Z0-false
         else if(!checksum(gstNo)){
            validations("Please Enter Valid Billing GST_NO");
         }
         else if(address1 == null || address1 == "" || address1 == undefined){
            validations("Please Enter Billing Address.");
         }else if(city == null || city == "" || city == undefined){
            validations("Please Enter Billing city.");
         }else if(pincode == null || pincode == "" || pincode == undefined){
            validations("Please Enter Billing pincode.");
         }else if(state == null || state == "--Select State--" || state == undefined){
            validations("Please select Billing State.");
         }else if(country == null || country == "" || country == undefined){
            validations("Please Enter Billing country.");
         }else if(shippingCustomerName == null || shippingCustomerName == "" || shippingCustomerName == undefined){
            validations("Please Enter Shipping Customer Name.");
         }else if(shippingGstNo == null || shippingGstNo == "" || shippingGstNo == undefined){
            validations("Please Enter Shipping GST_NO");
         }else if(shippingAddress1 == null || shippingAddress1 == "" || shippingAddress1 == undefined){
            validations("Please Enter Shipping Address.");
         }else if(shippingCity == null || shippingCity == "" || shippingCity == undefined){
            validations("Please Enter Shipping city.");
         }else if(shippingPincode == null || shippingPincode == "" || shippingPincode == undefined){
            validations("Please Enter Shipping pincode.");
         }else if(shippingState == null || shippingState == "--Select State--" || shippingState == undefined){
            validations("Please select Shipping State.");
         }else if(shippingCountry == null || shippingCountry == "" || shippingCountry == undefined){
            validations("Please Enter Shipping country.");
         }else if(contactNo == null || contactNo == "" || contactNo == undefined){
            validations("Please Enter Contact No.");
         }else if(email == null || email == "" || email == undefined){
            validations("Please Enter Email id.");
         }else{

         let customerData={

            customerName : customerName,
            gstNo : gstNo,
            shippingGstNo : shippingGstNo,
            address1 : address1,
            address2 : address2,
            city : city,
            pincode : pincode,
            state : state,
            country : country,
            shippingState : shippingState,
            shippingCustomerName : shippingCustomerName,
            shippingAddress2 : shippingAddress2,
            shippingCity :shippingCity,
            shippingPincode : shippingPincode,
            shippingCountry : shippingCountry,
            email : email,
            contactNo : contactNo,
            shippingAddress1 : shippingAddress1,
            paymentTerms : paymentTerms

         }

         var token=localStorage.getItem("token")
    //it was GET method earlier
    axios
      .post(BACKEND_SERVER+"/addCustomerDetails" ,customerData,{
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+token
        }
      })
      .then((res) => {
        console.log("In customer pop up all invoice data"+ res.data);

        if(res!==null && res.data.res !== "failure"){
           
            //props.sendToParent(false);
           props.sendToParent({custId : res.data.res,flag : false,custName : customerName});
           return;

        }else{
           
            toast("something is wrong!",{
                position: "top-center",
                theme:"colored",
                type:"error",
                autoClose:500
               });
            props.sendToParent(true);

            return;
        }


      }).catch(function (error) {
        toast("Something is wrong!",{
            position: "top-center",
            theme:"colored",
            type:"error"
           });
        props.sendToParent(true);
      });
    }

        }


        function validations(msg){
            toast(msg,{
                position: "top-center",
                theme:"colored",
                type:"error"
               });
        }

        useEffect (() => {

            window.selectPaymentTern = (e) => {
                selectPaymentTern(e);
            }

            window.selectShippState = (e) => {
                selectShippState(e);
            }

            window.selectBillingState = (e) => {
                selectBillingState(e);
            }


        });

        const selectPaymentTern = (e) => {
            setPaymentTerms(e.target.value);
        }

        const selectShippState = (e) => {
            setShippingState(e.target.value);
        }

        const selectBillingState = (e) => {
            setState(e.target.value);
        }

        const onSameAddress=(e)=>{
            console.log(document.getElementById("sameAddress").checked +"and state"+state);
           // setSameAddressChk(document.getElementById("sameAddress").checked==true?false:true)
            if(document.getElementById("sameAddress").checked){
                 if(address1 !== null && address1 !==""){
                setShippingAddress1(address1);
                 }
                 if(address2 !== null && address2 !==""){
                    setShippingAddress2(address2);
                 }
                 if(customerName !== null && customerName !==""){
                    setShippingCustomerName(customerName);
                 }
                 if(city !== null && city !==""){
                    setShippingCity(city);
                 }
                 if(pincode !== null && pincode !==""){
                    setShippingPincode(pincode);
                 }
                 if(country !== null && country !==""){
                    setShippingCountry(country);
                 }
                if(gstNo !== null && gstNo !== ""){
                setShippingGstNo(gstNo);
                }
               if(state !== null && state !== "--Select State--" && state !== undefined){
                const text = state;
                const $select = document.querySelector('#shippingSelect');
                const $options = Array.from($select.options);
                const optionToSelect = $options.find(item => item.text ===text);
                $select.value = optionToSelect.value;
                setShippingState(state);
               }

            }else{    
                setShippingAddress1("");
                setShippingGstNo("");
                const text = "--Select State--";
                const $select = document.querySelector('#shippingSelect');
                const $options = Array.from($select.options);
                const optionToSelect = $options.find(item => item.text ===text);
                $select.value = optionToSelect.value;

            }

          }



    return (
       <div>
            <div class="modal-dialog modal-dialog-centered modal-md" style={{width:"auto"}}>
                <div class="modal-content" style={{marginTop :"-30px"}}>
                    <div class="modal-header" >
                        <div class="form-header text-start mb-0">
                            <h4 class="mb-0 text-dark fw-bold">Create Customer</h4>
                        </div>
                        
                        <button type="button" class="close" onClick={() => {props.sendToParent({custId : null,flag : false,custName : null})}}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                <div class="modal-body">
                        <div class="bank-inner-details">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        {/* <label>Customer Name<span class="text-danger">*</span></label> */}
                                        <input type="text" onChange={e => setCustomerName(e.target.value)} class="form-control" placeholder="Customer Name" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        {/* <label>GST NO<span class="text-danger">*</span></label> */}
                                        <input type="text" onChange={e => setGstNo(e.target.value)} class="form-control" placeholder="GST NO"/>
                                        </div>
                                </div>
                                </div>
                                <div class="row">
                                <label>Billing Address <span class="text-danger">*</span></label>
                                <div class="col-lg-6 col-md-6">
                                  
                                    <div class="form-group">
                                        <input type="text" onChange={e => setAddress1(e.target.value)} class="form-control" placeholder="Address1" />
                                    </div>
                                </div>
                                 <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                        <input type="text" onChange={e => setAddress2(e.target.value)} class="form-control" placeholder="Address2" />
                                        </div>
                                </div>
                             </div>
                             <div class="row">
                             <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" onChange={e => setCity(e.target.value)} class="form-control" placeholder="City" />
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" onChange={e => setPincode(e.target.value)} class="form-control" placeholder="PinCode" />
                                     </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                    <select onChange={selectBillingState} class="form-control">
                                            <option value="--Select State--">--Select State--</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                        </select>
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" onChange={e => setCountry(e.target.value)}  class="form-control" placeholder="Country" />
                                     </div>
                                </div>
                                </div>

                                <div class="row">
                                <label>Shipping Address <span class="text-danger">*</span></label>
                                <label >Same as billing Address <input value={sameAddressChk} onClick={onSameAddress} id="sameAddress"  type="checkbox"/> </label>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" value={shippingCustomerName} class="form-control" placeholder="Customer Name"/>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" value={shippingGstNo} onChange={e => setShippingGstNo(e.target.value)}  class="form-control" placeholder="GST NO." />
                                        </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" value={shippingAddress1} onChange={e => setShippingAddress1(e.target.value)}  class="form-control" placeholder="Address1" />
                                    </div>
                                </div>
                                 <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                        <input type="text" value={shippingAddress2} class="form-control" placeholder="Address2" />
                                        </div>
                                </div>
                             </div>
                             <div class="row">
                             <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" value={shippingCity} class="form-control" placeholder="City" />
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" value={shippingPincode}  class="form-control" placeholder="PinCode" />
                                     </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                    <select onChange={selectShippState} id="shippingSelect"  class="form-control">
                                    <option value="--Select State--">--Select State--</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                    </select>
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" value={shippingCountry}  class="form-control" placeholder="Country" />
                                     </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Contact Person" />
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" onChange={e => setContactNo(e.target.value)} class="form-control" placeholder="Mobile No" />
                                     </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" onChange={e => setEmail(e.target.value)} class="form-control" placeholder="Mail Id" />
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Vendor (Code)" />
                                     </div>
                                </div>
                                </div>
                                 
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                {/* <div class="row">
                                        <div class="col-md-8">
                                            <input  type="text" onChange={} class="form-control" placeholder="Opening Balance" />
                                        </div>

                                        <div class="col-md-4">
                                            <select onChange={selectPaymentTern} class="form-control">
                                                <option value="Dr">Dr</option>
                                                <option value="Cr">Cr</option>

                                            </select>
                                         </div>
                                    </div> */}
                                </div>
                                <div class="col-lg-6 col-md-6">
                                <button type="button" onClick={saveCustomer}  class="btn btn-success" style={{marginLeft:"140px"}}> Save </button>
                                <button type="button"  class="btn btn-danger" onClick={() => {props.sendToParent({custId : null,flag : false,custName : null})}} style={{float: "right"}}>Close</button>
                                </div>
                               </div>         
                     </div>
                     </div>
                     </div>
                 </div>
           </div>
    )
}