"use strict"







//Описываем класс для нашего персонажа

class Herro {



  constructor() {

    // текущий уровень

    this.level=5;



    //текущий счет

    this.score=21;



    // адрес фона текущего уровня

    this.bgImageName='';



    // адрес картинки персонажа

    this.heroImageName='';



    // адрес картинки с финишем

    this.finishImageName='';





    // массив с начальными значениями точки старта

    this.startPosition=[6,6];



    // массив со значениями точки финиша

   // this.finishPosition=[11,10];



    // Позиции деталей

    this.details=[

      {name : 'detail1', position: [3,6]},

      {name : 'detail2', position: [4,6]},

      {name : 'detail3', position: [7,6]},

      {name : 'detail4', position: [11,6]},
    ];



    // Вес самой тяжелой детали

    this.maxweight=13;



    // Вес детали

    this.inBackpack=0;


    // Наша карта 1-стена, 0-дорога

    this.map = [

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 0, 0, 2, 3, 0, 0, 4, 0, 0, 0, 5, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    ];







    this.isShowedHint=0; //Была ли подсказка уже показана. 1-да, 0 нет, -1 подсказки нет на уровне



    this.delta = Math.floor(document.querySelector("#showGame").offsetWidth / this.map.length);



    this.putDetails(this.details, this.delta);



   // this.delta = 55; //шаг персонажа в пикселях

    this.delay = 500; //задержка в мс между шагами персонажа

    this.funcDelay = 500 //ожидание до выполнения очередной функции 

    //(для каждой последующей функции это ожидание 

    //будет расти на величину this.delay, 

    //чтобы следующая функция не начиналась,

    //пока не закончатся предыдущие)

    this.timeOuts = []; //здесь будем хранить таймауты для каждого отображения героя



    this.h = document.querySelector("#herro"); //Наш персонаж

  };



  putDetails(array, delta){

      for(let i=0; i<array.length; i++){

        var elem=document.createElement('div');

        elem.className='detail';

        elem.style.left = array[i]['position'][0] * delta - 7 + "px";

        elem.style.top = array[i]['position'][1] * delta + "px";

        elem.style.backgroundImage = "url(../images/details/level6/"+ array[i]['name'] +".png)";

        elem.style.width = "50px";
        elem.style.height = "50px";

        document.getElementById('showGame').appendChild(elem);

        this.details[i].elem = elem;

      }

    }

  

  //Сброс параметров

  reset() {

    //очищаем все таймауты, чтоб герой не продолжал двигаться

    this.timeOuts.forEach(function(element){

      clearTimeout(element);

    });  

    document.querySelectorAll(".detail").forEach(elem => {
      elem.remove();
    });


    this.putDetails(this.details, this.delta);

    document.querySelectorAll('#score div.value')[0].innerHTML=this.score;

    this.inBackpack=0;

    this.funcDelay = 500;

    this.x = this.startPosition[0];

    this.y = this.startPosition[1];

    this.timeOuts = [];

    this.show(this.x, this.y, this.inBackpack);



  }

  //Метод для перестановки персонажа в позицию, 

  //соответствующую его координатам

  show(myX,myY,myBackpack) {


    // this.h.style.opacity = 1;

    if (myX >= this.map.length || myY < 0) {
      //останавливаем все таймауты, чтобы остановить следующие шаги героя

      // console.log(this.timeOuts);

      this.timeOuts.forEach(function(element){

        clearTimeout(element);

      });  

      document.querySelector("#start").disabled = false;

    } else {

      if (this.map[myY][myX] != 1) { //проверяю наличие дороги по карте

      this.h.style.left = myX * this.delta + "px";

      this.h.style.top = myY * this.delta  + "px";

        //Проверяем, не достиг ли герой цели
      console.log(myBackpack);
      if (myBackpack === 4) {

        // Проверяю все ли детали собраны

          this.changeScore('add', 3);     

          this.timeOuts.forEach(function(element){

            clearTimeout(element);
    
          });  
    
          document.querySelector("#start").disabled = false; 

        }


      } else {

        //останавливаем все таймауты, чтобы остановить следующие шаги героя

        // console.log(this.timeOuts);

        this.timeOuts.forEach(function(element){

          clearTimeout(element);

        });  

        document.querySelector("#start").disabled = false;

      }
    }

    

  };



  changeScore=function(op,val){

    let bonus=0;

    let elem=0;

  

    switch(op){

      case 'add':

        elem=document.createElement('div');

        elem.className = "scoreAnim add";

        elem.innerHTML = "+3";

        document.getElementById('score').append(elem);

        

        window.setTimeout(function() {

            elem.classList.add("showBonus")

        }, 100)





        this.score+=val;

        elem.classList.remove("showBonus");

        setTimeout(() => elem.remove(), 2000);

        break;

      

      case 'sub':

        elem=document.createElement('div');

        elem.className = "scoreAnim sub";

        elem.innerHTML = "-1";

        document.getElementById('score').append(elem);

        

        window.setTimeout(function() {

            elem.classList.add("showBonus")

        }, 100)





        this.score-=val;

        elem.classList.remove("showBonus");

        setTimeout(() => elem.remove(), 2000);

        break;

        break;

    }



    document.querySelectorAll('#score div.value')[0].innerHTML=this.score;



  }



  //Методы для перемещения персонажа

  goRight3() {

    this.x += 3;

    this.takeDetail();

    const thisX = this.x, thisY = this.y, thisBackpack = this.inBackpack;

    let timeout = setTimeout(() => {

      this.show(thisX, thisY, thisBackpack);

    }, this.funcDelay);

    this.timeOuts.push(timeout);

    this.funcDelay += this.delay;

  }

  goLeft2() {

    this.x -= 2;

    this.takeDetail();

    const thisX = this.x, thisY = this.y, thisBackpack = this.inBackpack;

    let timeout = setTimeout(() => {

      this.show(thisX, thisY, thisBackpack);

    }, this.funcDelay);

    this.timeOuts.push(timeout);

    this.funcDelay += this.delay;

  }

  takeDetail() {
    if (this.x >= 0 && this.x < this.map.length) {
      if (this.map[this.y][this.x] > 1) {
        this.inBackpack++;
        this.map[this.y][this.x] = 0;
        this.details.forEach(det => {
          if (det.position[0] == this.x) {
            setTimeout(() => det.elem.remove(), this.funcDelay + this.delay);
          }
        })
      }
    }
    
  }

 
  //функция, определяющая, свободен ли путь в заданном направлении

  isFree(dir) {

    const x = this.x, y = this.y;

    let free = true;

    let place;

    switch(dir) {

      case "right":

        if (x + 3 >= this.map.length) {
          return false;
        }

        place = this.map[y][x+3];

        break;

      case "left":

        if (x - 2 < 0) {
          return false;
        }

        place = this.map[y][x-2];

        break;

    }

    if (place === 1) free = false;

    return free;

  };



  //определяет, совпадают ли текущие координаты с целью 



  isGoal() {

    if (this.backpack === 4) {

      return true;



    } else {

      return false;

    }

  } 



  // Определяем какой сейчас уровень и делаем подготовку для следующего

  newLevel=()=>{

    

    if(this.isShowedHint==-1){

      document.getElementById('hint').style.display='none'; 

    }



    if (this.level<10){

      this.level++;

    }

    document.getElementById('curLevel').value=this.level;

    document.getElementsByClassName('js-open-modal')[0].click();

    this.bgImageName='images/bg/level'+this.level+'.jpg'; //генерирую адрес картинки с фоном для текущего уровня

    this.heroImageName='images/hero/level'+this.level+'.png'; //генерирую адрес картинки персонажа для текущего уровня

  
    document.querySelector('#showGame').style.backgroundImage = "url("+ this.bgImageName+")";

    

    document.querySelector('#herro').style.background= "url("+ this.heroImageName+") no-repeat";



    document.querySelector('#herro').style.left = this.startPosition[0] * this.delta + "px";

    document.querySelector('#herro').style.top = this.startPosition[1] * this.delta + "px";

  };





}



//Создаём нового персонажа

const gameHerro = new Herro();



document.addEventListener("DOMContentLoaded", () => {

  gameHerro.newLevel();



  // активируем панель инструментов

  const workspace = Blockly.inject('blocklyDiv', {

    toolbox: document.getElementById('toolbox')

  });



  //Генерация и запуск js кода для скрипта, составленного пользователем

  const getCode = function () {

    saveBlocksLocal();

    gameHerro.reset();

    this.disabled = true;

    const code = Blockly.JavaScript.workspaceToCode(workspace) + "";

    eval(code);

    let timeout = setTimeout(() => {

      this.disabled = false;

    }, gameHerro.funcDelay);

    gameHerro.timeOuts.push(timeout);

  }



  //Сохранение скрипта, составленного пользователем в локальное хранилище

  const saveBlocksLocal = function(){

    let xml = Blockly.Xml.workspaceToDom(workspace);

    let xml_text = Blockly.Xml.domToText(xml);

    localStorage.setItem("blocks", xml_text);

  }



  //Загрузка из локального хранилища

  const loadBlocksLocal = function(){

    if (localStorage.getItem("blocks")) {

      let xml_text = localStorage.getItem("blocks")

      let xml = Blockly.Xml.textToDom(xml_text);

      Blockly.Xml.domToWorkspace(xml, workspace);

    }

  }





  loadBlocksLocal();



  document.querySelector("#start").addEventListener("click", getCode);



  document.querySelector("#reset").addEventListener("click", gameHerro.reset.bind(gameHerro));

  document.querySelector("#hint").addEventListener("click", showHint);



  function showHint(){

    if(gameHerro.isShowedHint==0){

      if(gameHerro.score>0){

        gameHerro.isShowedHint=1;

        gameHerro.changeScore('sub',1);

      }

    }

  }



  //Сохраняем скрипт пользователя каждые 2 секунды

  setInterval(saveBlocksLocal, 2000);



  //Ставим персонажа в начальную позицию

  // gameHerro.show(gameHerro.x, gameHerro.y);



})