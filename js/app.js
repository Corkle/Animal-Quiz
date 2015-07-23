$(document).ready(function () {
    StartQuiz();
})

var quizArray = [{
        img: '../images/1.png',
        question: 'What is the name of this animal?',
        choices: ['Dog', 'Cat', 'Fish', 'Pizza', 'Bird'],
        answer: 5
},
    {
        img: '../images/2.png',
        question: 'How do you spell the number 4?',
        choices: ['One', 'Two', 'Three', 'Four', 'Five'],
        answer: 4
},
    {
        img: '../images/3.png',
        question: 'What is my favorite color?',
        choices: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        answer: 3
},
    {
        img: '../images/4.png',
        question: 'Which one is no?',
        choices: ['Yes', 'No', 'Yes', 'Yes', 'Yes'],
        answer: 2
},
    {
        img: '../images/5.png',
        question: 'What year is it?',
        choices: ['2015', '1984', '2001', '1991', '1601'],
        answer: 1

},
    {
        img: '../images/6.png',
        question: 'What year is it next year?',
        choices: ['2015', '1984', '2001', '1991', '1601'],
        answer: 3

    }]

function StartQuiz() {
    var questionNum = 0;
    var correctNum = 0;

    SetProgressBar();
    LoadQuestion(questionNum);
    UpdateProgress(questionNum);
}

function UpdateProgress(num) {
    $('#quiz-progress .progress-step').eq(num).addClass('active');
    for (i = 0; i < num; i++) {
        $('#quiz-progress .progress-step').eq(i).addClass('complete');
    }

}

function LoadQuestion(question) {
    var currentQuestion = quizArray[question];
    $('#quiz-question-image').attr('src', currentQuestion.img);
    $('#quiz-question').text(currentQuestion.question);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        $('#quiz-choice-' + (i + 1) + ' label').html('<input type="radio" name="answerOptions"> ' + currentQuestion.choices[i]);
    }
}

function SetProgressBar() {
    $('#quiz-progress').children().remove();
    quizArray.forEach(function (question) {
        $('#quiz-progress').append('<div class="progress-step"><div class="progress"><div class="progress-bar"></div></div><div class="progress-dot"><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-remove"></span></div></div>');
    });

    $('#quiz-progress .progress-step').width(100 / quizArray.length + '%');
}