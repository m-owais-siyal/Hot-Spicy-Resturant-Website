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
        // Prepare user insertion query
        $stmt = $conn->prepare("INSERT INTO user (username,password, email, firstname, lastname, gender) VALUES ('employee','employee', '$data->email', '$data->fname', '$data->lname', '$data->gender')");
        // Execute user insertion query
        if (!$stmt->execute()) {
            $conn->close();
            $response = array('status' => 'error', 'message' => 'Failed to insert user data');
            header('Content-Type: application/json');
            echo json_encode($response);
            exit();
        }
        // Get the auto-generated user ID
        $stmt = "SELECT UserID FROM user WHERE email = '$data->email'";
        $res = $conn->query($stmt);
        if($res->execute()){
            $userId = $res->fetch(PDO::FETCH_ASSOC)['UserID'];
        }
        // Prepare employee insertion query
        $stmt = $conn->prepare("INSERT INTO employee (UserID, rank, salary) VALUES ('$userId', '$data->position', '$data->salary')");
        // Execute employee insertion query
        if (!$stmt->execute()) {
            $conn->close();
            $response = array('status' => 'error', 'message' => 'Failed to insert employee data');
            header('Content-Type: application/json');
            echo json_encode($response);
            exit();
        }
        // Prepare employee schedule insertion query
        $stmt = $conn->prepare("INSERT INTO employeeschedule (UserID, schedule, tasks) VALUES ('$userId', '$data->shift', '$data->action')");
        // Execute employee schedule insertion query
        if (!$stmt->execute()) {
            $conn->close();
            $response = array('status' => 'error', 'message' => 'Failed to insert employee schedule data');
            header('Content-Type: application/json');
            echo json_encode($response);    
            exit();
        }
        // Close database connection
        //$conn->close();
        // Return success status to frontend
        //$response = array('status' => 'success');
        header('Content-Type: application/json');
        //echo json_encode($response);
    case "GET":
        $sql= "SELECT user.UserID, user.firstname, user.lastname, user.gender,user.email, employeeschedule.schedule, employee.rank, employee.salary, employeeschedule.tasks FROM user INNER JOIN employee ON user.UserID = employee.UserID INNER JOIN employeeschedule ON user.UserID = employeeschedule.UserID";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
        break;
    case "DELETE":
        $data = json_decode( file_get_contents('php://input') );
        $idx = $data->id; 
        $sql1 = "DELETE FROM user WHERE UserID = $idx";
        $sql2 = "DELETE FROM employee WHERE UserID = $idx";
        $sql3 = "DELETE FROM employeeschedule WHERE UserID = $idx";

        // Execute the queries
        $result3 = $conn->query($sql3);
        $result1 = $conn->query($sql2);
        $result2 = $conn->query($sql1);
        

        // Check if the queries were successful and return the status as a JSON response to frontend
        if ($result1 && $result2 && $result3) {
            $status = array("status" => "success", "message" => "Data deleted successfully");
        } else {
            $status = array("status" => "error", "message" => "Error deleting data: " . $conn->error);
        }
        break;
}

//$conn->close();
?>