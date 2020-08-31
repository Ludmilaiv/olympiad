"use strict"







//Описываем класс для нашего персонажа

class Herro {



  constructor() {

    // текущий уровень

    this.level=6;



    //текущий счет

    this.score=21;



    // адрес фона текущего уровня

    this.bgImageName='';



    // адрес картинки персонажа

    this.heroImageName='';



    // адрес картинки с финишем

    this.finishImageName='';





    // массив с начальными значениями точки старта

    this.startPosition=[1,3];



    // массив со значениями точки финиша

    this.finishPosition=[11,10];



    // Позиции деталей

    this.details=[

      {name : 'detail1', position: [4,3]},

      {name : 'detail2', position: [6,3]},

      {name : 'detail3', position: [6,5]},

      {name : 'detail4', position: [6,8]},

      {name : 'detail5', position: [6,10]},

      {name : 'detail6', position: [6,6]},

      {name : 'detail7', position: [9,10]}

    ];



    // Вес самой тяжелой детали

    this.maxweight=13;



    // Вес детали

    this.inBackpack=0;



     this.tracks = [

        {begin : [1,3], leng: 6, direct: 0},

        {begin : [6,10], leng: 8, direct: 1},

        {begin : [6,10], leng: 6, direct: 0}

    ]



    // Наша карта 1-стена, 0-дорога

    this.map = [

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      [1, 0, 0, 0, 3, 0, 7, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],

      [1, 1, 1, 1, 1, 1, 2, 0, 0, 8, 0, 0, 1],

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

        elem.style.left = array[i]['position'][0] * this.delta + "px";

        elem.style.top = array[i]['position'][1] * this.delta + "px";

        elem.style.backgroundImage = "url(../images/details/"+ array[i]['name'] +".png)";



        document.getElementById('showGame').appendChild(elem);

      }

    }

  

  //Сброс параметров

  reset() {

    //очищаем все таймауты, чтоб герой не продолжал двигаться

    this.timeOuts.forEach(function(element){

      clearTimeout(element);

    });  

    document.querySelectorAll('#score div.value')[0].innerHTML=this.score;

    this.inBackpack=0;

    this.funcDelay = 500;

    this.x = this.startPosition[0];

    this.y = this.startPosition[1];

    this.timeOuts = [];

    this.show(this.x, this.y, this.inBackpack);

    document.querySelector("#start").disabled = false;

  }

  //Метод для перестановки персонажа в позицию, 

  //соответствующую его координатам

  show(myX,myY,myBackpack) {





    // this.h.style.opacity = 1;

    if (this.map[myY][myX] != 1) { //проверяю наличие дороги по карте

      this.h.style.left = myX * this.delta + "px";

      this.h.style.top = myY * this.delta  + "px";

      document.getElementById('weightOfDetail').innerHTML=myBackpack;

      //Проверяем, не достиг ли герой цели

     if (myX == this.finishPosition[0] &&  myY== this.finishPosition[1]) {

       // Проверяю нашел ли максимальный вес детали

       if(myBackpack==this.maxweight){

          this.timeOuts.forEach(function(element){

            clearTimeout(element);
    
          }); 

         this.changeScore('add', 3);

       }

       

     }



    } else {

      //останавливаем все таймауты, чтобы остановить следующие шаги героя

      // console.log(this.timeOuts);

      this.timeOuts.forEach(function(element){

        clearTimeout(element);

      });  

      document.querySelector("#start").disabled = false;

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

  goRight() {

    this.x++;

    const thisX = this.x, thisY = this.y, thisBackpack = this.inBackpack;

    let timeout = setTimeout(() => {

      this.show(thisX, thisY, thisBackpack);

    }, this.funcDelay);

    this.timeOuts.push(timeout);

    this.funcDelay += this.delay;

  }

  goLeft() {

    this.x--;

    const thisX = this.x, thisY = this.y, thisBackpack = this.inBackpack;

    let timeout = setTimeout(() => {

      this.show(thisX, thisY, thisBackpack);

    }, this.funcDelay);

    this.timeOuts.push(timeout);

    this.funcDelay += this.delay;

  }

  goUp() {

    this.y--;

    const thisX = this.x, thisY = this.y, thisBackpack = this.inBackpack;

    let timeout = setTimeout(() => {

      this.show(thisX, thisY, thisBackpack);

    }, this.funcDelay);

    this.timeOuts.push(timeout);

    this.funcDelay += this.delay;

  }

  goDown() {

    this.y++;

    const thisX = this.x, thisY = this.y, thisBackpack = this.inBackpack;

    let timeout = setTimeout(() => {

      this.show(thisX, thisY, thisBackpack);

    }, this.funcDelay);

    this.timeOuts.push(timeout);

    this.funcDelay += this.delay;

  }



  //функция, определяющая, свободен ли путь в заданном направлении

  isFree(dir) {

    const x = this.x, y = this.y;

    let free = true;

    let place;

    switch(dir) {

      case "right":

        place = this.map[y][x+1];

        break;

      case "left":

        place = this.map[y][x-1];

        break;

      case "top":

        place = this.map[y-1][x];

        break;

      case "down":

        place = this.map[y+1][x];

        break;

    }

    if (place === 1) free = false;

    return free;

  };



  //определяет, совпадают ли текущие координаты с целью 



  isGoal() {

    if (this.x == this.finishPosition[0] &&  this.y== this.finishPosition[1]) {

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

    let bg_name;



    const levelTracks = this.tracks;

    levelTracks.forEach(elem => {

      const track = document.createElement("div");

      track.classList.add("track");

      let rndValue=0;

      if (elem.direct == 0) {

        track.style.height = this.delta + "px";

        track.style.width = this.delta * elem.leng + "px";

        track.style.left = this.delta * elem.begin[0] + "px";

        track.style.top = this.delta * elem.begin[1] + "px";

      } else {

        track.style.width = this.delta + "px";

        track.style.height = this.delta * elem.leng + "px";

        track.style.left = this.delta * elem.begin[0] + "px";

        track.style.top = this.delta * elem.begin[1] - this.delta * elem.leng + this.delta + "px";

      }

      document.querySelector("#showGame").append(track);

    })

    

    

   

    



    document.getElementById('curLevel').value=this.level;

    document.getElementsByClassName('js-open-modal')[0].click();

    this.bgImageName='images/bg/level'+this.level+'.jpg'; //генерирую адрес картинки с фоном для текущего уровня

    this.heroImageName='images/hero/level'+this.level+'.png'; //генерирую адрес картинки персонажа для текущего уровня

    this.finishImageName ='images/finish/level'+this.level+'.png'; //генерирую адрес картинки финиша для текущего уровня



    document.querySelector('#showGame').style.backgroundImage = "url("+ this.bgImageName+")";

    

    document.querySelector('#herro').style.background= "url("+ this.heroImageName+") no-repeat";



    document.querySelector('#herro').style.left = this.startPosition[0] * this.delta + "px";

    document.querySelector('#herro').style.top = this.startPosition[1] * this.delta + "px";



    document.querySelector('#exit').style.background= "url("+ this.finishImageName+") no-repeat";

    document.querySelector('#exit').style.left = this.finishPosition[0] * this.delta + "px";

    document.querySelector('#exit').style.top = this.finishPosition[1] * this.delta + "px";

    // document.querySelector('#exit').style.width = "48px";

    // document.querySelector('#exit').style.height = "48px";

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