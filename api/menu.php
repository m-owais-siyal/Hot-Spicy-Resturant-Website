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
    case "POST":
        $data = json_decode( file_get_contents('php://input') );
        var_dump($data); 
        $sql = "SELECT * FROM Food WHERE name = '$data->itemName'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0){
            $response = array('status' => 'error', 'message' => 'This food item already exists in the database');
        }
        else{
            $sql = "INSERT INTO food ( name, price, quantity,cuisine ,ingredients, category,image ,timeframe, calories) VALUES ( '$data->itemName', '$data->itemPrice', '$data->itemQuantity','$data->itemCuisine', '$data->itemDescription', '$data->itemCategory','$data->itemImage', '$data->itemPrepTime', '$data->itemCalories');";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
        }
        break;
    case "GET":
        $sql= "SELECT * from food";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;
    case "DELETE":
        $data = json_decode( file_get_contents('php://input') );
        $id = $data->ID; 
        $sql = "DELETE FROM food WHERE FoodID = '$id'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        break;
}

//$conn->close();
?>