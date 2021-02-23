# IoTFlow [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/neonious/lowjs/blob/master/LICENSE)
<p align="center">
  <img src="https://github.com/jerosoler/IoTFlow/blob/master/static/logo.png">
</p>

## Example
[![](http://img.youtube.com/vi/U8ZKvRl_Wt8/0.jpg)](http://www.youtube.com/watch?v=U8ZKvRl_Wt8 "IoTFlow - Example led")

## Install


``` bash
sudo apt-get install libpcap-dev

git clone https://github.com/jerosoler/IoTFlow.git

cd IoTFlow

npm install

### For Raspberry Install raspi-io
npm install raspi-io

sudo HOST=192.168.1.9 PORT=3000 npm run build  ## Cambia la IP

sudo HOST=192.168.1.9 PORT=3000 npm run start  ## Cambia la IP

### OR PM2

sudo HOST=192.168.1.9 PORT=3000 pm2 start npm --name="IoTFLow" -- start

```

## Setting
### Step 1
Load StandardFirmata or StandardFirmataWifi to your devices.
Test with:
* Arduino UNO (StandardFirmata)
* NodeMCU (StandardFirmataWifi)
* If you use raspberry for the software, you can also use the GPIO pins. (Not checked)

### Step 2
Configure your boards

![Image boards](https://github.com/jerosoler/IoTFlow/blob/master/docs/boards.png)

### Step 3
Create your flow

![Image Flow](https://github.com/jerosoler/IoTFlow/blob/master/docs/flow.png)

### Step 4
Play!! ;)

![IoTFlow](https://github.com/jerosoler/IoTFlow/blob/master/docs/IoTFlow.png)

## MQTT Server
Incorporates an MQTT server on port 1883. No username and password.

## Future implementations:
Dashboard:
* Joystick
* up/down
* Video view
* Img view
* Graphs

Firmata:
* LCD
* Motor
* Stepper

Functions:
* Telegram
* Others (Socket, email, iftt, assistant ...)


## Developers
``` bash
sudo HOST=192.168.1.9 PORT=3000 npm run dev  ## Change IP
```

Create your modules following the examples in the "modules" folder

## Donaciones
With a: star2: it is enough to continue with the project
