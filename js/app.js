$(function(){
/*----- constants -----*/




/*----- app's state (variables) -----*/

slots = ['1', '2', '3'];
var money = 100;
var bet = 0;
//bet amount


/*----- cached element references -----*/

//slots 1-3
//button/handle

/*----- event listeners -----*/

$('button#handle').on('click', spinSlots);
$('button#coinSlot').on('click', insertCoin)
//betting 

/*----- functions -----*/

//init(), render(), spinSlot(), checkWin(), bet()
function init(){


  render();
}

function render(){
  slots.forEach(function(slot,idx){
    $(`td.${idx+1}`).text(slot);
  })
  $('p.cash').text(`Current Cash: $${money}`)
  $('p.betM').text(`Amount Entered: $${bet*5}`)


  if(money === 0 && bet === 0){
    alert('You lose')
  }


}

function spinSlots(){
  if (bet > 0){
  slots.forEach(function(slot,idx){
    slots[idx] = Math.floor(Math.random()*3) + 1
    console.log(slots)
    })
  bet -= 1;
  
//(state[first] && (state[first] === state[second]) && (state[first] === state[third]))
  if((slots[0] === slots[1]) && (slots[1] === slots[2])){
    money += 20;
    console.log('lkjsadf')
  }
  render();
  }
}

function checkWin(){

}

function insertCoin(){
  if (money > 0){
  money -= 5;
  bet += 1;
  render();
  }
}




init();







})

