<?php 

$mailbody = '<table border="0" cellpadding="0" cellspacing="0" style="margin:auto; padding:150px 195px 200px; font-family: sans-serif;" background="http://quest.itgen.io/images/fon.jpg" width=800>
    <tr>
        <tr>
          <td height="300" width="415" bgcolor="#ffffff" style="border-radius: 24px; text-align: center; padding: 40px 50px; border: 0.5px solid #E3E4E7; box-sizing: border-box;text-align: center;">
            <img src="https://static.tildacdn.com/tild6661-6462-4666-a235-643434376139/logo2.png" alt="Айтигенио" style="width: 35%;">
            <h1 style="font-style: normal; font-weight: bold; font-size: 22px; line-height: 26px;color: #222630;">Осталось нажать на кнопку</h1>
            <span style="font-size: 14px; line-height: 16px;">Здравствуй, '.$user->name.'!<br>
              Чтобы перейти к олимпиаде, нажми на кнопку
            </span>
            <a href="https://quest.itgen.io/?u='.$user->address.'" style="display: block; width: fit-content; margin: 25px auto 0; padding:8px 32px; background: #FFDC40; box-shadow: -2px 4px 0px #DB994B, 2px 4px 0px #DB994B; border-radius: 42px; text-decoration: none; font-size: 16px; line-height: 22px; color: #323557;">Перейти к олимпиаде</a>
          </td>
        </tr>
      </table>
    </tr>
  </table>';

require 'PHPMailer/PHPMailerAutoload.php';



$mail = new PHPMailer;



$mail->isSMTP();



$mail->Host = 'smtp.gmail.com';

$mail->SMTPAuth = true;

$mail->Username = 'itgenby@gmail.com';

$mail->Password = '1Itgeneration1';

$mail->SMTPSecure = 'tls';

$mail->SMTPAutoTLS = false;

$mail->SMTPKeepAlive = true;   

$mail->Mailer = “smtp”; //Кавычки в этой строке не менять! Не знаю почему, но это работает именно так

$mail->Port = 587;



$mail->CharSet = 'UTF-8';



$mail->From = 'itgenby@gmail.com';

$mail->FromName = 'Itgenio';

$mail->addAddress($user->email);



$mail->IsHTML(true);



$mail->Subject = 'Олимпиада по программированию';

$mail->Body = $mailbody;



$mail->AltBody = 'Здравствуй, '.$user->name.'!';

$mail->AltBody .= 'Чтобы перейти к олимпиаде, перейди по ссылке';

$mail->AltBody .= 'https://quest.itgen.io/?u='.$user->address;



if($mail->send()) {

    header ('Refresh:0; url="\?reg='.$user->id);

}else{

    echo 'Что-то пошло не так. Письмо не может быть отправлено';

    echo $mail->ErrorInfo;

}



?>