'use strict';

/*
 * the board squares are laid out as follows:
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
  $('.btn').val(' ');
  $('.turn-indicator').text("X's turn").css('color', 'white');
  $('.restart').addClass('hidden');

  // handle button clicks
  $('.btn').on('click', function() {
    var btnId = $(this).data('id');

    if ($(this).val() !== ' ') {
      return;
    }

    $(this).val(whoseTurn);
    claimedBy[whoseTurn].push(btnId);
    
    // check for end-game conditions
    if (isWinner(whoseTurn)) {
      $('.btn').off('click');
      $('.turn-indicator').text(whoseTurn + ' Wins!').css('color', 'red');
      $('.restart').removeClass('hidden');
    } else if (claimedBy['X'].length + claimedBy['O'].length === 9) {
      $('.turn-indicator').text('Tie Game!').css('color', 'green');
      $('.restart').removeClass('hidden');
    } else {
      whoseTurn = whoseTurn === 'X' ? 'O' : 'X';
      $('.turn-indicator').text(whoseTurn + "'s Turn");
    }
  });

  var winningStates = [[1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontals
                       [1, 4, 7], [2, 5, 8], [3, 6, 9], // verticals
                       [1, 5, 9], [3, 5, 7]]; // diagonals

  function isWinner(whoseTurn) {
    for (var i = 0; i < winningStates.length; ++i) {
      var isOwned = winningStates[i].every(function(square) {
        return claimedBy[whoseTurn].indexOf(square) !== -1;
      });

      if (isOwned) {
        return winningStates[i];
      }
    }
  }
}
