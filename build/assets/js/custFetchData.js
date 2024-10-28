function selectCust(){

    // alert("select product");

    var product = document.getElementById('customer').value;

    // create ajax request

    $.ajax({

        url : "dispcustdata.php",
        method : "POST",
        data: {
            id : product
        },

        success:function(data){
            $("#displayadd").html(data);
        }
    })
}