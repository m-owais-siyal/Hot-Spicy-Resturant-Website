<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Access-Control-Allow-Headers, Authorization, content-type');

$servername = "localhost";
$uname="root";
$pword ="";
$dbname="restaurant";

$conn =mysqli_connect($servername, $uname, $pword,$dbname);

if ($conn -> connect_error){
    die("connection failed:".mysqli_connect_error());
}

$foodname = $foodcount = "";
$price = $quantity = 0;

$methord = $_SERVER['REQUEST_METHOD'];

if($methord=="GET"){
    $sql = "SELECT CartID, foodname, price, count(foodname) as foodcount from ordercart
group by foodname";
    $result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){
    $report = array();
    while($row = mysqli_fetch_assoc($result)){
        $report[] = $row;
    }
    echo json_encode($report);
}
else{
    echo json_encode(array());
}
}

mysqli_close($conn);

?>