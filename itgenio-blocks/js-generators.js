//Тут прописываем функции, возвращающие js код, генерируемый каждым нашим блоком







Blockly.JavaScript['go_right'] = function(block) {



  var code = 'if (!gameHerro.isGoal()) gameHerro.goRight();\n';



  return code;



};







Blockly.JavaScript['go_left'] = function(block) {



  var code = 'if (!gameHerro.isGoal()) gameHerro.goLeft();\n';



  return code;



};







Blockly.JavaScript['go_up'] = function(block) {



  var code = 'if (!gameHerro.isGoal()) gameHerro.goUp();\n';



  return code;



};







Blockly.JavaScript['go_down'] = function(block) {



  var code = 'if (!gameHerro.isGoal()) gameHerro.goDown();\n';



  return code;



};







Blockly.JavaScript['while_direction_free'] = function(block) {



  var dropdown_direction = block.getFieldValue('direction');



  var statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');



  var code = `


  while (gameHerro.isFree("${dropdown_direction}") && gameHerro.loopLimit > 0) {

    if (gameHerro.isGoal()) break;

    ${statements_loop_body}

    gameHerro.loopLimit--;

  };\n`;



  return code;



};







Blockly.JavaScript['while_not_goal'] = function(block) {



  var statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');



  var code = `

 (function() {



    while (!gameHerro.isGoal() && gameHerro.loopLimit > 0) {



      gameHerro.loopLimit--;

      ${statements_loop_body}


    }
    

  })();\n`;



  return code;



};







Blockly.JavaScript['if_direction_free'] = function(block) {



  var dropdown_direction = block.getFieldValue('direction');



  var statements_condition_body = Blockly.JavaScript.statementToCode(block, 'condition_body');



  var code = `



  if (gameHerro.isFree("${dropdown_direction}") && !gameHerro.isGoal() ) {



    ${statements_condition_body}



  };\n`;



  return code;



};







Blockly.JavaScript['if_direction_free_else'] = function(block) {



  var dropdown_direction = block.getFieldValue('direction');



  var statements_condition_body = Blockly.JavaScript.statementToCode(block, 'condition_body');



  var statements_else_body = Blockly.JavaScript.statementToCode(block, 'else_body');



  var code = `



  if (gameHerro.isFree("${dropdown_direction}") && !gameHerro.isGoal()) {



    ${statements_condition_body}



  } else {



    ${statements_else_body}



  };\n`;



  return code;



};



Blockly.JavaScript['while_x'] = function(block) {

  var dropdown_comparing = block.getFieldValue('comparing');

  var text_value = block.getFieldValue('value');

  var statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');

  

  var code = `

  (function() {

    while (gameHerro.x*50 ${dropdown_comparing} ${text_value} && !gameHerro.isGoal() && gameHerro.loopLimit > 0) {

      gameHerro.loopLimit--;

    

      if (gameHerro.isGoal()) break;

      ${statements_loop_body}

    }

  })();\n`;



  return code;

};



Blockly.JavaScript['while_y'] = function(block) {

  var dropdown_comparing = block.getFieldValue('comparing');

  var text_value = block.getFieldValue('value');

  var statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');

  

  var code = `



  (function() {


    while ((gameHerro.map.length - 1 - gameHerro.y) * 50 ${dropdown_comparing} ${text_value}

    && !gameHerro.isGoal() && gameHerro.loopLimit > 0) {

      gameHerro.loopLimit--;

    if (gameHerro.isGoal()) break;

      ${statements_loop_body}

    }

  })();\n`;



  return code;

};



Blockly.JavaScript['if_part_weight'] = function(block) {

  var value_detail_1 = Blockly.JavaScript.valueToCode(block, 'detail_1', Blockly.JavaScript.ORDER_ATOMIC);

  var dropdown_condition = block.getFieldValue('condition');

  var value_detail_2 = Blockly.JavaScript.valueToCode(block, 'detail_2', Blockly.JavaScript.ORDER_ATOMIC);

  var statements_condition_body = Blockly.JavaScript.statementToCode(block, 'condition_body');

  var code = `

  if (${value_detail_1} ${dropdown_condition} ${value_detail_2}) {

    ${statements_condition_body}

  }

  ;\n`;

  return code;

};



Blockly.JavaScript['in_a_backpack'] = function(block) {

  var code = 'gameHerro.inBackpack';

  return [code, Blockly.JavaScript.ORDER_NONE];

};



Blockly.JavaScript['on_the_floor'] = function(block) {

  var code = 'gameHerro.map[gameHerro.y][gameHerro.x]';

  return [code, Blockly.JavaScript.ORDER_NONE];

};



Blockly.JavaScript['replace_the_part'] = function(block) {

  var code = `

  

  if (gameHerro.map[gameHerro.y][gameHerro.x] > 1) {
    gameHerro.saveDetal();
  }

  ;\n`;

  return code;

};



Blockly.JavaScript['for_loop'] = function(block) {

  var text_i = block.getFieldValue('i');

  var statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');

  var code = `

  for (var i = 0; i < ${text_i}; i++) {

    ${statements_loop_body}

  }

  ;\n`;

  return code;

};

Blockly.JavaScript['right_3'] = function(block) {
  var code = 'if (!gameHerro.isGoal()) {gameHerro.goRight3();};\n';
  return code;
};

Blockly.JavaScript['left_2'] = function(block) {
  var code = 'if (!gameHerro.isGoal()) {gameHerro.goLeft2();};\n';
  return code;
};