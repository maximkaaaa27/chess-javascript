import './style.css';


class Chess {

  constructor(element) {
    this.el = element;
    this.showBoard();
  }


  showBoard () {
    let board = '<table>';

      for (let y = 7; y >= 0; y--) {
        board += '<tr>';
        for(let x = 0; x <= 7; x++) {
          board += '<td></td>';
        }
        board += '</tr>';
      }

    this.el.innerHTML = board;

  }
}

new Chess(document.querySelector('#board'));

window.Chess = Chess;