var Flashcard = (function($) {

    var questions;
    var currentIndex = 0;
    var isQuestion = true;

    var randomIndex = function () {
        var index = Math.floor(Math.random() * questions.questions.length);
        return index;
    }

    var loadData = function (file) {
        $.getJSON('subjects/' + file, function(result) {
            console.log('Loaded subject');
            questions = result;
            renderData(result);
        })
        .fail(function (error) {
            console.log('Not able to load subject JSON with error:\n', error);
        });
    }

    var renderData = function (data) {
        console.log('Rendering data');
        $('#subject h1').html(data.code + ': ' + data.subject);

        var nextIndex = randomIndex();
        currentIndex = nextIndex;

        renderQuestion(data.questions[nextIndex]);
    }

    var renderQuestion = function (question) {
        console.log('Rendering question');
        $('#answer-detail').html('');
        $('#question-detail').html(question.question);
        //isQuestion = true;
    }

    var next = function () {
        console.log(isQuestion);
        if (!isQuestion) {
            var nextIndex = randomIndex();
            currentIndex = nextIndex;
            var question = questions.questions[nextIndex];
            renderQuestion(question);
        } else {
            var element = $('#answer-detail')
            $(element).html(questions.questions[currentIndex].answer);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);
        }
        isQuestion = !isQuestion;
    }

    return {
        init: function () {
            console.log('Initiating flashcards');
            loadData('tdt4173.json');
        },
        next: next
    }

})(jQuery);

$(window).on('load', function () {
   Flashcard.init();
   $(window).on('keypress', function () {
        Flashcard.next();
   });
});
