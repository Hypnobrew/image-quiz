(function(window, ko) {
    home = window.home || {};
    home.views = {};
    home.views.quiz = function () {
        var public = {};
        var private = {};
        var settings = {};
        
        public.init = function(options) {
            settings = options;      
            ko.applyBindings(new private.viewModel(), settings.element);
        }
        
        private.viewModel = function() {
            var self = this;
            
            self.options = ko.observableArray(settings.options);
            self.haveSubmittedAnswer = ko.observable(false);
            self.selected = function (item) {
                self.haveSubmittedAnswer(true);
            };
            
            self.next = function() {
                location.reload(true);
            };
        }; 
        
        return public;
    };
})(window, ko);