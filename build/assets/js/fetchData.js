function selectProduct(){

    // alert("select product");

    var product = document.getElementById('product').value;

    // create ajax request

    $.ajax({

        url : "display.php",
        method : "POST",
        data: {
            id : product
        },

        success:function(data){
            $("#display").html(data);
        }
    })

    function selectProduct(){

        // alert("select product");
    
        var product = document.getElementById('add-row').value;
    
        // create ajax request
    
        $.ajax({
    
            url : "app.js",
            method : "POST",
            data: {
                id : product
            },
    
            success:function(data){
                $("#Product_Id").html(data);
            }
        })
    }    

    // $.ajax({

    //     url : "display2.php",
    //     method : "POST",
    //     data: {
    //         id : product
    //     },

    //     success:function(data){
    //         $("#gross").html(data);
    //     }
    // })
}











