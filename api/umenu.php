<?php
session_start();
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
    case "GET":
        $sql= "SELECT * from food";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;
    case "POST":
        $data = json_decode( file_get_contents('php://input') ); 
        $id = $_SESSION["userid"];
        $sql = "INSERT INTO ordercart (foodname,quantity,userid,price) values('$data->name','$data->quantity','$id','$data->price')";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
}

//$conn->close();
?>