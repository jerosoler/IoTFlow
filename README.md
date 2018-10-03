# IoTFlow

![Logo](https://github.com/jerosoler/IoTFlow/blob/master/static/logo.png)


## Instalación


``` bash
sudo apt-get install libpcap-dev

git clone https://github.com/jerosoler/IoTFlow.git

cd IoTFlow

npm install --force

sudo HOST=192.168.1.9 PORT=3000 npm run build  ## Cambia la IP

sudo HOST=192.168.1.9 PORT=3000 npm run start  ## Cambia la IP
```

## Configuración
### Paso 1
Carga StandarFirmata o StandardFirmataWifi a tus dispositivos.
Testeado con:
* Arduino UNO (StandardFirmata)
* NodeMCU (StandardFirmataWifi)
* Si utilizas raspberry para el software, puedes utilizar también los pines GPIO. (No comprobado)

### Paso 2
Configura tus placas

![Image boards](https://github.com/jerosoler/IoTFlow/blob/master/docs/boards.png)

### Paso 3
Crea tu flujo

![Image Flow](https://github.com/jerosoler/IoTFlow/blob/master/docs/flow.png)

### Paso 4
Play!! ;)

![IoTFlow](https://github.com/jerosoler/IoTFlow/blob/master/docs/IoTFlow.png)

## Furutas implementaciones:
Dashboard: 
* Joystick
* up/down
* Video view
* Img view
* Graficas

Firmata:
* LCD
* Light
* Motion
* Piezo
* Proximiti
* Thermometer
* Button
* Switch
* Joystick
* Sensor

Functions:
* Mqtt
* Telegram
* Otras (Socket, email, iftt, assistant, exec command...)


## Developers 
``` bash
sudo HOST=192.168.1.9 PORT=3000 npm run dev  ## Cambia la IP
```

Crea tus modulos siguiendo los ejemplos de la carpeta "modules"
