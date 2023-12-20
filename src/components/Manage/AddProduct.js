import React, { useEffect, useState } from "react";
import axios from "axios";


export default function AddProduct(props) {

    //const [customerId , setCustomerId] = useState();
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
    

    const BACKEND_SERVER = "http://localhost:8080";


    function saveProduct(e) {
        e.preventDefault();

        let productData = {

            productName: productName,
            productDescription: productDescription,
            productType: productType,
            partCode: partCode,
            hsnCode: hsnCode,
            unit: unit,
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

                if (res != null && res.data.res == 'success') {
                    alert("saved success");
                    props.sendToParent(false);

                } else {
                    alert("something is wrong");
                    props.sendToParent(true);
                }


            }).catch(function (error) {
                props.sendToParent(true);
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
        setUnit(e.target.value);
    }

    function selectAppTax(e) {
        setApplicableTax(e.target.value);
    }




    return (
        <div >
            <div class="modal-content">
                <div class="modal-header" style={{backgroundColor: "#eee", padding: "10px"}}>
                    <h5 class="modal-title">Create Product</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" onClick={() => {props.sendToParent(false)}}>×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container side">


                        {/* <div class="row">
                            <div class="col-md-12">
                                <img src="images/non-inventory.png" style={{width: "30px", height: "30px"}}/>&nbsp;&nbsp;<span>Inventory</span>
                            </div>
                        </div> */}

                        <div class="row">
                           <div class="col-md-12">
                                <label>Product Name</label>
                                <input  type="text" onChange={e => setProductName(e.target.value)}  class="form-control" placeholder="Product Name"/>
                            </div>
                            <div class="col-md-12">
                                <label>Product Description</label>
                                <input  type="text" onChange={e => setProductDescription(e.target.value)}  class="form-control" placeholder="Product Description"/>
                            </div>
                            <div class="col-md-6">
                                <label>Part Code</label>
                                <input type="text" onChange={e => setPartCode(e.target.value)} class="form-control" placeholder="Optional"/>
                            </div>

                            <div class="col-md-6">
                                <label>HSN Code</label>
                                <input  type="text" onChange={e => setHsnCode(e.target.value)}  class="form-control" placeholder="Enter a valid HSN Code" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                            </div>
                            <div class="col-md-6">
                                <label>Unit</label>
                                <select onChange={selectUnit} class="form-control">
                                    <option value="0">--Select Unit--</option>
                                    <option value="1">NOS</option>
                                    <option value="2">BAG</option>
                                    <option value="3">BKL</option>
                                    <option value="4">BTL</option>
                                    {/* <option value="10">CBM</option>
                                    <option value="11">CTN</option>
                                    <option value="12">GGK</option>
                                    <option value="13">GYD</option>
                                    <option value="14">KME</option>
                                    <option value="15">MTR</option>
                                    <option value="16">OTH</option>
                                    <option value="17">PRS</option>
                                    <option value="18">SET</option>
                                    <option value="19">SQY</option>
                                    <option value="20">THD</option>
                                    <option value="21">UGS</option>
                                    <option value="22">BAL</option>
                                    <option value="23">BOU</option>
                                    <option value="24">BUN</option>
                                    <option value="25">CCM</option>
                                    <option value="26">DOZ</option>
                                    <option value="27">GMS</option>
                                    <option value="28">KGS</option>
                                    <option value="29">LTR</option>
                                    <option value="30">MTS</option>
                                    <option value="31">PAC</option>
                                    <option value="32">QTL</option>
                                    <option value="33">SQF</option>
                                    <option value="34">TBS</option>
                                    <option value="35">TON</option>
                                    <option value="36">UNT</option>
                                    <option value="37">BDL</option>
                                    <option value="38">BOX</option>
                                    <option value="39">CAN</option>
                                    <option value="40">CMS</option>
                                    <option value="41">DRM</option>
                                    <option value="42">GRS</option>
                                    <option value="43">KLR</option>
                                    <option value="44">MLT</option>
                                    <option value="45">JOB</option>
                                    <option value="46">PCS</option>
                                    <option value="47">ROL</option>
                                    <option value="48">SQM</option>
                                    <option value="49">TGM</option>
                                    <option value="50">TUB</option>
                                    <option value="51">YDS</option>
                                    <option value="53">Hrs</option>
                                    <option value="54">Inch</option>
                                    <option value="55">MM</option>
                                    <option value="56">FT</option>
                                    <option value="57">RFT</option>
                                    <option value="58">LOT</option>
                                    <option value="59">RMT</option> */}

                                </select>

                            </div>
                            <div class="col-md-6">
                                <label>Rate</label>
                                <input type="text" onChange={e => setRate(e.target.value)} class="form-control" placeholder="Rate" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                            </div>
                            <div class="col-md-12">
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
                            <div class="col-md-12">
                                <label></label>
                                <br/>
                            </div>
                            <div class="col-md-12">
                                <label>Applicable Tax</label>
                                <select onChange={selectAppTax} class="form-control">
                                    <option value="0">-Select Tax-</option>
                                    <option value="28">GST@28%</option>
                                    <option value="18">GST@18%</option>
                                    <option value="12">GST@12%</option>
                                    <option value="11">GST@5%</option>
                                    <option value="3">GST@3%</option>
                                    <option value="0">GST@0%(Nill rated)</option>
                                    <option value="1">Exempt GST</option>

                                </select>
                            </div>

                            <div class="col-md-12">
                                <label>Opening Stock</label>
                                <input type="text" onChange={e => setOpeningStock(e.target.value)} class="form-control" placeholder="Quantity" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"/>
                            </div>



                        </div>

                        <br/>


                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" onClick={() => {props.sendToParent(false)}} class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" value="Save" onClick={saveProduct}  class="btn btn-success" style={{float: "right"}}/>
                </div>
            </div>
        </div>
    )
}