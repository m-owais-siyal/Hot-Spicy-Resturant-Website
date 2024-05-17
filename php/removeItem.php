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

$CartID ="";

$methord = $_SERVER['REQUEST_METHOD'];
if($methord=="POST"){
    $data = json_decode(file_get_contents('php://input'));
    $CartID = $data->CartID;    

    $sql = "DELETE from ordercart where CartID = '$CartID'";
    if(mysqli_query($conn, $sql)){
        echo "Successfully updated the cart";
    }

}

mysqli_close($conn);

?>