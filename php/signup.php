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
// $UserID = $Username = "";
// $userID = $_SESSION['UserID'];
// $username = $_SESSION['Username'];

$firstname = $lastname = $username = $email = "";
$password = $confirmpassword = $gender = "";
$dob = "";
$loggedin =false;

$methord = $_SERVER['REQUEST_METHOD'];
if($methord=="POST"){
    $data = json_decode(file_get_contents('php://input'));
    $firstname = $data->fname;
    $lastname = $data->lastname;
    $username = $data->username;
    $email = $data->email; 
    $password = $data->password;
    $confirmpassword = $data->confirmpassword;
    $gender= $data->gender;
    $dob = $data->dob;

    $sql = "INSERT Into user(Firstname, Lastname, Username, Email, password, DateOfBirth)
    values('$firstname', '$lastname', '$username', '$email','$password', '$dob')";
    // $sql = "INSERT INTO customer(Firstname, Lastname, Username, Email, password, DateOfBirth, Gender)
    // values('$firstname', '$lastname', '$username', '$email','$password', '$dob', $gender')";

    if(mysqli_query($conn, $sql)){
        echo "Sucessfully entered data into Table!";

        $sql2 = "SELECT * FROM user WHERE Email= '$email' AND Password= '$password'";
        $result = mysqli_query($conn, $sql2);

        if (mysqli_num_rows($result) > 0) {
            echo "insideee";
            $loggedin = true;
            $row = mysqli_fetch_assoc($result);
            $userID = $row['UserID'];
            $username = $row['username'];
            $_SESSION["userid"] = $userID;
            $user = array("status" => 200, "userid" => $userID, "username" => $username, "loggedin"=>$loggedin);
            // $_SESSION['UserID'] = $userID;
            // $_SESSION['Username'] = $username;
        }
        else {
            $user = array("status" => 202);
        }
        echo json_encode($user);
    }
    else{  
        echo "Error inserting records!".mysqli_connect_error();
    }
}
else if($methord=="GET"){
    echo "in elseif ";
    $firstname = "";
    $lastname = "";
    $username = "";
    $email = "";
    $password = "";
    $confirmpassword = "";
    $dob = "";
    $gender = "";
}
if ($loggedin) {

    $sql3 = "INSERT INTO ordercart(CardID, UserID) values('$userID', '$userID')";
    if(mysqli_query($conn, $sql3)){        
        echo "Created cart";
    }

    http_response_code(200);
} else {
    http_response_code(202);
}

mysqli_close($conn);
?>