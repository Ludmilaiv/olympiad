<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <title>Олимпиада в Айтигенио 2020</title>
  <link rel="stylesheet" href="styles/style.css">
  <link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">

</head>
<body>
	<div class="page-content lastPagepage-content">
		<div class="top-panel lastPagetop-panel">
			<div class="line-block">
		  		<span class="lastPageTitle"><img src="../images/student.png" alt="">&nbsp;<?php echo $user->name ?></span>
				</div>
				
		</div>
		

	  <div class="container">
	    
    	<div id="lastPageLeftPannel">
			<?php 
				//Это выведется, если участник не успел пройти олимпиаду целиком
				if ($results->finish_time == 0)
					echo '
							<div class="left ad" style="font-weight:bold;max-width:400px">К сожалению, время олимпиады окончено. Не переживай, если не успел дойти до конца. Ты получаешь сертификат участника</div><br>'
    			
				?>

    		<span class="title">Результаты</span>
    		<div class="results">
    			<div class="line">
    				<div class="left">Количество набранных баллов</div><div class="right"><?php echo $results->points ?></div>
    			</div>
    			<div class="line">
    				<div class="left">Использовано блоков</div><div class="right"><?php echo $results->blocks ?></div>
    			</div>
    			<div class="line">
						<div class="left">Потрачено времени на выполнение</div><div class="right">
							<?php 
								$time = $results->finish_time - $results->starting_time;
								$hours = floor($time / 60 / 60);
								$minutes = floor($time / 60) % 60;
								$format_h = ''; $format_m = ''; 
        				if (floor($hours / 10) == 0) $format_h = '0';
        				if (floor($minutes / 10) == 0) $format_m = '0';
								echo $format_h.$hours.':'.$format_m.$minutes;
							?>
							</div>
    			</div>

    			<div class="line">
    				<div class="left ad">Победители квеста будут известны 12.09</div>
    			</div>
    		</div>
		</div>

		<?php 
					$imgurl = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/images/sert.php?u='.$_GET['u'];
				?>

		<div id="lastPageRightPannel">
			<div class="row">
				<span class="title">Призы</span>
				<?php 
					echo '<a download href="'.$imgurl.'" class="saveInPDF" >Скачать в png</a>';
				?>
				
			</div>

			<div class="wrapper">	
				<?php 
					echo '<img src="'.$imgurl.'" alt="сертификат">';
				?>
			</div>
		</div>	    
	  </div>
	</div>
	
  <!-- <script src="../scripts/sert.js"></script> -->
</body>
</html>