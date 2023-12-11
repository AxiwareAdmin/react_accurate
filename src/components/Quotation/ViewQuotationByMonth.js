import React,{useEffect ,useState , createContext , useRef} from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";


export default function ViewQuotationByMonth () {

	var token=localStorage.getItem("token")
	var header={
        headers:{
          "Content-Type":"application/json",
          "Authorization":'Bearer '+token
        }
      }

	const [month , setMonth] = useState("");
	const [allInv , setAllInv] = useState(0);
	const [paidInv , setPaidInv] = useState(0);
	const [unPaidInv , setUnPaidInv] = useState(0);
	const [canInv , setCanInv] = useState(0);
	const [allInvVal , setAllInvVal] = useState(0);
	const [paidInvVal , setPaidInvVal] = useState(0);
	const [unpaidInvVal , setUnpaidInvVal] = useState(0);
	const [canInvVal , setCanInvVal] = useState(0);
	const [subTotal , setSubTotal] = useState(0);
	const [igst , setIgst] = useState(0);
	const [cgst , setCgst] = useState(0);
	const [sgst , setSgst] = useState(0);

	const [customerName,setCustomerName]=useState("");
	const [fromDate,setFromDate]=useState("");
	const [toDate,setToDate]=useState("");
	const [status,setStatus]=useState("");
	const [category,setCategory]=useState("");
	//  "/viewInvoice?id="
	const actionmap = [{name:"Edit",path:'#',classname:"far fa-edit me-2"},{name:"View",path:'#',classname:"far fa-eye me-2"},
	{name:"Delete",path:"#",classname:"far fa-trash-alt me-2"},{name:"Mark as sent",path:"#",classname:"far fa-check-circle me-2"},
	{name:"Send Quotation",path:"#",classname:"far fa-paper-plane me-2"},{name:"Copy Quotation",path:"#",classname:"far fa-copy me-2"},
	{name:"Print Quotation",path:"#",classname:"far fa-copy me-2"},{name:"Download Quotation",path:"#",classname:"far fa-copy me-2"}];
    const otionsDate = ["Today","Tomarrow","Lastweek"];
	const [invoicedo , setInvoicedo] = useState("");



    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    useEffect(() => {
		window.onCustomerNameChange=(e)=>{
			onCustomerNameChange(e);
		}

		window.onFromDateChange=(e)=>{
			onFromDateChange(e)
		}

		window.onToDateChange=(e)=>{
			onToDateChange(e);
		}

		window.onStatusChange=(e)=>{
			onStatusChange(e);
		}

		window.onCategoryChange=(e)=>{
			onCategoryChange(e);
		}
		
		var url=new URL(window.location.href);
          let month1=url.searchParams.get("month");
          setMonth(month1);
		  let allinvs = 0;
		  let paidinvs = 0;
		  let unpaidinvs = 0;
		  let cancelinvs = 0;
		  let allinvvals = 0;
		  let paidinvvals = 0;
		  let unpaidinvvals = 0;
		  let caninvvals = 0;
          let srNo = 0;
		  let subTotal = 0;
		  let igst = 0;
		  let cgst = 0;
		  let sgst = 0;
        axios.get("http://localhost:8080/quotations/"+month1,header).then((res) => {
			setInvoicedo(res.data);
			debugger;
            res.data.map(elem=>{

				srNo = srNo + 1;

				//totat of sub total
				subTotal = subTotal + parseInt(elem.taxableValue);
				setSubTotal(subTotal);

				//totat of sub total
				igst = igst + parseInt(elem.igstValue);
				setIgst(igst);

				//totat of sub total
				cgst = cgst + parseInt(elem.cgstValue);
				setCgst(cgst);

				//totat of sub total
				sgst = sgst + parseInt(elem.sgstValue);
				setSgst(sgst);

           allinvs = allinvs + 1;
		   setAllInv(allinvs);
		   allinvvals = allinvvals + parseInt(elem.quotationValue);
		   setAllInvVal(allinvvals);


		   if(elem.invoiceStatus == "Paid")
		   {
		   paidinvs = paidinvs + 1;
		   setPaidInv(paidinvs);
		   paidinvvals = paidinvvals + parseInt(elem.quotationValue);
		   setPaidInvVal(paidinvvals);
		   }
		   if(elem.invoiceStatus == "Overdue")
		   {
		   unpaidinvs = unpaidinvs + 1;
		   setUnPaidInv(unpaidinvs);
		   unpaidinvvals = unpaidinvvals + parseInt(elem.quotationValue);
		   setUnpaidInvVal(unpaidinvvals);
		   }

		   if(elem.invoiceStatus == "Cancelled")
		   {
		   cancelinvs = cancelinvs + 1;
		   setCanInv(cancelinvs);
		   caninvvals = caninvvals + parseInt(elem.quotationValue);
		   setCanInvVal(caninvvals);
		   }

            let trElem=document.createElement("tr");

			let tdElem = document.createElement("td");
			let textElem =  document.createTextNode(srNo);
			tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            textElem=document.createTextNode(formatDate(elem.createdDate));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.customerName);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem)

            tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.quotationNo );//set data
            //let inputElem=document.createElement("input");
           // let spanElem=document.createElement("span");
          //  let labelElem=document.createElement("label")
           // labelElem.className="custom_check";
           // inputElem.type="checkbox";
          //  inputElem.name="invoice";
            //spanElem.className="checkmark";
           // labelElem.appendChild(inputElem);
           // labelElem.appendChild(spanElem);
          //  tdElem.appendChild(labelElem);
            let aElem=document.createElement("a"); 
			aElem.className="invoice-link";
		    aElem.href="/ViewQuotation?id="+elem.quotationId;
            aElem.appendChild(textElem); 
			tdElem.appendChild(aElem);
            trElem.appendChild(tdElem);
			
			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(elem.quotationValue);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(elem.taxableValue);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(elem.cgstValue);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);
			
			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(elem.sgstValue);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(elem.igstValue);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

            //invoice category
		// 	tdElem=document.createElement("td");
        //     textElem=document.createTextNode("Advertising")
        //     tdElem.appendChild(textElem);
        //     trElem.appendChild(tdElem);

        //     tdElem=document.createElement("td");
        //     textElem=document.createTextNode(formatDate(elem.dueDate));
        //     tdElem.appendChild(textElem);
        //     trElem.appendChild(tdElem)             
            
        //     tdElem=document.createElement("td");
        //    let spanElem=document.createElement("span")
            
		// 	if(elem.invoiceStatus == "Paid" || elem.invoiceStatus =="" || elem.invoiceStatus == null)
        //     spanElem.className="badge bg-success-light" 
		// 	if(elem.invoiceStatus == "Overdue")
		// 	spanElem.className="badge bg-danger-light";
		// 	if(elem.invoiceStatus == "Cancelled")
		// 	spanElem.className="badge bg-primary-light";
		//     if(elem.invoiceStatus == "Draft")
		// 	spanElem.className="badge bg-warning";


        //     textElem=document.createTextNode(elem.invoiceStatus);

        //     spanElem.appendChild(textElem)

        //     tdElem.appendChild(spanElem);

        //     trElem.appendChild(tdElem)  

            tdElem=document.createElement("td");
            tdElem.className="text-end";
			let divEle = document.createElement("div");
			divEle.className = "dropdown dropdown-action";
			let aEle = document.createElement("a");
            aEle.className = "action-icon dropdown-toggle";
			aEle.href = "#";
			aEle.setAttribute("data-bs-toggle" , "dropdown");
			aEle.setAttribute("aria-expanded" , "false");
			let iEle = document.createElement("i");
			iEle.className = "fas fa-ellipsis-v";
			aEle.appendChild(iEle);
			divEle.appendChild(aEle);
			let innerDiv = document.createElement("div");
			innerDiv.className = "dropdown-menu dropdown-menu-end";
			innerDiv.style = "";
			actionmap.map(ele =>{
				aEle = document.createElement("a");
				iEle = document.createElement("i");
				aEle.className = "dropdown-item"
				aEle.href=ele.path;
				aEle.setAttribute("Onclick","rendercommon('"+ele.name+"','"+elem.quotationId+"')");
				iEle.className = ele.classname;
				textElem = document.createTextNode(ele.name);
				aEle.appendChild(iEle);
				aEle.appendChild(textElem);
				innerDiv.appendChild(aEle);
			});
			divEle.appendChild(innerDiv);
			tdElem.appendChild(divEle);
            trElem.appendChild(tdElem) 

            document.querySelector(".datatable tbody").appendChild(trElem);
        })

          }).catch((e)=>{
			console.log(e)
		  }).finally(()=>{
			debugger;
			let trElem = document.createElement("tr");
			trElem.style='background-color: #9a55ff;'
			let tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			let textElem=document.createTextNode("Grand Total");
			
			tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);
	
			tdElem = document.createElement("td");
			 textElem=document.createTextNode("");
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			 textElem=document.createTextNode("");
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			 textElem=document.createTextNode("");
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			// tdElem = document.createElement("td");
			//  textElem=document.createTextNode("");
			//  tdElem.appendChild(textElem);
			// trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(allinvvals);
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(subTotal);
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(cgst);
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(sgst);
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(igst);
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			 textElem=document.createTextNode("");
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);
	
			
	
			document.querySelector("#tableFooter").appendChild(trElem); 
		  })

		axios.get("http://localhost:8080/customers",header).then((res) => {
		console.log(res.data);
		res.data.map((a) => {
        var option = document.createElement("option");
        option.value = a.customerId;
        option.append(document.createTextNode(a.customerName));
        document.querySelector("#customer").append(option);
			});
		}).catch((e)=>{
			console.log(e)
		  })
				
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
          document.body.removeChild(script11);
        };
      }, []);

	  useEffect(() => {
		window.selectCustomer = (e) => {
			
		  };
		  window.rendercommon = (name , invno) => {
			rendercommon(name , invno);
		  }

	  });

	  
	  const navigate = useNavigate();
	//   const rendertoInvPaid = () => {
	// 	navigate("/InvoicesPaid", { state: invoicedo });
	//   };
	//   const rendertoInvOverDue = () => {
	// 	navigate("/InvoicesOverDue", { state: invoicedo });
	//   };
	//   const rendertoInvDraft = () => {
	// 	navigate("/InvoicesDraft", { state: invoicedo });
	//   };
	//   const rendertoInvRecur = () => {
	// 	navigate("/invoicesRecurring", { state: invoicedo });
	//   };
	//   const rendertoInvCancl = () => {
	// 	navigate("/InvoicesCancelled", { state: invoicedo });
	//   };

	  function rendercommon(name , invt) {
         console.log("on click target value"+name+"Quotation no :"+invt);
		 if(name == "Edit"){
			navigate("/CreateQuotation?InvNo="+invt+"&action=Edit");
		 }else if(name == "View" || name == "Print Quotation"){
			navigate("/ViewQuotation?id="+invt);
		 }else if(name == "Delete"){
			axios.get("http://localhost:8080/deleteQuotation?invNo="+invt,header).then((res) => {
		    console.log(res.data);
			if(res!=null && res.data.res=='sucess'){
				// alert("Invoice deleted successfully!!");	
				Swal.fire(
					'',
					'Quotation deleted successfully!!',
					'success'
				  )	  
				}
				else
				//   alert("There is some issue delete invoice.");	
				  Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'There is some issue delete Quotation.',
					footer: ''
				  })	   
		    });
		 } else if(name == "Mark as sent"){
			navigate("/InvoicesCancelled");
		 }else if(name == "Send Quotation"){
					axios.get("http://localhost:8080/sendmailQuotation?invNo="+invt+"&custName=Samarth Industries",header).then((res) => {
					console.log(res.data);
					if(res!=null && res.data.res=='sucess'){
						// alert("Invoice mail send successfully!!");	
						
						Swal.fire(
							'',
							'Quotation mail send successfully!!',
							'success'
						  )	  
						}
						else
						// alert("There is some issue to send invoice amil.");		   

						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'There is some issue to send Quotation mail',
							footer: ''
						  })	
				}).catch(function(error) {
					console.log(error);
				});
		 } else if(name == "Copy Quotation"){
					axios.get("http://localhost:8080/cloneQuotation?invNo="+invt,header).then((res) => {
					console.log(res.data);
					if(res!=null && res.data.res=='sucess'){
						// alert("Invoice Copied successfully!!");	

						 Swal.fire(
        '',
        'Quotation Copied successfully!!',
        'success'
      )
						navigate("/CreateQuotation?InvNo="+invt+"&action=Clone");	  
						}
						else
						// alert("There is some issue Copy invoice.");		
					
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'There is some issue Copy Quotation.',
							footer: ''
						  })	
				}).catch(function(error) {
					console.log(error);
				});
		 }else if(name == "Download Quotation"){
			console.log("download Quotation");
			navigate("/ViewQuotation?id="+invt+"&action=download");

			// html2canvas(document.querySelector("#invoicelist")).then(canvas => {
			// 	document.body.appendChild(canvas);  
			// 	const imgData = canvas.toDataURL('image/png');
			// 	const pdf = new jsPDF();
			// 	pdf.addImage(imgData, 'PNG', 0, 0,210,310);
			// 	pdf.save("download.pdf"); 
			// });

				// html2canvas(inputRef.current).then((canvas) => {
				// 	const imgData = canvas.toDataURL("image/png");
				// 	const pdf = new jsPDF();
				// 	pdf.addImage(imgData, "JPEG", 0, 0,210,310);
				// 	pdf.save("download.pdf");
				//   });
			
		 }
	  };

	  function onCustomerNameChange(e){
		console.log(e.target)
		setCustomerName(e.target.querySelector("option:checked").text);
	  }

	  function onFromDateChange(e){
		setFromDate(e.target.value)
	  }

	  function onToDateChange(e){
		setToDate(e.target.value)
	  }

	  function onStatusChange(e){
		setStatus(e.target.querySelector("option:checked").text);
	  }

	  function onCategoryChange(e){
		setCategory(e.target.querySelector("option:checked").text)
	  }
  

	  function onReportButtonClicked(e){
		e.preventDefault();
		var data={
			customerName,
			fromDate,
			toDate,
			status,
			category
		}
		axios.post('http://localhost:8080/excel/quotation', data,{
			method: 'GET',
			responseType: 'blob', // important
			...header
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${Date.now()}.xlsx`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		});
	  }

  return (
    <div>
		 <Navbar/>
		<Sidebar />
        {/* <div style={{color:'white',backgroundColor:'red',textAlign:'center'}}>
            Hello Axiware <h1> I am here </h1>
        </div> */}

        <div class="page-wrapper">
			
                <div class="content container-fluid">

                	<div class="crms-title row bg-white">
                		<div class="col  p-0">
                			<h3 class="page-title m-0">
			                <span class="page-title-icon bg-gradient-primary text-white me-2">
			                  <i class="fa fa-file" aria-hidden="true"></i>
			                </span> Quotation </h3>
                		</div>
                        <div class="col p-0 text-end">
                			<ul class="breadcrumb bg-white float-end m-0 ps-0 pe-0">
								<li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
								<li class="breadcrumb-item active">Quotation</li>
							</ul>
                		</div>
                    </div>
                    <div class="row align-items-center">
						<div class="col">
						</div>
						<div class="col-auto py-3">
							<a href="invoices.html" class="invoices-links active">
								<i data-feather="list"></i>
							</a>
							<a href="invoice-grid.html" class="invoices-links">
								<i data-feather="grid"></i>
							</a>
						</div>
					</div>
                 {/* Report filter start */}
                    <div class="card report-card">
						<div class="card-body pb-0">
							<div class="row">
								<div class="col-md-12">
									<ul class="app-listing">
										<li>
											<div class="multipleSelection">
												{/* <div class="selectBox">
													<p class="mb-0"><i data-feather="user-plus" class="me-1 select-icon"></i> Select User</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>	 */}
												 <span>
												{/*<i style={{position: "absolute",zIndex: "1",marginTop: "7%",marginLeft:"4%",color: "#9a55ff"}}data-feather="user-plus" class="me-1 select-icon"></i> */}
												<select class="form-control select2 invoiceListCustomerOption"
					                              name="product"	id="customer">
												  <option  value="-1" >--Select User--</option>
												  </select>	</span>  
												{/* <div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">Customer Search</p>
														<div class="form-custom">
															<input type="text" class="form-control bg-grey" placeholder="Enter Customer Name"/>
														</div>
														<div class="selectBox-cont">
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span>  Brian Johnson
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span>  Russell Copeland
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span>  Greg Lynch
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> John Blair
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> Barbara Moore
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> Hendry Evan
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="username"/>
																<span class="checkmark"></span> Richard Miles
															</label>
														</div>
														<button type="submit" class="btn w-100 btn-primary">Apply</button>
														<button type="reset" class="btn w-100 btn-grey">Reset</button>
													</form>
												</div> */}
											</div>
										</li>
										<li>
                                <input
                                  className="form-control datetimepicker"
                                  type="text"
                                  placeholder="Select From Date"
								  id="fromDate"
                                //   value={invoiceDate}
                                //   id="invoiceDate"
                                  style={{ border: "1px solid #9a55ff", width: 120,color: "#9a55ff"}}
                                />

											{/* <div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="calendar" class="me-1 select-icon"></i> Select Date</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">Date Filter</p>
														<div class="selectBox-cont selectBox-cont-one h-auto">
															<div class="date-picker">
																<div class="form-custom cal-icon">
																	<input class="form-control datetimepicker" type="text" placeholder="From"/>
																</div>
															</div>
															<div class="date-picker pe-0">
																<div class="form-custom cal-icon">
																	<input class="form-control datetimepicker" type="text" placeholder="To"/>
																</div>
															</div>
															<div class="date-list">
																<ul>
																	<li><a href="#" class="btn date-btn">Today</a></li>
																	<li><a href="#" class="btn date-btn">Yesterday</a></li>
																	<li><a href="#" class="btn date-btn">Last 7 days</a></li>
																	<li><a href="#" class="btn date-btn">This month</a></li>
																	<li><a href="#" class="btn date-btn">Last month</a></li>
																</ul>
															</div>
														</div>
													</form>
												</div>
											</div> */}
										</li>

										<li>
                                <input
                                  className="form-control datetimepicker"
                                  type="text"
                                  placeholder="Select To Date"
                                //   value={invoiceDate}
                                  id="toDate"
                                  style={{ border: "1px solid #9a55ff", width: 120,color: "#9a55ff"}}/>
								  </li>

										<li>

										<select id="invoiceStatusOption"  style={{ border: "1px solid #9a55ff", width: 120,color: "#9a55ff"}}>
											<option>--Select--</option>
											<option>Paid</option>
											<option>UnPaid</option>

										</select>
											{/* <div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="book-open" class="me-1 select-icon"></i> Select Status</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">By Status</p>
														<div class="selectBox-cont">
															<label class="custom_check w-100">
																<input type="checkbox" name="name" checked/>
																<span class="checkmark"></span> All Invoices
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Paid
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Overdue
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Draft
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Recurring
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="name"/>
																<span class="checkmark"></span> Cancelled
															</label>
														</div>
														<button type="submit" class="btn w-100 btn-primary">Apply</button>
														<button type="reset" class="btn w-100 btn-grey">Reset</button>
													</form>
												</div>
											</div> */}
										</li>
										<li>

										<select id="invoiceCategoryOption">
											<option>--Select--</option>
											<option>Advertising</option>
											<option>Marketing</option>
											<option>Repairs</option>
											<option>Software</option>
											<option>Stationary</option>
											<option>Travel</option>

										</select>

											{/* <div class="multipleSelection">
												<div class="selectBox">
													<p class="mb-0"><i data-feather="bookmark" class="me-1 select-icon"></i> By Category</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>						  
												<div id="checkBoxes">
													<form action="#">
														<p class="checkbox-title">Category</p>
														<div class="form-custom">
															<input type="text" class="form-control bg-grey" placeholder="Enter Category Name"/>
														</div>
														<div class="selectBox-cont">
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Advertising
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Food
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Marketing
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Repairs
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Software
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Stationary
															</label>
															<label class="custom_check w-100">
																<input type="checkbox" name="category"/>
																<span class="checkmark"></span> Travel
															</label>
														</div>
														<button type="submit" class="btn w-100 btn-primary">Apply</button>
														<button type="reset" class="btn w-100 btn-grey">Reset</button>
													</form>
												</div>
											</div> */}
										</li>
										<li>
											<div class="report-btn" onClick={onReportButtonClicked}>
												<a href="#" class="btn">
													<img src="assets/img/invoices-icon5.svg" alt="" class="me-2"/>
													Generate report
												</a>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
                    {/* Report filter End */}

                    <div class="card invoices-tabs-card">
						<div class="card-body card-body pt-0 pb-0">
							<div class="invoices-main-tabs">
								<div class="row align-items-center">
									<div class="col-lg-8 col-md-8">
										<div class="invoices-tabs">
											<ul>
												
												<li><a href="#" class="active">All Quotation</a></li>
												{/* <li><a href="#" onClick={rendertoInvPaid} >Paid</a></li>	
												<li><a href="#" onClick={rendertoInvOverDue}>Overdue</a></li>		
												<li><a href="#" onClick={rendertoInvDraft}>Draft</a></li>	
												<li><a href="#" onClick={rendertoInvRecur}>Recurring</a></li>
												<li><a href="#" onClick={rendertoInvCancl}>Cancelled</a></li> */}
											</ul>
										</div>
									</div>
									<div class="col-lg-4 col-md-4">
										<div class="invoices-settings-btn">
											<a href="invoices-settings.html" class="invoices-settings-icon">
												<i data-feather="settings"></i>
											</a>
											<a href="/add-invoice" class="btn">
												<i data-feather="plus-circle"></i> New Quotation
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card">
								<div class="card-body">
									<div class="inovices-widget-header">
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon1.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">${allInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">All Quotations <span>{allInv}</span></p>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card">
								<div class="card-body">
									<div class="inovices-widget-header">
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon2.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">${paidInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">Paid Quotations <span>{paidInv}</span></p>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card">
								<div class="card-body">
									<div class="inovices-widget-header">
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon3.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">${unpaidInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">Unpaid Quotations <span>{unPaidInv}</span></p>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card">
								<div class="card-body">
									<div class="inovices-widget-header">
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon4.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">${canInvVal}</div>
										</div>
									</div>
									<p class="inovices-all">Cancelled Quotations <span>{canInv}</span></p>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-sm-12">
							<div class="card card-table"> 
								<div class="card-body p-4">
									<div class="table-responsive">
										<table class="table table-striped invoicelisttable table-nowrap custom-table mb-0 datatable">
											<thead class="thead-light">
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Customer Name</th>
												    <th>Quotation No</th>
												    <th>Gross Total</th>
												    <th>Sub Total</th>
												    <th>CGST</th>
												    <th>SGST</th>
												    <th>IGST</th>
												    <th class="text-end">Action</th>
												</tr>
											</thead>
											<tbody>
												{/* <tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<Link to={{pathname:"view-invoice",useState:"1234",}} class="invoice-link">IN093439#@09</Link>
													</td>
													<td>Advertising</td>
													<td>16 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-04.jpg" alt="User Image"/> Barbara Moore</a>
														</h2>
													</td>
													<td class="text-primary">$1,54,220</td>
													<td>23 Mar 2022</td>
													<td><span class="badge bg-success-light">Paid</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@10</a>
													</td>
													<td>Food</td>
													<td>14 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-06.jpg" alt="User Image"/> Karlene Chaidez</a>
														</h2>
													</td>
													<td class="text-primary">$1,222</td>
													<td>18 Mar 2022</td>
													<td><span class="badge bg-danger-light">Overdue</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@11</a>
													</td>
													<td>Marketing</td>
													<td>7 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-08.jpg" alt="User Image"/> Russell Copeland</a>
														</h2>
													</td>
													<td class="text-primary">$3,470</td>
													<td>10 Mar 2022</td>
													<td><span class="badge bg-primary-light">Cancelled</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@12</a>
													</td>
													<td>Repairs</td>
													<td>24 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-10.jpg" alt="User Image"/> Joseph Collins</a>
														</h2>
													</td>
													<td class="text-primary">$8,265</td>
													<td>30 Mar 2022</td>
													<td><span class="badge bg-success-light">Paid</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<label class="custom_check">
															<input type="checkbox" name="invoice"/>
															<span class="checkmark"></span> 
														</label>
														<a href="view-invoice.html" class="invoice-link">IN093439#@13</a>
													</td>
													<td>Software</td>
													<td>17 Mar 2022</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html"><img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="assets/img/profiles/avatar-11.jpg" alt="User Image"/> Jennifer Floyd</a>
														</h2>
													</td>
													<td class="text-primary">$5,200</td>
													<td>20 Mar 2022</td>
													<td><span class="badge bg-danger-light">Overdue</span></td>
													<td class="text-end">
														<div class="dropdown dropdown-action">
															<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></a>
															<div class="dropdown-menu dropdown-menu-end">
																<a class="dropdown-item" href="edit-invoice.html"><i class="far fa-edit me-2"></i>Edit</a>
																<a class="dropdown-item" href="view-invoice.html"><i class="far fa-eye me-2"></i>View</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-trash-alt me-2"></i>Delete</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-check-circle me-2"></i>Mark as sent</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-paper-plane me-2"></i>Send Invoice</a>
																<a class="dropdown-item" href="javascript:void(0);"><i class="far fa-copy me-2"></i>Clone Invoice</a>
															</div>
														</div>
													</td>
												</tr> */}
											</tbody>
											<tfoot id="tableFooter">
												
											</tfoot>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
                   

                </div>
        </div>
     </div>


  );

}