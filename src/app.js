(function() {
    'use strict';

    angular
        .module('app')
        .directive('myApp', AppComponent)
        .directive('landing', Landing)
        .directive('about', About)
        .directive('contact', Contact)
        .directive('location', Location);

    AppComponent.$inject = [];

    /* @ngInject */
    function AppComponent() {
        var directive = {
            restrict: 'E',
            templateUrl: 'src/app.html',
            controller: AppController
        };
        return directive;

        function AppController($scope) {
            $scope.test = function() {
                alert("test");
            };
        }
    }

    function Landing() {
        var directive = {
            restrict: 'E',
            templateUrl: 'src/pages/landing.html'
        };
        return directive;
    }

    function About() {
        var directive = {
            restrict: 'E',
            templateUrl: 'src/pages/about.html'
        };
        return directive;
    }

    function Contact() {
        var directive = {
            restrict: 'E',
            templateUrl: 'src/pages/contact.html'
        };
        return directive;
    }

    function Location() {
        var directive = {
            restrict: 'E',
            templateUrl: 'src/pages/location.html'
        };
        return directive;
    }
})();
