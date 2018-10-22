# IoTFlow

![Logo](https://github.com/jerosoler/IoTFlow/blob/master/static/logo.png)
## Ejemplo

[![](http://img.youtube.com/vi/U8ZKvRl_Wt8/0.jpg)](http://www.youtube.com/watch?v=U8ZKvRl_Wt8 "IoTFlow - Ejemplo led")

## Instalación


``` bash
sudo apt-get install libpcap-dev

git clone https://github.com/jerosoler/IoTFlow.git

cd IoTFlow

npm install --force

sudo HOST=192.168.1.9 PORT=3000 npm run build  ## Cambia la IP

sudo HOST=192.168.1.9 PORT=3000 npm run start  ## Cambia la IP

### OR PM2

sudo HOST=192.168.1.9 PORT=3000 pm2 start npm --name="IoTFLow" -- start

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

## MQTT Server
Incopora un servidor MQTT en el puerto 1883. Sin usuario y contraseña.

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
* Telegram
* Otras (Socket, email, iftt, assistant, exec command...)


## Developers 
``` bash
sudo HOST=192.168.1.9 PORT=3000 npm run dev  ## Cambia la IP
```

Crea tus modulos siguiendo los ejemplos de la carpeta "modules"
