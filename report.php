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
$users = R::findAll( 'users' );
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Олимпиада в Айтигенио 2020</title>
</head>
<body>

<?php 

echo '<table border=1 cellspacing=0><tr><th>Nп/п</th><th>Имя и фамилия</th><th>Возраст</th><th>Имя и фамилия родителя</th><th>Номер телефона</th><th>Email</th><th>Дата регистрации</th></tr>';
$n = 0;
foreach($users as $user) {
    $n++;
    echo '<tr>'
    .'<td>'.$n.'</td>'
    .'<td>'.$user->name.'</td>'
    .'<td>'.$user->age.'</td>'
    .'<td>'.$user->parent.'</td>'
    .'<td>'.$user->phone.'</td>'
    .'<td>'.$user->email.'</td>'
    .'<td>'.$user->date_of_reg.'</td>'
    .'<tr>';
}
echo '</table>';
?>

</body>
</html>