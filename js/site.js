
$(document).ready(function () {
    firstStart();
});

function firstStart() {
    var valString;
    let correctAnswer = 0;
    let wrongAnswer = 0;
    let intervalId;
    let question;


    $("#txtQuestion").text("");
    $("#txtAnswer").text("");

    var number1 = Math.floor(Math.random() * 10) + 1;
    var number2 = Math.floor(Math.random() * 10) + 1;
    var operationMark = Math.floor(Math.random() * 4);

    $("#btnStart").prop("disabled", false);
    $("#btnStop").prop("disabled", true);
    $("#btnSend").prop("disabled", true);
    $("#txtAnswer").prop("disabled", true);

}

function operation() {
    number1 = Math.floor(Math.random() * 10) + 1;
    number2 = Math.floor(Math.random() * 10) + 1;
    operationMark = Math.floor(Math.random() * 4);

    switch (operationMark) {
        case 0:
            question = `${number1} + ${number2}`;
            break;
        case 1:
            question = `${number1 + number2} - ${number2}`;
            break;
        case 2:
            question = `${number1} x ${number2}`;
            break;
        case 3:
            question = `${number1 * number2} / ${number2}`;
            break;
    }

    return question;
}

function start() {
    $("#btnStart").prop("disabled", true);
    $("#btnStop").prop("disabled", false);
    $("#btnSend").prop("disabled", false);
    $("#txtAnswer").prop("disabled", false);

    $("#txtQuestion").text(operation());
    $("#txtAnswer").focus();
}

$("#btnStart").click(function () {
    start();
    startTimer();
});

function startTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    intervalId = setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}

function send() {
    var questionInt = eval(question);
    var userAnswer = parseInt($("#txtAnswer").val());
    correctAnswer = parseInt($("#correctAnswer").text());
    wrongAnswer = parseInt($("#wrongAnswer").text());
    if (questionInt === userAnswer) {
        correctAnswer++;
        $("#correctAnswer").text(correctAnswer);
        $('#modalCorrect').modal('show');
        $("#txtAnswer").val("");
        $("#txtAnswer").focus();
        start();
    } else {
        wrongAnswer++;
        $("#wrongAnswer").text(wrongAnswer);
        $('#modalWrong').modal('show');
        $("#modalWrong .modal-body").html(`<p>Wrong answer! Correct one is ${questionInt}</p>`)
        $("#txtAnswer").focus();
        $("#txtAnswer").val("");
        start();
    }
}

$("#btnSend").click(send);

function stop() {

    clearInterval(intervalId);

    let minutes = $("#minutes").text();
    let seconds = $("#seconds").text();

    $('#result').modal('show');

    $("#result .modal-body").html(`<p>In ${minutes} minutes ${seconds} seconds, ${correctAnswer} correct, ${wrongAnswer} wrong answers!</p>`);

    $("#modalClose").click(function () {
        $('#result').modal('hide');
        firstStart();
    });

    $("#btnStart").prop("disabled", false);
    $("#btnStop").prop("disabled", true);
    $("#btnSend").prop("disabled", true);
    $("#txtAnswer").prop("disabled", true);


    $("#minutes").text("00");
    $("#seconds").text("00");
    $("#correctAnswer").text("0");
    $("#wrongAnswer").text("0");
    $("#txtQuestion").text("");
    $("#txtAnswer").val("");

    firstStart();
}

$("#btnStop").click(stop);