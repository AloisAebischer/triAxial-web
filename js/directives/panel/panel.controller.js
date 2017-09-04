(function () {
    'use strict';
    angular
        .module('triple-axis')
        .controller('panelCtrl', panelCtrl);

    function panelCtrl($scope) {
        var calibFreqObj = document.getElementById("calib-freq");
        var calibObj1 = document.getElementById("calibrate1");
        var calibObj2 = document.getElementById("calibrate2");
        var calibObj3 = document.getElementById("calibrate3");
        var freqObj1 = document.getElementById("freq1");
        var freqObj2 = document.getElementById("freq2");
        var freqObj3 = document.getElementById("freq3");
        var meanFreqObj1 = document.getElementById("mean-freq1");
        var meanFreqObj2 = document.getElementById("mean-freq2");
        var meanFreqObj3 = document.getElementById("mean-freq3");
        var minFreqObj1 = document.getElementById("min-freq1");
        var minFreqObj2 = document.getElementById("min-freq2");
        var minFreqObj3 = document.getElementById("min-freq3");
        var maxFreqObj1 = document.getElementById("max-freq1");
        var maxFreqObj2 = document.getElementById("max-freq2");
        var maxFreqObj3 = document.getElementById("max-freq3");
        var stdDevObj1 = document.getElementById("std-dev1");
        var stdDevObj2 = document.getElementById("std-dev2");
        var stdDevObj3 = document.getElementById("std-dev3");
        var leadObj1 = document.getElementById("lead1");
        var leadObj2 = document.getElementById("lead2");
        var leadObj3 = document.getElementById("lead3");
        var timeScaleObj = document.getElementById("time-scale");
        var freqScaleObj = document.getElementById("freq-scale");

        calibFreqObj.addEventListener("keyup", function(event){
            if(event.keyCode==13){
                $scope.calibFreq = calibFreqObj.value;
                $scope.$apply();
            }
        });

        timeScaleObj.addEventListener("keyup", function(event){
            if(event.keyCode==13){
                $scope.timeScale = timeScaleObj.value;
                $scope.$apply();
            }
        });
        freqScaleObj.addEventListener("keyup", function(event){
            if(event.keyCode==13){
                $scope.freqScale = freqScaleObj.value;
                $scope.$apply();
            }
        });
        $scope.calibrate1 = function(){
            if($scope.calibrateOk1 || $scope.calibrateError1) {
                $scope.calibrating1 = false;
                $scope.calibrateOk1 = false;
                $scope.calibrateError1 = false;
                calibObj1.innerHTML = "Calibrate 1";
            }
            else{
                $scope.calibrating1 = true;
                calibObj1.innerHTML = "Calibrating...";
                setTimeout(function(){ 
                    $scope.calibrating1 = false;
                    $scope.calibrateOk1 = true; 
                    calibObj1.innerHTML = "1 ready";
                    $scope.$apply(); 
                }, 3000)
            }
        }
        $scope.calibrate2 = function(){
            if($scope.calibrateOk2 || $scope.calibrateError2) {
                $scope.calibrating2 = false;
                $scope.calibrateOk2 = false;
                $scope.calibrateError2 = false;
                calibObj2.innerHTML = "Calibrate 2";
            }
            else{
                $scope.calibrating2 = true;
                calibObj2.innerHTML = "Calibrating...";
                setTimeout(function(){ 
                    $scope.calibrating2 = false;
                    $scope.calibrateError2 = true; 
                    calibObj2.innerHTML = "Error";
                    $scope.$apply();
                }, 3000)
            }
        }
        $scope.calibrate3 = function(){
            if($scope.calibrateOk3 || $scope.calibrateError3) {
                $scope.calibrating3 = false;
                $scope.calibrateOk3 = false;
                $scope.calibrateError3 = false;
                calibObj3.innerHTML = "Calibrate 3";
            }
            else{
                $scope.calibrating3 = true;
                calibObj3.innerHTML = "Calibrating...";
                setTimeout(function(){ 
                    $scope.calibrating3 = false;
                    $scope.calibrateOk3 = true; 
                    calibObj3.innerHTML = "3 ready";
                    $scope.$apply();
                }, 3000)
            }
        }
        $scope.measurePressed = function(value){
            if(value){
                $scope.frequencyData1 = [];
                $scope.currentFreq1 = [0,0];
                $scope.ampliData1 = [];
                $scope.frequencyData2 = [];
                $scope.currentFreq2 = [0,0];
                $scope.ampliData2 = [];
                $scope.frequencyData3 = [];
                $scope.currentFreq3 = [0,0];
                $scope.ampliData3 = [];
            }
        }
        //Compute statistical values for signal 1
        $scope.computeStat1 = function() {
            var sumFreq=0, meanFreq=0, minFreq=0, maxFreq=0, stdDev=0, leadAvg=0;
            if($scope.frequencyData1.length){
                //Calculating mean, min, max and std deviation
                maxFreq = $scope.frequencyData1[0][1];
                minFreq = $scope.frequencyData1[0][1];
                for(var i=0; i<$scope.frequencyData1.length;i++){
                    sumFreq=sumFreq+$scope.frequencyData1[i][1];
                    if($scope.frequencyData1[i][1] > maxFreq) maxFreq = $scope.frequencyData1[i][1];
                    if($scope.frequencyData1[i][1] < minFreq) minFreq = $scope.frequencyData1[i][1];
                }
                meanFreq=sumFreq/$scope.frequencyData1.length;
                for(var i=0; i<$scope.frequencyData1.length;i++){
                    stdDev=stdDev+($scope.frequencyData1[i][1] - meanFreq)*($scope.frequencyData1[i][1] - meanFreq);
                }
                stdDev = Math.sqrt(stdDev/$scope.frequencyData1.length);
                //Calculating lead/lag over the 30 previous values
                sumFreq=0; 
                if($scope.frequencyData1.length >= 30){
                    for(var i=0; i<30; i++){
                        sumFreq = sumFreq + $scope.frequencyData1[$scope.frequencyData1.length - i - 1][1]
                    }
                    if(sumFreq > 0) leadAvg = (sumFreq/30*60*60 - 10800)/(sumFreq/30)*24;
                }
                else leadAvg = 0;
            }
            //Writing values in panel
            freqObj1.innerHTML=$scope.currentFreq1[1].toFixed(6);
            meanFreqObj1.innerHTML=meanFreq.toFixed(6);
            minFreqObj1.innerHTML=minFreq.toFixed(6);
            maxFreqObj1.innerHTML=maxFreq.toFixed(6);
            stdDevObj1.innerHTML=(stdDev*1000*1000).toFixed(2);
            leadObj1.innerHTML = leadAvg.toFixed(0);
        }

        //Compute statistical values for signal 2
        $scope.computeStat2 = function() {
            //Calculating mean and std deviation
            var sumFreq=0, meanFreq=0, minFreq=0, maxFreq=0, stdDev=0, leadAvg=0;
            if($scope.frequencyData2.length){
                maxFreq = $scope.frequencyData2[0][1];
                minFreq = $scope.frequencyData2[0][1];
                for(var i=0; i<$scope.frequencyData2.length;i++){
                    sumFreq=sumFreq+$scope.frequencyData2[i][1];
                    if($scope.frequencyData2[i][1] > maxFreq) maxFreq = $scope.frequencyData2[i][1];
                    if($scope.frequencyData2[i][1] < minFreq) minFreq = $scope.frequencyData2[i][1];
                }
                meanFreq=sumFreq/$scope.frequencyData2.length;
                for(var i=0; i<$scope.frequencyData2.length;i++){
                    stdDev=stdDev+($scope.frequencyData2[i][1] - meanFreq)*($scope.frequencyData2[i][1] - meanFreq);
                }
                stdDev = Math.sqrt(stdDev/$scope.frequencyData2.length);
                //Calculating lead/lag over the 30 previous values
                sumFreq=0; 
                if($scope.frequencyData2.length >= 30){
                    for(var i=0; i<30; i++){
                        sumFreq = sumFreq + $scope.frequencyData2[$scope.frequencyData2.length - i - 1][1]
                    }
                    if(sumFreq > 0) leadAvg = (sumFreq/30*60*60 - 10800)/(sumFreq/30)*24;
                }
                else leadAvg = 0;
            }
            //Writing values in panel
            freqObj2.innerHTML=$scope.currentFreq2[1].toFixed(6);
            meanFreqObj2.innerHTML=meanFreq.toFixed(6);
            minFreqObj2.innerHTML=minFreq.toFixed(6);
            maxFreqObj2.innerHTML=maxFreq.toFixed(6);
            stdDevObj2.innerHTML=(stdDev*1000*1000).toFixed(2);
            leadObj2.innerHTML = leadAvg.toFixed(0);
        }

        //Compute statistics values for signal 3
        $scope.computeStat3 = function() {
            //Calculating mean and std deviation
            var sumFreq=0, meanFreq=0, minFreq=0, maxFreq=0, stdDev=0, leadAvg=0;
            if($scope.frequencyData3.length){
                maxFreq = $scope.frequencyData3[0][1];
                minFreq = $scope.frequencyData3[0][1];
                for(var i=0; i<$scope.frequencyData3.length;i++){
                    sumFreq=sumFreq+$scope.frequencyData3[i][1];
                    if($scope.frequencyData3[i][1] > maxFreq) maxFreq = $scope.frequencyData3[i][1];
                    if($scope.frequencyData3[i][1] < minFreq) minFreq = $scope.frequencyData3[i][1];
                }
                meanFreq=sumFreq/$scope.frequencyData3.length;
                for(var i=0; i<$scope.frequencyData3.length;i++){
                    stdDev=stdDev+($scope.frequencyData3[i][1] - meanFreq)*($scope.frequencyData3[i][1] - meanFreq);
                }
                stdDev = Math.sqrt(stdDev/$scope.frequencyData3.length);
                //Calculating lead/lag over the 30 previous values
                sumFreq=0; 
                if($scope.frequencyData3.length >= 30){
                    for(var i=0; i<30; i++){
                        sumFreq = sumFreq + $scope.frequencyData3[$scope.frequencyData3.length - i - 1][1]
                    }
                    if(sumFreq > 0) leadAvg = (sumFreq/30*60*60 - 10800)/(sumFreq/30)*24;
                }
                else leadAvg = 0;
            }
            //Writing values in panel
            freqObj3.innerHTML=$scope.currentFreq3[1].toFixed(6);
            meanFreqObj3.innerHTML=meanFreq.toFixed(6);
            minFreqObj3.innerHTML=minFreq.toFixed(6);
            maxFreqObj3.innerHTML=maxFreq.toFixed(6);
            stdDevObj3.innerHTML=(stdDev*1000*1000).toFixed(2);
            leadObj3.innerHTML = leadAvg.toFixed(0);
        }

        var cube = document.getElementById("cube");
        $scope.rotateMovement = function(){
            cube.style.transform = "rotateX("+$scope.rollMovement+"deg) rotateZ("+$scope.pitchMovement+"deg)";
        }
    }
    

} ());
