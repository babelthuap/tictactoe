'use strict';

/*
 * the board buttons are laid out as follows:
 *   1 2 3
 *   4 5 6
 *   7 8 9
 */

$(document).ready(init);


function init() {
  // insert byline
  $('h1').after( $('<hr />') ).after( $('<i>').text('by Nicholas Neumann-Chun') );

  // insert turn indicator
  $('.board').after( $('<h2>').addClass('turn-indicator') );

  // insert restart button
  $('.turn-indicator').after( $('<button>').text('Restart!').addClass('restart') );
  $('button').click(startGame);

  // label buttons
  $('.btn').each(function(i) {
    $(this).data('id', i + 1);
  });

  startGame();
};


function startGame() {
  var whoseTurn = 'X';
  var claimedBy = {
    X: [],
    O: [],
  };

  // initialize board
  $('.btn').val(' ').css('color', 'black');
  $('.turn-indicator').text("X's turn").css('color', 'white');
  $('.restart').addClass('hidden');

  // handle button clicks
  $('.btn').on('click', function() {
    if ($(this).val() !== ' ') {
      return;
    }

    $(this).val(whoseTurn); // mark the button
    var btnId = $(this).data('id');
    claimedBy[whoseTurn].push(btnId);
    
    checkForEndGame();
  });

  function checkForEndGame() {
    var winningCombo = getWinningComboIn(claimedBy[whoseTurn]);

    if (winningCombo.length > 0) {
      winningCombo.forEach(function(btnId) {
        $('.btn:nth-of-type(' + btnId + ')').css('color', 'red');
      });
      $('.btn').off('click');
      $('.turn-indicator').text(whoseTurn + ' Wins!').css('color', 'red');
      $('.restart').removeClass('hidden');

    } else if (claimedBy['X'].length + claimedBy['O'].length === 9) {
      $('.btn').off('click');
      $('.turn-indicator').text('Tie Game!').css('color', 'green');
      $('.restart').removeClass('hidden');

    } else {
      whoseTurn = whoseTurn === 'X' ? 'O' : 'X';
      $('.turn-indicator').text(whoseTurn + "'s Turn");
    }
  }
}


var winningStates = [[1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontals
                     [1, 4, 7], [2, 5, 8], [3, 6, 9], // verticals
                     [1, 5, 9], [3, 5, 7]]; // diagonals

Array.prototype.containedIn = function(otherArray) {
  return this.every(function(element) {
    return otherArray.indexOf(element) !== -1;
  });
}

// check for (and return) a winning position
function getWinningComboIn(claimedSquares) {
  var combo = [];
  winningStates.forEach(function(state) {
    if (state.containedIn(claimedSquares)) {
      combo = combo.concat(state);
    }
  });
  return combo;
}
