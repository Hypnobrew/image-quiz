(function(window) {
    home = window.home || {};
    home.views = {};
    home.views.quiz = function () {
        var public = {};
        public.init = function(settings) {
            console.log(settings.options[0].status);
        }
        return public;
    };
})(window);