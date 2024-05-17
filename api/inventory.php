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
        $data = json_decode( file_get_contents('php://input') ); 
        $sql = "SELECT FoodID FROM Food WHERE name = '$data->name'";
        $result = $conn->query($sql);
        if ($result->rowCount() > 0) {            
            // Retrieve the FoodID from the query result
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $foodid = $row['FoodID'];
            $sql = "SELECT * FROM Inventory where FoodID = '$foodid';";
            $result = $conn->query($sql);
            if ($result->rowCount() > 0){
                $sql ="UPDATE Inventory SET foodQuantity = '$data->quantity' WHERE FoodID = '$foodid';";
                if ($conn->query($sql) === TRUE) {
                    $response_data = array('status' => 'success', 'message' => 'Data Modified successfully.');
                }
                else {
                    $response = array('status' => 'error', 'message' => 'SQL error');
                }
            }
            else{
                // Insert the data into the Inventory table
                $sql = "INSERT INTO Inventory (FoodID, foodQuantity,name) VALUES ('$foodid', '$data->quantity','$data->name')";
                if ($conn->query($sql) === TRUE) {
                    $response_data = array('status' => 'success', 'message' => 'Data Added to inventory successfully.');
                }
                else {
                    $response = array('status' => 'error', 'message' => 'SQL error');
                }
            }
            
        } 
        else {
            $response = array('status' => 'error', 'message' => 'Food name not found in database'); 
        }
        break;
    case "GET":
        $sql= "SELECT * from Inventory";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;
}

//$conn->close();
?>