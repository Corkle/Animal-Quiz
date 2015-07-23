var quizArray = [{
        img: '..\images\1.png',
        question: 'What is the name of this animal?',
        choices: ['Dog', 'Cat', 'Fish', 'Pizza', 'Bird'],
        answerIndex: 4
},
    {
        img: '..\images\2.png',
        question: 'How do you spell the number 4?',
        choices: ['One', 'Two', 'Three', 'Four', 'Five'],
        answerIndex: 3
},
    {
        img: '..\images\3.png',
        question: 'What is my favorite color?',
        choices: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        answerIndex: 2
},
    {
        img: '..\images\4.png',
        question: 'Which one is no?',
        choices: ['Yes', 'No', 'Yes', 'Yes', 'Yes'],
        answerIndex: 1
},
    {
        img: '..\images\5.png',
        question: 'What year is it?',
        choices: ['2015', '1984', '2001', '1991', '1601'],
        answerIndex: 0

},
    {
        img: '..\images\6.png',
        question: 'What year is it next year?',
        choices: ['2015', '1984', '2001', '1991', '1601'],
        answerIndex: 2

    }]

function main() {
    var quizCtrl = new QuizCtrl();
}

function QuizCtrl() {
    var currentQuiz = new Quiz();

    initializeProgressBar(currentQuiz.getQuizLength());
    loadQuestion(currentQuiz.getCurrentQuizData());
    updateProgress(currentQuiz.CurrentQuestion());

    $('#quiz-panel')
        .on('submit', function (e) {
            if (!$('input[name="answerOptions"]').is(':checked')) { // No choice selected
                return false;
            } else {
                var userAnswer = $('#quiz-panel input[name=answerOptions]:checked').val()
                submitAnswer(currentQuiz.submitAnswer(userAnswer));
                loadQuestion(currentQuiz.getCurrentQuizData());
                updateProgress(currentQuiz.CurrentQuestion());
            }
            e.preventDefault();
        })

    function submitAnswer(isCorrect) {
        if (isCorrect) {
            $('#quiz-progress .progress-step.active').addClass('correct');
        } else {
            $('#quiz-progress .progress-step.active').addClass('incorrect');
        }
    }

    function loadQuestion(quizData) {
        $('#quiz-question-image').attr('src', quizData.img);
        $('#quiz-question').text(quizData.question);
        for (var i = 0; i < quizData.choices.length; i++) {
            $('#quiz-choice-' + (i + 1) + ' label').html('<input type="radio" name="answerOptions" value="' + i + '"> ' + quizData.choices[i]);
        }
    }

    function initializeProgressBar(numQuestions) {
        $('#quiz-progress').children().remove();
        for (i = 0; i < numQuestions; i++) {
            $('#quiz-progress').append('<div class="progress-step"><div class="progress"><div class="progress-bar"></div></div><div class="progress-dot"><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-remove"></span></div></div>');
        }
        $('#quiz-progress .progress-step').width(100 / numQuestions + '%');
    }

    function updateProgress(num) {        
        $('#quiz-progress .progress-step').eq(num - 1).removeClass('active');
        for (i = 0; i < num; i++) {
            $('#quiz-progress .progress-step').eq(i).addClass('complete');
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

    this.getCurrentQuizData = function () {
        return quizData[currentQuestion];
    }
    this.getQuizLength = function () {
        return quizData.length;
    }

    this.submitAnswer = function (userAnswer) {
        if (userAnswer == quizData[currentQuestion].answerIndex) {
            correctAnswers++;
            var isCorrect = true;
        } else
            var isCorrect =  false;
        currentQuestion++;
        return isCorrect;
    }
}

$(document).ready(function () {
    main();
})