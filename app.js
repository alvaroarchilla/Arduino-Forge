/* ============================================
   ArduinoForge — Application Logic
   ============================================ */

// ==============================================
// DATA: Boards
// ==============================================
const BOARDS = {
  'arduino-uno': {
    name: 'Arduino Uno',
    icon: '📟',
    chip: 'ATmega328P',
    voltage: '5V',
    specs: ['32KB Flash', '2KB SRAM', '16MHz'],
    wireless: false,
    pins: {
      sda: 'A4',
      scl: 'A5',
      buttonDefault: '2',
      buttonPin: '2',
      relayDefault: '7',
      relayPin: '7',
      dhtDefault: '4',
      dhtPin: '4',
      ds18Default: '4',
      ds18Pin: '4',
      trigDefault: '9',
      trigPin: '9',
      echoDefault: '10',
      echoPin: '10',
      pirDefault: '3',
      pirPin: '3',
      soilDefault: 'A0',
      soilPin: 'A0',
      micDefault: 'A1',
      micPin: 'A1',
      servoDefault: '9',
      servoPin: '9',
      ledDefault: '6',
      ledPin: '6',
      pumpDefault: '8',
      pumpPin: '8'
    },
    baudRate: 9600,
    notes: [
      'Opera a 5V — algunos sensores I2C requieren conversores de nivel si trabajan a 3.3V.',
      'Memoria limitada: 32KB Flash y 2KB SRAM. Evita cadenas de texto largas.',
      'Usa F() para cadenas en Serial.print y ahorra RAM: Serial.println(F("texto"));',
      'El pin 13 tiene un LED integrado que puede interferir si se usa como GPIO.'
    ]
  },
  'esp32': {
    name: 'ESP32',
    icon: '⚡',
    chip: 'ESP32-WROOM-32',
    voltage: '3.3V',
    specs: ['4MB Flash', '520KB SRAM', '240MHz', 'WiFi', 'BT'],
    wireless: true,
    pins: {
      sda: '21',
      scl: '22',
      buttonDefault: '15',
      buttonPin: '15',
      relayDefault: '25',
      relayPin: '25',
      dhtDefault: '4',
      dhtPin: '4',
      ds18Default: '4',
      ds18Pin: '4',
      trigDefault: '26',
      trigPin: '26',
      echoDefault: '27',
      echoPin: '27',
      pirDefault: '14',
      pirPin: '14',
      soilDefault: '34',
      soilPin: '34',
      micDefault: '35',
      micPin: '35',
      servoDefault: '18',
      servoPin: '18',
      ledDefault: '5',
      ledPin: '5',
      pumpDefault: '26',
      pumpPin: '26'
    },
    baudRate: 115200,
    notes: [
      'Opera a 3.3V — NO conectes entradas de 5V directamente a los GPIOs.',
      'Los pines GPIO 6-11 están reservados para la flash SPI interna. No los uses.',
      'Los pines GPIO 34, 35, 36, 39 son solo de entrada (sin pull-up interno).',
      'Incluye WiFi y Bluetooth integrado para proyectos IoT.',
      'Instala el soporte ESP32 en Arduino IDE: Archivo > Preferencias > URLs adicionales.'
    ]
  },
  'nodemcu': {
    name: 'NodeMCU',
    icon: '📡',
    chip: 'ESP8266 (ESP-12E)',
    voltage: '3.3V',
    specs: ['4MB Flash', '80KB SRAM', '80MHz', 'WiFi'],
    wireless: true,
    pins: {
      sda: 'D2 (GPIO 4)',
      scl: 'D1 (GPIO 5)',
      buttonDefault: 'D3 (GPIO 0)',
      buttonPin: '0',
      relayDefault: 'D5 (GPIO 14)',
      relayPin: '14',
      dhtDefault: 'D4 (GPIO 2)',
      dhtPin: '2',
      ds18Default: 'D4 (GPIO 2)',
      ds18Pin: '2',
      trigDefault: 'D6 (GPIO 12)',
      trigPin: '12',
      echoDefault: 'D7 (GPIO 13)',
      echoPin: '13',
      pirDefault: 'D5 (GPIO 14)',
      pirPin: '14',
      soilDefault: 'A0',
      soilPin: 'A0',
      micDefault: 'A0',
      micPin: 'A0',
      servoDefault: 'D6 (GPIO 12)',
      servoPin: '12',
      ledDefault: 'D2 (GPIO 4)',
      ledPin: '4',
      pumpDefault: 'D5 (GPIO 14)',
      pumpPin: '14'
    },
    baudRate: 115200,
    notes: [
      'Opera a 3.3V — NO conectes entradas de 5V directamente.',
      'Solo tiene 1 entrada analógica (A0) con rango 0-1V.',
      'GPIO 0 (D3) y GPIO 2 (D4) afectan al modo de arranque — evita mantenerlos LOW al encender.',
      'GPIO 16 (D0) es necesario para despertar del deep sleep.',
      'Incluye WiFi integrado. Instala el soporte ESP8266 en Arduino IDE.'
    ]
  },
  'esp32-cam': {
    name: 'ESP32-CAM',
    icon: '📷',
    chip: 'ESP32-S + OV2640',
    voltage: '3.3V (alim. 5V)',
    specs: ['4MB Flash', '520KB SRAM', '240MHz', 'WiFi', 'BT', 'Cámara'],
    wireless: true,
    pins: {
      sda: '14',
      scl: '15',
      buttonDefault: '13',
      buttonPin: '13',
      relayDefault: '12',
      relayPin: '12',
      dhtDefault: '13',
      dhtPin: '13',
      ds18Default: '13',
      ds18Pin: '13',
      trigDefault: '12',
      trigPin: '12',
      echoDefault: '13',
      echoPin: '13',
      pirDefault: '13',
      pirPin: '13',
      soilDefault: '2',
      soilPin: '2',
      micDefault: '2',
      micPin: '2',
      servoDefault: '12',
      servoPin: '12',
      ledDefault: '4',
      ledPin: '4',
      pumpDefault: '12',
      pumpPin: '12'
    },
    baudRate: 115200,
    notes: [
      'La ESP32-CAM NO tiene puerto USB. Necesitas un adaptador FTDI/USB-TTL para programar.',
      'Para programar: conecta GPIO 0 a GND, sube el código, desconecta GPIO 0 y reinicia.',
      'GPIOs disponibles (no usados por cámara): 2, 4, 12, 13, 14, 15.',
      'GPIO 4 controla el LED flash integrado.',
      'Requiere alimentación de 5V (pin 5V). No funciona estable con 3.3V solo.',
      'Si usas microSD, los pines 2, 4, 12, 13, 14, 15 se comparten — cuidado con conflictos.',
      'Opera a 3.3V lógico — NO conectes 5V a los GPIOs.'
    ]
  },
  'esp32-lora': {
    name: 'ESP32 LoRa 868MHz',
    icon: '📻',
    chip: 'ESP32 + SX1276',
    voltage: '3.3V',
    specs: ['4MB Flash', '520KB SRAM', '240MHz', 'WiFi', 'BT', 'LoRa'],
    wireless: true,
    pins: {
      sda: '21',
      scl: '22',
      buttonDefault: '0',
      buttonPin: '0',
      relayDefault: '23',
      relayPin: '23',
      dhtDefault: '13',
      dhtPin: '13',
      ds18Default: '13',
      ds18Pin: '13',
      trigDefault: '25',
      trigPin: '25',
      echoDefault: '33',
      echoPin: '33',
      pirDefault: '32',
      pirPin: '32',
      soilDefault: '34',
      soilPin: '34',
      micDefault: '35',
      micPin: '35',
      servoDefault: '25',
      servoPin: '25',
      ledDefault: '12',
      ledPin: '12',
      pumpDefault: '23',
      pumpPin: '23'
    },
    baudRate: 115200,
    notes: [
      'Frecuencia 868 MHz: banda ISM para Europa. Verifica la normativa de tu país.',
      'Pines LoRa (TTGO LoRa32): CS=18, RST=14, DIO0=26, MOSI=27, MISO=19, SCK=5.',
      'Los pines SPI del LoRa varían según fabricante (TTGO, Heltec, etc.).',
      'Algunos módulos incluyen pantalla OLED integrada (Heltec WiFi LoRa 32).',
      'La antena es fundamental para el alcance LoRa — no la omitas.',
      'Instala la librería "LoRa" de Sandeep Mistry desde el gestor de librerías.',
      'Opera a 3.3V — NO conectes entradas de 5V a los GPIOs.'
    ]
  },
  'esp8266-relay': {
    name: 'ESP8266 Módulo Relé',
    icon: '🔌',
    chip: 'ESP-01S + Relé',
    voltage: '3.3V (alim. 5V)',
    specs: ['1MB Flash', '80KB SRAM', '80MHz', 'WiFi', 'Relé'],
    wireless: true,
    pins: {
      sda: '0',
      scl: '2',
      buttonDefault: null,
      buttonPin: null,
      relayDefault: 'GPIO 0',
      relayPin: '0',
      dhtDefault: 'GPIO 2',
      dhtPin: '2',
      ds18Default: 'GPIO 2',
      ds18Pin: '2',
      trigDefault: null,
      trigPin: null,
      echoDefault: null,
      echoPin: null,
      pirDefault: 'GPIO 2',
      pirPin: '2',
      soilDefault: null,
      soilPin: null,
      micDefault: null,
      micPin: null,
      servoDefault: null,
      servoPin: null,
      ledDefault: 'GPIO 2',
      ledPin: '2',
      pumpDefault: 'GPIO 0',
      pumpPin: '0'
    },
    baudRate: 115200,
    notes: [
      'El ESP-01S tiene pines muy limitados: GPIO 0, GPIO 2, TX, RX.',
      'El relé integrado se controla normalmente por GPIO 0.',
      'Requiere alimentación de 5V para el relé (VCC del módulo).',
      'Para programar necesitas un adaptador USB-TTL para ESP-01.',
      'GPIO 0 debe estar en HIGH durante el arranque para modo normal de ejecución.',
      'LOW en GPIO 0 = relé activado (lógica invertida en mayoría de módulos).',
      'Capacidad I2C muy limitada por los escasos pines disponibles.',
      'Instala el soporte ESP8266 en Arduino IDE.'
    ]
  }
};

// ==============================================
// DATA: Components
// ==============================================
const COMPONENTS = {
  'aht10': {
    name: 'AHT10',
    icon: '🌡️',
    type: 'sensor',
    category: 'Temperatura y Humedad',
    interface: 'I2C',
    address: '0x38',
    description: 'Sensor digital de temperatura y humedad de alta precisión',
    library: 'Adafruit AHTX0',
    includes: ['Adafruit_AHTX0.h'],
    globalVars: 'Adafruit_AHTX0 aht;',
    needsAdafruitSensor: true,
    setupCode: [
      '// Inicializar sensor AHT10',
      'if (!aht.begin()) {',
      '  Serial.println(F("ERROR: No se encontró el sensor AHT10. Verifica conexiones."));',
      '  while (1) delay(10);',
      '}',
      'Serial.println(F("✓ AHT10 inicializado correctamente."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V ó 5V' },
        { component: 'GND', board: 'GND' },
        { component: 'SDA', board: '{SDA}' },
        { component: 'SCL', board: '{SCL}' }
      ],
      notes: [
        'El módulo habitual acepta 3.3V y 5V y ya trae resistencias de pull-up en SDA y SCL.',
        'Dirección fija 0x38. No lo combines con un AHT20 ni con otro dispositivo en esa dirección.',
        'Cables I2C cortos (idealmente menos de 30 cm). Si no responde, ejecuta el escáner I2C.'
      ]
    }
  },
  'aht20': {
    name: 'AHT20',
    icon: '🌡️',
    type: 'sensor',
    category: 'Temperatura y Humedad',
    interface: 'I2C',
    address: '0x38',
    description: 'Versión mejorada del AHT10 con mejor estabilidad y precisión',
    library: 'Adafruit AHTX0',
    includes: ['Adafruit_AHTX0.h'],
    globalVars: 'Adafruit_AHTX0 aht;',
    needsAdafruitSensor: true,
    setupCode: [
      '// Inicializar sensor AHT20',
      'if (!aht.begin()) {',
      '  Serial.println(F("ERROR: No se encontró el sensor AHT20. Verifica conexiones."));',
      '  while (1) delay(10);',
      '}',
      'Serial.println(F("✓ AHT20 inicializado correctamente."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V ó 5V' },
        { component: 'GND', board: 'GND' },
        { component: 'SDA', board: '{SDA}' },
        { component: 'SCL', board: '{SCL}' }
      ],
      notes: [
        'Acepta 3.3V y 5V. Precisión típica ±0.3 °C y ±2 % de humedad, mejor que el AHT10.',
        'Misma dirección I2C que el AHT10 (0x38): no conectes ambos a la vez.',
        'El módulo suele incluir pull-ups. Si el chip va suelto, pon 4.7 kΩ de SDA y de SCL a 3.3V.'
      ]
    }
  },
  'bmp280': {
    name: 'BMP280',
    icon: '🎯',
    type: 'sensor',
    category: 'Presión Barométrica',
    interface: 'I2C',
    address: '0x76 ó 0x77',
    description: 'Sensor de presión barométrica, temperatura y altitud estimada',
    library: 'Adafruit BMP280',
    includes: ['Adafruit_BMP280.h'],
    globalVars: 'Adafruit_BMP280 bmp;',
    needsAdafruitSensor: true,
    setupCode: [
      '// Inicializar sensor BMP280',
      'if (!bmp.begin(0x76)) {',
      '  Serial.println(F("ERROR: No se encontró el sensor BMP280. Prueba dirección 0x77."));',
      '  while (1) delay(10);',
      '}',
      'bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,',
      '                Adafruit_BMP280::SAMPLING_X2,   // temperatura',
      '                Adafruit_BMP280::SAMPLING_X16,  // presión',
      '                Adafruit_BMP280::FILTER_X16,',
      '                Adafruit_BMP280::STANDBY_MS_500);',
      'Serial.println(F("✓ BMP280 inicializado correctamente."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V' },
        { component: 'GND', board: 'GND' },
        { component: 'SDA/SDI', board: '{SDA}' },
        { component: 'SCL/SCK', board: '{SCL}' },
        { component: 'CSB', board: '3.3V (para modo I2C)' },
        { component: 'SDO', board: 'GND (dir. 0x76) ó 3.3V (dir. 0x77)' }
      ],
      notes: [
        '¡IMPORTANTE! El BMP280 funciona solo a 3.3V. No conectar a 5V directamente.',
        'Si usas Arduino Uno (5V), necesitas un módulo con regulador integrado (la mayoría lo traen).',
        'Pin CSB a VCC y SDO a GND configuran modo I2C con dirección 0x76. No lo combines con un BME280.',
        'La altitud calculada es aproximada y depende de la presión a nivel del mar local (1013.25 hPa por defecto).'
      ]
    }
  },
  'mpu9250': {
    name: 'MPU9250',
    icon: '🧭',
    type: 'sensor',
    category: 'IMU 9-DOF',
    interface: 'I2C',
    address: '0x68',
    description: 'Sensor inercial de 9 ejes: giroscopio + acelerómetro + magnetómetro',
    library: 'MPU9250_asukiaaa',
    includes: ['MPU9250_asukiaaa.h'],
    globalVars: 'MPU9250_asukiaaa mpu;',
    needsAdafruitSensor: false,
    setupCode: [
      '// Inicializar sensor MPU9250',
      'mpu.setWire(&Wire);',
      'mpu.beginAccel();',
      'mpu.beginGyro();',
      'mpu.beginMag();',
      'Serial.println(F("✓ MPU9250 inicializado (Accel + Gyro + Mag)."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V' },
        { component: 'GND', board: 'GND' },
        { component: 'SDA', board: '{SDA}' },
        { component: 'SCL', board: '{SCL}' }
      ],
      notes: [
        'El chip va a 3.3V. En Arduino Uno usa un módulo con regulador o un conversor de nivel en SDA/SCL.',
        'AD0 a GND = 0x68; AD0 a VCC = 0x69. El magnetómetro interno (AK8963) usa 0x0C.',
        'Muchos módulos baratos marcados como MPU9250 son un MPU6500 sin magnetómetro. Si el eje mag no cambia, el chip no es un 9250.',
        'Calibra el magnetómetro moviendo el sensor en forma de 8.',
        'El GY-91 lleva un BMP280 en 0x76: no añadas otro BMP280 o BME280 en esa dirección.'
      ]
    }
  },
  'button': {
    name: 'Botón (Pulsador)',
    icon: '🔘',
    type: 'actuator',
    category: 'Entrada Digital',
    interface: 'Digital',
    address: null,
    description: 'Botón pulsador con resistencia pull-up interna',
    library: null,
    includes: [],
    globalVars: null,
    pinDefines: [{ name: 'PIN_BOTON', valueKey: 'buttonPin' }],
    needsAdafruitSensor: false,
    setupCode: [
      '// Configurar botón con pull-up interno',
      'pinMode(PIN_BOTON, INPUT_PULLUP);',
      'Serial.println(F("✓ Botón configurado en pin {BUTTON_PIN}."));'
    ],
    wiring: {
      pins: [
        { component: 'Terminal 1', board: '{BUTTON_PIN}' },
        { component: 'Terminal 2', board: 'GND' }
      ],
      notes: [
        'Un terminal al GPIO y el otro a GND. La pull-up es interna: pulsado = LOW, suelto = HIGH.',
        'No hace falta resistencia externa.',
        'En ESP8266 no uses GPIO0 ni GPIO2 si el botón puede quedar pulsado al encender: la placa no arranca.',
        'Sin debounce un solo clic se cuenta varias veces. Activa una función de botón recomendada.'
      ]
    }
  },
  'oled-ssd1306': {
    name: 'Pantalla OLED SSD1306',
    icon: '📺',
    type: 'actuator',
    category: 'Pantalla',
    interface: 'I2C',
    address: '0x3C',
    description: 'Pantalla OLED monocromática de 128×64 píxeles con interfaz I2C',
    library: 'Adafruit SSD1306 + Adafruit GFX',
    includes: ['Adafruit_GFX.h', 'Adafruit_SSD1306.h'],
    globalVars: [
      '#define SCREEN_WIDTH 128',
      '#define SCREEN_HEIGHT 64',
      '#define OLED_RESET -1',
      'Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);'
    ],
    needsAdafruitSensor: false,
    setupCode: [
      '// Inicializar pantalla OLED',
      'if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {',
      '  Serial.println(F("ERROR: No se encontró la pantalla OLED."));',
      '  while (1) delay(10);',
      '}',
      'display.clearDisplay();',
      'display.setTextColor(SSD1306_WHITE);',
      'display.setTextSize(1);',
      'display.setCursor(0, 0);',
      'display.println(F("ArduinoForge"));',
      'display.println(F("Iniciando..."));',
      'display.display();',
      'delay(1500);',
      'Serial.println(F("✓ Pantalla OLED inicializada."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V ó 5V' },
        { component: 'GND', board: 'GND' },
        { component: 'SDA', board: '{SDA}' },
        { component: 'SCL', board: '{SCL}' }
      ],
      notes: [
        'El módulo de 0.96" suele aceptar 3.3V y 5V y trae pull-ups I2C.',
        'Dirección más común: 0x3C. Si se queda en negro, cambia 0x3C por 0x3D en el código.',
        'Comparte SDA y SCL con el resto de sensores I2C.',
        '128×64: con textSize(1) caben unas 21 columnas y 8 filas. Con varios sensores usa la función de alternar pantallas.'
      ]
    }
  },
  'relay': {
    name: 'Módulo Relé',
    icon: '🔌',
    type: 'actuator',
    category: 'Control de Potencia',
    interface: 'Digital',
    address: null,
    description: 'Módulo relé para controlar cargas de alto voltaje (hasta 250VAC / 10A)',
    library: null,
    includes: [],
    globalVars: null,
    pinDefines: [{ name: 'PIN_RELE', valueKey: 'relayPin' }],
    needsAdafruitSensor: false,
    setupCode: [
      '// Configurar pin del relé como salida',
      'pinMode(PIN_RELE, OUTPUT);',
      'digitalWrite(PIN_RELE, HIGH); // Relé desactivado (lógica invertida)',
      'Serial.println(F("✓ Relé configurado en pin {RELAY_PIN}."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '5V' },
        { component: 'GND', board: 'GND' },
        { component: 'IN (Signal)', board: '{RELAY_PIN}' },
        { component: 'COM', board: 'Común (cable de carga)' },
        { component: 'NO', board: 'Normal Abierto (carga)' },
        { component: 'NC', board: 'Normal Cerrado (carga)' }
      ],
      notes: [
        'La bobina del módulo va a 5V. El GPIO solo entra en IN. Si el módulo trae jumper JD-VCC, quítalo y alimenta la bobina aparte para aislar la placa de la carga.',
        'Casi todos conmutan al revés: LOW enciende el relé y HIGH lo apaga. El código generado ya usa esa lógica.',
        'NO cierra el circuito al activar; NC lo abre. COM es el común de la carga.',
        'En ESP32 y ESP8266 un relé de 5V a veces no dispara con 3.3V en IN. Usa un módulo compatible con 3.3V.',
        'Puede conmutar 110/230 V. No trabajes con red eléctrica si no tienes práctica, y no alimentes la carga desde la placa.'
      ]
    }
  },

  'bme280': {
    name: 'BME280',
    icon: '🌫️',
    type: 'sensor',
    category: 'Temperatura, Humedad y Presión',
    interface: 'I2C',
    address: '0x76 ó 0x77',
    description: 'Sensor ambiental completo: temperatura, humedad relativa y presión barométrica',
    library: 'Adafruit BME280',
    includes: ['Adafruit_BME280.h'],
    globalVars: 'Adafruit_BME280 bme;',
    needsAdafruitSensor: true,
    pinDefines: [],
    setupCode: [
      '// Inicializar sensor BME280',
      'if (!bme.begin(0x76)) {',
      '  Serial.println(F("ERROR: No se encontró el BME280. Prueba dirección 0x77."));',
      '  while (1) delay(10);',
      '}',
      'Serial.println(F("✓ BME280 inicializado correctamente."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V' },
        { component: 'GND', board: 'GND' },
        { component: 'SDA', board: '{SDA}' },
        { component: 'SCL', board: '{SCL}' }
      ],
      notes: [
        'El chip es de 3.3V. En Arduino Uno usa un módulo con regulador.',
        'SDO a GND = 0x76; SDO a 3.3V = 0x77. No lo combines con un BMP280.',
        'En módulos de 6 pines, CSB debe ir a VCC para forzar el modo I2C.',
        'Algunos módulos vendidos como BME280 son en realidad BMP280 y no miden humedad. Si la humedad sale NaN, revisa el chip.'
      ]
    }
  },
  'dht11': {
    name: 'DHT11',
    icon: '💧',
    type: 'sensor',
    category: 'Temperatura y Humedad',
    interface: 'Digital',
    address: null,
    description: 'Sensor económico de temperatura y humedad relativa (1 cable de datos)',
    library: 'DHT sensor library (Adafruit)',
    includes: ['DHT.h'],
    globalVars: 'DHT dht(PIN_DHT, DHT11);',
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_DHT', valueKey: 'dhtPin' }],
    setupCode: [
      '// Inicializar sensor DHT11',
      'dht.begin();',
      'Serial.println(F("✓ DHT11 inicializado."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V ó 5V' },
        { component: 'GND', board: 'GND' },
        { component: 'DATA', board: '{DHT_PIN}' }
      ],
      notes: [
        'El módulo de 3 pines suele traer la pull-up. El sensor suelto necesita 4.7–10 kΩ entre DATA y VCC.',
        'No lo leas más de una vez cada 2 s: si no, devuelve NaN.',
        'Va mejor a 5V. La precisión es justa (±2 °C / ±5 %HR); para más detalle usa AHT20 o BME280.',
        'Evita GPIO0 y GPIO2 en ESP8266: si DATA está en LOW al encender, la placa no arranca.'
      ]
    }
  },
  'ds18b20': {
    name: 'DS18B20',
    icon: '🧊',
    type: 'sensor',
    category: 'Temperatura',
    interface: 'OneWire',
    address: null,
    description: 'Sonda de temperatura digital 1-Wire, ideal para líquidos y exterior',
    library: 'OneWire + DallasTemperature',
    includes: ['OneWire.h', 'DallasTemperature.h'],
    globalVars: [
      'OneWire oneWire(PIN_DS18);',
      'DallasTemperature ds18(&oneWire);'
    ],
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_DS18', valueKey: 'ds18Pin' }],
    setupCode: [
      '// Inicializar sensor DS18B20',
      'ds18.begin();',
      'Serial.println(F("✓ DS18B20 inicializado."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC (rojo)', board: '3.3V ó 5V' },
        { component: 'GND (negro)', board: 'GND' },
        { component: 'DATA (amarillo)', board: '{DS18_PIN}' }
      ],
      notes: [
        'Hace falta una resistencia de 4.7 kΩ entre DATA y VCC. Sin ella el bus 1-Wire no responde.',
        'Este código usa alimentación normal de 3 hilos, no el modo parásito de 2 hilos.',
        'En la sonda impermeable lo habitual es rojo = VCC, negro = GND y amarillo o blanco = DATA. Confírmalo con tu vendedor.',
        'Puedes poner varias sondas en el mismo pin. El sketch lee solo la primera (índice 0).'
      ]
    }
  },
  'hc-sr04': {
    name: 'HC-SR04',
    icon: '📡',
    type: 'sensor',
    category: 'Distancia',
    interface: 'Digital',
    address: null,
    description: 'Sensor ultrasónico de distancia (2–400 cm aprox.)',
    library: null,
    includes: [],
    globalVars: null,
    needsAdafruitSensor: false,
    pinDefines: [
      { name: 'PIN_TRIG', valueKey: 'trigPin' },
      { name: 'PIN_ECHO', valueKey: 'echoPin' }
    ],
    setupCode: [
      '// Configurar sensor ultrasónico HC-SR04',
      'pinMode(PIN_TRIG, OUTPUT);',
      'pinMode(PIN_ECHO, INPUT);',
      'digitalWrite(PIN_TRIG, LOW);',
      'Serial.println(F("✓ HC-SR04 configurado."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '5V' },
        { component: 'GND', board: 'GND' },
        { component: 'TRIG', board: '{TRIG_PIN}' },
        { component: 'ECHO', board: '{ECHO_PIN}' }
      ],
      notes: [
        'VCC a 5V. TRIG acepta 3.3V, pero ECHO sale a 5V. En ESP32/ESP8266 pon un divisor: 1 kΩ de ECHO al GPIO y 2 kΩ de ese GPIO a GND.',
        'Rango útil aproximado: 2–400 cm. Las superficies blandas o muy inclinadas no devuelven eco.',
        'El JSN-SR04T es la versión impermeable y se cablea igual (TRIG/ECHO).',
        'La medida bloquea el programa unos milisegundos. No la lances dentro de una rutina con tiempos muy justos.'
      ]
    }
  },
  'hc-sr501': {
    name: 'HC-SR501 (PIR)',
    icon: '👀',
    type: 'sensor',
    category: 'Movimiento',
    interface: 'Digital',
    address: null,
    description: 'Detector de movimiento por infrarrojos pasivo (PIR)',
    library: null,
    includes: [],
    globalVars: null,
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_PIR', valueKey: 'pirPin' }],
    setupCode: [
      '// Configurar sensor PIR HC-SR501',
      'pinMode(PIN_PIR, INPUT);',
      'Serial.println(F("✓ PIR HC-SR501 configurado."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '5V (ó 3.3V según módulo)' },
        { component: 'GND', board: 'GND' },
        { component: 'OUT', board: '{PIR_PIN}' }
      ],
      notes: [
        'El HC-SR501 se alimenta a 5V y su salida HIGH ronda 3.3V, así que es compatible con ESP. El AM312, más pequeño, va a 3.3V.',
        'Al dar corriente espera 30–60 s: durante el arranque dispara en falso.',
        'Un potenciómetro ajusta la sensibilidad y el otro cuánto tiempo permanece OUT en HIGH. El jumper H re-dispara; L dispara una sola vez.',
        'No lo apuntes al sol, a un radiador ni a una corriente de aire caliente.'
      ]
    }
  },
  'soil-moisture': {
    name: 'Humedad de Suelo',
    icon: '🌱',
    type: 'sensor',
    category: 'Humedad',
    interface: 'Analog',
    address: null,
    description: 'Sensor analógico de humedad del suelo (higrometría)',
    library: null,
    includes: [],
    globalVars: null,
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_SUELO', valueKey: 'soilPin' }],
    setupCode: [
      '// Sensor de humedad de suelo (entrada analógica)',
      'Serial.println(F("✓ Sensor de humedad de suelo listo."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V ó 5V' },
        { component: 'GND', board: 'GND' },
        { component: 'A0 / AO', board: '{SOIL_PIN}' }
      ],
      notes: [
        'Anota el valor en seco y en agua y ajusta los umbrales del código: cada módulo y cada suelo leen distinto.',
        'Las sondas resistivas se corroen en la tierra. Una capacitiva dura más y no electroliza el suelo.',
        'En ESP8266, A0 solo admite 0–1 V. No conectes una salida de 3.3V directa.',
        'En ESP32 usa un pin ADC1 (GPIO32–39). El ADC2 deja de medir en cuanto el WiFi está encendido.',
        'En placas con un solo ADC (NodeMCU) no lo combines con el micrófono.'
      ]
    }
  },
  'max4466': {
    name: 'GY-MAX4466 (Mic)',
    icon: '🎤',
    type: 'sensor',
    category: 'Audio',
    interface: 'Analog',
    address: null,
    description: 'Módulo micrófono electret con amplificador y ganancia ajustable',
    library: null,
    includes: [],
    globalVars: null,
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_MIC', valueKey: 'micPin' }],
    setupCode: [
      '// Micrófono MAX4466 (entrada analógica)',
      'Serial.println(F("✓ Micrófono MAX4466 listo."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC', board: '3.3V ó 5V' },
        { component: 'GND', board: 'GND' },
        { component: 'OUT', board: '{MIC_PIN}' }
      ],
      notes: [
        'Aliméntalo a 3.3V si la placa es ESP. A 5V la salida puede superar el máximo del GPIO.',
        'En el ESP8266, A0 solo aguanta 0–1 V: no conectes OUT directo si el módulo sale a 1.65V o más.',
        'La señal está centrada en VCC/2. El código mide el pico respecto a ese centro, no un valor absoluto.',
        'Sube la ganancia hasta que el número cambie al hablar, sin quedarse clavado en el máximo del ADC.',
        'En NodeMCU comparte el único ADC con cualquier otro sensor analógico.'
      ]
    }
  },
  'sg90': {
    name: 'Servo SG90 / FS90R',
    icon: '🦾',
    type: 'actuator',
    category: 'Movimiento',
    interface: 'PWM',
    address: null,
    description: 'Microservo 9g (SG90 0–180°) o rotación continua (FS90R)',
    library: 'Servo (Arduino) / ESP32Servo (ESP32)',
    includes: ['Servo.h'],
    globalVars: 'Servo servoMotor;',
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_SERVO', valueKey: 'servoPin' }],
    setupCode: [
      '// Inicializar servo',
      'servoMotor.attach(PIN_SERVO);',
      'servoMotor.write(90); // posición central',
      'Serial.println(F("✓ Servo inicializado en pin {SERVO_PIN}."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC (rojo)', board: '5V (fuente externa si es posible)' },
        { component: 'GND (marrón/negro)', board: 'GND común' },
        { component: 'Signal (naranja/amarillo)', board: '{SERVO_PIN}' }
      ],
      notes: [
        'Alimenta el servo a 5V externos siempre que puedas, y une su GND con el de la placa.',
        'Un SG90 puede pedir 500–700 mA si se bloquea. El puerto USB no da para varios servos.',
        'En ESP32 instala la librería ESP32Servo: la API es la misma que Servo.h.',
        'El FS90R gira sin fin: 90 es paro y 0/180 son velocidad, no un ángulo.'
      ]
    }
  },
  'ws2812': {
    name: 'WS2812 / NeoPixel',
    icon: '🌈',
    type: 'actuator',
    category: 'Iluminación',
    interface: 'Digital',
    address: null,
    description: 'Tira o módulo LED RGB direccionable (WS2812B / NeoPixel)',
    library: 'Adafruit NeoPixel',
    includes: ['Adafruit_NeoPixel.h'],
    globalVars: [
      '#define NUM_LEDS 8',
      'Adafruit_NeoPixel strip(NUM_LEDS, PIN_LED, NEO_GRB + NEO_KHZ800);'
    ],
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_LED', valueKey: 'ledPin' }],
    setupCode: [
      '// Inicializar tira WS2812',
      'strip.begin();',
      'strip.setBrightness(40);',
      'strip.show();',
      'Serial.println(F("✓ WS2812 inicializado."));'
    ],
    wiring: {
      pins: [
        { component: 'VCC (5V)', board: '5V (fuente adecuada al amperaje)' },
        { component: 'GND', board: 'GND común' },
        { component: 'DIN / DATA', board: '{LED_PIN}' }
      ],
      notes: [
        '5V en VCC, GND común con la placa y DIN (no DOUT) al GPIO, con una resistencia de 330 Ω en serie.',
        'Un condensador de 470–1000 µF entre 5V y GND de la tira evita que la placa se reinicie al encender.',
        'Cuenta unos 60 mA por LED a brillo máximo. El código arranca al 16 % de brillo para no tumbar la fuente.',
        'Un GPIO de 3.3V a veces no excita bien el primer LED. Si los colores salen mal, añade un level shifter (74HCT125).'
      ]
    }
  },
  'water-pump': {
    name: 'Bomba de Agua 5V',
    icon: '🚿',
    type: 'actuator',
    category: 'Riego',
    interface: 'Digital',
    address: null,
    description: 'Microbomba sumergible 5V (controlar con MOSFET/relé, no directo al GPIO)',
    library: null,
    includes: [],
    globalVars: null,
    needsAdafruitSensor: false,
    pinDefines: [{ name: 'PIN_BOMBA', valueKey: 'pumpPin' }],
    setupCode: [
      '// Configurar control de bomba (vía MOSFET/relé)',
      'pinMode(PIN_BOMBA, OUTPUT);',
      'digitalWrite(PIN_BOMBA, LOW); // bomba apagada',
      'Serial.println(F("✓ Bomba configurada en pin {PUMP_PIN}."));'
    ],
    wiring: {
      pins: [
        { component: 'Señal MOSFET/Relé IN', board: '{PUMP_PIN}' },
        { component: 'Bomba +', board: '5V fuente' },
        { component: 'Bomba −', board: 'Drenador MOSFET / COM-NO relé' },
        { component: 'GND', board: 'GND común placa + fuente' }
      ],
      notes: [
        'No conectes la bomba a un GPIO. Usa un MOSFET de nivel lógico (IRLZ44N, no IRF540) o un relé, con GND común.',
        'El código enciende la bomba con HIGH. Un módulo relé de lógica invertida quedaría al revés: en ese caso usa el MOSFET o invierte el digitalWrite.',
        'Si el driver no trae diodo, pon uno en antiparalelo con la bomba. Alimenta la bomba con una fuente de 5V aparte.'
      ]
    }
  },
  'mb102': {
    name: 'Fuente MB102',
    icon: '🔋',
    type: 'accessory',
    category: 'Alimentación',
    interface: 'N/A',
    address: null,
    description: 'Módulo de alimentación para protoboard. Proporciona 3.3V y 5V estables.',
    library: null,
    includes: [],
    globalVars: null,
    needsAdafruitSensor: false,
    setupCode: [],
    wiring: {
      pins: [
        { component: 'Entrada DC', board: 'Fuente 6.5-12V (barrel jack)' },
        { component: 'Entrada USB', board: 'Cable Micro USB (5V)' },
        { component: 'Jumper canal A', board: 'Selecciona 3.3V o 5V' },
        { component: 'Jumper canal B', board: 'Selecciona 3.3V o 5V' },
        { component: 'Salida +', board: 'Línea + protoboard' },
        { component: 'Salida −', board: 'Línea − protoboard (GND)' }
      ],
      notes: [
        'El MB102 se conecta directamente sobre los raíles de la protoboard.',
        'Tiene dos canales independientes: cada uno configurable a 3.3V o 5V con jumpers.',
        'Entrada: 6.5V–12V DC (barrel jack) o USB (solo 5V).',
        'Corriente realista: unos 500–700 mA. No alimentes servos, tiras largas ni bombas desde aquí.',
        '¡Verifica la polaridad! Algunos clones tienen las marcas + y − invertidas.',
        'No requiere código: es un módulo de hardware puro para alimentación.'
      ]
    }
  }
};

// ==============================================
// DATA: Recommended Functions
// ==============================================
const FUNCTIONS = [
  {
    id: 'serial-temp-hum',
    name: 'Lectura de Temperatura y Humedad',
    icon: '🌡️',
    description: 'Lee y muestra temperatura y humedad por puerto serie',
    requiresAny: ['aht10', 'aht20'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer Temperatura y Humedad ───
void leerTemperaturaHumedad() {
  sensors_event_t humidity, temp;
  aht.getEvent(&humidity, &temp);
  Serial.print(F("Temperatura: "));
  Serial.print(temp.temperature);
  Serial.println(F(" °C"));
  Serial.print(F("Humedad: "));
  Serial.print(humidity.relative_humidity);
  Serial.println(F(" %"));
}`,
    loopCall: 'leerTemperaturaHumedad();'
  },
  {
    id: 'serial-pressure',
    name: 'Lectura de Presión y Altitud',
    icon: '🎯',
    description: 'Lee presión barométrica, temperatura y altitud por serie',
    requiresAny: ['bmp280'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer Presión Barométrica ───
void leerPresionAltitud() {
  Serial.print(F("Temperatura: "));
  Serial.print(bmp.readTemperature());
  Serial.println(F(" °C"));
  Serial.print(F("Presión: "));
  Serial.print(bmp.readPressure() / 100.0F);
  Serial.println(F(" hPa"));
  Serial.print(F("Altitud aprox: "));
  Serial.print(bmp.readAltitude(1013.25));
  Serial.println(F(" m"));
}`,
    loopCall: 'leerPresionAltitud();'
  },
  {
    id: 'serial-imu',
    name: 'Lectura de IMU (Orientación)',
    icon: '🧭',
    description: 'Lee acelerómetro, giroscopio y magnetómetro por serie',
    requiresAny: ['mpu9250'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer Orientación (MPU9250) ───
void leerOrientacion() {
  if (mpu.accelUpdate() == 0) {
    Serial.print(F("Accel  X:")); Serial.print(mpu.accelX(), 2);
    Serial.print(F("  Y:")); Serial.print(mpu.accelY(), 2);
    Serial.print(F("  Z:")); Serial.println(mpu.accelZ(), 2);
  }
  if (mpu.gyroUpdate() == 0) {
    Serial.print(F("Gyro   X:")); Serial.print(mpu.gyroX(), 2);
    Serial.print(F("  Y:")); Serial.print(mpu.gyroY(), 2);
    Serial.print(F("  Z:")); Serial.println(mpu.gyroZ(), 2);
  }
  if (mpu.magUpdate() == 0) {
    Serial.print(F("Mag    X:")); Serial.print(mpu.magX(), 2);
    Serial.print(F("  Y:")); Serial.print(mpu.magY(), 2);
    Serial.print(F("  Z:")); Serial.println(mpu.magZ(), 2);
  }
}`,
    loopCall: 'leerOrientacion();'
  },
  {
    id: 'display-sensors',
    name: 'Mostrar Datos en Pantalla OLED',
    icon: '📺',
    description: 'Muestra lecturas en la OLED. Con varios sensores se llena: usa Alternar pantallas',
    requiresAny: ['aht10', 'aht20', 'bmp280', 'bme280', 'mpu9250', 'dht11', 'ds18b20', 'hc-sr04', 'soil-moisture'],
    requiresAll: ['oled-ssd1306'],
    generateCode: (selComp) => {
      let lines = [];
      lines.push('// ─── Función: Mostrar Datos en OLED ───');
      lines.push('void mostrarDatosEnPantalla() {');
      lines.push('  display.clearDisplay();');
      lines.push('  display.setTextSize(1);');
      lines.push('  display.setCursor(0, 0);');

      if (selComp.includes('aht10') || selComp.includes('aht20')) {
        lines.push('');
        lines.push('  sensors_event_t humidity, temp;');
        lines.push('  aht.getEvent(&humidity, &temp);');
        lines.push('  display.print(F("Temp: "));');
        lines.push('  display.print(temp.temperature, 1);');
        lines.push('  display.println(F(" C"));');
        lines.push('  display.print(F("Hum:  "));');
        lines.push('  display.print(humidity.relative_humidity, 1);');
        lines.push('  display.println(F(" %"));');
      }

      if (selComp.includes('bmp280')) {
        lines.push('');
        lines.push('  display.print(F("Pres: "));');
        lines.push('  display.print(bmp.readPressure() / 100.0F, 1);');
        lines.push('  display.println(F(" hPa"));');
        lines.push('  display.print(F("Alt:  "));');
        lines.push('  display.print(bmp.readAltitude(1013.25), 1);');
        lines.push('  display.println(F(" m"));');
      }

      if (selComp.includes('mpu9250')) {
        lines.push('');
        lines.push('  mpu.accelUpdate();');
        lines.push('  display.print(F("Ax:"));');
        lines.push('  display.print(mpu.accelX(), 1);');
        lines.push('  display.print(F(" Ay:"));');
        lines.push('  display.println(mpu.accelY(), 1);');
      }

      if (selComp.includes('bme280')) {
        lines.push('');
        lines.push('  display.print(F("BME T:"));');
        lines.push('  display.print(bme.readTemperature(), 1);');
        lines.push('  display.println(F("C"));');
        lines.push('  display.print(F("Hum:"));');
        lines.push('  display.print(bme.readHumidity(), 1);');
        lines.push('  display.println(F("%"));');
      }

      if (selComp.includes('dht11')) {
        lines.push('');
        lines.push('  display.print(F("DHT T:"));');
        lines.push('  display.print(dht.readTemperature(), 1);');
        lines.push('  display.println(F("C"));');
        lines.push('  display.print(F("Hum:"));');
        lines.push('  display.print(dht.readHumidity(), 1);');
        lines.push('  display.println(F("%"));');
      }

      if (selComp.includes('ds18b20')) {
        lines.push('');
        lines.push('  ds18.requestTemperatures();');
        lines.push('  display.print(F("DS18:"));');
        lines.push('  display.print(ds18.getTempCByIndex(0), 1);');
        lines.push('  display.println(F("C"));');
      }

      if (selComp.includes('hc-sr04')) {
        lines.push('');
        lines.push('  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);');
        lines.push('  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);');
        lines.push('  digitalWrite(PIN_TRIG, LOW);');
        lines.push('  float d = pulseIn(PIN_ECHO, HIGH, 30000UL) * 0.01715;');
        lines.push('  display.print(F("Dist:"));');
        lines.push('  display.print(d, 1);');
        lines.push('  display.println(F("cm"));');
      }

      if (selComp.includes('soil-moisture')) {
        lines.push('');
        lines.push('  display.print(F("Suelo:"));');
        lines.push('  display.println(analogRead(PIN_SUELO));');
      }

      lines.push('');
      lines.push('  display.display();');
      lines.push('}');
      return lines.join('\n');
    },
    loopCall: 'mostrarDatosEnPantalla();'
  },
  {
    id: 'i2c-scan',
    name: 'Escáner I2C y Validación',
    icon: '🔎',
    description: 'Detecta dispositivos I2C conectados y comprueba las direcciones del bus',
    requiresAny: ['aht10', 'aht20', 'bmp280', 'bme280', 'mpu9250', 'oled-ssd1306'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Escáner I2C ───
void escanearI2C() {
  byte error, address;
  int dispositivos = 0;

  Serial.println(F("Escaneando bus I2C..."));
  for (address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print(F("Dispositivo encontrado en 0x"));
      if (address < 16) Serial.print('0');
      Serial.println(address, HEX);
      dispositivos++;
    }
  }

  if (dispositivos == 0) {
    Serial.println(F("No se detectaron dispositivos I2C."));
  } else {
    Serial.print(F("Total de dispositivos I2C: "));
    Serial.println(dispositivos);
  }
}`,
    setupCall: 'escanearI2C();'
  },
  {
    id: 'button-debounce',
    name: 'Pulsación de Botón con Debounce',
    icon: '🔘',
    description: 'Detecta pulsaciones del botón con filtro anti-rebote',
    requiresAny: ['button'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer Botón con Debounce ───
bool leerBoton() {
  static unsigned long ultimoDebounce = 0;
  static bool ultimoEstado = HIGH;
  static bool estadoBoton = HIGH;
  const unsigned long DEBOUNCE_MS = 50;

  bool lectura = digitalRead(PIN_BOTON);

  if (lectura != ultimoEstado) {
    ultimoDebounce = millis();
  }

  if ((millis() - ultimoDebounce) > DEBOUNCE_MS) {
    if (lectura != estadoBoton) {
      estadoBoton = lectura;
      if (estadoBoton == LOW) {
        Serial.println(F("Botón pulsado."));
        return true;
      }
    }
  }

  ultimoEstado = lectura;
  return false;
}`,
    loopCall: 'leerBoton();'
  },
  {
    id: 'toggle-display',
    name: 'Alternar Pantallas con Botón',
    icon: '🔄',
    description: 'Usa el botón para cambiar entre pantallas de datos en el OLED',
    requiresAny: ['aht10', 'aht20', 'bmp280', 'bme280', 'mpu9250', 'dht11', 'ds18b20', 'hc-sr04', 'soil-moisture'],
    requiresAll: ['button', 'oled-ssd1306'],
    generateCode: (selComp) => {
      let modes = [];
      let caseCode = '';

      if (selComp.includes('aht10') || selComp.includes('aht20')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      {\n`;
        caseCode += `        sensors_event_t h, t;\n`;
        caseCode += `        aht.getEvent(&h, &t);\n`;
        caseCode += `        display.println(F("== Temp & Hum =="));\n`;
        caseCode += `        display.println();\n`;
        caseCode += `        display.print(F("Temp: "));\n`;
        caseCode += `        display.print(t.temperature, 1);\n`;
        caseCode += `        display.println(F(" C"));\n`;
        caseCode += `        display.println();\n`;
        caseCode += `        display.print(F("Hum:  "));\n`;
        caseCode += `        display.print(h.relative_humidity, 1);\n`;
        caseCode += `        display.println(F(" %"));\n`;
        caseCode += `      }\n`;
        caseCode += `      break;\n`;
        modes.push('Temp/Hum');
      }

      if (selComp.includes('bmp280')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      display.println(F("== Barometro =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(F("Pres: "));\n`;
        caseCode += `      display.print(bmp.readPressure() / 100.0F, 1);\n`;
        caseCode += `      display.println(F(" hPa"));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(F("Alt:  "));\n`;
        caseCode += `      display.print(bmp.readAltitude(1013.25), 1);\n`;
        caseCode += `      display.println(F(" m"));\n`;
        caseCode += `      break;\n`;
        modes.push('Presión');
      }

      if (selComp.includes('mpu9250')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      display.println(F("== IMU =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      mpu.accelUpdate();\n`;
        caseCode += `      display.print(F("Ax: "));\n`;
        caseCode += `      display.println(mpu.accelX(), 2);\n`;
        caseCode += `      display.print(F("Ay: "));\n`;
        caseCode += `      display.println(mpu.accelY(), 2);\n`;
        caseCode += `      display.print(F("Az: "));\n`;
        caseCode += `      display.println(mpu.accelZ(), 2);\n`;
        caseCode += `      break;\n`;
        modes.push('IMU');
      }

      if (selComp.includes('bme280')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      display.println(F("== BME280 =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(F("Temp: "));\n`;
        caseCode += `      display.print(bme.readTemperature(), 1);\n`;
        caseCode += `      display.println(F(" C"));\n`;
        caseCode += `      display.print(F("Hum:  "));\n`;
        caseCode += `      display.print(bme.readHumidity(), 1);\n`;
        caseCode += `      display.println(F(" %"));\n`;
        caseCode += `      display.print(F("Pres: "));\n`;
        caseCode += `      display.print(bme.readPressure() / 100.0F, 1);\n`;
        caseCode += `      display.println(F(" hPa"));\n`;
        caseCode += `      break;\n`;
        modes.push('BME280');
      }

      if (selComp.includes('dht11')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      display.println(F("== DHT11 =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(F("Temp: "));\n`;
        caseCode += `      display.print(dht.readTemperature(), 1);\n`;
        caseCode += `      display.println(F(" C"));\n`;
        caseCode += `      display.print(F("Hum:  "));\n`;
        caseCode += `      display.print(dht.readHumidity(), 1);\n`;
        caseCode += `      display.println(F(" %"));\n`;
        caseCode += `      break;\n`;
        modes.push('DHT11');
      }

      if (selComp.includes('ds18b20')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      ds18.requestTemperatures();\n`;
        caseCode += `      display.println(F("== DS18B20 =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(F("Temp: "));\n`;
        caseCode += `      display.print(ds18.getTempCByIndex(0), 1);\n`;
        caseCode += `      display.println(F(" C"));\n`;
        caseCode += `      break;\n`;
        modes.push('DS18B20');
      }

      if (selComp.includes('hc-sr04')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);\n`;
        caseCode += `      digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);\n`;
        caseCode += `      digitalWrite(PIN_TRIG, LOW);\n`;
        caseCode += `      display.println(F("== Distancia =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(pulseIn(PIN_ECHO, HIGH, 30000UL) * 0.01715, 1);\n`;
        caseCode += `      display.println(F(" cm"));\n`;
        caseCode += `      break;\n`;
        modes.push('Distancia');
      }

      if (selComp.includes('soil-moisture')) {
        caseCode += `    case ${modes.length}:\n`;
        caseCode += `      display.println(F("== Suelo =="));\n`;
        caseCode += `      display.println();\n`;
        caseCode += `      display.print(F("Raw: "));\n`;
        caseCode += `      display.println(analogRead(PIN_SUELO));\n`;
        caseCode += `      break;\n`;
        modes.push('Suelo');
      }

      const totalModes = modes.length || 1;

      return `// ─── Variables de Modo de Visualización ───
int modoActual = 0;
const int TOTAL_MODOS = ${totalModes};

// ─── Función: Alternar Modo con Botón ───
void alternarModo() {
  static unsigned long ultimoDebounce = 0;
  static bool ultimoEstado = HIGH;
  static bool estadoBoton = HIGH;

  bool lectura = digitalRead(PIN_BOTON);

  if (lectura != ultimoEstado) {
    ultimoDebounce = millis();
  }

  if ((millis() - ultimoDebounce) > 50) {
    if (lectura != estadoBoton) {
      estadoBoton = lectura;
      if (estadoBoton == LOW) {
        modoActual = (modoActual + 1) % TOTAL_MODOS;
        Serial.print(F("Modo: "));
        Serial.println(modoActual);
      }
    }
  }
  ultimoEstado = lectura;
}

void mostrarModoActual() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);

  switch (modoActual) {
${caseCode}  }

  // Indicador de modo
  display.setCursor(0, 56);
  display.print(F("Modo "));
  display.print(modoActual + 1);
  display.print(F("/"));
  display.print(TOTAL_MODOS);
  display.display();
}`;
    },
    loopCall: 'alternarModo();\n  mostrarModoActual();'
  },
  {
    id: 'csv-logger',
    name: 'Registro de Datos CSV (Serie)',
    icon: '📊',
    description: 'Envía datos de sensores en formato CSV por puerto serie para análisis',
    requiresAny: ['aht10', 'aht20', 'bmp280', 'bme280', 'mpu9250', 'dht11', 'ds18b20', 'hc-sr04', 'soil-moisture'],
    requiresAll: [],
    generateCode: (selComp) => {
      let headers = ['millis'];
      let printLines = ['  Serial.print(millis());'];

      if (selComp.includes('aht10') || selComp.includes('aht20')) {
        headers.push('temp_C', 'hum_%');
      }
      if (selComp.includes('bmp280')) {
        headers.push('presion_hPa', 'altitud_m');
      }
      if (selComp.includes('mpu9250')) {
        headers.push('accelX', 'accelY', 'accelZ');
      }
      if (selComp.includes('bme280')) {
        headers.push('bme_temp_C', 'bme_hum_%', 'bme_pres_hPa');
      }
      if (selComp.includes('dht11')) {
        headers.push('dht_temp_C', 'dht_hum_%');
      }
      if (selComp.includes('ds18b20')) {
        headers.push('ds18_temp_C');
      }
      if (selComp.includes('hc-sr04')) {
        headers.push('dist_cm');
      }
      if (selComp.includes('soil-moisture')) {
        headers.push('soil_raw');
      }

      let readBlock = '';
      let dataPrints = [];

      if (selComp.includes('aht10') || selComp.includes('aht20')) {
        readBlock += '  sensors_event_t humidity, temp;\n';
        readBlock += '  aht.getEvent(&humidity, &temp);\n';
        dataPrints.push('  Serial.print(F(",")); Serial.print(temp.temperature);');
        dataPrints.push('  Serial.print(F(",")); Serial.print(humidity.relative_humidity);');
      }
      if (selComp.includes('bmp280')) {
        dataPrints.push('  Serial.print(F(",")); Serial.print(bmp.readPressure() / 100.0F);');
        dataPrints.push('  Serial.print(F(",")); Serial.print(bmp.readAltitude(1013.25));');
      }
      if (selComp.includes('mpu9250')) {
        readBlock += '  mpu.accelUpdate();\n';
        dataPrints.push('  Serial.print(F(",")); Serial.print(mpu.accelX());');
        dataPrints.push('  Serial.print(F(",")); Serial.print(mpu.accelY());');
        dataPrints.push('  Serial.print(F(",")); Serial.print(mpu.accelZ());');
      }
      if (selComp.includes('bme280')) {
        dataPrints.push('  Serial.print(F(",")); Serial.print(bme.readTemperature());');
        dataPrints.push('  Serial.print(F(",")); Serial.print(bme.readHumidity());');
        dataPrints.push('  Serial.print(F(",")); Serial.print(bme.readPressure() / 100.0F);');
      }
      if (selComp.includes('dht11')) {
        dataPrints.push('  Serial.print(F(",")); Serial.print(dht.readTemperature());');
        dataPrints.push('  Serial.print(F(",")); Serial.print(dht.readHumidity());');
      }
      if (selComp.includes('ds18b20')) {
        readBlock += '  ds18.requestTemperatures();\n';
        dataPrints.push('  Serial.print(F(",")); Serial.print(ds18.getTempCByIndex(0));');
      }
      if (selComp.includes('hc-sr04')) {
        readBlock += '  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);\n';
        readBlock += '  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);\n';
        readBlock += '  digitalWrite(PIN_TRIG, LOW);\n';
        readBlock += '  float distCm = pulseIn(PIN_ECHO, HIGH, 30000UL) * 0.01715;\n';
        dataPrints.push('  Serial.print(F(",")); Serial.print(distCm);');
      }
      if (selComp.includes('soil-moisture')) {
        dataPrints.push('  Serial.print(F(",")); Serial.print(analogRead(PIN_SUELO));');
      }

      const headerStr = headers.join(',');

      return `// ─── Función: Registro CSV por Puerto Serie ───
bool csvCabeceraEnviada = false;

void registrarDatosCSV() {
  if (!csvCabeceraEnviada) {
    Serial.println(F("${headerStr}"));
    csvCabeceraEnviada = true;
  }

${readBlock}  Serial.print(millis());
${dataPrints.join('\n')}
  Serial.println();
}`;
    },
    loopCall: 'registrarDatosCSV();'
  },
  {
    id: 'relay-control',
    name: 'Control de Relé por Serie',
    icon: '🔌',
    description: 'Activa con 1, apaga con 0 y consulta con ? por el monitor serie',
    requiresAny: ['relay'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Control de Relé por Serie ───
bool releActivo = false;

void controlarRelePorSerie() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    if (cmd == '1' || cmd == 'e') {
      digitalWrite(PIN_RELE, LOW); // Activar (lógica invertida)
      releActivo = true;
      Serial.println(F("Relé ACTIVADO"));
    } else if (cmd == '0' || cmd == 'a') {
      digitalWrite(PIN_RELE, HIGH); // Desactivar
      releActivo = false;
      Serial.println(F("Relé DESACTIVADO"));
    } else if (cmd == '?') {
      Serial.print(F("Estado del relé: "));
      Serial.println(releActivo ? F("ACTIVADO") : F("DESACTIVADO"));
    }
  }
}`,
    loopCall: 'controlarRelePorSerie();'
  },
  {
    id: 'relay-toggle-button',
    name: 'Relé Toggle con Botón',
    icon: '🔘',
    description: 'Usa el botón para activar/desactivar el relé con cada pulsación',
    requiresAny: [],
    requiresAll: ['relay', 'button'],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Toggle Relé con Botón ───
bool releEncendido = false;

void toggleReleConBoton() {
  static unsigned long ultimoDebounce = 0;
  static bool ultimoEstado = HIGH;
  static bool estadoBoton = HIGH;

  bool lectura = digitalRead(PIN_BOTON);

  if (lectura != ultimoEstado) {
    ultimoDebounce = millis();
  }

  if ((millis() - ultimoDebounce) > 50) {
    if (lectura != estadoBoton) {
      estadoBoton = lectura;
      if (estadoBoton == LOW) {
        releEncendido = !releEncendido;
        digitalWrite(PIN_RELE, releEncendido ? LOW : HIGH);
        Serial.print(F("Relé: "));
        Serial.println(releEncendido ? F("ACTIVADO") : F("DESACTIVADO"));
      }
    }
  }
  ultimoEstado = lectura;
}`,
    loopCall: 'toggleReleConBoton();'
  },
  {
    id: 'relay-timed',
    name: 'Relé Temporizado',
    icon: '⏱️',
    description: 'Envía t por el monitor serie para encender el relé durante unos segundos',
    requiresAny: ['relay'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Relé Temporizado ───
const unsigned long DURACION_RELE = 5000;  // ms — Modifica este valor
unsigned long releInicioMs = 0;
bool releTemporizado = false;

void releTemporizar() {
  // Envía 't' por serie para activar el temporizador
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    if (cmd == 't') {
      digitalWrite(PIN_RELE, LOW); // Activar
      releInicioMs = millis();
      releTemporizado = true;
      Serial.print(F("Relé activado por "));
      Serial.print(DURACION_RELE / 1000);
      Serial.println(F(" segundos"));
    }
  }

  // Desactivar cuando se cumpla el tiempo
  if (releTemporizado && (millis() - releInicioMs >= DURACION_RELE)) {
    digitalWrite(PIN_RELE, HIGH); // Desactivar
    releTemporizado = false;
    Serial.println(F("Relé desactivado (tiempo cumplido)"));
  }
}`,
    loopCall: 'releTemporizar();'
  },

  {
    id: 'serial-bme280',
    name: 'Lectura BME280 (Temp/Hum/Presión)',
    icon: '🌫️',
    description: 'Lee temperatura, humedad y presión del BME280 por puerto serie',
    requiresAny: ['bme280'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer BME280 ───
void leerBME280() {
  Serial.print(F("Temp: "));
  Serial.print(bme.readTemperature());
  Serial.println(F(" °C"));
  Serial.print(F("Hum:  "));
  Serial.print(bme.readHumidity());
  Serial.println(F(" %"));
  Serial.print(F("Pres: "));
  Serial.print(bme.readPressure() / 100.0F);
  Serial.println(F(" hPa"));
}`,
    loopCall: 'leerBME280();'
  },
  {
    id: 'serial-dht11',
    name: 'Lectura DHT11',
    icon: '💧',
    description: 'Lee temperatura y humedad del DHT11 por puerto serie',
    requiresAny: ['dht11'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer DHT11 ───
void leerDHT11() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    Serial.println(F("ERROR: lectura DHT11 fallida"));
    return;
  }
  Serial.print(F("Temp: "));
  Serial.print(t);
  Serial.println(F(" °C"));
  Serial.print(F("Hum:  "));
  Serial.print(h);
  Serial.println(F(" %"));
}`,
    loopCall: 'leerDHT11();'
  },
  {
    id: 'serial-ds18b20',
    name: 'Lectura DS18B20',
    icon: '🧊',
    description: 'Lee la temperatura de la sonda DS18B20 por puerto serie',
    requiresAny: ['ds18b20'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Leer DS18B20 ───
void leerDS18B20() {
  ds18.requestTemperatures();
  float t = ds18.getTempCByIndex(0);
  if (t == DEVICE_DISCONNECTED_C) {
    Serial.println(F("ERROR: DS18B20 no responde"));
    return;
  }
  Serial.print(F("Temp DS18B20: "));
  Serial.print(t);
  Serial.println(F(" °C"));
}`,
    loopCall: 'leerDS18B20();'
  },
  {
    id: 'serial-distance',
    name: 'Medir Distancia (HC-SR04)',
    icon: '📡',
    description: 'Mide distancia en cm con el sensor ultrasónico',
    requiresAny: ['hc-sr04'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Medir Distancia ───
float medirDistanciaCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  unsigned long duracion = pulseIn(PIN_ECHO, HIGH, 30000UL);
  if (duracion == 0) return -1.0;
  return (duracion * 0.0343) / 2.0;
}

void leerDistancia() {
  float cm = medirDistanciaCm();
  if (cm < 0) {
    Serial.println(F("Sin eco (fuera de rango)"));
    return;
  }
  Serial.print(F("Distancia: "));
  Serial.print(cm, 1);
  Serial.println(F(" cm"));
}`,
    loopCall: 'leerDistancia();'
  },
  {
    id: 'pir-detect',
    name: 'Detección de Movimiento (PIR)',
    icon: '👀',
    description: 'Detecta movimiento con el HC-SR501 y lo muestra por serie',
    requiresAny: ['hc-sr501'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Detectar Movimiento PIR ───
void detectarMovimiento() {
  static bool ultimo = false;
  bool movimiento = digitalRead(PIN_PIR) == HIGH;
  if (movimiento != ultimo) {
    ultimo = movimiento;
    if (movimiento) {
      Serial.println(F("¡Movimiento detectado!"));
    } else {
      Serial.println(F("Sin movimiento"));
    }
  }
}`,
    loopCall: 'detectarMovimiento();'
  },
  {
    id: 'serial-soil',
    name: 'Lectura Humedad de Suelo',
    icon: '🌱',
    description: 'Lee el valor analógico del sensor de humedad de suelo',
    requiresAny: ['soil-moisture'],
    requiresAll: [],
    generateCode: (selComp, board) => {
      const cal = adcCalibration(board);
      return `// ─── Función: Leer Humedad de Suelo ───
void leerHumedadSuelo() {
  int raw = analogRead(PIN_SUELO);
  // ${cal.label}. Mide en seco y en agua y corrige SECO / HUMEDO.
  const int SECO = ${cal.dry};
  const int HUMEDO = ${cal.wet};
  int pct = map(constrain(raw, min(HUMEDO, SECO), max(HUMEDO, SECO)), SECO, HUMEDO, 0, 100);

  Serial.print(F("Suelo raw: "));
  Serial.print(raw);
  Serial.print(F("  ≈ "));
  Serial.print(pct);
  Serial.println(F(" % humedad"));
}`;
    },
    loopCall: 'leerHumedadSuelo();'
  },
  {
    id: 'serial-mic',
    name: 'Nivel de Sonido (MAX4466)',
    icon: '🎤',
    description: 'Mide el pico de sonido respecto al centro del ADC de tu placa',
    requiresAny: ['max4466'],
    requiresAll: [],
    generateCode: (selComp, board) => {
      const cal = adcCalibration(board);
      return `// ─── Función: Nivel de Sonido ───
void leerNivelSonido() {
  int pico = 0;
  const int CENTRO = ${cal.center}; // ${cal.label}
  unsigned long t0 = millis();
  while (millis() - t0 < 50) {
    int desv = abs(analogRead(PIN_MIC) - CENTRO);
    if (desv > pico) pico = desv;
  }
  Serial.print(F("Nivel sonido (pico): "));
  Serial.println(pico);
}`;
    },
    loopCall: 'leerNivelSonido();'
  },
  {
    id: 'servo-sweep',
    name: 'Barrido de Servo',
    icon: '🦾',
    description: 'Barrido suave 0–180°. En un FS90R eso es velocidad, no posición',
    requiresAny: ['sg90'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Barrido de Servo ───
void barridoServo() {
  static int angulo = 0;
  static int paso = 2;
  static unsigned long ultimo = 0;
  if (millis() - ultimo < 20) return;
  ultimo = millis();

  angulo += paso;
  if (angulo >= 180 || angulo <= 0) paso = -paso;
  servoMotor.write(constrain(angulo, 0, 180));
}`,
    loopCall: 'barridoServo();'
  },
  {
    id: 'servo-serial',
    name: 'Servo por Comando Serie',
    icon: '🎛️',
    description: 'Escribe un ángulo de 0 a 180 en el monitor serie y pulsa Enter',
    requiresAny: ['sg90'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Control Servo por Serie ───
void controlarServoPorSerie() {
  if (Serial.available() > 0) {
    int angulo = Serial.parseInt();
    angulo = constrain(angulo, 0, 180);
    servoMotor.write(angulo);
    Serial.print(F("Servo -> "));
    Serial.print(angulo);
    Serial.println(F("°"));
  }
}`,
    loopCall: 'controlarServoPorSerie();'
  },
  {
    id: 'ws2812-rainbow',
    name: 'Arcoíris WS2812',
    icon: '🌈',
    description: 'Efecto arcoíris simple en la tira WS2812',
    requiresAny: ['ws2812'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Arcoíris WS2812 ───
uint32_t colorRueda(byte pos) {
  pos = 255 - pos;
  if (pos < 85) return strip.Color(255 - pos * 3, 0, pos * 3);
  if (pos < 170) {
    pos -= 85;
    return strip.Color(0, pos * 3, 255 - pos * 3);
  }
  pos -= 170;
  return strip.Color(pos * 3, 255 - pos * 3, 0);
}

void efectoArcoiris() {
  static uint16_t j = 0;
  static unsigned long ultimo = 0;
  if (millis() - ultimo < 30) return;
  ultimo = millis();
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, colorRueda((i * 256 / strip.numPixels() + j) & 255));
  }
  strip.show();
  j++;
}`,
    loopCall: 'efectoArcoiris();'
  },
  {
    id: 'ws2812-solid',
    name: 'Color Fijo WS2812',
    icon: '💡',
    description: 'Enciende toda la tira en un color RGB configurable',
    requiresAny: ['ws2812'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Color Fijo WS2812 ───
void colorFijoWS2812() {
  // Modifica R, G, B (0–255)
  uint32_t color = strip.Color(0, 80, 255);
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, color);
  }
  strip.show();
}`,
    loopCall: 'colorFijoWS2812();'
  },
  {
    id: 'pump-timed',
    name: 'Bomba Temporizada',
    icon: '⏱️',
    description: 'Activa la bomba unos segundos al enviar "b" por el monitor serie',
    requiresAny: ['water-pump'],
    requiresAll: [],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Bomba Temporizada ───
const unsigned long DURACION_BOMBA = 5000; // ms
unsigned long bombaInicioMs = 0;
bool bombaActiva = false;

void bombaTemporizar() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    if (cmd == 'b') {
      digitalWrite(PIN_BOMBA, HIGH);
      bombaInicioMs = millis();
      bombaActiva = true;
      Serial.println(F("Bomba ON"));
    }
  }
  if (bombaActiva && (millis() - bombaInicioMs >= DURACION_BOMBA)) {
    digitalWrite(PIN_BOMBA, LOW);
    bombaActiva = false;
    Serial.println(F("Bomba OFF (tiempo cumplido)"));
  }
}`,
    loopCall: 'bombaTemporizar();'
  },
  {
    id: 'auto-irrigation',
    name: 'Riego Automático',
    icon: '🌿',
    description: 'Riega unos segundos si el suelo supera el umbral de sequedad de tu placa',
    requiresAny: [],
    requiresAll: ['soil-moisture', 'water-pump'],
    generateCode: (selComp, board) => {
      const cal = adcCalibration(board);
      return `// ─── Función: Riego Automático ───
const int UMBRAL_SECO = ${cal.dry}; // ${cal.label}. Sube este valor si riega demasiado
const unsigned long RIEGO_MS = 4000;

void riegoAutomatico() {
  static unsigned long riegoHasta = 0;
  int raw = analogRead(PIN_SUELO);

  if (millis() < riegoHasta) {
    digitalWrite(PIN_BOMBA, HIGH);
    return;
  }
  digitalWrite(PIN_BOMBA, LOW);

  if (raw > UMBRAL_SECO) {
    Serial.print(F("Suelo seco ("));
    Serial.print(raw);
    Serial.println(F("). Regando..."));
    digitalWrite(PIN_BOMBA, HIGH);
    riegoHasta = millis() + RIEGO_MS;
  } else {
    Serial.print(F("Suelo OK ("));
    Serial.print(raw);
    Serial.println(F(")"));
  }
}`;
    },
    loopCall: 'riegoAutomatico();'
  },
  {
    id: 'motion-light',
    name: 'Luz por Movimiento',
    icon: '🚨',
    description: 'Enciende LEDs WS2812 cuando el PIR detecta movimiento',
    requiresAny: [],
    requiresAll: ['hc-sr501', 'ws2812'],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Luz por Movimiento ───
const unsigned long LUZ_MS = 8000;
unsigned long luzHasta = 0;

void luzPorMovimiento() {
  if (digitalRead(PIN_PIR) == HIGH) {
    luzHasta = millis() + LUZ_MS;
  }

  bool encender = millis() < luzHasta;
  uint32_t color = encender ? strip.Color(255, 180, 40) : strip.Color(0, 0, 0);
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i, color);
  }
  strip.show();
}`,
    loopCall: 'luzPorMovimiento();'
  },
  {
    id: 'distance-alert',
    name: 'Alerta de Proximidad',
    icon: '⚠️',
    description: 'Avisa por serie cuando un objeto está más cerca del umbral',
    requiresAny: ['hc-sr04'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Alerta de Proximidad ───
const float DIST_UMBRAL_CM = 20.0;

void alertaProximidad() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  unsigned long duracion = pulseIn(PIN_ECHO, HIGH, 30000UL);
  if (duracion == 0) return;
  float cm = (duracion * 0.0343) / 2.0;
  if (cm < DIST_UMBRAL_CM) {
    Serial.print(F("⚠ Objeto cerca: "));
    Serial.print(cm, 1);
    Serial.println(F(" cm"));
  }
}`,
    loopCall: 'alertaProximidad();'
  },
  {
    id: 'temp-alert-multi',
    name: 'Alerta de Temperatura',
    icon: '🔔',
    description: 'Avisa por serie si la temperatura supera el umbral (AHT, BME, BMP, DHT o DS18)',
    requiresAny: ['aht10', 'aht20', 'dht11', 'ds18b20', 'bme280', 'bmp280'],
    requiresAll: [],
    generateCode: (selComp) => {
      let body = '';
      if (selComp.includes('aht10') || selComp.includes('aht20')) {
        body += `  sensors_event_t humidity, temp;\n  aht.getEvent(&humidity, &temp);\n  float t = temp.temperature;\n`;
      } else if (selComp.includes('bme280')) {
        body += `  float t = bme.readTemperature();\n`;
      } else if (selComp.includes('bmp280')) {
        body += `  float t = bmp.readTemperature();\n`;
      } else if (selComp.includes('dht11')) {
        body += `  float t = dht.readTemperature();\n  if (isnan(t)) return;\n`;
      } else if (selComp.includes('ds18b20')) {
        body += `  ds18.requestTemperatures();\n  float t = ds18.getTempCByIndex(0);\n  if (t == DEVICE_DISCONNECTED_C) return;\n`;
      } else {
        body += `  float t = 0;\n`;
      }
      return `// ─── Función: Alerta de Temperatura ───
const float TEMP_UMBRAL = 30.0;  // °C

void alertaTemperaturaMulti() {
${body}  if (t > TEMP_UMBRAL) {
    Serial.print(F("⚠ Temperatura alta: "));
    Serial.print(t);
    Serial.println(F(" °C"));
  }
}`;
    },
    loopCall: 'alertaTemperaturaMulti();'
  },
  {
    id: 'thermostat',
    name: 'Termostato con Relé',
    icon: '🌡️',
    description: 'Enciende el relé si la temperatura supera el umbral y lo apaga al bajar',
    requiresAny: ['aht10', 'aht20', 'bme280', 'bmp280', 'dht11', 'ds18b20'],
    requiresAll: ['relay'],
    generateCode: (selComp) => {
      let read = '  float t = 0;\n';
      if (selComp.includes('aht10') || selComp.includes('aht20')) {
        read = '  sensors_event_t humidity, temp;\n  aht.getEvent(&humidity, &temp);\n  float t = temp.temperature;\n';
      } else if (selComp.includes('bme280')) {
        read = '  float t = bme.readTemperature();\n';
      } else if (selComp.includes('bmp280')) {
        read = '  float t = bmp.readTemperature();\n';
      } else if (selComp.includes('dht11')) {
        read = '  float t = dht.readTemperature();\n  if (isnan(t)) return;\n';
      } else if (selComp.includes('ds18b20')) {
        read = '  ds18.requestTemperatures();\n  float t = ds18.getTempCByIndex(0);\n  if (t == DEVICE_DISCONNECTED_C) return;\n';
      }
      return `// ─── Función: Termostato ───
const float TEMP_ON = 28.0;   // enciende el relé por encima de este valor
const float TEMP_OFF = 26.0;  // lo apaga por debajo (histéresis)

void termostato() {
${read}  if (t >= TEMP_ON) {
    digitalWrite(PIN_RELE, LOW); // lógica invertida del módulo
    Serial.print(F("Termostato ON "));
    Serial.println(t);
  } else if (t <= TEMP_OFF) {
    digitalWrite(PIN_RELE, HIGH);
    Serial.print(F("Termostato OFF "));
    Serial.println(t);
  }
}`;
    },
    loopCall: 'termostato();'
  },
  {
    id: 'motion-relay',
    name: 'Relé por Movimiento',
    icon: '👀',
    description: 'Activa el relé mientras el PIR detecta movimiento y lo suelta al acabar',
    requiresAny: [],
    requiresAll: ['hc-sr501', 'relay'],
    runEveryLoop: true,
    generateCode: () =>
`// ─── Función: Relé por Movimiento ───
void relePorMovimiento() {
  bool movimiento = digitalRead(PIN_PIR) == HIGH;
  digitalWrite(PIN_RELE, movimiento ? LOW : HIGH);
}`,
    loopCall: 'relePorMovimiento();'
  },
  {
    id: 'soil-dry-alert',
    name: 'Aviso de Suelo Seco',
    icon: '🏜️',
    description: 'Avisa por serie cuando la lectura indica suelo más seco que el umbral',
    requiresAny: ['soil-moisture'],
    requiresAll: [],
    generateCode: (selComp, board) => {
      const cal = adcCalibration(board);
      return `// ─── Función: Aviso de Suelo Seco ───
const int UMBRAL_SECO = ${cal.dry}; // ${cal.label}

void avisoSueloSeco() {
  int raw = analogRead(PIN_SUELO);
  if (raw > UMBRAL_SECO) {
    Serial.print(F("Suelo seco: "));
    Serial.println(raw);
  }
}`;
    },
    loopCall: 'avisoSueloSeco();'
  },

];


// ==============================================
// DATA: Open Source Projects
// ==============================================
const OPEN_SOURCE_PROJECTS = [
  {
    id: 'wled',
    name: 'WLED',
    icon: '💡',
    category: 'Iluminación',
    boards: ['ESP32', 'ESP8266'],
    description: 'Controla tiras LED direccionables (WS2812B, SK6812, APA102…) por WiFi con efectos, sincronización y app móvil. Ideal para ambientación, PC cases y proyectos DIY de luz.',
    materials: [
      'ESP32 o ESP8266 (NodeMCU / Wemos D1 Mini)',
      'Tira LED WS2812B o SK6812 (5V)',
      'Fuente de alimentación 5V adecuada al amperaje de la tira',
      'Cable de datos (GPIO recomendado: 2 o 16 en ESP32)',
      'Opcional: condensador 1000µF en la alimentación de la tira'
    ],
    tutorial: [
      'Descarga el instalador web o el binario desde kno.wled.ge e instálalo por USB en tu ESP.',
      'Al primer arranque, conéctate a la red WiFi «WLED-AP» (contraseña: wled1234).',
      'Abre 4.3.2.1 en el navegador, configura tu WiFi doméstico y reinicia.',
      'En LED Preferences, indica el tipo de LED, el GPIO de datos y el número de LEDs.',
      'Prueba efectos desde la UI web o la app WLED; usa un nivel de brillo bajo al probar.'
    ],
    references: [
      { label: 'Web oficial', url: 'https://kno.wled.ge/' },
      { label: 'GitHub', url: 'https://github.com/wled/WLED' },
      { label: 'Wiki', url: 'https://kno.wled.ge/basics/getting-started/' }
    ]
  },
  {
    id: 'tasmota',
    name: 'Tasmota',
    icon: '🔌',
    category: 'Domótica',
    boards: ['ESP32', 'ESP8266'],
    description: 'Firmware alternativo para enchufes, relés, sensores y módulos ESP. Se configura por web, habla MQTT y se integra fácilmente con Home Assistant, Node-RED y OpenHAB.',
    materials: [
      'ESP8266 (NodeMCU, Wemos) o ESP32',
      'Módulo relé, enchufe inteligente o sensores (DHT, DS18B20, etc.)',
      'Adaptador USB-TTL si flasheas un dispositivo comercial',
      'Broker MQTT (Mosquitto) opcional pero recomendado'
    ],
    tutorial: [
      'Flashea Tasmota con Tasmotizer o el instalador web (tasmota.github.io/install).',
      'Conéctate a la AP de Tasmota y entra en la configuración WiFi.',
      'En Configuration → Configure Module, elige la plantilla o asigna pines (relé, botón, LED).',
      'Configura MQTT (broker, topic, usuario) para automatizar desde Home Assistant.',
      'Usa la consola web o comandos MQTT (Power ON/OFF, Status) para verificar el dispositivo.'
    ],
    references: [
      { label: 'Documentación', url: 'https://tasmota.github.io/docs/' },
      { label: 'GitHub', url: 'https://github.com/arendst/Tasmota' },
      { label: 'Instalador web', url: 'https://tasmota.github.io/install/' }
    ]
  },
  {
    id: 'esphome',
    name: 'ESPHome',
    icon: '🏠',
    category: 'Domótica',
    boards: ['ESP32', 'ESP8266'],
    description: 'Defines sensores y actuadores en YAML; ESPHome genera el firmware, lo flashea y se integra nativamente con Home Assistant. Perfecto si prefieres configuración declarativa frente a programar en C++.',
    materials: [
      'ESP32 o ESP8266',
      'Sensores/actuadores soportados (BME280, AHT20, relé, display…)',
      'Home Assistant (add-on ESPHome) o ESPHome CLI en el PC',
      'Cable USB para el primer flasheo'
    ],
    tutorial: [
      'Instala el add-on ESPHome en Home Assistant o `pip install esphome` en tu PC.',
      'Crea un nuevo dispositivo y elige la placa; se genera un YAML base.',
      'Añade componentes en el YAML (sensor, switch, light…) con el bus y los pines.',
      'Compila y flashea por USB la primera vez; después puedes actualizar por OTA.',
      'Acepta el dispositivo en Home Assistant; las entidades aparecerán automáticamente.'
    ],
    references: [
      { label: 'Documentación', url: 'https://esphome.io/' },
      { label: 'GitHub', url: 'https://github.com/esphome/esphome' },
      { label: 'Sensores', url: 'https://esphome.io/components/' }
    ]
  },
  {
    id: 'meshtastic',
    name: 'Meshtastic',
    icon: '📡',
    category: 'Comunicaciones',
    boards: ['ESP32 LoRa', 'nRF52840'],
    description: 'Red mesh off-grid por LoRa: mensajes, GPS y telemetría sin Internet ni SIM. Muy útil con placas ESP32 + SX1276/SX1262 (Heltec, LilyGO T-Beam, TTGO).',
    materials: [
      'Placa ESP32 LoRa (Heltec WiFi LoRa 32, LilyGO T-Beam, TTGO LoRa)',
      'Antena LoRa adecuada a la frecuencia de tu región (EU868 / US915)',
      'Batería LiPo si usas T-Beam u outdoor',
      'App Meshtastic (Android/iOS) o cliente web/Python'
    ],
    tutorial: [
      'Flashea el firmware desde flasher.meshtastic.org eligiendo tu placa.',
      'Empareja el nodo por Bluetooth con la app Meshtastic.',
      'Configura región LoRa (EU_868 en Europa), canal y nombre del nodo.',
      'Activa GPS si tu placa lo tiene; verifica que la antena esté conectada antes de transmitir.',
      'Prueba mensajes entre dos nodos a distancia; ajusta hop limit y potencia según el uso.'
    ],
    references: [
      { label: 'Web oficial', url: 'https://meshtastic.org/' },
      { label: 'Docs', url: 'https://meshtastic.org/docs/' },
      { label: 'Flasher', url: 'https://flasher.meshtastic.org/' }
    ]
  },
  {
    id: 'marlin',
    name: 'Marlin Firmware',
    icon: '🖨️',
    category: 'CNC / Impresión 3D',
    boards: ['Arduino Mega', 'ESP32', 'STM32'],
    description: 'Firmware de referencia para impresoras 3D FDM. Gestiona motores paso a paso, calentadores, sensores de temperatura, endstops y pantalla. Base de casi todas las impresoras DIY.',
    materials: [
      'Placa controladora (RAMPS 1.4 + Mega, SKR, Creality board…)',
      'Drivers de motores (A4988, TMC2208/2209…)',
      'Motores NEMA 17, hotend, cama caliente, termistores',
      'Endstops o sensor de nivelado (BLTouch)',
      'Arduino IDE o PlatformIO para compilar'
    ],
    tutorial: [
      'Clona el repositorio Marlin y abre el proyecto en PlatformIO o Arduino IDE.',
      'Copia la carpeta de configuración de tu impresora desde Configurations o ajusta Configuration.h.',
      'Define placa (`MOTHERBOARD`), drivers, extrusores y sensores de temperatura.',
      'Compila y sube el firmware; verifica movimientos con G-code (G28, G1) desde el host.',
      'Calibra pasos/mm, PID del hotend y nivelado de cama antes de imprimir.'
    ],
    references: [
      { label: 'Documentación', url: 'https://marlinfw.org/docs/basics/introduction.html' },
      { label: 'GitHub', url: 'https://github.com/MarlinFirmware/Marlin' },
      { label: 'Configs', url: 'https://github.com/MarlinFirmware/Configurations' }
    ]
  },
  {
    id: 'grbl',
    name: 'GRBL',
    icon: '⚙️',
    category: 'CNC / Impresión 3D',
    boards: ['Arduino Uno', 'Arduino Mega'],
    description: 'Controlador CNC de alta precisión para fresadoras, láser y plotters. Interpreta G-code y genera pulsos para motores paso a paso en tiempo real. Ligero y muy estable en Arduino Uno.',
    materials: [
      'Arduino Uno (o CNC Shield + Uno)',
      'Drivers A4988/DRV8825 y motores NEMA 17',
      'Fuente 12V/24V para los motores',
      'Endstops mecánicos o ópticos',
      'Sender de G-code (Universal G-code Sender, Candle, LaserGRBL)'
    ],
    tutorial: [
      'Instala GRBL 1.1 en el Uno desde el repo oficial o Library Manager.',
      'Monta el CNC Shield, configura jumpers de microstepping y conecta los motores.',
      'Abre Universal G-code Sender, conecta al puerto serie y prueba `$` para ver settings.',
      'Configura pasos/mm (`$100`, `$101`, `$102`), velocidad máxima y límites blandos.',
      'Homing con `$H` y envía un G-code de prueba a baja velocidad.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/gnea/grbl' },
      { label: 'Wiki', url: 'https://github.com/gnea/grbl/wiki' },
      { label: 'UGS', url: 'https://winder.github.io/ugs_website/' }
    ]
  },
  {
    id: 'openmqttgateway',
    name: 'OpenMQTTGateway',
    icon: '📶',
    category: 'IoT / MQTT',
    boards: ['ESP32', 'ESP8266'],
    description: 'Puente entre sensores inalámbricos (BLE, RF 433 MHz, IR, LoRa) y MQTT. Ideal para integrar termómetros Xiaomi, mandos RF o balizas BLE en Home Assistant sin hubs propietarios.',
    materials: [
      'ESP32 (recomendado; más memoria y BLE nativo)',
      'Opcional: receptor/transmisor 433 MHz (SX127x, CC1101) o IR',
      'Broker MQTT',
      'Sensores BLE o RF compatibles para probar'
    ],
    tutorial: [
      'Flashea desde docs.openmqttgateway.com con el entorno que coincida con tu hardware.',
      'Configura WiFi y MQTT en el portal cautivo al primer arranque.',
      'Activa los gateways que necesites (BT, RF, IR) en la configuración web.',
      'Suscríbese a los topics MQTT (`home/OpenMQTTGateway/...`) y verifica lecturas.',
      'En Home Assistant, usa MQTT discovery o crea sensores a partir de esos topics.'
    ],
    references: [
      { label: 'Documentación', url: 'https://docs.openmqttgateway.com/' },
      { label: 'GitHub', url: 'https://github.com/1technophile/OpenMQTTGateway' },
      { label: 'Compatible BLE', url: 'https://docs.openmqttgateway.com/compatible_ble.html' }
    ]
  },
  {
    id: 'arduino-foc',
    name: 'SimpleFOC',
    icon: '🌀',
    category: 'Motores',
    boards: ['Arduino Uno', 'ESP32', 'STM32'],
    description: 'Librería de control FOC (Field Oriented Control) para motores brushless (BLDC) y steppers. Permite control suave de posición, velocidad y torque en robótica y gimbal.',
    materials: [
      'Placa compatible (Arduino Uno, Mega, ESP32, Nucleo…)',
      'Driver BLDC (SimpleFOCShield, B-G431B-ESC1, DRV8302…)',
      'Motor BLDC gimbal o drone (preferible con encoder/sensor Hall)',
      'Sensor de posición (AS5600, encoder magnético, Hall)',
      'Fuente adecuada a la tensión del motor'
    ],
    tutorial: [
      'Instala la librería SimpleFOC desde el Library Manager de Arduino IDE.',
      'Conecta driver, motor y sensor según el ejemplo de tu placa.',
      'Abre un ejemplo (open_loop o closed_loop velocity) y ajusta pines PWM/sensor.',
      'Calibra el sensor y la dirección eléctrica del motor con la herramienta integrada.',
      'Pasa a control en lazo cerrado (ángulo/velocidad) y ajusta PID gradualmente.'
    ],
    references: [
      { label: 'Documentación', url: 'https://docs.simplefoc.com/' },
      { label: 'GitHub', url: 'https://github.com/simplefoc/Arduino-FOC' },
      { label: 'Community', url: 'https://community.simplefoc.com/' }
    ]
  },
  {
    id: 'mjpeg2sd',
    name: 'ESP32-CAM MJPEG2SD',
    icon: '🐦',
    category: 'Cámara / Vigilancia',
    boards: ['ESP32-CAM', 'ESP32-S3'],
    description: 'El proyecto más completo para vigilancia con ESP32-CAM: servidor web MJPEG, detección de movimiento por cámara, grabación AVI en microSD y alertas por Telegram (foto + enlace al vídeo). Ideal como base para una cámara de pájaros.',
    materials: [
      'ESP32-CAM (AI-Thinker) u OV2640/OV5640 compatible',
      'Adaptador USB-TTL (FTDI/CP2102) para flashear',
      'microSD formateada (FAT32) para grabaciones',
      'Fuente 5V estable (≥1–1.5 A)',
      'Bot de Telegram (token BotFather + Chat ID)',
      'Opcional: PIR HC-SR501, micrófono I2S, carcasa exterior'
    ],
    tutorial: [
      'Clona github.com/s60sc/ESP32-CAM_MJPEG2SD y ábrelo en Arduino IDE (placa AI Thinker ESP32-CAM).',
      'Activa Telegram: en el código pon `#define INCLUDE_TGRAM true` y compila/sube el firmware.',
      'Crea un bot con @BotFather y obtén tu Chat ID con @myidbot; introdúcelos en Edit Config → Other.',
      'En la UI web activa motion detect, ajusta sensibilidad y zona; prueba el stream MJPEG en el navegador.',
      'Al detectar movimiento recibirás en Telegram un fotograma y un enlace para descargar el AVI (hasta ~50 MB).'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/s60sc/ESP32-CAM_MJPEG2SD' },
      { label: 'Telegram (wiki)', url: 'https://github.com/s60sc/ESP32-CAM_MJPEG2SD#telegram-bot' },
      { label: 'Motion detect', url: 'https://github.com/s60sc/ESP32-CAM_MJPEG2SD#motion-detection-by-camera' }
    ]
  },
  {
    id: 'wildlife-camera',
    name: 'Wildlife Camera (ESP32-CAM)',
    icon: '🦌',
    category: 'Cámara / Vigilancia',
    boards: ['ESP32-CAM'],
    description: 'Cámara de fauna a batería: el PIR despierta la placa, captura foto, la guarda en SD y la envía a Telegram si hay WiFi. Controlable por comandos del bot (/photo, /status…). Más simple que MJPEG2SD, muy buena para exterior.',
    materials: [
      'ESP32-CAM',
      'Sensor PIR (HC-SR501 o AM312 a 3.3 V)',
      'microSD',
      'Batería LiPo + módulo de carga (TP4056 / IP2312)',
      'Bot de Telegram',
      'Carcasa impermeable y soporte apuntando al comedero/bebedero'
    ],
    tutorial: [
      'Clona github.com/wizlab-it/wildlife-camera y configura WiFi + token/chat de Telegram.',
      'Cablea el PIR (OUT a un GPIO libre, p. ej. 13; VCC según el módulo 3.3 V o 5 V).',
      'Flashea con USB-TTL (GPIO0 a GND en modo descarga), inserta la SD y alimenta a 5 V.',
      'Prueba /photo y /status desde Telegram; verifica que el movimiento dispare capturas.',
      'Ajusta deep sleep y sensibilidad del PIR para ahorrar batería y reducir falsas alarmas por viento.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/wizlab-it/wildlife-camera' },
      { label: 'WildCAM_ESP32', url: 'https://github.com/thewriterben/WildCAM_ESP32' }
    ]
  },
  {
    id: 'birdwatch-edge',
    name: 'Birdwatch Edge Platform',
    icon: '🪺',
    category: 'Cámara / Vigilancia',
    boards: ['ESP32-S3 Sense'],
    description: 'Plataforma avanzada de birdwatching: despierta por PIR, filtra falsos disparos (nubes/luz) en el edge y solo entonces sube la foto a un servidor. Pensada para meses con una LiPo; la IA de “¿es pájaro?” suele vivir en el servidor (p. ej. Flask + detector).',
    materials: [
      'Seeed XIAO ESP32-S3 Sense (o ESP32-S3 con cámara)',
      'PIR de bajo consumo',
      'LiPo + load switch (p. ej. TPS22918) para apagado total',
      'Servidor local (Raspberry Pi / PC) con WiFi',
      'Opcional: BirdNET o modelo de detección de aves en el servidor'
    ],
    tutorial: [
      'Revisa el repo happychriss/birdwatch-edge-platform: el flujo es PIR → arranque frío → filtro de escena → JPEG → POST al servidor.',
      'Monta el hardware de ultra-bajo standby (~140 µA) según el README (load switch + PIR).',
      'Configura el endpoint del servidor Flask/home para recibir imagen + voltaje de batería.',
      'En el servidor añade detección/clasificación (BirdNET, YOLO, etc.) y notificaciones (Telegram/email).',
      'Coloca la cámara fija al comedero; calibra el filtro para ignorar movimiento de hojas y cambios de luz.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/happychriss/birdwatch-edge-platform' },
      { label: 'BirdNET', url: 'https://github.com/kahst/BirdNET-Analyzer' }
    ]
  },
  {
    id: '1d-pong',
    name: '1D Pong',
    icon: '🏓',
    category: 'Juegos LED',
    boards: ['Arduino Pro Mini', 'Arduino Nano', 'ESP32'],
    description: 'Pong en una sola dimensión sobre tira LED direccionable. Dos jugadores golpean la “bola” con pulsadores cuando llega a su zona; la velocidad sube con cada toque. Clásico de ferias maker (inspirado en 34C3).',
    materials: [
      'Arduino Pro Mini / Nano (o ESP32 adaptando pines)',
      'Tira APA102 o WS2812 (~60 LEDs/m, 1 m)',
      'Fuente 5V ≥2 A',
      '2–3 pulsadores arcade (p. ej. Sanwa) + pull-down',
      'Cajas/carcasa para cada extremo'
    ],
    tutorial: [
      'Clona github.com/raidlman/1d-pong e instala FastLED en el Arduino IDE.',
      'Alimenta la tira y el Arduino con la misma fuente 5V; une GND común.',
      'Conecta CI/DI (APA102) a SPI o DATA (WS2812) al pin definido en el sketch; botones a los pines con pull-down.',
      'Ajusta NUM_LEDS y pines; sube el firmware y prueba golpes en ambos extremos.',
      'Monta los botones en extremos opuestos de la tira para jugar de pie o en mesa.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/raidlman/1d-pong' },
      { label: 'Variante Pong', url: 'https://github.com/janhildebrand/LED-STRIP-PongGame' },
      { label: 'FastLED', url: 'https://github.com/FastLED/FastLED' }
    ]
  },
  {
    id: 'led-pong-nano',
    name: 'LED Strip Pong (Nano)',
    icon: '🎮',
    category: 'Juegos LED',
    boards: ['Arduino Nano'],
    description: 'Pong 1D a dos jugadores con zona verde de golpe: si pulsas demasiado pronto o tarde pierdes una vida. Entre partidas la tira hace un lightshow. Ideal si ya tienes Nano + WS2812 + 2 botones.',
    materials: [
      'Arduino Nano (con 2 pines de interrupción)',
      'Tira WS2812B (u otra compatible FastLED)',
      'Fuente 5V adecuada al nº de LEDs',
      '2 pulsadores + resistencias pull-down',
      'Resistencia ~330 Ω en la línea de datos'
    ],
    tutorial: [
      'Abre el repo janhildebrand/LED-STRIP-PongGame e instala FastLED.',
      'Conecta los botones a pines de interrupción del Nano (p. ej. D2/D3) con pull-down.',
      'Define el tipo de tira y NUM_LEDS en el código; DATA al pin configurado.',
      'Sube el sketch: en idle verás efectos; al pulsar empieza la partida.',
      'Ajusta el tamaño de la zona de golpe y la velocidad inicial si quieres más dificultad.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/janhildebrand/LED-STRIP-PongGame' },
      { label: '1D Pong kitesurfer', url: 'https://github.com/kitesurfer1404/Arduino_1DPong' }
    ]
  },
  {
    id: 'led-pixel-shooter',
    name: 'LED Pixel Shooter',
    icon: '🚀',
    category: 'Juegos LED',
    boards: ['Arduino Nano'],
    description: 'Arcade en tira WS2812B: píxeles enemigos “caen” hacia tu base y disparas con botones de color (R/G/B) para destruirlos. Incluye niveles de dificultad y botón de level-up.',
    materials: [
      'Arduino Nano',
      'Tira WS2812B (30–60 LEDs)',
      '4 pulsadores (rojo, verde, azul, level-up)',
      'Resistencia 220–470 Ω en DATA',
      'Fuente 5V (USB o externa si hay muchos LEDs)'
    ],
    tutorial: [
      'Clona github.com/4aka/Arduino-LED-Game e instala FastLED.',
      'Cablea DATA → D6 (vía resistencia); botones R/G/B/Level a D3/D2/D4/D5 hacia GND (INPUT_PULLUP).',
      'Ajusta NUM_LEDS y brillo; sube el firmware al Nano.',
      'Dispara el color correcto hacia los enemigos; cada 50 aciertos sube el nivel (o usa el botón).',
      'Si la tira parpadea en blanco al subir de nivel, la alimentación es correcta; si se reinicia, usa fuente externa.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/4aka/Arduino-LED-Game' }
    ]
  },
  {
    id: 'twang',
    name: 'TWANG',
    icon: '🗡️',
    category: 'Juegos LED',
    boards: ['Arduino Mega', 'Arduino Nano'],
    description: 'Dungeon crawler 1D en tira LED (inspirado en Line Wobbler): mueves al héroe inclinando un acelerómetro MPU6050, esquivas enemigos y llegas a la salida. El juego open source de tira LED más icónico.',
    materials: [
      'Arduino Mega o Nano',
      'Tira APA102 o WS2812 (60–450+ LEDs; más = mejor)',
      'MPU6050 (GY-521)',
      'Fuente 5V potente (calcula ~40–60 mA/LED a brillo alto)',
      'Opcional: altavoz/buzzer, LEDs de vidas, tope de puerta para “wobble”'
    ],
    tutorial: [
      'Clona github.com/Critters/TWANG (o el fork bdring/TWANG) e instala FastLED, MPU6050, RunningMedian, ToneAC.',
      'En setup() elige APA102 o descomenta la línea WS2812/NeoPixel según tu tira.',
      'Configura NUM_LEDS, DATA_PIN, brillo y DIRECTION; conecta el MPU6050 por I2C.',
      'Monta el acelerómetro en un joystick/asa: inclinar mueve al jugador sobre la tira.',
      'Empieza con pocos LEDs y brillo bajo; luego alarga la tira cuando el juego vaya fluido.'
    ],
    references: [
      { label: 'GitHub Critters', url: 'https://github.com/Critters/TWANG' },
      { label: 'Fork bdring', url: 'https://github.com/bdring/TWANG' },
      { label: 'Guía de montaje', url: 'https://jasongraphix.com/journal/twang-building-an-arduino-based-led-strip-game/' }
    ]
  },
  {
    id: 'twang32',
    name: 'TWANG32',
    icon: '⚔️',
    category: 'Juegos LED',
    boards: ['ESP32'],
    description: 'Puerto de TWANG a ESP32: mismo dungeon crawler 1D en tira LED, con más potencia de CPU para tiras largas (hasta cientos/miles de LEDs). Perfecto si ya usas ESP32 en ArduinoForge.',
    materials: [
      'ESP32 (NodeMCU-32S u similar)',
      'Tira WS2812B / NeoPixel / APA102',
      'MPU6050',
      'Fuente 5V externa + GND común (no alimentes tiras largas solo por USB)',
      'Level shifter 3.3→5 V en DATA si la tira no responde bien'
    ],
    tutorial: [
      'Clona github.com/bdring/TWANG32 e instala FastLED + RunningMedian en el IDE con soporte ESP32.',
      'Ajusta pines de datos/reloj, NUM_LEDS y tipo de LED en la config del sketch.',
      'Conecta MPU6050 a SDA/SCL del ESP32 (suele 21/22); alimenta la tira a 5V externos.',
      'Sube el firmware, calibra el centro del acelerómetro y prueba un nivel corto.',
      'Sube brillo y longitud de tira poco a poco midiendo consumo de la fuente.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/bdring/TWANG32' },
      { label: 'TWANG original', url: 'https://github.com/Critters/TWANG' }
    ]
  },
  {
    id: 'simon-fastled',
    name: 'Simon Game (FastLED)',
    icon: '🧠',
    category: 'Juegos LED',
    boards: ['Arduino Uno', 'Arduino Nano'],
    description: 'Simon clásico de memoria con secuencia de colores: NeoPixel/FastLED, pulsadores, buzzer y a menudo OLED. Repite la secuencia cada vez más larga; hay variantes con LCD y varios modos.',
    materials: [
      'Arduino Uno / Nano',
      'Tira o anillo NeoPixel / WS2812 (o 4 LEDs de color)',
      '4 pulsadores de colores',
      'Buzzer piezoeléctrico',
      'Opcional: OLED SSD1306 o LCD 16x2 I2C'
    ],
    tutorial: [
      'Elige un repo (Bogehaven/SimonGame con FastLED+OLED, o DucTriCE/SimonGame_Arduino con LCD y 3 modos).',
      'Conecta 4 botones + 4 zonas/LEDs de color; el buzzer a un pin PWM digital.',
      'Instala FastLED (y Adafruit SSD1306/GFX o LiquidCrystal_I2C si aplica) y sube el sketch.',
      'Memoriza la secuencia iluminada y repítela con los botones; al fallar reinicia.',
      'Ajusta tiempos de show/input para niños (más lento) o modo hardcore (más rápido).'
    ],
    references: [
      { label: 'Simon + FastLED/OLED', url: 'https://github.com/Bogehaven/SimonGame' },
      { label: 'Simon 3 modos', url: 'https://github.com/DucTriCE/SimonGame_Arduino' },
      { label: 'Simon matriz', url: 'https://github.com/dragosrose/SimonSaysUNO' }
    ]
  },
  {
    id: 'led-territory',
    name: 'LED Matrix Territory',
    icon: '🗺️',
    category: 'Juegos LED',
    boards: ['Arduino Uno', 'Arduino Nano'],
    description: 'Juego a 2 jugadores en matriz 16×16 WS2812B: cada uno pinta territorio con un joystick; gana quien controle más casillas al acabar el tiempo. Incluye visor web por USB (Web Serial).',
    materials: [
      'Arduino Uno/Nano',
      'Matriz 16×16 WS2812B (256 LEDs)',
      '2 joysticks analógicos con botón',
      'Fuente 5V robusta (≥3–5 A recomendado)',
      'PC con Chrome para el live viewer opcional'
    ],
    tutorial: [
      'Clona github.com/Joao14m/Snake (LED Matrix Territory) e instala FastLED.',
      'Conecta DATA de la matriz, joysticks a A0–A3 y botones a D2/D3 (PULLUP).',
      'Configura WIDTH/HEIGHT/SERPENTINE según el cableado de tu panel.',
      'Al arrancar deja los sticks centrados un segundo para calibrar.',
      'Opcional: abre el viewer HTML por Web Serial para ver la partida en el PC.'
    ],
    references: [
      { label: 'GitHub', url: 'https://github.com/Joao14m/Snake' },
      { label: 'FastLED', url: 'https://fastled.io/' }
    ]
  }
];


// ==============================================
// STATE
// ==============================================
const state = {
  selectedBoard: null,
  selectedComponents: [],
  selectedFunctions: [],
  generatedCode: '',
  generatedWiring: '',
  generatedNotes: '',
  openSourceExpanded: null
};


// ==============================================
// DOM REFERENCES
// ==============================================
const DOM = {};

function cacheDOMRefs() {
  DOM.projectName = document.getElementById('project-name');
  DOM.boardGrid = document.getElementById('board-grid');
  DOM.componentGrid = document.getElementById('component-grid');
  DOM.componentsHint = document.getElementById('components-hint');
  DOM.functionsGrid = document.getElementById('functions-grid');
  DOM.functionsHint = document.getElementById('functions-hint');
  DOM.btnGenerate = document.getElementById('btn-generate');
  DOM.generateHint = document.getElementById('generate-hint');
  DOM.sectionOutput = document.getElementById('section-output');
  DOM.outputTitle = document.getElementById('output-title');
  DOM.codeFilename = document.getElementById('code-filename');
  DOM.generatedCode = document.getElementById('generated-code');
  DOM.wiringContent = document.getElementById('wiring-content');
  DOM.notesContent = document.getElementById('notes-content');
  DOM.btnCopy = document.getElementById('btn-copy');
  DOM.btnDownload = document.getElementById('btn-download');
  DOM.btnDownloadDocs = document.getElementById('btn-download-docs');
  DOM.toast = document.getElementById('toast');
  DOM.outputTabs = document.getElementById('output-tabs');
  DOM.opensourceGrid = document.getElementById('opensource-grid');
}


// ==============================================
// INITIALIZATION
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  cacheDOMRefs();
  renderBoards();
  renderOpenSourceProjects();
  setupEventListeners();
});

function setupEventListeners() {
  DOM.btnGenerate.addEventListener('click', generateProject);
  DOM.btnCopy.addEventListener('click', copyCode);
  DOM.btnDownload.addEventListener('click', downloadScript);
  DOM.btnDownloadDocs.addEventListener('click', downloadDocs);

  DOM.outputTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    switchTab(tab.dataset.tab);
  });
}


// ==============================================
// RENDER: Open Source Projects
// ==============================================
function renderOpenSourceProjects() {
  if (!DOM.opensourceGrid) return;
  DOM.opensourceGrid.innerHTML = '';

  OPEN_SOURCE_PROJECTS.forEach((project, idx) => {
    const isExpanded = state.openSourceExpanded === project.id;
    const card = document.createElement('article');
    card.className = `opensource-card${isExpanded ? ' expanded' : ''}`;
    card.dataset.projectId = project.id;
    card.style.animation = `slideIn 0.35s ease-out ${idx * 0.04}s both`;

    const boardsHTML = project.boards
      .map(b => `<span class="c-tag other">${b}</span>`)
      .join('');

    const materialsHTML = project.materials
      .map(m => `<li>${m}</li>`)
      .join('');

    const tutorialHTML = project.tutorial
      .map((step, i) => `<li><span class="oss-step-num">${i + 1}</span>${step}</li>`)
      .join('');

    const refsHTML = project.references
      .map(r => `<a class="oss-ref-link" href="${r.url}" target="_blank" rel="noopener noreferrer">${r.label} ↗</a>`)
      .join('');

    card.innerHTML = `
      <button type="button" class="opensource-card-header" aria-expanded="${isExpanded}">
        <div class="opensource-card-title">
          <span class="opensource-card-icon">${project.icon}</span>
          <div>
            <div class="opensource-card-name">${project.name}</div>
            <div class="opensource-card-category">${project.category}</div>
          </div>
        </div>
        <div class="opensource-card-meta">
          <div class="opensource-card-tags">${boardsHTML}</div>
          <span class="opensource-chevron" aria-hidden="true">${isExpanded ? '▾' : '▸'}</span>
        </div>
      </button>
      <p class="opensource-card-summary">${project.description}</p>
      <div class="opensource-card-body"${isExpanded ? '' : ' hidden'}>
        <div class="oss-block">
          <h4>🧰 Materiales recomendados</h4>
          <ul>${materialsHTML}</ul>
        </div>
        <div class="oss-block">
          <h4>📘 Tutorial rápido</h4>
          <ol class="oss-tutorial">${tutorialHTML}</ol>
        </div>
        <div class="oss-block">
          <h4>🔗 Referencias</h4>
          <div class="oss-refs">${refsHTML}</div>
        </div>
      </div>
    `;

    const headerBtn = card.querySelector('.opensource-card-header');
    headerBtn.addEventListener('click', () => toggleOpenSourceProject(project.id));

    DOM.opensourceGrid.appendChild(card);
  });
}

function toggleOpenSourceProject(projectId) {
  state.openSourceExpanded = state.openSourceExpanded === projectId ? null : projectId;
  renderOpenSourceProjects();

  if (state.openSourceExpanded) {
    const card = DOM.opensourceGrid.querySelector(`[data-project-id="${projectId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}


// ==============================================
// RENDER: Boards
// ==============================================
function renderBoards() {
  DOM.boardGrid.innerHTML = '';

  for (const [id, board] of Object.entries(BOARDS)) {
    const card = document.createElement('div');
    card.className = 'board-card';
    card.dataset.boardId = id;
    card.id = `board-${id}`;

    let specsHTML = board.specs.map(s =>
      `<span class="spec-tag">${s}</span>`
    ).join('');

    if (board.voltage) {
      specsHTML += `<span class="spec-tag voltage">${board.voltage}</span>`;
    }
    if (board.wireless) {
      specsHTML += `<span class="spec-tag wireless">Wireless</span>`;
    }

    card.innerHTML = `
      <span class="board-card-icon">${board.icon}</span>
      <div class="board-card-name">${board.name}</div>
      <div class="board-card-chip">${board.chip}</div>
      <div class="board-card-specs">${specsHTML}</div>
    `;

    card.addEventListener('click', () => selectBoard(id));
    DOM.boardGrid.appendChild(card);
  }
}


// ==============================================
// RENDER: Components (grouped by type)
// ==============================================
function renderComponents() {
  DOM.componentGrid.innerHTML = '';

  if (!state.selectedBoard) {
    DOM.componentsHint.textContent = 'Selecciona una placa para ver los componentes disponibles';
    DOM.componentsHint.classList.remove('hidden');
    return;
  }

  DOM.componentsHint.classList.add('hidden');

  const groups = [
    { title: '🔍 Sensores', type: 'sensor' },
    { title: '⚡ Actuadores', type: 'actuator' },
    { title: '🔧 Accesorios', type: 'accessory' }
  ];

  groups.forEach(group => {
    const items = Object.entries(COMPONENTS).filter(([_, c]) => c.type === group.type);
    if (items.length === 0) return;

    // Category header
    const header = document.createElement('div');
    header.className = 'component-category-header';
    header.textContent = group.title;
    DOM.componentGrid.appendChild(header);

    // Component cards
    items.forEach(([id, comp]) => {
      const isActive = state.selectedComponents.includes(id);
      const card = document.createElement('div');
      card.className = `component-card${isActive ? ' active' : ''}`;
      card.dataset.componentId = id;
      card.id = `component-${id}`;
      card.style.animation = 'slideIn 0.3s ease-out';

      const interfaceClass = comp.interface === 'I2C' ? 'i2c'
        : (comp.interface === 'Digital' ? 'digital'
        : (comp.interface === 'Analog' ? 'analog'
        : (comp.interface === 'OneWire' || comp.interface === 'PWM' ? 'other' : 'other')));
      const typeLabels = { sensor: 'Sensor', actuator: 'Actuador', accessory: 'Accesorio' };
      const typeClass = comp.type;

      let tagsHTML = '';
      if (comp.interface && comp.interface !== 'N/A') {
        tagsHTML += `<span class="c-tag ${interfaceClass}">${comp.interface}</span>`;
      }
      tagsHTML += `<span class="c-tag ${typeClass}">${typeLabels[comp.type] || comp.type}</span>`;
      if (comp.address) {
        tagsHTML += `<span class="c-tag i2c">${comp.address}</span>`;
      }

      card.innerHTML = `
        <div class="component-checkbox">${isActive ? '✓' : ''}</div>
        <div class="component-info">
          <div class="component-name">
            <span class="c-icon">${comp.icon}</span>
            ${comp.name}
          </div>
          <div class="component-desc">${comp.description}</div>
          <div class="component-tags">${tagsHTML}</div>
        </div>
      `;

      card.addEventListener('click', () => toggleComponent(id));
      DOM.componentGrid.appendChild(card);
    });
  });
}


// ==============================================
// RENDER: Functions
// ==============================================
function renderFunctions() {
  DOM.functionsGrid.innerHTML = '';

  const availableFunctions = getAvailableFunctions();

  if (state.selectedComponents.length === 0) {
    DOM.functionsHint.textContent = 'Selecciona componentes para ver funciones disponibles';
    DOM.functionsHint.classList.remove('hidden');
    return;
  }

  if (availableFunctions.length === 0) {
    DOM.functionsHint.textContent = 'No hay funciones disponibles para la combinación actual';
    DOM.functionsHint.classList.remove('hidden');
    return;
  }

  DOM.functionsHint.classList.add('hidden');

  availableFunctions.forEach((fn, idx) => {
    const isActive = state.selectedFunctions.includes(fn.id);
    const card = document.createElement('div');
    card.className = `function-card${isActive ? ' active' : ''}`;
    card.dataset.functionId = fn.id;
    card.id = `function-${fn.id}`;
    card.style.animation = `slideIn 0.3s ease-out ${idx * 0.05}s both`;

    card.innerHTML = `
      <div class="function-checkbox">${isActive ? '✓' : ''}</div>
      <div class="function-info">
        <div class="function-name">
          <span class="f-icon">${fn.icon}</span>
          ${fn.name}
        </div>
        <div class="function-desc">${fn.description}</div>
      </div>
    `;

    card.addEventListener('click', () => toggleFunction(fn.id));
    DOM.functionsGrid.appendChild(card);
  });
}


// ==============================================
// STATE MANAGEMENT
// ==============================================
function selectBoard(boardId) {
  state.selectedBoard = boardId;

  // Update board card UI
  document.querySelectorAll('.board-card').forEach(card => {
    card.classList.toggle('active', card.dataset.boardId === boardId);
  });

  // Reset components and functions
  state.selectedComponents = [];
  state.selectedFunctions = [];

  renderComponents();
  renderFunctions();
  updateGenerateButton();
  hideOutput();
}

function toggleComponent(componentId) {
  const idx = state.selectedComponents.indexOf(componentId);

  // Conflictos de dirección / exclusiones
  const conflicts = {
    'aht10': ['aht20'],
    'aht20': ['aht10'],
    'bmp280': ['bme280'],
    'bme280': ['bmp280']
  };
  if (conflicts[componentId]) {
    state.selectedComponents = state.selectedComponents.filter(c => !conflicts[componentId].includes(c));
  }

  if (idx === -1) {
    state.selectedComponents.push(componentId);
  } else {
    state.selectedComponents.splice(idx, 1);
  }

  // Remove functions that are no longer available
  const available = getAvailableFunctions().map(f => f.id);
  state.selectedFunctions = state.selectedFunctions.filter(f => available.includes(f));

  renderComponents();
  renderFunctions();
  updateGenerateButton();
  hideOutput();
}

const FUNCTION_CONFLICTS = {
  'display-sensors': ['toggle-display'],
  'toggle-display': ['display-sensors', 'button-debounce', 'relay-toggle-button'],
  'button-debounce': ['toggle-display', 'relay-toggle-button'],
  'relay-toggle-button': ['toggle-display', 'button-debounce', 'relay-control', 'relay-timed', 'thermostat', 'motion-relay'],
  'relay-control': ['relay-toggle-button', 'relay-timed', 'thermostat', 'motion-relay'],
  'relay-timed': ['relay-control', 'relay-toggle-button', 'thermostat', 'motion-relay'],
  'thermostat': ['relay-control', 'relay-timed', 'relay-toggle-button', 'motion-relay'],
  'motion-relay': ['relay-control', 'relay-timed', 'relay-toggle-button', 'thermostat'],
  'servo-sweep': ['servo-serial'],
  'servo-serial': ['servo-sweep'],
  'ws2812-rainbow': ['ws2812-solid', 'motion-light'],
  'ws2812-solid': ['ws2812-rainbow', 'motion-light'],
  'motion-light': ['ws2812-rainbow', 'ws2812-solid'],
  'pump-timed': ['auto-irrigation'],
  'auto-irrigation': ['pump-timed']
};

function toggleFunction(functionId) {
  const idx = state.selectedFunctions.indexOf(functionId);
  const conflicts = FUNCTION_CONFLICTS[functionId] || [];

  if (idx === -1) {
    const dropped = state.selectedFunctions.filter(id => conflicts.includes(id));
    state.selectedFunctions = state.selectedFunctions.filter(id => !conflicts.includes(id));
    state.selectedFunctions.push(functionId);
    if (dropped.length) {
      const names = dropped
        .map(id => (FUNCTIONS.find(fn => fn.id === id) || {}).name)
        .filter(Boolean);
      if (names.length) showToast('Desmarcada: ' + names.join(', '));
    }
  } else {
    state.selectedFunctions.splice(idx, 1);
  }

  renderFunctions();
  updateGenerateButton();
}

function getAvailableFunctions() {
  return FUNCTIONS.filter(fn => {
    const anyMatch = fn.requiresAny.length === 0 ||
      fn.requiresAny.some(c => state.selectedComponents.includes(c));
    const allMatch = fn.requiresAll.length === 0 ||
      fn.requiresAll.every(c => state.selectedComponents.includes(c));
    return anyMatch && allMatch;
  });
}

function updateGenerateButton() {
  const canGenerate = state.selectedBoard && state.selectedComponents.length > 0;
  DOM.btnGenerate.disabled = !canGenerate;

  if (canGenerate) {
    DOM.generateHint.classList.add('hidden');
  } else {
    DOM.generateHint.classList.remove('hidden');
    if (!state.selectedBoard) {
      DOM.generateHint.textContent = 'Selecciona una placa de desarrollo';
    } else {
      DOM.generateHint.textContent = 'Selecciona al menos un componente';
    }
  }
}



function adcCalibration(board) {
  const chip = (board && board.chip) || '';
  if (chip.includes('ESP8266') || chip.includes('ESP-01')) {
    return { dry: 850, wet: 300, center: 512, label: 'ADC de 10 bits; A0 del ESP8266 admite como máximo 1 V' };
  }
  if (chip.includes('ATmega')) {
    return { dry: 780, wet: 320, center: 512, label: 'ADC de 10 bits (0–1023)' };
  }
  return { dry: 3200, wet: 1400, center: 2048, label: 'ADC de 12 bits (0–4095)' };
}

function resolveWiringToken(board, value) {
  const tokens = {
    '{SDA}': board.pins.sda,
    '{SCL}': board.pins.scl,
    '{BUTTON_PIN}': board.pins.buttonDefault || 'N/A',
    '{RELAY_PIN}': board.pins.relayDefault || 'N/A',
    '{DHT_PIN}': board.pins.dhtDefault || 'N/A',
    '{DS18_PIN}': board.pins.ds18Default || 'N/A',
    '{TRIG_PIN}': board.pins.trigDefault || 'N/A',
    '{ECHO_PIN}': board.pins.echoDefault || 'N/A',
    '{PIR_PIN}': board.pins.pirDefault || 'N/A',
    '{SOIL_PIN}': board.pins.soilDefault || 'N/A',
    '{MIC_PIN}': board.pins.micDefault || 'N/A',
    '{SERVO_PIN}': board.pins.servoDefault || 'N/A',
    '{LED_PIN}': board.pins.ledDefault || 'N/A',
    '{PUMP_PIN}': board.pins.pumpDefault || 'N/A'
  };
  let out = value;
  Object.entries(tokens).forEach(([token, pin]) => {
    out = out.split(token).join(pin);
  });
  return out;
}

// ==============================================
// CODE GENERATION
// ==============================================
function generateProject() {
  const board = BOARDS[state.selectedBoard];
  const projectName = getProjectName();

  state.generatedCode = generateCode(board, projectName);
  state.generatedWiring = generateWiringDocs(board);
  state.generatedNotes = generateProjectNotes(board);

  // Update UI
  DOM.codeFilename.textContent = `${projectName}.ino`;
  DOM.generatedCode.innerHTML = highlightSyntax(state.generatedCode);
  DOM.wiringContent.innerHTML = state.generatedWiring;
  DOM.notesContent.innerHTML = state.generatedNotes;
  DOM.outputTitle.textContent = `Proyecto: ${projectName}`;

  // Show output
  DOM.sectionOutput.classList.remove('hidden');
  switchTab('code');

  // Scroll to output
  setTimeout(() => {
    DOM.sectionOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  showToast('✓ Proyecto generado correctamente');
}

function getProjectName() {
  let name = DOM.projectName.value.trim();
  if (!name) name = 'mi_proyecto_arduino';
  // Sanitize for filename
  return name.replace(/[^a-zA-Z0-9_]/g, '_').replace(/_+/g, '_');
}

function generateCode(board, projectName) {
  const selComp = state.selectedComponents;
  const selFuncs = state.selectedFunctions;
  const components = selComp.map(id => COMPONENTS[id]);
  const functions = selFuncs.map(id => FUNCTIONS.find(f => f.id === id)).filter(Boolean);

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES', {
    year: 'numeric', month: '2-digit', day: '2-digit'
  });

  let code = '';

  // ─── Header ───
  code += `/*\n`;
  code += ` * ═══════════════════════════════════════════\n`;
  code += ` *  Proyecto: ${projectName}\n`;
  code += ` *  Placa: ${board.name} (${board.chip})\n`;
  code += ` *  Componentes: ${components.map(c => c.name).join(', ')}\n`;
  code += ` *  Generado con ArduinoForge\n`;
  code += ` *  Fecha: ${dateStr}\n`;
  code += ` * ═══════════════════════════════════════════\n`;
  code += ` */\n\n`;

  // ─── Includes ───
  let includes = new Set();

  // Wire.h for I2C components
  const hasI2C = components.some(c => c.interface === 'I2C');
  if (hasI2C) includes.add('Wire.h');

  // Adafruit Sensor base lib
  const needsSensor = components.some(c => c.needsAdafruitSensor);
  if (needsSensor) includes.add('Adafruit_Sensor.h');

  // Component-specific includes
  components.forEach(c => {
    c.includes.forEach(inc => includes.add(inc));
  });

  code += `// ═══ Librerías ═══\n`;
  includes.forEach(inc => {
    code += `#include <${inc}>\n`;
  });
  code += `\n`;

  // ─── Defines & Constants ───
  const pinLines = [];
  const usedDefines = new Set();
  components.forEach(c => {
    if (!c.pinDefines) return;
    c.pinDefines.forEach(p => {
      if (usedDefines.has(p.name)) return;
      const val = board.pins[p.valueKey];
      if (val === null || val === undefined || val === '') return;
      usedDefines.add(p.name);
      pinLines.push(`#define ${p.name} ${val}`);
    });
  });
  if (pinLines.length > 0) {
    code += `// ═══ Pines ═══\n`;
    pinLines.forEach(line => { code += `${line}\n`; });
    code += `\n`;
  }

  // ─── Global Variables ───
  code += `// ═══ Objetos y Variables Globales ═══\n`;

  components.forEach(c => {
    if (c.globalVars) {
      if (Array.isArray(c.globalVars)) {
        c.globalVars.forEach(line => {
          code += `${line}\n`;
        });
      } else {
        code += `${c.globalVars}\n`;
      }
    }
  });

  code += `\n`;
  code += `// Intervalo de lectura (ms)\n`;
  code += `unsigned long ultimaLectura = 0;\n`;
  code += `const unsigned long INTERVALO_LECTURA = 2000;\n`;
  code += `\n`;

  // ─── Function-specific global variables ───
  // Check if toggle-display adds global vars
  const toggleFunc = functions.find(f => f.id === 'toggle-display');
  const csvFunc = functions.find(f => f.id === 'csv-logger');
  const alertFunc = functions.find(f => f.id === 'temp-alert');

  // ─── Setup ───
  code += `// ═══════════════════════════════════════════\n`;
  code += `//  SETUP\n`;
  code += `// ═══════════════════════════════════════════\n`;
  code += `void setup() {\n`;
  code += `  Serial.begin(${board.baudRate});\n`;

  if (hasI2C) {
    code += `  Wire.begin();\n`;
  }

  code += `  delay(100);\n`;
  code += `\n`;
  code += `  Serial.println(F(""));\n`;
  code += `  Serial.println(F("╔═══════════════════════════════════╗"));\n`;
  code += `  Serial.println(F("║     ${board.name} — ${projectName.substring(0, 16).padEnd(16)}║"));\n`;
  code += `  Serial.println(F("╚═══════════════════════════════════╝"));\n`;
  code += `  Serial.println(F(""));\n`;
  code += `\n`;

  // Component setup code
  components.forEach(c => {
    c.setupCode.forEach(line => {
      let processedLine = resolveWiringToken(board, line);
      code += `  ${processedLine}\n`;
    });
    code += `\n`;
  });

  // Function-specific setup calls
  if (functions.some(fn => fn.setupCall)) {
    code += `  // Funciones que se ejecutan una sola vez al iniciar\n`;
    functions.forEach(fn => {
      if (fn.setupCall) {
        code += `  ${fn.setupCall}\n`;
      }
    });
    code += `\n`;
  }

  code += `  Serial.println(F(""));\n`;
  code += `  Serial.println(F("=== Sistema inicializado ==="));\n`;
  code += `  Serial.println(F(""));\n`;
  code += `}\n\n`;

  // ─── Loop ───
  code += `// ═══════════════════════════════════════════\n`;
  code += `//  LOOP\n`;
  code += `// ═══════════════════════════════════════════\n`;
  code += `void loop() {\n`;

  if (functions.length === 0) {
    // Default loop: just read and print every interval
    code += `  // Añade tu código aquí o selecciona funciones recomendadas\n`;
    code += `  // para generar código automáticamente.\n`;
    code += `  \n`;
    code += `  if (millis() - ultimaLectura >= INTERVALO_LECTURA) {\n`;
    code += `    ultimaLectura = millis();\n`;
    code += `    Serial.println(F("Loop activo..."));\n`;
    code += `  }\n`;
  } else {
    const hasToggle = selFuncs.includes('toggle-display');

    // Funciones que deben ejecutarse en cada iteración (sin esperar intervalo)
    const everyLoopFns = functions.filter(f => {
      if (f.id === 'toggle-display') return false; // tratado aparte
      if (f.id === 'button-debounce' && hasToggle) return false;
      return f.runEveryLoop || f.id === 'button-debounce';
    });

    if (hasToggle) {
      code += `  // Comprobar botón (sin delay)\n`;
      code += `  alternarModo();\n`;
      code += `\n`;
    }

    everyLoopFns.forEach(fn => {
      code += `  ${fn.loopCall}\n`;
    });
    if (everyLoopFns.length) code += `\n`;

    // Timed functions
    const timedFunctions = functions.filter(f =>
      f.id !== 'button-debounce' &&
      f.id !== 'toggle-display' &&
      !f.runEveryLoop
    );

    // If toggle-display is selected, don't include display-sensors in timed
    const filteredTimedFuncs = timedFunctions.filter(f => {
      if (f.id === 'display-sensors' && hasToggle) return false;
      return true;
    });

    if (filteredTimedFuncs.length > 0 || hasToggle) {
      code += `  if (millis() - ultimaLectura >= INTERVALO_LECTURA) {\n`;
      code += `    ultimaLectura = millis();\n`;
      code += `\n`;

      filteredTimedFuncs.forEach(fn => {
        code += `    ${fn.loopCall}\n`;
      });

      if (hasToggle) {
        code += `    mostrarModoActual();\n`;
      }

      code += `  }\n`;
    }
  }

  code += `}\n`;

  // ─── Function Definitions ───
  if (functions.length > 0) {
    code += `\n`;
    code += `// ═══════════════════════════════════════════\n`;
    code += `//  FUNCIONES\n`;
    code += `// ═══════════════════════════════════════════\n`;
    code += `\n`;

    // Generate function code, skipping duplicates
    const hasToggle = selFuncs.includes('toggle-display');

    functions.forEach(fn => {
      // Skip display-sensors if toggle-display is also selected
      if (fn.id === 'display-sensors' && hasToggle) return;
      // Skip button-debounce if toggle-display is selected (it has its own)
      if (fn.id === 'button-debounce' && hasToggle) return;

      code += fn.generateCode(selComp, board) + '\n\n';
    });
  }

  return code.trimEnd() + '\n';
}


// ==============================================
// WIRING DOCUMENTATION GENERATION
// ==============================================
function generateWiringDocs(board) {
  let html = '';

  html += `<h3>🔌 Diagrama de Conexiones — ${board.name}</h3>`;
  html += `<p>Placa: <strong>${board.name}</strong> (${board.chip}) — Voltaje lógico: <strong>${board.voltage}</strong></p>`;

  state.selectedComponents.forEach(compId => {
    const comp = COMPONENTS[compId];

    html += `<h4>${comp.icon} ${comp.name} — ${comp.category}</h4>`;

    if (comp.library) {
      html += `<p>Librería: <strong>${comp.library}</strong></p>`;
    }

    // Wiring table
    html += `<table class="wiring-table">`;
    html += `<thead><tr>
      <th>Pin del Componente</th>
      <th>Pin de la Placa (${board.name})</th>
    </tr></thead><tbody>`;

    comp.wiring.pins.forEach(pin => {
      let boardPin = resolveWiringToken(board, pin.board);

      html += `<tr>
        <td>${pin.component}</td>
        <td><span class="pin-label">${boardPin}</span></td>
      </tr>`;
    });

    html += `</tbody></table>`;

    // Wiring notes
    if (comp.wiring.notes && comp.wiring.notes.length) {
      html += `<ul>`;
      comp.wiring.notes.forEach(note => {
        html += `<li>${note}</li>`;
      });
      html += `</ul>`;
    }
  });

  // === I2C summary ===
  const i2cComponents = state.selectedComponents
    .map(id => COMPONENTS[id])
    .filter(c => c.interface === 'I2C');

  if (i2cComponents.length > 1) {
    html += `<h3>📋 Resumen del Bus I2C</h3>`;
    html += `<div class="info-box">Todos los dispositivos I2C comparten los mismos pines SDA y SCL. Comprueba que no haya conflictos de dirección.</div>`;
    html += `<table class="wiring-table">`;
    html += `<thead><tr><th>Dispositivo</th><th>Dirección I2C</th></tr></thead><tbody>`;

    i2cComponents.forEach(c => {
      html += `<tr><td>${c.name}</td><td><span class="pin-label">${c.address || 'N/A'}</span></td></tr>`;
    });

    html += `</tbody></table>`;

    // Check for conflicts
    const addresses = i2cComponents.map(c => c.address).filter(Boolean);
    const uniqueAddresses = new Set(addresses);
    if (uniqueAddresses.size < addresses.length) {
      html += `<div class="warning-box">⚠️ ¡Conflicto de direcciones I2C detectado! Dos o más dispositivos comparten la misma dirección. Comprueba si puedes cambiar la dirección mediante jumpers o configuración hardware.</div>`;
    }
  }

  if (i2cComponents.length > 0) {
    html += `<div class="info-box">Si una conexión I2C no responde, usa la función <strong>Escáner I2C y Validación</strong> para detectar dispositivos y confirmar direcciones reales en el bus.</div>`;
  }

  if (state.selectedBoard === 'esp8266-relay' && i2cComponents.length > 0) {
    html += `<div class="warning-box">⚠️ En ESP-01S / ESP8266 Relay, los GPIO0 y GPIO2 son pines de arranque. Evita forzar estados bajos durante el encendido para no bloquear el arranque.</div>`;
  }

  const pinGroups = {};
  const missingPins = [];
  state.selectedComponents.forEach(id => {
    const comp = COMPONENTS[id];
    (comp.pinDefines || []).forEach(def => {
      const pin = board.pins[def.valueKey];
      if (pin === null || pin === undefined || pin === '') {
        missingPins.push(`${comp.name} (${def.name})`);
        return;
      }
      const key = String(pin);
      if (!pinGroups[key]) pinGroups[key] = [];
      if (!pinGroups[key].includes(comp.name)) pinGroups[key].push(comp.name);
    });
  });

  const sharedPins = Object.entries(pinGroups).filter(([, names]) => names.length > 1);
  if (sharedPins.length) {
    html += `<h3>⚠️ Pines compartidos</h3>`;
    html += `<div class="warning-box">`;
    sharedPins.forEach(([pin, names]) => {
      html += `El pin <strong>${pin}</strong> lo usan ${names.join(' y ')}. Deja solo uno o cambia el #define en el código.<br>`;
    });
    html += `</div>`;
  }
  if (missingPins.length) {
    html += `<div class="warning-box">⚠️ Esta placa no tiene un pin recomendado para ${missingPins.join(', ')}. Ese componente no funcionará hasta que asignes el pin a mano.</div>`;
  }

  const is3v3 = String(board.voltage).includes('3.3');
  const has = (id) => state.selectedComponents.includes(id);
  const tips = [];
  if (is3v3) {
    if (has('hc-sr04')) tips.push('ECHO del HC-SR04 sale a 5 V. Divisor: 1 kΩ desde ECHO al GPIO y 2 kΩ desde el GPIO a GND.');
    if (has('max4466')) tips.push('Alimenta el MAX4466 a 3.3 V. A 5 V la salida puede superar el máximo del GPIO.');
    if (has('relay')) tips.push('Un relé de 5 V a veces no conmuta con un GPIO a 3.3 V. Comprueba que el módulo acepte ese nivel lógico.');
    if (has('ws2812')) tips.push('Si el primer LED no responde, la señal de 3.3 V se queda corta: añade 330 Ω en serie y un level shifter.');
    if ((has('soil-moisture') || has('max4466')) && (state.selectedBoard === 'nodemcu' || state.selectedBoard === 'esp8266-relay')) {
      tips.push('A0 del ESP8266 solo admite 0–1 V. No conectes una salida analógica de 3.3 V directa.');
    }
    if (has('soil-moisture') && state.selectedBoard === 'esp32-cam') {
      tips.push('En la ESP32-CAM el pin de humedad cae en GPIO2 (ADC2). Ese ADC no mide mientras el WiFi está activo.');
    }
  } else if (has('bmp280') || has('bme280') || has('mpu9250')) {
    tips.push('La placa es de 5 V y BMP280, BME280 o MPU9250 son de 3.3 V. Usa un módulo con regulador o un conversor de nivel.');
  }
  if (has('water-pump')) {
    tips.push('La bomba se enciende con HIGH. Un módulo relé de lógica invertida haría lo contrario: usa un MOSFET de nivel lógico o invierte el digitalWrite.');
  }
  tips.forEach(tip => {
    html += `<div class="warning-box">⚠️ ${tip}</div>`;
  });

  return html;
}


// ==============================================
// PROJECT NOTES GENERATION
// ==============================================
function generateProjectNotes(board) {
  let html = '';

  // Board notes
  html += `<h3>📋 Notas de la Placa: ${board.name}</h3>`;
  html += `<ul>`;
  board.notes.forEach(note => {
    html += `<li>${note}</li>`;
  });
  html += `</ul>`;

  // Libraries to install
  html += `<h3>📚 Librerías a Instalar</h3>`;
  html += `<p>Instala estas librerías desde el Gestor de Librerías del Arduino IDE (<strong>Sketch > Include Library > Manage Libraries</strong>):</p>`;
  html += `<ul>`;

  const libs = new Set();
  state.selectedComponents.forEach(id => {
    const comp = COMPONENTS[id];
    if (comp.library) libs.add(comp.library);
    if (comp.needsAdafruitSensor) libs.add('Adafruit Unified Sensor');
  });

  // Special lib for MPU9250
  if (state.selectedComponents.includes('mpu9250')) {
    libs.add('MPU9250_asukiaaa');
  }

  if (libs.size === 0) {
    html += `<li>No se requieren librerías adicionales.</li>`;
  } else {
    libs.forEach(lib => {
      html += `<li><strong>${lib}</strong></li>`;
    });
  }
  html += `</ul>`;

  // Board setup instructions
  html += `<h3>⚙️ Configuración del Arduino IDE</h3>`;

  if (['esp32', 'esp32-cam', 'esp32-lora'].includes(state.selectedBoard)) {
    const boardLabel = state.selectedBoard === 'esp32-cam' ? 'ESP32-CAM' :
                       state.selectedBoard === 'esp32-lora' ? 'ESP32 LoRa' : 'ESP32';
    const boardTarget = state.selectedBoard === 'esp32-cam' ? 'AI Thinker ESP32-CAM' :
                        state.selectedBoard === 'esp32-lora' ? 'Heltec WiFi LoRa 32 / TTGO LoRa32' : 'ESP32 Dev Module';
    html += `<div class="info-box">
      <strong>Para usar ${boardLabel}:</strong><br>
      1. Ve a <strong>Archivo > Preferencias</strong><br>
      2. En "URLs adicionales de gestor de tarjetas", añade:<br>
      <code>https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json</code><br>
      3. Ve a <strong>Herramientas > Placa > Gestor de tarjetas</strong><br>
      4. Busca "ESP32" e instala el paquete de Espressif Systems<br>
      5. Selecciona <strong>${boardTarget}</strong> como placa
    </div>`;
  } else if (['nodemcu', 'esp8266-relay'].includes(state.selectedBoard)) {
    const boardLabel = state.selectedBoard === 'esp8266-relay' ? 'ESP8266 Módulo Relé (ESP-01S)' : 'NodeMCU (ESP8266)';
    const boardTarget = state.selectedBoard === 'esp8266-relay' ? 'Generic ESP8266 Module' : 'NodeMCU 1.0 (ESP-12E Module)';
    html += `<div class="info-box">
      <strong>Para usar ${boardLabel}:</strong><br>
      1. Ve a <strong>Archivo > Preferencias</strong><br>
      2. En "URLs adicionales de gestor de tarjetas", añade:<br>
      <code>http://arduino.esp8266.com/stable/package_esp8266com_index.json</code><br>
      3. Ve a <strong>Herramientas > Placa > Gestor de tarjetas</strong><br>
      4. Busca "ESP8266" e instala el paquete<br>
      5. Selecciona <strong>${boardTarget}</strong> como placa
    </div>`;
  } else {
    html += `<p>Selecciona <strong>Arduino Uno</strong> en <strong>Herramientas > Placa</strong>.</p>`;
  }

  html += `<p>Puerto serie: <strong>${board.baudRate} baudios</strong></p>`;

  // Component-specific tips
  html += `<h3>💡 Consejos por Componente</h3>`;

  state.selectedComponents.forEach(id => {
    const comp = COMPONENTS[id];
    if (comp.wiring.notes && comp.wiring.notes.length) {
      html += `<h4>${comp.icon} ${comp.name}</h4>`;
      html += `<ul>`;
      comp.wiring.notes.forEach(note => {
        html += `<li>${note}</li>`;
      });
      html += `</ul>`;
    }
  });

  // Selected functions info
  if (state.selectedFunctions.length > 0) {
    html += `<h3>🔧 Funciones Incluidas</h3>`;
    html += `<ul>`;
    state.selectedFunctions.forEach(fId => {
      const fn = FUNCTIONS.find(f => f.id === fId);
      if (fn) {
        html += `<li><strong>${fn.name}</strong> — ${fn.description}</li>`;
      }
    });
    html += `</ul>`;
  }

  // General tips
  html += `<h3>📌 Recomendaciones Generales</h3>`;
  html += `<ul>`;
  html += `<li>Abre el <strong>Monitor Serie</strong> (Ctrl+Shift+M) para ver los mensajes de depuración.</li>`;
  html += `<li>Configura la velocidad del monitor serie a <strong>${board.baudRate} baudios</strong>.</li>`;
  html += `<li>Verifica todas las conexiones antes de alimentar el circuito.</li>`;
  html += `<li>Si un sensor I2C no responde, ejecuta un escáner I2C para verificar la dirección.</li>`;
  html += `<li>Usa cables cortos para conexiones I2C (máximo 20-30 cm sin bus buffer).</li>`;
  html += `</ul>`;

  return html;
}


// ==============================================
// SYNTAX HIGHLIGHTING
// ==============================================
function highlightSyntax(code) {
  // Use a placeholder-based approach to avoid regex conflicts.
  // We replace matched tokens with unique placeholders, then restore them at the end.
  const placeholders = [];
  function ph(className, content) {
    const idx = placeholders.length;
    placeholders.push({ className, content });
    return `\x00PH${idx}PH\x00`;
  }

  // Step 1: Work on raw code (not HTML-escaped) to get correct regex matches.
  let result = code;

  // 1a. Block comments /* ... */
  result = result.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => ph('syn-comment', m));

  // 1b. Line comments // ...
  result = result.replace(/(\/\/.*$)/gm, (m) => ph('syn-comment', m));

  // 1c. Preprocessor: lines starting with #
  result = result.replace(/^(\s*#\w+.*)$/gm, (m) => ph('syn-preprocessor', m));

  // 1d. Strings with optional F() macro
  result = result.replace(/F\("(?:[^"\\]|\\.)*?"\)/g, (m) => ph('syn-string', m));
  result = result.replace(/"(?:[^"\\]|\\.)*?"/g, (m) => ph('syn-string', m));

  // 1e. Keywords
  const keywords = [
    'void', 'int', 'float', 'bool', 'char', 'unsigned', 'long',
    'const', 'static', 'if', 'else', 'while', 'for', 'do',
    'switch', 'case', 'break', 'return', 'true', 'false',
    'HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP'
  ];
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(kwRegex, (m) => ph('syn-keyword', m));

  // 1f. Types
  const types = [
    'Adafruit_AHTX0', 'Adafruit_BMP280', 'Adafruit_SSD1306',
    'MPU9250_asukiaaa', 'sensors_event_t', 'String',
    'SSD1306_SWITCHCAPVCC', 'SSD1306_WHITE',
    'DHT', 'DHT11', 'OneWire', 'DallasTemperature', 'Servo',
    'Adafruit_BME280', 'Adafruit_NeoPixel', 'NEO_GRB', 'NEO_KHZ800'
  ];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  result = result.replace(typeRegex, (m) => ph('syn-type', m));

  // 1g. Known objects / constants
  const constants = [
    'Serial', 'Wire', 'display', 'aht', 'bmp', 'bme', 'mpu', 'dht', 'ds18', 'strip', 'servoMotor',
    'SCREEN_WIDTH', 'SCREEN_HEIGHT', 'OLED_RESET',
    'PIN_BOTON', 'PIN_RELE', 'PIN_DHT', 'PIN_DS18', 'PIN_TRIG', 'PIN_ECHO', 'PIN_PIR',
    'PIN_SUELO', 'PIN_MIC', 'PIN_SERVO', 'PIN_LED', 'PIN_BOMBA', 'NUM_LEDS',
    'INTERVALO_LECTURA', 'TOTAL_MODOS', 'TEMP_UMBRAL', 'DEBOUNCE_MS',
    'DURACION_RELE', 'DURACION_BOMBA', 'DEVICE_DISCONNECTED_C'
  ];
  const constRegex = new RegExp(`\\b(${constants.join('|')})\\b`, 'g');
  result = result.replace(constRegex, (m) => ph('syn-constant', m));

  // 1h. Numbers
  result = result.replace(/\b(\d+\.?\d*[FfLlUu]?)\b/g, (m) => ph('syn-number', m));

  // 1i. Function calls (lowercase word followed by parenthesis, not a keyword)
  result = result.replace(/\b([a-z][a-zA-Z0-9_]*)\s*(?=\()/g, (m, name) => {
    if (keywords.includes(name)) return m;
    return ph('syn-function', m);
  });

  // Step 2: HTML-escape everything that isn't a placeholder
  result = result
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Step 3: Restore placeholders as real <span> tags.
  // Placeholder content also needs HTML-escaping.
  result = result.replace(/\x00PH(\d+)PH\x00/g, (_, idx) => {
    const { className, content } = placeholders[Number(idx)];
    const escaped = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<span class="${className}">${escaped}</span>`;
  });

  return result;
}


// ==============================================
// TAB MANAGEMENT
// ==============================================
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  // Update panels
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabName}`);
  });
}


// ==============================================
// UTILITIES
// ==============================================
function hideOutput() {
  DOM.sectionOutput.classList.add('hidden');
}

function showToast(message) {
  DOM.toast.textContent = message;
  DOM.toast.classList.add('visible');
  setTimeout(() => {
    DOM.toast.classList.remove('visible');
  }, 3000);
}

function copyCode() {
  navigator.clipboard.writeText(state.generatedCode).then(() => {
    DOM.btnCopy.textContent = '✓ Copiado';
    DOM.btnCopy.classList.add('copied');
    showToast('Código copiado al portapapeles');
    setTimeout(() => {
      DOM.btnCopy.textContent = '📋 Copiar';
      DOM.btnCopy.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = state.generatedCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Código copiado al portapapeles');
  });
}

function downloadScript() {
  const projectName = getProjectName();
  const blob = new Blob([state.generatedCode], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `${projectName}.ino`);
  showToast(`✓ Archivo ${projectName}.ino descargado`);
}

function downloadDocs() {
  const projectName = getProjectName();
  const board = BOARDS[state.selectedBoard];

  let doc = '';
  doc += `═══════════════════════════════════════════\n`;
  doc += ` Documentación del Proyecto: ${projectName}\n`;
  doc += ` Placa: ${board.name} (${board.chip})\n`;
  doc += ` Generado con ArduinoForge\n`;
  doc += `═══════════════════════════════════════════\n\n`;

  // Wiring
  doc += `── CONEXIONES ──\n\n`;
  state.selectedComponents.forEach(compId => {
    const comp = COMPONENTS[compId];
    doc += `${comp.name} (${comp.category}):\n`;
    comp.wiring.pins.forEach(pin => {
      let boardPin = pin.board
        .replace('{SDA}', board.pins.sda)
        .replace('{SCL}', board.pins.scl)
        .replace('{BUTTON_PIN}', board.pins.buttonDefault);
      doc += `  ${pin.component.padEnd(15)} → ${boardPin}\n`;
    });
    doc += `\n`;
  });

  // Libraries
  doc += `── LIBRERÍAS A INSTALAR ──\n\n`;
  const libs = new Set();
  state.selectedComponents.forEach(id => {
    const comp = COMPONENTS[id];
    if (comp.library) libs.add(comp.library);
    if (comp.needsAdafruitSensor) libs.add('Adafruit Unified Sensor');
  });
  if (state.selectedComponents.includes('mpu9250')) {
    libs.add('MPU9250_asukiaaa');
  }
  libs.forEach(lib => { doc += `  • ${lib}\n`; });

  doc += `\n── NOTAS ──\n\n`;
  board.notes.forEach(note => { doc += `  • ${note}\n`; });
  doc += `\n`;

  state.selectedComponents.forEach(id => {
    const comp = COMPONENTS[id];
    if (comp.wiring.notes.length) {
      doc += `  ${comp.name}:\n`;
      comp.wiring.notes.forEach(note => { doc += `    • ${note}\n`; });
      doc += `\n`;
    }
  });

  const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `${projectName}_documentacion.txt`);
  showToast(`✓ Documentación descargada`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
