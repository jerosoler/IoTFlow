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
Configura tus placas

![Image boards](https://github.com/jerosoler/IoTFlow/blob/master/docs/boards.png)

### Paso 2
Crea tu flujo

![Image Flow](https://github.com/jerosoler/IoTFlow/blob/master/docs/flow.png)

### Paso 3
Play!! ;)

![IoTFlow](https://github.com/jerosoler/IoTFlow/blob/master/docs/IoTFlow.png)


## Developers 
``` bash
sudo HOST=192.168.1.9 PORT=3000 npm run dev  ## Cambia la IP
```
