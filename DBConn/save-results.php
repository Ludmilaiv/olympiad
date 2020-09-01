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
	R::store($results);
} 
else if (isset($_POST['finish'])) {
	$results->finish_time = time();
	R::store($results);
}


?>