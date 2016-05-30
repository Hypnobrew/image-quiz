(function(window, ko) {
    home = window.home || {};
    home.views = {};
    home.views.quiz = function () {
        var public = {};
        
        public.init = function(settings) {            
            var viewModel = {
                options: ko.observableArray(settings.options),
                selected: function () {
                    
                }
            }; 
            ko.applyBindings(viewModel, settings.element);
        }
        return public;
    };
})(window, ko);