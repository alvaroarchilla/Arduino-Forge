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
      relayPin: '7'
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
      relayPin: '25'
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
      relayPin: '14'
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
      relayPin: '12'
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
      relayPin: '23'
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
      relayPin: '0'
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
        'El AHT10 funciona a 3.3V y 5V.',
        'Dirección I2C por defecto: 0x38.',
        'Si usas otro sensor I2C con dirección 0x38, habrá conflicto.'
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
        'El AHT20 es compatible en voltaje con 3.3V y 5V.',
        'Dirección I2C: 0x38 (misma que AHT10, no usar ambos a la vez).',
        'Mayor precisión que AHT10: ±0.3°C para temperatura, ±2% para humedad.'
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
        'Pin CSB a VCC y SDO a GND configuran modo I2C con dirección 0x76.',
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
        'El MPU9250 opera a 3.3V. Si usas Arduino Uno, necesitas conversor de nivel lógico.',
        'Dirección I2C: 0x68 (AD0 a GND) ó 0x69 (AD0 a VCC).',
        'El magnetómetro interno (AK8963) tiene dirección 0x0C.',
        'Para calibrar el magnetómetro, gira el sensor en forma de 8 durante unos segundos.',
        'Si usas el módulo GY-91, también incluye el BMP280 integrado.'
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
        'Se usa la resistencia pull-up interna del microcontrolador (INPUT_PULLUP).',
        'No necesita resistencia externa.',
        'El botón lee LOW cuando está pulsado y HIGH cuando no.',
        'Para evitar lecturas falsas por rebote, usa debounce (incluido en las funciones recomendadas).'
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
        'La mayoría de módulos OLED SSD1306 aceptan 3.3V y 5V.',
        'Dirección I2C más común: 0x3C. Algunos módulos usan 0x3D.',
        'Si la pantalla no muestra nada, prueba cambiar la dirección en el código.',
        'Resolución: 128×64 píxeles. Cada carácter con textSize(1) ocupa 6×8 píxeles.',
        'Puedes mostrar aprox. 21 caracteres por línea y 8 líneas con textSize(1).'
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
        '⚠ ¡PRECAUCIÓN! El relé puede controlar voltajes peligrosos (220V/110V AC). Extrema la seguridad.',
        'La mayoría de módulos relé usan lógica invertida: LOW = activado, HIGH = desactivado.',
        'Terminales NO (Normally Open): la carga se enciende al activar el relé.',
        'Terminales NC (Normally Closed): la carga se apaga al activar el relé.',
        'Si la placa opera a 3.3V (ESP32, ESP8266), verifica que el módulo relé sea compatible con 3.3V lógico.',
        'Alimenta el relé con 5V desde una fuente externa si la placa no suministra suficiente corriente.'
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
        'Corriente máxima: ~700mA total. Para relés o motores puede ser insuficiente.',
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
    description: 'Muestra las lecturas de sensores en la pantalla OLED',
    requiresAny: ['aht10', 'aht20', 'bmp280', 'mpu9250'],
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
    requiresAny: ['aht10', 'aht20', 'bmp280', 'mpu9250', 'oled-ssd1306'],
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
    requiresAny: ['aht10', 'aht20', 'bmp280', 'mpu9250'],
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
    requiresAny: ['aht10', 'aht20', 'bmp280', 'mpu9250'],
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
    id: 'temp-alert',
    name: 'Alerta de Temperatura',
    icon: '🔔',
    description: 'Avisa por serie cuando la temperatura supera un umbral configurable',
    requiresAny: ['aht10', 'aht20'],
    requiresAll: [],
    generateCode: () =>
`// ─── Función: Alerta de Temperatura ───
const float TEMP_UMBRAL = 30.0;  // °C — Modifica este valor según tu proyecto

void alertaTemperatura() {
  sensors_event_t humidity, temp;
  aht.getEvent(&humidity, &temp);

  if (temp.temperature > TEMP_UMBRAL) {
    Serial.println(F("⚠ ¡ALERTA! Temperatura alta:"));
    Serial.print(F("  Actual: "));
    Serial.print(temp.temperature);
    Serial.print(F(" °C (Umbral: "));
    Serial.print(TEMP_UMBRAL);
    Serial.println(F(" °C)"));
  }
}`,
    loopCall: 'alertaTemperatura();'
  },
  {
    id: 'relay-control',
    name: 'Control de Relé por Serie',
    icon: '🔌',
    description: 'Activa/desactiva el relé enviando comandos por el monitor serie',
    requiresAny: ['relay'],
    requiresAll: [],
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
    description: 'Activa el relé durante un tiempo configurable cuando se envía comando',
    requiresAny: ['relay'],
    requiresAll: [],
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
  }
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

      const interfaceClass = comp.interface === 'I2C' ? 'i2c' : (comp.interface === 'Digital' ? 'digital' : 'other');
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

  // Check conflict: AHT10 + AHT20 share same address
  if (componentId === 'aht10' && state.selectedComponents.includes('aht20')) {
    state.selectedComponents = state.selectedComponents.filter(c => c !== 'aht20');
  } else if (componentId === 'aht20' && state.selectedComponents.includes('aht10')) {
    state.selectedComponents = state.selectedComponents.filter(c => c !== 'aht10');
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

function toggleFunction(functionId) {
  const idx = state.selectedFunctions.indexOf(functionId);

  if (idx === -1) {
    state.selectedFunctions.push(functionId);
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
  const hasButton = selComp.includes('button');
  const hasRelay = selComp.includes('relay');
  if (hasButton || hasRelay) {
    code += `// ═══ Pines ═══\n`;
    if (hasButton && board.pins.buttonPin) {
      code += `#define PIN_BOTON ${board.pins.buttonPin}\n`;
    }
    if (hasRelay && board.pins.relayPin) {
      code += `#define PIN_RELE ${board.pins.relayPin}\n`;
    }
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
      let processedLine = line
        .replace('{SDA}', board.pins.sda)
        .replace('{SCL}', board.pins.scl)
        .replace('{BUTTON_PIN}', board.pins.buttonDefault || 'N/A')
        .replace('{RELAY_PIN}', board.pins.relayDefault || 'N/A');
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
    // Check for button-related functions that run every loop
    const hasToggle = selFuncs.includes('toggle-display');
    const hasButtonDebounce = selFuncs.includes('button-debounce') && !hasToggle;

    // Button functions run on every loop iteration
    if (hasToggle) {
      code += `  // Comprobar botón (sin delay)\n`;
      code += `  alternarModo();\n`;
      code += `\n`;
    } else if (hasButtonDebounce) {
      code += `  // Comprobar botón (sin delay)\n`;
      code += `  leerBoton();\n`;
      code += `\n`;
    }

    // Timed functions
    const timedFunctions = functions.filter(f =>
      f.id !== 'button-debounce' &&
      f.id !== 'toggle-display'
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

      code += fn.generateCode(selComp) + '\n\n';
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
      let boardPin = pin.board
        .replace('{SDA}', board.pins.sda)
        .replace('{SCL}', board.pins.scl)
        .replace('{BUTTON_PIN}', board.pins.buttonDefault || 'N/A')
        .replace('{RELAY_PIN}', board.pins.relayDefault || 'N/A');

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

  // Voltage warning
  if (board.voltage === '3.3V') {
    const has5vOnly = false; // All selected components work at 3.3V in our list
    html += `<div class="info-box">ℹ️ Tu placa opera a <strong>3.3V</strong>. Los módulos seleccionados son compatibles, pero verifica siempre las especificaciones de tu módulo concreto.</div>`;
  } else {
    const has3v3Comp = state.selectedComponents.some(id =>
      ['bmp280', 'mpu9250'].includes(id)
    );
    if (has3v3Comp) {
      html += `<div class="warning-box">⚠️ Tu placa opera a <strong>5V</strong>, pero algunos sensores seleccionados (BMP280, MPU9250) trabajan a 3.3V. Usa módulos con regulador integrado o añade un conversor de nivel lógico.</div>`;
    }
  }

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
    'SSD1306_SWITCHCAPVCC', 'SSD1306_WHITE'
  ];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  result = result.replace(typeRegex, (m) => ph('syn-type', m));

  // 1g. Known objects / constants
  const constants = [
    'Serial', 'Wire', 'display', 'aht', 'bmp', 'mpu',
    'SCREEN_WIDTH', 'SCREEN_HEIGHT', 'OLED_RESET',
    'PIN_BOTON', 'PIN_RELE', 'INTERVALO_LECTURA', 'TOTAL_MODOS',
    'TEMP_UMBRAL', 'DEBOUNCE_MS', 'DURACION_RELE'
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
