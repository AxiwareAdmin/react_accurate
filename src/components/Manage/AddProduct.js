import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function AddProduct(props) {

    //const [customerId , setCustomerId] = useState();
    const [alertMsg,setAlertMsg]=useState(null);
    const [productName, setProductName] = useState();
    const [productDescription, setProductDescription] = useState();
    const [productType, setProductType] = useState("Food");
    const [partCode, setPartCode] = useState();
    const [hsnCode, setHsnCode] = useState();
    const [unit, setUnit] = useState();
    const [unitVarchar, setUnitVarchar] = useState("ss");
    const [rate, setRate] = useState();
    const [category, setCategory] = useState();
    const [applicableTax, setApplicableTax] = useState();
    const [openingStock, setOpeningStock] = useState();
    const [taxoption , setTaxOption] = useState([{key:"0",val:"-Select Tax-"},{key:"28",val:"GST@28%"},
    {key:"18",val:"GST@18%"},{key:"12",val:"GST@12%"},{key:"11",val:"GST@11%"},{key:"3",val:"GST@3%"},
    {key:"0",val:"GST@0%(Nill rated)"},{key:"1",val:"Exempt GST"}]);
    


    const BACKEND_SERVER = "http://localhost:8080";


    function saveProduct(e) {
        e.preventDefault();

        if(productName == null || productName == undefined || productName == ""){
            validations("Please Enter Product Name");
         }else if(partCode == null || partCode == undefined || partCode == ""){
            validations("Please Enter partCode");
         }else if(hsnCode == null || hsnCode == undefined || hsnCode == ""){
            validations("Please Enter hsnCode");
         }else if(unitVarchar == null || unitVarchar == undefined || unitVarchar == "0"){
            validations("Please Select  unit");
         }else if(rate == null || rate == undefined || rate == ""){
            validations("Please Enter rate");
         }else if(category == null || category == undefined || category =="--Select--"){
            validations("Please select  category");
         }else if(applicableTax == null || applicableTax == undefined || applicableTax == "0"){
            validations("Please select  applicableTax");
         }else if(openingStock == null || openingStock == undefined || openingStock == ""){
             validations("Please Enter openingStock");
         }else{

        let productData = {

            productName: productName,
            productDescription: productDescription,
            productType: productType,
            partCode: partCode,
            hsnCode: hsnCode,
            // unit: unit,
            unitVarchar: unitVarchar,
            rate: rate,
            category: category,
            applicableTax: applicableTax,
            openingStock: openingStock

        }

        var token = localStorage.getItem("token")
        //it was GET method earlier
        axios
            .post(BACKEND_SERVER + "/addProductDetails", productData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token
                }
            })
            .then((res) => {
                console.log("In customer pop up all invoice data" + res.data);

                if (res != null && res.data.res != "failure") {

                    //props.sendToParent(false);
                    props.sendToParent({prodId : res.data.res,flag : false,prodName : productName});
                    return;

                } else {
                    debugger;
                   // alert("something is wrong");
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
               
                toast("something is wrong! ",{
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
            type:"error",
            autoClose:500
           });
    }
    useEffect (() => {
        window.selectCategory = (e) => {
            selectCategory(e);
        }

        window.selectUnit = (e) => {
            selectUnit(e);
        }

        window.selectAppTax = (e) => {
            selectAppTax(e);
        }
    });

    function selectCategory (e) {
        console.log("category"+e +" cc"+e.target.value);
        setCategory(e.target.value);
    }

    function selectUnit(e){
        //console.log("category"+e +" cc"+e.target.value);
        setUnitVarchar(e.target.value);
    }

    function selectAppTax(e) {
        setApplicableTax(e.target.value);
    }





    return (
        <div>
           <div class="modal-dialog modal-dialog-centered modal-md" style={{width:"auto"}}>
                <div class="modal-content" style={{marginTop :"-30px"}}>
                    <div class="modal-header" >
                        <div class="form-header text-start mb-0">
                            <h4 class="mb-0 text-dark fw-bold">Create Product</h4>
                        </div>
                        <button type="button" class="close" onClick={() => {props.sendToParent({prodId : null,flag : false,prodName : null})}}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                <div class="modal-body">
                        <div class="bank-inner-details">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Product Name</label>
                                        <input type="text" onChange={e => setProductName(e.target.value)} class="form-control" placeholder="Product Name" />
                                    </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <label>Part Code</label>
                                        <input type="text" onChange={e => setPartCode(e.target.value)} class="form-control" placeholder="Part Code" />
                                    </div>
                                </div>
                                 <div class="col-lg-6 col-md-6">
                                        <div class="form-group">
                                        <label>HSN Code</label>
                                        <input type="text" onChange={e => setHsnCode(e.target.value)} class="form-control" placeholder="HSN Code" />
                                        </div>
                                </div>
                             </div>
                             <div class="row">
                             <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <label>Unit</label>
                                    <select onChange={selectUnit} class="form-control">
                                        <option value="0">--Select Unit--</option>
                                         <option value="nos">NOS</option>
                                        <option value="bag">BAG</option>
                                         <option value="bkl">BKL</option>
                                        <option value="btk">BTL</option>
                                    </select>
                                     </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="form-group">
                                        <label>Rate</label>
                                        <input type="text" onChange={e => setRate(e.target.value)} class="form-control" placeholder="Rate" />
                                     </div>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                    <label>Category</label>
                                    <select onChange={selectCategory} class="form-control">
                                    <option value="--Select--">--Select--</option>
                                    <option value="Finished Product">Finished Product</option>
                                    <option value="Raw Material">Raw Material</option>
                                    <option value="Capital Goods">Capital Goods</option>
                                    <option value="Misc Product">Misc Product</option>
                                    <option value="Spare Part">Spare Part</option>
                                    <option value="Sevices">Sevices</option>
                                    <option value="Others">Others</option>

                                </select>
                                     </div>
                                </div>
                                
                                </div>

                                <div class="row">
                                
                                <div class="col-lg-12 col-md-12">
                                <label>Applicable Tax</label>
                                <select onChange={selectAppTax} class="form-control">
                                 {taxoption.map((val,key) => {
                                     return (<option value={val.key}>{val.val}</option>)
                                 })}
                                    {/* <option value="0">-Select Tax-</option>
                                    <option value="28">GST@28%</option>
                                    <option value="18">GST@18%</option>
                                    <option value="12">GST@12%</option>
                                    <option value="11">GST@5%</option>
                                    <option value="3">GST@3%</option>
                                    <option value="0">GST@0%(Nill rated)</option>
                                    <option value="1">Exempt GST</option> */}

                                </select>
                                </div>
                                </div>
                             <div class="row">
                             <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>opening Stock</label>
                                        <input type="text" onChange={e => setOpeningStock(e.target.value)} class="form-control" placeholder="opening Stock" />
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
                                <button type="button" onClick={saveProduct}  class="btn btn-success" style={{marginLeft:"60px"}}> Save </button>
                                <button type="button"  class="btn btn-danger" onClick={() => {props.sendToParent({prodId : null,flag : false,prodName : null})}} style={{float: "right"}}>Close</button>
                                </div>
                               </div>         
                     </div>
                     </div>
                     </div>
                 </div>
 

        </div>
    )
}
