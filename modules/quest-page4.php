<!DOCTYPE html>

<html lang="ru">

<head>

  <meta charset="UTF-8">

  <title>Олимпиада в Айтигенио 2020</title>

  <link rel="stylesheet" href="styles/style.css">

	<link rel="shortcut icon" href="../images/favicon.ico" type="image/x-icon">
	
	<script src="scripts/browserFilter.js"></script>

  <script src="google-blockly/blockly_compressed.js"></script>

  <script src="google-blockly/blocks_compressed.js"></script>

  <script src="google-blockly/javascript_compressed.js"></script>

  <script src="itgenio-blocks/blocks.js"></script>

  <script src="itgenio-blocks/js-generators.js"></script>

  <script src="google-blockly/msg/js/ru.js"></script>

  <script src="scripts/modal.js"></script>

</head>

<body>

	<div class="page-content">

		<div class="top-panel">

			<div class="line-block">

		  		<input type="hidden" id='curLevel' value='4'> <!-- Текущий уровень -->

		  		<a href="#" class="js-open-modal show-mission btn" data-modal="1">Миссия</a>

		  		<a href="#" class="js-open-modal show-hint" id='hint' data-modal="2" title="Подсказка стоит 1 геник!">Подсказка &nbsp;<img src="../images/genic.png" alt="">&nbsp; -1</a>

					<div style="display:none" id="wasHint">
						<?php 
						 echo json_decode($results->hints)[$results->level - 1];	
						?>
					</div>
					<div style="display:none" id="numberBlocks">
						<?php 
						 echo $results->blocks;	
						?>
					</div>

		  	</div>



		  	<div id="levels" class="line-block">

			  	<ul>

			  		<li>1</li>

			  		<li>2</li>

			  		<li>3</li>

			  		<li class="active">4</li>

			  		<li>5</li>

			  		<li>6</li>

			  		<li>7</li>

			  	</ul>

		  	</div>



		  	<div id="score" class="line-block">

			  	<div class="value"><?php echo $results->points ?></div>

			  	<img src="../images/genic.png">

			</div>



		  





		</div>

		<!-- до прохождения -->

	  <div class="modal" data-modal="1">

	    <div class="content"></div>

	  </div>



	<!-- подсказка -->

	  <div class="modal" data-modal="2">

	   <!--   Svg иконка для закрытия окна  -->

	    <svg class="modal__cross js-modal-close" xmlns="http://www.w3.org/2000/svg"               viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>

	    <div class="content"></div>

	  </div>





	<!-- Подложка под модальным окном -->

	<div class="overlay js-overlay-modal"></div>



	  <div class="container">

	  <!--Это див, в котором будет панель инструментов-->

	    <div id="blocklyDiv"></div>



	    <div class="rightSide">

	    	<div class="tool-pannel">

	    		<button id="start" class="btn"><img src="../images/play.png" alt="">&nbsp;Старт</button>

	    		<button id="reset" class="btn">Вернуть персонажа</button>

	    	</div>



	    	<div id="showGame">

	    	    <div id="herro"></div>

				<div id="exit"></div>   

		    </div>

	    </div>

		

	    

	  </div>



	  <!--Создаём панель инструментов-->

	  <xml id="toolbox" style="display: none">

	    <category name="Движение">

	      <block type="go_left"></block>

	      <block type="go_right"></block>

	      <block type="go_up"></block>

	      <block type="go_down"></block>

	    </category>

	    <category name="Управление">

	      <block type="while_direction_free"></block>

	      <block type="while_not_goal"></block>

	    </category>

	    

	  </xml>

	</div>



  <script src="scripts/script4.js"></script>

</body>

</html>