'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            console.log('assad');
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            // For any unmatched url, redirect to /state1

            //Define State Route
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'home/map.html',
                    controller: 'MapCtrl',
                    controllerAs: 'map'
                });

            $urlRouterProvider.otherwise('/');

        }]);