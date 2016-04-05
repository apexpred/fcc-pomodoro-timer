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
  var mins;
  var secs;
  var isInSession = true;
  var isTimerOn = false;
  var $timer = $('.timer');
  //use the date to get session length in milliseconds
  var duration = Date.now() + (currentSessionLength * 60000) - Date.now();

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
      $timerInt.html(currentSessionLength + ':00');
      duration = Date.now() + (currentSessionLength * 60000) - Date.now();
    }

  });

  $sessionUp.on('click', function () {

    currentSessionLength++;
    $sessionInt.html(currentSessionLength);
    $timerInt.html(currentSessionLength + ':00');
    duration = Date.now() + (currentSessionLength * 60000) - Date.now();

  });

  /**
    End of event click listeners/handlers for intervals
  */

  /**
    create the countdown timer for the clock using setInterval
  */

  $timer.on('click', function () {

    isTimerOn = !isTimerOn;

  });

  setInterval(function () {

    if (duration < 0) {
      isTimerOn = false;
    }

    if (isTimerOn) {

        secs = Math.floor((duration / 1000) % 60);
        mins = Math.floor((duration / 1000 / 60) % 60);

        var str = mins + ':';

        if (secs < 10) {
          str += '0' + secs;
        }
        else {
          str += secs;
        }

        $timerInt.text(str);
        duration -= 1000;
    }

  }, 1000);

});
