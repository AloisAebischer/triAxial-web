(function () {
    'use strict';
    angular
        .module('triple-axis')
        .directive('panel', panelDirective);

    function panelDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/panel/panel.html',
            controller: 'panelCtrl',
            controllerAs: 'vm',
            scope:{measuring: '=', displaySignal1: '=', displaySignal2: '=', displaySignal3: '=', 
                    displayFreq1: '=', displayFreq2: '=', displayFreq3: '=',
                    displayAmpli1: '=', displayAmpli2: '=', displayAmpli3: '=',
                    calibrating1: '=', calibrating2: '=',calibrating3: '=', calibrateOk1: '=', calibrateOk2: '=', calibrateOk3: '=', 
                    calibrateError1: '=', calibrateError2: '=', calibrateError3: '=',
                    frequencyData1: '=', frequencyData2: '=', frequencyData3: '=', currentFreq1: '=', currentFreq2: '=', currentFreq3: '=',
                    rollMovement: '=', pitchMovement: '=', compassMovement: '=', timeScale: '=', freqScale: '=', calibFreq: '=',
                    ampliData1: '=', ampliData2: '=', ampliData3: '=' },
            link: function(scope, element, attr) {
                scope.$watch('measuring', function (value) {
                    scope.measurePressed(value);
                }); 
                scope.$watch('currentFreq1', function () {
                    scope.computeStat1();
                }); 
                scope.$watch('currentFreq2', function () {
                    scope.computeStat2();
                }); 
                scope.$watch('currentFreq3', function () {
                    scope.computeStat3();
                }); 
                scope.$watch('rollMovement', function () {
                    scope.rotateMovement();
                }); 
                scope.$watch('pitchMovement', function () {
                    scope.rotateMovement();
                }); 
            }
        } 
    }
}());
