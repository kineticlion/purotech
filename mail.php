<?php
   // data sent in header are in JSON format
   header('Content-Type: application/json');

   
   $to = "YOUR_EMAIL_ID";  // Server to send the email to

   // Email details
   $name = $_POST['name'];
   $email = $_POST['email'];
   $contact = $_POST['contact'];
   $demo = $_POST['demo'];
   $subscription = $_POST['subscription'];
   $postmessage = $_POST['message'];  
   $subject = "Contact Us";
   
   // Email Template
   $message = "<b>Name : </b>".$name."<br>";
   $message .= "<b>Contact Number : </b>".$contact."<br>";
   $message .= "<b>Email Address : </b>".$email."<br>";
   $message .= "<b>Demo Requirement: </b>".$demo."<br>";
   $message .= "<b>Message : </b>".$postmessage."<br>";
   $message .= "<b>Newsletter Subscription: </b>".$subscription."<br>";

   $headers  = "MIME-Version: 1.0\r\n";
   $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

   $subject = 'FORM SUBMISSION';

   $retval = mail ($to,$subject,$message,$headers);
   // message Notification
   if( $retval == true ) {
      echo json_encode(array(
         'success'=> true,
      ));
   }else {
      echo json_encode(array(
         'error'=> true,
      ));
   }
?>