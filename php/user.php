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
echo "in user";

$UserID = $Username = "";
$userID = $_SESSION['UserID'];
$username = $_SESSION['Username'];

// $data = json_decode(file_get_contents('php://input'));

// $user = [$data->userID, $data->username];

// echo json_encode($user);

echo("Userid: ", $userID);
echo("Username: ", $username);
echo("User: ", $user);



        // if($username=='admin'){
        //     $_SESSION['loggedin'] = true;
        //     $_SESSION['username'] =$username;
        //     $_SESSION['userID'] = $userID;
        //     $_SESSION['admin']= true;
        //     // echo "Welcome" .$username1;
        //     // header("location: home.php");
        // }
        // else{
        //     $_SESSION['loggedin'] = true;
        //     $_SESSION['userID'] = $userID;
        //     $_SESSION['username'] =$username;
        //     // echo "Welcome" .$username1;
        //     // header("location: home.php"); //redirecting to home page
        // }
        // header("/");


mysqli_close($conn);

?>