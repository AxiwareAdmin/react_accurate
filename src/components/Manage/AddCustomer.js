import React, { useEffect, useState } from "react";
import axios from "axios";


export default function AddCustomer(props) {

    //const [customerId , setCustomerId] = useState();
    const [customerName , setCustomerName] = useState("sachin");
    const [gstNo , setGstNo] = useState("1234");
    const [shippingGstNo , setShippingGstNo] = useState("4444");
    const [address1 , setAddress1] = useState("patlipada");
    const [address2 , setAddress2] = useState("thane");
    const [city , setCity] = useState("mumbai");
    const [pincode , setPincode] = useState("413310");
    const [state , setState] = useState("mharashtra");
    const [shippingState , setShippingState] = useState("Goa");
    const [country , setCountry] = useState("India");
    const [email , setEmail] = useState("abc@gmail.com");
    const [contactNo , setContactNo] = useState("1234567890");
    const [shippingAddress1 , setShippingAddress1] = useState("abcdefg");
    const [paymentTerms , setPaymentTerms] = useState("aaaaaa");

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
      .get(BACKEND_SERVER+"/addCustomerDetails" ,customerData,{
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
                                <input name="ctl00$ContentPlaceHolder1$txt_cname" type="text" value={customerName} class="form-control" />

                            </div>


                        </div>
                        <br />

                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">

                                        <select name="ctl00$ContentPlaceHolder1$drpgroup" id="ContentPlaceHolder1_drpgroup" class="form-control" style={{ backgroundColor: "gainsboro" }}>
                                            <option value="Sundry Debtors">Sundry Debtors</option>

                                        </select>
                                    </div>
                                    <div class="col-md-6">

                                        <input name="ctl00$ContentPlaceHolder1$txtgstno" type="text" maxlength="15" value={gstNo} class="form-control" placeholder="GST No." pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" />
                                    </div>
                                </div>
                            </div>


                        </div>


                        <br />

                        <div class="row">

                            <div class="col-md-6">
                                <label style={{ fontSize: "15px" }}>Billing Address <a href="#" style={{ color: "blue", fontSize: "13px" }}></a></label>
                                <input name="ctl00$ContentPlaceHolder1$txtbillingadd" type="text" value={address1} class="form-control" placeholder="Address" />
                            </div>
                            <div class="col-md-6">

                                <br />

                                <input name="ctl00$ContentPlaceHolder1$txtadd1" type="text" value={address2} class="form-control" placeholder="Address (Line II)" style={{ marginTop: "8px" }} />
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <br />
                                        <input name="ctl00$ContentPlaceHolder1$txtcity" type="text" id="ContentPlaceHolder1_txtcity" class="form-control" placeholder="City" />
                                        <br />
                                        <select name="ctl00$ContentPlaceHolder1$drpstate" id="ContentPlaceHolder1_drpstate" class="form-control">
                                            <option value="--Select State--">--Select State--</option>
                                            <option value="1">Andhra Pradesh</option>
                                            <option value="2">Arunachal Pradesh</option>
                                            <option value="3">Assam</option>
                                            <option value="4">Bihar</option>
                                            <option value="5">Chhattisgarh</option>
                                            <option value="6">Goa</option>
                                            <option value="7">Gujarat</option>
                                            <option value="8">Haryana</option>
                                            <option value="9">Himachal Pradesh</option>
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
                                            <option value="36">Puducherry (Pondicherry)</option>

                                        </select>

                                    </div>
                                    <div class="col-md-6">
                                        <br />

                                        <input name="ctl00$ContentPlaceHolder1$txtpincode" type="text" maxlength="6" value={pincode} class="form-control" placeholder="Pin Code" pattern="^[0-9]{6}$" />
                                        <br />
                                        <input name="ctl00$ContentPlaceHolder1$txtcountry" type="text" value={country}  class="form-control" placeholder="Country" disabled="disabled" style={{ backgroundClip: "gainsboro" }} />
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
                                    <input id="ContentPlaceHolder1_checkbox1" type="checkbox" name="ctl00$ContentPlaceHolder1$checkbox1" onclick="javascript:setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$checkbox1\',\'\')', 0)" />

                                    <input name="ctl00$ContentPlaceHolder1$txtcustname" type="text" id="ContentPlaceHolder1_txtcustname" class="form-control" placeholder="Customer Name" />
                                </div>
                                <div class="col-md-6">
                                    <br />
                                    <br />

                                    <input name="ctl00$ContentPlaceHolder1$txtgstno2" maxlength="15" id="ContentPlaceHolder1_txtgstno2" type="text" class="form-control" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$" placeholder="GST No" style={{ marginTop: "10px" }} />
                                </div>

                            </div>

                            <br />
                            <div class="row">

                                <div class="col-md-6">
                                    <input name="ctl00$ContentPlaceHolder1$street1" id="ContentPlaceHolder1_street1" type="text" class="form-control" placeholder="Address" />
                                </div>
                                <div class="col-md-6">

                                    <input name="ctl00$ContentPlaceHolder1$txtadd2" id="ContentPlaceHolder1_txtadd2" type="text" class="form-control" placeholder="Address (Line II)" />
                                </div>

                            </div>
                            <br />
                            <div class="row">

                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-6">

                                            <input name="ctl00$ContentPlaceHolder1$txtcity1" type="text" id="ContentPlaceHolder1_txtcity1" class="form-control" placeholder="Citytown" />
                                            <br />
                                            <select name="ctl00$ContentPlaceHolder1$drpstate12" id="ContentPlaceHolder1_drpstate12" class="form-control">
                                                <option value="--Select State--">--Select State--</option>
                                                <option value="1">JAMMU AND KASHMIR</option>
                                                <option value="2">HIMACHAL PRADESH</option>
                                                <option value="3">PUNJAB</option>
                                                <option value="4">CHANDIGARH</option>
                                                <option value="5">UTTARAKHAND</option>
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
                                                <option value="37">ANDHRA PRADESH (NEW)</option>

                                            </select>
                                        </div>
                                        <div class="col-md-6">

                                            <input name="ctl00$ContentPlaceHolder1$txtpincode1" type="text" id="ContentPlaceHolder1_txtpincode1" class="form-control" placeholder="Pin Code" />


                                            <br />
                                            <input name="ctl00$ContentPlaceHolder1$txtcountry1" type="text" id="ContentPlaceHolder1_txtcountry1" class="form-control" placeholder="Country" disabled="disabled" style={{ backgroundClip: "gainsboro" }} />
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

                                    <input name="ctl00$ContentPlaceHolder1$txtmobile" type="text" maxlength="10" id="ContentPlaceHolder1_txtmobile" class="form-control" placeholder="Mobile" pattern="^[0-9]{10}$" />
                                </div>
                            </div>


                            <br />
                            <div class="row">
                                <div class="col-md-6">

                                    <input name="ctl00$ContentPlaceHolder1$txtmailid" type="text" id="ContentPlaceHolder1_txtmailid" class="form-control" placeholder="Mail ID" pattern="[^ @]*@[^ @]*" />
                                </div>

                                <div class="col-md-6">
                                    <input name="ctl00$ContentPlaceHolder1$txtvendor" type="text" id="ContentPlaceHolder1_txtvendor" class="form-control" placeholder="Vendor (Code)" />

                                </div>

                            </div>

                            <br />

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <input name="ctl00$ContentPlaceHolder1$bal" type="text" id="ContentPlaceHolder1_bal" class="form-control" placeholder="Opening Balance" />
                                        </div>

                                        <div class="col-md-4">
                                            <select name="ctl00$ContentPlaceHolder1$drpdrcr" id="ContentPlaceHolder1_drpdrcr" class="form-control">
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
                <button type="button" onClick={saveCustomer} name="ctl00$ContentPlaceHolder1$btnnewsave" class="btn btn-success" style={{float: "right"}} > Save </button>
                <button type="button" onClick={() => {props.sendToParent(false)}} class="btn btn-danger" style={{float: "right", marginRight:"5px"}}>Close</button>
                </div>

            </div>
        </div>
    )
}