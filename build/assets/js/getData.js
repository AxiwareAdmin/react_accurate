// $(document).ready(function(){  
// 	// code to get all records from table via select box
// 	$("#custname").change(function() {    
// 		var id = $(this).find(":selected").val();
// 		var dataString = 'custid='+ id;    
// 		$.ajax({
// 			url: 'getcustdata.php',
// 			dataType: "json",
// 			data: dataString,  
// 			cache: false,
// 			success: function(data) {
// 			   if(data) {
// 					$("#heading").show();		  
// 					$("#no_records").hide();
//                     // $("#invoice-info").removeClass('hidden');				
// 					$("#custid").text(data.Customer_Id);
// 					$("#custname").text(data.Customer_Name);
// 					$("#custadd").text(data.Address1);
// 					$("#records").show();		 
// 				} else {

//                     // $("#invoice-info").addClass('hidden');
// 					$("#heading").hide();
// 					$("#records").hide();
// 					$("#no_records").show();
// 				}   	
// 			} 
// 		});
//  	}) 
// });


