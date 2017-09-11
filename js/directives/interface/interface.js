(function () {
    'use strict';
    angular
        .module('tri-axial')
        .directive('interface', interfaceDirective);

    function interfaceDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/interface/interface.html',
            controller: 'interfaceCtrl'  
        } 
    }
}());
