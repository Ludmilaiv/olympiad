<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Олимпиада в Айтигенио 2020</title>
  <link rel="stylesheet" href="../styles/style.css">
  <link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">
</head>
<body>
	<canvas id="firework"></canvas>

	<div id="congratulation">Поздравляем!!!</div>
	<div id="score" style="display:none"><?php echo $results->points ?></div>
		<!-- до прохождения -->
	  <div class="modal modal-final" id="modal-final" data-modal="3">
	    <div class="content">
	    	<p><strong>Сервермэн:</strong> - Теперь сервер исправен, и мы можем ввести собранные части кода, чтобы победить БАГ! У меня есть недостающая часть кода <strong>«З».</strong></p><p><strong>Айтигеник:</strong> - Пока мы были в пещере, я обнаружил часть <strong>«ПЕ»</strong> - это заключительная часть! Теперь нам осталось только правильно их собрать и ввести полученное слово, чтобы наконец победить БАГ!</p>
	    	<div class="word"></div>
	    	<em class='error'>Неправильно! Попробуй еще раз!</em>
	    	<input type="text" id="finalAnswer" placeholder="Введите ответ"><br>
	    	<button class="ready" id="sendAnswer">Отправить</button>
	    </div>
	  </div>

	<!-- Подложка под модальным окном -->
	
	<div class="overlay js-overlay-modal"></div>


	  
	</div>
	

  	<script src="../scripts/finish.js"></script>
</body>
</html>