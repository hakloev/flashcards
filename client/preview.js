/**
 * Created by hakloev on 06/06/2016.
 */

var Preview = (function ($) {
    
    var delay = 150;

    var preview = null;
    var buffer = null;
    var oldText = "";

    var timeout = null;

    var jaxRunning = false;

    var callback = MathJax.Callback(["CreatePreview", Preview]);
    callback.autoReset = true;

    var Update = function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(callback, delay);
    };

    var SwapBuffers = function () {
        buffer = preview, preview = buffer;
        buffer = buffer; preview = preview;
        console.log('switch');
    }

    var CreatePreview = function () {
      timeout = null;
        if (jaxRunning) return;
        var text = $('#answer').val();
        if (text === oldText) return;
        $(buffer).html(text);
        oldText = text;
        jaxRunning = true;
        MathJax.Hub.Queue(
            ["Typeset", MathJax.Hub, buffer],
            ["PreviewDone", this]
        )
    };

    var PreviewDone = function () {
      jaxRunning = false;
    };

    return {
        init: function () {
            buffer = $('#buffer');
            preview = $('#question-preview');
        }
    }

})(jQuery);


$(window).on('load', function () {
    Preview.init();
});