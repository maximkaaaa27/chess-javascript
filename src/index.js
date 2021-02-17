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

  showFigure(FigureArr) {
      switch(FigureArr) {
        case 'K' : return '&#9812;'; case 'k' : return '&#9818';
        case 'Q' : return '&#9813;'; case 'q' : return '&#9819';
        case 'R' : return '&#9814;'; case 'r' : return '&#9820';
        case 'B' : return '&#9815;'; case 'b' : return '&#9821';
        case 'N' : return '&#9816;'; case 'n' : return '&#9822';
        case 'P' : return '&#9817;'; case 'p' : return '&#9823';
        default : return '&nbsp;';

      }
  }


  showBoard () {
    let board = '<table>';

      for (let y = 7; y >= 0; y--) {
        board += '<tr>';
        for(let x = 0; x <= 7; x++) {
          let classBoardTd;
          classBoardTd = (x + y) % 2 ? "white" : "black";
          board += '<td class="'+ classBoardTd +'">';
          board += this.showFigure(this.chessFigureArray[x][y]); 
          board += '</td>';
        }
        board += '</tr>';
      }

    this.el.innerHTML = board;

  }
}

new Chess(document.querySelector('#board'));

window.Chess = Chess;