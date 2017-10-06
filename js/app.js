$(function(){
/*----- constants -----*/




/*----- app's state (variables) -----*/

slots = ['1', '2', '3'];
var money = 1000;
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
    switch(slot){
      case 1:
        $(`td.${idx+1}`).css('content:url(http://placehold.it/350x150)');  
        $(`td.${idx+1}`).css('background-color', 'red');
        $(`td.${idx+1}`).text('Cherry')
        break;
      case 2: 
        $(`td.${idx+1}`).css('background-color', 'purple');
        $(`td.${idx+1}`).text('Grapes')
        break;
      case 3: 
        $(`td.${idx+1}`).css('background-color', 'yellow');
        $(`td.${idx+1}`).text('Lemon')
        break;
      case 4: 
        $(`td.${idx+1}`).css('background-color', 'orange');
        $(`td.${idx+1}`).text('Orange')
        break;
      case 5: 
        $(`td.${idx+1}`).css('background-color', 'blue');
        $(`td.${idx+1}`).text('Seven')
        break;
      case 6:
        $(`td.${idx+1}`).css('background-color', 'Pink');
        $(`td.${idx+1}`).text('Uh-Oh');
        break;

      default:
        $(`td.${idx+1}`).text(slot)
    }
    // $(`td.${idx+1}`).text(slot);
  })
  $('p.cash').text(`Current Cash: $${money}`)
  $('p.betM').text(`Amount Entered: $${bet*5}`)


  if(money === 0 && bet === 0){
    alert('You lose')
  }


}

function spinSlots(){
  var num
  if (bet > 0){
  slots.forEach(function(slot,idx){
      num = Math.floor((Math.random()*10) + 1);
    console.log(num)

    if (num < 4) {
      slots[idx] = 1;
    } else if (num >= 4 && num < 7) {
      slots[idx] = 2;
    } else if (num >= 7 && num < 9){
      slots[idx] = 3;
    } else if (num === 9){
      slots[idx] = 4;
    } else if (num === 10){
      slots[idx] = 5;
    }
    //slots[idx] = Math.floor(Math.random()*10) + 1
    })
  bet -= 1;
  
//(state[first] && (state[first] === state[second]) && (state[first] === state[third]))
  if((slots[0] === slots[1]) && (slots[1] === slots[2])){
    money += 25*slots[0];
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

