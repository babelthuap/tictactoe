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
  $('.turn-indicator').after( $('<button>').text('Restart!').addClass('hidden') );
  $('button').click(startGame);

  // label buttons
  $('.btn').each(function(i) {
    $(this).data('id', i + 1);
  });

  startGame();
};


function startGame() {
  var whoseTurn = 'X';

  // initialize board
  $('.btn').val(' ');
  $('.turn-indicator').text("X's turn");

  // handle button clicks
  $('.btn').on('click', function() {
    console.log('button clicked:', $(this).data('id'));

    $(this).val(whoseTurn);

    whoseTurn = whoseTurn === 'X' ? 'O' : 'X';
    $('.turn-indicator').text(whoseTurn + "'s turn");
  });
}
