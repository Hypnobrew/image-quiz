(function(window, $, ko) {
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

            var latins = settings.options.slice(0);
            latins = latins.sort(function() {return .5 - Math.random()});
            
            self.latinOptions = latins;
            self.haveSubmittedAnswer = ko.observable(false);
            self.haveSubmittedLatinAnswer = ko.observable(false);
            self.stepTwoSelected = ko.observable(false);
            self.image = ko.observable(settings.image);
            self.selected = function (item) {
                self.haveSubmittedAnswer(true);
            };
            self.showLatin = function() {
                self.stepTwoSelected(true);
            };
            self.selectedLatin = function () {
                self.haveSubmittedLatinAnswer(true);
            };
            self.requestNewImage = function() {
              $.ajax({
                type: 'POST',
                url: '/image/new',
                data: {'name': settings.imagename},
                dataType: 'json',
                success: function name(imagedata) {
                    if(imagedata.success === true) {
                        self.image(imagedata.url);
                    }                    
                }
              });                
            };
            
            self.next = function() {
                $.ajax({
                    type: 'POST',
                    url: '/image/save',
                    data: {'name': settings.imagename, 'url': self.image()},
                    dataType: 'json',
                    success: function name(imagedata) {
                        location.reload(true);                 
                    }
                });
            };
        };
        return public;
    };
})(window, $, ko);