<?php

require '../DBConn/libs/rb-mysql.php';
//связываемся с БД
require '../DBConn/dbconn.php';

if (!R::testConnection())
//если не связались с бд, то выводим ошибку и перезагружаем страничку
{
	echo 'Что-то пошло не так';
	exit;
}

if (!isset($_GET['u'])) {
  echo 'Нет данных';
	exit;
}

$user = R::findOne( 'users', 'address = ?', [$_GET['u']]);

if (!isset($user)) {
  echo 'Нет такого пользователя';
	exit;
}

$width = 784;
$height = 496;
$name = $user->name;
//определяем, где будет начинаться строка из рассчёта 7 пикс. на букву
$x = $width / 2 - strlen($name) * 12 / 2;
// Создание изображения 300x100
$im = imagecreatetruecolor($width, $height);
$text_color = imagecolorallocate($im, 0x53, 0x48, 0x75);
//$text_color = imagecolorallocate($im, 0x53, 0x48, 0x75);

$im = ImageCreateFromPNG('../images/sertificate.png');

//imagefilledrectangle($im, 0, 0, 299, 99, $red);


// Путь к ttf файлу шрифта
$font_file = '../fonts/Caveat-Regular.ttf';

// Рисуем текст 'PHP Manual' шрифтом 13го размера
imagefttext($im, 42.164, 0, $x, 270, $text_color, $font_file, $name);

// Вывод изображения
header('Content-Type: image/png');

imagepng($im);
imagedestroy($im);
?>