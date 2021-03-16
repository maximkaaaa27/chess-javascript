import './style.css';


class Chess {

  constructor(element, info) {
    this.el = element;
    this.elInfo = info;
    this.moveClassColor = 'white';
    this.possibleMoves = 0;
    this.savePawnX = -1;
    this.savePawnY = -1;
    this.savePawnFigure = ' ';
    this.moveFromX = '';
    this.moveFromY = '';
    this.pawnAttackX = -1;
    this.pawnAttackY = -1;
    this.fromFigure = ' ';
    this.toFigure = ' ';
    this.chessFigureArray = [
      ['R', 'P', ' ', ' ', ' ', ' ', 'p', 'r'], 
      ['N', 'P', ' ', ' ', ' ', ' ', 'p', 'n'],
      ['B', 'P', ' ', 'p', ' ', ' ', ' ', 'b'],
      ['Q', 'P', ' ', ' ', ' ', ' ', 'p', 'q'],
      ['K', 'P', ' ', ' ', 'k', ' ', 'p', ' '],
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

  clearTop() {
    for (let x = 0; x <= 7; x++) {
      for(let y = 0; y <= 7; y++) {
          this.topBoardArray[x][y] = ' ';
      }
    }
    return;
  }


  canMove(sx, sy, dx, dy) {
    if (!this.canMoveFrom(sx, sy)) 
      return false;
    if (!this.canMoveTo(dx, dy)) 
      return false;
    if (!this.isCorrectMove(sx, sy, dx, dy)) 
      return false;
    if (!this.isCheckAfterMove(sx, sy, dx, dy))
      return true;
    else 
      return false;

  }
  isCheckAfterMove(sx, sy, dx, dy) {
    this.moveFigure(sx, sy, dx, dy);
    
    this.turnMove();
    let check = this.isCheck();
    this.turnMove();
    this.backFigure(sx, sy, dx, dy);
    return check;
  }


  isCheck() {

    const king = this.findFigure(this.moveClassColor === 'white' ? 'k' : 'K');

    for (let x = 0; x <= 7; x++)
      for(let y = 0; y <= 7; y++)
        if (this.getColor(x, y) === this.moveClassColor)
          if(this.isCorrectMove(x, y, king.x, king.y))
            return true;
    return false;

  }

  isCheckMate () {
    if (!this.isCheck(this.moveClassColor)) return false;
    return this.possibleMoves === 0;
  }

  isStallmate() {
    if (this.isCheck(this.moveClassColor)) return false;
    return this.possibleMoves === 0;
  }

  findFigure(figure) {
    for (let x = 0; x <= 7; x++)
      for (let y = 0; y <= 7; y++)
        if (this.chessFigureArray[x][y] === figure)
          return {x: x, y: y};
    return {x: -1, y: -1};
  }

  isCorrectMove(sx, sy, dx, dy) {

    const figure = this.chessFigureArray[sx][sy];

    if (this.isKing(figure)) {
      return this.isCorrectKingMove (sx, sy, dx, dy);
    }    
    if (this.isQueen(figure)) {
      return this.isCorrectQueenMove (sx, sy, dx, dy);
    }
    if (this.isBishop(figure)) {
      return this.isCorrectBishopMove (sx, sy, dx, dy);
    }    
    if (this.isKnight(figure)) {
      return this.isCorrectKnightMove (sx, sy, dx, dy);
    }    
    if (this.isRook(figure)) {
      return this.isCorrectRookMove (sx, sy, dx, dy);
    }    
    if (this.isPawn(figure)) {
      return this.isCorrectPawnMove (sx, sy, dx, dy);
    }    
         
    return false;
  }
  

  isKing(figure) {
    return figure.toUpperCase() === 'K';
  }

  isQueen(figure) {
    return figure.toUpperCase() === 'Q';
  }

  isBishop(figure) {
    return figure.toUpperCase() === 'B';
  }

  isKnight(figure) {
    return figure.toUpperCase() === 'N';
  }

  isRook(figure) {
    return figure.toUpperCase() === 'R';
  }

  isPawn(figure) {
    return figure.toUpperCase() === 'P';
  }


  isCorrectKingMove(sx, sy, dx, dy) {
    if (Math.abs(dx -sx) <= 1 && Math.abs(dy-sy) <= 1) return true;
    return false;
  }

  isCorrectQueenMove(sx, sy, dx, dy) {
      return this.isCorrectLineMove(sx, sy, dx, dy, 'Q');
  }

  isCorrectBishopMove(sx, sy, dx, dy) {
    return this.isCorrectLineMove(sx, sy, dx, dy, 'B');
  }

  isCorrectKnightMove(sx, sy, dx, dy) {
    if (Math.abs(dx - sx) === 1 && Math.abs (dy - sy) === 2)
    return true;
    if (Math.abs (dx - sx) === 2 && Math.abs (dy - sy) === 1)
    return true;

  return false;
  }

  isCorrectRookMove(sx, sy, dx, dy) {
    return this.isCorrectLineMove(sx, sy, dx, dy, 'R');
  }

  isCorrectPawnMove(sx, sy, dx, dy) {
     if (sy < 1 || sy > 6) 
      return false;
    if(this.getColor(sx,sy) === 'white')
      return this.isCorrectSignPawnMove(sx, sy, dx, dy, 1);
    if(this.getColor(sx,sy) === 'black')
      return this.isCorrectSignPawnMove(sx, sy, dx, dy, -1);
    return false;
  }

  isCorrectSignPawnMove(sx, sy, dx, dy, sign) {

    if(this.isPawnPassant(sx, sy, dx, dy, sign)) 
      return true;

    if(!this.isEmpty(dx, dy)) { // Это взятие?
      if( Math.abs(dx - sx) != 1) // Один шаг влево/вправо
        return false;
      return (dy - sy === sign);
    }

    if (dx != sx)
      return false;

    if(dy - sy === sign)
      return true;

    if (dy - sy === sign * 2) {
        if(sy != 1 && sy != 6) 
          return false;
        return this.isEmpty(sx, sy + sign);    
    }
      return false; 
  }

  

  isPawnPassant(sx, sy, dx, dy, sign) {
    if (!(dx === this.pawnAttackX && dy === this.pawnAttackY))
      return false;
    if(sign === + 1 && sy != 4) // Взятие на проходе для белых пешек только с 4 горизонтали
      return false;
    if(sign === - 1 && sy != 3) // Взятие на проходе для черных пешек только с 3 горизонтали
      return false;
    if((dy - sy) != sign)
      return false;
    return (Math.abs(dx- sx) === 1);
  }

  isCorrectLineMove(sx, sy, dx, dy, figure) {
    let deltaX = Math.sign(dx - sx);
    let deltaY = Math.sign(dy - sy);
    
    if (!this.isCorrectLineDeltaMove(deltaX, deltaY, figure)) return false;
    do {
      sx += deltaX;
      sy += deltaY;
        if (sx === dx && sy === dy) //Test Ending Move
        return true;
    } while(this.isEmpty(sx, sy));

    return false;
  }

  isCorrectLineDeltaMove(deltaX, deltaY, figure) {
    if (this.isRook(figure))
      return this.isCorrectRookDelta(deltaX, deltaY);
    if (this.isBishop(figure))
      return this.isCorrectBishopDelta(deltaX, deltaY);
    if (this.isQueen(figure))
      return this.isCorrectQueenDelta();

    return false;
  }

  isCorrectRookDelta(deltaX,deltaY) {
      return Math.abs(deltaX) + Math.abs(deltaY) === 1;
  }

  isCorrectBishopDelta(deltaX,deltaY) {
    return Math.abs(deltaX) + Math.abs(deltaY) === 2;
    
  }

  isCorrectQueenDelta() {
    return true;  
  }


  onMap(x, y) {
    return (x >= 0 && x <= 7 && y >=0 && y <=7);
  }

  isEmpty(x, y) {
    if(!this.onMap(x, y)) return false;

    return this.chessFigureArray[x][y] === ' ';
  }

  markMoveFrom () {
    this.possibleMoves = 0;
    for (let sx = 0; sx <= 7; sx++) {
        for(let sy = 0; sy <= 7; sy++) {
          for (let dx = 0; dx <= 7; dx++) {
            for(let dy = 0; dy <= 7; dy++) {
            if (this.canMove(sx, sy, dx, dy)) { 
              this.topBoardArray[sx][sy] = 1;
              this.possibleMoves ++;
            }
          }
        } 
      }
    }
  }


  markMoveTo () {
    for (let x = 0; x <= 7; x++) {
        for(let y = 0; y <= 7; y++) {
            if (this.canMove(this.moveFromX, this.moveFromY, x, y)) this.topBoardArray[x][y] = 2;
            
        }
    }
  }


  canMoveFrom (x,y) {
    if (!this.onMap(x,y)) return false;
    return this.getColor(x,y) === this.moveClassColor;
  }


  canMoveTo (x,y) {
    if (!this.onMap(x,y)) return false;
    if (this.chessFigureArray[x][y] === ' ') return true;
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
            } else {
            classBoardTd = this.topBoardArray[x][y] === 1 ? 'green': 'red';
            }
          
          board += `<td class="${classBoardTd}" id="${x}${y}">`;
          board += this.showFigure(this.chessFigureArray[x][y]); 
          board += '</td>';
            
        }
        board += '</tr>';
      }
    this.el.innerHTML = board;
    this.addEventTable();

    this.showInfo();
  }

  showInfo () {
    let infoHtml = `Turns: ${this.moveClassColor}`;
    this.turnMove();
    if(this.isCheckMate())
      infoHtml += ` CHEСKMATE ! 💪`;
    else
     if (this.isStallmate())
      infoHtml += ` STALLMATE??? 🤔`;
    else
     if (this.isCheck())
      infoHtml += ` CHECK!!! ☝`;
    this.turnMove();
 
    this.elInfo.innerHTML = infoHtml;
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

  moveFigure(sx, sy, dx, dy) {
    this.fromFigure = this.chessFigureArray[sx][sy];
    this.toFigure = this.chessFigureArray[dx][dy];
    this.chessFigureArray[dx][dy] = this.fromFigure;
    this.chessFigureArray[sx][sy] = ' ';
    this.movePawnAttack(this.fromFigure, dx, dy);
  }

  backFigure(sx, sy, dx, dy) {
    this.chessFigureArray[sx][sy] = this.fromFigure;
    this.chessFigureArray[dx][dy] = this.toFigure;
    this.backPawnAttack();
  }

  clickboxTo(toX, toY) {
    this.moveFigure(this.moveFromX, this.moveFromY, toX, toY);
    this.promotePawn(this.fromFigure, toX, toY);

    this.checkPawnAttack(this.fromFigure, toX, toY);

    this.clearTop();
    this.turnMove();
    this.markMoveFrom();
    this.showBoard();  
  }

  promotePawn(fromFigure, toX, toY) {

    if (!this.isPawn(this.fromFigure))
      return;
    if (!(toY === 7 || toY === 0))
      return;

    let figure;

    do {
      figure = prompt('Select figure to promote: Q R B N', 'Q');
    } while (!(
      this.isQueen(figure) ||
      this.isRook(figure) ||
      this.isBishop(figure) ||
      this.isKnight(figure)
    ));
      if(this.moveClassColor === 'white')
        figure = figure.toUpperCase();
      else
        figure = figure.toLowerCase();
    this.chessFigureArray[toX][toY] = figure;
  }


  movePawnAttack(fromFigure, toX, toY) {
    if(this.isPawn(fromFigure))
    if(toX === this.pawnAttackX && toY === this.pawnAttackY) {
      let y = this.moveClassColor === 'white' ? toY - 1 : toY + 1;
      this.savePawnFigure = this.chessFigureArray[toX][y];
      this.savePawnX = toX;
      this.savePawnY = y;
      this.chessFigureArray[toX][y] = ' ';
    }
  }

  backPawnAttack() {
    if (this.savePawnX == -1) return;
        this.chessFigureArray[this.savePawnX][this.savePawnY] = this.savePawnFigure; 
    
  }
  

  checkPawnAttack(fromFigure, toX, toY) {
    this.pawnAttackX = -1;
    this.pawnAttackY = -1;
    this.savePawnX = -1;
    if(this.isPawn(fromFigure))
      if(Math.abs(toY - this.moveFromY)) {
        this.pawnAttackX = this.moveFromX;
        this.pawnAttackY = (this.moveFromY + toY) / 2;
      }

  }

  turnMove() {
    this.moveClassColor = (this.moveClassColor === 'white') ? 'black': 'white';
  }

}
const board = document.querySelector('#board');
const info = document.querySelector('#info');
new Chess(board, info);

window.Chess = Chess;