import { YAPI, YErrorMsg, YTemperature, YHumidity, YPressure } from 'yoctolib-es';

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    refresh();
}

async function refresh()
{
    let serial = document.getElementById('serial').value;
    if(serial == '') {
        // by default use any connected module suitable for the demo
        let anysensor = YHumidity.FirstHumidity();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let temp = YTemperature.FindTemperature(serial+".temperature");
    let hum  = YHumidity.FindHumidity(serial+".humidity");
    let pres = YPressure.FindPressure(serial+".pressure");

    if (await hum.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("temp").value = (await temp.get_currentValue()) + (await temp.get_unit());
        document.getElementById("hum").value  = (await hum.get_currentValue()) + (await hum.get_unit());
        document.getElementById("pres").value = (await pres.get_currentValue()) + (await pres.get_unit());
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
