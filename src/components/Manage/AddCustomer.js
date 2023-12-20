import React, { useEffect, useState } from "react";
import axios from "axios";


export default function AddCustomer(props) {

    //const [customerId , setCustomerId] = useState();
    const [customerName , setCustomerName] = useState();
    const [gstNo , setGstNo] = useState();
    const [shippingGstNo , setShippingGstNo] = useState("4444");
    const [address1 , setAddress1] = useState();
    const [address2 , setAddress2] = useState();
    const [city , setCity] = useState();
    const [pincode , setPincode] = useState();
    const [state , setState] = useState();
    const [shippingState , setShippingState] = useState();
    const [country , setCountry] = useState("India");
    const [email , setEmail] = useState();
    const [contactNo , setContactNo] = useState();
    const [shippingAddress1 , setShippingAddress1] = useState();
    const [paymentTerms , setPaymentTerms] = useState();

     const BACKEND_SERVER="http://localhost:8080";

  
     function saveCustomer(e){
         e.preventDefault();

         let customerData={
             
            customerName : customerName,
            gstNo : gstNo,
            shippingGstNo : shippingGstNo,
            address1 : address1,
            address2 : address2,
            city : city,
            pincode : pincode,
            state : state,
            shippingState : shippingState,
            country : country,
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

        if(res!=null && res.data.res=='success'){
            alert("saved success");
            props.sendToParent(false);
            
        }else{
            alert("something is wrong");
            props.sendToParent(true);
        }
       
        
      }).catch(function (error) {
        props.sendToParent(true);
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



    return (
        <div style={{ width: "596px", marginRight: "0%" }}>
            <div class="modal-content" >

                {/* <!-- Modal Header --> */}
                <div class="modal-header" style={{ backgroundColor: "#eee" }}>
                    <h4 class=" text-center" style={{ backgroundColor: "#eee", padding: "5px" }}>Create Customer</h4>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" onClick={() => {props.sendToParent(false)}}>×</span>
                    </button>

                 </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body">
                    <div class="login px-4 mx-auto mw-100">

                        <div class="row">
                            <div class="col-md-12">
                                <label>Customer Name</label>
                                <input type="text" onChange={e => setCustomerName(e.target.value)} class="form-control" />

                            </div>


                        </div>
                        <br />

                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">

                                        <select  class="form-control" style={{ backgroundColor: "gainsboro" }}>
                                            <option value="Sundry Debtors">Sundry Debtors</option>

                                        </select>
                                    </div>
                                    <div class="col-md-6">

                                        <input  type="text" maxlength="15" onChange={e => setGstNo(e.target.value)} class="form-control" placeholder="GST No." pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" />
                                    </div>
                                </div>
                            </div>


                        </div>


                        <br />

                        <div class="row">

                            <div class="col-md-6">
                                <label style={{ fontSize: "15px" }}>Billing Address <a href="#" style={{ color: "blue", fontSize: "13px" }}></a></label>
                                <input type="text" onChange={e => setAddress1(e.target.value)} class="form-control" placeholder="Address" />
                            </div>
                            <div class="col-md-6">

                                <br />

                                <input  type="text" onChange={e => setAddress2(e.target.value)} class="form-control" placeholder="Address (Line II)" style={{ marginTop: "8px" }} />
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <br />
                                        <input  type="text" onChange={e => setCity(e.target.value)}class="form-control" placeholder="City" />
                                        <br />
                                        <select onChange={selectBillingState} class="form-control">
                                            <option value="--Select State--">--Select State--</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            {/* <option value="9">Himachal Pradesh</option>
                                            <option value="10">Jammu and Kashmir</option>
                                            <option value="11">Jharkhand</option>
                                            <option value="12">Karnataka</option>
                                            <option value="13">Kerala</option>
                                            <option value="14">Madhya Pradesh</option>
                                            <option value="15">Uttar Pradesh</option>
                                            <option value="16">Manipur</option>
                                            <option value="17">Meghalaya</option>
                                            <option value="18">Mizoram</option>
                                            <option value="19">Nagaland</option>
                                            <option value="20">Odisha</option>
                                            <option value="21">Punjab</option>
                                            <option value="22">Rajasthan</option>
                                            <option value="23">Sikkim</option>
                                            <option value="24">Tamil Nadu</option>
                                            <option value="25">Telangana</option>
                                            <option value="26">Tripura</option>
                                            <option value="27">Maharashtra</option>
                                            <option value="28">Uttarakhand</option>
                                            <option value="29">West Bengal</option>
                                            <option value="30">Andaman and Nicobar Islands</option>
                                            <option value="31">Chandigarh</option>
                                            <option value="32">Dadar and Nagar Haveli</option>
                                            <option value="33">Daman and Diu</option>
                                            <option value="34">Delhi</option>
                                            <option value="35">Lakshadweep</option>
                                            <option value="36">Puducherry (Pondicherry)</option> */}

                                        </select>

                                    </div>
                                    <div class="col-md-6">
                                        <br />

                                        <input  type="text" maxlength="6" onChange={e => setPincode(e.target.value)} class="form-control" placeholder="Pin Code" pattern="^[0-9]{6}$" />
                                        <br />
                                        <input  type="text" onChange={e => setCountry(e.target.value)}  class="form-control" placeholder="Country"  style={{ backgroundClip: "gainsboro" }} />
                                    </div>

                                </div>
                            </div>


                        </div>
                        <br />
                        <div id="ContentPlaceHolder1_UpdatePanel2">


                            <div class="row">

                                <div class="col-md-6">
                                    <label>Shipping Address <a href="#" style={{ color: "blue", fontSize: "23px" }}></a></label>
                                    <br />
                                    <label>Same as billing Address </label>
                                    <input  type="checkbox"  onclick="javascript:setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$checkbox1\',\'\')', 0)" />

                                    <input  type="text"  class="form-control" placeholder="Customer Name" />
                                </div>
                                <div class="col-md-6">
                                    <br />
                                    <br />

                                    <input  maxlength="15" id="ContentPlaceHolder1_txtgstno2" type="text" class="form-control" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" placeholder="GST No" style={{ marginTop: "10px" }} />
                                </div>

                            </div>

                            <br />
                            <div class="row">

                                <div class="col-md-6">
                                    <input  type="text" onChange={e => setShippingAddress1(e.target.value)} class="form-control" placeholder="Address" />
                                </div>
                                <div class="col-md-6">

                                    <input   type="text"  class="form-control" placeholder="Address (Line II)" />
                                </div>

                            </div>
                            <br />
                            <div class="row">

                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-6">

                                            <input  type="text"  class="form-control" placeholder="Citytown" />
                                            <br />
                                            <select onChange={selectShippState}  class="form-control">
                                                <option value="--Select State--">--Select State--</option>
                                                <option value="JAMMU AND KASHMIR">JAMMU AND KASHMIR</option>
                                                <option value="HIMACHAL PRADESH">HIMACHAL PRADESH</option>
                                                <option value="PUNJAB">PUNJAB</option>
                                                <option value="CHANDIGARH">CHANDIGARH</option>
                                                {/* <option value="5">UTTARAKHAND</option>
                                                <option value="6">HARYANA</option>
                                                <option value="7">DELHI</option>
                                                <option value="8">RAJASTHAN</option>
                                                <option value="9">UTTAR PRADESH</option>
                                                <option value="10">BIHAR</option>
                                                <option value="11">SIKKIM</option>
                                                <option value="12">ARUNACHAL PRADESH</option>
                                                <option value="13">NAGALAND</option>
                                                <option value="14">MANIPUR</option>
                                                <option value="15">MIZORAM</option>
                                                <option value="16">TRIPURA</option>
                                                <option value="17">MEGHLAYA</option>
                                                <option value="18">ASSAM</option>
                                                <option value="19">WEST BENGAL</option>
                                                <option value="20">JHARKHAND</option>
                                                <option value="21">ODISHA</option>
                                                <option value="22">CHATTISGARH</option>
                                                <option value="23">MADHYA PRADESH</option>
                                                <option value="24">GUJARAT</option>
                                                <option value="25">DAMAN AND DIU</option>
                                                <option value="26">DADRA AND NAGAR HAVELI</option>
                                                <option value="27">Maharashtra</option>
                                                <option value="28">ANDHRA PRADESH(BEFORE DIVISION)</option>
                                                <option value="29">KARNATAKA</option>
                                                <option value="30">GOA</option>
                                                <option value="31">LAKSHWADEEP</option>
                                                <option value="32">KERALA</option>
                                                <option value="33">TAMIL NADU</option>
                                                <option value="34">Pondicherry</option>
                                                <option value="35">ANDAMAN AND NICOBARISLANDS</option>
                                                <option value="36">TELANGANA</option>
                                                <option value="37">ANDHRA PRADESH (NEW)</option> */}

                                            </select>
                                        </div>
                                        <div class="col-md-6">

                                            <input  type="text"  class="form-control" placeholder="Pin Code" />


                                            <br />
                                            <input  type="text" class="form-control" placeholder="Country" disabled="disabled" style={{ backgroundClip: "gainsboro" }} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <br />

                            <div class="row">



                                <div class="col-md-6">

                                    <input name="ctl00$ContentPlaceHolder1$txtcontactnumber" type="text" id="ContentPlaceHolder1_txtcontactnumber" class="form-control" placeholder="Contact Person" />
                                </div>

                                <div class="col-md-6">

                                    <input type="text" maxlength="10" onChange={e => setContactNo(e.target.value)} class="form-control" placeholder="Mobile" pattern="^[0-9]{10}$" />
                                </div>
                            </div>


                            <br />
                            <div class="row">
                                <div class="col-md-6">

                                    <input  type="text" onChange={e => setEmail(e.target.value)} class="form-control" placeholder="Mail ID" pattern="[^ @]*@[^ @]*" />
                                </div>

                                <div class="col-md-6">
                                    <input  type="text"  class="form-control" placeholder="Vendor (Code)" />

                                </div>

                            </div>

                            <br />

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <input  type="text"  class="form-control" placeholder="Opening Balance" />
                                        </div>

                                        <div class="col-md-4">
                                            <select onChange={selectPaymentTern} class="form-control">
                                                <option value="Dr">Dr</option>
                                                <option value="Cr">Cr</option>

                                            </select>

                                        </div>
                                    </div>
                                </div>
                                {/* <div class="col-md-6">
                                                    <input type="submit" name="ctl00$ContentPlaceHolder1$btnnewsave" value="Save" id="ContentPlaceHolder1_btnnewsave" class="btn btn-success" style={{float: "right"}} />
                                                    <button type="button" class="btn btn-danger" style={{float: "right", marginRight:"5px"}}>Close</button>
                                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" onClick={saveCustomer}  class="btn btn-success" style={{float: "right"}} > Save </button>
                <button type="button" onClick={() => {props.sendToParent(false)}} class="btn btn-danger" style={{float: "right", marginRight:"5px"}}>Close</button>
                </div>

            </div>
        </div>
    )
}