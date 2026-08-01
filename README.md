# ArduinoForge

Generador web de scripts para Arduino y ESP que crea código `.ino`, documentación de conexiones y notas del proyecto a partir de la placa y los componentes seleccionados.

## Qué hace

- Permite elegir una placa de desarrollo compatible.
- Muestra sensores, actuadores y accesorios disponibles según la placa.
- Genera automáticamente código Arduino listo para copiar o descargar.
- Crea una guía de conexiones para cada componente seleccionado.
- Incluye notas técnicas y librerías recomendadas para instalar en el Arduino IDE.

## Placas compatibles

- Arduino Uno
- ESP32
- ESP32-CAM
- ESP32 LoRa 868MHz
- NodeMCU (ESP8266)
- Módulo relé ESP8266

## Componentes disponibles

- AHT10
- AHT20
- BMP280
- MPU9250
- Botón pulsador
- Pantalla OLED SSD1306
- Módulo relé
- Fuente MB102

## Funciones recomendadas

- Lectura de temperatura y humedad
- Lectura de presión y altitud
- Lectura de IMU
- Visualización de datos en OLED
- Control de relé
- Lectura de botón con debounce
- Cambio de modo con botón
- Comunicación serie con comandos
- Lectura de sensores con intervalos
- Escáner I2C para validar conexiones y direcciones

## Uso

1. Abre `index.html` en un navegador moderno.
2. Escribe un nombre para el proyecto.
3. Selecciona la placa de desarrollo.
4. Elige uno o varios componentes.
5. Selecciona las funciones recomendadas que quieras incluir.
6. Pulsa `Generar Proyecto`.
7. Revisa las pestañas de código, conexiones y notas.
8. Copia el código o descarga el `.ino` y la documentación `.txt`.

## Tecnologías

- HTML5
- CSS3
- JavaScript

## Estructura del proyecto

- `index.html`: interfaz principal de la aplicación.
- `style.css`: estilos y diseño visual.
- `app.js`: lógica de selección, generación de código y documentación.
- `README.md`: documentación del proyecto.
- `LICENSE`: licencia del proyecto.

## Notas

- El proyecto es completamente estático y no necesita compilación.
- Algunas recomendaciones dependen del módulo físico exacto que uses, especialmente en ESP32-CAM, relés y pantallas OLED.
- La documentación generada asume conexiones típicas; conviene verificar el datasheet del módulo antes de montar el circuito.
- Si una conexión I2C no responde, usa la función de escaneo I2C para localizar la dirección real del dispositivo.

## Licencia

Este proyecto se publica bajo licencia MIT, de uso libre.
