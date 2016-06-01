var Flashcard = (function($) {

    var questions;
    var currentIndex = -1;
    var progress = 0;
    var isQuestion = true;

    var nextIndex = function () {
        currentIndex++;
        if (currentIndex >= questions.length) {
            currentIndex = 0;
        }
        return currentIndex;
    }

    var loadData = function (file) {
        $.getJSON('subjects/' + file, function(result) {
            console.log('Loaded subject');
            renderInitialData(result);
        })
        .fail(function (error) {
            console.log('Not able to load subject JSON with error:\n', error);
        });
    }

    var renderInitialData = function (data) {
        console.log('Rendering data');
        questions = data.questions.sort(function() {
            return 0.5 - Math.random();
        });

        $('#subject h1').html(data.code + ': ' + data.subject);
        $('#progress-total').html(questions.length);

        var next = nextIndex();

        renderQuestion(questions[next]);
    }

    var renderQuestion = function (question) {
        console.log('Rendering question');
        $('#progress-current').html(++progress);
        $('#answer-detail').html('');
        var element = $('#question-detail')
        $(element).html(question.question);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, element[0]]);

    }

    var next = function () {
        if (!isQuestion) {
            var next = nextIndex();
            var question = questions[next];
            renderQuestion(question);
        } else {
            var element = $('#answer-detail')
            $(element).html(questions[currentIndex].answer);
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

   $('#question-detail').on('touchend', function() {
        Flashcard.next();
   });
});
