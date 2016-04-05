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
  var sessionMins;
  var sessionSecs;
  var breakMins;
  var breakSecs;
  var isInSession = true;
  var isSessionTimerOn = false;
  var isBreakTimerOn = false;
  var $timer = $('.timer');
  var currentTimer = 't';

  //use the date to get session length in milliseconds
  var sessionDuration = Date.now() + (currentSessionLength * 60000) - Date.now();
  var breakDuration = Date.now() + (currentBreakLength * 60000) - Date.now();

  /*
    add click event listener to the incrementers and change the session/break
    lengths to match the incrementers.
    Also change the display in the clock.
  */

  $breakDown.on('click', function () {

    if (currentBreakLength - 1 > 0) {
      currentBreakLength--;
      $breakInt.html(currentBreakLength);

      breakDuration = Date.now() + (currentBreakLength * 60000) - Date.now();
    }

  });

  $breakUp.on('click', function () {

    currentBreakLength++;
    $breakInt.html(currentBreakLength);

    breakDuration = Date.now() + (currentBreakLength * 60000) - Date.now();

  });

  $sessionDown.on('click', function () {

    if (currentSessionLength - 1 > 0) {
      currentSessionLength--;

      $sessionInt.html(currentSessionLength);
      $timerInt.html(currentSessionLength + ':00');
      sessionDuration = Date.now() + (currentSessionLength * 60000) - Date.now();
    }

  });

  $sessionUp.on('click', function () {

    currentSessionLength++;
    $sessionInt.html(currentSessionLength);
    $timerInt.html(currentSessionLength + ':00');
    sessionDuration = Date.now() + (currentSessionLength * 60000) - Date.now();

  });

  /**
    End of event click listeners/handlers for intervals
  */

  /**
    create the countdown timer for the clock using setInterval
  */

  $timer.on('click', function () {

    if (currentTimer === 't') {
      isSessionTimerOn = !isSessionTimerOn;
    }
    else if (currentTimer === 'b') {
      isBreakTimerOn = !isBreakTimerOn;
    }

  });

  setInterval(function () {

    console.log('Session duration: ' + sessionDuration);
    console.log('Break duration ' + breakDuration);

    if (sessionDuration < 0) {
      isSessionTimerOn = false;
      isBreakTimerOn = true;
      currentTimer = 'b';
      $timerInt.text(currentBreakLength + ":00");
      sessionDuration = Date.now() + (currentSessionLength * 60000) - Date.now();
    }
    else if (breakDuration < 0) {
      isBreakTimerOn = false;
      isSessionTimerOn = true;
      currentTimer = 't';
      $timerInt.text(currentSessionLength + ":00");
      breakDuration = Date.now() + (currentBreakLength * 60000) - Date.now();
    }

    if (isSessionTimerOn) {

        sessionSecs = Math.floor((sessionDuration / 1000) % 60);
        sessionMins = Math.floor((sessionDuration / 1000 / 60) % 60);

        var str = sessionMins + ':';

        if (sessionSecs < 10) {
          str += '0' + sessionSecs;
        }
        else {
          str += sessionSecs;
        }

        $timerInt.text(str);
        sessionDuration -= 1000;
    }

    if (isBreakTimerOn) {


      breakSecs = Math.floor((breakDuration / 1000) % 60);
      breakMins = Math.floor((breakDuration / 1000 / 60) % 60);

      str = breakMins + ':';

      if(breakSecs < 10) {
        str += '0' + breakSecs;
      }
      else  {
        str += breakSecs;
      }

      $timerInt.text(str);

      breakDuration -= 1000;

    }

  }, 1000);

});
