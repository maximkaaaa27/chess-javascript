import './style.css';


class Chess {

  constructor(element) {
    this.el = element;
    this.chessFigureArray = [
      ['R', 'P', ' ', ' ', ' ', ' ', 'p', 'r'], 
      ['N', 'P', ' ', ' ', ' ', ' ', 'p', 'n'],
      ['B', 'P', ' ', ' ', ' ', ' ', 'p', 'b'],
      ['Q', 'P', ' ', ' ', ' ', ' ', 'p', 'q'],
      ['K', 'P', ' ', ' ', ' ', ' ', 'p', 'k'],
      ['B', 'P', ' ', ' ', ' ', ' ', 'p', 'b'],
      ['N', 'P', ' ', ' ', ' ', ' ', 'p', 'n'],
      ['R', 'P', ' ', ' ', ' ', ' ', 'p', 'r'],
   
    ];
    this.showBoard();
  }


  showBoard () {
    let board = '<table>';

      for (let y = 7; y >= 0; y--) {
        board += '<tr>';
        for(let x = 0; x <= 7; x++) {
          let classBoardTd;
          classBoardTd = (x + y) % 2 ? "white" : "black";
          board += '<td class="'+ classBoardTd +'">';
          board += this.chessFigureArray[x][y]; 
          board += '</td>';
        }
        board += '</tr>';
      }

    this.el.innerHTML = board;

  }
}

new Chess(document.querySelector('#board'));

window.Chess = Chess;