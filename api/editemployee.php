<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'Dbconnect.php';

$objDb = new DbConnect;
$conn =$objDb->connect();


$methord = $_SERVER['REQUEST_METHOD'];
switch($methord){
    case "POST":
        $data = json_decode(file_get_contents('php://input'));
        
        $sql = "UPDATE user ";
        break;
}

//$conn->close();
?>