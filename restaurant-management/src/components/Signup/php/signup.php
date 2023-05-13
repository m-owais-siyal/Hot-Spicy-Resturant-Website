<?php 
// header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With');

$firstname = $lastname = $username = $email = "";
$password = $confirmpassword = $gender = "";
$dob = "";

// $user = $_POST['username'];
// echo ("Hello from server: $user");header("Access-")

//  $username = $_SESSION['username'];
//     $loggedin = $_SESSION['loggedin'];
$data = json_decode(file_get_contents("php://SignupComponent"));

$firstname = $data->firstname;
$lastname = $data->lastname;
$email = $data->email; 
$password = $data->password;
$confirmpassword = $data->confirmpassword;
$gender= $data->gender;
$dob = $data->dob;

$servername = "localhost";
$uname="root";
$pword ="";
$dbname="restaurant";

$conn =mysqli_connect($servername, $uname, $pword,$dbname);
if ($conn -> connect_error){
    die("connection failed:".mysqli_connect_error());
}
echo "php connected";
// if($email && $username){
    $sql = "Insert into customer(username, password, email, Fname, Lname, DOB, Gender)
        values('$username', '$password', '$email', '$firstname', '$lastname', '$dob', '$gender')";

    // $sql = "Select * from customer WHERE email= '$email' AND Password= '$password'";
    $result = mysqli_query($conn, $sql);
    if($result){
        echo "successfully entered data into table";
    }

    // if($result){
    //     $response['data'] = array(
    //         'status'=>'valid'
    //     );
    //     echo json_encode($response);
    // }
    // else{
    //     $response['data'] = array(
    //         'status'=>'invalid'
    //     );
    //     echo json_encode($response);
    // }
// }

    // if(mysqli_num_rows($result)){
      
    //     $_SESSION['email'] = $email;
    //     if($username1=='admin'){
         
    //         $_SESSION['loggedin'] = true;
    //            $_SESSION['username'] = $username1;
    //         $_SESSION['admin']= true;

    //         echo "Welcome" .$username1;
    //         header("location: home.php");
    //     }
    //     else{
    //         $_SESSION['loggedin'] = true;
    //         $_SESSION['email'] = $email;
    //         echo "Welcome" .$email;

    //         header("location: home.php"); //redirecting to home page
    //     }
    // }
    // // }
    // // }
    // else{
    //     $password1Error="Invalid username or password";
    // }


?>