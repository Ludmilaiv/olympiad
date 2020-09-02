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

//Если у участника ещё нет результатов, то создаём их, фиксируем время начала и устанавливаем первый уровень
$results = R::findOne( 'results', 'u_address = ?', [$_GET['u']]);
if (!isset($results)) {
  $results = R::dispense('results');
  $results->u_address = $_GET['u'];
  $results->starting_time = time();
  $results->level = 1;
  $results->points = 0;
  $results->blocks = 0;
  $results->hints = json_encode([-1,0,0,0,0,0,0,-1]);
  R::store($results);
}

//находим результаты участника
$results = R::findOne( 'results', 'u_address = ?', [$_GET['u']]);
if (!isset($results)) {
  echo 'Что-то пошло не так';
	exit;
}

if ($results->finish_time > 0) 
  require('modules/finish.php');
else if ($results->level < 8) 
  require('modules/quest-page'.$results->level.'.php');
else 
  require('modules/final.php');


?>