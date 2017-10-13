$(function(){
/*----- constants -----*/
var slots = ['1', '2', '3'];
var symbols = [
  {color: 'OrangeRed', img: 'http://downloadclipart.org/do-upload/clipart/2016-06/Cute_cherries_clip_art.png' },
  {color: 'orange', img: 'http://downloadclipart.org/do-upload/clipart/2016-06/Orange_clipart_png.png' },
  {color: 'yellow', img: 'https://tr1.cbsistatic.com/hub/i/2015/05/07/a6b60bbe-f4ae-11e4-940f-14feb5cc3d2a/lemon09062012.png' },
  {color: 'lightblue', img: 'https://i.imgur.com/1I9zh7g.png' }, 
  {color: 'red', img: 'http://clipart-library.com/img/688217.png' },
];
var sounds = {
  coin: "sounds/coinslot.wav",
  win: "sounds/win.mp3",
  spinning: 'sounds/',
  switch: "sounds/switch.mp3"
};
/*----- app's state (variables) -----*/
var money;
var menu;
var bet;
var multi;
var betAm;
var animating;
var player = new Audio();
var bgPlayer = new Audio();
/*----- event listeners -----*/
$('#handle').on('click', spinSlots);
$('.bet1').on('click', function(){insertCoin(1)});
$('.bet25').on('click', function(){insertCoin(25)});
$('.bet100').on('click', function(){insertCoin(100)});
$('.bet1000').on('click', function(){insertCoin(1000)});
$('#start').on('click', function() {checkMenu('start')});
$('#instructions').on('click', function() {checkMenu('inst')});
$('.back').on('click', function() {checkMenu('back')});
$('.back2').on('click', function() {checkMenu('back')});
$('.reset').on('click', reset);
/*----- functions -----*/
function playSound(name){
  player.src = sounds[name]
  if (name === 'win'){player.volume = 0.4;}
  if (name === 'quack'){player.volume = 0.5;}
  if (name === 'coin'){player.volume = 0.7;}
  player.play();
};
function checkMenu(name){
  if (name === 'start'){
    $('section#main').css('display', 'block');
    $('.container').css('margin', '0');
    $('section#menu').css('display', 'none');
    $('body').css('background-repeat', "no-repeat");
    menu = 0;
  }
  else if (name === 'inst'){
    $('section#menu').css('display', 'none');
    $('section#instMenu').css('display', 'block');
    $('.container').css('margin', '0 auto');
    menu = 0;
  }
  else if (name === 'back'){
    $('section#instMenu').css('display', 'none');
    $('section#main').css('display', 'none');
    $('section#menu').css('display', 'block');
    $('.container').css('margin', '0 auto');
    menu = 1;
  }
}
function init(){
  slots = [5,5,5];
  money = 50;
  bet = 0;
  render();
}
function render(){
  slots.forEach(function(slot,idx){
    $slot = $(`div.s${idx+1}`);
    child = $slot.children();
    $(`div.s${idx+1}`).css('background-color', 'white');
    switch(slot){
      case 1:
        child.attr("src", symbols[0].img);
        child.attr("width", 220);
        child.attr("height", 230);
        break;
      case 2: 
        child.attr("src", symbols[1].img);
        child.attr("width", 225);
        child.attr("height", 235);
        break;
      case 3: 
        child.attr("src", symbols[2].img);
        child.attr("width", 220);
        child.attr("height", 200);
        break;
      case 4: 
        child.attr("src", symbols[3].img);
        child.attr("width", 240);
        child.attr("height", 230);
        break;
      case 5: 
        child.attr("src", symbols[4].img);
        child.attr("width", 260);
        child.attr("height", 240);
        break;

      default:
        $(`div.s${idx+1}`).css('background-color', 'Pink');
        $(`div.s${idx+1}`).text('Uh-Oh');
        break;
    }
  })
  $('p.winnings').html(`$${money}`);
  $('p.betM').html(`Bet: `);
  $('p.betC').html(`$${bet}`);
}

function randSlots(idx){
  var num;
    num = Math.floor((Math.random()*12) + 1);
    if (num < 5) {
      slots[idx] = 1;
    } else if (num >= 5 && num < 8) {
      slots[idx] = 2;
    } else if (num >= 8 && num < 10){
      slots[idx] = 3;
    } else if (num >= 10 && num < 12){
      slots[idx] = 4;
    } else if (num === 12){
      slots[idx] = 5;
    }
  render();
}

function flashColor(color){
  $slots = $('div.squares div');
  var interval = setInterval(function(){
    $slots.css('background-color') === 'rgb(255, 255, 255)' ? $slots.css('background-color', color) : $slots.css('background-color', 'white');
  }, 250);
  setTimeout(function(){
    clearInterval(interval)
  }, 3000);
}



function spinSlots(){
  if(animating) return;
  if(bet===0) return;
  animating = true;
  if (bet > 0){
    multi = bet;
    bet = 0;
    var first = setInterval(function(){
      randSlots(0);
    }, 50)
    var second = setInterval(function(){
      randSlots(1);
    }, 50)
    var third = setInterval(function(){
      randSlots(2);
    }, 50)
    setTimeout(function(){ 
      playSound('switch');
      clearInterval(first);
      setTimeout(function(){
        clearInterval(second);
        playSound('switch');
        setTimeout(function(){
          animating = false;
          clearInterval(third);
          cheat();
          playSound('switch');
          checkWin();
        }, 1500)
      }, 1500)
    }, 1500);
  }
}
function checkWin(){
  if((slots[0] === slots[1]) && (slots[1] === slots[2])){
    playSound('win');
    flashColor(symbols[slots[0]-1].color);
    var amount = Math.floor((multi * 1.2) * 5 * slots[0]);
    multi = 1;
    var time = setInterval(function(){
      money += Math.floor((amount/6));
      render();
    }, 500);
    setTimeout(function(){
      clearTimeout(time)
    }, 3000);
  }
  if(money === 0 && bet === 0){
    if (!animating){
      $('p.winnings').html('Bankrupt!')
      $('p.winnings').css('margin-left', '365px')
    }
  }
}
function cheat(){
  if (slots[0] === slots[1]){
      if(Math.random() > .50){
        slots[2] = slots[1];
      }
    }
  render();
}
function insertCoin(num){
  if (money >= num){
  money -= num;
  bet += num;
  render();
  }
  if (animating) return;
  playSound('coin')
}
function reset(){
  if(animating)return;
  $('p.winnings').css('margin-left', '500px')
  init();
}
init();
})

