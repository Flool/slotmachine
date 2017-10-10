$(function(){
/*----- constants -----*/
var slots = ['1', '2', '3'];
var symbols = [
  {key: 'cherry', img: 'http://downloadclipart.org/do-upload/clipart/2016-06/Cute_cherries_clip_art.png' },
  {key: 'orange', img: 'http://downloadclipart.org/do-upload/clipart/2016-06/Orange_clipart_png.png' },
  {key: 'lemon', img: 'https://tr1.cbsistatic.com/hub/i/2015/05/07/a6b60bbe-f4ae-11e4-940f-14feb5cc3d2a/lemon09062012.png' },
  {key: 'pear', img: 'https://tr1.cbsistatic.com/hub/i/2015/05/07/a71cca26-f4ae-11e4-940f-14feb5cc3d2a/pear09062012.png' },
  {key: 'seven', img: 'http://clipart-library.com/img/688217.png' }
]
var sounds = {
  coin: "sounds/coinslot.wav",
  win: "sounds/win.mp3"
}




/*----- app's state (variables) -----*/

var money
var bet
var player = new Audio();
//bet amount


/*----- cached element references -----*/

//slots 1-3
//button/handle

/*----- event listeners -----*/

$('div#handle').on('click', spinSlots);
$('div#coinSlot').on('click', insertCoin)
//betting 

/*----- functions -----*/

//init(), render(), spinSlot(), checkWin(), bet()
function playSound(name){
  player.src = sounds[name]
  player.play();
}

function init(){
  slots = [6,6,6]
  money = 1000;
  bet = 0;
  render();
}

function render(){
  slots.forEach(function(slot,idx){
    $slot = $(`td.s${idx+1}`)
    child = $slot.children();
    switch(slot){
      case 1:
        $slot.css('background-color', 'red');
        child.attr("src", symbols[0].img)
        child.attr("width", 250)
        child.attr("height", 280)
        // $(`td.s${idx+1}`).html("<img src='http://downloadclipart.org/do-upload/clipart/2016-06/Cute_cherries_clip_art.png' alt='Whoops' height='280' width='250'>")
        
        break;
      case 2: 
        $slot.css('background-color', 'orange');
        child.attr("src", symbols[1].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 3: 
        $slot.css('background-color', 'yellow');
        child.attr("src", symbols[2].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 4: 
        $slot.css('background-color', 'green');
        child.attr("src", symbols[3].img)
        child.attr("width", 250)
        child.attr("height", 280)
        break;
      case 5: 
        $slot.css('background-color', 'gold');
        child.attr("src", symbols[4].img)
        child.attr("width", 250)
        child.attr("height", 280)
      case 6:
        $(`td.s${idx+1}`).css('background-color', 'gold');
        $(`td.s${idx+1}`).html("<img src='http://clipart-library.com/img/688217.png' alt='Whoops' height='325' width='325'>")
        break;

      default:
        $(`td.s${idx+1}`).css('background-color', 'Pink');
        $(`td.s${idx+1}`).text('Uh-Oh');
        break;

    }
    // $(`td.${idx+1}`).text(slot);
  })
  $('p.cash').text(`Current Cash: $${money}`)
  $('p.betM').text(`Amount Entered: $${bet*5}`)


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

function spinSlots(){
  if (bet > 0){
    bet -= 1;
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
    clearInterval(first);
    setTimeout(function(){
      clearInterval(second);
      setTimeout(function(){
        clearInterval(third);
        checkWin();
      }, 1500)
    }, 1500)
  }, 1500);

  }
}

function checkWin(){
  if((slots[0] === slots[1]) && (slots[1] === slots[2])){
    money += 25*slots[0];
    playSound('win')
    render();
  }
}

function insertCoin(){
  if (money > 0){
  money -= 5;
  bet += 1;
  render();
  }

  playSound('coin')
}




init();







})

