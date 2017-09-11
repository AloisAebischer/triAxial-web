(function () {
    'use strict';
    angular
        .module('tri-axial')
        .controller('graphCtrl', graphCtrl);

    function graphCtrl($scope) {
        var graphFrequency, graphAmpli, graphDataFreq1=0, graphDataFreq2=0, graphDataFreq3=0, graphDataAmpli1=0, graphDataAmpli2=0, graphDataAmpli3=0;
        $scope.updateGraph = function() {
            graphDataFreq1=[];
            for(var i=0;i<$scope.frequencyData1.length;i++){
                var obj1 = { x: $scope.frequencyData1[i][0], y: $scope.frequencyData1[i][1]};
                graphDataFreq1.push(obj1);
            }
            graphDataFreq2=[];  
            for(var i=0;i<$scope.frequencyData2.length;i++){
                var obj2 = { x: $scope.frequencyData2[i][0], y: $scope.frequencyData2[i][1]};
                graphDataFreq2.push(obj2);
            }
            graphDataFreq3=[];
            for(var i=0;i<$scope.frequencyData3.length;i++){
                var obj3 = { x: $scope.frequencyData3[i][0], y: $scope.frequencyData3[i][1]};
                graphDataFreq3.push(obj3);
            }
            graphDataAmpli1=[];
            for(var i=0;i<$scope.ampliData1.length;i++){
                var obj1 = { x: $scope.ampliData1[i][0], y: $scope.ampliData1[i][1]};
                graphDataAmpli1.push(obj1);
            }
            graphDataAmpli2=[];
            for(var i=0;i<$scope.ampliData2.length;i++){
                var obj2 = { x: $scope.ampliData2[i][0], y: $scope.ampliData2[i][1]};
                graphDataAmpli2.push(obj2);
            }
            graphDataAmpli3=[];
            for(var i=0;i<$scope.ampliData3.length;i++){
                var obj3 = { x: $scope.ampliData3[i][0], y: $scope.ampliData3[i][1]};
                graphDataAmpli3.push(obj3);
            }
            graphFrequency.options.scales.xAxes[0].ticks.max = parseInt($scope.timeScale);
            graphFrequency.options.scales.xAxes[0].ticks.stepSize = parseInt($scope.timeScale)/10;
            graphAmpli.options.scales.xAxes[0].ticks.max = parseInt($scope.timeScale);
            graphAmpli.options.scales.xAxes[0].ticks.stepSize = parseInt($scope.timeScale)/10;
            graphFrequency.options.scales.yAxes[0].ticks.max = parseFloat($scope.calibFreq) + parseFloat($scope.freqScale)*4/1000/1000;
            graphFrequency.options.scales.yAxes[0].ticks.min = parseFloat($scope.calibFreq) - parseFloat($scope.freqScale)*4/1000/1000;
            graphFrequency.options.scales.yAxes[0].ticks.stepSize = parseFloat($scope.freqScale)/1000/1000;
            graphFrequency.data.datasets[0].data = graphDataFreq1;
            graphFrequency.data.datasets[1].data = graphDataFreq2;
            graphFrequency.data.datasets[2].data = graphDataFreq3;
            graphFrequency.data.datasets[0].hidden = !$scope.displayFreq1;
            graphFrequency.data.datasets[1].hidden = !$scope.displayFreq2;
            graphFrequency.data.datasets[2].hidden = !$scope.displayFreq3;
            graphFrequency.update();
            graphAmpli.data.datasets[0].data = graphDataAmpli1;
            graphAmpli.data.datasets[1].data = graphDataAmpli2;
            graphAmpli.data.datasets[2].data = graphDataAmpli3;   
            graphAmpli.data.datasets[0].hidden = !$scope.displayAmpli1;
            graphAmpli.data.datasets[1].hidden = !$scope.displayAmpli2;
            graphAmpli.data.datasets[2].hidden = !$scope.displayAmpli3;
            graphAmpli.update();
        }
        function drawFrequencyGraph() {
            var context = document.getElementById("chartFreq");
            var graphData = {
                datasets: [{
                    borderColor: 'red',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointRadius: 2,
                    data: graphDataFreq1
                },{
                    borderColor: 'green',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointRadius: 2,
                    data: graphDataFreq2
                },{
                    borderColor: 'DodgerBlue',
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointRadius: 2,
                    data: graphDataFreq3
                }],
            };
            graphFrequency = new Chart(context, {
                type: 'line',
                data: graphData,
                options: {
                    title:{
                        display: true,
                        fontSize: 20,
                        fontColor: "white",
                        text: "Frequency"
                    },
                    animation : false,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        enabled: false,
                    },
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: '[s]',
                            },
                            ticks: {
                                min: 0,
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                            }
                        }],
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: '[Hz]',
                            },
                            ticks: {
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                            }
                        }]
                    }
                }
            });
        }
        drawFrequencyGraph();
        function drawAmpliGraph () {
            var context = document.getElementById("chartAmpli");
            var graphData = {
                datasets: [{
                    borderColor: "red",
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointRadius: 2,
                    data: 0,
                },{
                    borderColor: "green",
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointRadius: 2,
                    data: 0,
                },{
                    borderColor: "DodgerBlue",
                    pointBackgroundColor: 'white',
                    borderWidth: 2,
                    pointRadius: 2,
                    data: 0,
                }]
            };
            graphAmpli = new Chart(context, {
                type: 'line',
                data: graphData,
                options: {
                    title:{
                        display: true,
                        fontSize: 20,
                        fontColor: "white",
                        text: "Pulses"
                    },
                    animation : false,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        enabled: false,
                    },
                    scales: {
                        xAxes: [{
                            type: 'linear',
                            position: 'bottom',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: '[s]',
                            },
                            ticks: {
                                min: 0,
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                            }
                        }],
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            scaleLabel: {
                                display: true,
                                fontColor: "white",
                                fontSize: 20,
                                labelString: 'Pulses/period',
                            },
                            ticks: {
                                display: true,
                                min: 0,
                                max: 10,
                                fontColor: "white"
                            },
                            gridLines: {
                                display: true,
                                color: "white",
                                zeroLineColor: "white",
                            }
                        }]
                    }
                }
            });
        }
        drawAmpliGraph();
    }

} ());
