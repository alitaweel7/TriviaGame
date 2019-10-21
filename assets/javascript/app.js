$(document).ready(function () {

    let wins = 0;
    let losses = 0;
    let unanswered = 0;
    let clockRunning = false;
    let time = 30;
    let intervalId;

    let questionSet = 0;
    let correctAnswer = "";

    // place questions objects created into an array
    let questionArray = [
        {
            // place users possible guesses in an array 
            userGuess: ["Question1", "Question2", "Question3", "Question4"],

        },


        {
            //  question: 1,
            answerId: 1,
            question: "How many planets do we have in our Solar System?",
            answer: "8",
            userGuess: ["8", "9", "10", "11"],
        },

        {
            //  question: 2,
            answerId: 2,
            question: "Nearest planet to earth?",
            answer: "Venus",

            userGuess: ["Mars", "Venus", "Saturn", "Uranus"],
        },

        {
            //   question: 3,
            answerId: 2,
            question: "Nearest planet to the sun? ",
            answer: "Mercury",

            userGuess: ["Neptune", "Venus", "Mercury", "Juiter"],
        },
        {
            // question:4 ,
            answerId: 3,
            question: "How long does light from the sun take to arrive earth?",
            answer: "8 minutes",

            userGuess: ["2 minutes", "4 minutes", "8 minutes", "10"]
        }

    ];



    // when page loads display only start button

    startButton();

    //display question and answers: 

    function displayQuestion() {
        if (questionSet < questionArray.length) {

            let questionToAnswer = $("<div>");
            questionToAnswer.addClass("questionCSS");
            questionToAnswer.html(questionArray[questionSet].question);
            $("#questions").append(questionToAnswer);

            const questionlist = $('#possibleAnswers');

            for (i = 0; i < 4; i++) {
                const currentQuestion = $('<div>' + questionArray[questionSet].userGuess[i] + '</div>');

                currentQuestion.addClass("questionCurrent");
                currentQuestion.addClass("hoverdiv");
                currentQuestion.attr("data-index", i);
                questionlist.append(currentQuestion);

            }


            $('.questionCurrent').on("click", function () {
                if (time < 0) {
                    console.log("times up")
                }
                else {

                    console.log("text inside line 114 ");
                    indexValue = ($(this).attr("data-index"));
                    if (indexValue == (questionArray[questionSet].answerId)) {
                        correct();
                    }
                    else {
                        let correctAnswer = questionArray[questionSet].userGuess[i];
                        wrong();
                    }

                }
            });

        }

    }

    function scoreboard() {
        alert("scoreboard window");
        time = 3;
        clearInterval(intervalId);


        let scoreLosses = $('<div>');
        scoreLosses.html('<h3>Losses: ' + losses + '</h3>');

        let scoreWin = $('<div>');
        scoreWin.html('<h3>Wins: ' + wins + '</h3>');

        $("#possibleAnswers").append(scoreLosses);
        $("#possibleAnswers").append(scoreWin);

    }

    function correct() {

        clearInterval(intervalId);
        clockRunning = false;
        time = 30;
        questionSet++;
        emptyQA();
        displayQuestion();
        count();
        wins++;
    }

    function wrong() {
        console.log("wrong answer");
        emptyQA();
        losses++;


        // display the correct answer
        let correctDisplay = questionArray[questionSet].answer;
        console.log(correctDisplay);
        $("#possibleAnswers").html("<h3>The correct answer is: " + correctDisplay + "</h3>");
        time = 3;

    }

    function test() {
        console.log("this is a test in a functionat global level")
    }


    // question must be answered before timer reaches zero

    // Once all questions are answered, display score results 

    // display button to play again


    // function to start countdown timer 
    function timerIsRunning() {

        if (!clockRunning) {

            intervalId = setInterval(count, 1000);
            clockRunning = true;

        }
    }

    function emptyQA() {
        // empty existing question and possible answers
        console.log('you are emptying questions and answers');
        $("#questions").empty();
        $("#possibleAnswers").empty();

    }

    function count() {

        if (time >= 0) {

            console.log(time);
            $("#timerPart2").html(time + " seconds");
            time--;

        }

        if (time < 0 && questionSet < questionArray.length - 1) {
            console.log("question set = " + questionSet);
            //increment question set to move onto the next question
            questionSet++;

            emptyQA();

            //display next question
            displayQuestion();

            time = 3;
        }
    }


    // start buttons
    function startButton() {

        let startButton = $("<button>");

        startButton.addClass("buttonProperties");
        startButton.addClass("btn btn-primary btn-lg");


        startButton.html('<p> START GAME </p>');

        $("#start-button").append(startButton);

        $(".buttonProperties").on("click", function () {
            clockRunning = false;
            timerIsRunning();
            count();

            // unhide gametime button
            $("#gameTimer").css("display", "inline-block");

            // hide the button after you click on it
            $(".buttonProperties").css("display", "none");
            displayQuestion();
        })
    }


    function playGame() {
        alert("playGame");
    }


})