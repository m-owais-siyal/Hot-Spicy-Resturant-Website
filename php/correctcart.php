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

// session_start();
// $data = json_decode(file_get_contents('php://input'));
// $UserID = $data->userid;

$foodname = "";
$price = $quantity = 0;

$methord = $_SERVER['REQUEST_METHOD'];

if($methord=="GET"){
    // if (isset($_SERVER['HTTP_USERID'])) {
        // $userid = $_SERVER['HTTP_USERID'];
        //  $sql = "SELECT c.foodname, c.Price, c.Quantity, c.total, c.shipping, c.discount
        // c.status, c.type, o.UserID from ordercart c, user u where CartID = '$userid'";
        // use the $userid variable to fetch cart data from the database
   
    $sql = "SELECT CartID, foodname, price, quantity from ordercart";
// 
// $UserID="";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){
    $cart = array();
    while($row = mysqli_fetch_assoc($result)){
        $cart[] = $row;
    }
    echo json_encode($cart);
}
else{
    echo json_encode(array());
}
// }
}


mysqli_close($conn);

?>