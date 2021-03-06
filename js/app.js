var quizArray = [{
        img: 'images/quokka.jpg',
        question: 'What is the name of this cheerful looking animal found in Australia?',
    choices: ['Wallaby', 'Quokka', 'Numbat', 'Bettong', 'Bandicoot'],
        answerIndex: 1
},
    {
        img: 'images/puffer.jpg',
        question: 'What is the name of the lethal toxin found in almost all pufferfish?',
        choices: ['Conotoxin', 'Curare', 'Botulinum toxin', 'Caramboxin', 'Tetrodotoxin'],
        answerIndex: 4
},
    {
        img: 'images/jaguar.jpg',
        question: 'The name "jaguar" comes from a Native American word meaning what?',
        choices: ['Ghost', 'Spotted', 'He who kills with one leap', 'Prowler of the forest', 'Shadow'],
        answerIndex: 2
},
    {
        img: 'images/panda.jpg',
        question: 'A group of pandas is called what?',
        choices: ['A School', 'Pandemonium', 'A Mob', 'A Colony', 'An Embarrassment'],
        answerIndex: 4
},
    {
        img: 'images/butterfly.jpg',
        question: 'What do butterflies taste with?',
        choices: ['Their feet', 'Their wings', 'A fork', 'Their eyes', 'Their antennae'],
        answerIndex: 0
}
                 ,
    {
        img: 'images/woodchuck.jpg',
        question: 'What are female woodchucks called?',
        choices: ['Lady chucks', 'She-chucks', 'Two buck chucks', 'Fem-chucks', 'Chuckettes'],
        answerIndex: 1
    }
                ]

function main() {
    var quizCtrl = new QuizCtrl();

    quizCtrl.initializeProgressBar();
    quizCtrl.loadQuestion();

    $('#quiz-panel')
        .on('submit', function (e) {
            if (!$('input[name="answerOptions"]').is(':checked')) { // No choice selected
                $('#alert-submit-no-answer').show();
                return false;
            } else {
                $('#alert-submit-no-answer').hide();
                var userAnswer = $('#quiz-panel input[name=answerOptions]:checked').val()
                quizCtrl.scoreAnswer(userAnswer);
                if (quizCtrl.quizCompleted()) {
                    quizCtrl.showQuizScore();
                } else {
                    quizCtrl.loadQuestion();
                    quizCtrl.updateProgress();
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
}

function QuizCtrl() {
    var currentQuiz = new Quiz();

    this.quizCompleted = function () {
        if (currentQuiz.quizCompleted())
            return true;
        else
            return false;
    }

    this.showQuizScore = function () {
        var score = currentQuiz.getQuizScore()
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

    this.scoreAnswer = function (answer) {
        if (currentQuiz.submitAnswer(answer)) {
            $('#quiz-progress .progress-step.active').addClass('correct');
        } else {
            $('#quiz-progress .progress-step.active').addClass('incorrect');
        }
    }

    this.loadQuestion = function () {
        var quizData = currentQuiz.getCurrentQuizData()
        $('#quiz-question-image').attr('src', quizData.quizArray.img);
        $('#quiz-question').text('#' + quizData.questionNum + ': ' + quizData.quizArray.question);
        for (var i = 0; i < quizData.quizArray.choices.length; i++) {
            $('#quiz-choice-' + (i + 1) + ' label').html('<input type="radio" name="answerOptions" value="' + i + '"> ' + quizData.quizArray.choices[i]);
        }
    }

    this.initializeProgressBar = function () {
        var numQuestions = currentQuiz.getQuizLength();
        $('#quiz-progress').children().remove();
        for (i = 0; i < numQuestions; i++) {
            $('#quiz-progress').append('<div class="progress-step"><div class="progress"><div class="progress-bar"></div></div><div class="progress-dot"><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-remove"></span></div></div>');
        }
        $('#quiz-progress .progress-step').width(100 / numQuestions + '%');
        $('#quiz-progress .progress-step').eq(0).addClass('active');
    }

    this.updateProgress = function () {
        var num = currentQuiz.CurrentQuestion();
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