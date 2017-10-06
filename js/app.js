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
        $(`td.${idx+1}`).html("<img src='http://www.pngall.com/wp-content/uploads/2016/05/Cherry-PNG-Clipart.png' alt='Whoops' height='250' width='250'>")
        $(`td.${idx+1}`).css('background-color', 'red');
        // $(`td.${idx+1}`).text('Cherry')
        break;
      case 2: 
        $(`td.${idx+1}`).css('background-color', 'orange');
        $(`td.${idx+1}`).html("<img src='http://downloadclipart.org/do-upload/clipart/2016-06/Orange_clipart_png.png' alt='Whoops' height='250' width='250'>")
        break;
      case 3: 
        $(`td.${idx+1}`).css('background-color', 'yellow');
        $(`td.${idx+1}`).html("<img src='https://tr1.cbsistatic.com/hub/i/2015/05/07/a6b60bbe-f4ae-11e4-940f-14feb5cc3d2a/lemon09062012.png' alt='Whoops' height='220' width='220'>")
        break;
      case 4: 
        $(`td.${idx+1}`).css('background-color', 'green');
        $(`td.${idx+1}`).html("<img src='https://tr1.cbsistatic.com/hub/i/2015/05/07/a71cca26-f4ae-11e4-940f-14feb5cc3d2a/pear09062012.png' alt='Whoops' height='220' width='220'>")
        break;
      case 5: 
        $(`td.${idx+1}`).css('background-color', 'gold');
        $(`td.${idx+1}`).html("<img src='http://clipart-library.com/img/688217.png' alt='Whoops' height='325' width='325'>")
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
      num = Math.floor((Math.random()*12) + 1);
    console.log(num)

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

