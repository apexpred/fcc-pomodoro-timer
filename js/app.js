$(document).ready(function () {

  var $breakDown = $('#break-down');
  var $breakUp   = $('#break-up');
  var $breakInt  = $('#break-int');
  var $sessionDown = $('#session-down');
  var $sessionUp   = $('#session-up');
  var $sessionInt  = $('#session-int');
  var defaultBreakLength   = 5.00;
  var defaultSessionLength = 25.00;
  var currentBreakLength   = defaultBreakLength;
  var currentSessionLength = defaultSessionLength;
  var $timerInt = $('#timer-int');

  /*
    add click event listener to the incrementers and change the session/break
    lengths to match the incrementers.
    Also change the display in the clock.
  */

  $breakDown.on('click', function () {

    if (currentBreakLength - 1 > 0) {
      currentBreakLength--;
      $breakInt.html(currentBreakLength);
    }

  });

  $breakUp.on('click', function () {

    currentBreakLength++;
    $breakInt.html(currentBreakLength);

  });

  $sessionDown.on('click', function () {

    if (currentSessionLength - 1 > 0) {
      currentSessionLength--;

      $sessionInt.html(currentSessionLength);
      $timerInt.html(currentSessionLength);
    }

  });

  $sessionUp.on('click', function () {

    currentSessionLength++;
    $sessionInt.html(currentSessionLength);
    $timerInt.html(currentSessionLength);

  });

});
