(function () {
    'use strict';
    angular
        .module('tri-axial')
        .directive('notification', notificationDirective);

    function notificationDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/notification/notification.html',
            controller: 'notificationCtrl'  
        } 
    }
}());
