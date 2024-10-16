//invoice wrapper

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import axios from "axios";
import Alert from "../alert";
import {
  Navigate,
  useAsyncError,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useRef } from "react";
import Swal from "sweetalert2";
import AddProduct from "../Manage/AddProduct";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCustomer from "../Manage/AddCustomer";
import $ from "jquery";
import "select2";
import { Helmet } from "react-helmet-async";
import Theme from "../Theme/Theme";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateMaterialOutward(props) {
  let addProductForCopy;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialInvoiceType = queryParams.get(
    process.env.REACT_APP_INVOICE_TYPE
  );

  const [invoiceType, setInvoiceType] = useState(initialInvoiceType);

  useEffect(() => {
    console.log("changing");
    const newInvoiceType = queryParams.get(process.env.REACT_APP_INVOICE_TYPE);
    setInvoiceType(newInvoiceType);
  }, [location.search]);
  const BACKEND_SERVER = `${process.env.REACT_APP_LOCAL_URL}`;
  const editref = useRef(true);

  const [isOpenCustomer, setIsOpenCustomer] = React.useState(false);
  const [isOpenAddProduct, setIsOpenAddProduct] = React.useState(false);

  const handleClickOpenCustomer = (e) => {
    e.preventDefault();
    setIsOpenCustomer(true);
  };

  const onInputPONumChange = (e) => {
    setPoNumber(e.target.value);
  };

  const AddProductDetails = (e) => {
    e.preventDefault();
    console.log("add product clicked");
    setIsOpenAddProduct(true);
    console.log("product opened");
    let selectClassName =
      e.target.parentElement.parentElement.parentElement.querySelector("select")
        .classList[1];
    setCurrentOpenedProductPopupTrSelectId(selectClassName);
  };

  const custData = (data) => {
    var custId = null;
    var custName = null;
    if (data.custId != null && data.custId != "undefined") {
      custId = data.custId;
    }
    if (data.custName != null && data.custName != "undefined") {
      custName = data.custName;
    }
    if (custId != null && custName != null) {
      var option = document.createElement("option");
      option.value = custId;
      option.append(document.createTextNode(custName));
      document.querySelector("#customer").append(option);

      toast.success("Customer created successfully!", {
        position: "top-center",
        theme: "colored",
        autoClose: 500,
      });
    }

    if (data.flag != null && data.flag != "undefined") {
      setIsOpenCustomer(data.flag);
    }
    console.log("In parent got data from child " + data.flag);
    console.log("In parent got data from child " + data.custId);
    console.log("In parent got data from child " + data.custName);
    console.log("In parent got data from child " + data);
  };

  const prodData = (data) => {
    var prodId = null;
    var prodName = null;

    if (data.prodId != null && data.prodId != "undefined") {
      prodId = data.prodId;
    }
    if (data.prodName != null && data.prodName != "undefined") {
      prodName = data.prodName;
    }

    if (prodId != null && prodName != null) {
      var option = document.createElement("option");
      option.value = prodId;
      option.append(document.createTextNode(prodName));
      document
        .querySelector(`.${currentOpenedProductPopupTrSelectId}`)
        .append(option);

      toast.success("Product created successfully!", {
        position: "top-center",
        theme: "colored",
        autoClose: 500,
      });
    }

    if (data.flag != null && data.flag != "undefined") {
      setIsOpenAddProduct(data.flag);
    }

    console.log("In parent got data from child " + data.flag);
    console.log("In parent got data from child " + data.prodId);
    console.log("In parent got data from child " + data.prodName);
    console.log("In parent got data from child " + data);
  };

  const [productUnits, setProductUnits] = useState([
    {
      id: 1,
      productName: null,
      description: null,
      hsnSac: 0,
      tax: 0,
      quantity: 0,
      price: 0,
      amount: 0,
      discount: null,
      unit: null,
    },
  ]);

  function toCurrency(value) {
    try {
      if (isNaN(Number(value))) return value;
      return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      throw err;
    }
  }
  function fromCurrency(value) {
    try {
      let num = Number((value + "").replace(/[\$,]/g, ""));
      return isNaN(num) ? 0 : num;
    } catch (err) {
      throw err;
    }
  }

  function convertToAccountingStandard(num) {
    num = toCurrency(fromCurrency(num)).replace(/[\$]/g, "");

    return num;
  }
  const [productCount, setProductCount] = useState(productUnits.length);
  function prodSelectOnChange(event) {
    console.log(event.target.value);

    var token = localStorage.getItem("token");
    //it was GET method earlier
    axios
      .get(
        `${process.env.REACT_APP_LOCAL_URL}/invoiceproduct/` +
          event.target.value,
        {
          //change
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        var td = event.target.parentElement;
        var productId = td.querySelector("#productId").value;
        td = td.parentElement;
        var description = td.querySelector("#description").value;
        var hsnSac = td.querySelector("#hsnSac").value;
        var tax = fromCurrency(td.querySelector("#tax").value.replace("%", ""));
        var quantity = fromCurrency(td.querySelector("#quantity").value);
        var price = fromCurrency(td.querySelector("#price").value);
        let tempDis = td.querySelector("#discount").value;

        tempDis = tempDis.substr(0, tempDis.length - 1);
        var discount = fromCurrency(
          td.querySelector("#discount").value.replace("%", "")
        );
        var amount = fromCurrency(td.querySelector("#amount").value);
        var unit = td.querySelector("#unit").value;
        var productName = event.target.querySelector("option:checked").text;

        let tempProdUnits = [...productUnits];

        tempProdUnits.map((prodUnit) => {
          if (prodUnit.id == productId) {
            prodUnit.description = description;
            prodUnit.hsnSac = hsnSac;
            prodUnit.tax = tax;
            prodUnit.quantity = quantity;
            prodUnit.price = price;
            prodUnit.discount = discount;
            prodUnit.amount = amount;
            prodUnit.productName = productName;
            prodUnit.unit = unit;
          }
        });

        setProductUnits(tempProdUnits);

        setTotalAmt(calculateTotalAmt());
      });
  }

  function prodSelectOnChangeForCopy(dataArr) {
    let tempProdUnits = [];

    var index = 1;

    dataArr.map((data, ind) => {
      var productId = index;
      index = index + 1;
      var description = data.productDescription;
      var hsnSac = data.hsnSac;
      var tax = data.tax;
      var quantity = data.quantity;
      var price = data.rate;
      var discount = data.discount;
      var amount = data.amount;
      var unit = data.unit;
      var productName = data.productName;

      var tempObj = {
        id: productId,
        description,
        hsnSac,
        tax,
        quantity,
        price,
        discount,
        amount,
        productName,
        unit,
      };

      tempProdUnits.push(tempObj);
    });

    setProductUnits(tempProdUnits);

    setTotalAmt(calculateTotalAmt());
  }

  function getProductCount() {
    return productCount;
  }

  function setProdCount(num) {
    var temp = {
      id: num,
      productName: null,
      description: null,
      hsnSac: 0,
      tax: 0,
      quantity: 0,
      price: 0,
      amount: 0,
      discount: null,
      unit: null,
    };

    // alert([...productUnits].push(temp));
    setProductCount(num);
    setProductUnits([...productUnits, temp]);
    console.log(productUnits.length);
  }

  const roundNum = (num) => {
    num = fromCurrency(toCurrency(num));
    // num=toCurrency(fromCurrency(e.target.value)).replace(/[\$]/g,'')
    return num;
  };

  const calculateTotalAmt = () => {
    console.log(productUnits);
    let totAmt = 0;
    let tempProdUnits = [...productUnits];
    tempProdUnits.map((product) => {
      let quantity = product.quantity;
      let temp =
        quantity == null ||
        quantity == undefined ||
        quantity == "" ||
        product.price == null ||
        product.price == "" ||
        product.amount == null ||
        product.amount == "" ||
        product.discount == null ||
        product.discount == "" ||
        product.productName == null ||
        product.productName == "--Select--";

      console.log(
        product.discount +
          ".." +
          (product.discount == null || product.discount == "")
      );
      if (
        quantity == null ||
        quantity == undefined ||
        quantity === "" ||
        product.price == null ||
        product.price === "" ||
        product.amount == null ||
        product.amount === "" ||
        product.discount == null ||
        product.discount === "" ||
        product.productName == null ||
        product.productName == "--Select--"
      )
        return 0;

      let price = roundNum(product.price);
      let discount = roundNum(product.discount);
      // product.amount = roundNum(
      //   quantity * price - quantity * price * (discount / 100)
      // );

      let amt = roundNum(
        quantity * price - quantity * price * (discount / 100)
      );

      totAmt = roundNum(totAmt + amt);
    });
    return totAmt;
  };
  const [totalAmt, setTotalAmt] = useState(calculateTotalAmt());

  const onPriceChange = (event) => {
    var tr = event.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = fromCurrency(tr.querySelector("#quantity").value);

    let price = fromCurrency(tr.querySelector("#price").value);

    let tempDis = tr.querySelector("#discount").value;

    tempDis = tempDis.substr(0, tempDis.length - 1);

    let discount = fromCurrency(
      tr.querySelector("#discount").value.replace("%", "")
    );
    let amount = fromCurrency(tr.querySelector("#amount").value);

    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.quantity = quantity;
        prodUnit.price = price;
        prodUnit.discount = discount;
        prodUnit.amount = amount;
      }
    });

    setProductUnits(tempProdUnits);
  };

  const onDiscountChange = (event) => {
    var tr = event.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = fromCurrency(tr.querySelector("#quantity").value);

    let price = fromCurrency(tr.querySelector("#price").value);

    let tempDiscount = tr.querySelector("#discount").value;
    tempDiscount = tempDiscount.substr(0, tempDiscount.length - 1);
    let discount = fromCurrency(
      tr.querySelector("#discount").value.replace("%", "")
    );
    let amount = fromCurrency(tr.querySelector("#amount").value);

    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.quantity = quantity;
        prodUnit.price = price;
        prodUnit.discount = discount;
        prodUnit.amount = amount;
      }
    });

    setProductUnits(tempProdUnits);
    // setTotalAmt(calculateTotalAmt());
  };

  const onQuantityChange = (event) => {
    var tr = event.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = fromCurrency(event.target.value);

    let price = fromCurrency(tr.querySelector("#price").value);

    let tempDiscount = tr.querySelector("#discount").value;
    tempDiscount = tempDiscount.substr(0, tempDiscount.length - 1);
    let discount = fromCurrency(
      tr.querySelector("#discount").value.replace("%", "")
    );
    let amount = fromCurrency(tr.querySelector("#amount").value);

    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.quantity = quantity;
        prodUnit.price = price;
        prodUnit.discount = discount;
        prodUnit.amount = amount;
      }
    });

    setProductUnits(tempProdUnits);

    // setTotalAmt(calculateTotalAmt());
  };

  const removeTr = (prodTrId) => {
    const index = productUnits.findIndex((prod) => prod.id == prodTrId); //use id instead of index
    if (index > -1) {
      //make sure you found it
      setProductUnits([
        ...productUnits.slice(0, index),
        ...productUnits.slice(index + 1),
      ]);
    }
  };

  function onPoNumberChange() {
    console.log("executed");
    

    let tempCopyOtherDiscount = 0;
    let tempTotalAmt = 0;
    var url = new URL(window.location.href);

    let actionedit = url.searchParams.get("action");

    if (!actionedit || actionedit != "Book") return;

    let pono = url.searchParams.get("poNumber");

    var token = localStorage.getItem("token");
    document.querySelector("#prodtable").innerHTML = "";

    axios
      .get(`${process.env.REACT_APP_LOCAL_URL}/customerPo/id/${pono}`, {
        //change
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("after got data" + res.data.purchaseNo);

        setPoNumber(res.data.invoiceNo);

        if (res.data.poDate != null) {
          let finvdate = getFormattedDate(new Date(res.data.poDate));
          setPoDate(finvdate);
        }

        if (res.data.customerName != null) {
          const text = res.data.customerName;
          const $select = document.querySelector("#customer");
          const $options = Array.from($select.options);

          const optionToSelect = $options.find((item) => item.text === text);
          $select.value = optionToSelect.value;
          //below code is used to dispatch change event on customer select box becuase i is not getting updated otherwise
          var event = new Event("change");

          // //          // Dispatch it.
          $select.dispatchEvent(event);

          // selectCustomerOnCopy($select.value,text)
        }

        if (res.data.paymentTerms != null) {
          const text = res.data.paymentTerms;
          const $select = document.querySelector("#paymentTerm");
          const $options = Array.from($select.options);
          const optionToSelect = $options.find((item) => item.text === text);
          $select.value = optionToSelect.value;
        }

        if (res.data.transportCharges != null) {
          var transportChargeTemp = document.querySelector("#transportCharge");
          transportChargeTemp.value = res.data.transportCharges;

          setTransportCharge(fromCurrency(res.data.transportCharges));
        }

        if (res.data.additionalCharges != null) {
          document.querySelector("#otherCharge").value =
            res.data.additionalCharges;
          setOtherCharge(fromCurrency(res.data.additionalCharges));
        }

        if (res.data.discount != null) {
          document.querySelector("#otherDiscount").value = res.data.discount;
          setDiscountInRupees(res.data.discount);
        }

        if (res.data.otherDiscount != null) {
          tempCopyOtherDiscount = res.data.otherDiscount;
        }

        var productUnitsTemp = [];

        res.data.invoiceProductDO &&
          res.data.invoiceProductDO.map((elem, index) => {
            console.log(
              "product data " + elem.productName + ":index id :" + index
            );

            tempTotalAmt += fromCurrency(elem.amount);

            addProductForCopy(elem, index);

            setProdCount(index + 1);

            productUnitsTemp.push(elem);
          });

        prodSelectOnChangeForCopy(productUnitsTemp);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        if (tempCopyOtherDiscount > 0) {
          let temp = toCurrency(
            (fromCurrency(tempCopyOtherDiscount) / fromCurrency(tempTotalAmt)) *
              100
          ).replace(/[\$]/g, "");

          document.querySelector("#discountInPercentage").value = temp;

          setDiscountInPercentage(temp);
        }
      });
  }

  function selectCustomer(e) {
    e.preventDefault();

    var a = document.querySelector("#customer option:checked");
    var customerId = a.value;

    var customerName = a.textContent;

    var token = localStorage.getItem("token");

    axios
      .get(BACKEND_SERVER + "/customer/" + customerId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        var address1 = res.data.address1;
        var address2 = res.data.address2;

        var tempTermsAndCondition = res.data.termsAndCondition;

        setTermsAndCondition(tempTermsAndCondition);

        if (
          tempTermsAndCondition != null &&
          tempTermsAndCondition != undefined &&
          tempTermsAndCondition != "NULL"
        )
          document.getElementById("termsAndCondition").value =
            tempTermsAndCondition;

        var remark = res.data.remarks;
        console.log("remark:" + remark);
        setRemarks(remark);

        if (remarks != null && remark != undefined && remark != "NULL")
          document.getElementById("remark").value = remark;
        else document.getElementById("remark").value = "";

        if (address1 != null && address1 != undefined && address1 != "")
          setFromAddr1(address1);

        if (address2 != null && address2 != undefined && address2 != "")
          setFromAddr2(address2);

        var shippingAddr1 = res.data.shippingAddress1;

        var shippingAddr2 = res.data.shippingAddress2;

        var gstNo = res.data.gstNo;

        var shippingGstNo = res.data.shippingGstNo;

        var state = res.data.state;

        var shippingState = res.data.shippingState;

        setGstNo(gstNo);

        setShippingGstNo(shippingGstNo);

        setState(state);

        setShippingState(shippingState);

        setShippingAddress1(shippingAddr1);
        setShippingAddress2(shippingAddr2);

        // let poNum = res.data.poNumber;
        // if (poNum != null && poNum != undefined && poNum != "")
        //   setPoNumber(poNum);
      });
  }

  useEffect(() => {
    console.log("produnit changed" + productUnits);
    setTotalAmt(calculateTotalAmt());
  }, [productUnits]);

  useEffect(() => {
    window.AddProductDetails = (e) => {
      AddProductDetails(e);
    };

    window.onPaymentTermsChange = (e) => {
      onPaymentTermsChange(e);
    };

    window.prodSelectOnChangeForCopy = (data) => {
      prodSelectOnChangeForCopy(data);
    };

    window.onDescriptionChange = (e) => {
      onDescriptionChange(e);
    };

    window.onTransportModeChange = (e) => {
      onTransportModeChange(e);
    };

    window.onDueDateChange = (e) => {
      onDueDateChange(e);
    };

    window.onChallanDateChange = (e) => {
      onChallanDateChange(e);
    };

    window.onPoDateChange = (e) => {
      onPoDateChange(e);
    };

    window.onInvoiceDateChange = (e) => {
      onInvoiceDateChange(e);
    };
    window.selectCustomer = (e) => {
      selectCustomer(e);
    };
    window.onQuantityChange = (e) => {
      onQuantityChange(e);
    };

    window.removeTr = (prodTrId) => {
      removeTr(prodTrId);
    };

    window.onDiscountChange = (e) => {
      onDiscountChange(e);
    };

    window.onPriceChange = (e) => {
      onPriceChange(e);
    };

    window.prodSelectOnChange = (e) => {
      prodSelectOnChange(e);
    };

    window.setProdCount = (num) => {
      setProdCount(num);
    };

    window.getProductCount = () => getProductCount();
  });
  useEffect(() => {
    // document.querySelectorAll("script").forEach(e => e.remove());
    // document.querySelectorAll("script[src]").forEach(a=>a.remove())
    // document.querySelectorAll(".sidebar-overlay").forEach(e => e.remove());
    var token = localStorage.getItem("token");
    //it was GET method earlier

    axios
      .get(BACKEND_SERVER + "/getDocMaster/MaterialOutward", {
        //change
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        var prefix1 = res.data.prefix1;

        var prefix2 = res.data.prefix2;

        var mode = res.data.mode;

        if (mode != "Auto") {
          setInvoiceMode(mode);
          return;
        }

        var url = new URL(window.location.href);
        let actionedit = url.searchParams.get("action");

        if (
          actionedit != undefined &&
          actionedit != null &&
          actionedit == "Edit"
        )
          return;

        var series = res.data.series;

        var adder = parseInt(series);

        axios
          .get(
            BACKEND_SERVER +
              `/${
                invoiceType == process.env.REACT_APP_CASH_SALE_INVOICE
                  ? "cashInvoices"
                  : invoiceType == process.env.REACT_APP_PROFORMA_INVOICE
                  ? "proformaInvoices"
                  : "materialOutward"
              }/year/` +
              localStorage.getItem("financialYear"),
            {
              //change
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            let invoiceLen = res.data.length + adder + "";

            while (invoiceLen.length < series.length) {
              invoiceLen = "0" + invoiceLen;
            }

            let invoiceNum = prefix1 + "/" + prefix2 + "/" + invoiceLen;
            console.log("invoice:" + invoiceNum);

            setInvoiceNumber(invoiceNum);
          })
          .catch((e) => {
            console.log(e);
          });
      });

    axios
      .get(BACKEND_SERVER + "/gstRates", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data != null && res.data != undefined) {
          setTransportGstRate(res.data[0]);
          setOtherChargesGstRate(res.data[0]);
        }
        setGstRates(res.data);
      });

    axios
      .get(BACKEND_SERVER + "/customers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        !res.data.res &&
          res.data.map((a) => {
            // var label = document.createElement("label");
            // label.className = "custom_check w-100";
            // var span = document.createElement("span");
            // span.className = "checkmark";
            // var input = document.createElement("input");
            // input.type = "checkbox";
            // input.name = "username";

            // var hiddenInput = document.createElement("input");
            // hiddenInput.type = "hidden";
            // hiddenInput.value = a.customerId;
            // var customerName = document.createTextNode(a.customerName);

            // label.appendChild(input);
            // label.appendChild(span);
            // label.appendChild(customerName);
            // label.appendChild(hiddenInput);
            var option = document.createElement("option");
            option.value = a.customerId;
            option.append(document.createTextNode(a.customerName));
            document.querySelector("#customer").append(option);

            // var str='<label className="custom_check w-100"><input type="checkbox" name="username" /><span className="checkmark"></span>'+a.customerName+'</label>'
            // document.getElementById("customer").appendChild(label);
          });
      });
    var token = localStorage.getItem("token");

    axios
      .get(BACKEND_SERVER + "/getStateByClientId", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setClientState(res.data);
      });

    axios
      .get(BACKEND_SERVER + "/invoiceproducts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        !res.data.res &&
          res.data.map((product) => {
            var option = document.createElement("option");
            option.value = product.invoiceProductId;
            option.append(document.createTextNode(product.productName));
            document.querySelector(".prodListSelect").append(option);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

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

    script.onload = () => {
      setScriptLoaded(true);
    };
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

  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    if (scriptLoaded == true) {
      setTimeout(() => {
        
        addProductForCopy = window.addProductForCopy;
        console.log("addproductforcopy:");
        console.log(addProductForCopy);

        onCopyInvoiceAddInvoiceDetails();

        onPoNumberChange();
      }, 1000);
    }
  }, [scriptLoaded]);

  const [fromAddr1, setFromAddr1] = useState("");

  const [clientState, setClientState] = useState("");

  const [
    currentOpenedProductPopupTrSelectId,
    setCurrentOpenedProductPopupTrSelectId,
  ] = useState("");
  const [fromAddr2, setFromAddr2] = useState("");
  const [poNumbers, setPoNumbers] = useState([]);

  const [loadingCompleted, setLoadingCompleted] = useState();

  const [remarks, setRemarks] = useState("");

  const [shippingAddress1, setShippingAddress1] = useState("");

  const [gstNo, setGstNo] = useState("");

  const [shippingGstNo, setShippingGstNo] = useState("");

  const [state, setState] = useState("");

  const [shippingState, setShippingState] = useState("");

  const [shippingAddress2, setShippingAddress2] = useState("");

  const [poNumber, setPoNumber] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  const [transportCharge, setTransportCharge] = useState(0);

  const [otherCharge, setOtherCharge] = useState(0);

  const [discountInRuppes, setDiscountInRupees] = useState(0);

  const [discountInPercentage, setDiscountInPercentage] = useState(0);

  const [totalDiscount, setTotalDiscount] = useState(0);

  const [totalTaxableAmt, setTotalTaxableAmt] = useState(0);

  const [finalAmt, setFinalAmt] = useState(0);

  const [alertMsg, setAlertMsg] = useState(null);

  const [gstPercentageArr, setGstPercentageArr] = useState([]);

  const [gstPercentageVal, setGstPercentageVal] = useState([]);

  const [gstCalculationVal, setGstCalculationVal] = useState({});

  const [invoiceDate, setInvoiceDate] = useState(getFormattedDate(new Date()));

  const [poDate, setPoDate] = useState("");

  const [challanNumber, setChallanNumber] = useState("");

  const [challanDate, setChallanDate] = useState("");

  const [paymentTerm, setPaymentTerm] = useState([
    "15 Days",
    "30 Days",
    "45 Days",
    "60 Days",
    "90 Days",
    "50% Advance",
    "100% Advance",
    "As Per Remarks",
  ]);

  const [dueDate, setDueDate] = useState("");

  const [transportModes, setTransportModes] = useState([
    "By Road",
    "By Hand",
    "By Air",
  ]);

  const [paymentTermVal, setPaymentTermVal] = useState("15 Days");

  const [transportModeVal, setTransportModeVal] = useState("By Air");

  const [vehicleNumber, setVehicleNumber] = useState("");

  const [isSaved, setIsSaved] = useState(0);

  const [serviceCheck, setServiceCheck] = useState(false);

  const [gstRates, setGstRates] = useState([]);

  const [transportGstRate, setTransportGstRate] = useState(0);

  const [otherChargesGstRate, setOtherChargesGstRate] = useState(0);

  const [termsAndCondition, setTermsAndCondition] = useState("");

  const [invoiceMode, setInvoiceMode] = useState("Auto");

  const navigate = useNavigate();
  useEffect(() => {
    document.querySelector(".gstContainer").innerHTML = "";
    let tempGstPercentageArr = [];
    let tempGstPercentageVal = [];
    let tempGstCalculationVal = {};
    productUnits.map((prodUnit) => {
      if (prodUnit.productName == undefined || prodUnit.productName == null)
        return;

      let index = tempGstPercentageArr.indexOf(prodUnit.tax);
      if (index < 0) {
        tempGstPercentageArr = [...tempGstPercentageArr, roundNum(prodUnit.tax)];
        tempGstPercentageVal = [
          ...tempGstPercentageVal,
          roundNum((prodUnit.amount * prodUnit.tax) / 100),
        ];
        var tempTax = prodUnit.tax;
        tempGstCalculationVal[tempTax] = roundNum(prodUnit.amount);
      } else {
        tempGstPercentageVal[index] =
          tempGstPercentageVal[index] +
          roundNum((prodUnit.amount * prodUnit.tax) / 100);
        tempGstCalculationVal[prodUnit.tax] =
          tempGstCalculationVal[prodUnit.tax] + prodUnit.amount;
      }
    });

    console.log("before");
    console.log(tempGstPercentageArr);

    //adding transport charge to gst calsulation
    var tempTransportGstRate = roundNum(transportGstRate);
    let index = tempGstPercentageArr.indexOf(tempTransportGstRate);
    debugger;
    if (roundNum(tempTransportGstRate) > 0) {
      if (index >= 0) {
        tempGstPercentageVal[index] =
          tempGstPercentageVal[index] +
          roundNum(
            (roundNum(transportCharge) * roundNum(tempTransportGstRate)) / 100
          );
        tempGstCalculationVal[tempTransportGstRate] =
          tempGstCalculationVal[tempTransportGstRate] +
          roundNum(transportCharge);
      } else {
        tempGstPercentageArr = [...tempGstPercentageArr, roundNum(tempTransportGstRate)];
        tempGstPercentageVal = [
          ...tempGstPercentageVal,
          roundNum(
            (roundNum(transportCharge) * roundNum(tempTransportGstRate)) / 100
          ),
        ];
        tempGstCalculationVal[tempTransportGstRate] = roundNum(transportCharge);
      }
    }

    //adding other charge to gst
    var tempOtherChargesGstRate = roundNum(otherChargesGstRate);
    index = tempGstPercentageArr.indexOf(tempOtherChargesGstRate);
    if (roundNum(tempOtherChargesGstRate) > 0) {
      if (index >= 0) {
        tempGstPercentageVal[index] =
          tempGstPercentageVal[index] +
          roundNum(
            (roundNum(otherCharge) * roundNum(tempOtherChargesGstRate)) / 100
          );
        tempGstCalculationVal[tempOtherChargesGstRate] =
          tempGstCalculationVal[tempOtherChargesGstRate] +
          roundNum(otherCharge);
      } else {
        tempGstPercentageArr = [
          ...tempGstPercentageArr,
         roundNum(tempOtherChargesGstRate),
        ];
        tempGstPercentageVal = [
          ...tempGstPercentageVal,
          roundNum(
            (roundNum(otherCharge) * roundNum(tempOtherChargesGstRate)) / 100
          ),
        ];
        tempGstCalculationVal[tempOtherChargesGstRate] = roundNum(otherCharge);
      }
    }
    console.log("after");
    console.log(tempGstPercentageArr);

    let tempTotalDiscount =
      parseFloat(roundNum(discountInRuppes)) +
      (totalAmt * parseFloat(roundNum(discountInPercentage))) / 100;

    if (invoiceType != process.env.REACT_APP_CASH_SALE_INVOICE) {
      manageDiscount(
        tempGstPercentageArr,
        tempGstPercentageVal,
        tempGstCalculationVal,
        tempTotalDiscount
      );
      setGstPercentageArr(tempGstPercentageArr);
      setGstPercentageVal(tempGstPercentageVal);
      setGstCalculationVal(tempGstCalculationVal);
    }

    console.log(tempGstCalculationVal);

    setTotalDiscount(tempTotalDiscount);
    let tempTotalTaxableAmt =
      parseFloat(roundNum(totalAmt)) +
      parseFloat(roundNum(transportCharge)) +
      parseFloat(roundNum(otherCharge) - tempTotalDiscount);
    setTotalTaxableAmt(tempTotalTaxableAmt);
  }, [totalAmt]);

  useEffect(() => {
    document.querySelector(".gstContainer").innerHTML = "";
    //change here based on invoicetype

    if (invoiceType == process.env.REACT_APP_CASH_SALE_INVOICE) return;
    
    if (
      clientState &&
      state &&
      clientState.toLowerCase() == state.toLowerCase()
    ) {
      gstPercentageArr.map((elem) => {
        let index = gstPercentageArr.indexOf(elem);

        let divElem = document.createElement("div");
        divElem.className = "invoice-total-footer";
        let h4Elem = document.createElement("h4");
        let aElem = document.createElement("a");

        h4Elem.style =
          "font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between";

        aElem.style = "color:grey;display:flex;flex-direction:column";

        let textElem = document.createTextNode(
          "SGST " + parseFloat(elem) / 2 + " %"
        );
        let spanElem = document.createElement("span");

        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);

        textElem = document.createTextNode(
          "(Amount: " +
            convertToAccountingStandard(gstCalculationVal[parseFloat(elem)]) +
            ")"
        );
        spanElem = document.createElement("span");

        spanElem.style = "text-transform:capitaize;font-size:18px";
        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);

        textElem = document.createTextNode(
          toCurrency(fromCurrency(gstPercentageVal[index] + "") / 2).replace(
            /[\$]/g,
            ""
          )
        );

        spanElem = document.createElement("span");
        spanElem.appendChild(textElem);

        spanElem.style = "color:grey";

        h4Elem.appendChild(aElem);

        h4Elem.appendChild(spanElem);

        divElem.appendChild(h4Elem);

        document.querySelector(".gstContainer").append(divElem);

        divElem = document.createElement("div");
        divElem.className = "invoice-total-footer";
        h4Elem = document.createElement("h4");
        aElem = document.createElement("a");

        h4Elem.style =
          "font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between";

        aElem.style = "color:grey;display:flex;flex-direction:column";

        textElem = document.createTextNode(
          "CGST " + parseFloat(elem) / 2 + " %"
        );
        spanElem = document.createElement("span");

        spanElem.appendChild(textElem);

        aElem.appendChild(spanElem);

        textElem = document.createTextNode(
          "(Amount: " +
            convertToAccountingStandard(gstCalculationVal[parseFloat(elem)]) +
            ")"
        );
        spanElem = document.createElement("span");

        spanElem.style = "text-transform:capitaize;font-size:18px";
        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);

        spanElem = document.createElement("span");

        textElem = document.createTextNode(
          toCurrency(fromCurrency(gstPercentageVal[index] + "") / 2).replace(
            /[\$]/g,
            ""
          )
        );

        spanElem.appendChild(textElem);

        spanElem.style = "color:grey";

        h4Elem.appendChild(aElem);

        h4Elem.appendChild(spanElem);

        divElem.appendChild(h4Elem);

        document.querySelector(".gstContainer").append(divElem);
      });
    } else {
      gstPercentageArr.map((elem) => {
        let index = gstPercentageArr.indexOf(elem);

        let divElem = document.createElement("div");
        divElem.className = "invoice-total-footer";
        let h4Elem = document.createElement("h4");
        let aElem = document.createElement("a");

        h4Elem.style =
          "font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between";

        aElem.style = "color:grey;display:flex;flex-direction:column";

        let textElem = document.createTextNode(
          "IGST " + parseFloat(elem) + " %"
        );
        let spanElem = document.createElement("span");

        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);

        textElem = document.createTextNode(
          "(Amount: " +
            convertToAccountingStandard(gstCalculationVal[parseFloat(elem)]) +
            ")"
        );
        spanElem = document.createElement("span");

        spanElem.style = "text-transform:capitaize;font-size:18px";
        spanElem.appendChild(textElem);
        aElem.appendChild(spanElem);

        textElem = document.createTextNode(
          toCurrency(fromCurrency(gstPercentageVal[index] + "")).replace(
            /[\$]/g,
            ""
          )
        );

        spanElem = document.createElement("span");
        spanElem.appendChild(textElem);

        spanElem.style = "color:grey";

        h4Elem.appendChild(aElem);

        h4Elem.appendChild(spanElem);

        divElem.appendChild(h4Elem);

        document.querySelector(".gstContainer").append(divElem);

        //  divElem=document.createElement("div");
        // divElem.className="invoice-total-footer";
        //  h4Elem=document.createElement("h4");
        //  aElem=document.createElement("a");

        // h4Elem.style="font-family:Times New Roman, Times, serif;display:flex;justify-content:space-between"

        // aElem.style="color:grey;display:flex;flex-direction:column";

        //  textElem=document.createTextNode("CGST "+(parseFloat(elem)/2)+" %");
        //   spanElem=document.createElement("span")

        //   spanElem.appendChild(textElem)

        //  aElem.appendChild(spanElem);

        //  textElem=document.createTextNode("(Amount: "+convertToAccountingStandard(gstCalculationVal[parseFloat(elem)])+")")
        //  spanElem=document.createElement("span")

        //  spanElem.style='text-transform:capitaize;font-size:18px'
        //  spanElem.appendChild(textElem)
        //  aElem.appendChild(spanElem);

        // spanElem=document.createElement("span");

        //  textElem=document.createTextNode(toCurrency(fromCurrency(gstPercentageVal[index]+"")/2).replace(/[\$]/g,''));

        //  spanElem.appendChild(textElem);

        //  spanElem.style='color:grey'

        // h4Elem.appendChild(aElem);

        // h4Elem.appendChild(spanElem)

        // divElem.appendChild(h4Elem);

        // document.querySelector(".gstContainer").append(divElem);
      });
    }
  }, [gstPercentageArr, gstPercentageVal]);

  useEffect(() => {
    let totalGstVal = 0;

    gstPercentageVal.map((elem) => {
      totalGstVal = roundNum(
        roundNum(parseFloat(totalGstVal)) + roundNum(parseFloat(elem))
      );
    });

    setFinalAmt(roundNum(parseFloat(totalTaxableAmt) + totalGstVal));
  }, [totalTaxableAmt, gstPercentageVal]);

  useEffect(() => {
    document.querySelector(".gstContainer").innerHTML = "";
    let tempGstPercentageArr = [];
    let tempGstPercentageVal = [];
    let tempGstCalculationVal = {};
    productUnits.map((prodUnit) => {
      if (prodUnit.productName == undefined || prodUnit.productName == null)
        return;

      let index = tempGstPercentageArr.indexOf(prodUnit.tax);
      if (index < 0) {
        tempGstPercentageArr = [...tempGstPercentageArr, roundNum(prodUnit.tax)];
        tempGstPercentageVal = [
          ...tempGstPercentageVal,
          roundNum((prodUnit.amount * prodUnit.tax) / 100),
        ];
        var tempTax = prodUnit.tax;
        tempGstCalculationVal[tempTax] = roundNum(prodUnit.amount);
      } else {
        tempGstPercentageVal[index] =
          tempGstPercentageVal[index] +
          roundNum((prodUnit.amount * prodUnit.tax) / 100);
        tempGstCalculationVal[prodUnit.tax] =
          tempGstCalculationVal[prodUnit.tax] + prodUnit.amount;
      }
    });
    console.log("before");
    console.log(tempGstPercentageArr);
    //adding transport charge to gst calsulation
    var tempTransportGstRate = roundNum(transportGstRate);
    let index = tempGstPercentageArr.indexOf(tempTransportGstRate);
    if (roundNum(transportCharge) > 0 && roundNum(transportGstRate) > 0) {
      if (index >= 0) {
        tempGstPercentageVal[index] =
          tempGstPercentageVal[index] +
          roundNum(
            (roundNum(transportCharge) * roundNum(tempTransportGstRate)) / 100
          );
        tempGstCalculationVal[tempTransportGstRate] =
          tempGstCalculationVal[tempTransportGstRate] +
          roundNum(transportCharge);
      } else {
        tempGstPercentageArr = [...tempGstPercentageArr, roundNum(tempTransportGstRate)];
        tempGstPercentageVal = [
          ...tempGstPercentageVal,
          roundNum(
            (roundNum(transportCharge) * roundNum(tempTransportGstRate)) / 100
          ),
        ];
        tempGstCalculationVal[tempTransportGstRate] = roundNum(transportCharge);
      }
    }

    //adding other charge to gst
    var tempOtherChargesGstRate = roundNum(otherChargesGstRate);
    index = tempGstPercentageArr.indexOf(tempOtherChargesGstRate);
    if (roundNum(otherCharge) > 0 && roundNum(otherChargesGstRate) > 0) {
      if (index >= 0) {
        tempGstPercentageVal[index] =
          tempGstPercentageVal[index] +
          roundNum(
            (roundNum(otherCharge) * roundNum(tempOtherChargesGstRate)) / 100
          );
        tempGstCalculationVal[tempOtherChargesGstRate] =
          tempGstCalculationVal[tempOtherChargesGstRate] +
          roundNum(otherCharge);
      } else {
        tempGstPercentageArr = [
          ...tempGstPercentageArr,
          roundNum(tempOtherChargesGstRate),
        ];
        tempGstPercentageVal = [
          ...tempGstPercentageVal,
          roundNum(
            (roundNum(otherCharge) * roundNum(tempOtherChargesGstRate)) / 100
          ),
        ];
        tempGstCalculationVal[tempOtherChargesGstRate] = roundNum(otherCharge);
      }
    }

    console.log("after");
    console.log(tempGstPercentageArr);

    if (invoiceType != process.env.REACT_APP_CASH_SALE_INVOICE) {
      manageDiscount(
        tempGstPercentageArr,
        tempGstPercentageVal,
        tempGstCalculationVal,
        totalDiscount
      );

      setGstPercentageArr(tempGstPercentageArr);
      setGstPercentageVal(tempGstPercentageVal);
      setGstCalculationVal(tempGstCalculationVal);
    }

    let tempTotalTaxableAmt =
      parseFloat(roundNum(totalAmt)) +
      parseFloat(roundNum(transportCharge)) +
      parseFloat(roundNum(otherCharge) - totalDiscount);

    setTotalTaxableAmt(tempTotalTaxableAmt);
  }, [
    transportGstRate,
    otherChargesGstRate,
    transportCharge,
    otherCharge,
    totalDiscount,
  ]);

  useEffect(() => {
    setTotalDiscount(
      parseFloat(roundNum(discountInRuppes)) +
        (totalAmt * parseFloat(roundNum(discountInPercentage))) / 100
    );
  }, [discountInPercentage, discountInRuppes]);

  function manageDiscount(
    tempPercentageArr,
    tempPercentageVal,
    tempCalculation,
    discount
  ) {
    let sortable = [];

    for (var calculation in tempCalculation) {
      sortable.push([calculation, tempCalculation[calculation]]);
    }

    sortable.sort(function (a, b) {
      return (a[1] - b[1]) * -1;
    });

    // console.log(sortable);

    sortable.map((arr, k) => {
      // console.log(arr);
      if (discount > 0) {
        if (arr[1] > discount) {
          let index = tempPercentageArr.indexOf(parseFloat(arr[0]));
          // console.log("index:"+index);
          // tempPercentageVal[index]=tempPercentageVal[index]-discount;

          let tempDis = discount - tempCalculation[parseFloat(arr[0])];
          tempCalculation[parseFloat(arr[0])] =
            tempCalculation[parseFloat(arr[0])] - discount;

          discount = tempDis;
          // console.log(tempPercentageArr);

          // console.log(tempPercentageVal);

          // console.log(tempCalculation);
        } else {
          console.log("executed");
          discount = discount - arr[1];
          let index = tempPercentageArr.indexOf(parseFloat(arr[0]));
          tempPercentageArr.splice(index, 1);
          tempPercentageVal.splice(index, 1);
          delete tempCalculation[parseFloat(arr[0])];
        }
      }
    });

    Object.keys(tempCalculation).forEach((a) => {
      let key = parseFloat(a);

      let val = tempCalculation[key];
      let index = tempPercentageArr.indexOf(key);

      tempPercentageVal[index] = (val * key) / 100;
    });
  }

  function updateSelectOptions() {
    const selectElement = document.getElementById("poNumbers");
    selectElement.innerHTML = ""; // Clear existing options
    const defaultOption = document.createElement("option");
    defaultOption.value = "-1";
    defaultOption.textContent = "--Select PO--";
    selectElement.appendChild(defaultOption);

    var url = new URL(window.location.href);
    let invNoEdit = url.searchParams.get("InvNo");
    let actionedit = url.searchParams.get("action");

    if (actionedit == "Edit" || actionedit == "Clone") {
      poNumbers.forEach((val) => {
        const option = document.createElement("option");
        option.value = val.poId;
        option.textContent = val.poNumber;

        if (poNumber == val.poNumber) {
          option.selected = true;
        }

        selectElement.appendChild(option);
      });
    } else {
      poNumbers.forEach((val) => {
        const option = document.createElement("option");
        option.value = val.poId;
        option.textContent = val.poNumber;

        if (poNumber == val.poNumber) {
          option.selected = true;
        }

        selectElement.appendChild(option);
      });
    }
  }

  function applySelect2() {
    const selectElement = document.getElementById("poNumbers");

    // Initialize Select2 plugin
    $(selectElement).select2();

    $(selectElement).on("change", (event) => {
      onPoNumberChange(event);
    });

    var event = new Event("change");

    // Dispatch it.
    selectElement.dispatchEvent(event);
  }

  const onTransportChargeChange = (e) => {
    setTransportCharge(e.target.value);
  };

  const onOtherChargeChange = (e) => {
    setOtherCharge(fromCurrency(e.target.value));
    // document.getElementById("otherCharge").value=toCurrency(e.target.value).replace(/[\$]/g,'');
  };

  const onDiscountInPercentageChange = (e) => {
    setDiscountInPercentage(e.target.value);
  };

  const onDiscountInRuppesChange = (e) => {
    setDiscountInRupees(e.target.value);
  };

  const onTermsAndConditionChange = (e) => {
    setTermsAndCondition(e.target.value);
  };

  const onDescriptionChange = (e) => {
    var tr = e.target.parentElement.parentElement;
    var productTrNo = tr.querySelector("#productId").value;

    let quantity = tr.querySelector("#description").value;
    let tempProdUnits = [...productUnits];
    tempProdUnits.map((prodUnit) => {
      if (
        prodUnit.id == productTrNo &&
        prodUnit.productName != null &&
        prodUnit.productName != ""
      ) {
        prodUnit.description = e.target.value;
      }
    });

    setProductUnits(tempProdUnits);
  };

  function getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if (today.getMonth() + 1 <= 3) {
      fiscalyear =
        today.getFullYear() -
        1 +
        "-" +
        today.getFullYear().toString().substr(2);
    } else {
      fiscalyear =
        today.getFullYear() +
        "-" +
        (today.getFullYear() + 1).toString().substr(2);
    }
    return fiscalyear;
  }

  const saveInvoice = (e) => {
    e.preventDefault();

    e.target.style.pointerEvents = "none"; // Disable pointer events
    e.target.style.opacity = "0.5";

    var token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_LOCAL_URL}/clientValidity`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        
        if (res.data == true) {
          onValid(e);
        } else {
          e.target.style.pointerEvents = ""; // Re-enable pointer events
          e.target.style.opacity = "";
          Swal.fire("", "Your Subcription has expired.", "error");
        }
      });
  };

  const onValid = (e) => {
    let totalSgst = 0;
    let totalCgst = 0;

    let totalIgst = 0;

    gstPercentageVal.map((elem) => {
      if (
        clientState &&
        state &&
        clientState.toLowerCase() == state.toLowerCase()
      ) {
        totalSgst = roundNum(totalSgst + roundNum(parseFloat(elem) / 2));
        totalCgst = roundNum(totalCgst + roundNum(parseFloat(elem) / 2));
      } else {
        totalIgst = roundNum(totalIgst + roundNum(parseFloat(elem)));
      }
    });

    // let tempPoNumber=$("#poNumbers option:selected").text();

    let invoiceData = {
      invoiceProducts: productUnits,
      invoiceNo: invoiceNumber,
      invoiceId: invoiceId,
      sgstValue: totalSgst,
      cgstValue: totalCgst,
      igstValue: totalIgst,
      taxableValue: totalTaxableAmt,
      invoiceValue: finalAmt,
      transportCharges: transportCharge,
      additionalCharges: otherCharge,
      discount: discountInRuppes,
      otherDiscount: roundNum((totalAmt * discountInPercentage) / 100),
      shippingAddress: shippingAddress1 + shippingAddress2,
      billingAddress: fromAddr1 + fromAddr2,
      poNumber: poNumber,
      customerName: document.querySelector("#customer option:checked")
        .innerText,
      invoiceDate: invoiceDate,
      poDate: poDate,
      challanNumber: challanNumber,
      challanDate: challanDate,
      paymentTerms: paymentTermVal,
      dueDate: dueDate,
      transportMode: transportModeVal,
      vehicleNumber: vehicleNumber,
      remarks: remarks,
      state: state,
      gstNo: gstNo,
      shippingGstNo: shippingGstNo,
      serviceCheck: serviceCheck,
      shippingState: shippingState,
      termsAndCondition: termsAndCondition,
      transportGstRate: transportGstRate,
      otherChargesGstRate: otherChargesGstRate,
      financialYear: document.querySelector("#financialYear").value,
    };

    console.log(invoiceData);

    var token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_LOCAL_URL}/${
          invoiceType == process.env.REACT_APP_CASH_SALE_INVOICE
            ? "saveCashInvoice"
            : invoiceType == process.env.REACT_APP_PROFORMA_INVOICE
            ? "saveProformaInvoice"
            : "saveMaterialOutward"
        }`,
        invoiceData,
        {
          //save invoice //change
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response != null && response.data.res == "success") {
          // setAlertMsg("Invoice created successfully!!")

          Swal.fire(
            "",
            "Material Outward created successfully!", //change
            "success"
          );

          setIsSaved(1);

          const date = new Date(); // 2009-11-10
          const month = date.toLocaleString("default", { month: "long" });

          setTimeout(() => {
            setAlertMsg(null);

            window.location.href =
              "/MaterialOutwardList?month=" +
              month +
              "&" +
              process.env.REACT_APP_INVOICE_TYPE +
              "=" +
              invoiceType; //change
          }, 2000);

          setTimeout(() => {
            window.location.href =
              "/MaterialOutwardList?month=" +
              month +
              "&" +
              process.env.REACT_APP_INVOICE_TYPE +
              "=" +
              invoiceType; //change
          }, 1000);
        } else {
          e.target.style.pointerEvents = ""; // Re-enable pointer events
          e.target.style.opacity = "";
          alert(
            "There is some issue in creating Material Outward. kindly check whether all the data is entered or not."
          ); //change
        }
      })
      .catch(function (error) {
        e.target.style.pointerEvents = ""; // Re-enable pointer events
        e.target.style.opacity = "";
        console.log(error);
      });
  };

  const onPrintValid = (e) => {
    let totalSgst = 0;
    let totalCgst = 0;
    let totalIgst = 0;

    gstPercentageVal.map((elem) => {
      if ((clientState = state)) {
        totalSgst = roundNum(totalSgst + roundNum(parseFloat(elem) / 2));
        totalCgst = roundNum(totalCgst + roundNum(parseFloat(elem) / 2));
      } else {
        totalIgst = roundNum(totalIgst + roundNum(parseFloat(elem)));
      }
    });

    // let tempPoNumber=$("#poNumbers option:selected").text();

    let invoiceData = {
      invoiceProducts: productUnits,
      invoiceNo: invoiceNumber,
      invoiceId: invoiceId,
      sgstValue: totalSgst,
      cgstValue: totalCgst,
      igstValue: totalIgst,
      taxableValue: totalTaxableAmt,
      invoiceValue: finalAmt,
      transportCharges: transportCharge,
      additionalCharges: otherCharge,
      discount: discountInRuppes,
      otherDiscount: roundNum((totalAmt * discountInPercentage) / 100),
      shippingAddress: shippingAddress1 + shippingAddress2,
      billingAddress: fromAddr1 + fromAddr2,
      poNumber: poNumber,
      customerName: document.querySelector("#customer option:checked")
        .innerText,
      invoiceDate: invoiceDate,
      poDate: poDate,
      challanNumber: challanNumber,
      challanDate: challanDate,
      paymentTerms: paymentTermVal,
      dueDate: dueDate,
      transportMode: transportModeVal,
      vehicleNumber: vehicleNumber,
      remarks: remarks,
      state: state,
      gstNo: gstNo,
      shippingGstNo: shippingGstNo,
      serviceCheck: serviceCheck,
      shippingState: shippingState,
      termsAndCondition: termsAndCondition,
      transportGstRate: transportGstRate,
      otherChargesGstRate: otherChargesGstRate,
      financialYear: document.querySelector("#financialYear").value,
    };

    console.log(invoiceData);

    var token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_LOCAL_URL}/${
          invoiceType == process.env.REACT_APP_CASH_SALE_INVOICE
            ? "saveCashInvoice"
            : invoiceType == process.env.REACT_APP_PROFORMA_INVOICE
            ? "saveProformaInvoice"
            : "saveMaterialOutward"
        }`,
        invoiceData,
        {
          //save invoice //change
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response != null && response.data.res == "success") {
          // setAlertMsg("Invoice created successfully!!")

          Swal.fire(
            "",
            "Material Outward created successfully!", //change
            "success"
          );

          const date = new Date(); // 2009-11-10
          const month = date.toLocaleString("default", { month: "long" });

          let module = "MaterialOutward";
          axios
            .post(
              `${process.env.REACT_APP_LOCAL_URL}/invoiceidbyno`,
              { invoiceNumber, module },
              {
                //save invoice //change
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              
              setAlertMsg(null);

              window.location.href = "/viewMaterialOutward?invNo=" + res.data; //change
            });
          setIsSaved(1);
        } else {
          e.target.style.pointerEvents = ""; // Re-enable pointer events
          e.target.style.opacity = "";
          // alert("There is some issue in creating invoice. kindly check whether all the data is entered or not.")
          Swal.fire(
            "",
            "There is some issue in creating Material Outward.", //change
            "error"
          );
        }
      })
      .catch(function (error) {
        e.target.style.pointerEvents = ""; // Re-enable pointer events
        e.target.style.opacity = "";
        Swal.fire(
          "",
          "There is some issue in creating Material Outward.", //change
          "error"
        );
      });
  };

  const onInvoiceDateChange = (e) => {
    var inDateArr = e.target.value.split("/");
    var inDate = new Date(inDateArr[2], inDateArr[1] - 1, inDateArr[0]);
    console.log(inDate);
    inDate = inDate.addDays(parseInt(paymentTermVal.split(" ")[0]));
    console.log(inDate);
    inDate = getFormattedDate(inDate);

    document.getElementById("dueDate").value = inDate;
    setDueDate(inDate);

    setInvoiceDate(e.target.value);
  };

  const onInvoiceDateChangeForCopyProduct = (date) => {
    var inDateArr = date.split("/");
    var inDate = new Date(inDateArr[2], inDateArr[1] - 1, inDateArr[0]);
    console.log(inDate);
    inDate = inDate.addDays(parseInt(paymentTermVal.split(" ")[0]));
    console.log(inDate);
    inDate = getFormattedDate(inDate);

    document.getElementById("dueDate").value = inDate;
    setDueDate(inDate);

    setInvoiceDate(date);
  };

  function onInvoiceNumberChange(e) {
    var invoiceNo = e.target.value;
    setInvoiceNumber(invoiceNo);
  }

  const onPoDateChange = (e) => {
    setPoDate(e.target.value);
  };

  const onChallanDateChange = (e) => {
    setChallanDate(e.target.value);
  };

  const onDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const onChallanNumberChange = (e) => {
    setChallanNumber(e.target.value);
  };

  const onServiceCheckChange = (e) => {
    console.log("printing");
    console.log(document.getElementById("chkYes").checked);
    setServiceCheck(
      document.getElementById("chkYes").checked == true ? false : true
    );
  };

  const onPaymentTermsChange = (e) => {
    if (
      invoiceDate != null &&
      invoiceDate != undefined &&
      invoiceDate != "" &&
      invoiceDate.length > 0
    ) {
      var inDateArr = invoiceDate.split("/");
      var inDate = new Date(inDateArr[2], inDateArr[1] - 1, inDateArr[0]);
      console.log(inDate);
      inDate = inDate.addDays(parseInt(e.target.value.split(" ")[0]));
      console.log(inDate);
      inDate = getFormattedDate(inDate);

      document.getElementById("dueDate").value = inDate;
      setDueDate(inDate);
    }
    setPaymentTermVal(e.target.value);
  };

  const onTransportModeChange = (e) => {
    setTransportModeVal(e.target.value);
  };

  const onVehicleNumberChange = (e) => {
    setVehicleNumber(e.target.value);
  };

  const onTransportGstChange = (e) => {
    // alert(e.target.value)
    setTransportGstRate(e.target.value);
  };

  const onOtherChargeGstChange = (e) => {
    setOtherChargesGstRate(e.target.value);
  };

  const printButtonClicked = (e) => {
    e.target.style.pointerEvents = "none"; // Disable pointer events
    e.target.style.opacity = "0.5";
    if (isSaved == 1) {
      let module = "MaterialOutward";
      axios
        .post(
          `${process.env.REACT_APP_LOCAL_URL}/invoiceidbyno`,
          { invoiceNumber, module },
          {
            //save invoice //change
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          alert(res.data);
          window.location.href = "/viewMaterialOutward?invNo=" + res.data; //change
        })
        .catch(() => {
          e.target.style.pointerEvents = ""; // Disable pointer events
          e.target.style.opacity = "";
        });

      return;
    }

    let totalSgst = 0;
    let totalCgst = 0;

    let totalIgst = 0;

    gstPercentageVal.map((elem) => {
      if ((clientState = state)) {
        totalSgst = roundNum(totalSgst + roundNum(parseFloat(elem) / 2));
        totalCgst = roundNum(totalCgst + roundNum(parseFloat(elem) / 2));
      } else {
        totalIgst = roundNum(totalIgst + roundNum(parseFloat(elem)));
      }
    });

    // let tempPoNumber=$("#poNumbers option:selected").text();

    let invoiceData = {
      invoiceProducts: productUnits,
      invoiceNo: invoiceNumber,
      invoiceId: invoiceId,
      sgstValue: totalSgst,
      cgstValue: totalCgst,
      igstValue: totalIgst,
      taxableValue: totalTaxableAmt,
      invoiceValue: finalAmt,
      transportCharges: transportCharge,
      additionalCharges: otherCharge,
      discount: discountInRuppes,
      otherDiscount: roundNum((totalAmt * discountInPercentage) / 100),
      shippingAddress: shippingAddress1 + shippingAddress2,
      billingAddress: fromAddr1 + fromAddr2,
      poNumber: poNumber,
      customerName: document.querySelector("#customer option:checked")
        .innerText,
      invoiceDate: invoiceDate,
      poDate: poDate,
      challanNumber: challanNumber,
      challanDate: challanDate,
      paymentTerms: paymentTermVal,
      dueDate: dueDate,
      transportMode: transportModeVal,
      vehicleNumber: vehicleNumber,
      remarks: remarks,
      state: state,
      gstNo: gstNo,
      shippingGstNo: shippingGstNo,
      serviceCheck: serviceCheck,
      shippingState: shippingState,
      termsAndCondition: termsAndCondition,
      transportGstRate: transportGstRate,
      otherChargesGstRate: otherChargesGstRate,
      financialYear: document.querySelector("#financialYear").value,
    };

    console.log(invoiceData);

    var token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_LOCAL_URL}/clientValidity`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        
        if (res.data == true) {
          onPrintValid(e);
        } else {
          e.target.style.pointerEvents = ""; // Re-enable pointer events
          e.target.style.opacity = "";
          Swal.fire("", "Your Subcription has expired.", "error");
        }
      });

    //change
  };

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return day + "/" + month + "/" + year;
  }

  // start code for edit invoice

  function onCopyInvoiceAddInvoiceDetails() {
    if (editref.current) {
      
      var url = new URL(window.location.href);
      let invNoEdit = url.searchParams.get("InvNo");
      let actionedit = url.searchParams.get("action");

      var token = localStorage.getItem("token");
      if (actionedit == "Edit" || actionedit == "Clone") {
        document.querySelector("#prodtable").innerHTML = "";

        axios
          .get(
            `${process.env.REACT_APP_LOCAL_URL}/${
              invoiceType == process.env.REACT_APP_CASH_SALE_INVOICE
                ? "viewCashInvoice"
                : invoiceType == process.env.REACT_APP_PROFORMA_INVOICE
                ? "viewProformaInvoice"
                : "viewMaterialOutward"
            }?invId=${invNoEdit}`,
            {
              //change
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            console.log("after got data" + res.data.invoiceNo);

            if (res.data.invoiceId != null && actionedit == "Edit")
              setInvoiceId(res.data.invoiceId);

            if (res.data.customerName != null) {
              const text = res.data.customerName;
              const $select = document.querySelector("#customer");
              const $options = Array.from($select.options);

              const optionToSelect = $options.find(
                (item) => item.text === text
              );
              $select.value = optionToSelect.value;
              //below code is used to dispatch change event on customer select box becuase i is not getting updated otherwise
              var event = new Event("change");

              // //          // Dispatch it.
              $select.dispatchEvent(event);

              // selectCustomerOnCopy($select.value,text)
            }

            if (res.data.invoiceNo != null && actionedit == "Edit")
              setInvoiceNumber(res.data.invoiceNo);

            if (res.data.poNumber != null) setPoNumber(res.data.poNumber);

            if (res.data.invoiceDate != null && actionedit == "Edit") {
              let finvdate = getFormattedDate(new Date(res.data.invoiceDate));
              onInvoiceDateChangeForCopyProduct(finvdate);
            } else if (res.data.invoiceDate != null) {
              let finvdate = getFormattedDate(new Date());
              onInvoiceDateChangeForCopyProduct(finvdate);
            }

            if (res.data.poDate != null) {
              let finvdate = getFormattedDate(new Date(res.data.poDate));
              setPoDate(finvdate);
            }

            if (res.data.billingAddress != null)
              setFromAddr1(res.data.billingAddress);

            if (res.data.shippingAddress != null)
              setShippingAddress1(res.data.shippingAddress);

            if (res.data.challanNo != null)
              setChallanNumber(res.data.challanNo);

            if (res.data.challanDate != null) {
              let finvdate = getFormattedDate(new Date(res.data.challanDate));
              setChallanDate(finvdate);
            }

            // if (res.data.transportMode != null) {
            //   const text = res.data.transportMode;
            //   const $select = document.querySelector("#transportModes");
            //   const $options = Array.from($select.options);
            //   const optionToSelect = $options.find(
            //     (item) => item.text === text
            //   );
            //   $select.value = optionToSelect.value;
            // }

            if (res.data.paymentTerms != null) {
              // let payterm = (res.data.paymentTerms).replace('-'," ");
              const text = res.data.paymentTerms;
              const $select = document.querySelector("#paymentTerm");
              const $options = Array.from($select.options);
              const optionToSelect = $options.find(
                (item) => item.text === text
              );
              $select.value = optionToSelect.value;
            }

            //no need to set due date here it will be done automatically
            //  if(res.data.dueDate != null){
            //   let finvdate = getFormattedDate(new Date(res.data.dueDate));
            //  setDueDate(finvdate);
            //  }

            if (res.data.vehicleNo != null)
              setVehicleNumber(res.data.vehicleNo);

            if (res.data.transportCharges != null) {
              var transportChargeTemp =
                document.querySelector("#transportCharge");
              transportChargeTemp.value = res.data.transportCharges;

              setTransportCharge(fromCurrency(res.data.transportCharges));
            }

            if (res.data.transportCharges != null) {
              var transportChargeTemp =
                document.querySelector("#transportCharge");
              transportChargeTemp.value = res.data.transportCharges;

              setTransportCharge(fromCurrency(res.data.transportCharges));
            }

            if (res.data.transportGst != null) {
              debugger;
              // var transportGstTemp =
              //   document.querySelector("#transportGstRate");
              // transportGstTemp.value = res.data.transportGst;


              const $select = document.querySelector("#transportGstRate");
              const $options = Array.from($select.options);
              const optionToSelect = $options.find(
                (item) =>
                  {
                        if(item.text === res.data.transportGst+'%') return true;


                  } 
              );
              if(optionToSelect){
              $select.value = optionToSelect.value;
              setTransportGstRate(fromCurrency(res.data.transportGst));
              }
              else{
                setTransportGstRate(fromCurrency('0'));
              }
            
            }

            if (res.data.additionalCharges != null) {
              document.querySelector("#otherCharge").value =
                res.data.additionalCharges;
              setOtherCharge(fromCurrency(res.data.additionalCharges));
              
            }

            if (res.data.additionalChargesGst != null) {

              
              const $select = document.querySelector("#additionalChargesGst");
              const $options = Array.from($select.options);
              const optionToSelect = $options.find(
                (item) =>
                  {
                        if(item.text === res.data.additionalChargesGst+'%') return true;


                  } 
              );
              if(optionToSelect){
              $select.value = optionToSelect.value;
              setOtherChargesGstRate(fromCurrency(res.data.additionalChargesGst));
              }
              else{
                setOtherChargesGstRate(fromCurrency('0'));
              }

              
            }

            if (res.data.discount != null) {
              document.querySelector("#otherDiscount").value =
                res.data.discount;
              setDiscountInRupees(res.data.discount);
            }

            if (res.data.otherDiscount != null) {
              document.querySelector("#discountInPercentage").value =
                res.data.otherDiscount;

              setDiscountInPercentage(res.data.otherDiscount);
            }

            //start prod set code
            // window.fetchProdList();
            var productUnitsTemp = [];

            res.data.invoiceProductDO &&
              res.data.invoiceProductDO.map((elem, index) => {
                debugger;
                console.log(
                  "product data " + elem.productName + ":index id :" + index
                );

                addProductForCopy(elem, index);

                setProdCount(index + 1);

                productUnitsTemp.push(elem);
              });

            prodSelectOnChangeForCopy(productUnitsTemp);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      editref.current = false;
    }
  }

  // End code of edit invoice

  return (
    <>
      <ToastContainer />
      <Theme />
      <Navbar />
      <Alert msg={alertMsg} />
      <div>
        <Sidebar />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header invoices-page-header">
              <div className="row align-items-center">
                <div className="col">
                  <ul className="breadcrumb invoices-breadcrumb">
                    <li className="breadcrumb-item invoices-breadcrumb-item">
                      <a href="invoices.html">
                        <i className="fa fa-chevron-left"></i> Back to Material Outward
                        List
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-auto d-none">
                  <div className="invoices-create-btn">
                    <a
                      className="invoices-preview-link"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#invoices_preview"
                    >
                      <i className="fa fa-eye"></i> Preview
                    </a>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#delete_invoices_details"
                      className="btn delete-invoice-btn"
                    >
                      Delete Material Outward
                    </a>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#save_invocies_details"
                      className="btn save-invoice-btn"
                    >
                      Save Draft
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card invoices-add-card">
                  <div className="card-body">
                    <form className="invoices-form">
                      <div className="invoices-main-form">
                      <div className="row">
                          <div className="col-xl-6 col-md-8 col-sm-12 col-12">
                            <p class="mg-b-10">Customer Name</p>
                            <select
                              class="form-control select2"
                              name="product"
                              id="customer"
                              style={{ width: "80%" }}
                            >
                              <option value="-1">Select Customer</option>
                            </select>

                            <button
                              class="btn btn-primary"
                              style={{ fontSize: "12px", marginTop: "5px" }}
                              onClick={handleClickOpenCustomer}
                            >
                              Create Customer
                            </button>

                            <div className="mt-4" style={{ height: "100%" }}>
                              <p
                                style={{
                                  fontSize: ".9375rem",
                                  color: " #1f1f1f",
                                  marginBottom: "0px",
                                }}
                              >
                                Billing Address{" "}
                              </p>
                              <div
                                className="w-100 invoice-details-box p-2"
                                style={{ height: "43%", marginTop: "2px" }}
                              >
                                <p
                                  id="fromAddress"
                                  className="invoice-details invoice-details-two"
                                >
                                  {fromAddr1} <br />
                                  {fromAddr2}
                                  <br />
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-1 col-md-10 col-sm-12 col-12">
                            <input type="hidden" />
                          </div>

                          <div className="col-xl-5 col-md-6 col-sm-12 col-12">
                            <h4 className="invoice-details-title">
                            Material Outward details
                            </h4>
                            <div className="invoice-details-box">
                              <div className="invoice-inner-head">
                                <span className="d-flex align-items-center justify-content-between">
                                Material Outward No.{" "}
                                  {invoiceMode == "Auto" ? (
                                    <a href="view-invoice.html">
                                      {invoiceNumber}
                                    </a>
                                  ) : (
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Material Outward Number"
                                      value={invoiceNumber}
                                      onChange={onInvoiceNumberChange}
                                      style={{
                                        border: "1px solid #9a55ff",
                                        width: "65%",
                                        padding: "10px",
                                        color: "#9a55ff",
                                      }}
                                    />
                                  )}
                                </span>
                                <br />
                                <span className="d-flex align-items-center justify-content-between">
                                Material Outward Date.{" "}
                                  <input
                                    className="form-control datetimepicker"
                                    type="text"
                                    placeholder="Select Date"
                                    value={invoiceDate}
                                    id="invoiceDate"
                                    style={{
                                      border: "1px solid #9a55ff",
                                      width: "65%",
                                      color: "#9a55ff",
                                    }}
                                  />
                                </span>
                              </div>
                              <div className="invoice-inner-footer">
                                <div className="row align-items-center">
                                  <div className="col-lg-6 col-md-6">
                                    {/* <div className="invoice-inner-date">
                                    <span>
                                      Date{" "}
                                      <input
                                        className="form-control datetimepicker"
                                        type="text"
                                        placeholder="15/02/2022"
                                      />
                                    </span>
                                  </div> */}
                                    <div className="invoice-inner-date">
                                      <div className="form-group">
                                        Po Number
                                        <input
                                          className="form-control"
                                          type="text"
                                          placeholder="Enter Reference Number"
                                          value={poNumber}
                                          onChange={onInputPONumChange}
                                          style={{
                                            border: "1px solid #9a55ff",
                                            width: "100%",
                                            padding: "10px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="invoice-inner-date invoice-inner-datepic">
                                      <div className="form-group">
                                        <label>PO Date</label>
                                        <br />
                                        <input
                                          className="form-control datetimepicker"
                                          type="text"
                                          placeholder="Select"
                                          value={poDate}
                                          id="poDate"
                                          style={{
                                            border: "1px solid #9a55ff",
                                            width: "100%",
                                            padding: "10px",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="invoice-item"
                        style={{
                          border: "1px solid #E5E5E5",
                          borderRadius: "10px",
                          width: "100%",
                          marginBottom: "15px",
                          background: "#FFFFFF",
                          overflowX: "hidden",
                        }}
                      >
                          <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 h-100 d-flex align-items-center">
                            <div
                              className="d-flex"
                              style={{
                                marginBottom: "0px",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              GST No. &nbsp;
                              <input
                                class="form-control"
                                type="text"
                                value={gstNo}
                                style={{
                                  border: "1px solid rgb(154, 85, 255)",
                                  width: "100%",
                                  padding: "10px",
                                }}
                              ></input>
                            </div>

                            <div
                              className="d-flex"
                              style={{
                                marginBottom: "0px",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              State&nbsp;
                              <input
                                class="form-control"
                                type="text"
                                value={state}
                                style={{
                                  border: "1px solid rgb(154, 85, 255)",
                                  width: "100%",
                                  padding: "10px",
                                }}
                              ></input>
                            </div>

                            <div
                              class="invoice-inner-date form-group  d-flex flex-column"
                              style={{
                                border: "none",
                                padding: "20px",
                                marginBottom: "0px",
                                width: "230px",
                              }}
                            >
                              <label>Payment Terms</label>
                              {/* <input value={paymentTerms} onChange={onPaymentTermsChange}  style = {{ border:"1px solid #9a55ff", width:"100%", padding:"10px"}} class="form-control" type="text" /> */}
                              <select
                                id="paymentTerm"
                                style={{ width: "100%" }}
                              >
                                {paymentTerm.map((val, key) => {
                                  return <option value={val}>{val}</option>;
                                })}
                              </select>
                            </div>

                            <div
                              style={{ padding: "10px", marginBottom: "0px" }}
                              class="invoice-inner-date invoice-inner-datepic form-group d-flex flex-column"
                            >
                              <label for="">Due Date</label>
                              <input
                                class="form-control datetimepicker"
                                style={{
                                  border: "1px solid #9a55ff",
                                  width: "100%",
                                  padding: "10px",
                                }}
                                id="dueDate"
                                type="text"
                                placeholder="Select"
                                readOnly="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                

                      <div className="invoice-add-table">
                        <h4>Item Details</h4>
                        <div className="table-responsive">
                          <table className="table table-striped table-nowrap  mb-0 no-footer add-table-items">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Product Description</th>
                                <th>HSN/SAC</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Rate</th>
                                <th>Discount</th>
                                <th>Amount</th>
                                <th>GST Rate</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody id="prodtable">
                              <tr className="add-row">
                                <td>
                                  {/* <select class="form-select selectpicker form-select-lg mb-1" aria-label=".form-select-lg example">
								<option selected>Open this select menu</option>
  								<option value="1">One</option>
  								<option value="2">Two</option>
  								<option value="3">Three</option>
							</select> */}
                                  <select
                                    class="prodListSelect prodListSelect1"
                                    name="state"
                                  >
                                    <option value="-1">--Select--</option>
                                  </select>
                                  <input
                                    id="productId"
                                    type="hidden"
                                    value={1}
                                  />
                                </td>
                                <td>
                                  <input
                                    id="description"
                                    type="text"
                                    className="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="hsnSac"
                                    type="text"
                                    className="form-control hsnSac1 alignEnd"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="quantity"
                                    type="text"
                                    className="form-control quantity1 alignEnd"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="unit"
                                    type="text"
                                    className="form-control quantity1"
                                    readonly="true"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="price"
                                    type="text"
                                    className="form-control price1 alignEnd"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="discount"
                                    type="text"
                                    className="form-control discount1 alignEnd"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="amount"
                                    type="text"
                                    className="form-control alignEnd"
                                    readonly="true"
                                  />
                                </td>
                                <td>
                                  <input
                                    id="tax"
                                    type="text"
                                    className="form-control alignEnd"
                                    readonly="true"
                                  />
                                </td>

                                <td className="add-remove text-end">
                                  <a
                                    href="javascript:void(0);"
                                    className="add-btns me-2"
                                  >
                                    <i className="fas fa-plus-circle"></i>
                                  </a>
                                  <a href="#" className="copy-btn me-2">
                                    <i
                                      className="fas fa-cart-plus"
                                      style={{ color: "navy" }}
                                      onClick={AddProductDetails}
                                    ></i>
                                  </a>
                                  <a
                                    href="javascript:void(0);"
                                    className="remove-btn"
                                  >
                                    <i className="fa fa-trash-alt"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-7 col-md-6">
                          <div
                            className="invoice-fields"
                            style={{ display: "none" }}
                          >
                            <h4 className="field-title">More Fields</h4>
                            <div className="field-box">
                              <p>Payment Details</p>
                              <a
                                className="btn btn-primary"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#bank_details"
                              >
                                <i className="fas fa-plus-circle me-2"></i>Add
                                Bank Details
                              </a>
                            </div>
                          </div>
                          <div className="invoice-faq">
                            <div
                              className="panel-group"
                              id="accordion"
                              role="tablist"
                              aria-multiselectable="true"
                            >
                              <div className="faq-tab">
                                <div className="panel panel-default">
                                  <div
                                    className="panel-heading"
                                    role="tab"
                                    id="headingThree"
                                  >
                                    <p className="panel-title">
                                      <a
                                        className="collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-parent="#accordion"
                                        href="#collapseThree"
                                        aria-expanded="true"
                                        aria-controls="collapseThree"
                                      >
                                        <i className="fas fa-plus-circle me-1"></i>{" "}
                                        Remarks
                                      </a>
                                    </p>
                                  </div>
                                  <div
                                    id="collapseThree"
                                    className="panel-collapse show"
                                    role="tabpanel"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordion"
                                  >
                                    <div className="panel-body">
                                      <textarea
                                        id="remark"
                                        className="form-control"
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="panel-group"
                              id="accordion1"
                              role="tablist"
                              aria-multiselectable="true"
                            >
                              <div className="faq-tab">
                                <div className="panel panel-default">
                                  <div
                                    className="panel-heading"
                                    role="tab"
                                    id="headingTwo"
                                  >
                                    <p className="panel-title">
                                      <a
                                        className="collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-parent="#accordion1"
                                        href="#collapseTwo"
                                        aria-expanded="true"
                                        aria-controls="collapseTwo"
                                      >
                                        <i className="fas fa-plus-circle me-1"></i>{" "}
                                        Payment Terms
                                      </a>
                                    </p>
                                  </div>
                                  <div
                                    id="collapseTwo"
                                    className="panel-collapse show"
                                    role="tabpanel"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordion1"
                                  >
                                    <div className="panel-body">
                                      <textarea
                                        onChange={onTermsAndConditionChange}
                                        id="termsAndCondition"
                                        className="form-control"
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* here */}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                          <div
                            class="invoice-total-card"
                            action="save_data.php"
                            method="post"
                          >
                            <h4 class="invoice-total-title" id="summary">
                              Summary
                            </h4>
                            <div class="invoice-total-box" id="GrossTotal">
                              <div class="invoice-total-inner">
                                {/* <a onchange="finalSum(),calculateDiscount(),calculateSGST12onvalue(),start();finalamount(),calculateSGST12(),calculateSGST18(),calculateSGST18onvalue(),calculateSGST28(),totalAmountWithTax(),calculateSGST28onvalue(),getNumberOFRowsInTable()"> */}
                                <h4
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {" "}
                                  Gross Total
                                  <span
                                    style={{ marginLeft: "10%" }}
                                    id="grossTotal"
                                    name="grossTotal"
                                  >
                                    {toCurrency(totalAmt).replace(/[\$]/g, "")}
                                  </span>
                                </h4>
                                <hr />
                                {/* <a onkeyup="finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateDiscount(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),calculateSGST18onvalue(),totalAmountWithTax(),getNumberOFRowsInTable()"> */}
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p style={{ marginBottom: "5px" }}>
                                    Transport charges
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyItems: "center",
                                    }}
                                  >
                                    <span style={{ display: "flex" }}>
                                      <input
                                        style={{
                                          width: "90px",
                                          height: "30px",
                                          border: "1px solid #9a55ff",
                                          borderRadius: "6px",
                                          marginRight: "5px",
                                          textAlign: "end",
                                        }}
                                        type="text"
                                        id="transportCharge"
                                        placeholder="0.00"
                                        // value={toCurrency(transportCharge).replace(/[\$]/g,'')}
                                        onChange={onTransportChargeChange}
                                      />
                                    </span>

                                    <span>
                                      <select
                                        style={{
                                          width: "50px",
                                          height: "30px",
                                          border: "1px solid #9a55ff",
                                          borderRadius: "6px",
                                          textAlign: "end",
                                        }}
                                        id="transportGstRate"
                                        onChange={onTransportGstChange}
                                      >
                                        {gstRates.map((elem) => {
                                          return (
                                            <option value={elem}>
                                              {elem}%
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </span>
                                  </div>
                                </p>
                                {/* <p style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                              <p style={{marginBottom:"5px"}}>Transport charge GST</p>
                                <span>
                                  <select  style={{
                                      width: "50px",
                                      textAlign:"end",
                                      border:'2px solid rgb(133,133,133)'
                                    }}
                                    onChange={onTransportGstChange}
                                    >
                                    {
                                      gstRates.map((elem)=>{
                                       return <option value={elem}>{elem}%</option>
                                      })
                                    }

                                  </select>
                                </span>
                              </p> */}
                                {/* <a onkeyup="finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),calculateSGST18onvalue(),totalAmountWithTax(),getNumberOFRowsInTable()"> */}
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: "5px",
                                      widht: "-webkit-fill-available",
                                    }}
                                  >
                                    Other charge
                                  </p>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyItems: "center",
                                    }}
                                  >
                                    <span>
                                      <input
                                        style={{
                                          width: "90px",
                                          height: "30px",
                                          border: "1px solid #9a55ff",
                                          borderRadius: "6px",
                                          marginRight: "5px",
                                          textAlign: "end",
                                        }}
                                        type="text"
                                        id="otherCharge"
                                        name="othercharges"
                                        placeholder="0.00"
                                        // value={toCurrency(otherCharge).replace(/[\$]/g,'')}
                                        onChange={onOtherChargeChange}
                                      />
                                    </span>

                                    <span>
                                      <select
                                        style={{
                                          width: "50px",
                                          height: "30px",
                                          border: "1px solid #9a55ff",
                                          borderRadius: "6px",
                                          textAlign: "end",
                                        }}
                                        id="additionalChargesGst"
                                        onChange={onOtherChargeGstChange}
                                      >
                                        {gstRates.map((elem) => {
                                          return (
                                            <option value={elem}>
                                              {elem}%
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </span>
                                  </div>
                                </p>{" "}
                                {/* <p style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                              <p style={{marginBottom:"5px"}}>Other charge GST</p>
                                <span>
                                  <select  style={{
                                      width: "50px",
                                      textAlign:"end",
                                      border:'2px solid rgb(133,133,133)'
                                    }}
                                    onChange={onOtherChargeGstChange}
                                    >
                                    {
                                      gstRates.map((elem)=>{
                                       return <option value={elem}>{elem}%</option>
                                      })
                                    }

                                  </select>
                                </span>
                              </p> */}
                                <hr />
                                {/* <a onkeyup="calculateDiscount(),finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),totalAmountWithTax(),calculateSGST18onvalue(),getNumberOFRowsInTable(),"> */}
                                <p>
                                  Discount in &#8377;
                                  <span>
                                    <input
                                      style={{
                                        width: "90px",
                                        height: "30px",
                                        border: "1px solid #9a55ff",
                                        borderRadius: "6px",
                                        textAlign: "end",
                                      }}
                                      type="text"
                                      id="otherDiscount"
                                      placeholder="0.00"
                                      // value={toCurrency(discountInRuppes).replace(/[\$]/g,'')}
                                      onChange={onDiscountInRuppesChange}
                                    />
                                  </span>
                                </p>
                                {/* <a onkeyup="calculateDiscount(),finalSum(),calculateSGST12(),calculateSGST12onvalue(),calculateSGST18(),calculateSGST28(),calculateSGST28onvalue(),totalAmountWithTax(),calculateSGST18onvalue(),getNumberOFRowsInTable(),TotalAmountTax()"> */}
                                <p>
                                  Discount in %
                                  <span>
                                    <input
                                      style={{
                                        width: "90px",
                                        height: "30px",
                                        border: "1px solid #9a55ff",
                                        borderRadius: "6px",
                                        textAlign: "end",
                                      }}
                                      type="text"
                                      id="discountInPercentage"
                                      placeholder="0.00"
                                      // value={discountInPercentage}
                                      onChange={onDiscountInPercentageChange}
                                    />
                                  </span>
                                </p>
                                <p>
                                  Total Discount in &#8377;
                                  <span id="finalDiscount">
                                    {toCurrency(
                                      fromCurrency(totalDiscount + "")
                                    ).replace(/[\$]/g, "")}
                                  </span>
                                </p>
                                {/* </p> */}
                                <div class="invoice-total-footer">
                                  <h4
                                    style={{
                                      fontFamily:
                                        "Times New Roman, Times, serif",
                                    }}
                                  >
                                    <a
                                      style={{ color: "grey" }}
                                      href="javascript:void(0);"
                                      onchange="updatemount(), calculateSGST12onvalue(),calculateSGST12(),calculateSGST18(),calculateSGST18onvalue(),calculateSGST28(),calculateSGST28onvalue(),totalAmountWithTax(),getNumberOFRowsInTable()"
                                    >
                                      Taxable Amount{" "}
                                      <span id="finalTotal">
                                        {toCurrency(
                                          fromCurrency(totalTaxableAmt + "")
                                        ).replace(/[\$]/g, "")}
                                      </span>
                                    </a>
                                  </h4>
                                </div>
                                <div className="gstContainer">
                                  <div class="invoice-total-footer" id="cgst18">
                                    <h4
                                      style={{
                                        fontFamily:
                                          "Times New Roman, Times, serif",
                                      }}
                                    >
                                      <a style={{ color: "grey" }}>
                                        CGST 9%<span id="cgstAmount181"></span>
                                      </a>
                                    </h4>
                                    <span id="cgstAmount18"></span>
                                  </div>

                                  <div class="invoice-total-footer" id="sgst18">
                                    <h4
                                      style={{
                                        fontFamily:
                                          "Times New Roman, Times, serif",
                                      }}
                                    >
                                      <a style={{ color: "grey" }}>
                                        SGST 9%<span id="sgstAmount181"></span>
                                      </a>
                                    </h4>
                                    <span id="sgstAmount18"></span>
                                  </div>

                                  <div class="invoice-total-footer" id="sgst18">
                                    <h4
                                      style={{
                                        fontFamily:
                                          "Times New Roman, Times, serif",
                                      }}
                                    >
                                      <a style={{ color: "grey" }}>
                                        SGST 18%<span id="sgstAmount181"></span>
                                      </a>
                                    </h4>
                                    <span id="sgstAmount18"></span>
                                  </div>
                                </div>
                                <div class="invoice-total-footer">
                                  <h4>
                                    Total Amount{" "}
                                    <span id="totalAmount">
                                      {toCurrency(
                                        fromCurrency(finalAmt + "")
                                      ).replace(/[\$]/g, "")}
                                    </span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="invoice-total-card">
                          <h4 className="invoice-total-title">Summary</h4>
                          <div className="invoice-total-box">
                            <div className="invoice-total-inner">
                              <p>
                                Taxable Amount <span>{totalAmt}</span>
                              </p>
                              <p>
                                Round Off
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggles"
                                >
                                  checkbox
                                </label>
                                <span>$54</span>
                              </p>
                              <div className="links-info-one">
                                <div className="links-info">
                                  <div className="links-cont">
                                    <a href="#" className="service-trash"></a>
                                  </div>
                                </div>
                              </div>
                              <a
                                href="javascript:void(0);"
                                className="add-links1"
                              >
                                <i className="fas fa-plus-circle me-1"></i>{" "}
                                Additional Charges
                              </a>
                              <div className="links-info-discount">
                                <div className="links-cont-discount">
                                  <a
                                    href="javascript:void(0);"
                                    className="add-links-one"
                                  >
                                    <i className="fas fa-plus-circle me-1"></i>{" "}
                                    Add more Discount
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="invoice-total-footer">
                              <h4>
                                Total Amount <span>$ 894.00</span>
                              </h4>
                            </div>
                          </div>
                        </div> */}
                          <div
                            className="upload-sign"
                            style={{ display: "none" }}
                          >
                            <div className="form-group service-upload">
                              <span>Upload Sign</span>
                              <input type="file" multiple />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name of the Signatuaory"
                              />
                            </div>

                            {/* <div class="col-lg-12 col-md-12"><a style={{color:'grey'}}/>
<div class="form-group float-end mb-0">
<button className="btn btn-success" onClick={saveInvoice}>
                              Save Invoice
                            </button>
</div>
<div class="form-group float-end mb-0">
<button class="btn btn-primary" id="submitButton" type="submit" value="Submit">Print</button>
</div>
<div class="form-group float-end mb-0">
<button class="btn btn-danger" id="submitButton" type="submit" value="Submit">Cancel</button>
</div>
</div> */}

                            {/* <div className="form-group float-end mb-0">
                            
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div class="page-header invoices-page-header">
              <div class="row align-items-center">
                <div class="col-lg-3">
                  <ul class="breadcrumb invoices-breadcrumb">
                    <li class="breadcrumb-item invoices-breadcrumb-item">
                      <a href="invoices.html">
                        <i class="fa fa-chevron-left"></i> Back to Invoice List
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-9 col-md-12">
                  <a style={{ color: "grey" }} />
                  <div class="form-group float-end mb-0">
                    <button
                      class="btn btn-danger"
                      onClick={() => {
                        window.location.href =
                          "/SalesRegisterMaterialOutward";
                      }}
                      id="submitButton"
                      type="submit"
                      value="Submit"
                    >
                      Cancel
                    </button>
                  </div>
                  <div
                    class="form-group float-end mb-0"
                    style={{ marginRight: "5px" }}
                  >
                    <button
                      class="btn btn-primary"
                      onClick={printButtonClicked}
                      id="submitButton"
                      type="submit"
                      value="Submit"
                    >
                      Print
                    </button>
                  </div>
                  <div
                    class="form-group float-end mb-0"
                    style={{ marginRight: "5px" }}
                  >
                    <button className="btn btn-success" onClick={saveInvoice}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Invoices Preview Modal --> */}
        <div
          className="modal custom-modal fade invoices-preview"
          id="invoices_preview"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="card invoice-info-card">
                      <div className="card-body pb-0">
                        <div className="invoice-item invoice-item-one">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="invoice-logo">
                                <img src="assets/img/logo. png" alt="logo" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="invoice-info">
                                <div className="invoice-head">
                                  <h2 className="text-primary">Invoice</h2>
                                  <p>Invoice Number : In983248782</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Invoice Item --> */}
                        <div className="invoice-item invoice-item-bg">
                          <div className="invoice-circle-img">
                            <img
                              src="assets/img/invoice-circle1.png"
                              alt=""
                              className="invoice-circle1"
                            />
                            <img
                              src="assets/img/invoice-circle2.png"
                              alt=""
                              className="invoice-circle2"
                            />
                          </div>
                          <div className="row">
                            <div className="col-lg-4 col-md-12">
                              <div className="invoice-info">
                                <strong className="customer-text-one">
                                  Billed to
                                </strong>
                                <h6 className="invoice-name">Customer Name</h6>
                                <p className="invoice-details invoice-details-two">
                                  9087484288 <br />
                                  Address line 1, <br />
                                  Address line 2 <br />
                                  Zip code ,City - Country
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                              <div className="invoice-info">
                                <strong className="customer-text-one">
                                  Invoice From
                                </strong>
                                <h6 className="invoice-name">Company Name</h6>
                                <p className="invoice-details invoice-details-two">
                                  9087484288 <br />
                                  Address line 1, <br />
                                  Address line 2 <br />
                                  Zip code ,City - Country
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                              <div className="invoice-info invoice-info-one border-0">
                                <p>Issue Date : 27 Jul 2022</p>
                                <p>Due Date : 27 Aug 2022</p>
                                <p>Due Amount : $ 1,54,22 </p>
                                <p>Recurring Invoice : 15 Months</p>
                                <p className="mb-0">PO Number : 54515454</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- /Invoice Item --> */}

                        {/* <!-- Invoice Item --> */}
                        <div className="invoice-item invoice-table-wrap">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="table-responsive">
                                <table className="invoice-table table table-center mb-0">
                                  <thead>
                                    <tr>
                                      <th>Description</th>
                                      <th>Category</th>
                                      <th>Rate/Item</th>
                                      <th>Quantity</th>
                                      <th>Discount (%)</th>
                                      <th className="text-end">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Dell Laptop</td>
                                      <td>Laptop</td>
                                      <td>$1,110</td>
                                      <td>2</td>
                                      <td>2%</td>
                                      <td className="text-end">$400</td>
                                    </tr>
                                    <tr>
                                      <td>HP Laptop</td>
                                      <td>Laptop</td>
                                      <td>$1,500</td>
                                      <td>3</td>
                                      <td>6%</td>
                                      <td className="text-end">$3,000</td>
                                    </tr>
                                    <tr>
                                      <td>Apple Ipad</td>
                                      <td>Ipad</td>
                                      <td>$11,500</td>
                                      <td>1</td>
                                      <td>10%</td>
                                      <td className="text-end">$11,000</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- /Invoice Item --> */}

                        <div className="row align-items-center justify-content-center">
                          <div className="col-lg-6 col-md-6">
                            <div className="invoice-payment-box">
                              <h4>Payment Details</h4>
                              <div className="payment-details">
                                <p>Debit Card XXXXXXXXXXXX-2541 HDFC Bank</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="invoice-total-card">
                              <div className="invoice-total-box">
                                <div className="invoice-total-inner">
                                  <p>
                                    Taxable <span>$6,660.00</span>
                                  </p>
                                  <p>
                                    Additional Charges <span>$6,660.00</span>
                                  </p>
                                  <p>
                                    Discount <span>$3,300.00</span>
                                  </p>
                                  <p className="mb-0">
                                    Sub total <span>$3,300.00</span>
                                  </p>
                                </div>
                                <div className="invoice-total-footer">
                                  <h4>
                                    Total Amount <span>$143,300.00</span>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="invoice-sign-box">
                          <div className="row">
                            <div className="col-lg-8 col-md-8">
                              <div className="invoice-terms">
                                <h6>Notes:</h6>
                                <p className="mb-0">
                                  Enter customer notes or any other details
                                </p>
                              </div>
                              <div className="invoice-terms mb-0">
                                <h6>Terms and Conditions:</h6>
                                <p className="mb-0">
                                  Enter customer notes or any other details
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <div className="invoice-sign text-end">
                                <img
                                  className="img-fluid d-inline-block"
                                  src="assets/img/signature.png"
                                  alt="sign"
                                />
                                <span className="d-block">Harristemp</span>
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
          </div>
        </div>
        {/* <!-- /Invoices Preview Modal --> */}

        {/* <!-- Add Invoices Modal --> */}
        <div
          className="modal custom-modal fade bank-details"
          id="bank_details"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="form-header text-start mb-0">
                  <h4 className="mb-0">Add Bank Details</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="bank-inner-details">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Account Holder Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Bank name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add Bank name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>IFSC Code</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="bank-details-btn">
                  <a
                    href="javascript:void(0);"
                    data-bs-dismiss="modal"
                    className="btn bank-cancel-btn me-2"
                  >
                    Cancel
                  </a>
                  <a href="javascript:void(0);" className="btn bank-save-btn">
                    Save Item
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Add Invoices Modal --> */}

        {/* <!-- Delete Invoices Modal --> */}
        <div
          className="modal custom-modal fade"
          id="delete_invoices_details"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Invoice Details</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a
                        href="javascript:void(0);"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-continue-btn"
                      >
                        Delete
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href="javascript:void(0);"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Delete Invoices Modal --> */}

        {/* <!-- Save Invoices Modal --> */}
        <div
          className="modal custom-modal fade"
          id="save_invocies_details"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Save Invoice Details</h3>
                  <p>Are you sure want to save?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a
                        href="javascript:void(0);"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-continue-btn"
                      >
                        Save
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href="javascript:void(0);"
                        data-bs-dismiss="modal"
                        className="btn btn-primary paid-cancel-btn"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Save Invoices Modal --> */}

        <iframe
          id="ifmcontentstoprint"
          style={{ height: "0px", width: "0px", position: "absolute" }}
        ></iframe>
      </div>

      {/*  add product dialog box code start onClose={handleClose} */}

      <Dialog open={isOpenAddProduct}>
        <AddProduct
          toChild={isOpenAddProduct}
          sendToParent={prodData}
        ></AddProduct>
      </Dialog>

      {/* add product dialog code end  */}

      {/*   add product details code start */}

      <Dialog open={isOpenCustomer}>
        <AddCustomer
          toChild={isOpenCustomer}
          sendToParent={custData}
        ></AddCustomer>
      </Dialog>
      {/* add product code end */}
    </>
  );
}
