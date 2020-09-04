<?php
require 'libs/rb-mysql.php';
//связываемся с БД
require 'dbconn.php';

if (!R::testConnection())
//если не связались с бд, то выводим ошибку и перезагружаем страничку
{
	echo 'err';
	exit;
}

$results = R::findOne( 'results', 'u_address = ?', [$_GET['u']]);

if (isset($_POST['level'])) {
	$results->level = $_POST['level'];
	if (isset($_POST['points']))
		$results->points = $_POST['points'];
	if (isset($_POST['blocks']))
		$results->blocks = $_POST['blocks'];
	R::store($results);
} 
else if (isset($_POST['finish'])) {
	$results->finish_time = time();
	$results->mission_time = $results->finish_time - $results->starting_time;
	if (isset($_POST['points']))
		$results->points = $_POST['points'];
	R::store($results);
}
else if (isset($_POST['hint'])) {
	$hints = json_decode($results->hints);
	$hints[$_POST['hint']-1] = 1;
	$results->hints = json_encode($hints);
	if (isset($_POST['points']))
		$results->points = $_POST['points'];
	R::store($results);
}


?>