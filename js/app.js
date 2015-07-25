var quizArray = [{
        img: 'images/1.png',
        question: 'What is the name of this animal?',
        choices: ['Dog', 'Cat', 'Fish', 'Pizza', 'Bird'],
        answerIndex: 4
},
    {
        img: 'images/2.png',
        question: 'How do you spell the number 4?',
        choices: ['One', 'Two', 'Three', 'Four', 'Five'],
        answerIndex: 3
},
    {
        img: 'images/3.png',
        question: 'What is my favorite color?',
        choices: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        answerIndex: 2
},
    {
        img: 'images/4.png',
        question: 'Which one is no?',
        choices: ['Yes', 'No', 'Yes', 'Yes', 'Yes'],
        answerIndex: 1
},
    {
        img: 'images/5.png',
        question: 'What year is it?',
        choices: ['2015', '1984', '2001', '1991', '1601'],
        answerIndex: 0

}
                 ,
    {
        img: 'images/6.png',
        question: 'What year is it next year?',
        choices: ['2015', '1984', '2001', '1991', '1601'],
        answerIndex: 2

    }
                ]

function main() {
    var quizCtrl = new QuizCtrl();
}

function QuizCtrl() {
    var currentQuiz = new Quiz();

    initializeProgressBar(currentQuiz.getQuizLength());
    loadQuestion(currentQuiz.getCurrentQuizData());

    $('#quiz-panel')
        .on('submit', function (e) {
            if (!$('input[name="answerOptions"]').is(':checked')) { // No choice selected
                $('#alert-submit-no-answer').show();
                return false;
            } else {
                $('#alert-submit-no-answer').hide();
                var userAnswer = $('#quiz-panel input[name=answerOptions]:checked').val()
                scoreAnswer(currentQuiz.submitAnswer(userAnswer));
                if (currentQuiz.quizCompleted()) {
                    showQuizScore(currentQuiz.getQuizScore());
                } else {
                    loadQuestion(currentQuiz.getCurrentQuizData());
                    updateProgress(currentQuiz.CurrentQuestion());
                }
            }
            e.preventDefault();
        })
        .on('click', '[data-hide]', function () {
            $('.' + $(this).attr('data-hide')).hide();
        })
    $('#start-quiz-container')
        .on('click', '#start-quiz-btn', function () {
            $('#start-quiz-container').hide();
            $('#quiz-content').show();
        })
    
    $('#quiz-score-container')
    .on('click', '#retry-quiz-btn', function () {
        location.reload();
    })

    function showQuizScore(score) {
        $('#quiz-submit-button').attr('disabled', 'disabled');
        $('#quiz-body').hide();
        $('#quiz-score-container').show();
        $('#quiz-progress .progress-step:last-child').removeClass('active');
        $('#quiz-progress .progress-step:last-child').addClass('complete');
        $('#quiz-score').text(score + '%');
        if (score >= 70) {
            $('#quiz-score-text').text('Woah, you certainly know your animals!');
        } else {
            $('#quiz-score-text').text('You may want to brush up on your animal facts. Try again?');
        }
    }

    function scoreAnswer(isCorrect) {
        if (isCorrect) {
            $('#quiz-progress .progress-step.active').addClass('correct');
        } else {
            $('#quiz-progress .progress-step.active').addClass('incorrect');
        }
    }

    function loadQuestion(quizData) {
        $('#quiz-question-image').attr('src', quizData.quizArray.img);
        $('#quiz-question').text('#' + quizData.questionNum + ': ' + quizData.quizArray.question);
        for (var i = 0; i < quizData.quizArray.choices.length; i++) {
            $('#quiz-choice-' + (i + 1) + ' label').html('<input type="radio" name="answerOptions" value="' + i + '"> ' + quizData.quizArray.choices[i]);
        }
    }

    function initializeProgressBar(numQuestions) {
        $('#quiz-progress').children().remove();
        for (i = 0; i < numQuestions; i++) {
            $('#quiz-progress').append('<div class="progress-step"><div class="progress"><div class="progress-bar"></div></div><div class="progress-dot"><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-remove"></span></div></div>');
        }
        $('#quiz-progress .progress-step').width(100 / numQuestions + '%');
        $('#quiz-progress .progress-step').eq(0).addClass('active');
    }

    function updateProgress(num) {
        if (num > 0) {
            $('#quiz-progress .progress-step').eq(num - 1).removeClass('active');
            $('#quiz-progress .progress-step').eq(num - 1).addClass('complete');
        }
        $('#quiz-progress .progress-step').eq(num).addClass('active');
    }
}


function Quiz() {
    var currentQuestion = 0;
    this.CurrentQuestion = function () {
        return currentQuestion;
    }

    var correctAnswers = 0;
    var quizData = quizArray; //Loads questions array
    var quizLength = quizData.length;

    this.getCurrentQuizData = function () {
        var currentQuizData = {
            quizArray: quizData[currentQuestion],
            questionNum: currentQuestion + 1
        }
        return currentQuizData;
    }
    this.getQuizLength = function () {
        return quizLength;
    }

    this.submitAnswer = function (userAnswer) {
        if (userAnswer == quizData[currentQuestion].answerIndex) {
            correctAnswers++;
            var isCorrect = true;
        } else
            var isCorrect = false;
        currentQuestion++;
        return isCorrect;
    }

    this.quizCompleted = function () {
        if (currentQuestion >= quizLength)
            return true;
        else
            return false;
    }

    this.getQuizScore = function () {
        var score = Math.round(correctAnswers / quizLength * 100);
        return score;
    }
}

$(document).ready(function () {
    main();
})