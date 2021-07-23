<?php
 if(isset($_POST["email"]) && !empty($_POST["email"])&&isset($_POST["confmail"])&& !empty($_POST["confmail"])&&isset($_POST["message"])&&!empty($_POST["message"])){
    $to = 'billaoun@gmail.com';
	$first= $_POST['firstname'];
	$last = $_POST['lastname'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	

	$data = array(
		'first' => $first,
		'last' => $last,
		'email' => $email
	);

    $result = mail($to,$first, $message, $data);

	
	header('Content-type:application/json;charset=utf-8');
	echo json_encode($result);


	

};
    
    





	






