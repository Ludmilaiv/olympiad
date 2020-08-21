<?php
$to      = $user->email;
$subject = 'Олимпиада по программированию';
$message = '<h2>Здравствуй, '.$user->name.'</h2>';
$message .= '<p>Для участия в олимпиаде перейди по этой ссылке:</p>';
$message .= '<a href="http://quest.itgen.io/?u='.$user->address.'">quest.itgen.io/?u='.$user->address.'</a>';
$headers = "From:Itgenio<itgenby@gmail.com>\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n";
$mail = (mail($to, $subject, $message, $headers));
if ($mail!=null) {
    header ('Refresh:0; url="\?reg='.$user->id);
}
else echo "Что-то пошло не так";
?>