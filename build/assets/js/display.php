<?php

include 'dbconnect.php';

$prod_id = $_POST['id'];
$prod_id = trim($prod_id);

$sql = "SELECT * FROM `product` WHERE `Product_Id`='{$prod_id}'";

$res = mysqli_query($conn , $sql);

while($rows = mysqli_fetch_array($res)){
    ?>

<tr>
    <td><?php echo $rows['ProductName'];?></td>
    <td><?php echo $rows['Product_Description'];?></td>
    <td><?php echo $rows['HSN_Code'];?></td>
</tr>
    <?php
}

echo $sql;
?>


?>


