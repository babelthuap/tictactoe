'use strict';

/*
 * the board squares are laid out as follows:
 *   1 2 3
 *   4 5 6
 *   7 8 9
 */

$(document).ready(function() {
  
  // insert byline
  $('h1').after( $('<hr />') ).after( $('<i>').text('by Nicholas Neumann-Chun') );

  // label buttons
  $('.btn').each(function(i) {
    $(this).data('id', i + 1);
  });

  // click handler for buttons
  $('.btn').click(function() {
    console.log('button clicked:', $(this).data('id'));
  });

});
