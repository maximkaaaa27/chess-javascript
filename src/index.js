import './style.css';

function showMap () {
  let board = '<table>';

    for (let y = 7; y >= 0; y--) {
      board += '<tr>';
       for(let x = 0; x <= 7; x++) {
         board += '<td></td>';
       }
       board += '</tr>';
    }
    document.querySelector('#board').innerHTML = board;
}

showMap();