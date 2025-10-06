// Comprehensive Electronic Sensors & Components Database
// Based on the sensor types image provided

export interface SensorProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  category: string;
  subcategory: string;
  brand: string;
  rating: {
    average: number;
    count: number;
  };
  stock: number;
  discount?: number;
  specifications: {
    voltage: string;
    interface: string;
    range?: string;
    accuracy?: string;
    dimensions: string;
  };
  features: string[];
  applications: string[];
}

export const sensorProducts: SensorProduct[] = [
  // Temperature Sensors
  {
    _id: 'temp-001',
    name: 'NTC Thermistor Temperature Sensor',
    description: 'High precision temperature sensor for Arduino and microcontroller projects',
    price: 3.99,
    originalPrice: 5.99,
    mainImage: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Temperature Sensors',
    brand: 'Arduino Compatible',
    rating: { average: 4.6, count: 89 },
    stock: 150,
    discount: 33,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Analog',
      range: '-55°C to +125°C',
      accuracy: '±0.5°C',
      dimensions: '15mm x 10mm'
    },
    features: ['High accuracy', 'Wide temperature range', 'Low power consumption'],
    applications: ['Weather monitoring', 'HVAC systems', 'Industrial automation']
  },
  {
    _id: 'temp-002',
    name: 'DHT22 Digital Temperature Humidity Sensor',
    description: 'Digital sensor for measuring temperature and humidity with high accuracy',
    price: 8.99,
    mainImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Temperature Sensors',
    brand: 'DHT',
    rating: { average: 4.8, count: 234 },
    stock: 98,
    specifications: {
      voltage: '3.3V-6V',
      interface: 'Digital (Single-wire)',
      range: '-40°C to +80°C, 0-100% RH',
      accuracy: '±0.5°C, ±2% RH',
      dimensions: '15.1mm x 25mm x 7.7mm'
    },
    features: ['Digital output', 'Calibrated', 'Long-term stability'],
    applications: ['Weather stations', 'Data logging', 'Smart home systems']
  },
  {
    _id: 'temp-003',
    name: 'LM35 Precision Temperature Sensor',
    description: 'Linear temperature sensor with Celsius output',
    price: 4.99,
    originalPrice: 6.99,
    mainImage: 'https://images.unsplash.com/photo-1563829155-d7d8b0b5aa43?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Temperature Sensors',
    brand: 'Texas Instruments',
    rating: { average: 4.7, count: 156 },
    stock: 120,
    discount: 29,
    specifications: {
      voltage: '4V-30V',
      interface: 'Analog',
      range: '-55°C to +150°C',
      accuracy: '±0.25°C',
      dimensions: 'TO-92 Package'
    },
    features: ['Linear output', 'No external calibration', 'Low self-heating'],
    applications: ['Temperature control', 'Thermal protection', 'Process monitoring']
  },

  // IR Sensors
  {
    _id: 'ir-001',
    name: 'IR Infrared Obstacle Avoidance Sensor',
    description: 'Infrared sensor module for obstacle detection and avoidance',
    price: 4.99,
    originalPrice: 7.99,
    mainImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'IR Sensors',
    brand: 'Generic',
    rating: { average: 4.4, count: 142 },
    stock: 210,
    discount: 38,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Digital',
      range: '2cm-30cm',
      accuracy: '±1cm',
      dimensions: '32mm x 14mm'
    },
    features: ['Adjustable sensitivity', 'LED indicators', 'Fast response'],
    applications: ['Robot navigation', 'Automatic doors', 'Security systems']
  },
  {
    _id: 'ir-002',
    name: 'IR Reflective Optical Sensor Module',
    description: 'Infrared reflective sensor for line following and object detection',
    price: 3.49,
    mainImage: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'IR Sensors',
    brand: 'TCRT5000',
    rating: { average: 4.3, count: 98 },
    stock: 180,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Analog/Digital',
      range: '1mm-15mm',
      accuracy: '±0.5mm',
      dimensions: '32mm x 14mm'
    },
    features: ['Reflective type', 'Compact design', 'High sensitivity'],
    applications: ['Line following robots', 'Encoder feedback', 'Object counting']
  },

  // Ultrasonic Sensors
  {
    _id: 'ultra-001',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    description: 'High accuracy ultrasonic ranging module for distance measurement',
    price: 12.99,
    originalPrice: 15.99,
    mainImage: 'https://images.unsplash.com/photo-1518346001043-13c7b4502b5a?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Ultrasonic Sensors',
    brand: 'HC-SR04',
    rating: { average: 4.8, count: 324 },
    stock: 85,
    discount: 19,
    specifications: {
      voltage: '5V',
      interface: 'Digital (Trigger/Echo)',
      range: '2cm-400cm',
      accuracy: '±3mm',
      dimensions: '45mm x 20mm x 15mm'
    },
    features: ['Non-contact measurement', 'Stable performance', 'Easy to use'],
    applications: ['Distance measurement', 'Robot navigation', 'Level monitoring']
  },

  // Motion Sensors
  {
    _id: 'motion-001',
    name: 'MPU6050 6-Axis Gyroscope Accelerometer',
    description: '6DOF motion tracking device with gyroscope and accelerometer',
    price: 14.99,
    mainImage: 'https://images.unsplash.com/photo-1608467017651-82b7c34e46e4?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Motion Sensors',
    brand: 'InvenSense',
    rating: { average: 4.9, count: 278 },
    stock: 67,
    specifications: {
      voltage: '2.375V-3.46V',
      interface: 'I2C',
      range: '±2/±4/±8/±16g, ±250/±500/±1000/±2000°/s',
      accuracy: '16-bit ADC',
      dimensions: '21mm x 16mm'
    },
    features: ['6-axis motion tracking', 'Digital Motion Processor', 'Low power'],
    applications: ['Drone stabilization', 'Gaming controllers', 'Motion capture']
  },
  {
    _id: 'motion-002',
    name: 'PIR Motion Sensor Module',
    description: 'Passive Infrared sensor for motion detection',
    price: 6.99,
    originalPrice: 9.99,
    mainImage: 'https://images.unsplash.com/photo-1563829155-d7d8b0b5aa43?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Motion Sensors',
    brand: 'HC-SR501',
    rating: { average: 4.7, count: 156 },
    stock: 95,
    discount: 30,
    specifications: {
      voltage: '4.5V-20V',
      interface: 'Digital',
      range: '3m-7m',
      accuracy: '±10°',
      dimensions: '32mm x 24mm'
    },
    features: ['Wide detection angle', 'Adjustable sensitivity', 'Low power'],
    applications: ['Security systems', 'Automatic lighting', 'Home automation']
  },

  // Gas Sensors
  {
    _id: 'gas-001',
    name: 'MQ-2 Combustible Gas Sensor',
    description: 'Gas sensor for detecting LPG, propane, hydrogen, and smoke',
    price: 11.99,
    mainImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Gas Sensors',
    brand: 'MQ Series',
    rating: { average: 4.5, count: 167 },
    stock: 54,
    specifications: {
      voltage: '5V',
      interface: 'Analog/Digital',
      range: '300-10000ppm',
      accuracy: '±10%',
      dimensions: '32mm x 22mm'
    },
    features: ['Wide detecting scope', 'Stable performance', 'Long life'],
    applications: ['Gas leak detection', 'Fire alarm', 'Industrial safety']
  },

  // Light Sensors
  {
    _id: 'light-001',
    name: 'LDR Light Dependent Resistor',
    description: 'Photoresistor sensor for light intensity measurement',
    price: 2.99,
    mainImage: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Light Sensors',
    brand: 'GL5528',
    rating: { average: 4.3, count: 89 },
    stock: 300,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Analog',
      range: '1-100000 Lux',
      accuracy: '±20%',
      dimensions: '5mm diameter'
    },
    features: ['Light sensitive', 'Simple to use', 'Cost effective'],
    applications: ['Automatic lighting', 'Solar trackers', 'Camera exposure']
  },

  // Soil Sensors
  {
    _id: 'soil-001',
    name: 'Soil Moisture Sensor Module',
    description: 'Capacitive soil moisture sensor for plant monitoring',
    price: 7.99,
    originalPrice: 10.99,
    mainImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Environmental Sensors',
    brand: 'Capacitive',
    rating: { average: 4.6, count: 134 },
    stock: 76,
    discount: 27,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Analog',
      range: '0-100% moisture',
      accuracy: '±3%',
      dimensions: '98mm x 23mm'
    },
    features: ['Corrosion resistant', 'No direct soil contact', 'Long lifespan'],
    applications: ['Smart irrigation', 'Plant monitoring', 'Agriculture automation']
  },

  // Time Modules
  {
    _id: 'time-001',
    name: 'DS3231 Real Time Clock Module',
    description: 'High precision real-time clock with temperature compensation',
    price: 9.99,
    originalPrice: 12.99,
    mainImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Time Modules',
    brand: 'Maxim',
    rating: { average: 4.7, count: 203 },
    stock: 78,
    discount: 23,
    specifications: {
      voltage: '2.3V-5.5V',
      interface: 'I2C',
      range: '1900-2099',
      accuracy: '±2ppm (±1 minute/year)',
      dimensions: '38mm x 22mm'
    },
    features: ['Battery backup', 'Temperature compensated', 'Alarm functions'],
    applications: ['Data logging', 'Scheduling systems', 'Clock displays']
  },

  // Water Sensors
  {
    _id: 'water-001',
    name: 'Water Flow Sensor YF-S201',
    description: 'Hall effect water flow sensor for liquid flow measurement',
    price: 13.99,
    mainImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Flow Sensors',
    brand: 'YF-S201',
    rating: { average: 4.5, count: 112 },
    stock: 42,
    specifications: {
      voltage: '5V-24V',
      interface: 'Digital (Pulse)',
      range: '1-30L/min',
      accuracy: '±3%',
      dimensions: '60mm x 35mm x 35mm'
    },
    features: ['Hall effect sensor', 'Corrosion resistant', 'Easy installation'],
    applications: ['Water meters', 'Flow monitoring', 'Irrigation systems']
  },

  // Heart Rate Sensors
  {
    _id: 'heart-001',
    name: 'Pulse Heart Rate Sensor Module',
    description: 'Optical heart rate sensor for pulse detection',
    price: 15.99,
    originalPrice: 19.99,
    mainImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Biometric Sensors',
    brand: 'Generic',
    rating: { average: 4.4, count: 87 },
    stock: 35,
    discount: 20,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Analog',
      range: '30-200 BPM',
      accuracy: '±2 BPM',
      dimensions: '16mm x 24mm'
    },
    features: ['Optical sensor', 'Real-time monitoring', 'Easy to use'],
    applications: ['Fitness trackers', 'Health monitoring', 'Medical devices']
  },

  // Alcohol Sensors
  {
    _id: 'alcohol-001',
    name: 'MQ-3 Alcohol Gas Sensor',
    description: 'Semiconductor sensor for alcohol vapor detection',
    price: 12.99,
    mainImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Gas Sensors',
    brand: 'MQ Series',
    rating: { average: 4.3, count: 78 },
    stock: 61,
    specifications: {
      voltage: '5V',
      interface: 'Analog/Digital',
      range: '0.05-10mg/L',
      accuracy: '±10%',
      dimensions: '32mm x 22mm'
    },
    features: ['High sensitivity', 'Fast response', 'Stable characteristics'],
    applications: ['Breathalyzers', 'Safety systems', 'Industrial monitoring']
  },

  // Color Sensors
  {
    _id: 'color-001',
    name: 'TCS3200 Color Recognition Sensor',
    description: 'RGB color sensor with frequency output',
    price: 16.99,
    originalPrice: 21.99,
    mainImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Color Sensors',
    brand: 'TCS3200',
    rating: { average: 4.6, count: 145 },
    stock: 48,
    discount: 23,
    specifications: {
      voltage: '2.7V-5.5V',
      interface: 'Digital (Frequency)',
      range: 'Full RGB spectrum',
      accuracy: '±5%',
      dimensions: '28.5mm x 28.5mm'
    },
    features: ['RGB and clear photodiodes', 'Programmable gains', 'TTL interface'],
    applications: ['Color sorting', 'LED lighting', 'Color matching']
  },

  // Smoke Sensors
  {
    _id: 'smoke-001',
    name: 'MQ-2 Smoke Detection Sensor',
    description: 'Gas sensor for smoke and combustible gas detection',
    price: 10.99,
    mainImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Gas Sensors',
    brand: 'MQ Series',
    rating: { average: 4.5, count: 189 },
    stock: 72,
    specifications: {
      voltage: '5V',
      interface: 'Analog/Digital',
      range: '300-10000ppm',
      accuracy: '±5%',
      dimensions: '32mm x 22mm'
    },
    features: ['High sensitivity to smoke', 'Stable performance', 'Long service life'],
    applications: ['Fire alarms', 'Gas leak detection', 'Safety monitoring']
  },

  // Touch Sensors
  {
    _id: 'touch-001',
    name: 'Capacitive Touch Sensor Module',
    description: 'Touch-sensitive switch sensor module',
    price: 5.99,
    originalPrice: 8.99,
    mainImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Touch Sensors',
    brand: 'TTP223',
    rating: { average: 4.4, count: 156 },
    stock: 123,
    discount: 33,
    specifications: {
      voltage: '2.0V-5.5V',
      interface: 'Digital',
      range: 'Touch detection',
      accuracy: '±1mm',
      dimensions: '24mm x 24mm'
    },
    features: ['Capacitive sensing', 'Low power', 'Toggle/momentary modes'],
    applications: ['Touch switches', 'Control panels', 'Interactive projects']
  },

  // Flex Sensors
  {
    _id: 'flex-001',
    name: 'Flex Bend Sensor 4.5 inch',
    description: 'Flexible resistor sensor for bend and flex detection',
    price: 18.99,
    originalPrice: 24.99,
    mainImage: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Flex Sensors',
    brand: 'Spectra Symbol',
    rating: { average: 4.3, count: 67 },
    stock: 28,
    discount: 24,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Analog',
      range: '0-90° bend',
      accuracy: '±5°',
      dimensions: '112mm x 6.35mm'
    },
    features: ['Flexible substrate', 'Variable resistance', 'Durable'],
    applications: ['Gesture recognition', 'Robotic joints', 'Virtual reality']
  },

  // Solar Sensors
  {
    _id: 'solar-001',
    name: 'Solar Cell Light Sensor Panel',
    description: 'Photovoltaic cell for light sensing and energy harvesting',
    price: 8.99,
    mainImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Light Sensors',
    brand: 'Polycrystalline',
    rating: { average: 4.2, count: 93 },
    stock: 64,
    specifications: {
      voltage: '0.5V-6V',
      interface: 'Analog',
      range: '10-100000 Lux',
      accuracy: '±15%',
      dimensions: '60mm x 60mm'
    },
    features: ['Dual purpose', 'Weather resistant', 'High efficiency'],
    applications: ['Solar trackers', 'Light measurement', 'Energy harvesting']
  },

  // Metal Detector Sensors
  {
    _id: 'metal-001',
    name: 'Inductive Proximity Metal Detector',
    description: 'Non-contact metal detection sensor module',
    price: 21.99,
    originalPrice: 27.99,
    mainImage: 'https://images.unsplash.com/photo-1518346001043-13c7b4502b5a?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Metal Detectors',
    brand: 'LJ12A3',
    rating: { average: 4.6, count: 112 },
    stock: 39,
    discount: 21,
    specifications: {
      voltage: '6V-36V',
      interface: 'Digital (NPN/PNP)',
      range: '4mm detection',
      accuracy: '±0.1mm',
      dimensions: '50mm x 12mm'
    },
    features: ['Non-contact detection', 'High reliability', 'Industrial grade'],
    applications: ['Position sensing', 'Counting systems', 'Automation']
  },

  // Vibration Sensors
  {
    _id: 'vibration-001',
    name: 'SW-420 Vibration Sensor Module',
    description: 'Digital vibration and shock detection sensor',
    price: 4.99,
    originalPrice: 6.99,
    mainImage: 'https://images.unsplash.com/photo-1563829155-d7d8b0b5aa43?w=400&h=400&fit=crop&crop=center',
    category: 'Electronic Sensors',
    subcategory: 'Vibration Sensors',
    brand: 'SW-420',
    rating: { average: 4.3, count: 78 },
    stock: 89,
    discount: 29,
    specifications: {
      voltage: '3.3V-5V',
      interface: 'Digital',
      range: 'Vibration detection',
      accuracy: 'Adjustable sensitivity',
      dimensions: '32mm x 14mm'
    },
    features: ['Adjustable sensitivity', 'LED indicators', 'Compact size'],
    applications: ['Security alarms', 'Earthquake detection', 'Machine monitoring']
  }
];

// Sensor categories for easy filtering
export const sensorCategories = [
  'Temperature Sensors',
  'IR Sensors',
  'Ultrasonic Sensors',
  'Motion Sensors',
  'Gas Sensors',
  'Light Sensors',
  'Environmental Sensors',
  'Time Modules',
  'Flow Sensors',
  'Biometric Sensors',
  'Color Sensors',
  'Touch Sensors',
  'Flex Sensors',
  'Metal Detectors',
  'Vibration Sensors'
];

// Featured sensor brands
export const sensorBrands = [
  'Arduino Compatible',
  'DHT',
  'Texas Instruments',
  'InvenSense',
  'MQ Series',
  'Maxim',
  'Spectra Symbol',
  'Generic'
];