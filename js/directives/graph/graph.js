(function () {
    'use strict';
    angular
        .module('triple-axis')
        .directive('graph', graphDirective);

    function graphDirective() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/graph/graph.html',
            controller: 'graphCtrl',
            controllerAs: 'vm',
            scope:{frequencyData1: '=', ampliData1: '=', frequencyData2: '=', ampliData2: '=', frequencyData3: '=', ampliData3: '=',
                displayFreq1: '=', displayFreq2: '=', displayFreq3: '=', 
                displayAmpli1: '=', displayAmpli2: '=', displayAmpli3: '=', currentFreq1: '=', currentFreq2: '=', currentFreq3: '=',
                freqScale: '=', timeScale:'=', calibFreq: '='},
            link: function(scope, element, attr) {
                scope.$watch('currentFreq1', function () {
                    scope.updateGraph();
                }); 
                scope.$watch('currentFreq2', function () {
                    scope.updateGraph();
                }); 
                scope.$watch('currentFreq3', function () {
                    scope.updateGraph();
                }); 
                scope.$watch('displayAmpli1', function () {
                    scope.updateGraph();
                });
                scope.$watch('displayAmpli2', function () {
                    scope.updateGraph();
                }); 
                scope.$watch('displayAmpli3', function () {
                    scope.updateGraph();
                });  
                scope.$watch('displayFreq1', function () {
                    scope.updateGraph();
                }); 
                scope.$watch('displayFreq2', function () {
                    scope.updateGraph();
                }); 
                scope.$watch('displayFreq3', function () {
                    scope.updateGraph();
                });  
                scope.$watch('timeScale', function () {
                    scope.updateGraph();
                });
                scope.$watch('freqScale', function () {
                    scope.updateGraph();
                });
                scope.$watch('calibFreq', function () {
                    scope.updateGraph();
                });
            }
        } 
    }
}());
