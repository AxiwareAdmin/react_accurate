
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar"
import Navbar from "../Navbar";
import axios from "axios";
import { Navigate, useAsyncError,useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DocumentSequence() {

    const navigate=useNavigate();

    var token=localStorage.getItem("token");

    var headers={
        "Content-Type":"application/json",
        "Authorization":'Bearer '+token
      };


    const[Mode , setMode] = useState(["Auto","Manual"]);
    useEffect(() =>{

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

    },[]);

    const [selectedIndex,setSelectedIndex]=useState("");
    const [documentId , setDocumentId] = useState("");
    const [documentName , setDocumentName] = useState("");
    const [prefix1 , setPrefix1] = useState("");
    const [prefix2 , setPrefix2] = useState("");
    const [series , setSeries] = useState("001");
    const [modeVal , setModeVal] = useState("Auto");
    const [status , setStatus] = useState("");
    const [delDocId , setDelDocId] = useState("");
    const [delShow , setDelShow] = useState(true);
   
    useEffect(() =>{
            debugger;
        axios
        .get("http://localhost:8080/getDocMaster",{
            headers:headers
        })
        .then((res) => {
            debugger;
                res.data.map((elem , index) =>{   
                       let trEle = document.createElement("tr");
                            trEle.role = "row";
                            if(index % 2 == 0){
                            trEle.className="even";
                            }else{
                                trEle.className="odd";
                            }
                        let tdEle = document.createElement("td");
                          tdEle.className="sorting_1";
                        let textEle = document.createTextNode(index+1);
                        let spanElem=document.createElement("span");
                        spanElem.id="srNo"
                        spanElem.appendChild(textEle)
                        tdEle.appendChild(spanElem);
                        trEle.appendChild(tdEle);

                        tdEle = document.createElement("td");
                        spanElem=document.createElement("span");
                        textEle = document.createTextNode(elem.documentName);
                        let inputEle = document.createElement("input");
                        inputEle.type="hidden";
                        inputEle.id = "documentId"+index;
                        inputEle.value=elem.documentSeqId;
                        tdEle.appendChild(inputEle);
                        inputEle = document.createElement("input");
                        inputEle.type="hidden";
                        inputEle.id = "documentName"+index;
                        inputEle.value=elem.documentName;
                        tdEle.appendChild(inputEle);
                        spanElem.id="spandocumentName"+index
                        spanElem.appendChild(textEle)
                        tdEle.appendChild(spanElem);
                        trEle.appendChild(tdEle);

                        tdEle = document.createElement("td");
                        textEle = document.createTextNode(elem.prefix1);
                        inputEle = document.createElement("input");
                        inputEle.type="hidden";
                        inputEle.id = "prefix1"+index;
                        inputEle.value=elem.prefix1;
                        tdEle.appendChild(inputEle);
                        spanElem=document.createElement("span");
                        spanElem.id="spanprefix1"+index;
                        spanElem.appendChild(textEle)
                        tdEle.appendChild(spanElem);
                        trEle.appendChild(tdEle);
                        
                        tdEle = document.createElement("td");
                        textEle = document.createTextNode(elem.prefix2);
                        inputEle = document.createElement("input");
                        inputEle.type="hidden";
                        inputEle.id = "prefix2"+index;
                        inputEle.value=elem.prefix2;
                        tdEle.appendChild(inputEle);
                        spanElem=document.createElement("span");
                        spanElem.id="spanprefix2"+index;
                        spanElem.appendChild(textEle)
                        tdEle.appendChild(spanElem);
                        trEle.appendChild(tdEle);

                        tdEle = document.createElement("td");
                        textEle = document.createTextNode(elem.series);
                        inputEle = document.createElement("input");
                        inputEle.type="hidden";
                        inputEle.id = "series"+index;
                        inputEle.value=elem.series;
                        tdEle.appendChild(inputEle);
                        spanElem=document.createElement("span");
                        spanElem.id="spanseries"+index;
                        spanElem.appendChild(textEle)
                        tdEle.appendChild(spanElem);
                        trEle.appendChild(tdEle);

                        tdEle = document.createElement("td");
                        textEle = document.createTextNode(elem.mode);
                        inputEle = document.createElement("input");
                        inputEle.type="hidden";
                        inputEle.id = "mode"+index;
                        inputEle.value=elem.mode;
                        tdEle.appendChild(inputEle);
                        spanElem=document.createElement("span");
                        spanElem.id="spanmode"+index;
                        spanElem.appendChild(textEle)
                        tdEle.appendChild(spanElem);
                        trEle.appendChild(tdEle);

                        tdEle = document.createElement("td");
                        let divEle = document.createElement("div");
                        divEle.className="status-toggle";
                        inputEle = document.createElement("input");
                        inputEle.id="rating_1"+index;
                        inputEle.type = "checkbox";
                        inputEle.className = "check";
                        inputEle.value=elem.isActive==1?1:0;
                        inputEle.checked=elem.isActive==1?"true":"";
                        let lableEle = document.createElement("label");
                        lableEle.for="rating_2";
                        lableEle.className = "checktoggle checkbox-bg";
                        textEle = document.createTextNode("checkbox");
                        lableEle.appendChild(textEle);
                        divEle.appendChild(inputEle);
                        divEle.appendChild(lableEle);
                        tdEle.appendChild(divEle);
                        trEle.appendChild(tdEle);

                        tdEle = document.createElement("td");
                        tdEle.className = "text-end";
                        let aEle = document.createElement("a");
                        aEle.className="table-action-btn btn btn-sm bg-success-light";
                        aEle.setAttribute("data-bs-toggle","modal");
                        aEle.setAttribute("data-bs-target","#edit-blog-categories");
                        aEle.setAttribute("Onclick","EditDocument('"+index+"')");
                        let iEle = document.createElement("i");
                        iEle.className="feather-edit-3 me-1";
                        textEle = document.createTextNode("Edit");
                        aEle.appendChild(iEle);
                        aEle.appendChild(textEle);
                        tdEle.appendChild(aEle);

                        aEle = document.createElement("a");
                        aEle.className="table-action-btn btn btn-sm bg-danger-light";
                        aEle.setAttribute("data-bs-toggle","modal");
                        aEle.setAttribute("data-bs-target","#deleteModal");
                        aEle.setAttribute("Onclick","setDocIdForDel('"+elem.documentSeqId+"')");
                        iEle = document.createElement("i");
                        iEle.className="feather-trash-2 me-1";
                        textEle = document.createTextNode("Delete");
                        aEle.appendChild(iEle);
                        aEle.appendChild(textEle);
                        tdEle.appendChild(aEle);
                        
                        trEle.appendChild(tdEle);


                        document.querySelector("#documentmastertable").appendChild(trEle);

                });

        }).catch(function(error){
            console.log(error);
        })

    },[]);

    useEffect (() =>{

        window.EditDocument = (index) => {
			EditDocument(index);
		  }

          window.deleteDoc = () => {
			deleteDoc();
		  }

          window.setDocIdForDel = (tempDocId) => {
			setDocIdForDel(tempDocId);
		  }
          

          

    },[]);

    function EditDocument (index){

        console.log("clicked index::"+index);
        setSelectedIndex(index);
        setDocumentId(document.querySelector("#documentId"+index).value);
        setDocumentName(document.querySelector("#documentName"+index).value);
        setPrefix1(document.querySelector("#prefix1"+index).value);
        setPrefix2(document.querySelector("#prefix2"+index).value);
        setSeries(document.querySelector("#series"+index).value);
        setModeVal(document.querySelector("#mode"+index).value)
        setStatus(document.querySelector("#rating_1"+index).value);

        const text = document.querySelector("#mode"+index).value;
        const $select = document.querySelector('#modeedit');
        const $options = Array.from($select.options);
        const optionToSelect = $options.find(item => item.text ===text);
        $select.value = optionToSelect.value;

        


    }

    function onStatusClick(e){

        // var status=document.querySelector("#rating_2");

        // console.log("status:"+status.checked);

        // // console.log("switch:"+document.querySelector("#flexSwitchCheckChecked").checked);
        // debugger;

        // if(status.checked==false){
        //         // status.checked=true;

        //         // document.querySelector("#flexSwitchCheckChecked").checked=false;
        //         // setStatus(1);
        // }else{
        //         // status.checked=false;

        //         // document.querySelector("#flexSwitchCheckChecked").checked=true;
        //         // setStatus(0);
        // }


        if(status==0){
            setStatus(1);
        }
        else{
            setStatus(0);
        }
    }

    function save(){

        if(documentName == null || documentName == "" || documentName == undefined){
            validations("Please Enter Document Name.");
       }else if(prefix1 == null || prefix1 == "" || prefix1 == undefined){
           validations("Please Enter prefix1");
       }else if(prefix2 == null || prefix2 == "" || prefix2 == undefined ){
           validations("Please Enter prefix2");
       }else if(series == null || series == "" || series == undefined){
           validations("Please Enter series");
       }else{

        let documentdata = {
            DocumentId : documentId,
            DocumentName : documentName,
            Prefix1 : prefix1,
            Prefix2 : prefix2,
            Series : series,
            ModeVal : modeVal,
            Status : status

        }
       
    

    axios.post('http://localhost:8080/saveDocMaster', documentdata,{
        headers:headers
      })
      .then(function (response) {
        console.log(response)
        if(response!=null && response.data.res=='success'){
        // props.onAlertChange("Invoice created successfully!!")
        // setIsSaved(1);  
        // setTimeout(()=>{
        //   props.onAlertChange(null)
        // },2000)
        alert("Document master created or Updated successfully!!");
debugger;
        document.querySelector("#spandocumentName"+selectedIndex).innerText=documentName;
        document.querySelector("#spanprefix1"+selectedIndex).innerText=prefix1;
        document.querySelector("#spanprefix2"+selectedIndex).innerText=prefix2;
        document.querySelector("#spanseries"+selectedIndex).innerText=series;
        document.querySelector("#spanmode"+selectedIndex).innerText=modeVal;

        document.querySelector("#documentName"+selectedIndex).innerText=documentName;
        document.querySelector("#prefix1"+selectedIndex).value=prefix1;
        document.querySelector("#prefix2"+selectedIndex).value=prefix2;
        document.querySelector("#series"+selectedIndex).value=series;
        document.querySelector("#mode"+selectedIndex).value=modeVal;


        document.querySelector("#rating_1"+selectedIndex).checked=status==1?true:false;

        document.querySelector("#rating_1"+selectedIndex).value=status;

        }
        else
          alert("There is some issue created or Updated document master. kindly check wherether all the data is entered or not.")
      })
      .catch(function (error) {
        console.log(error);
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

    function setDocIdForDel(tempDocId){
        console.log("before set doc id ::"+tempDocId);
        setDelShow(false);
        setDelDocId(tempDocId);
    }

    function deleteDoc(){
        //setDelShow(true);
        axios.get("http://localhost:8080/deleteDocMaster?docId="+delDocId).then((res) => {
		    console.log(res.data);
			if(res!=null && res.data.res=='sucess'){
                // setTimeout(()=>{
                    alert("Document deleted successfully!!");
                //   },2000)
						  
				}
				else
                {
                    // setTimeout(()=>{
                        alert("There is some issue delete Document.");
                    //   },2000)
                }
				 		   
		    });
    }

    return(
        <div>
            <Navbar/>
            <Sidebar/>

            <div class="page-wrapper" style={{minHeight:"288px"}}>
                <div class="content container-fluid">
			
                    {/* <!-- Page Header --> */}
                    <div class="page-header">
                        <div class="row">
                            <div class="col">
                                <h3 class="page-title">Categories</h3>
                            </div>
                            <div class="col-auto text-end">
                                <a href="#" class="btn btn-primary btn-blog mb-3" data-bs-toggle="modal" data-bs-target="#blog-categories"><i class="feather-plus-circle me-1"></i> Add New</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Page Header --> */}
                    
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card categories-table">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                           
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    
                                            <table class="table custom-table mb-0 datatables dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                           
                                            <thead>
                                                <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending" style={{width: "35.1771px"}}>#</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Document: activate to sort column ascending" style={{width: "98.6979px"}}>Document</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Prefix-1: activate to sort column ascending" style={{width: "70.9271px"}}>Prefix-1</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Prefix-2: activate to sort column ascending" style={{width: "72.0833px"}}>Prefix-2</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Start Series: activate to sort column ascending" style={{width: "93.5208px"}}>Start Series</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Mode: activate to sort column ascending" style={{width: "37.875px"}}>Mode</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style={{width: "44.0312px"}}>Status</th><th class="text-end sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{width: "146.688px"}}>Action</th></tr>
                                            </thead>
                                            <tbody id="documentmastertable">         
                                            {/* <tr role="row" class="odd">
                                                    <td class="sorting_1">1</td>
                                                    <td>Invoice</td>
                                                    <td>INV</td>
                                                    <td>2023-24</td>
                                                    <td>001</td>
                                                    <td>Auto</td>
                                                    <td>
                                                        <div class="status-toggle">
                                                           
                                                             <input id="rating_1" class="check" type="checkbox" checked=""/>
                                                            <label for="rating_1" class="checktoggle checkbox-bg">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="table-action-btn btn btn-sm bg-success-light" data-bs-toggle="modal" data-bs-target="#edit-blog-categories">
                                                            <i class="feather-edit-3 me-1"></i> Edit
                                                        </a>
                                                        <a href="#" class="table-action-btn btn btn-sm bg-danger-light" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                            <i class="feather-trash-2 me-1"></i> Delete
                                                        </a>
                                                    </td>
                                                </tr><tr role="row" class="even">
                                                    <td class="sorting_1">2</td>
                                                    <td>Proforma Invoice</td>
                                                    <td>PI</td>
                                                    <td>2023-24</td>
                                                    <td>001</td>
                                                    <td>Auto</td>
                                                    <td>
                                                        <div class="status-toggle">
                                                            <input id="rating_2" class="check" type="checkbox"/>
                                                            <label for="rating_2" class="checktoggle checkbox-bg">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="table-action-btn btn btn-sm bg-success-light" data-bs-toggle="modal" data-bs-target="#edit-blog-categories">
                                                            <i class="feather-edit-3 me-1"></i> Edit
                                                        </a>
                                                        <a href="#" class="table-action-btn btn btn-sm bg-danger-light" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                            <i class="feather-trash-2 me-1"></i> Delete
                                                        </a>
                                                    </td>
                                                 </tr> */}
                                               
                                                </tbody>
                                        </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 8 of 8 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* <!-- modal --> */}
        <div class="modal custom-modal fade bank-details" id="blog-categories" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="form-header text-start mb-0">
                            <h4 class="mb-0 text-dark fw-bold">Add Category</h4>
                        </div>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="bank-inner-details">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Document Name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" onChange={e => setDocumentName(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Mode<span class="text-danger">*</span></label>
                                        {/* <input type="text" class="form-control"/> */}
                                        <select onChange={e => setModeVal(e.target.value)} id="mode" class="form-control select2"  name="mode">
                                            {Mode.map((val,key)=>{
                                            return (<option value={val}>{val}</option>)
                                            })}
                                            </select>
                                        <small class="form-text text-muted"> (If you leave it empty, it will be generated automatically.)</small>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Prefix-1 <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" onChange={e => setPrefix1(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Prefix-2<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" onChange={e=> setPrefix2(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Order<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" onChange={e=>setSeries(e.target.value)}/>
                                    </div>
                                </div>

                           
                                <div class="form-group">
                                    <label>Status</label>
                                    <div class="status-toggle">
                                        <input id="rating_1" class="check" type="checkbox" checked/>
                                        <label for="rating_1" class="checktoggle checkbox-bg ">checkbox</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer blog-categories-btn">
                        <div class="bank-details-btn ">
                            <a href="javascript:void(0);" onClick={save} data-bs-dismiss="modal" class="btn btn-primary me-2">Add Category</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- modal --> */}
        <div class="modal custom-modal fade bank-details" id="edit-blog-categories" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="form-header text-start mb-0">
                            <h4 class="mb-0 text-dark fw-bold">Edit Category</h4>
                        </div>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="bank-inner-details">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Document Name<span class="text-danger">*</span></label>
                                        <input type="hidden" class="form-control" value={documentId} onChange={e=>setDocumentId(e.target.value)}/>
                                        <input type="text" class="form-control" value={documentName} onChange={e=>setDocumentName(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Mode<span class="text-danger">*</span></label>
                                        {/* <input type="text" class="form-control" value="Productivity"/> */}
                                        <select id="modeedit" class="form-control select2"  name="mode" onChange={e=>setModeVal(e.target.value)}>
                                            {Mode.map((val,key)=>{
                                            return (<option value={val}>{val}</option>)
                                            })}
                                            </select>
                                        <small class="form-text text-muted"> (If you leave it empty, it will be generated automatically.)</small>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Prefix1 <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" value={prefix1} onChange={e=>setPrefix1(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Prefix2<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" value={prefix2} onChange={e=>setPrefix2(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label>Order<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" value={series} onChange={e=>setSeries(e.target.value)}/>
                                    </div>
                                </div>
  
 

                                <div class="form-group">
                                    <label>Status</label>
                                    <div class="status-toggle">
                                        <input id="rating_2" class="check"  type="checkbox" checked={status==1?true:false}  onClick={onStatusClick}/>
                                        <label for="rating_2" class="checktoggle checkbox-bg ">checkbox</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer blog-categories-btn">
                        <div class="bank-details-btn ">
                            <a href="javascript:void(0);" onClick={save} data-bs-dismiss="modal" class="btn btn-primary me-2">Edit Category</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
		{/* <!-- Modal -->style={delShow ? {display:"none"} : {display : "block"}} */}
		<div class="modal fade contentmodal"  id="deleteModal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content doctor-profile">
					<div class="modal-header pb-0 border-bottom-0  justify-content-end">
						<button type="button" class="close-btn" data-bs-dismiss="modal" aria-label="Close"><i class="feather-x-circle"></i></button>
					</div>
					<div class="modal-body">
						<div class="delete-wrap text-center">
							<div class="del-icon"><i class="feather-x-circle"></i></div>
							<h2>Sure you want to delete</h2>
							<div class="submit-section">
								<a href="#" onClick={deleteDoc} data-bs-dismiss="modal" class="btn btn-success me-2">Yes</a>
								<a href="#" class="btn btn-danger" data-bs-dismiss="modal">No</a>
							</div>								
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* <!-- /Modal -->			 */}
	</div>
    </div>
    );
}