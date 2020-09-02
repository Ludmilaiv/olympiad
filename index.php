<?php
    // if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == ""){
    // $redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    // header("HTTP/1.1 301 Moved Permanently");
    // header("Location: $redirect");
// }

	session_start();
	
	if (isset($_POST['name'])) {
		require 'DBConn/reg.php';
	} else 
	if (isset($_GET['reg']))
	{
		require 'modules/regcompleted.php';
	}
	else if (isset($_GET['u']))
	{
		if (isset($_GET['play25892'])) {
			require "modules/quest.php";
		} else {
				require "modules/afterReg.php";
		}
	}
	else
	{
    require 'modules/registration.html';
	}
	
?>