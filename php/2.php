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

session_start();

$foodname = "";
$price = $quantity = 0;
$userID="";
$methord = $_SERVER['REQUEST_METHOD'];

// if (isset($_POST['userIDarray'])) {
//     $userId = $_POST['userIDarray'];
//     // Now you can use the $userId variable in your code to retrieve the user's cart
//     // For example:
//     // $cartItems = getCartItems($userId);

//     // Return the cart items as a JSON response
//     echo json_encode($cartItems);
// } 
// else {
//     echo "Error: userIDarray parameter is missing from the request.";
// }

// if ($method=="POST"){
//     $data = json_decode(file_get_contents('php://input'));
//     $UserID = $data->userid;
//     $_SESSION["userid"] = $UserID;
// }

if($methord=="GET"){
    // $UserID = $_SESSION['userid'];
    // $userID = $_SERVER['HTTP_USER_ID'];
    // $UserID = $_SERVER['HTTP_X_USER_ID'];

    // $sql = "SELECT c.foodname, c.Price, c.Quantity, c.total, c.shipping, c.discount
    // c.status, c.type, o.UserID from ordercart c, user u 
    // where CartID = '$UserID'";

    $sql = "SELECT CartID, foodname, price, quantity from ordercart";

// $UserID="";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){
    $cart = array();
    while($row = mysqli_fetch_assoc($result)){
        $cart[] = $row;
    }
    // $jData = json_encode($cart);
    // echo $jData;
    echo json_encode($cart);
}
else{
    // $jData = json_encode(array());
    // echo $jData;
    echo json_encode(array());
}
}
mysqli_close($conn);

?>