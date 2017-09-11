/*jshint esversion: 6 */
angular.module('tri-axial', []).controller('mainController', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
    var mainVm = this,
    yPwmInput1_frequency1 = null,
    yPwmInput1_frequency2 = null,
    yPwmInput1_frequency3 = null,
    y3d_roll = null,
    y3d_pitch = null,
    y3d_compass = null,
    errmsg = new YErrorMsg();

    $scope.interfaceData = {
        frequencyData1: [],
        currentFreq1: [0,0],
        ampliData1: [],
        frequencyData2: [],
        currentFreq2: [0,0],
        ampliData2: [],
        frequencyData3: [],
        currentFreq3: [0,0],
        ampliData3: [],
        freqScale: 5000,
        timeScale: 120,
        measuring: false,
        save: false,
        calibFreq: 3.00,
        calibrating1: false,
        calibrating2: false,
        calibrating3: false,
        calibrateOk1: false,
        calibrateOk2: false,
        calibrateOk3: false,
        calibrateError1: false,
        calibrateError2: false,
        calibrateError3: false,
        displayFreq1: true,
        displayFreq2: true,
        displayFreq3: true,
        displayAmpli1: true,
        displayAmpli2: true,
        displayAmpli3: true,
        rollMovement: 0,
        pitchMovement: 0,
        compassMovement: 0,
    };

    function connectYocto() {
        var YAPI = _yocto_api.YAPI;
        YAPI.LogUnhandledPromiseRejections().then(() => {
            return YAPI.DisableExceptions();
        }
        ).then(() => {
            // Setup the API to use the VirtualHub on local machine
            return YAPI.RegisterHub('http://' + 'localhost' + ':4444', errmsg);
        }
            ).then((res) => {
                if (res != YAPI.SUCCESS) {
                    console.error('Cannot contact VirtualHub on ' + 'localhost' + ':4444' + errmsg.msg);
                    return;
                }
            }
            ).then(() => {
                // by default use any connected module suitable for the demo
                //Connexion to 3D module
                console.log('Using device 3D Tilt ' + "Y3DMK001-1B682");
                y3d_roll = YTilt.FindTilt("Y3DMK001-1B682" + ".tilt1");
                y3d_roll.isOnline().then((onLine) => {
                    if (onLine) {
                        y3d_roll.registerValueCallback(computeRoll);
                    }
                    else {
                        console.error("Can't find module " + "Y3DMK001-1B682" + ".tilt1");
                    }
                })
                y3d_pitch = YTilt.FindTilt("Y3DMK001-1B682" + ".tilt2");
                y3d_pitch.isOnline().then((onLine) => {
                    if (onLine) {
                        y3d_pitch.registerValueCallback(computePitch);
                    }
                    else {
                        console.error("Can't find module " + "Y3DMK001-1B682" + ".tilt2");
                    }
                })
                y3d_compass = YCompass.FindCompass("Y3DMK001-1B682" + ".compass");
                y3d_compass.isOnline().then((onLine) => {
                    if (onLine) {
                        y3d_compass.registerValueCallback(computeCompass);
                    }
                    else {
                        console.error("Can't find module " + "Y3DMK001-1B682" + ".compass");
                    }
                })
            })
    }
    //Connect to serial port for Arduino
    var arduinoPort = new SerialPort('COM6', {baudRate: 9600, parser: SerialPort.parsers.readline("\n")} ,function (err) { 
        if (err) console.error('Error opening Arduino serial port'); 
        else console.log("Arduino serial port open");
    });
    var  wheel=0, index = 0;
    function init() {
        arduinoPort.on('data', function (data) {
            if($scope.interfaceData.measuring){
                if(wheel==0){
                    var obj2 = [index, parseInt(data)/3];
                    $scope.interfaceData.ampliData1.push(obj2);
                    //$scope.$apply();
                }
                else if(wheel==1){
                    var obj1 = [index, 1/((1000000 - 25975 - parseInt(data))/3/1000/1000)];
                    $scope.interfaceData.frequencyData1.push(obj1);
                    $scope.interfaceData.currentFreq1 = obj1;
                    //$scope.$apply();
                }
                if(wheel==2){
                    var obj2 = [index, parseInt(data)/3];
                    $scope.interfaceData.ampliData2.push(obj2);
                    //$scope.$apply();
                }
                else if(wheel==3){
                    var obj1 = [index, 1/((1000000 - 25975 - parseInt(data))/3/1000/1000)];
                    $scope.interfaceData.frequencyData2.push(obj1);
                    $scope.interfaceData.currentFreq2 = obj1;
                    //$scope.$apply();
                }
                if(wheel==4){
                    var obj2 = [index, parseInt(data)/3];
                    $scope.interfaceData.ampliData3.push(obj2);
                    //$scope.$apply();
                }
                else if(wheel==5){
                    var obj1 = [index, 1/((1000000 - 25975 - parseInt(data))/3/1000/1000)];
                    $scope.interfaceData.frequencyData3.push(obj1);
                    $scope.interfaceData.currentFreq3 = obj1;
                    $scope.$apply();
                }
            }
            wheel++;
            if(wheel==6){
                wheel = 0;
                index++;
            } 
            
        });
        var intervalData;
        $scope.$watch('interfaceData.measuring', function (value) {
            if (value) {
                index=0;
                indexValue=0;
                intervalData = setInterval(getFrequency, 1000);
            }
            else clearInterval(intervalData);
        });
        //Connect to Yocto modules
        connectYocto();
    }
    //Code for random frequencies
    var indexValue=0;
   function getFrequency(){
        var realTime = new Date().getTime();
        var meanFrequency1 = 3 + 0.01*Math.random() - 0.005;
        var meanFrequency2 = 2.99 + 0.01*Math.random() - 0.01;
        var meanFrequency3 = 3.01 + 0.01*Math.random() - 0.01;
        var obj1 = [indexValue, meanFrequency1];
        var obj2 = [indexValue, meanFrequency2];
        var obj3 = [indexValue, meanFrequency3];
        $scope.interfaceData.ampliData1.push([indexValue, 3]);
        $scope.interfaceData.frequencyData1.push(obj1);
        $scope.interfaceData.currentFreq1 = obj1;
        $scope.interfaceData.ampliData2.push([indexValue, 6]);
        $scope.interfaceData.frequencyData2.push(obj2);
        $scope.interfaceData.currentFreq2 = obj2;
        $scope.interfaceData.ampliData3.push([indexValue, 4]);
        $scope.interfaceData.frequencyData3.push(obj3);
        $scope.interfaceData.currentFreq3 = obj3;
        indexValue++;
        $scope.$apply();
    }
    function computeRoll(object, value){
        $scope.interfaceData.rollMovement = value;
        $scope.$apply();
    }
    function computePitch(object, value){
        $scope.interfaceData.pitchMovement = value;
        $scope.$apply();
    }
    function computeCompass(object, value){
    }
    init();
}
])
