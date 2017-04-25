$(document).ready(function () {

  //Set default session time and break time
  var sessionTimeDefault = 1;
  var breakTimeDefault = 5;

  var countDown = sessionTimeDefault;
  var breakCountDown = breakTimeDefault;
  var timerIsRunning = false;

  $("#sessionTime").html(sessionTimeDefault);
  $("#timer").html(`${sessionTimeDefault}:00`);
  $("#breakTime").html(breakTimeDefault);

  var breakTimeCount = parseInt($("#breakTime").html());
  var sessionTimeCount = parseInt($("#sessionTime").html());

  var audio = new Audio('http://www.codingtutorials360.com/14244764.mp3');

  //Set sessionTime + Timer
  function setTimers() {
    $("#sessionTime").html(sessionTimeCount);
    $("#timer").html(`${sessionTimeCount}:00`);
    $("#breakTime").html(breakTimeCount);
    breakCountDown = breakTimeCount;
    countDown = sessionTimeCount;
    timerIsRunning = false;
  }

  //Decrease Braketime
  $("#decreaseBreakTime").on("click", function () {
    if (breakTimeCount > 1) {
      breakTimeCount -= 1
      setTimers();
    }
  });

  //Increase break time
  $("#increaseBreakTime").on("click", function () {
    breakTimeCount += 1;
    setTimers()
  });

  //Decrease session time
  $("#decreaseSessionTime").on("click", function () {
    if (sessionTimeCount > 1) {
      sessionTimeCount -= 1
      setTimers()
    }
  });

  //Increase session Time
  $("#increaseSessionTime").on("click", function () {
    if (sessionTimeCount < 50) {
      sessionTimeCount += 1
      setTimers();
    }
  });

  //Reset session Time and break time to default
  $("#resetTimers").on("click", function () {
    if (sessionTimeCount !== 25) {
      sessionTimeCount = sessionTimeDefault;
      $("#sessionTime").html(sessionTimeCount);
    }
    if (breakTimeCount !== 5) {
      breakTimeCount = breakTimeDefault;
      $("#breakTime").html(breakTimeCount);
    }
    $("#timer").html(`${sessionTimeDefault}:00`);
    countDown = sessionTimeDefault;
    breakCountDown = breakTimeDefault;
    session = true;
    $("#clockHeader").html("Session");
    timerIsRunning = false;
  });

  ///////////////////
  //Clock Countdown//
  ///////////////////
  var counter;
  var breakTimer;
  var session = true;
  //Disable stop button for the timer.
  $("#stopTimer").prop("disabled", true);

  //Start the Timer
  $("#startTimer").on("click", function () {
    if (!timerIsRunning) {
      countDown *= 60;
      //breakCountDown *= 60;
      timerIsRunning = true;
    }

    //Disable and hide reset Timer button
    $("#resetTimers").fadeTo(400, 0);
    $("#resetTimers").prop("disabled", true);

    $("#startTimer").prop("disabled", true);
    $("#stopTimer").prop("disabled", false);
    $(".setTimerButton").prop("disabled", true);

    //so that i can pause/continue the session or break timer depending on when i pause
    if (session) {
      timer();
      counter = setInterval(timer, 1000);
    } else {
      breakTimer = setInterval(breakCounter, 1000);
    }

    function timer() {
      session = true;      
      $("#clockHeader").html("Session");      
      countDown -= 1;

      if (countDown < 0) {
        audio.play();
        clearInterval(counter);
        breakCountDown = breakTimeCount * 60;
        breakTimer = setInterval(breakCounter, 1000);
      } else if (countDown % 60 >= 10) {
        $("#timer").html(`${Math.floor(countDown / 60)}:${countDown % 60}`);
      } else {
        $("#timer").html(`${Math.floor(countDown / 60)}:0${countDown % 60}`);
      }
    }

    function breakCounter() {
      session = false;
      $("#clockHeader").html("Break");
      breakCountDown -= 1;

      if (breakCountDown < 0) {
        audio.play();
        clearInterval(breakTimer);
        countDown = sessionTimeCount * 60;
        counter = setInterval(timer, 1000);
      } else if (breakCountDown % 60 >= 10) {
        $("#timer").html(`${Math.floor(breakCountDown / 60)}:${breakCountDown % 60}`);
      } else {
        console.log(Math.floor(breakCountDown / 60));
        $("#timer").html(`${Math.floor(breakCountDown / 60)}:0${breakCountDown % 60}`);
      };
    }

    //Stop Timer
    $("#stopTimer").on("click", function () {
      $("#startTimer").prop("disabled", false);
      $("#stopTimer").prop("disabled", true);
      $("#resetTimers").fadeTo(400, 1);
      $("#resetTimers").prop("disabled", false);
      $(".setTimerButton").prop("disabled", false);
      clearInterval(counter);
      clearInterval(breakTimer);
    });
  });

});