<?php
require 'DBConn/libs/rb-mysql.php';
//связываемся с БД
require 'DBConn/dbconn.php';

if (!R::testConnection())
//если не связались с бд, то выводим ошибку и перезагружаем страничку
{
	echo 'Что-то пошло не так';
	exit;
}
//проверяем, есть ли такой участник
$user = R::findOne( 'users', 'address = ?', [$_GET['u']]);
if (!isset($user)) 
{
    echo "<h2>Участник с данным адресом не зарегистрирован</h2>";
    exit;
}

//находим результаты участника
$results = R::findOne( 'results', 'u_address = ?', [$_GET['u']]);
//если он даже не начинал, то сообщаем, что олимпиада окончена
if (!isset($results)) {
  require('modules/stop.php');
	exit;
}

//Так как олимпиада закончилась, сразу перекидываем на страницу с результатами
require('modules/finish.php');

?>