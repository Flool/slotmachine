$(function(){
/*----- constants -----*/
var slots = ['1', '2', '3'];
var symbols = [
  {color: 'lightred', img: 'http://downloadclipart.org/do-upload/clipart/2016-06/Cute_cherries_clip_art.png' },
  {color: 'orange', img: 'http://downloadclipart.org/do-upload/clipart/2016-06/Orange_clipart_png.png' },
  {color: 'yellow', img: 'https://tr1.cbsistatic.com/hub/i/2015/05/07/a6b60bbe-f4ae-11e4-940f-14feb5cc3d2a/lemon09062012.png' },
  {color: 'red', img: 'http://clipart-library.com/img/688217.png' },
  {color: 'blue', img: 'https://i.imgur.com/1I9zh7g.png' }
]
var sounds = {
  coin: "sounds/coinslot.wav",
  win: "sounds/win.mp3",
  spinning: 'sounds/',
  switch: "sounds/switch.mp3"
  // quack: 'sounds/quack.mp3'
}




/*----- app's state (variables) -----*/

var money;
var manu;
var bet;
var multi;
var animating;
var player = new Audio();
var bgPlayer = new Audio();
//bet amount


/*----- cached element references -----*/



//slots 1-3
//button/handle

/*----- event listeners -----*/

$('div#handle').on('click', spinSlots);
$('div#coinSlot').on('click', insertCoin);
$('#start').on('click', function() {checkMenu('start')});
$('button#instructions').on('click', function() {checkMenu('inst')});
$('button#options').on('click', function() {checkMenu('opt')});
$('button.back').on('click', function() {checkMenu('back')});


//betting 

/*----- functions -----*/

//init(), render(), spinSlot(), checkWin(), bet()
function playSound(name){
  player.src = sounds[name]
  if (name === 'win'){player.volume = 0.4;}
  if (name === 'quack'){player.volume = 0.5;}
  if (name === 'coin'){player.volume = 0.7;}

  player.play();
}

function playMusic(){
  bgPlayer.src = 'sounds/bgmusic.mp3';
  bgPlayer.volume = 0.3;
  bgPlayer.play();
}

function checkMenu(name){
  if (name === 'start'){
    console.log('adkjlfajklsdfjjjj')
    $('section#main').css('display', 'block')
    $('section#menu').css('display', 'none')
  }
  else if (name === 'opt'){
    $('section#menu').css('display', 'none')
    $('section#optMenu').css('display', 'block')
  }
  else if (name === 'inst'){
    $('section#menu').css('display', 'none')
    $('section#instMenu').css('display', 'block')
  }
  else if (name === 'back'){
    $('section#optMenu').css('display', 'none')
    $('section#instMenu').css('display', 'none')
    $('section#menu').css('display', 'block')
  }
}

function init(){
  slots = [5,5,5]
  money = 50;
  bet = 0;
  render();
  playMusic();
}

function render(){
  slots.forEach(function(slot,idx){
    $slot = $(`td.s${idx+1}`)
    child = $slot.children();
    switch(slot){
      case 1:
        child.attr("src", symbols[0].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 2: 
        child.attr("src", symbols[1].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 3: 
        child.attr("src", symbols[2].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 4: 
        child.attr("src", symbols[3].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 5: 
        child.attr("src", symbols[4].img)
        child.attr("width", 250)
        child.attr("height", 280)
      case 6:
        $(`td.s${idx+1}`).css('background-color', 'white');
        $(`td.s${idx+1}`).html("<img src='https://i.imgur.com/1I9zh7g.png' alt='Whoops' height='250' width='280'>")
        break;

      default:
        $(`td.s${idx+1}`).css('background-color', 'Pink');
        $(`td.s${idx+1}`).text('Uh-Oh');
        break;

    }
    // $(`td.${idx+1}`).text(slot);
  })
  $('p.cash').html(`Current Cash: <strong>$${money}</strong>`)
  $('p.betM').html(`Bet: <strong>$${bet}</strong>`)


  if(money === 0 && bet === 0){
    alert('You lose')
  }


}

function randSlots(idx){
  var num
  
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
  $slots = $('td');
  var interval = setInterval(function(){
    $slots.css('background-color') === 'rgb(255, 255, 255)' ? $slots.css('background-color', color) : $slots.css('background-color', 'white');
  }, 250)

  setTimeout(function(){
    clearInterval(interval)
  }, 3000)
}

function spinSlots(){
  if (animating) return;
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
    console.log(amount);
    var time = setInterval(function(){
      money += Math.floor((amount/6));
      console.log(Math.floor(amount/6))
      render();
    }, 500)
    
    setTimeout(function(){
      clearTimeout(time)
    }, 3000)
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


function insertCoin(){
  if (animating) return;
  if (money > 0){
  money -= 1;
  bet += 1;
  render();
  }

  playSound('coin')
}




init();







})

