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

$firstname = $lastname = $username = $email = "";
$password = $confirmpassword = $gender = "";
$dob = "";
$loggedin =false;

$methord = $_SERVER['REQUEST_METHOD'];
if($methord=="POST"){
    $data = json_decode(file_get_contents('php://input'));
    $email = $data->email; 
    $password = $data->password;
                
    $sql = "SELECT * FROM user WHERE Email= '$email' AND Password= '$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $loggedin = true;
        $row = mysqli_fetch_assoc($result);
        $userID = $row['UserID'];
        $username = $row['username'];
        $_SESSION["userid"] = $userID;
        $user = array("status" => 200, "userid" => $userID, "username" => $username, "loggedin"=>$loggedin);
    } 
    else {
        $user = array("status" => 202);
    }
    echo json_encode($user);

    }

else if($methord=="GET"){
    $email = "";
    $password = "";
    $username = "";
}

if ($loggedin) {
    http_response_code(200);
} else {
    http_response_code(202);
}

mysqli_close($conn);

?>