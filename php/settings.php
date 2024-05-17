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
echo "php connected";
// session_start();
// $userID = $_SESSION['userID'];
// $username = $_SESSION['username'];
// $loggedin = $_SESSION['loggedin'];

$firstname = $lastname = $username = $email = "";
$password = $confirmpassword = $gender = "";
$dob = "";

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

    // $sql = "UPDATE customer set Firstname = '$firstname', Lastname = '$lastname'
    // where email = '$email'";

    if($firstname){
        $sql = "UPDATE user set Firstname = '$firstname' where email = '$email'";
        $result = mysqli_query($conn, $sql);
    }
    if($lastname){
        $sql = "UPDATE user set Lastname = '$lastname' where email = '$email'";
        $result = mysqli_query($conn, $sql);
    }
    if($username){
        $sql = "UPDATE user set Username = '$username' where email = '$email'";
        $result = mysqli_query($conn, $sql);
    }
    if($password && $confirmpassword){
        $sql = "UPDATE user set password = '$password' where email = '$email'";
        $result = mysqli_query($conn, $sql);
    }
    if($dob){
        $sql = "UPDATE user set DateOfBirth = '$dob' where email = '$email'";
        $result = mysqli_query($conn, $sql);
    }

    // $sql = "UPDATE customer set Firstname = '$firstname', Lastname = '$lastname', Username = '$username',
    //  Password = '$password', DateOfBirth = '$dob' where email = '$email'";
            
    if(mysqli_query($conn, $sql)){
        echo "Sucessfully updated data into Table!";
        }
    else{  
        echo "Error updating records!".mysqli_connect_error();
    }
}
else if($methord=="GET"){
    // echo "in elseif ";
    $firstname = "";
    $lastname = "";
    $username = "";
    $email = "";
    $password = "";
    $confirmpassword = "";
    $dob = "";
    $gender = "";
}
?>