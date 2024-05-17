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
        $reservation_time = strtotime($data->time);
        $one_hour_later = $reservation_time + 3600;
        $reservation_date = date('Y-m-d', strtotime($data->date));
        $check_query = "SELECT COUNT(*) AS reserved_tables FROM Reservation WHERE date = '$reservation_date'  AND ((time <= $reservation_time AND ADDTIME(time, '01:00:00') > '$reservation_time') OR (time >= '$reservation_time' AND ADDTIME('$reservation_time', '01:00:00') > time))";
        $check_result = $conn->query($check_query);
        if ($check_result === false) {
            $error_message = 'Error checking for available tables: ' . $conn->error;
            $response_data = array('status' => 'error', 'message' => $error_message);
            echo json_encode($response_data);
            exit();
        }
        $reserved_tables = $check_result->fetch(PDO::FETCH_ASSOC)['reserved_tables'];
        if ($reserved_tables + $data->numTables > 30) {
            $error_message = 'Not enough tables available for that time.';
            $response_data = array('status' => 'error', 'message' => $error_message);
            echo json_encode($response_data);
            exit();
        }
        // Add the reservation to the database
        $insert_query = "INSERT INTO Reservation (customerName, tableNo, date, time,location) VALUES ('$data->customerName', '$data->numTables', '$reservation_date', '$data->time','$data->location')";
        $insert_result = $conn->query($insert_query);
        if ($insert_result === false) {
            $error_message = 'Error adding reservation: ' . $conn->error;
            $response_data = array('status' => 'error', 'message' => $error_message);
            echo json_encode($response_data);
            exit();
        }
        // Reservation added successfully, send success response
        $response_data = array('status' => 'success', 'message' => 'Reservation added successfully.');
        echo json_encode($response_data);
        break;
}

//$conn->close();
?>