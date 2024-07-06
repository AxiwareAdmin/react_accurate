/*
Author       : Dreamguys
Template Name: CRMS - Bootstrap Admin Template
Version      : 1.0
*/
$(document).ready(function() {

    // Variables declarations

    var $wrapper = $('.main-wrapper');
    var $pageWrapper = $('.page-wrapper');
    var $slimScrolls = $('.slimscroll');
    // Sidebar

    
   //loader script
  $('.contentPost').removeClass('none');
       $('.contentPost');
       setTimeout(function () {
           $('.contentPost').addClass('none');
       }, 2000);
   
      
    var Sidemenu = function() {
        this.$menuItem = $('#sidebar-menu a');
    };

    function init() {
        var $this = Sidemenu;
        $('#sidebar-menu a').on('click', function(e) {
            // e.preventDefault()
            // e.stopImmediatePropagation();
            if ($(this).parent().hasClass('submenu')) {
                e.preventDefault();
            }
            if (!$(this).hasClass('subdrop')) {
                $('.sub-menus', $(this).parents('.sub-menus:first')).slideUp(350);
                $('a', $(this).parents('.sub-menus:first')).removeClass('subdrop');
                $(this).next('.sub-menus').slideDown(350);
                $(this).addClass('subdrop');
            } else if ($(this).hasClass('subdrop')) {
                $(this).removeClass('subdrop');
                $(this).next('.sub-menus').slideUp(350);
            }
        });
        $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
    }

    // Sidebar Initiate
    init();

 // Mobile menu sidebar overlay

 $('body').append('<div class="sidebar-overlay"></div>');
 $(document).on('click', '#mobile_btn', function(e) {
     e.stopImmediatePropagation();
     $wrapper.toggleClass('slide-nav');
     $('.sidebar-overlay').toggleClass('opened');
     $('html').addClass('menu-opened');
     $('#task_window').removeClass('opened');
     return false;
 });

 $(".sidebar-overlay").on("click", function(e) {
     e.stopImmediatePropagation();
     $('html').removeClass('menu-opened');
     $(this).removeClass('opened');
     $wrapper.removeClass('slide-nav');
     $('.sidebar-overlay').removeClass('opened');
     $('#task_window').removeClass('opened');
 });

// Chat sidebar overlay

 $(document).on('click', '#task_chat', function(e) {
     e.stopImmediatePropagation();
     $('.sidebar-overlay').toggleClass('opened');
     $('#task_window').addClass('opened');
     return false;
 });

 // Select 2
 if ($('[data-feather]').length > 0) {
 feather.replace();
 }
 if ($('.select').length > 0) {
     $('.select').select2({
         minimumResultsForSearch: -1,
         width: '100%'
     });
 }

// Modal Popup hide show

 if ($('.modal').length > 0) {
     var modalUniqueClass = ".modal";
     $('.modal').on('show.bs.modal', function(e) {
         var $element = $(this);
         var $uniques = $(modalUniqueClass + ':visible').not($(this));
         if ($uniques.length) {
             $uniques.modal('hide');
             $uniques.one('hidden.bs.modal', function(e) {
                 $element.modal('show');
             });
             return false;
         }
     });
 }

 // Floating Label

 if ($('.floating').length > 0) {
     $('.floating').on('focus blur', function(e) {
         e.stopImmediatePropagation();
         $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
     }).trigger('blur');
 }

 // Sidebar Slimscroll

 if ($slimScrolls.length > 0) {
     $slimScrolls.slimScroll({
         height: 'auto',
         width: '100%',
         position: 'right',
         size: '7px',
         color: '#ccc',
         wheelStep: 10,
         touchScrollStep: 100
     });
     var wHeight = $(window).height() - 60;
     $slimScrolls.height(wHeight);
     $('.sidebar .slimScrollDiv').height(wHeight);
     $(window).resize(function() {
         var rHeight = $(window).height() - 60;
         $slimScrolls.height(rHeight);
         $('.sidebar .slimScrollDiv').height(rHeight);
     });
 }

 // Page Content Height

 var pHeight = $(window).height();
 $pageWrapper.css('min-height', pHeight);
 $(window).resize(function() {
     var prHeight = $(window).height();
     $pageWrapper.css('min-height', prHeight);
 });
   // Page Content Height Resize
 $(window).resize(function () {
     if ($('.page-wrapper').length > 0) {
         var height = $(window).height();
         $(".page-wrapper").css("min-height", height);
     }
 });
 // Date Time Picker

 if ($('.datetimepicker').length > 0) {
     $('.datetimepicker').datetimepicker({
         format: 'DD/MM/YYYY',
         icons: {
             up: "fa fa-angle-up",
             down: "fa fa-angle-down",
             next: 'fa fa-angle-right',
             previous: 'fa fa-angle-left'
         }
     });
 }

 // Logo Hide Btn

 $(document).on("click",".logo-hide-btn",function (e) {
     e.stopImmediatePropagation();
     $(this).parent().hide();
 });
 

 // Datatable

 setTimeout(()=>{


 if ($('.datatable').length > 0) {
     $('.datatable').DataTable({
         "bFilter": false,
     });
 }
 if ($('.datatables').length > 0) {
     $('.datatables').DataTable({
         "bFilter": true,
     });
 }
},2000)
 

 // Tooltip

 if ($('[data-bs-toggle="tooltip"]').length > 0) {
     $('[data-bs-toggle="tooltip"]').tooltip();
 }

 // Email Inbox

 if ($('.clickable-row').length > 0) {
     $('.clickable-row').on('click', function(e) {
         e.stopImmediatePropagation();
         window.location = $(this).data("href");
     });
 }


 if ($('.clickable-row').length > 0) {
     $('.clickable-row').on('click', function(e) {
         e.stopImmediatePropagation();
         window.location = $(this).data("href");
     });
 }
 // Check all email

 $(document).on('click', '#check_all', function(e) {
     e.stopImmediatePropagation();
     $('.checkmail').click();
     return false;
 });
 if ($('.checkmail').length > 0) {
     $('.checkmail').each(function() {
         $(this).on('click', function(e) {
             e.stopImmediatePropagation();
             if ($(this).closest('tr').hasClass('checked')) {
                 $(this).closest('tr').removeClass('checked');
             } else {
                 $(this).closest('tr').addClass('checked');
             }
         });
     });
 }

 // Mail important

 $(document).on('click', '.mail-important', function(e) {
     e.stopImmediatePropagation();
     $(this).find('i.fa').toggleClass('fa-star').toggleClass('fa-star-o');
 });

 // Summernote

 if ($('.summernote').length > 0) {
     $('.summernote').summernote({
         height: 200, // set editor height
         minHeight: null, // set minimum height of editor
         maxHeight: null, // set maximum height of editor
         focus: false // set focus to editable area after initializing summernote
     });
 }

 // editor
 if ($('#editor').length > 0) {
     ClassicEditor
     .create( document.querySelector( '#editor' ), {
         toolbar: {
             items: [
                 'heading', '|',
                 'fontfamily', 'fontsize', '|',
                 'alignment', '|',
                 'fontColor', 'fontBackgroundColor', '|',
                 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                 'link', '|',
                 'outdent', 'indent', '|',
                 'bulletedList', 'numberedList', 'todoList', '|',
                 'code', 'codeBlock', '|',
                 'insertTable', '|',
                 'uploadImage', 'blockQuote', '|',
                 'undo', 'redo'
             ],
             shouldNotGroupWhenFull: true
         }
     } )
     .then( editor => {
         window.editor = editor;
     } )
     .catch( err => {
         console.error( err.stack );
     } );
 }

 // Task Complete

 $(document).on('click', '#task_complete', function(e) {
     e.stopImmediatePropagation();
     $(this).toggleClass('task-completed');
     return false;
 });

 // Multiselect

 if ($('#customleave_select').length > 0) {
     $('#customleave_select').multiselect();
 }
 if ($('#edit_customleave_select').length > 0) {
     $('#edit_customleave_select').multiselect();
 }

 // Leave Settings button show

 $(document).on('click', '.leave-edit-btn', function(e) {
     e.stopImmediatePropagation();
     $(this).removeClass('leave-edit-btn').addClass('btn btn-white leave-cancel-btn').text('Cancel');
     $(this).closest("div.leave-right").append('<button class="btn btn-primary leave-save-btn" type="submit">Save</button>');
     $(this).parent().parent().find("input").prop('disabled', false);
     return false;
 });
 $(document).on('click', '.leave-cancel-btn', function(e) {
     e.stopImmediatePropagation();
     $(this).removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
     $(this).closest("div.leave-right").find(".leave-save-btn").remove();
     $(this).parent().parent().find("input").prop('disabled', true);
     return false;
 });

 $(document).on('change', '.leave-box .onoffswitch-checkbox', function(e) {
     e.stopImmediatePropagation();
     var id = $(this).attr('id').split('_')[1];
     if ($(this).prop("checked") == true) {
         $("#leave_" + id + " .leave-edit-btn").prop('disabled', false);
         $("#leave_" + id + " .leave-action .btn").prop('disabled', false);
     } else {
         $("#leave_" + id + " .leave-action .btn").prop('disabled', true);
         $("#leave_" + id + " .leave-cancel-btn").parent().parent().find("input").prop('disabled', true);
         $("#leave_" + id + " .leave-cancel-btn").closest("div.leave-right").find(".leave-save-btn").remove();
         $("#leave_" + id + " .leave-cancel-btn").removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
         $("#leave_" + id + " .leave-edit-btn").prop('disabled', true);
     }
 });

 $('.leave-box .onoffswitch-checkbox').each(function() {
     var id = $(this).attr('id').split('_')[1];
     if ($(this).prop("checked") == true) {
         $("#leave_" + id + " .leave-edit-btn").prop('disabled', false);
         $("#leave_" + id + " .leave-action .btn").prop('disabled', false);
     } else {
         $("#leave_" + id + " .leave-action .btn").prop('disabled', true);
         $("#leave_" + id + " .leave-cancel-btn").parent().parent().find("input").prop('disabled', true);
         $("#leave_" + id + " .leave-cancel-btn").closest("div.leave-right").find(".leave-save-btn").remove();
         $("#leave_" + id + " .leave-cancel-btn").removeClass('btn btn-white leave-cancel-btn').addClass('leave-edit-btn').text('Edit');
         $("#leave_" + id + " .leave-edit-btn").prop('disabled', true);
     }
 });

 // Placeholder Hide

 if ($('.otp-input, .zipcode-input input, .noborder-input input').length > 0) {
     $('.otp-input, .zipcode-input input, .noborder-input input').focus(function(e) {
         e.stopImmediatePropagation();
         $(this).data('placeholder', $(this).attr('placeholder'))
             .attr('placeholder', '');
     }).blur(function(e) {
         e.stopImmediatePropagation();
         $(this).attr('placeholder', $(this).data('placeholder'));
     });
 }

 // OTP Input

 if ($('.otp-input').length > 0) {
     $(".otp-input").keyup(function(e) {
         e.stopImmediatePropagation();
         if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
             $(e.target).next('.otp-input').focus();
         } else if (e.which == 8) {
             $(e.target).prev('.otp-input').focus();
         }
     });
 }
 $(".links-info-discount").on('click','.service-trash-one', function (e) {
     e.stopImmediatePropagation();
     $(this).closest('.links-cont-discount').remove();
     return false;
 });
 $(document).on("click",".add-links-one",function (e) {
     e.stopImmediatePropagation();
     var experiencecontent = '<div class="links-cont-discount">' +
         '<div class="service-amount">' +
             '<a href="#" class="service-trash-one"><i class="fa fa-minus-circle me-1"></i>Discount</a> <span>$ 0 %</span' +
         '</div>' +
     '</div>';
     
     $(".links-info-discount").append(experiencecontent);
     return false;
 });



 $(document).on("click",".add-links",function  (e) {
     e.stopImmediatePropagation();
     var experiencecontent = '<div class="links-cont">' +
         '<div class="service-amount">' +
             '<a href="#" class="service-trash"><i class="fe fe-minus-circle me-1"></i>Transport Charges</a> <span>$ 4</span' +
         '</div>' +

        
     '</div>';
     
     $(".links-info-one").append(experiencecontent);
     return false;
 });

  $(".links-info-discount").on('click','.service-trash-one', function (e) {
     e.stopImmediatePropagation();
     $(this).closest('.links-cont-discount').remove();
     return false;
 });

 // Invoices Table Add More
 
 $(".add-table-items").on('click','.remove-btn', function (e) {
     e.stopImmediatePropagation();
     let tr=$(this).closest('.add-row');
     let prodTrId=tr.querySelector("#productId").value;
     window.removeTr(prodTrId);
     $(this).closest('.add-row').remove();
     return false;
 });

// Invoices Table Add More
 
$(".add-table-items").on('click','.remove-btn', function (e) {
 e.stopImmediatePropagation();
 let tr=$(this).closest('.add-row');
     let prodTrId=tr.querySelector("#productId").value;
     window.removeTr(prodTrId);
 $(this).closest('.').remove();
 return false;
});

 $(document).on("click",".",function (e) {
     e.stopImmediatePropagation();
     var experiencecontent = '<tr class="">' +
         '<td>' +
             '<select class="selectBox form-control" name="ProductName" id="Product_Id"  onchange="selectProduct()"> <option value="$show[Product_Id] $show[Product_Id]"</option></select>'
         +
         
         '</td>' +
         '<td>' +
             '<input type="text" class="form-control">' +
         '</td>' +
         '<td>' +
             '<input type="text" class="form-control">' +
         '</td>' +
         '<td>' +
             '<input type="text" class="form-control">' +
         '</td>' +
         '<td>' +
             '<input type="text" class="form-control">' +
         '</td>' +
         '<td>' +
             '<input type="text" class="form-control">' +
         '</td>' +
         '<td>' +
             '<input type="text" class="form-control">' +
         '</td>' +
         '<td>' +
         '<input type="text" class="form-control">' +
     '</td>' +
     '<td>' +
         '<input type="text" class="form-control">' +
     '</td>' +
         '<td class="add-remove text-end">' +
         ' <a href="javascript:void(0);" class="add-btns me-2"><i class="fas fa-plus-circle"></i></a> ' +
         '<a href="#" className="copy-btn me-2"><i className="fas fa-cart-plus" style={{color:"navy"}} onClick="(e)=>{window.AddProductDetails(e)}"></i></a>'+
         '<a href="javascript:void(0);" class="remove-btn"><i class="fa fa-trash-alt"></i></a>' +
         '</td>' +
     '</tr>';
     


     $(".add-table-items").append(experiencecontent);
     return false;
 });



 // Small Sidebar

 $(document).on('click', '#toggle_btn', function(e) {
     e.stopImmediatePropagation();
     if ($('body').hasClass('mini-sidebar')) {
         $('body').removeClass('mini-sidebar');
         $('.subdrop + ul').slideDown();
     } else {
         $('body').addClass('mini-sidebar');
         $('.subdrop + ul').slideUp();
     }
     return false;
 });
 $(document).on('mouseover', function(e) {
     e.stopImmediatePropagation();
     if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
         var targ = $(e.target).closest('.sidebar').length;
         if (targ) {
             $('body').addClass('expand-menu');
             $('.subdrop + ul').slideDown();
         } else {
             $('body').removeClass('expand-menu');
             $('.subdrop + ul').slideUp();
         }
         return false;
     }
 });

 $(document).on('click', '.top-nav-search .responsive-search', function(e) {
     e.stopImmediatePropagation();
     $('.top-nav-search').toggleClass('active');
 });

 $(document).on('click', '#file_sidebar_toggle', function(e) {
     e.stopImmediatePropagation();
     $('.file-wrap').toggleClass('file-sidebar-toggle');
 });

 $(document).on('click', '.file-side-close', function(e) {
     e.stopImmediatePropagation();
     $('.file-wrap').removeClass('file-sidebar-toggle');
 });

 if ($('.kanban-wrap').length > 0) {
     $(".kanban-wrap").sortable({
         connectWith: ".kanban-wrap",
         handle: ".kanban-box",
         placeholder: "drag-placeholder"
     });
 }

});

// Loader

$(window).on('load', function(e) {
 e.stopImmediatePropagation();
 $('#loader').delay(100).fadeOut('slow');
 $('#loader-wrapper').delay(500).fadeOut('slow');
});



/*tabs*/
var accordion = (function() {

 var $accordion = $('.crms-tasks');
 var $accordion_header = $accordion.find('.js-accordion-header');
 var $accordion_item = $('.js-accordion-item');

 // default settings 
 var settings = {
     // animation speed
     speed: 400,

     // close all other accordion items if true
     oneOpen: false
 };

 return {
     // pass configurable object literal
     init: function($settings) {
         $accordion_header.on('click', function() {
             accordion.toggle($(this));
         });

         $.extend(settings, $settings);

         // ensure only one accordion is active if oneOpen is true
         if (settings.oneOpen && $('.crms-task-item.active').length > 1) {
             $('.crms-task-item.active:not(:first)').removeClass('active');
         }

         // reveal the active accordion bodies
         $('.crms-task-item.active').find('> .js-accordion-body').show();
     },
     toggle: function($this) {

         if (settings.oneOpen && $this[0] != $this.closest('.crms-tasks').find('> .crms-task-item.active > .js-accordion-header')[0]) {
             $this.closest('.crms-tasks')
                 .find('> .crms-task-item')
                 .removeClass('active')
                 .find('.js-accordion-body')
                 .slideUp()
         }

         // show/hide the clicked accordion item
         $this.closest('.crms-task-item').toggleClass('active');
         $this.next().stop().slideToggle(settings.speed);
     }
 }
})();

$(document).ready(function() {
 accordion.init({
     speed: 300,
     oneOpen: true
 });
});



/*kanban view*/
$(function() {

 draggableInit();

 $('.panel-heading').on('click', function(e) {
     e.stopImmediatePropagation();
     var $panelBody = $(this).parent().children('.panel-body');
     $panelBody.slideToggle();
 });
});

$(document).on("click",".add-links",function (e) {
 e.stopImmediatePropagation();
 var experiencecontent = '<div class="links-info"><div class="row form-row links-cont">' +
         '<div class="form-group form-placeholder d-flex">' +
             '<button class="btn social-icon"><i class="feather-github"></i></button>' +
             '<input type="text" class="form-control" placeholder="Social Link">' +
             '<a href="#" class="btn trash">' +
             '<i class="feather-trash-2"></i>' +
             '</a>'+
         '</div>' +
     '</div>' +
 '</div>';
 
 $(".settings-form").append(experiencecontent);
 return false;
});
$(".settings-form").on('click','.trash', function (e) {
 e.stopImmediatePropagation();
 $(this).closest('.links-cont').remove();
 return false;
});

$(document).on("click",".add-links1",function (e) {
 e.stopImmediatePropagation();
 var experiencecontent = '<div class="links-cont">' +
     '<div class="service-amount">' +
         '<a href="#" class="service-trash1"><i class="fa fa-minus-circle me-1"></i>Service Charge</a> <span>$ 4</span' +
     '</div>' +
 '</div>';
 
 $(".links-info-one").append(experiencecontent);
 return false;
});
$(".links-info-one").on('click','.service-trash1', function (e) {
 e.stopImmediatePropagation();
 $(this).closest('.links-cont').remove();
 return false;
});


$(".links-info-discount").on('click','.service-trash-one', function (e) {
 e.stopImmediatePropagation();
 $(this).closest('.links-cont-discount').remove();
 return false;
});


// Invoices Table Add More
 
$(".add-table-items").on('click','.remove-btn', function (e) {
 e.stopImmediatePropagation();
 let tr=$(this).closest('.add-row');
 let prodTrId=tr.find("#productId").val();
 window.removeTr(prodTrId);
 $(this).closest('.add-row').remove();
 return false;
});

$(document).on("click",".add-btns",function (e) {
 e.stopImmediatePropagation();
var optionList='';
var token=localStorage.getItem("token")
 $.ajax({
     url:'http://97.74.91.84:8080/invoiceproducts',
     method:'GET',
     headers:{
         "Content-Type":"application/json",
         "Authorization":'Bearer '+token
       },
     async:false,
     success:(data)=>{
         data.map((product)=>{
             optionList+='<option value="'+product.invoiceProductId+'">'+product.productName+'</option>' 
         })
     },
     error:(error)=>{
console.log("error")
     }
 })

 var prodCont=window.getProductCount();
 window.setProdCount(prodCont+1)
 console.log("prodCont"+prodCont)

 var experiencecontent = '<tr class="add-row">' +
     '<td>' +
         '<select class="prodListSelect prodListSelect'+(prodCont+1)+'" name="state"><option  onchange="window [prodSelectOnChange](e);" value="-1">--Select--</option>'+optionList+'</select>' +
     '<input id="productId" type="hidden" value="'+(prodCont+1)+'"'+
         '</td>' +
     '<td>' +
         '<input type="text" id="description" class="form-control description'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="hsnSac" class="form-control hsnSac'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="quantity" class="form-control quantity'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
     '<input type="text" id="unit" class="form-control unit'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="price" class="form-control price'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
     '<input type="text" id="discount" class="form-control discount'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="amount" class="form-control amount'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="tax" class="form-control tax'+(prodCont+1)+'">' +
     '</td>' +
    
     '<td class="add-remove text-end">' +
         '<a href="javascript:void(0);" class="add-btns me-2"><i class="fas fa-plus-circle"></i></a> ' +
         '<a href="#" class="copy-btn me-2"><i class="fas fa-cart-plus" style="color:navy" onClick="window.AddProductDetails(event)"></i></a>'+
         '<a href="javascript:void(0);" class="remove-btn"><i class="fa fa-trash-alt"></i></a>' +
     '</td>' +
 '</tr>';
 $(".add-table-items").append(experiencecontent);
 setTimeout(()=>{
    
     $('.prodListSelect'+(prodCont+1)).select2();
     $('.prodListSelect'+(prodCont+1)).on('change',(event)=>{
         var td=event.target.parentElement;


         var productId=td.querySelector("#productId").value;
         console.log("calling:"+event.target.value)

         td=td.parentElement;
         var description=td.querySelector("#description");
         description.addEventListener('change',(e)=>{window.onDescriptionChange(e)});
         var hsnSac=td.querySelector("#hsnSac");
         hsnSac.style="text-align:end;"
         var tax=td.querySelector("#tax");
         tax.style="text-align:end;"
         var quantity=td.querySelector("#quantity");
         quantity.style="text-align:end;"
         var price=td.querySelector("#price");
         price.style="text-align:end;"
         var amount=td.querySelector("#amount");
         amount.style="text-align:end;";
         amount.readOnly=true;
         var discount=td.querySelector("#discount");
         discount.style="text-align:end;"

         td.querySelector("#tax").readOnly=true;
         var unit=td.querySelector("#unit");
         unit.readOnly=true;
         var token=localStorage.getItem("token")
         $.ajax({
             url:'http://97.74.91.84:8080/invoiceproduct/'+event.target.value,
             method:'GET',
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":'Bearer '+token
               },
             async:false,
             success:(data)=>{
                 debugger;
                 description.value=data.productDescription;
                 hsnSac.value=data.hsnCode;
                 tax.value=toCurrency(data.applicableTax).replace(/[\$]/g,'')+'%';
                quantity.value=toCurrency(data.unit).replace(/[\$]/g,'');
                price.value=toCurrency(data.rate).replace(/[\$]/g,'');
                if(data.unit!=null && data.unit!=undefined && data.rate!=null && data.rate!=undefined){
                 amount.value=toCurrency(data.unit*data.rate).replace(/[\$]/g,'');
                }     
                discount.value=toCurrency(0).replace(/[\$]/g,'')+"%";

                unit.value=data.unitVarchar;

             },
             error:(error)=>{
             console.log("error")
             }
         })
         window.prodSelectOnChange(event)
     })

     $('.quantity'+(prodCont+1)).on('change',(e)=>{onQuantityUnitChange(e)})
     $('.price'+(prodCont+1)).on('change',(e)=>{onPriceUnitChange(e)})
     $('.discount'+(prodCont+1)).on('change',(e)=>{onDiscountUnitChange(e)})
 },1)
 return false;
});

// function AddProductDetails(e){
//     window.AddProductDetails(e);
// }

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
   let num = Number((value+"").replace(/[\$,]/g,''));
   return isNaN(num) ? 0 : num;
 }
 catch(err) {
   throw err;
 }
}

function testRegex(a){
 var reg = /^-?\d+\.?\d*$/;
 var regxp=new RegExp(reg);
 return regxp.test(a);
}

function checkRegex(num){
 if(num==null || num==undefined || num=='' || !testRegex(num)) return false;
 return true;
}
// Checkbox Select
 
$('.app-listing .selectBox').on("click", function(e) {
 e.stopImmediatePropagation();
 $(this).parent().find('#checkBoxes').fadeToggle();
 $(this).parent().parent().siblings().find('#checkBoxes').fadeOut();
});

$('.invoices-main-form .selectBox').on("click", function(e) {
 e.stopImmediatePropagation();
 $(this).parent().find('#checkBoxes-one').fadeToggle();
 $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
});

$('.invoice-add-table .selectBox').on("click", function(e) {
 e.stopImmediatePropagation();
 $(this).parent().find('#checkBoxes-one').fadeToggle();
 $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
});

//Checkbox Select

if($('.SortBy').length > 0) {
 var show = true;
 var checkbox1 = document.getElementById("checkBox");
 $('.selectBoxes').on("click", function() {
     e.stopImmediatePropagation();
     if (show) {
         checkbox1.style.display = "block";
         show = false;
     } else {
         checkbox1.style.display = "none";
         show = true;
     }
 });		
}

// Invoices Checkbox Show

$(function() {
 $("input[name='invoice']").click(function(e) {
     e.stopImmediatePropagation();
     if ($("#chkYes").is(":checked")) {
         $("#show-invoices").show();
     } else {
         $("#show-invoices").hide();
     }
 });
});

 // page theme color  
 
//  if($('.themecls').length > 0) {
//      const toggleSwitch = document.querySelector('.theme-changes span');
//      const currentTheme = localStorage.getItem('theme');
//      var app = document.getElementsByClassName("themecls")[0];
//      if (currentTheme) {
//          app.href = "assets/css/"+currentTheme+".css";
//      }
//      function toggleTheme(e) {
//         debugger;
//          app.href = "assets/css/"+e+".css";
//          localStorage.setItem('theme', e);
//      }
 
//  }
 $(document).ready(function() {
     //your own JS code here
     document.getElementsByClassName("main-wrapper")[0].style.visibility = "visible";
 });

function draggableInit() {
 var sourceId;

 $('[draggable=true]').bind('dragstart', function(event) {
     event.stopImmediatePropagation();
     sourceId = $(this).parent().attr('id');
     event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
 });

 $('.panel-body').bind('dragover', function(event) {
     event.stopImmediatePropagation();
     event.preventDefault();
 });

 $('.panel-body').bind('drop', function(event) {
     event.stopImmediatePropagation();
     var children = $(this).children();
     var targetId = children.attr('id');

     if (sourceId != targetId) {
         var elementId = event.originalEvent.dataTransfer.getData("text/plain");

         $('#processing-modal').modal('toggle'); //before post


         // Post data 
         setTimeout(function() {
             var element = document.getElementById(elementId);
             children.prepend(element);
             $('#processing-modal').modal('toggle'); // after post
         }, 1000);

     }

     event.preventDefault();
 });

  // Popover
 if($('.popover-list').length > 0) {
     var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
     var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
     return new bootstrap.Popover(popoverTriggerEl)
     })
 }
 // Counter 
 
 if($('.counter').length > 0) {
     $('.counter').counterUp({
          delay: 20,
          time: 2000
     });
  }
  
  if($('#timer-countdown').length > 0) {
      $( '#timer-countdown' ).countdown( {
          from: 180, // 3 minutes (3*60)
          to: 0, // stop at zero
          movingUnit: 1000, // 1000 for 1 second increment/decrements
          timerEnd: undefined,
          outputPattern: '$day Day $hour : $minute : $second',
          autostart: true
      });
  }
  
  if($('#timer-countup').length > 0) {
      $( '#timer-countup' ).countdown( {
          from: 0,
          to: 180 
      });
  }
  
  if($('#timer-countinbetween').length > 0) {
      $( '#timer-countinbetween' ).countdown( {
          from: 30,
          to: 20 
      });
  }
  
  if($('#timer-countercallback').length > 0) {
      $( '#timer-countercallback' ).countdown( {
          from: 10,
          to: 0,
          timerEnd: function() {
              this.css( { 'text-decoration':'line-through' } ).animate( { 'opacity':.5 }, 500 );
          } 
      });
  }
  
  if($('#timer-outputpattern').length > 0) {
      $( '#timer-outputpattern' ).countdown( {
          outputPattern: '$day Days $hour Hour $minute Min $second Sec..',
          from: 60 * 60 * 24 * 3
      });
  }
 
 


}


function product() {
const elem = document.getElementById('Product_ID');
const node = document.createElement("option");
node.value="modular kitchen"
elem.appendChild(node);

}

// $(".custom_check.w-100 input[type='checkbox']").click((event)=>{
//     event.stopImmediatePropagation();
//     $(".custom_check.w-100 input[type='checkbox']").map((a,b)=>{
//         console.log(b)
//         b.checked=false
//     })
//     event.target.checked=true;
//   })

function roundNum(num){
 num=num*100;
 num=Math.round(num);
 num=num/100;

 return num;
}

$("#paymentTerm").select2()

$("#transportModes").select2( )

$('.prodListSelect').select2();

$('#customer').select2();

$("#user").select2();

$("#user").on('change',(e)=>{
    e.preventDefault();
    window.onUserChange(e)
})

$('.prodListSelect1').on('change',(event)=>{
 var td=event.target.parentElement;


 var productId=td.querySelector("#productId").value;
 console.log("calling:"+event.target.value)

 td=td.parentElement;
 var description=td.querySelector("#description");
 description.addEventListener('change',(e)=>{window.onDescriptionChange(e)});
 var hsnSac=td.querySelector("#hsnSac");
 var tax=td.querySelector("#tax")
 var quantity=td.querySelector("#quantity");
 var price=td.querySelector("#price");
 var amount=td.querySelector("#amount");
 var discount=td.querySelector("#discount");
 var unit=td.querySelector("#unit");
 var token=localStorage.getItem("token")
 $.ajax({
     url:'http://97.74.91.84:8080/invoiceproduct/'+event.target.value,
     method:'GET',
     headers:{
         "Content-Type":"application/json",
         "Authorization":'Bearer '+token
       },
     async:false,
     success:(data)=>{
         debugger;
         description.value=data.productDescription;
         hsnSac.value=data.hsnCode;
         tax.value=toCurrency(data.applicableTax).replace(/[\$]/g,'')+'%';
         quantity.value=toCurrency(data.unit).replace(/[\$]/g,'');
         price.value=toCurrency(data.rate).replace(/[\$]/g,'');
        if(data.unit!=null && data.unit!=undefined && data.rate!=null && data.rate!=undefined){
         amount.value=toCurrency(data.unit*data.rate).replace(/[\$]/g,'');
        }
        discount.value=toCurrency(0).replace(/[\$]/g,'')+"%";
        unit.value=data.unitVarchar;

     },
     error:(error)=>{
     console.log("error")
     }
 })
 window.prodSelectOnChange(event)
 })


 function onQuantityUnitChange(event){
     debugger;
     let tr=event.target.parentElement.parentElement;
     
     let quantity=tr.querySelector("#quantity")

     let quantityVal=fromCurrency(toCurrency(quantity.value));
     
     // if(!checkRegex(quantityVal)){
     //     quantityVal=0.00;
     //     quantity.value=0.00;
     // }

     quantity.value=toCurrency(quantityVal).replace(/[\$]/g,'');

     let discount=tr.querySelector("#discount");

     let discountVal=fromCurrency(toCurrency(discount.value).replace('%',''));

     // if(!checkRegex(discountVal)){
     //     discount.value=0.00;
     //     discountVal=0.00;
     // }



     // discountVal=toCurrency(discount.value).replace(/[\$]/g,'');

     let price=tr.querySelector("#price");

     let priceVal=fromCurrency(toCurrency(price.value));

     // if(!checkRegex(priceVal)){
     //     price.value=0;
     //     priceVal=0;
     // }

     // priceVal=toCurrency(price.value).replace(/[\$]/g,'');


     let amount=tr.querySelector("#amount");

     amount.value=toCurrency((quantityVal*priceVal)-((quantityVal*priceVal)*discountVal/100)).replace(/[\$]/g,'');

     window.onQuantityChange(event)
 }

 function onPriceUnitChange(event){
     let tr=event.target.parentElement.parentElement;
     
     let quantity=tr.querySelector("#quantity")

     let quantityVal=fromCurrency(toCurrency(quantity.value));
     
     // if(!checkRegex(quantityVal)){
     //     quantityVal=0;
     //     quantity.value=0;
     // }


     let discount=tr.querySelector("#discount");

     let discountVal=fromCurrency(toCurrency(discount.value).replace('%',''));

     // if(!checkRegex(discountVal)){
     //     discount.value=0;
     //     discountVal=0;
     // }

     let price=tr.querySelector("#price");

     let priceVal=fromCurrency(toCurrency(price.value));

     price.value=toCurrency(priceVal).replace(/[\$]/g,'');

     // if(!checkRegex(priceVal)){
     //     price.value=0;
     //     priceVal=0;
     // }


     let amount=tr.querySelector("#amount");

     amount.value=toCurrency((quantityVal*priceVal)-((quantityVal*priceVal)*discountVal/100)).replace(/[\$]/g,'');

     window.onPriceChange(event)
 }

 function onDiscountUnitChange(event){
     let tr=event.target.parentElement.parentElement;
     
     let quantity=tr.querySelector("#quantity")

     let quantityVal=fromCurrency(toCurrency(quantity.value));
     
     // if(!checkRegex(quantityVal)){
     //     quantityVal=0;
     //     quantity.value=0;
     // }


     let discount=tr.querySelector("#discount");

    //  let tempDiscountVal=discount.value.substr(0,discount.value.length-1)

     let discountVal=fromCurrency(toCurrency(discount.value).replace('%',''));

     discount.value=toCurrency(discountVal).replace(/[\$]/g,'')+"%";
     // if(!checkRegex(discountVal)){
     //     discount.value=0;
     //     discountVal=0;
     // }

     let price=tr.querySelector("#price");

     let priceVal=fromCurrency(toCurrency(price.value));

     // if(!checkRegex(priceVal)){
     //     price.value=0;
     //     priceVal=0;
     // }


     let amount=tr.querySelector("#amount");

     amount.value=toCurrency((quantityVal*priceVal)-((quantityVal*priceVal)*discountVal/100)).replace(/[\$]/g,'');

     window.onDiscountChange(event)
 }


 $('.quantity1').on('change',(e)=>{onQuantityUnitChange(e)})
 $('.price1').on('change',(e)=>{onPriceUnitChange(e)})
 $('.discount1').on('change',(e)=>{onDiscountUnitChange(e)})


 $("#customer").on('change',(e)=>{
     window.selectCustomer(e)
 })

$("#invoiceDate").on("dp.change",(e)=>{
 window.onInvoiceDateChange(e);
})

$("#poDate").on("dp.change",(e)=>{
 window.onPoDateChange(e);
})


$("#dueDate").on("dp.change",(e)=>{
 window.onDueDateChange(e);
})

$("#challanDate").on("dp.change",(e)=>{
 window.onChallanDateChange(e);
})

$("#paymentTerm").on("change",(e)=>{
 window.onPaymentTermsChange(e);
})

$("#transportModes").on("change",(e)=>{
 window.onTransportModeChange(e);
})

$("#description").on("change",(e)=>{
 window.onDescriptionChange(e)
})





$(".printBtn").click((e)=>{
 e.stopImmediatePropagation();
 printPage()
})


function printPage() {
   var contents = $(".page-wrapper").html();
   var frame1 = $('<iframe>', {
       id: "frame1",
       name: "frame1"
     })
     .css({
       "position": "absolute",
       "top": "-1000000px"
     })
     .appendTo($("body"));
   var myHTML = $("<html>");
   $("<head>").appendTo(myHTML);
   $("<title>").html("DIV Contents").appendTo($("head", myHTML));
   $("<body>").appendTo(myHTML);
   $("head > link").clone().appendTo($("body", myHTML));
   $("body", myHTML).append(contents);
   console.log("Content", myHTML.prop("outerHTML"));
   var frameDoc = window.frames.frame1;
   frameDoc.document.open();
   //Create a new HTML document.
   frameDoc.document.write(myHTML.prop("outerHTML"));
   frameDoc.document.close();
   setTimeout(function() {
     frame1.focus();
     window.frames.frame1.print();
     frame1.remove();
   }, 500);
};


//   otherCharge

document.getElementById("otherCharge")&&document.getElementById("otherCharge").addEventListener("blur",function(e){
 e.stopImmediatePropagation();
 document.getElementById("otherCharge").value=toCurrency(fromCurrency(e.target.value)).replace(/[\$]/g,'');
 // document.getElementById("otherCharge").value=fromCurrency(toCurrency(e.target.value))
})

//   transportCharge

document.getElementById("transportCharge")&&document.getElementById("transportCharge").addEventListener("blur",function(e){
 e.stopImmediatePropagation();
 document.getElementById("transportCharge").value=toCurrency(fromCurrency(e.target.value)).replace(/[\$]/g,'');
 // document.getElementById("transportCharge").value=fromCurrency(toCurrency(e.target.value))
})

// otherDiscount

document.getElementById("otherDiscount")&&document.getElementById("otherDiscount").addEventListener("blur",function(e){
 e.stopImmediatePropagation();
 document.getElementById("otherDiscount").value=toCurrency(fromCurrency(e.target.value)).replace(/[\$]/g,'');
})


//   discountInPercentage

document.getElementById("discountInPercentage")&&document.getElementById("discountInPercentage").addEventListener("blur",function(e){
 e.stopImmediatePropagation();
 document.getElementById("discountInPercentage").value=toCurrency(fromCurrency(e.target.value)).replace(/[\$]/g,'');
})

$("#invoiceStatusOption").length>0 && $("#invoiceStatusOption").select2();

$("#invoiceCategoryOption").length>0 && $("#invoiceCategoryOption").select2();

$(".select2-selection--single").css({ 'border':"1px solid #9a55ff"})


$(".invoiceListCustomerOption").on('change',(e)=>{
 window.onCustomerNameChange(e);
})


$(".invoiceListUserOption").on("change",(e)=>{
 window.onUserIdChange(e);
})


$("#fromDate").on('dp.change',(e)=>{
 window.onFromDateChange(e);
})



$("#toDate").on('dp.change',(e)=>{
 window.onToDateChange(e);
})


$("#invoiceStatusOption").on('change',(e)=>{
 window.onStatusChange(e);
})

$("#invoiceCategoryOption").on('change',(e)=>{
 window.onCategoryChange(e);
})


function addProductForCopy(data,prodCont) {
 debugger;
var optionList='';
var token=localStorage.getItem("token")
 $.ajax({
     url:'http://97.74.91.84:8080/invoiceproducts',
     method:'GET',
     headers:{
         "Content-Type":"application/json",
         "Authorization":'Bearer '+token
       },
     async:false,
     success:(data)=>{
         data.map((product)=>{
             optionList+='<option value="'+product.invoiceProductId+'">'+product.productName+'</option>' 
         })
     },
     error:(error)=>{
console.log("error")
     }
 })



 var experiencecontent = '<tr class="add-row">' +
     '<td>' +
         '<select class="prodListSelect prodListSelect'+(prodCont+1)+'" name="state"><option  onchange="window [prodSelectOnChange](e);" value="-1">--Select--</option>'+optionList+'</select>' +
     '<input id="productId" type="hidden" value="'+(prodCont+1)+'"'+
         '</td>' +
     '<td>' +
         '<input type="text" id="description" class="form-control description'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="hsnSac" class="form-control hsnSac'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="quantity" class="form-control quantity'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
     '<input type="text" id="unit" class="form-control unit'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="price" class="form-control price'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
     '<input type="text" id="discount" class="form-control discount'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="amount" class="form-control amount'+(prodCont+1)+'">' +
     '</td>' +
     '<td>' +
         '<input type="text" id="tax" class="form-control tax'+(prodCont+1)+'">' +
     '</td>' +
    
     '<td class="add-remove text-end">' +
         '<a href="javascript:void(0);" class="add-btns me-2"><i class="fas fa-plus-circle"></i></a> ' +
         '<a href="#" className="copy-btn me-2"><i className="fas fa-cart-plus" style={{color:"navy"}} onClick="(e)=>{window.AddProductDetails(e)}"></i></a>'+
         '<a href="javascript:void(0);" class="remove-btn"><i class="fa fa-trash-alt"></i></a>' +
     '</td>' +
 '</tr>';
 $(".add-table-items").append(experiencecontent);
 setTimeout(()=>{
    
     $('.prodListSelect'+(prodCont+1)).select2();
     // $('.prodListSelect'+(prodCont+1)).on('change',(event)=>{

         data.productId=(prodCont+1);

         var td=$('.prodListSelect'+(prodCont+1)).parent()[0];

         var $select=document.querySelector('.prodListSelect'+(prodCont+1));
         const $options = Array.from($select.options);
           
         const optionToSelect = $options.find(item => item.text ===data.productName);
         $select.value = optionToSelect.value;

          //below code is used to dispatch change event on customer select box becuase i is not getting updated otherwise
          var event = new Event('change');

          // Dispatch it.
          $select.dispatchEvent(event);

         var productId=td.querySelector("#productId").value;
         // console.log("calling:"+event.target.value)

         td=td.parentElement;
         var description=td.querySelector("#description");

         description.addEventListener('change',(e)=>{window.onDescriptionChange(e)});

         var hsnSac=td.querySelector("#hsnSac");
         hsnSac.style="text-align:end;"
         var tax=td.querySelector("#tax");
         tax.style="text-align:end;"
         var quantity=td.querySelector("#quantity");
         quantity.style="text-align:end;"
         var price=td.querySelector("#price");
         price.style="text-align:end;"
         var amount=td.querySelector("#amount");
         amount.style="text-align:end;";
         amount.readOnly=true;
         var discount=td.querySelector("#discount");
         discount.style="text-align:end;"

         td.querySelector("#tax").readOnly=true;
         var unit=td.querySelector("#unit");
         unit.readOnly=true;
               
                 description.value=data.productDescription;
                 hsnSac.value=data.hsnSac;
                 tax.value=toCurrency(data.tax).replace(/[\$]/g,'')+'%';
                quantity.value=fromCurrency(toCurrency(data.quantity).replace(/[\$]/g,''));
                price.value=fromCurrency(toCurrency(data.rate).replace(/[\$]/g,''));
                discount.value=fromCurrency(toCurrency(data.discount).replace(/[\$]/g,'').replace('%',''));

                let amt=roundNum(
                 quantity.value * price.value - quantity.value * price.value * (discount.value / 100)
               );
                if(data.unit!=null && data.unit!=undefined && data.rate!=null && data.rate!=undefined){
                 amount.value=toCurrency(amt).replace(/[\$]/g,'');
                }     

                unit.value=data.unit;
                discount.value+="%"
        
                 //window.prodSelectOnChangeForCopy(data)
     // })

     $('.quantity'+(prodCont+1)).on('change',(e)=>{onQuantityUnitChange(e)})
     $('.price'+(prodCont+1)).on('change',(e)=>{onPriceUnitChange(e)})
     $('.discount'+(prodCont+1)).on('change',(e)=>{onDiscountUnitChange(e)})
 },1)
 return false;
}




