var Flashcard = (function($) {

    var questions;
    var currentIndex = -1;
    var progress = 0;
    var isQuestion = true;
    var showingMessage = false;

    var showMessage = function () {
        showingMessage = !showingMessage;
        $('#message').css('display', 'block');
    }

    var nextIndex = function () {
        if (showingMessage) {
            $('#message').css('display', 'none');
            showingMessage = !showingMessage;
        }

        currentIndex++;
        if (currentIndex >= questions.length) {
            currentIndex = 0;
            progress = 0
            showMessage();
        }
        return currentIndex;
    }

    var loadData = function (file) {
        var subjectId = $('#subject-id').attr('value');
        $.getJSON('/subject/' + subjectId + '/json', function(result) {
            console.log(result);
            console.log('Loaded subject');
            renderInitialData(result);
        })
        .fail(function (error) {
            console.log('Not able to load subject JSON with error:\n', error);
        });
    }

    var renderInitialData = function (data) {
        console.log('Rendering data');
        questions = data.sort(function() {
            return 0.5 - Math.random();
        });

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
            loadData();
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
