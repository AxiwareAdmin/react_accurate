import React,{useEffect ,useState , createContext , useRef} from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate,useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import { render } from "react-dom";
import ExcelJS from 'exceljs';


export default function QuotationList () {

	var token=localStorage.getItem("token");

	const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    //const initialInvoiceType = queryParams.get(process.env.REACT_APP_QUOTATION);
  

   // const [invoiceType,setInvoiceType]=useState(initialInvoiceType);

    // useEffect(() => {
    //   console.log("changing")
    //   //const newInvoiceType = queryParams.get(process.env.REACT_APP_INVOICE_TYPE);
    //   setInvoiceType(process.env.REACT_APP_QUOTATION);
    // }, [location.search]);

	// var header={
    //     headers:{
    //       "Content-Type":"application/json",
    //       "Authorization":'Bearer '+token
    //     }
    //   }

	var header = {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: "Bearer " + token,
		},
	  };

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
	const [userId,setUserId]=useState("");
	const [fromDate,setFromDate]=useState("");
	const [toDate,setToDate]=useState("");
	const [status,setStatus]=useState("");
	const [category,setCategory]=useState("");
	const [searchText,setSearchText]=useState("");
	// const [userDetails,setUserDetails]=useState({})
	const [clientDetails,setClientDetails]=useState({})
	//  "/viewInvoice?id="
	const actionmap = [{name:"View",path:'#',classname:"far fa-eye me-2"},{name:"Edit",path:'#',classname:"far fa-edit me-2"}
	,{name:"Cancel",path:"#",classname:"fa fa-times me-2"},{name:"Delete",path:"#",classname:"far fa-trash-alt me-2"},
	{name:"Send",path:"#",classname:"far fa-paper-plane me-2"},{name:"Copy",path:"#",classname:"far fa-copy me-2"},
	{name:"Print",path:"#",classname:"far fa-copy me-2"},{name:"Download",path:"#",classname:"far fa-copy me-2"}];
    const otionsDate = ["Today","Tomarrow","Lastweek"];
	const [invoicedo , setInvoicedo] = useState([]);
	const [currentUserId,setCurrentUserId]=useState(null);

	const[firstTimePageLoad,setFirstTimePageLoad]=useState("true");

	useEffect(()=>{
		// if(currentUserId==null) return;
		
		if(firstTimePageLoad=='true'){
			return;
		}
		let tempInvoiceDo=[...invoicedo];

		
		if(currentUserId!=-1 && currentUserId!=null)
		tempInvoiceDo=tempInvoiceDo.filter(elem=>{
			  return elem.userId==currentUserId
			// return false;
		  });

		  if(customerName!=null && customerName.length>0 && customerName!='--Select Customer--')
		tempInvoiceDo=tempInvoiceDo.filter(elem=>{
			  return elem.customerName==customerName
			// return false;
		  });

		  if(status!=null && status.length>0 && status!='--Select Status--'){
			tempInvoiceDo=tempInvoiceDo.filter(elem=>{
				return elem.invoiceStatus==status
			  // return false;
			});
		  }

		  if(searchText!=null && searchText.length>0){
			  tempInvoiceDo=tempInvoiceDo.filter(elem=>{
				  console.log(elem.customerName.toString().toLowerCase()+" "+searchText.toLowerCase())
				  return (elem.igstValue && elem.igstValue.toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.invoiceDate && formatDate(elem.invoiceDate).toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.customerName && elem.customerName.toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.invoiceValue && elem.invoiceValue.toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.taxableValue && elem.taxableValue.toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.cgstValue && elem.cgstValue.toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.sgstValue && elem.sgstValue.toString().toLowerCase().includes(searchText.toLowerCase()))
			  || (elem.invoiceStatus && elem.invoiceStatus.toString().toLowerCase().includes(searchText.toLowerCase()))
			  ||(elem.invoiceNo && elem.invoiceNo.toString().toLowerCase().includes(searchText.toLowerCase()))
		  });
		}
	
		  setFilteredInvoiceList(tempInvoiceDo);
	},[currentUserId,customerName,searchText,status])

	
	const onUserChange=(e)=>{

		console.log("userID:"+e.target.value)
		setCurrentUserId(e.target.value);
	}



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


// const exportToExcelOld = () => {
// 	const fileName='invoices';
// 	const columnHeaders=['Invoice No','Date','Customer Name','Gross Total','Sub Total',
// 	'CGST','SGST','IGST','Status'];
// 	const extraLines=2;
// 	const ws = XLSX.utils.json_to_sheet(invoicedo, { header: columnHeaders });

//     // Add extra lines before the header
//     ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: extraLines - 1, c: columnHeaders.length - 1 } }];

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//     XLSX.writeFile(wb, `${fileName}.xlsx`);
// };

const exportToExcel = async () => {
	
	const columnHeaders=['Sr. No.','Invoice No','Date','Customer Name','Gross Total','Sub Total',
	'CGST','SGST','IGST','Status'];
	const fileName='invoices';

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

	let firstRow=[clientDetails.companyName];
	firstRow=worksheet.addRow(firstRow);
	firstRow.font = { bold: true };
	firstRow.alignment={ vertical: 'middle', horizontal: 'center' };

	let secondRow=[`Sale Register for the Month of ${month} 2023`];
	secondRow=worksheet.addRow(secondRow);
	secondRow.font = { bold: true };
	secondRow.alignment={ vertical: 'middle', horizontal: 'center' };


	worksheet.mergeCells(1, 1, 1, 10);
	worksheet.mergeCells(2, 1, 2, 10);

    // Add column headers
    const headerRow=worksheet.addRow(columnHeaders);
	headerRow.font = { bold: true };

    // Add data row by row
	let tempRow;
	let rowCount=1;

	
	let finalRow=['Total','','','',allInvVal,subTotal,cgst,sgst,igst,'']

    filteredInvoiceList.forEach(row => {
		
		tempRow=[rowCount++,row['invoiceNo'], formatDate(row['invoiceDate']),row['customerName'],row['invoiceValue'],row['taxableValue'],
		row['cgstValue'],
		row['sgstValue'],
		row['igstValue'],
		row['invoiceStatus']
		]
      worksheet.addRow(tempRow);
    });

	finalRow=worksheet.addRow(finalRow);
	finalRow.font = { bold: true };

	worksheet.eachRow(row => {
		row.eachCell(cell => {
		  cell.border = {
			top: { style: 'thin' },
			bottom: { style: 'thin' },
			left: { style: 'thin' },
			right: { style: 'thin' },
		  };
		});
	  });

	

	  worksheet.columns.forEach(column => {
		column.eachCell({ includeEmpty: true }, cell => {
		  const cellContentLength = cell.value ? cell.value.toString().length : 10; // Default width for empty cells
		  column.width = Math.max(column.width || 0, cellContentLength + 2); // Set minimum width for better visibility
		});
		console.log("column width:"+column.width);
	  });
  

    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger a click to download the Excel file
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  };
	



	const [filteredInvoiceList,setFilteredInvoiceList]=useState([]);


	useEffect(()=>{
		// if(filteredInvoiceList.length<=0 && firstTimePageLoad=='true') return;
		console.log("considered useEffect start")
		if(firstTimePageLoad=='true'){

			console.log("considered useEffect insinde if condition:"+firstTimePageLoad);
			
			setFirstTimePageLoad("false");
			return;
		}

		console.log("considered useEffect outside if condition:"+firstTimePageLoad);

		

		let tBodyTrList=document.querySelectorAll(".datatable tbody tr");

		for(let i=0;i<tBodyTrList.length;i++){
			tBodyTrList[i].remove();
		}

		let lFootTrList=document.querySelectorAll("#tableFooter tr");

		for(let i=0;i<lFootTrList.length;i++){
			lFootTrList[i].remove();
		}

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
		

		setAllInv(0);
		
	   setAllInvVal(0);


	   
	   setPaidInv(0);
	   
	   setPaidInvVal(0);

	   
	   setUnPaidInv(0);
	   
	   setUnpaidInvVal(0);

	   
	   setCanInv(0);
	   
	   setCanInvVal(0);
	   
		filteredInvoiceList.map(elem=>{

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
	   allinvvals = allinvvals + parseInt(elem.invoiceValue);
	   setAllInvVal(allinvvals);

	   

	   if(elem.invoiceStatus == "Paid")
	   {
	   paidinvs = paidinvs + 1;
	   setPaidInv(paidinvs);
	   paidinvvals = paidinvvals + parseInt(elem.invoiceValue);
	   setPaidInvVal(paidinvvals);
	   }
	   if(elem.invoiceStatus == "Overdue")
	   {
	   unpaidinvs = unpaidinvs + 1;
	   setUnPaidInv(unpaidinvs);
	   unpaidinvvals = unpaidinvvals + parseInt(elem.invoiceValue);
	   setUnpaidInvVal(unpaidinvvals);
	   }

	   if(elem.invoiceStatus == "Cancelled")
	   {
	   cancelinvs = cancelinvs + 1;
	   setCanInv(cancelinvs);
	   caninvvals = caninvvals + parseInt(elem.invoiceValue);
	   setCanInvVal(caninvvals);
	   }

		let trElem=document.createElement("tr");

		let tdElem = document.createElement("td");
		let textElem =  document.createTextNode(srNo);
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem);

		tdElem=document.createElement("td");
		textElem=document.createTextNode(elem.invoiceNo );

		let aElem=document.createElement("a"); 
		aElem.className="invoice-link";
		aElem.addEventListener('click',()=>{

			navigate(`/ViewQuotationTriplet?id=${elem.invoiceId}`);
		})
		// aElem.href="/viewInvoiceTriplet?id="+elem.invoiceId;
		aElem.appendChild(textElem); 
		tdElem.appendChild(aElem);
		trElem.appendChild(tdElem);

		



		tdElem=document.createElement("td");
		textElem=document.createTextNode(formatDate(elem.invoiceDate));
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem);

		tdElem=document.createElement("td");
		textElem=document.createTextNode(elem.customerName);
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem)
		
		tdElem=document.createElement("td");
		tdElem.className="text-primary textAlignEnd";
		textElem=document.createTextNode(accountingFormat(elem.invoiceValue));
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem); 

		tdElem=document.createElement("td");
		tdElem.className="text-primary textAlignEnd";
		textElem=document.createTextNode(accountingFormat(elem.taxableValue));
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem); 

		tdElem=document.createElement("td");
		tdElem.className="text-primary textAlignEnd";
		textElem=document.createTextNode(accountingFormat(elem.cgstValue));
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem);
		
		tdElem=document.createElement("td");
		tdElem.className="text-primary textAlignEnd";
		textElem=document.createTextNode(accountingFormat(elem.sgstValue));
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem); 

		tdElem=document.createElement("td");
		tdElem.className="text-primary textAlignEnd";
		textElem=document.createTextNode(accountingFormat(elem.igstValue));
		tdElem.appendChild(textElem);
		trElem.appendChild(tdElem); 

		tdElem=document.createElement("td");
		let spanElem=document.createElement("span")
		 
		 if(elem.invoiceStatus == "Paid" || elem.invoiceStatus =="" || elem.invoiceStatus == null)
		 spanElem.className="badge bg-success-light" 
		 if(elem.invoiceStatus == "Overdue")
		 spanElem.className="badge bg-danger-light";
		 if(elem.invoiceStatus == "Cancelled")
		 spanElem.className="badge bg-primary-light";
		 if(elem.invoiceStatus == "Draft")
		 spanElem.className="badge bg-warning";


		 textElem=document.createTextNode(elem.invoiceStatus);

		 spanElem.appendChild(textElem)

		 tdElem.appendChild(spanElem);

		 trElem.appendChild(tdElem)  


	  

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
			aEle.addEventListener('click',(e)=>{
				rendercommon(e,ele.name,elem.invoiceId);
			})
			// aEle.setAttribute("Onclick","function demo(e){rendercommon(e,'"+ele.name+"','"+elem.invoiceId+"')}");
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

	//setting table footer
	let trElem = document.createElement("tr");
			trElem.style='background-color: #9292a6;'
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
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(allinvvals));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(subTotal));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(cgst));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(sgst));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(igst));
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
	
			document.querySelector("#tableFooter").appendChild(trElem); 

	},[filteredInvoiceList])



    useEffect(() => {

		document.querySelector(".datatable tbody").innerHTML='';
		document.querySelector("#tableFooter").innerHTML='';

		window.onUserChange=(e)=>{
			onUserChange(e);
		}

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

		window.onUserIdChange=(e)=>{
			onUserIdChange(e);
		}
		// setTimeout(()=>{

		
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
        axios.get(`http://localhost:8080/Quotations/${month1}`,header).then((res) => {
			setInvoicedo(res.data);
			setFilteredInvoiceList(res.data);
			

			let tBodyTrList=document.querySelectorAll(".datatable tbody tr");

		for(let i=0;i<tBodyTrList.length;i++){
			tBodyTrList[i].remove();
		}

		let lFootTrList=document.querySelectorAll("#tableFooter tr");

		for(let i=0;i<lFootTrList.length;i++){
			lFootTrList[i].remove();
		}

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
		   allinvvals = allinvvals + parseInt(elem.invoiceValue);
		   setAllInvVal(allinvvals);


		   if(elem.invoiceStatus == "Paid")
		   {
		   paidinvs = paidinvs + 1;
		   setPaidInv(paidinvs);
		   paidinvvals = paidinvvals + parseInt(elem.invoiceValue);
		   setPaidInvVal(paidinvvals);
		   }
		   if(elem.invoiceStatus == "Overdue")
		   {
		   unpaidinvs = unpaidinvs + 1;
		   setUnPaidInv(unpaidinvs);
		   unpaidinvvals = unpaidinvvals + parseInt(elem.invoiceValue);
		   setUnpaidInvVal(unpaidinvvals);
		   }

		   if(elem.invoiceStatus == "Cancelled")
		   {
		   cancelinvs = cancelinvs + 1;
		   setCanInv(cancelinvs);
		   caninvvals = caninvvals + parseInt(elem.invoiceValue);
		   setCanInvVal(caninvvals);
		   }

            let trElem=document.createElement("tr");

			let tdElem = document.createElement("td");
			let textElem =  document.createTextNode(srNo);
			tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.invoiceNo );

            let aElem=document.createElement("a"); 
			aElem.className="invoice-link";
		    // aElem.href="/viewInvoiceTriplet?id="+elem.invoiceId;
			aElem.addEventListener('click',()=>{

                navigate(`/ViewQuotationTriplet?id=${elem.invoiceId}`);
            })
            aElem.appendChild(textElem); 
			tdElem.appendChild(aElem);
            trElem.appendChild(tdElem);

			

	

			tdElem=document.createElement("td");
			textElem=document.createTextNode(formatDate(elem.invoiceDate));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.customerName);
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem)
			
			tdElem=document.createElement("td");
            tdElem.className="text-primary textAlignEnd";
            textElem=document.createTextNode(accountingFormat(elem.invoiceValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary textAlignEnd";
            textElem=document.createTextNode(accountingFormat(elem.taxableValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary textAlignEnd";
            textElem=document.createTextNode(accountingFormat(elem.cgstValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);
			
			tdElem=document.createElement("td");
            tdElem.className="text-primary textAlignEnd";
            textElem=document.createTextNode(accountingFormat(elem.sgstValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary textAlignEnd";
            textElem=document.createTextNode(accountingFormat(elem.igstValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
			let spanElem=document.createElement("span")
			 
			 if(elem.invoiceStatus == "Paid" || elem.invoiceStatus =="" || elem.invoiceStatus == null)
			 spanElem.className="badge bg-success-light" 
			 if(elem.invoiceStatus == "Overdue")
			 spanElem.className="badge bg-danger-light";
			 if(elem.invoiceStatus == "Cancelled")
			 spanElem.className="badge bg-primary-light";
			 if(elem.invoiceStatus == "Draft")
			 spanElem.className="badge bg-warning";
 
 
			 textElem=document.createTextNode(elem.invoiceStatus);
 
			 spanElem.appendChild(textElem)
 
			 tdElem.appendChild(spanElem);
 
			 trElem.appendChild(tdElem)  
 

          

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
				aEle.addEventListener('click',(e)=>{
					rendercommon(e,ele.name,elem.invoiceId);
				})
				// aEle.setAttribute("Onclick","function demo(e){rendercommon(e,'"+ele.name+"','"+elem.invoiceId+"')}");
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
			
			let trElem = document.createElement("tr");
			trElem.style='background-color: #9292a6;'
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
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(allinvvals));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold ;text-align:end'
			 textElem=document.createTextNode(accountingFormat(subTotal));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(cgst));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(sgst));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold;text-align:end'
			 textElem=document.createTextNode(accountingFormat(igst));
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


		  axios.get("http://localhost:8080/getusersbyregistrid",header).then((res) => {
			console.log(res.data);
			res.data.map((a) => {
			var option = document.createElement("option");
			option.value = a.userId;
			option.append(document.createTextNode(a.userName));
			document.querySelector("#user").append(option);
				});
			}).catch((e)=>{
				console.log(e)
			  })


		axios.get("http://localhost:8080/getClientDOForUser",header)
        .then((res)=>{
          if(res.data!='client not found'){
            setClientDetails(res.data);
          }
        }).catch((e)=>{
            console.log(e)
          })

	// },3000)	
		
      }, []);

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

	  useEffect(() => {
		window.selectCustomer = (e) => {
			
		  };
		  window.rendercommon = (name , invno) => {
			rendercommon(this,name , invno);
		  }

	  });

	  
	  const navigate = useNavigate();
	  const rendertoInvPaid = () => {
		navigate("/InvoicesPaid", { state: invoicedo });
	  };
	  const rendertoInvOverDue = () => {
		navigate("/InvoicesOverDue", { state: invoicedo });
	  };
	  const rendertoInvDraft = () => {
		navigate("/InvoicesDraft", { state: invoicedo });
	  };
	  const rendertoInvRecur = () => {
		navigate("/invoicesRecurring", { state: invoicedo });
	  };
	  const rendertoInvCancl = () => {
		navigate("/InvoicesCancelled", { state: invoicedo });
	  };

	  function rendercommon(e,name , invt) {
         console.log("on click target value"+name+"invoice no :"+invt);
		 if(name == "Edit"){

			navigate(`/CreateQuotation?InvNo=${invt}&action=Edit`)
			// navigate("/add-invoice?InvNo="+invt+"&action=Edit");
		 }else if(name == "View" || name == "Print"){
			// navigate("/viewInvoiceTriplet?id="+invt,{state:{invoiceType:'GST'}});

                navigate(`/ViewQuotationTriplet?invNo=${invt}`);
		 }else if(name == "Delete"){
			axios.get(`http://localhost:8080/deleteQuo?QuoId=${invt}`,header).then((res) => {
		    console.log(res.data);
			if(res!=null && res.data.res=='sucess'){
				// alert("Invoice deleted successfully!!");	
				Swal.fire(
					'',
					'Invoice deleted successfully!!',
					'success'
				  )
				  //remving the deleted row from DOM
				  e.target.closest('tr').remove();
				}
				else
				//   alert("There is some issue delete invoice.");	
				  Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'There is some issue delete invoice.',
					footer: ''
				  })	   
		    });
		 } else if(name == "Cancel"){
			//old code
			// navigate("/InvoicesCancelled");
			
			//new code
			console.log(e)
			// axios.post("http://localhost:8080/cancelInvoice/"+invt,{},header).then((res)=>{
                debugger;
			axios.get(`http://localhost:8080/cancelQuotation?QuoId=${invt}`,header).then((res)=>{
				if(res!=null && res.data.res=='success'){
					Swal.fire(
						'',
						'Quotation cancelled successfully!!',
						'success'
					  )	

					  e.target.closest("tr").querySelector("td:nth-child(5)").innerText='0';

					  e.target.closest("tr").querySelector("td:nth-child(6)").innerText='0';

					  e.target.closest("tr").querySelector("td:nth-child(7)").innerText='0';

					  e.target.closest("tr").querySelector("td:nth-child(8)").innerText='0';

					  e.target.closest("tr").querySelector("td:nth-child(9)").innerText='0';
				}
				else{
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'There is some issue to cancel invoice',
						footer: ''
					  })	
				}
			}).catch((e)=>{
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'There is some issue to cancel invoice',
					footer: ''
				  })	
			})


		 }else if(name == "Send"){
					// axios.get("http://localhost:8080/sendmail?invNo="+invt+"&custName=Samarth Industries",header).then((res) => {
					// console.log(res.data);
					// if(res!=null && res.data.res=='sucess'){
						
					// 	Swal.fire(
					// 		'',
					// 		'Invoice mail send successfully!!',
					// 		'success'
					// 	  )	  
					// 	}
					// 	else	   

					// 	Swal.fire({
					// 		icon: 'error',
					// 		title: 'Oops...',
					// 		text: 'There is some issue to send invoice mail',
					// 		footer: ''
					// 	  })	
					navigate(`/ViewQuotation?invNo=${invt}&custName=Samarth Industries&action=send`);

					
				
		 } else if(name == "Copy"){
			 navigate(`/CreateQuotation?InvNo=${invt}&action=Clone`);
			 //comented temporarily	  
		/*			axios.get("http://localhost:8080/cloneInv?invNo="+invt,header).then((res) => {
					console.log(res.data);
					if(res!=null && res.data.res=='sucess'){
						// alert("Invoice Copied successfully!!");	

						 Swal.fire(
        '',
        'Invoice Copied successfully!!',
        'success'
      )
						}
						else
						// alert("There is some issue Copy invoice.");		
					
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'There is some issue Copy invoice.',
							footer: ''
						  })	
				}).catch(function(error) {
					console.log(error);
				});*/
		 }else if(name == "Download"){

			navigate(`/ViewQuotation?invNo=${invt}&action=download`);
			// navigate("/viewInvoice?id="+invt+"&action=download");

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

	  function onUserIdChange(e){
			setUserId(e.target.querySelector("option:checked").value);
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

	  function accountingFormat(val){
		// console.log(val+" "+toCurrency(fromCurrency(val)).replace(/[\$]/g,''));
		return  toCurrency(fromCurrency(val)).replace(/[\$]/g,'')
	  }
  

	  function onReportButtonClicked(e){
		exportToExcel();
	  }

	  function onReportButtonClickedOld(e){
		e.preventDefault();
		var data={
			customerName,
			userId,
			fromDate,
			toDate,
			status,
			category
		}
		axios.post('http://localhost:8080/excel/Quotations', data,{
			method: 'GET',
			responseType: 'blob', // important
			...header
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			// alert(url);	
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${Date.now()}.xlsx`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		});

		refreshDataTable(data);
	  }
	  function toCurrency(value) {
        try {
          if( isNaN(Number(value)) ) return value;
          return Number(value).toLocaleString("en-US",{style:"currency", currency:"USD"});    
        }
        catch(err) {
          throw err;
        }
      }
      function fromCurrency(value) {
        try {
          let num = Number(String(value).replace(/[\$,]/g,''));
          return isNaN(num) ? 0 : num;
        }
        catch(err) {
          throw err;
        }
      }
	  //This function is loading the filtered invoice data into datatable.
	  function refreshDataTable(data){
		
		//clearing table body
		document.querySelector(".invoicelisttable tbody").innerHTML='';

		//clearing table footer
		document.querySelector(".invoicelisttable tfoot").innerHTML=''


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
        axios.post("http://localhost:8080/getFilterInvoices",data,{
			...header
		}).then((res) => {
			setInvoicedo(res.data);
			filteredInvoiceList(res.data)
			
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
		   allinvvals = allinvvals + parseInt(elem.invoiceValue);
		   setAllInvVal(allinvvals);

				
		   if(elem.invoiceStatus == "Paid")
		   {
		   paidinvs = paidinvs + 1;
		   setPaidInv(paidinvs);
		   paidinvvals = paidinvvals + parseInt(elem.invoiceValue);
		   setPaidInvVal(paidinvvals);
		   }
		   if(elem.invoiceStatus == "Overdue")
		   {
		   unpaidinvs = unpaidinvs + 1;
		   setUnPaidInv(unpaidinvs);
		   unpaidinvvals = unpaidinvvals + parseInt(elem.invoiceValue);
		   setUnpaidInvVal(unpaidinvvals);
		   }

		   if(elem.invoiceStatus == "Cancelled")
		   {
		   cancelinvs = cancelinvs + 1;
		   setCanInv(cancelinvs);
		   caninvvals = caninvvals + parseInt(elem.invoiceValue);
		   setCanInvVal(caninvvals);
		   }

            let trElem=document.createElement("tr");

			let tdElem = document.createElement("td");
			let textElem =  document.createTextNode(srNo);
			tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem=document.createElement("td");
            textElem=document.createTextNode(elem.invoiceNo );//set data
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
			aElem.addEventListener('click',()=>{

                navigate(`/ViewQuotationTriplet?id=${elem.invoiceId}`);
            })
		    // aElem.href="/viewInvoiceTriplet?id="+elem.invoiceId;
            aElem.appendChild(textElem); 
			tdElem.appendChild(aElem);
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
            tdElem.className="text-primary";
            textElem=document.createTextNode(accountingFormat(elem.invoiceValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(accountingFormat(elem.taxableValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(accountingFormat(elem.cgstValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem);
			
			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(accountingFormat(elem.sgstValue));
            tdElem.appendChild(textElem);
            trElem.appendChild(tdElem); 

			tdElem=document.createElement("td");
            tdElem.className="text-primary";
            textElem=document.createTextNode(accountingFormat(elem.igstValue));
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
            
            tdElem=document.createElement("td");
           let spanElem=document.createElement("span")
            
			if(elem.invoiceStatus == "Paid" || elem.invoiceStatus =="" || elem.invoiceStatus == null)
            spanElem.className="badge bg-success-light" 
			if(elem.invoiceStatus == "Overdue")
			spanElem.className="badge bg-danger-light";
			if(elem.invoiceStatus == "Cancelled")
			spanElem.className="badge bg-primary-light";
		    if(elem.invoiceStatus == "Draft")
			spanElem.className="badge bg-warning";


            textElem=document.createTextNode(elem.invoiceStatus);

            spanElem.appendChild(textElem)

            tdElem.appendChild(spanElem);

            trElem.appendChild(tdElem)  

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
				aEle.addEventListener('click',(e)=>{
					rendercommon(e,ele.name,elem.invoiceId);
				})
				// aEle.setAttribute("Onclick","function demo(e){rendercommon(e,'"+ele.name+"','"+elem.invoiceId+"')}");
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

		console.log("all invoice:"+allinvvals+" paid invoice:"+paidinvvals);

          }).catch((e)=>{
			console.log(e)
		  }).finally(()=>{
			
			setPaidInvVal(paidinvvals);
			setPaidInv(paidinvs)

			setUnPaidInv(unpaidinvs);
			setUnpaidInvVal(unpaidinvvals);

			setCanInv(cancelinvs);
			setCanInvVal(caninvvals);

			let trElem = document.createElement("tr");
			trElem.style='background-color: #9292a6;'
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
			 textElem=document.createTextNode(accountingFormat(allinvvals));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(accountingFormat(subTotal));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(accountingFormat(cgst));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(accountingFormat(sgst));
			 tdElem.appendChild(textElem);
			trElem.appendChild(tdElem);

			tdElem = document.createElement("td");
			tdElem.style='color: #ffffff;font-weight:bold'
			 textElem=document.createTextNode(accountingFormat(igst));
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
			
	
			document.querySelector("#tableFooter").appendChild(trElem); 
			if (document.querySelector('.datatable') && document.querySelector('.datatable').length > 0) {
				document.querySelector('.datatable').DataTable({
					"bFilter": false,
				});
			}
			if (document.querySelector('.datatables') && document.querySelector('.datatables').length > 0) {
				document.querySelector('.datatables').DataTable({
					"bFilter": true,
				});
			}
		  })
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
									<ul class="app-listing" style={{justifyContent:'center'}}>
									<li>
											<div class="multipleSelection">
												{/* <div class="selectBox">
													<p class="mb-0"><i data-feather="user-plus" class="me-1 select-icon"></i> Select User</p>
													<span class="down-icon"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
												</div>	 */}
												 <span>
												{/*<i style={{position: "absolute",zIndex: "1",marginTop: "7%",marginLeft:"4%",color: "#9a55ff"}}data-feather="user-plus" class="me-1 select-icon"></i> */}
												<select class="form-control select2 invoiceListUserOption"
					                              name="product"	id="user" style={{width:'100%'}}>
												  <option  value="-1" >--Select User--</option>
												  </select>	</span>  

											</div>
										</li>


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
												  <option  value="-1" >--Select Customer--</option>
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
										<li style={{display:'none'}}>
                                <input
                                  className="form-control datetimepicker"
                                  type="text"
                                  placeholder="Select From Date"
								  id="fromDate"
                                //   value={invoiceDate}
                                //   id="invoiceDate"
                                  style={{ border: "1px solid #9a55ff", width: 120,height:'50px',color: "#9a55ff",display:'none'}}
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

										<li style={{display:'none'}}>
                                <input
                                  className="form-control datetimepicker"
                                  type="text"
                                  placeholder="Select To Date"
                                //   value={invoiceDate}
                                  id="toDate"
                                  style={{ border: "1px solid #9a55ff", width: 120,height:'50px',color: "#9a55ff",display:'none'}}/>
								  </li>

										<li>

										<select id="invoiceStatusOption"  style={{ border: "1px solid #9a55ff", width: '100%',color: "#9a55ff"}}>
											<option>--Select Status--</option>
											<option>Paid</option>
											<option>Overdue</option>

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
										<li style={{display:'none'}}>

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
										<div className="top-nav-search">
							<a href="javascript:void(0);" className="responsive-search">
								<i className="fa fa-search"></i>
						   </a>
							<form action="search.html" style={{marginTop:'0px',width:'95%'}}>
								<input className="form-control" type="text" placeholder="Search here" style={{height:'45px'}} onChange={(e)=>setSearchText(e.target.value)}/>
								<button className="btn" type="submit"><i className="fa fa-search"></i></button>
							</form>
						</div>
										</li>
										<li>
											<div class="report-btn" onClick={onReportButtonClicked} style={{padding:'0px'}}>
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
												
												<li><a href="#" class="active">All Quotations</a></li>
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
											<a href="/CreateQuotation" class="btn">
												<i data-feather="plus-circle"></i> New Quotation
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row d-flex align-items-stretch">
						<div class="col-xl-3 col-sm-6 col-12 ">
							<div class="card inovices-card" style={{height:'90%'}}>
								<div class="card-body">
									<div class="inovices-widget-header" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon1.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">&#8377;&nbsp;{accountingFormat(allInvVal)}</div>
										</div>
									</div>
									<p class="inovices-all" style={{fontSize:'18px',display:'flex',justifyContent:'space-evenly',alignItems:'end',flexWrap:'wrap'}}>All Quotations <div style={{fontSize:'15px'}}>{accountingFormat(allInv)}</div></p>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card" style={{height:'90%'}}>
								<div class="card-body">
									<div class="inovices-widget-header" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon2.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">&#8377;&nbsp;{accountingFormat(paidInvVal)}</div>
										</div>
									</div>
									<p class="inovices-all" style={{fontSize:'18px',display:'flex',justifyContent:'space-evenly',alignItems:'end',flexWrap:'wrap'}}>Paid Quotations <span style={{fontSize:'15px'}}>{accountingFormat(paidInv)}</span></p>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card" style={{height:'90%'}}>
								<div class="card-body">
									<div class="inovices-widget-header" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon3.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">&#8377;&nbsp;{accountingFormat(unpaidInvVal)}</div>
										</div>
									</div>
									<p class="inovices-all" style={{fontSize:'18px',display:'flex',justifyContent:'space-evenly',alignItems:'end',flexWrap:'wrap'}}>Unpaid Quotations <span style={{fontSize:'15px'}}>{accountingFormat(unPaidInv)}</span></p>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-sm-6 col-12">
							<div class="card inovices-card" style={{height:'90%'}}>
								<div class="card-body">
									<div class="inovices-widget-header" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
										<span class="inovices-widget-icon">
											<img src="assets/img/invoices-icon4.svg" alt=""/>
										</span>
										<div class="inovices-dash-count">
											<div class="inovices-amount">&#8377;&nbsp;{accountingFormat(canInvVal)}</div>
										</div>
									</div>
									<p class="inovices-all" style={{fontSize:'16px',display:'flex',justifyContent:'space-around',alignItems:'end',flexWrap:'wrap'}}>Cancelled Quotations <span style={{fontSize:'14px'}}>{accountingFormat(canInv)}</span></p>
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
												<tr style={{background: "linear-gradient(90deg, rgba(67,203,255,1) 25%, rgba(151,8,204,1) 100%)",color:"white"}}>
													<th>Sr No</th>
													<th>Quotation No</th>
													<th>Date</th>
												    <th>Customer Name</th>
												    <th>Gross Total</th>
												    <th>Sub Total</th>
												    <th>CGST</th>
												    <th>SGST</th>
												    <th>IGST</th>
													<th>Status</th>
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