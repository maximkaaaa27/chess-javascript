import './style.css';


class Chess {

  constructor(element) {
    this.el = element;
    this.moveClassColor = 'white';
    this.moveFromX = '';
    this.moveFromY = '';
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
    this.topBoardArray = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ];
    this.showBoard();
  }


  markMoveFrom () {
    for (let x = 0; x <= 7; x++) {
        for(let y=0; y <=7; y++) {
            if (this.canMoveFrom(x,y)) this.topBoardArray[x][y] = 1;
        }
    }
  }


  markMoveTo () {
    for (let x = 0; x <= 7; x++) {
        for(let y = 0; y <= 7; y++) {
            if (this.canMoveTo(x,y)) this.topBoardArray[x][y] = 2;
            
        }
    }
  }


  canMoveFrom (x,y) {
    return this.getColor(x,y) === this.moveClassColor;
  }


  canMoveTo (x,y) {
    if( this.chessFigureArray[x][y] === ' ') return true;
    return this.getColor(x,y) != this.moveClassColor;
  }


  getColor(x,y) {
    const figure = this.chessFigureArray[x][y];
      if(figure === ' ') return '';
        return (figure.toUpperCase() === figure) ? 'white' : 'black';
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
    let board = '<table class="main-board">';

    this.markMoveFrom();
    

      for (let y = 7; y >= 0; y--) {
        board += '<tr>';
        for(let x = 0; x <= 7; x++) {

          let classBoardTd;

          if (this.topBoardArray[x][y] === ' ') {
            
            classBoardTd = (x + y) % 2 ? "white" : "black";

            } else

          classBoardTd = this.topBoardArray[x][y] === 1 ? 'green': 'red';
          board += `<td class="${classBoardTd}" id="${x}${y}">`;
          board += this.showFigure(this.chessFigureArray[x][y]); 
          board += '</td>';
        }
        board += '</tr>';
      }

    this.el.innerHTML = board;
    this.addEventTable();

  }


  addEventTable () {
    const table = document.querySelector('.main-board');

    table.addEventListener('click', (event) => {
        if (event.target === table) return;
      this.clickbox(event.target.getAttribute('id'));
    });

  }

  clickbox(tdId) {
    const x = parseInt(tdId[0]);
    const y = parseInt(tdId[1]);

    if (this.topBoardArray[x][y] === 1) {
      this.clickboxFrom(x, y);
    }

    if(this.topBoardArray[x][y] === 2) {
      this.clickboxTo(x, y);
    }
  }

  clickboxFrom(x, y) {
    this.moveFromX = x;
    this.moveFromY = y;

    this.markMoveTo();
    this.showBoard();

  }

  clickboxTo(x, y) {
    this.chessFigureArray[x][y] = this.chessFigureArray[this.moveFromX][this.moveFromY];
    this.chessFigureArray[this.moveFromX][this.moveFromY] = ' ';
    this.markMoveFrom();
    this.showBoard();
    
  }

}

new Chess(document.querySelector('#board'));

window.Chess = Chess;