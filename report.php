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



echo '<table border=1 cellspacing=0><tr><th>Nп/п</th><th>Имя и фамилия</th><th>Возраст</th><th>Имя и фамилия родителя</th><th>Номер телефона</th><th>Email</th><th>Дата регистрации</th><th>Дата и время начала</th><th>Когда закончил</th><th>затрачено времени</th><th>Баллы</th><th>Количество блоков</th></tr>';

$n = 0;

foreach($users as $user) {

  //отфильтровываем тестовых участников

    if(($user->phone !== '+70000000000' && !isset($_GET['test'])) || ($user->phone == '+70000000000' && isset($_GET['test']))) {

      $n++;

      echo '<tr>'

      .'<td>'.$n.'</td>'

      .'<td>'.$user->name.'</td>'

      .'<td>'.$user->age.'</td>'

      .'<td>'.$user->parent.'</td>'

      .'<td>'.$user->phone.'</td>'

      .'<td>'.$user->email.'</td>'

      .'<td>'.$user->date_of_reg.'</td>';

      $results = R::findOne('results', 'u_address=?', [$user->address]);

      if (isset($results)) {

        $finish_hours = floor($results->mission_time / 60 / 60);

        $finish_minutes = floor($results->mission_time / 60) % 60;

        $format_h = ''; $format_m = ''; 

        if (floor($finish_hours / 10) == 0) $format_h = '0';

        if (floor($finish_minutes / 10) == 0) $format_m = '0';

        echo '<td>'.date('d.m.y h:m', $results->starting_time).'</td>'

        .'<td>'.date('d.m.y h:m', $results->finish_time).'</td>'

        .'<td>'.$format_h.$finish_hours.':'.$format_m.$finish_minutes.'</td>'

        .'<td>'.$results->points.'</td>'

        .'<td>'.$results->blocks.'</td>';

      } else {
        echo '<td></td><td></td><td></td><td></td><td></td>';
      }

      

      echo '<tr>';

    }

}

echo '</table>';

?>



</body>

</html>