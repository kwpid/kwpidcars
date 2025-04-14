function debugLog(...args) {
    if (localStorage.getItem('debugMode') !== 'true') return;
    
    try {
        // Get timestamp
        const now = new Date();
        const timestamp = now.toISOString();
        const localTime = now.toLocaleString();
        
        // Get call stack information
        const stack = new Error().stack;
        const callerLine = stack.split('\n')[2]?.trim() || 'unknown';
        
        // Stringify objects and add type information
        const processedArgs = args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
                try {
                    return `${arg.constructor.name}: ${JSON.stringify(arg, replacer, 2)}`;
                } catch (e) {
                    return `[Unstringifiable ${typeof arg}]`;
                }
            }
            return `${typeof arg}: ${String(arg)}`;
        });
        
        // Create debug info object
        const debugInfo = {
            timestamp,
            localTime,
            location: callerLine,
            userAgent: navigator.userAgent,
            screen: `${window.screen.width}x${window.screen.height}`,
            window: `${window.innerWidth}x${window.innerHeight}`,
            memory: window.performance?.memory 
                ? `${Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024)}MB` 
                : 'N/A',
            data: processedArgs
        };
        
        // Console output (with color coding)
        console.groupCollapsed(`%c[DEBUG] ${timestamp}`, 'color: #4CAF50; font-weight: bold');
        console.log(`%cLocation:`, 'font-weight: bold', callerLine);
        console.log(`%cEnvironment:`, 'font-weight: bold', 
            `${navigator.userAgent} | ${window.screen.width}x${window.screen.height} screen | ${window.innerWidth}x${window.innerHeight} window`);
        console.log(`%cArguments:`, 'font-weight: bold', ...processedArgs);
        console.groupEnd();
        
        // Optional debug popup (can be toggled in settings)
        if (localStorage.getItem('debugPopupEnabled') === 'true') {
            showDebugPopup(debugInfo);
        }
        
        // Optional remote logging
        if (localStorage.getItem('remoteLoggingEnabled') === 'true') {
            logToServer(debugInfo);
        }
        
    } catch (e) {
        console.error('[DEBUG LOGGER ERROR]', e);
    }
}

// Helper function to handle circular references in stringification
function replacer(key, value) {
    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack
        };
    }
    return value;
}

/**
 * Shows debug information in a popup window
 * @param {object} debugInfo 
 */
function showDebugPopup(debugInfo) {
    const popup = window.open('', 'DebugPopup', 'width=600,height=400');
    if (!popup) return; // Popup blocked
    
    popup.document.title = 'Debug Information';
    popup.document.body.style.fontFamily = 'monospace';
    popup.document.body.style.padding = '10px';
    popup.document.body.style.whiteSpace = 'pre';
    
    popup.document.body.innerHTML = `
        <h2>Debug Information - ${debugInfo.localTime}</h2>
        <p><strong>Location:</strong> ${debugInfo.location}</p>
        <p><strong>User Agent:</strong> ${debugInfo.userAgent}</p>
        <p><strong>Screen:</strong> ${debugInfo.screen} (Window: ${debugInfo.window})</p>
        <p><strong>Memory:</strong> ${debugInfo.memory}</p>
        <h3>Data:</h3>
        <div>${debugInfo.data.map(arg => escapeHtml(arg)).join('\n\n')}</div>
    `;
}

function escapeHtml(unsafe) {
    return unsafe.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
  function generateUserID() {
    const timestamp = Date.now(); // Precise to the millisecond
    const random = Math.floor(Math.random() * 100000); // Add randomness
    return `user-${timestamp}-${random}`;
}

function getOrCreateUserID() {
    let userID = localStorage.getItem('userID');
    if (!userID) {
        userID = generateUserID();
        localStorage.setItem('userID', userID);
    }
    return userID;
}    
        // Game Data
const gameData = {
            player: {
        balance: 100000,
        inventory: [],
        transactions: [],  // Add this line
        stats: {          // Add this object
            packsOpened: 0,
            peakCash: 100000,
            playTimeMinutes: 0,
            carsCollected: 0
        },
              
    },
     

          
  "cars": [
    {
      "carId": 1,
      "brand": "McLaren",
      "name": "2016 P1",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/mclarenp1orange.jpg?v=1744141375195",
      "stats": { "PWR": 89, "SPD": 83, "HDL": 79 },
      "value": 25000,
      "storage": 3,
      "rarity": "legendary",
      "colors": [
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/mclarenp1black.jpg?v=1744141381261", "colorCode": "#000000" },
        { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/mclarenp1white.jpg?v=1744141376491", "colorCode": "#ffffff" },
        { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/mclarenp1blue.jpg?v=1744141378160", "colorCode": "#01b300" },
        { "name": "Orange", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/mclarenp1white.jpg?v=1744141376491", "colorCode": "#ffad00" }
      ],
      "tags": [""],
      "description": "The McLaren Senna is the ultimate expression of McLaren's motorsport DNA. With brutal power and aerodynamic performance, it's a road-legal track car that delivers an unparalleled driving experience."
    },
    {
      "carId": 2,
      "brand": "Ferrari",
      "name": "1987 F40",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(36).jpg?v=1743970190003",
      "stats": { "PWR": 85, "SPD": 87, "HDL": 82 },
      "value": 24000,
      "storage": 3,
      "rarity": "legendary",
      "colors": [
        { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(36).jpg?v=1743970190003", "colorCode": "#FF0000" },
        { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(37).jpg?v=1743970241943", "colorCode": "#ffffff" },
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(38).jpg?v=1743970279939", "colorCode": "#000000" },
        { "name": "Yellow", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(39).jpg?v=1743970307297", "colorCode": "#fad92e" }
      ],
      "tags": [],
      "description": "The Ferrari 488 Pista is a track-focused version of the 488 GTB, featuring enhanced aerodynamics and a more powerful twin-turbo V8 engine that delivers exhilarating performance."
    },
    {
      "carId": 3,
      "brand": "Porsche",
      "name": "2022 911 GT",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/porschegrey.jpg?v=1744142027861",
      "stats": { "PWR": 82, "SPD": 80, "HDL": 90 },
      "value": 18000,
      "storage": 4,
      "rarity": "rare",
      "colors": [
        { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/porschered.jpg?v=1744142042108", "colorCode": "#FF0000" },
        { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/porschewhite.jpg?v=1744142020942", "colorCode": "#ffffff" },
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/porscheblack.jpg?v=1744142019631", "colorCode": "#000000" },
        { "name": "Grey", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/porschegrey.jpg?v=1744142027861", "colorCode": "#414141" },
        { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/porscheblue.jpg?v=1744142019007", "colorCode": "#440086" }
      ],
      "rims": [
        {
            "name": "Standard",
            "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0hq_Kleki.png?v=1743950334558",
            "price": 0
        },
        {
            "name": "Sport",
            "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0hj_Kleki.png?v=1743950336394",
            "price": 2500
        }
      ],
      "tags": [""],
      "description": "The Porsche 911 GT3 RS is the ultimate expression of Porsche's racing pedigree for the road. With a high-revving naturally aspirated engine and precision handling, it's a driver's dream."
    },
    {
      "carId": 4,
      "brand": "Lamborghini",
      "name": "2016 Aventador",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(24).jpg?v=1743920514131",
      "stats": { "PWR": 92, "SPD": 88, "HDL": 75 },
      "value": 28000,
      "storage": 3,
      "rarity": "mythic",
      "colors": [
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(21).jpg?v=1743920508594", "colorCode": "#000000" },
        { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(22).jpg?v=1743920524098", "colorCode": "#ffffff" },
        { "name": "Green", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(24).jpg?v=1743920514131", "colorCode": "#006b3f" },
        { "name": "Yellow", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(25).jpg?v=1743920510912", "colorCode": "#ffce00" },
        { "name": "Purple", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(23).jpg?v=1743920517417", "colorCode": "#440086" }
      ],
      "tags": [],
      "description": "The Lamborghini Aventador SVJ combines extreme aerodynamics with a monstrous V12 engine. Its active suspension and four-wheel drive system make it surprisingly capable on both road and track."
    },
    {
      "carId": 5,
      "brand": "Toyota",
      "name": "2019 Supra MK5",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/suprablue.jpg?v=1744141212923",
      "stats": { "PWR": 75, "SPD": 78, "HDL": 81 },
      "value": 12000,
      "storage": 4,
      "rarity": "uncommon",
      "colors": [
        { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot.jpg?v=1743918872491", "colorCode": "#FF0000" },
        { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/suprablue.jpg?v=1744141212923", "colorCode": "#0000FF" },
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/suprablack.jpg?v=1744141154865", "colorCode": "#000000" },
        { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/suprawhite.jpg?v=1744141108125", "colorCode": "#FFFFFF" },
        { "name": "Orange", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/supraorange.jpg?v=1744141194358", "colorCode": "#ffad00" }
      ],
      "tags": [],
      "description": "The reborn Toyota Supra combines Japanese reliability with BMW engineering. Its turbocharged inline-six delivers smooth power, while the balanced chassis offers engaging handling."
    },
    {
      "carId": 6,
      "brand": "Bugatti",
      "name": "2016 Chiron",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(40).jpg?v=1743970387620",
      "stats": { "PWR": 95, "SPD": 97, "HDL": 70 },
      "value": 30000,
      "storage": 3,
      "rarity": "mythic",
      "colors": [
        { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(41).jpg?v=1743970522352", "colorCode": "#FF0000" },
        { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(40).jpg?v=1743970387620", "colorCode": "#0000FF" },
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(42).jpg?v=1743970587153", "colorCode": "#000000" }
      ],
      "tags": [],
      "description": "The Bugatti Chiron Super Sport represents the pinnacle of automotive engineering. With a quad-turbo W16 engine producing over 1500 horsepower, it redefines the limits of speed and luxury."
    },
    {
      "carId": 7,
      "brand": "Nissan",
      "name": "2017 GT-R",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/gtrred.jpg?v=1744141606211",
      "stats": { "PWR": 80, "SPD": 82, "HDL": 84 },
      "value": 15000,
      "rarity": "rare",
      "colors": [
        { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/gtrred.jpg?v=1744141606211", "colorCode": "#FF0000" },
        { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/gtrwhite.jpg?v=1744141603334", "colorCode": "#FFFFFF" },
        { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/gtrblack.jpg?v=1744141602068", "colorCode": "#000000" }
      ],
      "storage": 4,
      "tags": [],
      "description": "The Nissan GT-R Nismo is the embodiment of Japanese performance engineering, offering thrilling speed, razor-sharp handling, and aggressive design all in one package."
    },
    {
      "carId": 8,
      "brand": "Chevrolet",
      "name": "2004 Corvette (C5)",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(26).jpg?v=1743921673727",
      "stats": { "PWR": 80, "SPD": 82, "HDL": 84 },
      "value": 14000,
      "storage": 3,
      "rarity": "rare",
      "colors": [
        {
          "name": "Red",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(29).jpg?v=1743921677209",
          "colorCode": "#FF0000"
        },
        {
          "name": "White",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(28).jpg?v=1743921679774",
          "colorCode": "#FFFFFF"
        },
        {
          "name": "Grey",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(30).jpg?v=1743921675325",
          "colorCode": "#525252"
        },
        {
          "name": "Yellow",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(26).jpg?v=1743921673727",
          "colorCode": "#e0b500"
        },
        {
          "name": "Black",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(27).jpg?v=1743921683594",
          "colorCode": "#000000"
        }
      ],
      "tags": [],
      "description": "The 2004 Chevrolet Corvette (C5) blends American muscle with refined performance. Known for its sleek design and lightweight chassis, the C5 delivers impressive speed and handling on both road and track."
    },
    {
      "carId": 9,
      "brand": "Honda",
      "name": "1997 Civic",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(35).jpg?v=1743969928244",
      "stats": { "PWR": 70, "SPD": 72, "HDL": 74 },
      "value": 8000,
      "storage": 5,
      "rarity": "common",
      "colors": [
        {
          "name": "Red",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(35).jpg?v=1743969928244",
          "colorCode": "#FF0000"
        },
        {
          "name": "White",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(33).jpg?v=1743969924147",
          "colorCode": "#FFFFFF"
        },
        {
          "name": "Grey",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(32).jpg?v=1743969878829",
          "colorCode": "#525252"
        },
        {
          "name": "Blue",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(34).jpg?v=1743969926255",
          "colorCode": "#0056a5"
        }
      ],
      "tags": [],
      "description": "The classic Honda Civic represents affordable performance and tuner culture. While modest in stock form, its lightweight chassis and aftermarket support make it a favorite among enthusiasts."
    },
    {
      "carId": 10,
      "brand": "Dodge",
      "name": "2003 SRT4 ACR",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(43).jpg?v=1743982186014",
      "stats": { "PWR": 54, "SPD": 66, "HDL": 45 },
      "value": 0,
      "storage": 6,
      "rarity": "common",
      "colors": [
        {
          "name": "Blue",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(43).jpg?v=1743982186014",
          "colorCode": "#0056a5"
        }
      ],
      "tags": ["off-sale", "limited"],
      "description": "A shining light to those who want an authentic SRT by Dodge. Only obtainable via code."
    },
    {
      "carId": 11,
      "brand": "Dodge",
      "name": "2022 Dodge Hellkitty",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/babybluecharger.jpg?v=1743984485279",
      "stats": { "PWR": 99, "SPD": 99, "HDL": 99 },
      "value": 0,
      "storage": 10,
      "rarity": "mythic",
      "colors": [
        {
          "name": "Blue",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/babybluecharger.jpg?v=1743984485279",
          "colorCode": "#6df2ff"
        }
      ],
      "tags": ["off-sale"],
      "description": "Made of love, softness and kindess. Developer vehicle."
    },
    {
      "carId": 12,
      "brand": "BMW",
      "name": "1986 M3 Series",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot.jpg?v=1744043529621",
      "stats": { "PWR": 78, "SPD": 80, "HDL": 86 },
      "value": 16000,
      "storage": 4,
      "rarity": "rare",
      "colors": [
        {
          "name": "Red",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot.jpg?v=1744043529621",
          "colorCode": "#FF0000"
        },
        {
          "name": "White",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(2).jpg?v=1744043532366",
          "colorCode": "#FFFFFF"
        },
        {
          "name": "Black",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(3).jpg?v=1744043540513",
          "colorCode": "#000000"
        },
      ],
      "tags": [""],
      "description": "The BMW M3 Series is a symbol of balanced performance and everyday practicality. With razor-sharp handling and a turbocharged inline-six engine, the M3 delivers a thrilling drive without compromising comfort."
    },
    {
      "carId": 13,
      "brand": "BMW",
      "name": "1986 M3 Evolution",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(4).jpg?v=1744043543823",
      "stats": { "PWR": 82, "SPD": 84, "HDL": 90 },
      "value": 37000,
      "storage": 5,
      "rarity": "mythic",
      "colors": [
        {
          "name": "White",
          "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(4).jpg?v=1744043543823",
          "colorCode": "#FFFFFF"
        },
        
      ],
      "tags": [""],
      "description": "This limited-edition 1986 BMW M3 Evolution captures the raw essence of motorsport heritage. Only available for a short time, this variant combines legendary handling with enhanced exclusivity, making it a must-have for collectors and enthusiasts alike."
    },
    {
    "carId": 14,
    "brand": "Toyota",
    "name": "2013 Corolla",
    "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(6).jpg?v=1744046379883",
    "stats": { "PWR": 45, "SPD": 50, "HDL": 60 },
    "value": 3500,
    "storage": 5,
    "rarity": "common",
    "colors": [
      {
        "name": "White",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(6).jpg?v=1744046379883",
        "colorCode": "#FFFFFF"
      },
      {
        "name": "Black",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(8).jpg?v=1744046392308",
        "colorCode": "#131313"
      },
      {
        "name": "Grey",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(7).jpg?v=1744046386624",
        "colorCode": "#626262"
      },
    ],
    "tags": [],
    "description": "A reliable and fuel-efficient compact sedan, perfect for daily commuting and practical urban driving."
  },
  {
    "carId": 15,
    "brand": "Ford",
    "name": "2009 Focus",
    "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(9).jpg?v=1744046573552",
    "stats": { "PWR": 50, "SPD": 55, "HDL": 58 },
    "value": 4200,
    "storage": 6,
    "rarity": "common",
    "colors": [
      {
        "name": "Blue",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(9).jpg?v=1744046573552",
        "colorCode": "#0056a5"
      },
      {
        "name": "Green",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(10).jpg?v=1744046578587",
        "colorCode": "#5ea968"
      },
      {
        "name": "White",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(11).jpg?v=1744046582232",
        "colorCode": "#FFFFFF"
      },
    ],
    "tags": [],
    "description": "Affordable and compact, the 2012 Focus offers solid handling and modern features for everyday driving needs."
  },
  {
    "carId": 16,
    "brand": "Ford",
    "name": "2024 F-150",
    "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(15).jpg?v=1744047252094",
    "stats": { "PWR": 65, "SPD": 60, "HDL": 55 },
    "value": 6800,
    "storage": 8,
    "rarity": "common",
    "colors": [
      {
        "name": "Black",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(12).jpg?v=1744047242863",
        "colorCode": "#000000"
      },
      {
        "name": "White",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(14).jpg?v=1744047255773",
        "colorCode": "#FFFFFF"
      },
      {
        "name": "Blue",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(15).jpg?v=1744047252094",
        "colorCode": "#0056a5"
      },
      {
        "name": "Orange",
        "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(16).jpg?v=1744047259207",
        "colorCode": "#d37200"
      },
    ],
    "tags": [],
    "description": "Built for both work and family life, the 2024 Ford F-150 delivers modern tech, solid towing power, and practical storage—an ideal choice for those who need strength and reliability."
  },
  {
  "carId": 17,
  "brand": "Chevrolet",
  "name": "2013 Malibu",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(47).jpg?v=1744057317381",
  "stats": { "PWR": 58, "SPD": 54, "HDL": 56 },
  "value": 4700,
  "storage": 6,
  "rarity": "common",
  "colors": [
    { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(47).jpg?v=1744057317381", "colorCode": "#1E90FF" },
    { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(46).jpg?v=1744057312821", "colorCode": "#FFFFFF" },
    { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(45).jpg?v=1744057324870", "colorCode": "#000000" },
    { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(44).jpg?v=1744057321035", "colorCode": "#c70000" },
    { "name": "Yellow", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(48).jpg?v=1744057314969", "colorCode": "#ffd836" },
  ],
  "tags": [],
  "description": "A midsize sedan that blends comfort, performance, and practicality at an affordable price."
},
{
  "carId": 18,
  "brand": "Pontiac",
  "name": "2004 Grand Prix",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(49).jpg?v=1744057613901",
  "stats": { "PWR": 60, "SPD": 57, "HDL": 54 },
  "value": 4300,
  "storage": 6,
  "rarity": "common",
  "colors": [
    {
      "name": "Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(50).jpg?v=1744057654643",
      "colorCode": "#B22222"
    },
    {
      "name": "Silver",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(49).jpg?v=1744057613901",
      "colorCode": "#C0C0C0"
    },
    {
      "name": "LightBlue",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(51).jpg?v=1744057656731",
      "colorCode": "#5297c2"
    },
    
  ],
  "tags": [],
  "description": "The 2004 Pontiac Grand Prix offers sporty looks with V6 power, sharp handling, and a roomy sedan layout for daily use with a dash of attitude."
},
{
  "carId": 19,
  "brand": "Subaru",
  "name": "2006 Outback",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(52).jpg?v=1744057812144",
  "stats": { "PWR": 62, "SPD": 60, "HDL": 65 },
  "value": 5600,
  "storage": 8,
  "rarity": "uncommon",
  "colors": [
  {
      "name": "Grey",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(52).jpg?v=1744057812144",
      "colorCode": "#556B2F"
    },
    {
      "name": "Blue",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(52).jpg?v=1744057812144",
      "colorCode": "#5297c2"
    },
    {
      "name": "Beige",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(53).jpg?v=1744057867165",
      "colorCode": "#D2B48C"
    }
  ],
  "tags": [],
  "description": "Reliable and versatile, the 2006 Subaru Outback is a rugged wagon-SUV blend with all-wheel drive and excellent handling for outdoor lifestyles."
},
{
  "carId": 20,
  "brand": "Ford",
  "name": "2025 Mustang",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(55).jpg?v=1744058075026",
  "stats": { "PWR": 85, "SPD": 88, "HDL": 76 },
  "value": 9500,
  "storage": 4,
  "rarity": "uncommon",
  "colors": [
    {
      "name": "Race Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(55).jpg?v=1744058075026",
      "colorCode": "#C8102E"
    },
    {
      "name": "Shadow Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(56).jpg?v=1744058098610",
      "colorCode": "#0A0A0A"
    },
    {
      "name": "Iconic Silver",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(57).jpg?v=1744058120378",
      "colorCode": "#A2AAAD"
    }
  ],
  "tags": [""],
  "description": "The all-new 2025 Mustang fuses classic muscle with modern tech—boasting high power, sharp handling, and unmistakable style for thrill-seeking drivers."
},
{
  "carId": 21,
  "brand": "Plymouth",
  "name": "1970 Barracuda Streetuned 1300 HP",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(61).jpg?v=1744058632242",
  "stats": { "PWR": 98, "SPD": 95, "HDL": 80 },
  "value": 57000,
  "storage": 2,
  "rarity": "mythic",
  "colors": [
    {
      "name": "Race Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(60).jpg?v=1744058633706",
      "colorCode": "#C8102E"
    },
    {
      "name": "Shadow Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(62).jpg?v=1744058829808",
      "colorCode": "#0A0A0A"
    },
    {
      "name": "Grey",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(61).jpg?v=1744058632242",
      "colorCode": "#A2AAAD"
    },
    {
      "name": "Iconic Silver",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(59).jpg?v=1744058635300",
      "colorCode": "#ebf1f3"
    }
  ],
  "tags": ["limited"],
  "description": "A fire-breathing legend reborn — this 1300 HP 'Cuda is a street-built monster tuned to perfection. With drag-strip muscle, track-ready handling, and a body that oozes vintage menace, it’s not just a car — it’s a statement. Only the bold will tame it."
},
{
  "carId": 22,
  "brand": "Chevrolet",
  "name": "2024 C8 Corvette Stingray",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(63).jpg?v=1744059323037",
  "stats": { "PWR": 78, "SPD": 82, "HDL": 84 },
  "value": 8200,
  "storage": 2,
  "rarity": "uncommon",
  "colors": [
    {
      "name": "Torch Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(63).jpg?v=1744059323037",
      "colorCode": "#d21f26"
    },
    {
      "name": "Rapid Blue",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(64).jpg?v=1744059406306",
      "colorCode": "#00a6f0"
    },
    {
      "name": "Arctic White",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(65).jpg?v=1744059408731",
      "colorCode": "#ffffff"
    },
    {
      "name": "Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(66).jpg?v=1744059411170",
      "colorCode": "#000000"
    }
  ],
  "tags": [""],
  "description": "With its mid-engine layout, sleek aerodynamics, and responsive handling, the 2024 C8 Corvette delivers exotic-level performance at an attainable price — a modern icon reborn."
},
{
  "carId": 23,
  "brand": "Chevrolet",
  "name": "2024 C8 Corvette Carbon Package",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(67).jpg?v=1744059580884",
  "stats": { "PWR": 96, "SPD": 93, "HDL": 86 },
  "value": 50000,
  "storage": 2,
  "rarity": "mythic",
  "colors": [
  {
      "name": "Arctic White",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(68).jpg?v=1744059595308",
      "colorCode": "#ffffff"
    },
    {
      "name": "Carbon Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/snapshot%20(67).jpg?v=1744059580884",
      "colorCode": "#111111"
    },
  ],
  "tags": ["limited"],
  "description": "This 900 HP widebody monster pushes the C8 to its absolute limits. Tuned for raw power and neck-snapping acceleration, the Inferno Edition turns heads — and laps — with rage-fueled precision. Catch it while it’s burning the streets… and time."
},
{
  "carId": 24,
  "brand": "Toyota",
  "name": "1984 4Runner",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/4runnerorange.jpg?v=1744157474152",
  "stats": { "PWR": 66, "SPD": 58, "HDL": 62 },
  "value": 6900,
  "storage": 9,
  "rarity": "uncommon",
  "colors": [
    {
      "name": "Blue",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/4runnerblue.jpg?v=1744157507193",
      "colorCode": "#1E90FF"
    },
    {
      "name": "Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/4runnerred.jpg?v=1744157483597",
      "colorCode": "#C8102E"
    },
    {
      "name": "White",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/4runnerwhite.jpg?v=1744157503456",
      "colorCode": "#FFFFFF"
    },
    {
      "name": "Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/4runnerblack.jpg?v=1744157499166",
      "colorCode": "#000000"
    },
    {
      "name": "Orange",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/4runnerorange.jpg?v=1744157474152",
      "colorCode": "#FF6F00"
    }
  ],
  "tags": [],
  "description": "The 2019 Toyota 4Runner is built tough for adventure. With proven reliability, off-road power, and versatile storage, it's the go-to SUV for drivers who demand more from their daily drive."
},


{
  "carId": 25,
  "brand": "Ford",
  "name": "1967 Mustang GT500",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/67mustangred.jpg?v=1744204892364",
  "stats": { "PWR": 90, "SPD": 85, "HDL": 70 },
  "value": 32000,
  "storage": 2,
  "rarity": "rare",
  "colors": [
    {
      "name": "Blue",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/67mustangblue.jpg?v=1744204881155",
      "colorCode": "#1E90FF"
    },
    {
      "name": "Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/67mustangred.jpg?v=1744204892364",
      "colorCode": "#C8102E"
    },
    {
      "name": "White",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/67mustangwhite.jpg?v=1744204887960",
      "colorCode": "#FFFFFF"
    },
    {
      "name": "Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/67mustangblack.jpg?v=1744204884030",
      "colorCode": "#000000"
    },
  ],
  "tags": [],
  "description": "An icon of American muscle, the 1967 Mustang GT500 roars with aggressive power and bold style. It's a vintage beast with timeless appeal, perfect for collectors and speed lovers alike."
},
{
  "carId": 26,
  "brand": "Dodge",
  "name": "2006 Charger",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargersilver.jpg?v=1744218931097",
  "stats": { "PWR": 63, "SPD": 59, "HDL": 52 },
  "value": 4900,
  "storage": 6,
  "rarity": "common",
  "colors": [
    {
      "name": "Black",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargerblack.jpg?v=1744218940922",
      "colorCode": "#000000"
    },
    {
      "name": "Silver",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargersilver.jpg?v=1744218931097",
      "colorCode": "#C0C0C0"
    },
    {
      "name": "Red",
      "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargerred.jpg?v=1744218949298",
      "colorCode": "#b22222"
    }
  ],
  "tags": [],
  "description": "The 2006 Dodge Charger base model offers bold styling and a smooth ride, powered by a V6 engine—bringing muscle car looks to the daily driver segment."
},
{
  "carId": 27,
  "brand": "Dodge",
  "name": "2006 Charger R/T",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargersrtwhite.jpg?v=1744219383396",
  "stats": { "PWR": 74, "SPD": 68, "HDL": 60 },
  "value": 6100,
  "storage": 6,
  "rarity": "uncommon",
  "colors": [
    { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargersrtred.jpg?v=1744219398225", "colorCode": "#B22222" },
    { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargersrtblack.jpg?v=1744219392082", "colorCode": "#000000" },
    { "name": "Silver", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/06chargersrtwhite.jpg?v=1744219383396", "colorCode": "#C0C0C0" }
  ],
  "tags": [],
  "description": "The 2006 Charger R/T packs a 5.7L HEMI V8 under its muscular hood, delivering classic American muscle with modern refinement. Its aggressive stance and throaty exhaust note make it a head-turner on any street."
},
{
  "carId": 28,
  "brand": "Jeep",
  "name": "2024 Wrangler",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/jeepblue.jpg?v=1744422487321",
  "stats": { "PWR": 68, "SPD": 60, "HDL": 67 },
  "value": 7500,
  "storage": 8,
  "rarity": "uncommon",
  "colors": [
    { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/jeepblack.jpg?v=1744422481063", "colorCode": "#000000" },
    { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/jeepwhite.jpg?v=1744422482978", "colorCode": "#FFFFFF" },
    { "name": "Yellow", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/jeepyellow.jpg?v=1744422480587", "colorCode": "#FFD700" },
    { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/jeepblue.jpg?v=1744422487321", "colorCode": "#1E90FF" }
  ],
  "tags": [],
  "description": "The iconic Jeep Wrangler combines rugged off-road capability with open-air freedom. Its removable doors and roof, along with legendary 4x4 performance, make every drive an adventure."
},
{
  "carId": 29,
  "brand": "Ferrari",
  "name": "458 Italia",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/ferrari4red.jpg?v=1744422489229",
  "stats": { "PWR": 94, "SPD": 96, "HDL": 89 },
  "value": 112000,
  "storage": 1,
  "rarity": "legendary",
  "colors": [
    { "name": "Rosso Corsa", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/ferrari4red.jpg?v=1744422489229", "colorCode": "#D40000" },
    { "name": "Bianco Avus", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/ferrari4white.jpg?v=1744422495508", "colorCode": "#FFFFFF" },
    { "name": "Nero Daytona", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/ferrari4black.jpg?v=1744422490888", "colorCode": "#0A0A0A" }
  ],
  "tags": [""],
  "description": "The 458 Italia represents Ferrari's perfect balance of art and engineering. Its naturally aspirated V8 sings to 9,000 RPM while its razor-sharp handling delivers telepathic driving precision."
},
{
  "carId": 30,
  "brand": "Dodge",
  "name": "2015 Charger SXT",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/chargerblue.jpg?v=1744422497762",
  "stats": { "PWR": 70, "SPD": 65, "HDL": 60 },
  "value": 5700,
  "storage": 6,
  "rarity": "common",
  "colors": [
    { "name": "Blue", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/chargerblue.jpg?v=1744422497762", "colorCode": "#1E90FF" },
    { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/chargerwhite.jpg?v=1744422502769", "colorCode": "#FFFFFF" },
    { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/chargerblack.jpg?v=1744422505648", "colorCode": "#000000" }
  ],
  "tags": [],
  "description": "The 2015 Charger SXT offers muscle car styling with everyday practicality. Its smooth V6 power and spacious interior make it a comfortable cruiser with aggressive looks."
},
{
  "carId": 31,
  "brand": "Dodge",
  "name": "Charger Hellcat Widebody",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/hellcatred.jpg?v=1744422508161",
  "stats": { "PWR": 90, "SPD": 84, "HDL": 76 },
  "value": 34000,
  "storage": 5,
  "rarity": "rare",
  "colors": [
    { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/hellcatred.jpg?v=1744422508161", "colorCode": "#B22222" },
    { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/hellcatblack.jpg?v=1744422522049", "colorCode": "#000000" },
    { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/hellcatwhite.jpg?v=1744422519123", "colorCode": "#FFFFFF" }
  ],
  "tags": [""],
  "description": "With 707 supercharged horsepower and an aggressive widebody stance, the Hellcat Charger is a four-door predator. Its combination of brute force and modern tech makes it the ultimate muscle sedan."
},
{
  "carId": 32,
  "brand": "Acura",
  "name": "1996 NSX",
  "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/acurared.jpg?v=1744423428241",
  "stats": { "PWR": 76, "SPD": 86, "HDL": 90 },
  "value": 45000,
  "storage": 2,
  "rarity": "rare",
  "colors": [
    { "name": "Red", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/acurared.jpg?v=1744423428241", "colorCode": "#C8102E" },
    { "name": "Black", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/acurablack.jpg?v=1744423429820", "colorCode": "#000000" },
    { "name": "White", "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/acurawhite.jpg?v=1744423431411", "colorCode": "#FFFFFF" }
  ],
  "tags": [],
  "description": "The first-gen NSX was Japan’s answer to Italian supercars — light, agile, and precision-built. With its mid-engine layout and everyday usability, it redefined what a supercar could be."
},

  ],
  
stickers: [
  {
    stickerId: 1,
    name: "Vintage",
    stickerImage: "",
    value: 500,
    stats: {PWR: 1, SPD: 2, HDL: 1},
  },
],
  
specialJobs: [
    {
        id: 1001,
        name: "VIP Transport",
        description: "Transport a high-profile client who demands perfection",
        reward: 25000,
        baseTime: 180, 
        minStorage: 4,
        requirements: {
            SPD: 92,
            STR: 4,
            PWR: 85,
            HDL: 88
        },
        icon: "👑", 
        glowColor: "#FFD700" 
    },
    {
    id: 1002,
    name: "Black Ops Delivery",
    description: "Deliver a top-secret package under extreme conditions",
    reward: 30000,
    baseTime: 200,
    minStorage: 3,
    requirements: {
        SPD: 95,
        STR: 6,
        PWR: 90,
        HDL: 90
    },
    icon: "🎯",
    glowColor: "#8B0000"
},
{
    id: 1003,
    name: "Time-Sensitive Heist",
    description: "Assist in a high-speed heist with millisecond precision",
    reward: 28000,
    baseTime: 160,
    minStorage: 2,
    requirements: {
        SPD: 98,
        STR: 5,
        PWR: 88,
        HDL: 92
    },
    icon: "⏱️",
    glowColor: "#00FFFF"
},
],

jobs: [
    {
        id: 1,
        name: "Pizza Delivery",
        description: "Deliver pizzas across town as fast as possible.",
        reward: 500,
        baseTime: 45,
        minStorage: 4,
        available: true
    },
    {
        id: 2,
        name: "VIP Transport",
        description: "Safely transport an important client to the airport.",
        reward: 800,
        baseTime: 60,
        minStorage: 2,
        available: true
    },
    {
        id: 3,
        name: "Bank Escort",
        description: "Escort an armored truck between bank branches.",
        reward: 750,
        baseTime: 50,
        minStorage: 6,
        available: true
    },
    {
        id: 4,
        name: "Taxi Service",
        description: "Pick up and drop off passengers around the city.",
        reward: 500,
        baseTime: 40,
        minStorage: 3,
        available: true
    },
    {
        id: 5,
        name: "Construction Delivery",
        description: "Deliver construction materials to a worksite.",
        reward: 700,
        baseTime: 70,
        minStorage: 7,
        available: true
    },
    {
        id: 6,
        name: "Document Courier",
        description: "Quickly deliver sensitive documents downtown.",
        reward: 450,
        baseTime: 25,
        minStorage: 1,
        available: true
    },
    {
        id: 7,
        name: "Tour Guide Shuttle",
        description: "Drive tourists around major city landmarks.",
        reward: 600,
        baseTime: 55,
        minStorage: 5,
        available: true
    },
    {
        id: 8,
        name: "Medical Supply Run",
        description: "Rush medical supplies to a hospital in need.",
        reward: 750,
        baseTime: 35,
        minStorage: 3,
        available: true
    },
    {
        id: 9,
        name: "Warehouse Haul",
        description: "Move goods between storage facilities.",
        reward: 550,
        baseTime: 65,
        minStorage: 6,
        available: true
    }
],

 "races": [
    {
        "raceName": "Yas Marina Circuit",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/dubacircuit1.jpeg?v=1744305552539",
        "reward": 10000,
        "time": 22,
        "type": 1
    },
    {
        "raceName": "1/4 Drag Strip",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/drag1.jpg?v=1744305595188",
        "reward": 5000,
        "time": 38,
        "type": 2
    },
    {
        "raceName": "Tokyo Expressway",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/448ff116-2b05-44ca-bbdf-c06a8ade5138.image.png?v=1744398322436",
        "reward": 9000,
        "time": 24,
        "type": 1
    },
    {
        "raceName": "Mountain Pass Sprint",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/6031e642-4f77-4c49-a5e0-6d1e11902632.image.png?v=1744398349457",
        "reward": 10000,
        "time": 22,
        "type": 1
    },
    {
        "raceName": "Nürburgring GP",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/b74da9a5-e302-4d5c-8ec8-6af73827f646.image.png?v=1744398407999",
        "reward": 14000,
        "time": 20,
        "type": 1
    },
    {
        "raceName": "Monaco Grand Prix",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/ca576be2-a814-4f0c-84a1-3b47321f5fcc.image.png?v=1744398434943",
        "reward": 12000,
        "time": 21,
        "type": 1
    },
    {
        "raceName": "Silverstone Circuit",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/b82e4082-4254-4001-8d85-d2a27c701d8e.image.png?v=1744398457058",
        "reward": 9500,
        "time": 26,
        "type": 1
    },
    {
        "raceName": "Bonneville Drag",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/71e01308-16ff-4ad5-9798-76ad153f6743.image.png?v=1744398489338",
        "reward": 4000,
        "time": 40,
        "type": 2
    },
    {
        "raceName": "Laguna Seca Raceway",
        "trackImage": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/02d4760b-9325-444b-a685-dc4c11d1a763.image.png?v=1744398540427",
        "reward": 8500,
        "time": 30,
        "type": 1
    }
],

    activeJobs: [],
    activeRaces: [],

            packs: [
                {
                    packId: 1,
                    name: "Starter Pack",
                    image: "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0m1_Kleki.png?v=1743959603659",
                    contains: [5, 9, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 27, 28,30, 31],
                    rarityTable: { common: 70, uncommon: 30, rare: 0, legendary: 0, mythic: 0 },
                    cardsGiven: 3
                },
              {
    "packId": 2,
    "name": "Advanced Pack",
    "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0m1_Kleki.png?v=1743959603659",
    "contains": [5, 7, 8, 9, 14, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 28, 30, 31, 32],
    "rarityTable": { "common": 60, "uncommon": 35, "rare": 5, "legendary": 0, "mythic": 0 },
    "cardsGiven": 3
},
{
    "packId": 3,
    "name": "Performance Pack",
    "image": "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0m1_Kleki.png?v=1743959603659",
    "contains": [3, 5, 7, 8, 12, 19, 20, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    "rarityTable": { "common": 40, "uncommon": 45, "rare": 12, "legendary": 3, "mythic": 0 },
    "cardsGiven": 3
},
                {
                    packId: 4,
                    name: "Rare Pack",
                    image: "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0m1_Kleki.png?v=1743959603659",
                    contains: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32],
                    rarityTable: { common: 20, uncommon: 40, rare: 15, legendary: 4, mythic: 1 },
                    cardsGiven: 3
                },
                {
                    packId: 5,
                    name: "Premium Pack",
                    image: "https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0m1_Kleki.png?v=1743959603659",
                    contains: [1, 2, 3, 4, 6, 12, 16, 19, 20, 22, 24, 25, 27, 28, 29, 30, 31, 32],
                    rarityTable: { common: 0, uncommon: 40, rare: 40, legendary: 15, mythic: 5 },
                    cardsGiven: 3
                },
              
            ],
            limitedShop: [
        {
            packId: 1000,
            name: 'Limited Pack',
            image: 'https://cdn.glitch.global/d90d2e0e-f080-4624-a28d-9238202ed552/2025_04_06_0m1_Kleki.png?v=1743959603659',
            contains: [13, 21, 23],
            rarityTable: { common: 0, uncommon: 0, rare: 0, legendary: 0, mythic: 100 },
            price: 250000,
            cardsGiven: 1
        },
    ],
                 codes: [
        { code: "KWPID1", reward: "cash", value: 100000, redeemed: false },
        { code: "SRTACR", reward: "car", value: 10, redeemed: false },
        { code: "H1", reward: "car", value: 11, redeemed: false },
        { code: "DEV", reward: "cash", value: 999999999, redeemed: false },
        { code: "DEVGIFT", reward: "car", value: 6, redeemed: false },
    ],
        };
const packPricingConfig = {
    baseROI: 0.8, 
    priceRounding: 10000, 
    fixedPricePacks: [] 
};
const bannedUsers = {
    "": {
        reason: "Cheating detected",
        until: null // Permanent ban
    },
    "": {
        reason: "Suspicious activity",
        until: Date.now() + (7 * 24 * 60 * 60 * 1000) 
    }
};    
      // Add this function to calculate dynamic pack prices
function calculateDynamicPackPrice(pack) {
    // If pack has a fixed price or is in fixedPricePacks, use that
    if (pack.fixedPrice !== undefined || packPricingConfig.fixedPricePacks.includes(pack.packId)) {
        return pack.price; // Use the predefined price
    }

    // Calculate total value of all possible cars in the pack
    let totalValue = 0;
    let carCount = 0;
    
    pack.contains.forEach(carId => {
        const car = gameData.cars.find(c => c.carId === carId);
        if (car && (!car.tags.includes('off-sale') || gameData.player.inventory.some(i => i.cardId === car.carId))) {
            totalValue += car.value;
            carCount++;
        }
    });

    // Avoid division by zero
    if (carCount === 0) return pack.price; // Fallback to original price
    
    // Calculate average car value in the pack
    const avgCarValue = totalValue / carCount;
    
    // Calculate base price based on ROI (price = avgValue / ROI * cardsGiven)
    let calculatedPrice = (avgCarValue / packPricingConfig.baseROI) * pack.cardsGiven;
    
    // Apply rarity multiplier
    const rarityMultiplier = calculateRarityMultiplier(pack);
    calculatedPrice *= rarityMultiplier;
    
    // Round to nearest 5 or 0 (e.g., 134 → 135, 476 → 475)
    const roundedPrice = Math.round(calculatedPrice / packPricingConfig.priceRounding) * packPricingConfig.priceRounding;
    
    // Ensure minimum price of 100
    return Math.max(100, roundedPrice);
}
      function calculateRarityMultiplier(pack) {
    // Higher rarity cars should increase the pack price
    let multiplier = 1;
    
    // Count rarities in this pack
    const rarityCounts = {
        common: 0,
        uncommon: 0,
        rare: 0,
        legendary: 0,
        mythic: 0
    };
    
    pack.contains.forEach(carId => {
        const car = gameData.cars.find(c => c.carId === carId);
        if (car) {
            rarityCounts[car.rarity]++;
        }
    });
    
    // Apply multipliers based on rarity distribution
    if (rarityCounts.mythic > 0) multiplier *= 1.5;
    if (rarityCounts.legendary > 0) multiplier *= 1.3;
    if (rarityCounts.rare > 0) multiplier *= 1.15;
    if (rarityCounts.uncommon > 0) multiplier *= 1.05;
    
    return multiplier;
}
        let limitedShopEndTime = new Date("2025-04-23T19:00:00Z"); // --- Limited Shop Timer

        // DOM Elements
        const tabButtons = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        const inventoryGrid = document.getElementById('inventoryGrid');
        const marketplaceGrid = document.getElementById('marketplaceGrid');
        const indexTableBody = document.getElementById('indexTableBody');
        const playerBalance = document.getElementById('playerBalance');
        const packContentsModal = document.getElementById('packContentsModal');
        const packModalTitle = document.getElementById('packModalTitle');
        const packContents = document.getElementById('packContents');
        const packOpeningModal = document.getElementById('packOpeningModal');
        const openingAnimation = document.getElementById('openingAnimation');
        const inventoryCardModal = document.getElementById('inventoryCardModal');
        const inventoryCardTitle = document.getElementById('inventoryCardTitle');
        const inventoryCardRarity = document.getElementById('inventoryCardRarity');
        const inventoryCardBody = document.getElementById('inventoryCardBody');
        const indexCardModal = document.getElementById('indexCardModal');
        const indexCardTitle = document.getElementById('indexCardTitle');
        const indexCardRarity = document.getElementById('indexCardRarity');
        const indexCardBody = document.getElementById('indexCardBody');
        const themeToggle = document.getElementById('themeToggle');
        const confirmationDialog = document.getElementById('confirmationDialog');
        const confirmationTitle = document.getElementById('confirmationTitle');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const confirmCancel = document.getElementById('confirmCancel');
        const confirmOk = document.getElementById('confirmOk');
        const notifications = document.getElementById('notifications');
       const customizationModal = document.getElementById('customizationModal');
    const customizationTitle = document.getElementById('customizationTitle');
    const customizationBody = document.getElementById('customizationBody');
    const customizationCarImage = document.getElementById('customizationCarImage');
    const colorOptions = document.getElementById('colorOptions');
    const applyCustomizationBtn = document.getElementById('applyCustomizationBtn');
// Add this with your other game data variables
let lastPlayTime = Date.now();
const passiveIncomeRate = 500; // $500 per minute
let jobSpawnInterval;
let assignCarModalJobId = null;
      let currentTransactionPage = 1;
const transactionsPerPage = 250;
      let isPurchaseInProgress = false;
      let currentRenamingCar = null;
      
      
      
function initGame() {
    // Generate or load user ID
    let userId = localStorage.getItem('kwpidCarsUserId');
    if (!userId) {
        // Create a precise timestamp-based ID
        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        userId = `user_${timestamp}_${randomSuffix}`;
        localStorage.setItem('kwpidCarsUserId', userId);
    }
 const banInfo = checkBanStatus(userId);
    if (banInfo) {
        // Initialize minimal gameData just to show the ban screen
        if (!gameData.player) {
            gameData.player = { userId: userId };
        }
        showBanScreen(banInfo);
        return; // Stop game initialization
    }
    // Set dark mode as default
    document.body.classList.add('dark-mode');
    
    // Try to load saved game
    const loaded = loadGame();
    
    if (!loaded) {
        // Initialize new game with default values
        gameData.player = {
            userId: userId,  // Store the user ID in game data
            balance: 100000,
            inventory: [],
            transactions: [],
            stats: {
                packsOpened: 0,
                peakCash: 100000,
                playTimeMinutes: 0,
                carsCollected: 0,
                jobs: {
                    completed: 0,
                    earnings: 0,
                    highestPaying: { amount: 0, name: "None" },
                    mostUsedCar: { id: null, count: 0, name: "None" },
                    totalTime: 0
                },
                races: {
                    completed: 0,
                    wins: 0,
                    earnings: 0,
                    highestPaying: { amount: 0, name: "None" },
                    mostUsedCar: { id: null, count: 0, name: "None" },
                    trackCounts: {}
                }
            }
        };
        lastPlayTime = Date.now();
    } else {
        // Ensure existing saves have the user ID
        if (!gameData.player.userId) {
            gameData.player.userId = userId;
        }
        gameData.player.inventory = gameData.player.inventory.map(item => ({
    ...item,
    health: item.health !== undefined ? item.health : 100 // Default to 100 if undefined
}));
        // Initialize stats if they don't exist
        if (!gameData.player.stats.jobs) {
            gameData.player.stats.jobs = {
                completed: 0,
                earnings: 0,
                highestPaying: { amount: 0, name: "None" },
                mostUsedCar: { id: null, count: 0, name: "None" },
                totalTime: 0
            };
        }
        
        if (!gameData.player.stats.races) {
            gameData.player.stats.races = {
                completed: 0,
                wins: 0,
                earnings: 0,
                highestPaying: { amount: 0, name: "None" },
                mostUsedCar: { id: null, count: 0, name: "None" },
                trackCounts: {}
            };
        }
    }
    
    // Load other settings
    if (localStorage.getItem('notificationsEnabled') === null) {
        localStorage.setItem('notificationsEnabled', 'true');
        localStorage.setItem('notification_purchase', 'true');
        localStorage.setItem('notification_sale', 'true');
        localStorage.setItem('notification_income', 'true');
        localStorage.setItem('notification_collection', 'true');
        localStorage.setItem('notification_error', 'true');
    }

    gameData.maxActiveJobs = 5;
    gameData.maxActiveRaces = 3;
    gameData.jobSlotUpgrades = 0;
    gameData.nextJobSlotUpgradeCost = 100000;
    gameData.carCooldowns = {};
    calculatePassiveIncome();
    applyDynamicPricing();
    updateBalanceDisplay();
    renderMarketplace();
    renderLimitedShop();
    renderIndex();
    setupRaceSystem();
    setupEventListeners();
    renderInventory();
    manageCooldowns();
    setupSettings();
    updateStatsDisplay();
    setupMissionSystem();
    renderJobs();
    setTimeout(checkForCarStatusChanges, 3000);

    // Auto-save every 30 seconds
    setInterval(saveGame, 30000);
    
    // Also save when window is closed
    window.addEventListener('beforeunload', saveGame);
    setInterval(() => {
        gameData.player.stats.playTimeMinutes++;
        updateStatsDisplay();
    }, 60000); 
    startPassiveIncomeInterval();
}
function checkForCarStatusChanges() {
    const lastCarIds = JSON.parse(localStorage.getItem('lastCarIds') || '[]');
    const currentCarIds = gameData.cars.map(car => car.carId);

    // Get all car IDs the player has owned (current and previous)
    const ownedCarIds = (gameData.player.inventory || []).map(car => car.cardId);

    // Filter to only include cars the player has owned
    const relevantLastCarIds = lastCarIds.filter(id => ownedCarIds.includes(id));

    // Check for removed cars
    const removedCars = relevantLastCarIds.filter(id => !currentCarIds.includes(id));

    // Check for cars that are off-sale but were owned and not yet seen
    const offSaleCars = relevantLastCarIds.filter(id => {
        const car = gameData.cars.find(c => c.carId === id);
        return car && car.tags.includes('off-sale') &&
            !JSON.parse(localStorage.getItem('seenOffSaleNotifications') || '[]').includes(id);
    });

    // Show notifications
    if (removedCars.length > 0) {
        const carNames = removedCars.map(id => {
            const car = gameData.cars.find(c => c.carId === id) || { name: 'Unknown Car' };
            return car.name;
        }).join(', ');

        showNotification(
            'Cars Removed',
            `The following cars have been removed from the game: ${carNames}`,
            'warning'
        );
    }

    if (offSaleCars.length > 0) {
        const carNames = offSaleCars.map(id => {
            const car = gameData.cars.find(c => c.carId === id);
            return car.name;
        }).join(', ');

        showNotification(
            'Cars No Longer Available',
            `The following cars are no longer available for purchase: ${carNames}`,
            'pinned',
            120,
        );

        const seenNotifications = JSON.parse(localStorage.getItem('seenOffSaleNotifications') || '[]');
        localStorage.setItem('seenOffSaleNotifications', JSON.stringify([...seenNotifications, ...offSaleCars]));
    }

    // Update last car list
    localStorage.setItem('lastCarIds', JSON.stringify(currentCarIds));
}

function saveGame() {
    const gameState = {
        player: gameData.player,
        codes: gameData.codes,
        lastPlayTime: lastPlayTime,
        activeJobs: gameData.activeJobs.map(job => ({
            ...job,
            timerInterval: null,  // Don't save intervals
            completionTimeout: null
        })),
        activeRaces: gameData.activeRaces,
        carCooldowns: gameData.carCooldowns
    };
    
    localStorage.setItem('kwpidCarsSave', JSON.stringify(gameState));
    localStorage.setItem('lastCarIds', JSON.stringify(gameData.cars.map(car => car.carId)));
    localStorage.setItem('carCooldowns', JSON.stringify(gameData.carCooldowns));
    debugLog('Game saved');
    
    // Debug output of saved data
    debugLog('Saved game state:', {
        userId: gameData.player.userId,
        balance: gameData.player.balance,
        inventoryCount: gameData.player.inventory.length,
        lastPlayTime: new Date(lastPlayTime).toLocaleString()
    });
}
// Add this function to calculate dynamic pack prices
function calculateDynamicPackPrice(pack) {
    // If pack has a fixed price or is in fixedPricePacks, use that
    if (pack.fixedPrice !== undefined || packPricingConfig.fixedPricePacks.includes(pack.packId)) {
        return pack.price; // Use the predefined price
    }

    // Calculate total value of all possible cars in the pack
    let totalValue = 0;
    let carCount = 0;
    
    pack.contains.forEach(carId => {
        const car = gameData.cars.find(c => c.carId === carId);
        if (car && (!car.tags.includes('off-sale') || gameData.player.inventory.some(i => i.cardId === car.carId))) {
            totalValue += car.value;
            carCount++;
        }
    });

    // Avoid division by zero
    if (carCount === 0) return pack.price; // Fallback to original price
    
    // Calculate average car value in the pack
    const avgCarValue = totalValue / carCount;
    
    // Calculate base price based on ROI (price = avgValue / ROI * cardsGiven)
    let calculatedPrice = (avgCarValue / packPricingConfig.baseROI) * pack.cardsGiven;
    
    // Apply rarity multiplier
    const rarityMultiplier = calculateRarityMultiplier(pack);
    calculatedPrice *= rarityMultiplier;
    
    // Round to nearest 5 or 0 (e.g., 134 → 135, 476 → 475)
    const roundedPrice = Math.round(calculatedPrice / packPricingConfig.priceRounding) * packPricingConfig.priceRounding;
    
    // Ensure minimum price of 100
    return Math.max(100, roundedPrice);
}
      function calculateRarityMultiplier(pack) {
    // Higher rarity cars should increase the pack price
    let multiplier = 1;
    
    // Count rarities in this pack
    const rarityCounts = {
        common: 0,
        uncommon: 0,
        rare: 0,
        legendary: 0,
        mythic: 0
    };
    
    pack.contains.forEach(carId => {
        const car = gameData.cars.find(c => c.carId === carId);
        if (car) {
            rarityCounts[car.rarity]++;
        }
    });
    
    // Apply multipliers based on rarity distribution
    if (rarityCounts.mythic > 0) multiplier *= 1.5;
    if (rarityCounts.legendary > 0) multiplier *= 1.3;
    if (rarityCounts.rare > 0) multiplier *= 1.15;
    if (rarityCounts.uncommon > 0) multiplier *= 1.05;
    
    return multiplier;
}
function loadGame() {
    const savedData = localStorage.getItem('kwpidCarsSave');
    if (!savedData) {
        debugLog('No saved game found');
        return false;
    }
    
    try {
        const gameState = JSON.parse(savedData);
        
        // Load player data
        if (gameState.player) {
            gameData.player = {
                ...gameData.player, // Keep default values
                ...gameState.player // Override with saved values
            };
            
            // Ensure user ID exists
            if (!gameData.player.userId) {
                gameData.player.userId = localStorage.getItem('kwpidCarsUserId') || generateUserId();
            }
            
            // Ensure inventory has all required fields
            gameData.player.inventory = gameData.player.inventory.map(item => ({
                uniqueId: item.uniqueId || generateUniqueId(),
                cardId: item.cardId,
                obtainedAt: item.obtainedAt || new Date().toISOString(),
                mileage: item.mileage || 0,
                health: item.health || 100,
                upgrades: item.upgrades || {},
                customImage: item.customImage || null,
                colorName: item.colorName || null,
                colorCode: item.colorCode || null,
                customName: item.customName || null,
                valueBonus: item.valueBonus || 0,
                rarityBonus: item.rarityBonus || null
            }));
        }
        
        // Load jobs
        if (gameState.activeJobs) {
            gameData.activeJobs = gameState.activeJobs.map(job => ({
                ...job,
                timerInterval: null,
                completionTimeout: null
            }));
        }
        
        // Load races
        if (gameState.activeRaces) {
            gameData.activeRaces = gameState.activeRaces;
        }
        
        // Load cooldowns
        if (gameState.carCooldowns) {
            gameData.carCooldowns = gameState.carCooldowns;
        } else {
            // Try loading from separate storage if not in main save
            const savedCooldowns = localStorage.getItem('carCooldowns');
            if (savedCooldowns) {
                gameData.carCooldowns = JSON.parse(savedCooldowns);
            } else {
                gameData.carCooldowns = {};
            }
        }
        
        // Merge codes - keep default codes and only update redeemed status from saved data
        if (gameState.codes) {
            gameData.codes.forEach(defaultCode => {
                const savedCode = gameState.codes.find(c => c.code === defaultCode.code);
                if (savedCode) {
                    defaultCode.redeemed = savedCode.redeemed;
                }
            });
            
            // Add any new codes that exist in saved data but not in defaults
            gameState.codes.forEach(savedCode => {
                if (!gameData.codes.some(c => c.code === savedCode.code)) {
                    gameData.codes.push(savedCode);
                }
            });
        }
        
        // Load last play time
        if (gameState.lastPlayTime) {
            lastPlayTime = gameState.lastPlayTime;
        } else {
            lastPlayTime = Date.now();
        }
        
        debugLog('Game loaded for user:', gameData.player.userId);
        return true;
    } catch (e) {
        console.error('Failed to load game:', e);
        return false;
    }
}

function generateUserId() {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const userId = `user_${timestamp}_${randomSuffix}`;
    localStorage.setItem('kwpidCarsUserId', userId);
    return userId;
}

function showNotification(title, message, type = 'info', durationSeconds = 3) {
    if (localStorage.getItem('notificationsEnabled') === 'false') {
        debugLog('Notification suppressed (all notifications disabled):', title, message);
        return;
    }

    // Job notification filtering
    if (message.includes("new job") || title.includes("New Job Available")) {
        if (localStorage.getItem('notification_new-job') === 'false') return;
    }
    else if (message.includes("assigned a car") || title.includes("Job Started")) {
        if (localStorage.getItem('notification_sent-car') === 'false') return;
    }
    else if (message.includes("ready to collect") || title.includes("Job Completed")) {
        if (localStorage.getItem('notification_ready-collect') === 'false') return;
    } 
    else if (message.includes("rare card") || title.includes("Amazing Pull!")) {
        if (localStorage.getItem('notification_rare-pull') === 'false') return;
    }
  else if (message.includes("race at") || title.includes("New Race!")) {
        if (localStorage.getItem('notification_new-race') === 'false') return;
    }
    else if (message.includes("You failed the race") || title.includes("Raced Failed")) {
        if (localStorage.getItem('notification_rare-fail') === 'false') return;
    }
    else if (message.includes("You earned") || title.includes("Race Completed!")) {
        if (localStorage.getItem('notification_rare-complete') === 'false') return;
    }

    // Determine notification type for filtering
    let notificationType;
    if (type === 'error') notificationType = 'error';
    else if (type === 'info') notificationType = 'info';
    else if (type === 'pinned') notificationType = 'pinned';
    else if (title.includes('Purchased') || title.includes('Pack')) notificationType = 'purchase';
    else if (title.includes('Sold') || title.includes('Sale')) notificationType = 'sale';
    else if (title.includes('Income')) notificationType = 'income';
    else if (title.includes('Milestone') || title.includes('Collection')) notificationType = 'collection';
    else notificationType = 'other';

    if (notificationType && localStorage.getItem(`notification_${notificationType}`) === 'false') {
        debugLog(`Notification suppressed (type ${notificationType} disabled):`, title, message);
        return;
    }

    // Icons for each type
    const icons = {
        error: '❌',
        success: '✅',
        info: 'ℹ️',
        purchase: '🛒',
        sale: '💰',
        income: '💵',
        collection: '🏆',
        pinned: '📌'
    };

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${icons[type] || 'ℹ️'}</span>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;

    notifications.appendChild(notification);

    if (type !== 'pinned') {
        const duration = Math.max(1, durationSeconds) * 1000; // Enforce minimum of 1s
        setTimeout(() => {
            notification.remove();
        }, duration);
    } else {
        notification.style.cursor = 'pointer';
        notification.addEventListener('click', () => {
            notification.remove();
        });
    }

    debugLog('Notification shown', { title, message, type, durationSeconds, notificationType });
}



        function showConfirmation(title, message) {
    return new Promise((resolve) => {
        // Prevent multiple confirmations
        if (document.body.classList.contains('dialog-open')) {
            resolve(false);
            return;
        }

        // Add class to body to prevent scrolling
        document.body.classList.add('dialog-open');
        
        confirmationTitle.textContent = title;
        confirmationMessage.textContent = message;
        confirmationDialog.style.display = 'flex';
        
        // Focus the OK button for better keyboard/mobile accessibility
        setTimeout(() => confirmOk.focus(), 100);
        
        const handleResponse = (result) => {
            confirmationDialog.style.display = 'none';
            document.body.classList.remove('dialog-open');
            resolve(result);
            
            // Clean up event listeners
            confirmOk.removeEventListener('click', okHandler);
            confirmOk.removeEventListener('touchend', okHandler);
            confirmCancel.removeEventListener('click', cancelHandler);
            confirmCancel.removeEventListener('touchend', cancelHandler);
            document.removeEventListener('keydown', handleKeyDown);
        };
        
        const okHandler = (e) => {
            e.preventDefault();
            handleResponse(true);
        };
        
        const cancelHandler = (e) => {
            e.preventDefault();
            handleResponse(false);
        };
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleResponse(false);
            } else if (e.key === 'Enter') {
                handleResponse(true);
            }
        };
        
        // Add both click and touch events for mobile
        confirmOk.addEventListener('click', okHandler);
        confirmOk.addEventListener('touchend', okHandler);
        confirmCancel.addEventListener('click', cancelHandler);
        confirmCancel.addEventListener('touchend', cancelHandler);
        document.addEventListener('keydown', handleKeyDown);
    });
}

        // Toggle dark/light mode
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '🌞';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌓';
            }
        }

        // Update player balance display
        function updateBalanceDisplay() {
            playerBalance.textContent = gameData.player.balance.toLocaleString();
        }

function renderMarketplace() {
    marketplaceGrid.innerHTML = '';

    gameData.packs.forEach(pack => {
        // Calculate dynamic price
        const displayPrice = calculateDynamicPackPrice(pack);

        const rarityDisplay = Object.entries(pack.rarityTable)
            .filter(([rarity, percent]) => percent > 0)
            .map(([rarity, percent]) => `${capitalize(rarity)}: ${percent}%`)
            .join(' | ');

        const packElement = document.createElement('div');
        packElement.className = 'card';
        packElement.innerHTML = `
           <div class="pack-rarity-top" style="
        font-size: 0.3rem;
        text-align: center;
        margin-bottom: 4px;
        white-space: nowrap;
        display: block;
        width: fit-content;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: auto;
        margin-right: auto;
    ">
        ${rarityDisplay}
    </div>

            <img src="${pack.image}" alt="${pack.name}" class="card-image">
            <div class="card-content">
                <div class="card-name">${pack.name}</div>
                <div class="card-price">$${displayPrice.toLocaleString()}</div>
                <div class="card-cards">Contains ${pack.cardsGiven} cards</div>
                <div class="pack-actions">
                    <button class="btn btn-primary" data-pack-id="${pack.packId}" data-action="buy" data-display-price="${displayPrice}">
                        <span>💰</span> Buy
                    </button>
                    <button class="btn btn-accent" data-pack-id="${pack.packId}" data-action="inspect">
                        <span>🔍</span> Inspect
                    </button>
                </div>
            </div>
        `;
        marketplaceGrid.appendChild(packElement);
    });
}


// Helper function to capitalize rarity names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

        

function renderLimitedShop() {
    const limitedShopGrid = document.getElementById('limitedShopGrid');
    const limitedShopSection = document.getElementById('limitedShopSection');
    const timerDisplay = document.getElementById('limitedShopTimer');

    const now = new Date();
    const timeLeft = limitedShopEndTime - now;

    // Hide section if expired
    if (timeLeft <= 0) {
        limitedShopSection.style.display = 'none';
        return;
    }

    // Show section
    limitedShopSection.style.display = 'block';
    limitedShopGrid.innerHTML = '';

    // Countdown timer
    function updateTimer() {
        const now = new Date();
        const diff = limitedShopEndTime - now;

        if (diff <= 0) {
            limitedShopSection.style.display = 'none';
            clearInterval(timerInterval);
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        timerDisplay.textContent = `(${hours}h ${minutes}m ${seconds}s)`;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // Render packs with same styling as marketplace
    gameData.limitedShop.forEach(pack => {
        const rarityDisplay = Object.entries(pack.rarityTable)
            .filter(([rarity, percent]) => percent > 0)
            .map(([rarity, percent]) => `${capitalize(rarity)}: ${percent}%`)
            .join(' | ');

        const packElement = document.createElement('div');
        packElement.className = 'card';
        packElement.innerHTML = `
            <div class="pack-rarity-top" style="font-size: 0.75rem; text-align: center; margin-bottom: 4px;">
                ${rarityDisplay}
            </div>
            <img src="${pack.image}" alt="${pack.name}" class="card-image">
            <div class="card-content">
                <div class="card-name">${pack.name}</div>
                <div class="card-price">$${pack.price.toLocaleString()}</div>
                <div class="card-cards">Contains ${pack.cardsGiven} cards</div>
                <div class="pack-actions">
                    <button class="btn btn-primary" data-pack-id="${pack.packId}" data-action="buy">
                        <span>💰</span> Buy
                    </button>
                    <button class="btn btn-accent" data-pack-id="${pack.packId}" data-action="inspect">
                        <span>🔍</span> Inspect
                    </button>
                </div>
            </div>
        `;
        limitedShopGrid.appendChild(packElement);
    });
}

// Reuse the same helper
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



function calculatePassiveIncome() {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastPlayTime;
    const minutesPassed = Math.floor(timeDiff / (1000 * 6700)); // Convert ms to minutes
    
    if (minutesPassed > 0) {
        const passiveIncome = minutesPassed * passiveIncomeRate;
        gameData.player.balance += passiveIncome;
        lastPlayTime = currentTime;
        
        // Save the current time for next calculation
        localStorage.setItem('lastPlayTime', currentTime);
        
        if (passiveIncome > 0) {
            showNotification('Passive Income', `You earned $${passiveIncome.toLocaleString()} while you were away!`, 'success');
            updateBalanceDisplay();
        }
    }
}
      function startPassiveIncomeInterval() {
    setInterval(() => {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastPlayTime;
        const minutesPassed = Math.floor(timeDiff / (1000 * 60)); // 1 min

        if (minutesPassed >= 1) {
            const passiveIncome = minutesPassed * passiveIncomeRate;
            gameData.player.balance += passiveIncome;
            lastPlayTime = currentTime;
            localStorage.setItem('lastPlayTime', currentTime);
            showNotification('Passive Income', `+$${passiveIncome.toLocaleString()} earned while playing!`, 'success');
            updateBalanceDisplay();
        }
    }, 10000); // check every 10s
}
// QUICK MENU QUICK-MENU
const quickMenu = document.getElementById('quickMenu');
const quickSellBtn = document.getElementById('quickSellBtn');
const quickSellAllBtn = document.getElementById('quickSellAllBtn');
const quickSearchBtn = document.getElementById('quickSearchBtn');      

let currentCardId = null;
let longPressTimer = null;

function showQuickMenu(x, y, cardId) {
    currentCardId = cardId;
    quickMenu.style.left = `${x}px`;
    quickMenu.style.top = `${y}px`;
    quickMenu.style.display = 'block';
}

function hideQuickMenu() {
    quickMenu.style.display = 'none';
    currentCardId = null;
}

document.addEventListener('click', (e) => {
    if (!quickMenu.contains(e.target)) hideQuickMenu();
});

document.addEventListener('contextmenu', (e) => {
    // Prevent default right-click anywhere
    if (e.target.closest('.card')) e.preventDefault();
});

quickSellBtn.addEventListener('click', async () => {
    if (!currentCardId) return;

    // Delay hiding so confirmation shows properly
    setTimeout(() => {
        hideQuickMenu();
    }, 50); // 50ms works nicely without noticeable lag

    const card = gameData.player.inventory.find(item => item.uniqueId === currentCardId);
    const car = gameData.cars.find(c => c.carId === card.cardId);
    const value = calculateDynamicValue(car, card.upgrades, card.customImage, car.image);

    const confirm = await showConfirmation('Sell Car', `Sell ${car.name} for $${Math.floor(value * 0.7).toLocaleString()}?`);
    if (confirm) {
        gameData.player.inventory = gameData.player.inventory.filter(item => item.uniqueId !== card.uniqueId);
        renderInventory();
      recordTransaction('sale', `Car: ${car.name}`, Math.floor(dynamicValue * 0.7));
      
    }
});
quickSellAllBtn.addEventListener('click', async () => {
    if (!currentCardId) return;

    setTimeout(() => {
        hideQuickMenu();
    }, 50);

    const selectedCard = gameData.player.inventory.find(item => item.uniqueId === currentCardId);
    const selectedCar = gameData.cars.find(c => c.carId === selectedCard.cardId);
    const carName = selectedCar.name;

    const cardsToSell = gameData.player.inventory.filter(item => {
        const car = gameData.cars.find(c => c.carId === item.cardId);
        return car.name === carName;
    });

    const totalSellValue = cardsToSell.reduce((acc, card) => {
        const car = gameData.cars.find(c => c.carId === card.cardId);
        const value = calculateDynamicValue(car, card.upgrades, card.customImage, car.image);
        return acc + Math.floor(value * 0.7);
    }, 0);

    const confirm = await showConfirmation('Sell All Variants', `Sell all ${carName} variants for $${totalSellValue.toLocaleString()}?`);
    if (confirm) {
        gameData.player.inventory = gameData.player.inventory.filter(item => {
            const car = gameData.cars.find(c => c.carId === item.cardId);
            return car.name !== carName;
        });
        renderInventory();
        recordTransaction('sale', `Car: ${car.name}`, Math.floor(dynamicValue * 0.7));
    }
});
quickSearchBtn.addEventListener('click', () => {
    if (!currentCardId) return;

    setTimeout(() => {
        hideQuickMenu();
    }, 50);

    // Find the selected card
    const selectedCard = gameData.player.inventory.find(item => item.uniqueId === currentCardId);
    const selectedCar = gameData.cars.find(c => c.carId === selectedCard.cardId);
    const carName = selectedCar.name;

    // Set the search input value to the car name
    document.getElementById('inventorySearch').value = carName;
    
    // Trigger the search by calling renderInventory
    renderInventory();
});
       // Updated renderInventory function
// Add to setupEventListeners():
document.getElementById('inventorySearch').addEventListener('input', () => renderInventory());
document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('inventorySearch').value = '';
    renderInventory();
});
document.getElementById('rarityFilter').addEventListener('change', () => renderInventory());
document.getElementById('tagFilter').addEventListener('change', () => renderInventory());
document.getElementById('sortBy').addEventListener('change', () => renderInventory());

// Replace renderInventory() with this new version:
function renderInventory() {
    if (gameData.player.inventory.length === 0) {
        inventoryGrid.innerHTML = '<div class="empty-message">Your inventory is empty. Buy packs from the Marketplace to get started!</div>';
        return;
    }
    
    // Get filter values
    const searchQuery = document.getElementById('inventorySearch').value.toLowerCase();
    const rarityFilter = document.getElementById('rarityFilter').value;
    const tagFilter = document.getElementById('tagFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
    // Filter inventory
    let filteredInventory = gameData.player.inventory.map(item => {
        const car = gameData.cars.find(c => c.carId === item.cardId);
        return { ...item, car };
    }).filter(({ car }) => {
        // Apply rarity filter
        if (rarityFilter !== 'all' && car.rarity !== rarityFilter) return false;
        
        // Apply tag filter
        if (tagFilter !== 'all') {
            if (tagFilter === 'limited' && !car.tags.includes('limited')) return false;
            if (tagFilter === 'off-sale' && !car.tags.includes('off-sale')) return false;
        }
        
        // Apply search filter
        if (searchQuery) {
            const searchStr = `${car.name} ${car.brand} ${car.rarity}`.toLowerCase();
            if (!searchStr.includes(searchQuery)) return false;
        }
        
        return true;
    });
    
    // Sort inventory
    filteredInventory.sort((a, b) => {
        // Default sort: Limited > Off-sale > Highest Rarity > Lowest Rarity
        if (sortBy === 'default') {
            // Check for limited tag
            const aIsLimited = a.car.tags.includes('limited');
            const bIsLimited = b.car.tags.includes('limited');
            if (aIsLimited !== bIsLimited) return bIsLimited - aIsLimited;
            
            // Check for off-sale tag
            const aIsOffSale = a.car.tags.includes('off-sale');
            const bIsOffSale = b.car.tags.includes('off-sale');
            if (aIsOffSale !== bIsOffSale) return bIsOffSale - aIsOffSale;
            
            // Sort by rarity (mythic > legendary > rare > uncommon > common)
            const rarityOrder = { 'mythic': 1, 'legendary': 2, 'rare': 3, 'uncommon': 4, 'common': 5 };
            const aRarity = rarityOrder[a.car.rarity] || 6;
            const bRarity = rarityOrder[b.car.rarity] || 6;
            return aRarity - bRarity;
        }
        
        // Other sort options
        switch (sortBy) {
            case 'name-asc':
                return a.car.name.localeCompare(b.car.name);
            case 'name-desc':
                return b.car.name.localeCompare(a.car.name);
            case 'value-asc':
                return calculateDynamicValue(a.car, a.upgrades, a.customImage, a.car.image) - 
                       calculateDynamicValue(b.car, b.upgrades, b.customImage, b.car.image);
            case 'value-desc':
                return calculateDynamicValue(b.car, b.upgrades, b.customImage, b.car.image) - 
                       calculateDynamicValue(a.car, a.upgrades, a.customImage, a.car.image);
            case 'rarity-asc':
                return rarityOrder(a.car.rarity) - rarityOrder(b.car.rarity);
            case 'rarity-desc':
                return rarityOrder(b.car.rarity) - rarityOrder(a.car.rarity);
            case 'ovr-asc':
                return calculateOVR(a.car.stats, a.upgrades, a.health || 100) - calculateOVR(b.car.stats, b.upgrades, b.health || 100);
            case 'ovr-desc':
                return calculateOVR(b.car.stats, b.upgrades, b.health || 100) - calculateOVR(a.car.stats, a.upgrades, a.health || 100);
            default:
                return 0;
        }
    });
    
    // Helper function for rarity ordering
    function rarityOrder(rarity) {
        const order = { 'mythic': 1, 'legendary': 2, 'rare': 3, 'uncommon': 4, 'common': 5 };
        return order[rarity] || 6;
    }
    
    // Render filtered inventory
    inventoryGrid.innerHTML = '';
    
    if (filteredInventory.length === 0) {
        inventoryGrid.innerHTML = '<div class="empty-message">No cars match your filters.</div>';
        return;
    }
    
    filteredInventory.forEach(item => {
        const car = item.car;
        const dynamicRarity = calculateDynamicRarity(car.rarity, item.upgrades);
        const dynamicValue = calculateDynamicValue(car, item.upgrades, item.customImage, car.image);
        const currentOVR = calculateOVR(car.stats, item.upgrades, item.health || 100); // Default health to 100 if undefined
        const currentImage = item.customImage || car.image;
        const health = item.health || 100; // Ensure health has a default value

        const cardElement = document.createElement('div');
        // Right-click (desktop)
        cardElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const rect = cardElement.getBoundingClientRect();
            showQuickMenu(e.pageX, e.pageY, item.uniqueId);
        });

        // Long press (mobile)
        cardElement.addEventListener('touchstart', () => {
            longPressTimer = setTimeout(() => {
                const rect = cardElement.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                showQuickMenu(x, y, item.uniqueId);
            }, 500);
        });

        cardElement.addEventListener('touchend', () => clearTimeout(longPressTimer));

        cardElement.className = 'card';
        cardElement.dataset.uniqueId = item.uniqueId;
        cardElement.className = `card ${item.mileage >= 500 && !item.customName ? 'glow' : ''}`;
        cardElement.innerHTML = `
           <div class="card-tags" style="position: absolute; top: 15px; left: 15px; display: flex; gap: 4px; z-index: 2;">
                ${car.tags.map(tag => `<span class="tag tag-${tag.replace(' ', '-')}">${tag.replace('-', ' ')}</span>`).join('')}
                ${health < 50 ? '<span class="tag tag-warning">Needs Repair</span>' : ''}
            </div>
            <img src="${currentImage}" alt="${car.name}" class="card-image">
            <div class="card-rarity rarity-${dynamicRarity}" style="position: absolute; top: 15px; right: 15px; z-index: 2;">
                ${dynamicRarity.charAt(0).toUpperCase() + dynamicRarity.slice(1)}
            </div>
            <div class="card-content">
               <div class="card-name">${car.name}${item.customName ? ` "${item.customName}"` : ''}</div>
                <div class="card-brand">${car.brand}</div>
                <div class="card-stats">
                    <div class="stat">
                        <div class="stat-label">PWR</div>
                        <div class="stat-value">${car.stats.PWR + (item.upgrades?.PWR?.level || 0) * 2}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">SPD</div>
                        <div class="stat-value">${car.stats.SPD + (item.upgrades?.SPD?.level || 0) * 2}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">HDL</div>
                        <div class="stat-value">${car.stats.HDL + (item.upgrades?.HDL?.level || 0) * 2}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">OVR</div>
                        <div class="stat-value">${currentOVR}</div>
                    </div>
                </div>
                <div class="card-value">Value: $${dynamicValue.toLocaleString()}</div>
                <div class="card-obtained">Obtained: ${new Date(item.obtainedAt).toLocaleDateString()}</div>
            </div>
        `;
        
        inventoryGrid.appendChild(cardElement);
    });
}

function renderIndex() {
    indexTableBody.innerHTML = '';
    
    gameData.cars.forEach(car => {
        // Calculate dynamic value for all cars, regardless of ownership
        const displayValue = calculateDynamicValue(car, null, null, car.image);
        
        const row = document.createElement('tr');
        row.dataset.carId = car.carId;
        row.dataset.rarity = car.rarity;
        row.style.cursor = 'pointer';
        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.brand}</td>
            <td class="rarity-cell">
                ${car.rarity.charAt(0).toUpperCase() + car.rarity.slice(1)}
            </td>
            <td>${car.stats.PWR}</td>
            <td>${car.stats.SPD}</td>
            <td>${car.stats.HDL}</td>
            <td>${car.storage || 0}</td>
            <td>${calculateOVR(car.stats)}</td>
            <td>$${displayValue.toLocaleString()}</td>
        `;
        indexTableBody.appendChild(row);
    });
}

        // Calculate OVR from stats
function calculateOVR(stats, upgrades = null, health = 100) {
    let total = 0;
    let count = 0;
    
    // Health multiplier (50% health = 25% penalty, 100% health = no penalty)
    const healthMultiplier = 0.75 + (health / 100 * 0.25);
    
    for (const [stat, value] of Object.entries(stats)) {
        let statValue = value;
        if (upgrades && upgrades[stat]) {
            statValue += upgrades[stat].level * 2; // +2 per upgrade level
        }
        
        // Apply health penalty
        statValue = Math.floor(statValue * healthMultiplier);
        
        total += statValue;
        count++;
    }
    
    // Cap OVR between 1 and 99
    const ovr = Math.round(total / count);
    return Math.min(99, Math.max(1, ovr));
}
        // Show pack contents modal
// Show pack contents modal
function showPackContents(packId) {
    const pack = gameData.packs.find(p => p.packId === packId);
    if (!pack) return;

    packModalTitle.textContent = `${pack.name} Contents`;
    packContents.innerHTML = '';

    const rarityOrder = ['mythic', 'legendary', 'rare', 'uncommon', 'common'];

    const availableCars = gameData.cars.filter(car => 
        pack.contains.includes(car.carId) && 
        !car.tags.includes('off-sale')
    );

    if (availableCars.length === 0) {
        packContents.innerHTML = '<div class="empty-message">No currently available cars in this pack</div>';
        packContentsModal.style.display = 'flex';
        return;
    }

    // Rarity breakdown display
    const rarityDisplay = Object.entries(pack.rarityTable)
        .filter(([rarity, percent]) => percent > 0)
        .map(([rarity, percent]) => `${capitalize(rarity)}: ${percent}%`)
        .join(' | ');

    const rarityInfo = document.createElement('div');
    rarityInfo.className = 'rarity-breakdown';
    rarityInfo.style.cssText = `
        font-size: 0.8rem;
        text-align: center;
        margin-bottom: 10px;
        color: #666;
    `;
    rarityInfo.innerHTML = `<strong>Rarities:</strong> ${rarityDisplay}`;
    packContents.appendChild(rarityInfo);

    // Sort and render cards
    availableCars.sort((a, b) => 
        rarityOrder.indexOf(a.rarity.toLowerCase()) - rarityOrder.indexOf(b.rarity.toLowerCase())
    );

    availableCars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'pack-card';
        carElement.dataset.carId = car.carId;
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="pack-card-image">
            <div class="pack-card-brand">${car.brand}</div>
            <div class="pack-card-rarity rarity-${car.rarity}">${car.rarity.charAt(0).toUpperCase() + car.rarity.slice(1)}</div>
            <div class="pack-card-name">${car.name}</div>
        `;
        packContents.appendChild(carElement);
    });

    packContentsModal.style.display = 'flex';
}


function calculateDynamicRarity(baseRarity, upgrades) {
    if (!upgrades) return baseRarity;
    
    const totalLevels = Object.values(upgrades).reduce((sum, u) => sum + u.level, 0);
    
    // Higher thresholds for better cars to reach higher rarities
    if (totalLevels >= 12) return 'mythic';
    if (totalLevels >= 8) return 'legendary';
    if (totalLevels >= 5) return 'rare';
    if (totalLevels >= 2) return 'uncommon';
    return baseRarity; // Return the original rarity if no upgrade thresholds met
}

function calculateDynamicValue(car, upgrades, customImage, originalImage) {
    // Base value is determined by the car's OVR and rarity
    let baseOVR = calculateOVR(car.stats);
    let value = car.value; // Start with the car's base value
    
    // Apply OVR multiplier - higher OVR cars are worth more
    const ovrMultiplier = 2 + (baseOVR / 100);
    value = Math.floor(value * ovrMultiplier);
    
    // Apply upgrade bonuses - more significant for higher rarity cars
    if (upgrades) {
        const totalLevels = Object.values(upgrades).reduce((sum, u) => sum + u.level, 0);
        
        // Value multiplier based on upgrades (scales with rarity)
        const rarityMultipliers = {
            'common': 0.03,    // 3% per level
            'uncommon': 0.05,  // 5% per level
            'rare': 0.08,      // 8% per level
            'legendary': 0.12,  // 12% per level
            'mythic': 0.15      // 15% per level
        };
        
        const rarityMultiplier = rarityMultipliers[car.rarity] || 0.05;
        value = Math.floor(value * (1 + (totalLevels * rarityMultiplier)));
    }
    
    // Apply small premium for custom colors (5% instead of 10%)
    if (customImage && customImage !== originalImage) {
        value = Math.floor(value * 1.02);
    }
    
    return value;
}
        // Updated showInventoryCard function
function showInventoryCard(uniqueId) {
            const inventoryItem = gameData.player.inventory.find(item => item.uniqueId === uniqueId);
            if (!inventoryItem) return;
            document.getElementById('sellCardBtn').replaceWith(document.getElementById('sellCardBtn').cloneNode(true));
            const car = gameData.cars.find(c => c.carId === inventoryItem.cardId);
            if (!car) return;
 currentRenamingCar = inventoryItem;
            // Calculate dynamic properties
            const dynamicRarity = calculateDynamicRarity(car.rarity, inventoryItem.upgrades);
            const dynamicValue = calculateDynamicValue(car, inventoryItem.upgrades, inventoryItem.customImage, car.image);
            const currentOVR = calculateOVR(car.stats, inventoryItem.upgrades, inventoryItem.health);
            const currentImage = inventoryItem.customImage || car.image;

            // Set modal content
            // Replace the name display line with:
document.getElementById('inventoryCardName').textContent = 
    `${car.name}${inventoryItem.customName ? ` "${inventoryItem.customName}"` : ''}`;
            document.getElementById('inventoryCardBrand').textContent = car.brand;
            document.getElementById('inventoryCardDescription').textContent = car.description;
            document.getElementById('obtainedDate').textContent = `Obtained: ${new Date(inventoryItem.obtainedAt).toLocaleDateString()}`;
            // Set mileage
// Set mileage - update this part
const mileage = inventoryItem.mileage || 0;
document.getElementById('inventoryCardMileage').textContent = `Mileage: ${mileage.toLocaleString()} miles`;
            
            // Set rarity badge
            const rarityElement = document.getElementById('inventoryCardRarity');
            rarityElement.textContent = dynamicRarity.charAt(0).toUpperCase() + dynamicRarity.slice(1);
            rarityElement.className = `card-rarity rarity-${dynamicRarity}`;
            
            // Set meta tags
            const metaElement = document.getElementById('inventoryCardMeta');
            metaElement.innerHTML = car.tags.map(tag => 
                `<span class="tag tag-${tag}">${tag}</span>`
            ).join('');
            
            // Set car image
            document.querySelector('#inventoryCardModal .modal-card-image').src = currentImage;
            
            // Replace the storage comparison code with this:
const storage = car.storage || 0;
document.getElementById('storageBar').style.width = `${storage * 10}%`;
document.getElementById('storageValue').textContent = `${storage}/10 Storage`;
            
            // Set performance stats
            const power = car.stats.PWR + (inventoryItem.upgrades?.PWR?.level || 0) * 2;
            const speed = car.stats.SPD + (inventoryItem.upgrades?.SPD?.level || 0) * 2;
            const handling = car.stats.HDL + (inventoryItem.upgrades?.HDL?.level || 0) * 2;
            
            document.getElementById('powerValue').textContent = power;
            document.getElementById('speedValue').textContent = speed;
            document.getElementById('handlingValue').textContent = handling;
            document.getElementById('overallValue').textContent = currentOVR;
            
            document.getElementById('powerBar').style.width = `${power}%`;
            document.getElementById('speedBar').style.width = `${speed}%`;
            document.getElementById('handlingBar').style.width = `${handling}%`;
            document.getElementById('overallBar').style.width = `${currentOVR}%`;
            
const renameBtn = document.getElementById('renameCarBtn');
    if (renameBtn) {
        if (inventoryItem.mileage >= 500) {
            renameBtn.style.display = 'inline-block';
            renameBtn.onclick = () => showRenameModal(uniqueId);
        } else {
            renameBtn.style.display = 'none';
            renameBtn.onclick = null;
        }
    }
            
            // Set sell button text
            document.getElementById('sellCardBtn').innerHTML = 
                `<span>💰</span> Sell ($${Math.floor(dynamicValue * 0.7).toLocaleString()})`;
            
            // Add tab switching functionality
            document.querySelectorAll('#inventoryCardModal .inventory-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.dataset.tab;
                    
                    // Update active tab
                    document.querySelectorAll('#inventoryCardModal .inventory-tab').forEach(t => 
                        t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding content
                    document.querySelectorAll('#inventoryCardModal .inventory-tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    document.getElementById(`${tabId}-tab`).classList.add('active');
                });
            });
            
            // Add event listeners for buttons
            document.getElementById('sellCardBtn').addEventListener('click', async () => {
    const confirm = await showConfirmation(
        'Sell Card', 
        `Are you sure you want to sell ${car.name} for $${Math.floor(dynamicValue * 0.7).toLocaleString()}?`
    );
    
    if (confirm) {
        gameData.player.balance += Math.floor(dynamicValue * 0.7);
        gameData.player.inventory = gameData.player.inventory.filter(item => item.uniqueId !== uniqueId);
        updateBalanceDisplay();
        renderInventory();
        recordTransaction('sale', `Car: ${car.name}`, Math.floor(dynamicValue * 0.7));
        inventoryCardModal.style.display = 'none';
        showNotification('Card Sold', `You sold ${car.name} for $${Math.floor(dynamicValue * 0.7).toLocaleString()}`, 'success');
        saveGame();
    }
});
            
            document.getElementById('customizeCardBtn').addEventListener('click', () => {
                showCustomizationModal(uniqueId);
            });
            
            
            // Ensure modal is displayed
            inventoryCardModal.style.display = 'flex';
        }

        let currentCustomizationItem = null;
    let selectedColorIndex = 0;
     
    async function performRepair(carItem, repairType) {
    const repairData = {
        slight: { amount: 25, cost: 5000, message: 'Basic maintenance performed' },
        moderate: { amount: 50, cost: 8000, message: 'Significant repairs completed' },
        full: { amount: 100, cost: 15000, message: 'Full restoration complete' }
    };
    
    const { amount, cost, message } = repairData[repairType];
    
    if (gameData.player.balance < cost) {
        showNotification('Insufficient Funds', `You need $${cost.toLocaleString()} for this repair.`, 'error');
        return;
    }
    
    // Don't allow repair if health is already max
    if (carItem.health >= 100 && repairType === 'full') {
        showNotification('No Repair Needed', 'Your car is already in perfect condition!', 'info');
        return;
    }
    
    const confirm = await showConfirmation(
        'Confirm Repair',
        `Perform ${repairType} repair for $${cost.toLocaleString()}? This will restore ${repairType === 'full' ? 'all' : amount+'%'} of your car's health.`
    );
    
    if (!confirm) return;
    
    // Apply repair
    gameData.player.balance -= cost;
    carItem.health = Math.min(100, carItem.health + amount);
    
    // Update UI
    document.getElementById('healthBarFill').style.width = `${carItem.health}%`;
    document.getElementById('healthValue').textContent = `${carItem.health}%`;
    
    // Update condition text
    let conditionText = 'Excellent';
    let conditionClass = 'excellent';
    if (carItem.health < 20) {
        conditionText = 'Bad';
        conditionClass = 'bad';
    } else if (carItem.health < 40) {
        conditionText = 'Poor';
        conditionClass = 'poor';
    } else if (carItem.health < 60) {
        conditionText = 'Fair';
        conditionClass = 'fair';
    } else if (carItem.health < 80) {
        conditionText = 'Good';
        conditionClass = 'good';
    }
    const conditionValue = document.getElementById('conditionValue');
    conditionValue.textContent = conditionText;
    conditionValue.className = `condition-value ${conditionClass}`;
    
    updateBalanceDisplay();
    showNotification('Repair Complete', message, 'success');
    saveGame();
}
      // Update showCustomizationModal function:
function showCustomizationModal(uniqueId) {
    const inventoryItem = gameData.player.inventory.find(item => item.uniqueId === uniqueId);
    if (!inventoryItem) return;
    
    const car = gameData.cars.find(c => c.carId === inventoryItem.cardId);
    if (!car) return;
    
    currentCustomizationItem = inventoryItem;
    customizationTitle.textContent = `Customize ${car.name}`;
    
    // Initialize tabs
    document.querySelectorAll('.customization-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.customization-tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('.customization-tab[data-tab="customize"]').classList.add('active');
    document.getElementById('customize-tab').classList.add('active');

    // Set car image for both tabs
    const currentImage = inventoryItem.customImage || car.image;
    customizationCarImage.src = currentImage;
    document.getElementById('upgradeCarImage').src = currentImage;
    
    // Initialize upgrade stats if they don't exist
    if (!inventoryItem.upgrades) {
        inventoryItem.upgrades = {
            PWR: { level: 0 },
            SPD: { level: 0 },
            HDL: { level: 0 }
        };
    }
    
    // Populate color options
    colorOptions.innerHTML = '';
    if (car.colors && car.colors.length > 0) {
        car.colors.forEach((color, index) => {
            const colorElement = document.createElement('div');
            colorElement.className = `color-swatch ${currentImage === color.image ? 'selected' : ''}`;
            colorElement.style.backgroundColor = color.colorCode;
            colorElement.dataset.index = index;
            
            colorElement.addEventListener('click', () => {
                document.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.remove('selected'));
                colorElement.classList.add('selected');
                selectedColorIndex = index;
                customizationCarImage.src = car.colors[index].image;
                updateTransactionOverview(car, index);
            });
            
            colorOptions.appendChild(colorElement);
            
            // Set selected index if this is the current color
            if (currentImage === color.image) {
                selectedColorIndex = index;
            }
        });
    } else {
        colorOptions.innerHTML = '<div class="empty-message">No color options available for this car</div>';
    }
    const repairCarImage = document.getElementById('repairCarImage');
    const healthBarFill = document.getElementById('healthBarFill');
    const healthValue = document.getElementById('healthValue');
    const mileageValue = document.getElementById('mileageValue');
    const conditionValue = document.getElementById('conditionValue');
    
    repairCarImage.src = currentImage;
    healthBarFill.style.width = `${currentCustomizationItem.health}%`;
    healthValue.textContent = `${currentCustomizationItem.health}%`;
    mileageValue.textContent = currentCustomizationItem.mileage.toLocaleString();
    
    // Set condition text
    let conditionText = 'Excellent';
    let conditionClass = 'excellent';
    if (currentCustomizationItem.health < 20) {
        conditionText = 'Bad';
        conditionClass = 'bad';
    } else if (currentCustomizationItem.health < 40) {
        conditionText = 'Poor';
        conditionClass = 'poor';
    } else if (currentCustomizationItem.health < 60) {
        conditionText = 'Fair';
        conditionClass = 'fair';
    } else if (currentCustomizationItem.health < 80) {
        conditionText = 'Good';
        conditionClass = 'good';
    }
    conditionValue.textContent = conditionText;
    conditionValue.className = `condition-value ${conditionClass}`;
    
    // Add repair button event listeners
    document.querySelectorAll('.repair-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const repairType = this.dataset.repairType;
            performRepair(currentCustomizationItem, repairType);
        });
    });
    // Initialize transaction overview
    updateTransactionOverview(car, selectedColorIndex);
    
    // Calculate initial OVR for upgrade tab
    updateUpgradeOVR(car, inventoryItem);
    renderUpgradeStats(inventoryItem);
    customizationModal.style.display = 'flex';
}

function renderUpgradeStats(inventoryItem) {
    const car = gameData.cars.find(c => c.carId === inventoryItem.cardId);
    if (!car) return;
    
    const upgradeStats = document.getElementById('upgradeStats');
    upgradeStats.innerHTML = '';
    
    // Define rarity multipliers - higher rarity cars cost more to upgrade
    const rarityMultipliers = {
        'common': 1,
        'uncommon': 2.5,
        'rare': 4,
        'legendary': 7,
        'mythic': 15
    };
    
    // Calculate base cost multiplier based on car value and rarity
    const rarityMultiplier = rarityMultipliers[car.rarity] || 1;
    const baseCostMultiplier = Math.max(1, (car.value / 10000) * rarityMultiplier);
    
    // Create upgrade UI for each stat
    Object.entries(car.stats).forEach(([stat, baseValue]) => {
        const upgrade = inventoryItem.upgrades[stat] || { level: 0 };
        const currentLevel = upgrade.level;
        // More expensive formula that scales with car value, rarity and becomes exponentially more expensive per level
        const nextLevelCost = Math.floor(1000 * baseCostMultiplier * Math.pow(2.5, currentLevel));
        const currentValue = baseValue + (currentLevel * 2); // +2 per level
        
        const statElement = document.createElement('div');
        statElement.className = 'upgrade-stat';
        statElement.innerHTML = `
            <div class="upgrade-stat-header">
                <div class="upgrade-stat-name">${stat}</div>
                <div class="upgrade-stat-level">Level ${currentLevel}/6</div>
            </div>
            <div class="upgrade-stat-value">${currentValue}</div>
            <div class="modal-stat-bar">
                <div class="modal-stat-bar-fill" style="width: ${currentValue}%"></div>
            </div>
            <div class="upgrade-stat-cost">
                Next level: $${nextLevelCost.toLocaleString()}
            </div>
            <button class="btn btn-primary upgrade-btn" data-stat="${stat}" ${currentLevel >= 6 ? 'disabled' : ''}>
                ${currentLevel >= 6 ? 'MAX LEVEL' : 'Upgrade'}
            </button>
        `;
        upgradeStats.appendChild(statElement);
    });
    
    // Add event listeners for upgrade buttons
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const stat = this.dataset.stat;
            const car = gameData.cars.find(c => c.carId === currentCustomizationItem.cardId);
            if (!car) return;
            
            const currentLevel = currentCustomizationItem.upgrades[stat]?.level || 0;
            const baseCostMultiplier = Math.max(1, car.value / 10000);
            const upgradeCost = Math.floor(1000 * baseCostMultiplier * Math.pow(2.5, currentLevel));
            
            if (gameData.player.balance < upgradeCost) {
                showNotification('Insufficient Funds', `You need $${upgradeCost.toLocaleString()} to upgrade this stat.`, 'error');
                return;
            }
            
            const confirm = await showConfirmation(
                'Upgrade Stat', 
                `Are you sure you want to upgrade ${stat} to level ${currentLevel + 1} for $${upgradeCost.toLocaleString()}?`
            );
            
            if (confirm) {
                gameData.player.balance -= upgradeCost;
                if (!currentCustomizationItem.upgrades[stat]) {
                    currentCustomizationItem.upgrades[stat] = { level: 0 };
                }
                currentCustomizationItem.upgrades[stat].level++;
                updateBalanceDisplay();
                renderUpgradeStats(currentCustomizationItem);
                updateUpgradeOVR(car, currentCustomizationItem);
                renderInventory(); // Refresh inventory view
                if (inventoryCardModal.style.display === 'flex') {
                    showInventoryCard(currentCustomizationItem.uniqueId); // Refresh popup if open
                }
                saveGame();
                showNotification('Upgrade Complete', `${stat} upgraded to level ${currentCustomizationItem.upgrades[stat].level}!`, 'success');
            }
        });
    });
}

// Add function to update OVR in upgrade tab
function updateUpgradeOVR(car, inventoryItem) {
    const baseOVR = calculateOVR(car.stats);
    let upgradedOVR = baseOVR;
    
    // Calculate upgraded stats
    if (inventoryItem.upgrades) {
        let total = 0;
        let count = 0;
        
        Object.entries(car.stats).forEach(([stat, baseValue]) => {
            const upgradeLevel = inventoryItem.upgrades[stat]?.level || 0;
            total += baseValue + (upgradeLevel * 2); // +2 per level
            count++;
        });
        
        upgradedOVR = Math.round(total / count);
    }
    
    document.getElementById('upgradeOVR').textContent = upgradedOVR;
}

// Add tab switching to setupEventListeners():
document.querySelectorAll('.customization-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        
        // Switch tabs
        document.querySelectorAll('.customization-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.customization-tab-content').forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
        
        // If upgrade tab, populate stats
        if (tabId === 'upgrade' && currentCustomizationItem) {
            renderUpgradeStats(currentCustomizationItem);
        }
    });
});

function updateTransactionOverview(car, colorIndex) {
    const transactionItems = document.getElementById('transactionItems');
    const currentImage = currentCustomizationItem.customImage || car.image;
    const selectedColor = car.colors[colorIndex];
    
    transactionItems.innerHTML = '';
    
    // Only show color change if it's different from current
    if (selectedColor && currentImage !== selectedColor.image) {
        const colorItem = document.createElement('div');
        colorItem.className = 'transaction-item';
        colorItem.innerHTML = `
            <span>Color Change</span>
            <span>$1,000</span>
        `;
        transactionItems.appendChild(colorItem);
    }
    
    // Update total
    const totalAmount = (selectedColor && currentImage !== selectedColor.image) ? 1000 : 0;
    document.querySelector('.transaction-total .cost-amount').textContent = `$${totalAmount.toLocaleString()}`;
}

    

function showIndexCard(carId) {
    const car = gameData.cars.find(c => c.carId === carId);
    if (!car) return;
    
    // Check if player owns this car
    const playerCar = gameData.player.inventory.find(item => item.cardId === car.carId);
    const inCollection = !!playerCar;
    
    // Calculate dynamic value if owned
    let displayValue = car.value;
    let displayOVR = calculateOVR(car.stats);
    
    if (playerCar) {
        displayValue = calculateDynamicValue(car, playerCar.upgrades, playerCar.customImage, car.image);
        displayOVR = calculateOVR(car.stats, playerCar.upgrades);
    }
    
    // Updated title with inline rarity
    indexCardTitle.innerHTML = `${car.name} <span class="card-rarity rarity-${car.rarity}">${car.rarity.charAt(0).toUpperCase() + car.rarity.slice(1)}</span>`;
    
    // Remove the separate rarity span from modal-title since it's now in the title
    indexCardRarity.style.display = 'none';
    
    indexCardBody.innerHTML = `
        <div class="modal-card">
            <img src="${playerCar?.customImage || car.image}" alt="${car.name}" class="modal-card-image">
            <div class="modal-card-details">
            <div class="modal-card-meta">
                    ${car.tags.map(tag => `<span class="tag tag-${tag}">${tag}</span>`).join('')}
                    ${inCollection ? '<span class="tag tag-success">Owned</span>' : ''}
                </div>
                <div class="modal-card-brand">${car.brand}</div>
                <div class="modal-card-stats">
                    <div class="modal-stat">
                        <div class="modal-stat-label">Power</div>
                        <div class="modal-stat-value">${car.stats.PWR + (playerCar?.upgrades?.PWR?.level || 0) * 2}</div>
                        <div class="modal-stat-bar">
                            <div class="modal-stat-bar-fill" style="width: ${car.stats.PWR + (playerCar?.upgrades?.PWR?.level || 0) * 2}%"></div>
                        </div>
                    </div>
                    <div class="modal-stat">
                        <div class="modal-stat-label">Speed</div>
                        <div class="modal-stat-value">${car.stats.SPD + (playerCar?.upgrades?.SPD?.level || 0) * 2}</div>
                        <div class="modal-stat-bar">
                            <div class="modal-stat-bar-fill" style="width: ${car.stats.SPD + (playerCar?.upgrades?.SPD?.level || 0) * 2}%"></div>
                        </div>
                    </div>
                    <div class="modal-stat">
                        <div class="modal-stat-label">Handling</div>
                        <div class="modal-stat-value">${car.stats.HDL + (playerCar?.upgrades?.HDL?.level || 0) * 2}</div>
                        <div class="modal-stat-bar">
                            <div class="modal-stat-bar-fill" style="width: ${car.stats.HDL + (playerCar?.upgrades?.HDL?.level || 0) * 2}%"></div>
                        </div>
                    </div>
                    <div class="modal-stat">
                        <div class="modal-stat-label">Overall</div>
                        <div class="modal-stat-value">${displayOVR}</div>
                        <div class="modal-stat-bar">
                            <div class="modal-stat-bar-fill" style="width: ${displayOVR}%"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-card-description">
                    ${car.description}
                </div>
                <div style="margin-top: 15px;">
                    <strong>Value:</strong> $${displayValue.toLocaleString()}
                    ${inCollection ? ' <span class="hint">(Dynamic value based on upgrades)</span>' : ''}
                </div>
                <div style="margin-top: 5px;">
                    <strong>Available in packs:</strong> 
                    ${gameData.packs.filter(p => p.contains.includes(car.carId)).map(p => p.name).join(', ')}
                </div>
            </div>
        </div>
    `;
    
    indexCardModal.style.display = 'flex';
}

     async function buyPack(packId) {
    // If a purchase is already in progress, ignore additional clicks
    if (isPurchaseInProgress) return;
    
    const pack = gameData.packs.find(p => p.packId === packId);
    if (!pack) return;
    
    // Get the displayed price from the button
    const button = document.querySelector(`button[data-pack-id="${packId}"][data-action="buy"]`);
    const displayPrice = button ? parseInt(button.dataset.displayPrice) : pack.price;
    
    if (gameData.player.balance < displayPrice) {
        showNotification('Insufficient Funds', 'You don\'t have enough money to buy this pack!', 'error');
        return;
    }
    
    // Set purchase flag to prevent multiple purchases
    isPurchaseInProgress = true;
    
    const confirm = await showConfirmation(
        'Buy Pack', 
        `Are you sure you want to buy ${pack.name} for $${displayPrice.toLocaleString()}?`
    );
    
    // Reset purchase flag regardless of confirmation result
    isPurchaseInProgress = false;
    
    if (!confirm) return;
    
    // Record transaction with the display price
    recordTransaction('purchase', `Pack: ${pack.name}`, displayPrice);
    gameData.player.stats.packsOpened++;
    gameData.player.balance -= displayPrice;
    updateBalanceDisplay();
    updateStatsDisplay();
    
    debugLog(`Pack purchased: ${pack.name}`, `Price: $${displayPrice}`, `New balance: $${gameData.player.balance}`);
    
    showNotification('Pack Purchased', `You bought ${pack.name} for $${displayPrice.toLocaleString()}`, 'success');
    
    // Open the pack
    openPack(pack);
    saveGame();
}
      function applyDynamicPricing() {
    gameData.packs.forEach(pack => {
        // Store the original price as fixedPrice if it exists
        if (!pack.fixedPrice && pack.price) {
            pack.fixedPrice = pack.price;
        }
        
        // Calculate and update the dynamic price
        pack.price = calculateDynamicPackPrice(pack);
    });
}

function openPack(pack) {
    // Determine if this is a limited pack
    const isLimitedPack = gameData.limitedShop.some(p => p.packId === pack.packId);
    
    const availableCars = gameData.cars.filter(car => 
    pack.contains.includes(car.carId) && 
    (!car.tags.includes('off-sale') || gameData.player.inventory.some(i => i.cardId === car.carId))
);
    
    if (availableCars.length === 0) {
        showNotification('Pack Error', 'This pack currently has no available cards!', 'error');
        return;
    }
    
    // Generate the cards for this pack
    const cardsInPack = [];
    
    for (let i = 0; i < pack.cardsGiven; i++) {
        const rarity = getRandomRarity(pack.rarityTable);
        const carsOfRarity = availableCars.filter(car => car.rarity === rarity);
        
        // Inside the for loop in openPack
if (carsOfRarity.length > 0) {
    const randomCar = { ...carsOfRarity[Math.floor(Math.random() * carsOfRarity.length)] };
    
    // Select a random color if available
    if (randomCar.colors && randomCar.colors.length > 0) {
        const selectedColor = randomCar.colors[Math.floor(Math.random() * randomCar.colors.length)];
        randomCar.customImage = selectedColor.image; // Store image for this specific pull
        randomCar.colorName = selectedColor.name;    // Optional: store name
        randomCar.colorCode = selectedColor.colorCode; // Optional: use for styling, etc.
    }

    cardsInPack.push(randomCar);
} else {
    const randomCar = { ...availableCars[Math.floor(Math.random() * availableCars.length)] };

    if (randomCar.colors && randomCar.colors.length > 0) {
        const selectedColor = randomCar.colors[Math.floor(Math.random() * randomCar.colors.length)];
        randomCar.customImage = selectedColor.image;
        randomCar.colorName = selectedColor.name;
        randomCar.colorCode = selectedColor.colorCode;
    }

    cardsInPack.push(randomCar);
}

    }
    
    // Show opening animation with special message for limited packs
    showOpeningAnimation(pack, cardsInPack, isLimitedPack);
}

function showOpeningAnimation(pack, cards, isLimitedPack = false) {
    // Add cards to inventory before showing animation
    cards.forEach(card => {
        const uniqueId = generateUniqueId();
        gameData.player.inventory.push({
    uniqueId,
    cardId: card.carId,
    obtainedAt: new Date().toISOString(),
    mileage: 0,
    health: 100, // Explicitly set health
    upgrades: {},
    customImage: card.customImage,
    colorName: card.colorName,
    colorCode: card.colorCode
});
    });
    
    packOpeningModal.style.display = 'flex';
    openingAnimation.innerHTML = '';
    
    // Disable close button and clicking outside
    const closeButton = packOpeningModal.querySelector('.close-modal');
    closeButton.style.display = 'none';
    packOpeningModal.style.pointerEvents = 'auto';
    
    let currentCardIndex = 0;
    
    function showNextCard() {
        if (currentCardIndex >= cards.length) {
            showAllCards(cards, isLimitedPack);
            return;
        }
        
        const card = cards[currentCardIndex];
        openingAnimation.innerHTML = `
            <h2>${pack.name} ${isLimitedPack ? '✨' : ''}</h2>
            <p>Card ${currentCardIndex + 1} of ${cards.length}</p>
            <div class="opening-card">
                <img src="${card.customImage || card.image}" alt="${card.name}" class="card-image">

                <div class="card-rarity rarity-${card.rarity}">${card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}</div>
                <div class="card-content">
                    <div class="card-name">${card.name}</div>
                    <div class="card-brand">${car.brand}</div>
                    <div class="card-stats">
                        <div class="stat">
                            <div class="stat-label">PWR</div>
                            <div class="stat-value">${card.stats.PWR}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">SPD</div>
                            <div class="stat-value">${card.stats.SPD}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">HDL</div>
                            <div class="stat-value">${card.stats.HDL}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">OVR</div>
                            <div class="stat-value">${calculateOVR(card.stats)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="opening-controls">
                <button class="btn btn-primary" id="nextCardBtn">
                    <span>👉</span> NEXT
                </button>
            </div>
        `;
        
        document.getElementById('nextCardBtn').addEventListener('click', () => {
            currentCardIndex++;
            showNextCard();
        });
    }
    
    function showAllCards(cards, isLimited) {
        openingAnimation.innerHTML = `
            <h2>${pack.name} ${isLimited ? '✨' : ''}</h2>
            <p>You got these cards:</p>
            <div class="cards-lineup">
                ${cards.map(card => `
                    <div class="lineup-card">
                        <img src="${card.image}" alt="${card.name}" class="card-image">
                        <div class="card-rarity rarity-${card.rarity}">${card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}</div>
                        <div class="card-content">
                            <div class="card-name">${card.name}</div>
                            <div class="card-brand">${card.brand}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="opening-controls">
                <button class="btn btn-success" id="finishOpeningBtn">
                    <span>🎉</span> OKAY
                </button>
            </div>
        `;
        
        closeButton.style.display = 'block';
        
        document.getElementById('finishOpeningBtn').addEventListener('click', () => {
            renderInventory();
            packOpeningModal.style.display = 'none';
            
            if (cards.some(card => ['legendary', 'mythic'].includes(card.rarity))) {
                const rareCards = cards.filter(card => ['legendary', 'mythic'].includes(card.rarity));
                showNotification(
                    isLimited ? 'Amazing Limited Pull!' : 'Amazing Pull!', 
                    `You got ${rareCards.length} rare card${rareCards.length > 1 ? 's' : ''}: ${rareCards.map(c => c.name).join(', ')}`,
                    'success'
                );
            } else {
                showNotification(
                    isLimited ? 'Limited Pack Opened' : 'Pack Opened', 
                    `You got ${cards.length} new cards! ${isLimited ? '✨' : ''}`,
                    'success'
                );
            }
        });
    }
    
    showNextCard();
}

        // Get random rarity based on rarity table
        function getRandomRarity(rarityTable) {
            const total = Object.values(rarityTable).reduce((sum, val) => sum + val, 0);
            let random = Math.random() * total;
            
            for (const [rarity, weight] of Object.entries(rarityTable)) {
                if (random < weight) return rarity;
                random -= weight;
            }
            
            return 'common'; // fallback
        }

       function showOpeningAnimation(pack, cards) {
    // Add cards to inventory before showing animation
    cards.forEach(card => {
        const uniqueId = generateUniqueId();
        gameData.player.inventory.push({
    uniqueId,
    health: 100, 
    cardId: card.carId,
    obtainedAt: new Date().toISOString(),
    mileage: 0,
    upgrades: {},
    customImage: card.customImage, // <- Store it
    colorName: card.colorName,     // Optional
    colorCode: card.colorCode      // Optional
});

    });
    
    packOpeningModal.style.display = 'flex';
    openingAnimation.innerHTML = '';
    
    // Disable close button and clicking outside
    const closeButton = packOpeningModal.querySelector('.close-modal');
    closeButton.style.display = 'none';
    packOpeningModal.style.pointerEvents = 'auto'; // Prevent closing by clicking outside
    
    let currentCardIndex = 0;
    
    function showNextCard() {
        if (currentCardIndex >= cards.length) {
            showAllCards(cards);
            return;
        }
        
        const card = cards[currentCardIndex];
        openingAnimation.innerHTML = `
            <h2>${pack.name}</h2>
            <p>Card ${currentCardIndex + 1} of ${cards.length}</p>
            <div class="opening-card">
                <img src="${card.customImage || card.image}" alt="${card.name}" class="card-image">
                <div class="card-rarity rarity-${card.rarity}">${card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}</div>
                <div class="card-content">
                    <div class="card-name">${card.name}</div>
                    <div class="card-brand">${card.brand}</div>
                    <div class="card-stats">
                        <div class="stat">
                            <div class="stat-label">PWR</div>
                            <div class="stat-value">${card.stats.PWR}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">SPD</div>
                            <div class="stat-value">${card.stats.SPD}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">HDL</div>
                            <div class="stat-value">${card.stats.HDL}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">OVR</div>
                            <div class="stat-value">${calculateOVR(card.stats)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="opening-controls">
                <button class="btn btn-primary" id="nextCardBtn">
                    <span>👉</span> NEXT
                </button>
            </div>
        `;
        
        document.getElementById('nextCardBtn').addEventListener('click', () => {
            currentCardIndex++;
            showNextCard();
        });
    }
    
    function showAllCards(cards) {
        openingAnimation.innerHTML = `
            <h2>${pack.name}</h2>
            <p>You got these cards:</p>
            <div class="cards-lineup">
    ${cards.map(card => `
        <div class="lineup-card">
            <img src="${card.customImage || card.image}" alt="${card.name}" class="card-image">
            <div class="card-rarity rarity-${card.rarity}">
                ${card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}
            </div>
            <div class="card-content">
                <div class="card-name">${card.name}</div>
                <div class="card-brand">${card.brand}</div>
                ${card.colorName ? `<div class="card-color">Color: ${card.colorName}</div>` : ''}
            </div>
        </div>
    `).join('')}
</div>

            <div class="opening-controls">
                <button class="btn btn-success" id="finishOpeningBtn">
                    <span>🎉</span> OKAY
                </button>
            </div>
        `;
        
        // Re-enable close button now that all cards are shown
        closeButton.style.display = 'block';
        
        document.getElementById('finishOpeningBtn').addEventListener('click', () => {
            // Update inventory display
            renderInventory();
            
            // Close modal
            packOpeningModal.style.display = 'none';
            
            // Show notification
            if (cards.some(card => ['legendary', 'mythic'].includes(card.rarity))) {
                const rareCards = cards.filter(card => ['legendary', 'mythic'].includes(card.rarity));
                showNotification(
                    'Amazing Pull!', 
                    `You got ${rareCards.length} rare card${rareCards.length > 1 ? 's' : ''}: ${rareCards.map(c => c.name).join(', ')}`,
                    'success'
                );
            } else {
                showNotification('Pack Opened', `You got ${cards.length} new cards!`, 'success');
            }
        });
    }
    
    // Start showing cards
    showNextCard();
}
function showRenameModal(uniqueId) {
    const car = gameData.player.inventory.find(item => item.uniqueId === uniqueId);
    if (!car) return;
    
    currentRenamingCar = car;
    
    // Safely get modal elements
    const modal = document.getElementById('renameModal');
    const nameInput = document.getElementById('customCarName');
    const titleElement = document.getElementById('renameModalTitle');
    const textElement = document.getElementById('renameModalText');
    
    // Check if elements exist before using them
    if (!modal || !nameInput || !titleElement || !textElement) {
        console.error('Rename modal elements not found');
        return;
    }
    
    nameInput.value = car.customName || '';
    
    const carData = gameData.cars.find(c => c.carId === car.cardId);
    const carName = carData ? carData.name : "This car";
    
    if (car.customName) {
        titleElement.textContent = 'Rename Your Car';
        textElement.textContent = `${carName} is currently named "${car.customName}". Enter a new name (1-20 characters)`;
    } else {
        titleElement.textContent = 'Name Your Car';
        textElement.textContent = `You can now give ${carName} a custom name (1-20 characters)`;
    }
    
    modal.style.display = 'flex';
    nameInput.focus();
}
function handleCarRename() {
    if (!currentRenamingCar) return;
    
    const newName = document.getElementById('customCarName').value.trim();
    
    // Validate name length
    if (newName.length < 1 || newName.length > 20) {
        showNotification('Invalid Name', 'Name must be between 1-20 characters', 'error');
        return;
    }
    
    // Set the custom name and bonuses
    currentRenamingCar.customName = newName;
    
    // Get car data for value and rarity calculations
    const carData = gameData.cars.find(c => c.carId === currentRenamingCar.cardId);
    
    if (carData) {
        // Calculate and store value bonus (10% of current value)
        const currentValue = calculateDynamicValue(carData, currentRenamingCar.upgrades, 
                                                 currentRenamingCar.customImage, carData.image);
        currentRenamingCar.valueBonus = currentValue * 0.1;
        
        // Calculate and store rarity bonus
        if (carData.rarity !== 'mythic') {
            const rarityOrder = ['common', 'uncommon', 'rare', 'legendary', 'mythic'];
            const currentIndex = rarityOrder.indexOf(carData.rarity);
            if (currentIndex < rarityOrder.length - 1) {
                currentRenamingCar.rarityBonus = rarityOrder[currentIndex + 1];
            }
        }
    }
    
    // Close modal and update UI
    document.getElementById('renameModal').style.display = 'none';
    renderInventory();
    
    // Explicitly save the game
    saveGame();
    
    showNotification('Car Renamed', `Your car has been renamed to "${newName}"!`, 'success');
}
        // Generate unique ID for inventory items
        function generateUniqueId() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        function showLimitedPackContents(packId) {
    const pack = gameData.limitedShop.find(p => p.packId === packId);
    if (!pack) return;
    
    packModalTitle.textContent = `${pack.name} Contents`;
    packContents.innerHTML = '';
    
    // Get unique cars in this pack (excluding off-sale if not in inventory)
    const availableCars = gameData.cars.filter(car => 
        pack.contains.includes(car.carId) && 
        (!car.tags.includes('off-sale') || gameData.player.inventory.some(i => i.cardId === car.carId))
    );
    
    availableCars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'pack-card';
        carElement.dataset.carId = car.carId;
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="pack-card-image">
            <div class="pack-card-brand">${car.brand}</div>
            
            <div class="pack-card-rarity rarity-${car.rarity}">${car.rarity.charAt(0).toUpperCase() + car.rarity.slice(1)}</div>
<div class="pack-card-name">${car.name}</div>
        `;
        packContents.appendChild(carElement);
    });
    
    packContentsModal.style.display = 'flex';
}

async function buyLimitedPack(packId) {
    // If a purchase is already in progress, ignore additional clicks
    if (isPurchaseInProgress) return;
    
    const pack = gameData.limitedShop.find(p => p.packId === packId);
    if (!pack) return;
    
    if (gameData.player.balance < pack.price) {
        showNotification('Insufficient Funds', 'You don\'t have enough money to buy this pack!', 'error');
        return;
    }
    
    // Set purchase flag to prevent multiple purchases
    isPurchaseInProgress = true;
    
    const confirm = await showConfirmation(
        'Buy Limited Pack', 
        `Are you sure you want to buy ${pack.name} for $${pack.price.toLocaleString()}? This pack is only available for a limited time!`
    );
    
    // Reset purchase flag regardless of confirmation result
    isPurchaseInProgress = false;
    
    if (!confirm) return;
    
    // Record transaction and update stats
    recordTransaction('purchase', `Limited Pack: ${pack.name}`, pack.price);
    gameData.player.stats.packsOpened++;
    gameData.player.balance -= pack.price;
    updateBalanceDisplay();
    updateStatsDisplay();
    
    showNotification('Limited Pack Purchased', `You bought ${pack.name} for $${pack.price.toLocaleString()}`, 'success');
    
    // Open the pack with same animation as regular packs
    openPack(pack);
    saveGame();
}
   // Updated setupEventListeners function
function setupEventListeners() {
    // Tab switching
// Add this to setupEventListeners()
const limitedShopGrid = document.getElementById('limitedShopGrid');
if (limitedShopGrid) {
    limitedShopGrid.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        
        const packId = parseInt(button.dataset.packId);
        const action = button.dataset.action;
        
        if (action === 'inspect') {
            showLimitedPackContents(packId);
        } else if (action === 'buy') {
            buyLimitedPack(packId);
        }
    });
}
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
        
        // Add this condition to render jobs when switching to missions tab
        if (button.dataset.tab === 'missions') {
            renderJobs();
        }
        // Pagination controls
    document.getElementById('prevPageBtn').addEventListener('click', () => {
        if (currentTransactionPage > 1) {
            currentTransactionPage--;
            renderTransactions();
        }
    });
      document.getElementById('nextPageBtn').addEventListener('click', () => {
        const filteredTransactions = getFilteredTransactions(); // You'll need to implement this
        const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
        
        if (currentTransactionPage < totalPages) {
            currentTransactionPage++;
            renderTransactions();
        }
    });
        // Existing inventory rendering condition
        if (button.dataset.tab === 'inventory') {
            renderInventory();
        }
    });
});

  // Mission tab switching
    document.querySelectorAll('.mission-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.mission-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.mission-subtab').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${this.dataset.subtab}-subtab`).classList.add('active');
            
            if (this.dataset.subtab === 'jobs') {
                renderJobs();
            }
        });
    });


    // Job actions
document.getElementById('jobsContainer').addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    
    const jobCard = e.target.closest('.job-card');
    if (!jobCard) return;
    
    const jobId = parseInt(jobCard.dataset.jobId);
    const action = button.dataset.action;
    
    if (action === 'assign') {
        showAssignCarModal(jobId);
    } else if (action === 'collect') {
        collectJobReward(jobId);
    } else if (action === 'decline') {
        declineJob(jobId);
    }
});
// Rename modal events
document.getElementById('confirmRenameBtn').addEventListener('click', handleCarRename);
document.getElementById('cancelRenameBtn').addEventListener('click', () => {
    document.getElementById('renameModal').style.display = 'none';
});


inventoryGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    
    const uniqueId = card.dataset.uniqueId;
    if (uniqueId) {
        const inventoryItem = gameData.player.inventory.find(item => item.uniqueId === uniqueId);
        if (inventoryItem) {
            // Show rename modal if they click the name (and car has 500+ miles)
            const isNameClick = e.target.closest('.card-name');
            if (isNameClick && inventoryItem.mileage >= 500) {
                showRenameModal(uniqueId);
                return;
            }
            showInventoryCard(uniqueId);
        }
    }
});
// Redeem code functionality
    document.getElementById('redeemCodeBtn').addEventListener('click', function() {
        const codeInput = document.getElementById('redeemCodeInput');
        const redeemMessage = document.getElementById('redeemMessage');
        
        if (!codeInput.value.trim()) {
            redeemMessage.textContent = "Please enter a code.";
            redeemMessage.className = "redeem-message error";
            redeemMessage.style.display = "block";
            return;
        }
        
        const result = redeemCode(codeInput.value);
        
        redeemMessage.textContent = result.message;
        redeemMessage.className = `redeem-message ${result.success ? 'success' : 'error'}`;
        redeemMessage.style.display = "block";
        
        if (result.success) {
            codeInput.value = "";
        }
    });
    
    // Allow pressing Enter to redeem
    document.getElementById('redeemCodeInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('redeemCodeBtn').click();
        }
    });
    // Marketplace pack actions
    marketplaceGrid.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;
        
        const packId = parseInt(button.dataset.packId);
        const action = button.dataset.action;
        
        if (action === 'inspect') {
            showPackContents(packId);
        } else if (action === 'buy') {
            buyPack(packId);
        }
    });
    
    // Pack contents card click
    packContents.addEventListener('click', (e) => {
        const card = e.target.closest('.pack-card');
        if (!card) return;
        
        const carId = parseInt(card.dataset.carId);
        showIndexCard(carId);
    });
    
    // Inventory card click
    inventoryGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    
    const uniqueId = card.dataset.uniqueId;
    if (uniqueId) {
        showInventoryCard(uniqueId);
    }
});
    // Index table row click
    indexTableBody.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        if (!row) return;
        
        const carId = parseInt(row.dataset.carId);
        showIndexCard(carId);
    });
    
    // Modal close buttons
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        // Don't allow closing pack opening modal unless all cards are shown
        if (e.target.closest('#packOpeningModal') && 
            !openingAnimation.querySelector('#finishOpeningBtn')) {
            return;
        }
        packContentsModal.style.display = 'none';
        inventoryCardModal.style.display = 'none';
        indexCardModal.style.display = 'none';
        packOpeningModal.style.display = 'none';
        confirmationDialog.style.display = 'none';
        customizationModal.style.display = 'none';
    });
});

// In your setupEventListeners function, replace the window click handler with this:
window.addEventListener('click', (e) => {
    // Only handle clicks outside for modals that should close on outside click
    if (e.target === packContentsModal) {
        packContentsModal.style.display = 'none';
    }
    if (e.target === inventoryCardModal) {
        inventoryCardModal.style.display = 'none';
    }
    if (e.target === indexCardModal) {
        indexCardModal.style.display = 'none';
    }
    if (e.target === customizationModal) {
        customizationModal.style.display = 'none';
    }
    
    // Special handling for pack opening modal
    if (e.target === packOpeningModal && 
        openingAnimation.querySelector('#finishOpeningBtn')) {
        packOpeningModal.style.display = 'none';
    }
});

// Remove the existing confirmationDialog click handler if you have one
    
    
    // Add this event listener in the setupEventListeners function
    applyCustomizationBtn.addEventListener('click', async function() {
        if (!currentCustomizationItem) return;
        
        const car = gameData.cars.find(c => c.carId === currentCustomizationItem.cardId);
        if (!car) return;
        
        const selectedColor = car.colors[selectedColorIndex];
        
        // Check if the color is already applied
        if (currentCustomizationItem.customImage === selectedColor.image) {
            showNotification('No Changes', 'This color is already applied to the car.', 'info');
            return;
        }
        
        // Check if player has enough money
        if (gameData.player.balance < 1000) {
            showNotification('Insufficient Funds', 'You need $1,000 to customize your car.', 'error');
            return;
        }
        
        const confirm = await showConfirmation(
            'Apply Customization', 
            `Are you sure you want to apply this color for $1,000?`
        );
        
        if (confirm) {
            // Deduct money and apply changes
            gameData.player.balance -= 1000;
            currentCustomizationItem.customImage = selectedColor.image;
            recordTransaction('purchase', `Customization: ${car.name}`, 1000);
            // Update UI
            updateBalanceDisplay();
            saveGame();
            renderInventory();
            customizationModal.style.display = 'none';
            if (inventoryCardModal.style.display === 'flex') {
    showInventoryCard(currentCustomizationItem.uniqueId); // Refresh popup if open
}
            showNotification('Customization Applied', `Your ${car.name} now has a new color!`, 'success');
        }
    });
    
}
// Add this function to track transactions:
function recordTransaction(type, item, amount) {
    gameData.player.transactions.push({
        date: new Date().toISOString(),
        type,
        item,
        amount,
        balanceAfter: gameData.player.balance
    });
    
    // Update peak cash if needed
    if (type === 'sale' && gameData.player.balance > gameData.player.stats.peakCash) {
        gameData.player.stats.peakCash = gameData.player.balance;
    }
}
function getFilteredTransactions() {
    const typeFilter = document.getElementById('transactionTypeFilter').value;
    const priceFilter = document.getElementById('transactionPriceFilter').value;
    const searchQuery = document.getElementById('transactionSearch').value.toLowerCase();
    
    return gameData.player.transactions.filter(tx => {
        if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
        
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(p => p.endsWith('+') ? 
                parseInt(p.replace('+', '')) : parseInt(p));
            
            if (priceFilter.endsWith('+')) {
                if (tx.amount < min) return false;
            } else {
                if (tx.amount < min || tx.amount > max) return false;
            }
        }
        
        if (searchQuery && !tx.item.toLowerCase().includes(searchQuery)) return false;
        
        return true;
    });
}
     function resetStats() {
    showConfirmation(
        'Reset Game', 
        'Are you sure you want to reset your game? All progress will be lost!'
    ).then(confirmed => {
        if (!confirmed) return;

        // Keep the user ID
        const userId = gameData.player.userId || localStorage.getItem('kwpidCarsUserId') || generateUserId();
        
        // Remove all relevant localStorage keys except user ID
        localStorage.removeItem('kwpidCarsSave');
        localStorage.removeItem('lastCarIds');
        localStorage.removeItem('seenOffSaleNotifications');
        localStorage.removeItem('carCooldowns');

        // Clear in-memory game state but preserve user ID
        gameData.player = {
            userId: userId,
            balance: 100000,
            inventory: [],
            transactions: [],
            stats: {
                packsOpened: 0,
                peakCash: 100000,
                playTimeMinutes: 0,
                carsCollected: 0,
                jobs: {
                    completed: 0,
                    earnings: 0,
                    highestPaying: { amount: 0, name: "None" },
                    mostUsedCar: { id: null, count: 0, name: "None" },
                    totalTime: 0
                },
                races: {
                    completed: 0,
                    wins: 0,
                    earnings: 0,
                    highestPaying: { amount: 0, name: "None" },
                    mostUsedCar: { id: null, count: 0, name: "None" },
                    trackCounts: {}
                }
            }
        };
        gameData.activeJobs = [];
        gameData.activeRaces = [];
        gameData.carCooldowns = {};
        gameData.codes.forEach(code => code.redeemed = false);
        
        // Reset UI
        updateBalanceDisplay();
        renderInventory();
        updateStatsDisplay();
        
        showNotification('Game Reset', 'Your game has been reset to default settings', 'success');
        
        // Save the reset state
        saveGame();
    });
}
function showConfirmation(title, message) {
    return new Promise((resolve) => {
        // Prevent multiple confirmations
        if (document.body.classList.contains('dialog-open')) {
            resolve(false);
            return;
        }

        // Add class to body to prevent scrolling
        document.body.classList.add('dialog-open');
        
        confirmationTitle.textContent = title;
        confirmationMessage.textContent = message;
        confirmationDialog.style.display = 'flex';
        
        // Focus the OK button for better keyboard/mobile accessibility
        setTimeout(() => confirmOk.focus(), 100);
        
        const handleResponse = (result) => {
            confirmationDialog.style.display = 'none';
            document.body.classList.remove('dialog-open');
            resolve(result);
            
            // Clean up event listeners
            confirmOk.removeEventListener('click', okHandler);
            confirmOk.removeEventListener('touchend', okHandler);
            confirmCancel.removeEventListener('click', cancelHandler);
            confirmCancel.removeEventListener('touchend', cancelHandler);
            document.removeEventListener('keydown', handleKeyDown);
            confirmationDialog.removeEventListener('click', outsideClickHandler);
        };
        
        const okHandler = (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            handleResponse(true);
        };
        
        const cancelHandler = (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            handleResponse(false);
        };
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                handleResponse(false);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                handleResponse(true);
            }
        };

        // Handle clicks outside the dialog content
        const outsideClickHandler = (e) => {
            // If click is on the dialog background (not the content)
            if (e.target === confirmationDialog) {
                e.preventDefault();
                handleResponse(false);
            }
        };
        
        // Add both click and touch events for mobile
        confirmOk.addEventListener('click', okHandler);
        confirmOk.addEventListener('touchend', okHandler);
        confirmCancel.addEventListener('click', cancelHandler);
        confirmCancel.addEventListener('touchend', cancelHandler);
        document.addEventListener('keydown', handleKeyDown);
        confirmationDialog.addEventListener('click', outsideClickHandler);
    });
}
      
// Add this function to update stats display:
function updateStatsDisplay() {
    // Update data tab stats
    document.getElementById('totalCarsStat').textContent = gameData.player.inventory.length;
    document.getElementById('packsOpenedStat').textContent = gameData.player.stats.packsOpened;
    document.getElementById('peakCashStat').textContent = '$' + gameData.player.stats.peakCash.toLocaleString();
    
    // Find highest value car
    let highestValueCar = 'None';
    let highestValue = 0;
    let rarestCar = 'None';
    let rarestRarity = 'mythic'; // Start with highest rarity
   let totalMiles = 0;
    let mostMilesCar = 'None';
    let highestMileage = 0;
     updateJobStats();
    
    // Update race stats
    updateRaceStats();
    gameData.player.inventory.forEach(item => {
        const carMiles = item.mileage || 0;
        totalMiles += carMiles;
        
        if (carMiles > highestMileage) {
            highestMileage = carMiles;
            const car = gameData.cars.find(c => c.carId === item.cardId);
            if (car) {
                mostMilesCar = `${car.name} (${carMiles} miles)`;
            }
        }
    });
    
    // Update the new stats
    document.getElementById('totalMilesStat').textContent = `${totalMiles.toLocaleString()} miles`;
    document.getElementById('mostMilesCarStat').textContent = totalMiles > 0 ? mostMilesCar : 'None'; 
  
    gameData.player.inventory.forEach(item => {
        const car = gameData.cars.find(c => c.carId === item.cardId);
        if (car) {
            const value = calculateDynamicValue(car, item.upgrades, item.customImage, car.image);
            if (value > highestValue) {
                highestValue = value;
                highestValueCar = car.name;
            }
            
            // Check for rarest car
            if (car.rarity === rarestRarity) {
                rarestCar = car.name;
            } else if (rarityOrder(car.rarity) < rarityOrder(rarestRarity)) {
                rarestRarity = car.rarity;
                rarestCar = car.name;
            }
        }
    });
    
    document.getElementById('highestValueCarStat').textContent = highestValue > 0 ? 
        `${highestValueCar} ($${highestValue.toLocaleString()})` : 'None';
    document.getElementById('rarestCarStat').textContent = rarestCar !== 'None' ? 
        `${rarestCar} (${rarestRarity.charAt(0).toUpperCase() + rarestRarity.slice(1)})` : 'None';
    document.getElementById('playTimeStat').textContent = `${gameData.player.stats.playTimeMinutes} minutes`;
    
    // Render transactions
    renderTransactions();
}
function updateJobStats() {
    // Initialize job stats if they don't exist
    if (!gameData.player.stats.jobs) {
        gameData.player.stats.jobs = {
            completed: 0,
            earnings: 0,
            highestPaying: { amount: 0, name: "None" },
            mostUsedCar: { id: null, count: 0, name: "None" },
            totalTime: 0
        };
    }

    document.getElementById('totalJobsStat').textContent = gameData.player.stats.jobs.completed;
    document.getElementById('totalJobEarningsStat').textContent = '$' + gameData.player.stats.jobs.earnings.toLocaleString();
    document.getElementById('highestPayingJobStat').textContent = gameData.player.stats.jobs.highestPaying.name === "None" ? 
        "None" : `${gameData.player.stats.jobs.highestPaying.name} ($${gameData.player.stats.jobs.highestPaying.amount.toLocaleString()})`;
    document.getElementById('mostUsedJobCarStat').textContent = gameData.player.stats.jobs.mostUsedCar.name;
    
    
    const avgTime = gameData.player.stats.jobs.completed > 0 ? 
        Math.round(gameData.player.stats.jobs.totalTime / gameData.player.stats.jobs.completed) : 0;
    document.getElementById('avgJobTimeStat').textContent = `${avgTime} minutes`;
}

function updateRaceStats() {
    // Initialize race stats if they don't exist
    if (!gameData.player.stats.races) {
        gameData.player.stats.races = {
            completed: 0,
            wins: 0,
            earnings: 0,
            highestPaying: { amount: 0, name: "None" },
            mostUsedCar: { id: null, count: 0, name: "None" },
            trackCounts: {}
        };
    }

    document.getElementById('totalRacesStat').textContent = gameData.player.stats.races.completed;
    document.getElementById('totalRaceEarningsStat').textContent = '$' + gameData.player.stats.races.earnings.toLocaleString();
    document.getElementById('highestPayingRaceStat').textContent = gameData.player.stats.races.highestPaying.name === "None" ? 
        "None" : `${gameData.player.stats.races.highestPaying.name} ($${gameData.player.stats.races.highestPaying.amount.toLocaleString()})`;
    document.getElementById('mostUsedRaceCarStat').textContent = gameData.player.stats.races.mostUsedCar.name;
    
    const winRate = gameData.player.stats.races.completed > 0 ? 
        Math.round((gameData.player.stats.races.wins / gameData.player.stats.races.completed) * 100) : 0;
    document.getElementById('winRateStat').textContent = `${winRate}%`;
    
    // Find favorite track
    let favoriteTrack = "None";
    let maxCount = 0;
    for (const [track, count] of Object.entries(gameData.player.stats.races.trackCounts)) {
        if (count > maxCount) {
            maxCount = count;
            favoriteTrack = track;
        }
    }
    document.getElementById('favoriteTrackStat').textContent = favoriteTrack;
}

// Helper function for rarity order
function rarityOrder(rarity) {
    const order = { 'mythic': 0, 'legendary': 1, 'rare': 2, 'uncommon': 3, 'common': 4 };
    return order[rarity] || 4;
}

// Update the renderTransactions function:
function renderTransactions() {
    const tbody = document.getElementById('transactionTableBody');
    tbody.innerHTML = '';
    
    if (gameData.player.transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-transactions">No transactions yet</td></tr>';
        updatePaginationControls();
        return;
    }
    
    // Get filters
    const typeFilter = document.getElementById('transactionTypeFilter').value;
    const priceFilter = document.getElementById('transactionPriceFilter').value;
    const searchQuery = document.getElementById('transactionSearch').value.toLowerCase();
    
    // Apply filters
    let filteredTransactions = gameData.player.transactions.filter(tx => {
        // Type filter
        if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
        
        // Price filter
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(p => p.endsWith('+') ? 
                parseInt(p.replace('+', '')) : parseInt(p));
            
            if (priceFilter.endsWith('+')) {
                if (tx.amount < min) return false;
            } else {
                if (tx.amount < min || tx.amount > max) return false;
            }
        }
        
        // Search filter
        if (searchQuery && !tx.item.toLowerCase().includes(searchQuery)) return false;
        
        return true;
    }).reverse(); // Show newest first
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    currentTransactionPage = Math.min(currentTransactionPage, totalPages);
    
    // Get transactions for current page
    const startIndex = (currentTransactionPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
    
    // Render transactions
    if (paginatedTransactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-transactions">No transactions match your filters</td></tr>';
    } else {
        paginatedTransactions.forEach(tx => {
            const row = document.createElement('tr');
            
            // Determine transaction type class and sign
            let typeClass = '';
            let amountSign = '';
            if (tx.type === 'sale' || tx.type === 'job' || tx.type === 'payment') {
                typeClass = 'type-income';
                amountSign = '+';
            } else {
                typeClass = 'type-expense';
                amountSign = '-';
            }
            
            row.innerHTML = `
                <td>${new Date(tx.date).toLocaleDateString()}</td>
                <td class="${typeClass}">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
                <td>${tx.item}</td>
                <td>${amountSign}$${Math.abs(tx.amount).toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Update pagination controls
    updatePaginationControls(filteredTransactions.length, totalPages);
}
      // Add this new function for pagination controls
function updatePaginationControls(totalTransactions, totalPages) {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    
    if (totalPages <= 1) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = currentTransactionPage <= 1;
        nextBtn.disabled = currentTransactionPage >= totalPages;
    }
    
    pageInfo.textContent = `Page ${currentTransactionPage} of ${totalPages} (${totalTransactions} total)`;
}

      // Add this function to handle settings:
function setupSettings() {
    // Theme options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            document.body.classList.remove('dark-mode', 'light-mode');
            document.body.classList.add(theme + '-mode');
            localStorage.setItem('theme', theme);
            
            // Update active button
            document.querySelectorAll('.theme-option').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update theme toggle icon
            themeToggle.textContent = theme === 'dark' ? '🌞' : '🌓';
        });
        // Job notification checkboxes
    document.querySelectorAll('.job-notification-type').forEach(checkbox => {
        // Load saved setting or default to true
        const typeEnabled = localStorage.getItem(`notification_${checkbox.dataset.type}`) !== 'false';
        checkbox.checked = typeEnabled;
        
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`notification_${this.dataset.type}`, this.checked);
        });
    });

        // Set active theme button
        if ((document.body.classList.contains('dark-mode') && option.dataset.theme === 'dark') ||
            (!document.body.classList.contains('dark-mode') && option.dataset.theme === 'light')) {
            option.classList.add('active');
        }
    });
    // Debug mode toggle
        const debugModeToggle = document.getElementById('debugModeToggle');
        debugModeToggle.addEventListener('change', function() {
            localStorage.setItem('debugMode', this.checked);
            debugLog('Debug mode', this.checked ? 'enabled' : 'disabled');
        });
        
        // Load debug mode setting
        const debugModeEnabled = localStorage.getItem('debugMode') === 'true';
        debugModeToggle.checked = debugModeEnabled;
    // Font selector
    const fontSelect = document.getElementById('fontSelect');
    fontSelect.addEventListener('change', function() {
        document.body.style.fontFamily = this.value;
        localStorage.setItem('fontFamily', this.value);
    });
    
    // Load saved font
    const savedFont = localStorage.getItem('fontFamily');
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
        fontSelect.value = savedFont;
    }
    const userIdDisplay = document.createElement('div');
    userIdDisplay.className = 'user-id-display';
    userIdDisplay.textContent = `User ID: ${gameData.player.userId}`;
    userIdDisplay.style.color = '#000000';
    userIdDisplay.style.margin = '10px 0';
    userIdDisplay.style.padding = '8px';
    userIdDisplay.style.backgroundColor = '#f0f0f0';
    userIdDisplay.style.borderRadius = '4px';
    userIdDisplay.style.fontFamily = 'monospace';
    
    // Add to settings panel
    const dataSettings = document.getElementById('settings-data');
    if (dataSettings) {
        dataSettings.insertBefore(userIdDisplay, dataSettings.firstChild);
    }

     // Notification settings
    const notificationsToggle = document.getElementById('notificationsToggle');
    const notificationTypeCheckboxes = document.querySelectorAll('.notification-type');
    
    // Load notification settings
    const loadNotificationSettings = () => {
        const notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
        notificationsToggle.checked = notificationsEnabled;
        
        // Enable/disable all type checkboxes based on master toggle
        notificationTypeCheckboxes.forEach(checkbox => {
            checkbox.disabled = !notificationsEnabled;
            
            // Load individual type settings
            const typeEnabled = localStorage.getItem(`notification_${checkbox.dataset.type}`) !== 'false';
            checkbox.checked = typeEnabled;
        });
    };
    // Add to setupSettings() function
document.getElementById('saveGameBtn').addEventListener('click', () => {
    saveGame();
    const saveMessage = document.getElementById('saveMessage');
    saveMessage.textContent = 'Game saved successfully!';
    saveMessage.className = 'redeem-message success';
    saveMessage.style.display = 'block';
    setTimeout(() => saveMessage.style.display = 'none', 3000);
});

// In setupSettings() function:
document.getElementById('resetGameBtn').addEventListener('click', () => {
    resetStats();
});

    // Master notifications toggle
    notificationsToggle.addEventListener('change', function() {
        localStorage.setItem('notificationsEnabled', this.checked);
        
        // Enable/disable all type checkboxes
        notificationTypeCheckboxes.forEach(checkbox => {
            checkbox.disabled = !this.checked;
        });
        
        debugLog('Notifications toggled', { enabled: this.checked });
    });
    
    // Individual notification type toggles
    notificationTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`notification_${this.dataset.type}`, this.checked);
            debugLog('Notification type toggled', { 
                type: this.dataset.type, 
                enabled: this.checked 
            });
        });
    });
    
    // Load initial settings
    loadNotificationSettings();
    
    // Load notification setting
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
    notificationsToggle.checked = notificationsEnabled;
    
    // Animation toggle
    const animationToggle = document.getElementById('animationToggle');
    animationToggle.addEventListener('change', function() {
        localStorage.setItem('animationsEnabled', this.checked);
    });
    
    // Load animation setting
    const animationsEnabled = localStorage.getItem('animationsEnabled') !== 'false';
    animationToggle.checked = animationsEnabled;
    
    // Settings sub-tabs
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const subtab = this.dataset.subtab;
            
            // Update active tab
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.settings-subtab').forEach(content => content.classList.remove('active'));
            document.getElementById(`settings-${subtab}`).classList.add('active');
            
            // Update stats when data tab is shown
            if (subtab === 'data') {
                updateStatsDisplay();
            }
        });
    });
    
    // Transaction filters
    document.getElementById('transactionTypeFilter').addEventListener('change', renderTransactions);
    document.getElementById('transactionPriceFilter').addEventListener('change', renderTransactions);
    document.getElementById('transactionSearch').addEventListener('input', renderTransactions);
}
 function redeemCode(code) {
    const codeToCheck = code.toUpperCase().trim();
    console.log("Checking code:", codeToCheck); // Debug log
    
    // Debug: log all available codes
    console.log("Available codes:", gameData.codes.map(c => ({
        code: c.code, 
        redeemed: c.redeemed,
        reward: c.reward,
        value: c.value
    })));
    
    const codeEntry = gameData.codes.find(c => c.code === codeToCheck);
    
    if (!codeEntry) {
        console.log("Code not found in database"); // Debug log
        showNotification('Invalid Code', 'The code you entered is invalid. Please check and try again.', 'error');
        return { success: false, message: 'Invalid code' };
    }
    
    if (codeEntry.redeemed) {
        console.log("Code already redeemed"); // Debug log
        showNotification('Code Already Used', 'This code has already been redeemed.', 'warning');
        return { success: false, message: 'Code already used' };
    }
    
    try {
        // Process the reward
        if (codeEntry.reward === "cash") {
            console.log("Processing cash reward"); // Debug log
            gameData.player.balance += codeEntry.value;
            updateBalanceDisplay();
            showNotification('Code Redeemed!', `You received $${codeEntry.value.toLocaleString()}!`, 'success');
            recordTransaction('code', `Code: ${codeEntry.code}`, codeEntry.value);
        } 
        else if (codeEntry.reward === "car") {
            console.log("Processing car reward"); // Debug log
            const car = gameData.cars.find(c => c.carId === codeEntry.value);
            if (!car) {
                console.error("Car not found for ID:", codeEntry.value); // Debug log
                showNotification('Error', 'The car for this code could not be found.', 'error');
                return { success: false, message: 'Car not found' };
            }
            
            const uniqueId = generateUniqueId();
            gameData.player.inventory.push({
                uniqueId,
                cardId: car.carId,
                obtainedAt: new Date().toISOString(),
                mileage: 0,
                upgrades: {}
            });
            renderInventory();
            showNotification('Code Redeemed!', `You received a ${car.name}!`, 'success');
            recordTransaction('code', `Car from code: ${car.name}`, car.value);
        } else {
            console.error("Unknown reward type:", codeEntry.reward); // Debug log
            showNotification('Error', 'This code has an invalid reward type.', 'error');
            return { success: false, message: 'Invalid reward type' };
        }
        
        // Mark code as redeemed
        codeEntry.redeemed = true;
        saveGame();
        
        console.log("Code redeemed successfully"); // Debug log
        return { success: true, message: 'Code redeemed successfully' };
        
    } catch (error) {
        console.error("Error redeeming code:", error); // Debug log
        showNotification('Error', 'There was an error processing your code.', 'error');
        return { success: false, message: 'Processing error' };
    }
}

function setupMissionSystem() {
    gameData.activeJobs = [];
    renderJobSystemUI();
    jobSpawnInterval = setInterval(spawnRandomJob, 35000);
}
function formatSpecialRequirements(requirements) {
    if (!requirements || typeof requirements !== 'object') {
        return 'No special requirements';
    }
    return Object.entries(requirements)
        .map(([stat, value]) => `${stat}: ${value}`)
        .join(', ');
}
function spawnRandomJob() {
    if (gameData.activeJobs.length >= gameData.maxActiveJobs) return;
    
    try {
        const shouldSpawnSpecial = Math.random() < 0.025; //
        
        let randomJob;
        
        if (shouldSpawnSpecial && gameData.specialJobs?.length > 0) {
            const availableSpecialJobs = gameData.specialJobs.filter(job => 
                job && 
                job.id && 
                !gameData.activeJobs.some(activeJob => activeJob.id === job.id)
            );
            
            if (availableSpecialJobs.length > 0) {
                randomJob = {...availableSpecialJobs[Math.floor(Math.random() * availableSpecialJobs.length)]};
            }
        }
        
        // Fallback to normal jobs if no special job available
        if (!randomJob && gameData.jobs?.length > 0) {
            const availableJobs = gameData.jobs.filter(job => 
                job && 
                job.id && 
                job.available && 
                !gameData.activeJobs.some(activeJob => activeJob.id === job.id)
            );
            
            if (availableJobs.length === 0) return;
            
            randomJob = {...availableJobs[Math.floor(Math.random() * availableJobs.length)]};
        }
        
        if (!randomJob) return; // No valid job found
        
        // Initialize required properties
        randomJob.spawnedAt = new Date().toISOString();
        randomJob.assignedCar = null;
        randomJob.completed = false;
        randomJob.isSpecial = shouldSpawnSpecial && gameData.specialJobs?.some(j => j.id === randomJob.id);
        
        // Ensure requirements exists for special jobs
        if (randomJob.isSpecial && !randomJob.requirements) {
            randomJob.requirements = {};
        }
        
        gameData.activeJobs.push(randomJob);
        saveGame();
        updateJobsCounter();
        
        if (document.querySelector('#missions.tab-content.active')) {
            renderJobs();
        }
        
        const notificationType = randomJob.isSpecial ? 'warning' : 'success';
        showNotification('New Job Available', `A new ${randomJob.isSpecial ? 'SPECIAL ' : ''}job "${randomJob.name}" is available!`, notificationType);
        
    } catch (error) {
        console.error('Error spawning job:', error);
        // Fallback to ensure jobs keep spawning
        if (gameData.jobs?.length > 0) {
            const availableJobs = gameData.jobs.filter(job => 
                job && 
                job.available && 
                !gameData.activeJobs.some(activeJob => activeJob.id === job.id)
            );
            
            if (availableJobs.length > 0) {
                const fallbackJob = {...availableJobs[0]};
                fallbackJob.spawnedAt = new Date().toISOString();
                fallbackJob.assignedCar = null;
                fallbackJob.completed = false;
                fallbackJob.isSpecial = false;
                gameData.activeJobs.push(fallbackJob);
                renderJobs();
            }
        }
    }
}
function renderJobSystemUI() {
    const jobsHeader = document.createElement('div');
    jobsHeader.className = 'jobs-header';
    jobsHeader.innerHTML = `
        <div id="jobsCounter" class="jobs-counter">
            Jobs: ${gameData.activeJobs.length}/${gameData.maxActiveJobs}
        </div>
    `;
    
    const jobsContainer = document.getElementById('jobsContainer');
    jobsContainer.parentNode.insertBefore(jobsHeader, jobsContainer);
    

}
      function updateJobsCounter() {
    const counterElement = document.getElementById('jobsCounter');
    if (counterElement) {
        counterElement.textContent = `Jobs: ${gameData.activeJobs.length}/${gameData.maxActiveJobs}`;
    }
}


function declineJob(jobId) {
    const jobIndex = gameData.activeJobs.findIndex(j => j.id === jobId);
    if (jobIndex === -1) return;
    
    gameData.activeJobs.splice(jobIndex, 1);
    
    saveGame();
    renderJobs();
    updateJobsCounter(); // Add this line
    
    showNotification('Job Declined', 'The job has been removed', 'info');
}

// Update the renderJobs function to include the decline button
function renderJobs() {
    const jobsContainer = document.getElementById('jobsContainer');
    jobsContainer.innerHTML = '';
    
    gameData.activeJobs = gameData.activeJobs.filter(job => {
        if (job.completed && job.rewardCollected) {
            return false;
        }
        return true;
    });

    if (gameData.activeJobs.length === 0) {
        jobsContainer.innerHTML = '<div class="empty-message">No jobs available yet. Check back soon!</div>';
        return;
    }
    
    gameData.activeJobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-card';
        jobElement.dataset.jobId = job.id;
        
        // Add special styling if it's a special job
        if (job.isSpecial) {
            jobElement.classList.add('special-job');
            jobElement.style.boxShadow = `0 0 15px ${job.glowColor || '#FFD700'}`;
        }
        
        let timeInfo = '';
        let progressBar = '';
        let buttonState = '';
        let declineButton = '<button class="btn btn-warning" data-action="decline">Decline</button>';
        
        if (job.assignedCar) {
            declineButton = '';
            
            if (job.completed) {
                timeInfo = '<div class="job-time">Completed!</div>';
                buttonState = '<button class="btn btn-success job-btn" data-action="collect">Collect Reward</button>';
            } else {
                const car = gameData.player.inventory.find(c => c.uniqueId === job.assignedCar);
                const carOVR = car ? calculateOVR(
                    gameData.cars.find(c => c.carId === car.cardId).stats, 
                    car.upgrades
                ) : 80;
                
                const timeReduction = Math.max(0, carOVR - 80) * 0.01;
                const adjustedTime = Math.max(10, job.baseTime * (1 - timeReduction));
                
                const now = new Date();
                const startTime = new Date(job.startTime);
                const elapsedSeconds = (now - startTime) / 1000;
                const remainingSeconds = Math.max(0, adjustedTime - elapsedSeconds);
                
                if (remainingSeconds > 0) {
                    const minutes = Math.floor(remainingSeconds / 60);
                    const seconds = Math.floor(remainingSeconds % 60);
                    timeInfo = `<div class="job-time" id="time-${job.id}">Time remaining: ${minutes}m ${seconds}s</div>`;
                    progressBar = `<div class="job-progress"><div class="job-progress-bar" id="progress-${job.id}" style="width: ${(elapsedSeconds / adjustedTime) * 100}%"></div></div>`;
                    buttonState = '<button class="btn btn-warning job-btn" disabled>In Progress</button>';
                    
                    if (!job.timerInterval) {
                        startJobTimer(job);
                    }
                } else {
                    job.completed = true;
                    timeInfo = '<div class="job-time">Ready to collect!</div>';
                    buttonState = '<button class="btn btn-success job-btn" data-action="collect">Collect Reward</button>';
                }
            }
        } else {
            timeInfo = `<div class="job-time">Base time: ${job.baseTime}s (for 80 OVR car)</div>`;
            buttonState = '<button class="btn btn-primary job-btn" data-action="assign">Assign</button>';
        }
        
        // Add special icon if it's a special job
        const jobNameDisplay = job.isSpecial 
            ? `<div class="job-name">${job.icon || '⭐'} ${job.name}</div>`
            : `<div class="job-name">${job.name}</div>`;
        
        jobElement.innerHTML = `
            <div class="job-header">
                ${jobNameDisplay}
                <div class="job-reward">$${job.reward.toLocaleString()}</div>
            </div>
            <div class="job-description">
                ${job.description}
                <div class="job-requirements">Minimum Storage: ${job.minStorage}</div>
                ${job.isSpecial ? `<div class="special-requirements">Special Requirements: ${formatSpecialRequirements(job.requirements)}</div>` : ''}
            </div>
            ${progressBar}
            <div class="job-footer">
                ${timeInfo}
                <div class="job-buttons">
                    ${buttonState}
                    ${declineButton}
                </div>
            </div>
        `;
        
        jobsContainer.appendChild(jobElement);
    });
}



function showAssignCarModal(jobId) {
    assignCarModalJobId = jobId;
    const job = gameData.activeJobs.find(j => j.id === jobId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'assignCarModal';
    modal.innerHTML = `
        <div class="modal-content assign-car-modal">
            <button class="close-modal">&times;</button>
            <div class="modal-title">
                <h2>Assign Car to ${job.isSpecial ? 'SPECIAL ' : ''}Job</h2>
                ${job.isSpecial ? `<div class="special-job-icon">${job.icon || '⭐'}</div>` : ''}
            </div>
            <p>${job.description}</p>
            ${job.isSpecial ? `<p class="special-requirements">Requirements: ${formatSpecialRequirements(job.requirements)}</p>` : ''}
            <p>Select a car from your inventory (Minimum Storage: ${job.minStorage})</p>
            <input type="text" id="carSearchInput" placeholder="Search cars..." class="settings-input">
            <div class="assign-car-grid" id="assignCarGrid"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const assignCarGrid = modal.querySelector('#assignCarGrid');

    let availableCars = gameData.player.inventory
    .map(car => {
        const carData = gameData.cars.find(c => c.carId === car.cardId);
        if (!carData) return null;
        
        // Calculate actual storage (base + upgrades)
        const actualStorage = (carData.storage || 0) + (car.upgrades?.STR || 0);
        
        // Check if car meets special requirements
        let meetsSpecialRequirements = true;
        if (job.isSpecial && job.requirements) {
            meetsSpecialRequirements = Object.entries(job.requirements).every(([stat, requiredValue]) => {
                // Handle storage (STR) separately
                if (stat === 'STR') {
                    return actualStorage >= requiredValue;
                }
                // For other stats
                const carStatValue = car.upgrades?.[stat] || carData.stats[stat] || 0;
                return carStatValue >= requiredValue;
            });
        }
        
        return {
            ...car,
            carData,
            ovr: calculateOVR(carData.stats, car.upgrades),
            meetsStorage: actualStorage >= job.minStorage,
            meetsSpecialRequirements,
            stats: {...carData.stats, ...car.upgrades}, // Combined stats
            actualStorage // Include the calculated storage
        };
    })
        .filter(car => 
            car && 
            !gameData.activeJobs.some(job => 
                job.assignedCar === car.uniqueId && !job.completed
            )
        )
        .sort((a, b) => {
            // Sort by meets all requirements first
            if (a.meetsSpecialRequirements !== b.meetsSpecialRequirements) {
                return b.meetsSpecialRequirements - a.meetsSpecialRequirements;
            }
            if (a.meetsStorage !== b.meetsStorage) {
                return b.meetsStorage - a.meetsStorage;
            }
            if (a.ovr !== b.ovr) {
                return b.ovr - a.ovr;
            }
            return b.carData.storage - a.carData.storage;
        });

    function renderCars(filter = '') {
        assignCarGrid.innerHTML = '';

        const filteredCars = availableCars.filter(car =>
            car.carData.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCars.length === 0) {
            assignCarGrid.innerHTML = `
                <div class="no-cars-available">
                    No available cars match your search.
                </div>
            `;
            return;
        }

        filteredCars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.className = 'assign-car-card';
            carElement.dataset.uniqueId = car.uniqueId;

            if (!car.meetsStorage) {
                carElement.classList.add('storage-insufficient');
            }
            if (job.isSpecial && !car.meetsSpecialRequirements) {
                carElement.classList.add('requirements-insufficient');
            }

            const carImage = car.customImage || car.carData.image;
            const storageClass = car.carData.storage > job.minStorage + 2 ? 'storage-high' : 
                                 car.carData.storage > job.minStorage ? 'storage-adequate' : 'storage-minimum';

            // Create stats display for special jobs
            let statsDisplay = '';
if (job.isSpecial) {
    statsDisplay = Object.entries(job.requirements)
        .map(([stat, requiredValue]) => {
            let carStatValue;
            // Special handling for storage (STR)
            if (stat === 'STR') {
                carStatValue = car.actualStorage;
            } else {
                carStatValue = car.stats[stat] || 0;
            }
            
            const meetsRequirement = carStatValue >= requiredValue;
            return `
                <div class="requirement-stat ${meetsRequirement ? 'requirement-met' : 'requirement-missed'}">
                    ${stat}: ${carStatValue}/${requiredValue}
                </div>
            `;
        })
        .join('');
}

carElement.innerHTML = `
    <img src="${carImage}" alt="${car.carData.name}" class="assign-car-image">
    <div class="assign-car-name">${car.carData.name}</div>
    <div class="assign-car-specs">
        <span class="assign-car-ovr">OVR: ${car.ovr}</span>
        <span class="assign-car-storage ${storageClass}">STR: ${car.actualStorage}</span>
    </div>
    ${statsDisplay}
    ${car.carData.storage > job.minStorage + 2 ? '<div class="storage-bonus">+ Bonus</div>' : ''}
    ${!car.meetsStorage ? '<div class="storage-warning">⚠️ Low Storage</div>' : ''}
    ${job.isSpecial && !car.meetsSpecialRequirements ? '<div class="requirements-warning">⚠️ Doesn\'t meet requirements</div>' : ''}
`;

            assignCarGrid.appendChild(carElement);
        });
    }

    renderCars();

    modal.querySelector('#carSearchInput').addEventListener('input', (e) => {
        renderCars(e.target.value);
    });

    // In the card click event listener in showAssignCarModal:
assignCarGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.assign-car-card');
    if (!card) return;

    const carUniqueId = card.dataset.uniqueId;
    const car = availableCars.find(c => c.uniqueId === carUniqueId);
    if (!car) return;

    if (!car.meetsStorage) {
        showNotification('Cannot Select', 'This car does not meet the minimum storage requirement', 'error');
        return;
    }

    if (job.isSpecial && !car.meetsSpecialRequirements) {
        // Provide more detailed feedback about which requirements aren't met
        const missingRequirements = Object.entries(job.requirements)
            .filter(([stat, requiredValue]) => {
                const carValue = stat === 'STR' 
                    ? car.actualStorage 
                    : car.stats[stat] || 0;
                return carValue < requiredValue;
            })
            .map(([stat, requiredValue]) => `${stat} (needs ${requiredValue})`);
        
        showNotification(
            'Cannot Select', 
            `This car doesn't meet requirements: ${missingRequirements.join(', ')}`,
            'error'
        );
        return;
    }

    document.querySelectorAll('.assign-car-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
});

    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn btn-primary';
    confirmButton.style.marginTop = '16px';
    confirmButton.style.width = '100%';
    confirmButton.textContent = 'Assign Car';
    confirmButton.addEventListener('click', assignCarToJob);
    
    modal.querySelector('.modal-content').appendChild(confirmButton);
    modal.style.display = 'flex';

    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

function assignCarToJob() {
    const selectedCar = document.querySelector('.assign-car-card.selected');
    if (!selectedCar || !assignCarModalJobId) return;
    
    const job = gameData.activeJobs.find(j => j.id === assignCarModalJobId);
    if (!job) return;
    
    job.assignedCar = selectedCar.dataset.uniqueId;
    job.startTime = new Date().toISOString();
    job.completed = false;
    
    // Removed saveActiveJobs() call
    document.getElementById('assignCarModal').remove();
    renderJobs();
    
    showNotification('Job Started', `You assigned a car to ${job.name}`, 'success');
    startJobTimer(job);
}

function startJobTimer(job) {
    const car = gameData.player.inventory.find(c => c.uniqueId === job.assignedCar);
    if (!car) return;
    
    const carData = gameData.cars.find(c => c.carId === car.cardId);
    if (!carData) return;
    
    const carOVR = calculateOVR(carData.stats, car.upgrades, car.health);
    
    // Health affects time more significantly below 50%
    const healthPenalty = car.health < 50 ? 1 + (50 - car.health) * 0.02 : 1;
    
    const timeReduction = Math.max(0, carOVR - 80) * 0.01;
    const adjustedTime = Math.max(10, job.baseTime * (1 - timeReduction) * healthPenalty) * 1000;
    
    // Clear any existing interval for this job
    if (job.timerInterval) {
        clearInterval(job.timerInterval);
    }
    
    // Set up interval to update timer every second
    job.timerInterval = setInterval(() => {
        const now = new Date();
        const startTime = new Date(job.startTime);
        const elapsedSeconds = (now - startTime) / 1000;
        const remainingSeconds = Math.max(0, (adjustedTime/1000) - elapsedSeconds);
        
        // Update the timer display
        const timeElement = document.getElementById(`time-${job.id}`);
        const progressElement = document.getElementById(`progress-${job.id}`);
        
        if (timeElement && progressElement) {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = Math.floor(remainingSeconds % 60);
            timeElement.textContent = `Time remaining: ${minutes}m ${seconds}s`;
            progressElement.style.width = `${(elapsedSeconds / (adjustedTime/1000)) * 100}%`;
        }
        
        // Check if job is complete
        if (remainingSeconds <= 0) {
            clearInterval(job.timerInterval);
            job.timerInterval = null;
            job.completed = true;
            job.completionTime = new Date().toISOString(); // Set completion time
            
            if (document.querySelector('#missions.tab-content.active')) {
                renderJobs();
            }
            
          showNotification('Job Completed', `${job.name} is ready to collect!`, 'success');
        }
    }, 1000);
    
    // Set timeout for job completion
    job.completionTimeout = setTimeout(() => {
        if (job.timerInterval) {
            clearInterval(job.timerInterval);
            job.timerInterval = null;
        }
        job.completed = true;
        job.completionTime = new Date().toISOString(); // Set completion time
        
        if (document.querySelector('#missions.tab-content.active')) {
            renderJobs();
        }
        
        
    }, adjustedTime);
}

function collectJobReward(jobId) {
    const jobIndex = gameData.activeJobs.findIndex(j => j.id === jobId);
    if (jobIndex === -1) return;
    
    const job = gameData.activeJobs[jobIndex];
    if (!job.completed) return;

    if (job.timerInterval) {
        clearInterval(job.timerInterval);
    }
    if (job.completionTimeout) {
        clearTimeout(job.completionTimeout);
    }

    const startTime = new Date(job.startTime);
    const endTime = new Date(job.completionTime || new Date());
    const seconds = Math.floor((endTime - startTime) / 1000);
    
    if (job.assignedCar) {
    const car = gameData.player.inventory.find(c => c.uniqueId === job.assignedCar);
    if (car) {
        const milesAdded = updateCarMileage(job.assignedCar, seconds);
        if (milesAdded > 0) {
            const healthReduction = Math.floor(milesAdded / 10); // 10 miles = 1% health
            car.health = Math.max(0, car.health - healthReduction);
            showNotification('Mileage Added', 
                `Your car drove ${milesAdded} miles (health -${healthReduction}%)`, 
                'info');
        }

        const carData = gameData.cars.find(c => c.carId === car.cardId);
        const carName = carData ? carData.name : "Unknown";

        if (!gameData.player.stats.jobs.carUsage) {
            gameData.player.stats.jobs.carUsage = {};
        }

        gameData.player.stats.jobs.carUsage[car.uniqueId] = 
            (gameData.player.stats.jobs.carUsage[car.uniqueId] || 0) + 1;

        if (gameData.player.stats.jobs.carUsage[car.uniqueId] > gameData.player.stats.jobs.mostUsedCar.count) {
            gameData.player.stats.jobs.mostUsedCar = {
                id: car.uniqueId,
                count: gameData.player.stats.jobs.carUsage[car.uniqueId],
                name: carName
            };
        }
    }
}



    gameData.player.balance += job.reward;
    gameData.activeJobs.splice(jobIndex, 1);
    
    updateBalanceDisplay();
    renderJobs();
    updateJobsCounter();
    saveGame();

    if (!gameData.player.stats.jobs) {
        gameData.player.stats.jobs = {
            completed: 0,
            earnings: 0,
            highestPaying: { amount: 0, name: "None" },
            mostUsedCar: { id: null, count: 0, name: "None" },
            miles: 0,
            totalTime: 0,
            specialJobsCompleted: 0,
            specialJobsEarnings: 0,
            carUsage: {}
        };
    }

    gameData.player.stats.jobs.completed++;
    gameData.player.stats.jobs.earnings += job.reward;

    if (job.reward > gameData.player.stats.jobs.highestPaying.amount) {
        gameData.player.stats.jobs.highestPaying = {
            amount: job.reward,
            name: job.name
        };
    }

    if (job.isSpecial) {
        gameData.player.stats.jobs.specialJobsCompleted++;
        gameData.player.stats.jobs.specialJobsEarnings += job.reward;
    }

    if (job.startTime && job.completionTime) {
        const start = new Date(job.startTime);
        const end = new Date(job.completionTime);
        const minutes = Math.round((end - start) / (1000 * 60));
        gameData.player.stats.jobs.totalTime += minutes;
    }

    showNotification('Reward Collected', 
        `You earned $${job.reward.toLocaleString()} from ${job.name}`, 
        'success');
    recordTransaction('payment', `Job Payment: ${job.name}`, job.reward);
}





      function updateCarMileage(uniqueId, seconds) {
    const car = gameData.player.inventory.find(c => c.uniqueId === uniqueId);
    if (car) {
        // Every 5 seconds = 1 mile
        const milesToAdd = Math.floor(seconds / 5);
        car.mileage = (car.mileage || 0) + milesToAdd;
        return milesToAdd;
    }
    return 0;
}

// ------------------------
// RACE LOGIC 
// ------------------------
// VARIABLES
let raceIdCounter = 0;
let raceSpawnTimer = 60;
function generateRaceId() {
    return `race-${Date.now()}-${raceIdCounter++}`;
}
// RENDERING
function renderRaceUI() {
    let counter = document.getElementById('racesCounter');

    // If it already exists, just update it
    if (counter) {
        counter.textContent = `Races: ${gameData.activeRaces.length}/${gameData.maxActiveRaces}`;
        return;
    }

    // Otherwise, create it once
    const racesHeader = document.createElement('div');
    racesHeader.className = 'races-header';
    racesHeader.innerHTML = `
        <div id="racesCounter" class="races-counter">
            Races: ${gameData.activeRaces.length}/${gameData.maxActiveRaces}
        </div>
    `;

    const racesContainer = document.getElementById('racesContainer');
    if (racesContainer) {
        racesContainer.parentNode.insertBefore(racesHeader, racesContainer);
    }
    updateRaceEmptyMessage();
}

      
// SETUP
function setupRaceSystem() {
    gameData.activeRaces = [];
    raceSpawnInterval = setInterval(spawnRaceMission, raceSpawnTimer * 1000);
  renderRaceUI();
}
function updateRaceEmptyMessage() {
    const message = document.querySelector('.empty-message2');
    if (!message) return;

    if (gameData.activeRaces.length === 0) {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}


// SPAWN RACE
function spawnRaceMission() {
    if (gameData.activeRaces.length >= 3) {
        console.warn("Maximum number of active races reached.");
        return;
    }
  

    const raceId = generateRaceId();
    const container = document.getElementById("racesContainer");
    const raceDiv = document.createElement("div");
    raceDiv.name = "race-mission";
    raceDiv.id = raceId;
   const randomRace = gameData.races[Math.floor(Math.random() * gameData.races.length)];
const randomRacer = gameData.cars[Math.floor(Math.random() * gameData.cars.length)];
    const race = {
    id: raceId,
    track: randomRace?.raceName || "Unknown Track",
    trackImg: randomRace?.trackImage || "",
    reward: randomRace?.reward || 0,
    time: randomRace?.time || "Unknown",
    car: randomRacer?.name || "Unknown Car",
    carStats: randomRacer?.stats || {},
};
    gameData.activeRaces.push(race);

    // HTML ELEMENTS
    raceDiv.innerHTML = `
        <div class="missions-header" id="race-header-${race.id}">
            <h3 class="race-id">${race.track}</h3>
            <div class="mission-buttons">
                <button onclick="openRaceModal('${race.id}')" id="details-btn-${race.id}" class="btn btn-success">Accept</button>
                <button onclick="declineRace('${race.id}')" id="decline-btn-${race.id}" class="btn btn-warning">Decline</button>
            </div>
        </div>
        <div class="mission-details">
            <p id="car-${race.id}"><strong>Car:</strong> ${race.car}</p>
            <p id="reward-${race.id}"><strong>Reward:</strong> ${race.reward}</p>
            <p id="time-${race.id}"><strong>Time:</strong> ${race.time}</p>
            <p id="stats-${race.id}"><strong>Stats:</strong> ${Object.entries(race.carStats).map(([key, val]) => `${key}: ${val}`).join(', ')}</p>
        </div>
    `;

    raceDiv.style.backgroundImage = `url('${race.trackImg}')`;
    raceDiv.style.backgroundSize = "cover";
    raceDiv.style.backgroundPosition = "center";
    raceDiv.style.padding = "1rem";
    raceDiv.style.borderRadius = "10px";
    raceDiv.style.position = "relative";

    container.appendChild(raceDiv);
    renderRaceUI();
  updateRaceEmptyMessage();
    showNotification('New Race!', `A race at ${randomRace.raceName} has spawned.`, 'success');
}

function updateCooldownTimers() {
    // Only update if the race modal is open
    const raceModal = document.getElementById('assignRaceCarModal');
    if (!raceModal) return;
    
    document.querySelectorAll('#assignRaceCarGrid .assign-car-card').forEach(card => {
        const carId = card.dataset.uniqueId;
        if (gameData.carCooldowns[carId] && gameData.carCooldowns[carId] > Date.now()) {
            const remaining = Math.ceil((gameData.carCooldowns[carId] - Date.now()) / 1000);
            const minutes = Math.floor(remaining / 60);
            const seconds = remaining % 60;
            
            let cooldownElement = card.querySelector('.cooldown-timer');
            if (!cooldownElement) {
                cooldownElement = document.createElement('div');
                cooldownElement.className = 'cooldown-timer';
                card.appendChild(cooldownElement);
            }
            
            cooldownElement.textContent = `${minutes}m ${seconds}s`;
            card.classList.add('on-cooldown');
        } else if (card.querySelector('.cooldown-timer')) {
            card.querySelector('.cooldown-timer').remove();
            card.classList.remove('on-cooldown');
        }
    });
}
// Call this periodically if you want live updates
setInterval(updateCooldownTimers, 1000);

// DECLINE RACE
function declineRace(raceId) {
    gameData.activeRaces = gameData.activeRaces.filter(race => race.id !== raceId);
    const raceElement = document.getElementById(raceId);
    if (raceElement) {
        raceElement.remove();
    }
    showNotification('Race Declined', `You declined this race.`, 'warning');
    renderRaceUI();
  updateRaceEmptyMessage();
}

// RACE UI
function openRaceModal(raceId) {
    const race = gameData.activeRaces.find(r => r.id === raceId);
    if (!race) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'assignRaceCarModal';
    modal.innerHTML = `
        <div class="modal-content assign-car-modal">
            <button class="close-modal">&times;</button>
            <div class="modal-title">
                <h2>Assign Car to Race</h2>
            </div>
            <p>Select a car from your inventory to race at ${race.track}</p>
                <input type="text" id="raceCarSearchInput" placeholder="Search cars..." class="settings-input">
            <div class="assign-car-grid" id="assignRaceCarGrid"></div>
        </div>
    `;

    document.body.appendChild(modal);
    const assignCarGrid = modal.querySelector('#assignRaceCarGrid');

    let availableCars = gameData.player.inventory
        .map(car => {
            const carData = gameData.cars.find(c => c.carId === car.cardId);
            if (!carData) return null;

            const isOnCooldown = gameData.carCooldowns[car.uniqueId] && 
                                 gameData.carCooldowns[car.uniqueId] > Date.now();

            return {
                ...car,
                carData,
                ovr: calculateOVR(carData.stats, car.upgrades),
                speed: carData.stats.speed,
                onCooldown: isOnCooldown,
                cooldownEnd: isOnCooldown ? gameData.carCooldowns[car.uniqueId] : null
            };
        })
        .filter(car => {
            return car && 
                   !gameData.activeJobs.some(job => job.assignedCar === car.uniqueId && !job.completed) &&
                   !gameData.activeRaces.some(r => r.assignedCar === car.uniqueId);
        })
        .sort((a, b) => {
            if (a.onCooldown !== b.onCooldown) return a.onCooldown ? 1 : -1;
            return b.ovr - a.ovr || b.speed - a.speed;
        });

    function renderCars(filter = '') {
        assignCarGrid.innerHTML = '';

        const filteredCars = availableCars.filter(car =>
            car.carData.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCars.length === 0) {
            assignCarGrid.innerHTML = `
                <div class="no-cars-available">
                    No available cars match your search.
                </div>
            `;
            return;
        }

        filteredCars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.className = `assign-car-card ${car.onCooldown ? 'on-cooldown' : ''}`;
            carElement.dataset.uniqueId = car.uniqueId;
            carElement.dataset.onCooldown = car.onCooldown;

            const carImage = car.customImage || car.carData.image;

            carElement.innerHTML = `
                <img src="${carImage}" alt="${car.carData.name}" class="assign-car-image">
                <div class="assign-car-name">${car.carData.name}</div>
                <div class="assign-car-specs">
                    <span class="assign-car-ovr">OVR: ${car.ovr}</span>
                    ${car.onCooldown ? 
                      `<div class="cooldown-timer">Cooldown: ${Math.ceil((car.cooldownEnd - Date.now())/1000)}s</div>` : 
                      ''}
                </div>
            `;

            assignCarGrid.appendChild(carElement);
        });
    }

    renderCars();

    modal.querySelector('#raceCarSearchInput').addEventListener('input', (e) => {
        renderCars(e.target.value);
    });

    assignCarGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.assign-car-card');
        if (!card) return;

        if (card.dataset.onCooldown === 'true') {
            showNotification('Car on Cooldown', 'This car cannot be used for another race yet', 'warning');
            return;
        }

        document.querySelectorAll('.assign-car-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    });

    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn btn-primary';
    confirmButton.style.marginTop = '16px';
    confirmButton.style.width = '100%';
    confirmButton.textContent = 'Assign Car';
    confirmButton.addEventListener('click', () => {
        const selected = document.querySelector('.assign-car-card.selected');
        if (!selected) {
            showNotification('No Car Selected', 'Please select a car to assign.', 'error');
            return;
        }

        if (selected.dataset.onCooldown === 'true') {
            showNotification('Car on Cooldown', 'This car cannot be used for another race yet', 'warning');
            return;
        }

        const selectedCarId = selected.dataset.uniqueId;
        modal.remove();
        startRaceMinigame(selectedCarId, raceId);
    });

    modal.querySelector('.modal-content').appendChild(confirmButton);
    modal.style.display = 'flex';

    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}
  const rarityCooldowns = {
    'common': 5 * 60 * 1000,    // 5 minutes
    'uncommon': 7.5 * 60 * 1000, // 7.5 minutes
    'rare': 10 * 60 * 1000,     // 10 minutes
    'epic': 12.5 * 60 * 1000,   // 12.5 minutes
    'legendary': 15 * 60 * 1000  // 15 minutes (max)
};

// Add this function to manage cooldown persistence
function manageCooldowns() {
    // Load cooldowns from localStorage on game start
    const savedCooldowns = localStorage.getItem('carCooldowns');
    if (savedCooldowns) {
        gameData.carCooldowns = JSON.parse(savedCooldowns);
        
        // Clean up expired cooldowns
        const now = Date.now();
        for (const carId in gameData.carCooldowns) {
            if (gameData.carCooldowns[carId] <= now) {
                delete gameData.carCooldowns[carId];
            }
        }
    } else {
        gameData.carCooldowns = {};
    }

    // Save cooldowns periodically and on changes
    setInterval(() => {
        localStorage.setItem('carCooldowns', JSON.stringify(gameData.carCooldowns));
    }, 5000);
}
    
function startRaceMinigame(carId, raceId) {
    const race = gameData.activeRaces.find(r => r.id === raceId);
    const playerCar = gameData.player.inventory.find(c => c.uniqueId === carId);
    const carData = gameData.cars.find(c => c.carId === playerCar.cardId);
    
    if (!race || !playerCar || !carData) {
        showNotification('Error', 'Race or car data not found', 'error');
        return;
    }

    // Determine cooldown based on rarity (5-30 minutes)
    const rarityCooldowns = {
        'common': 5 * 60 * 1000,
        'uncommon': 10 * 60 * 1000,
        'rare': 15 * 60 * 1000,
        'epic': 20 * 60 * 1000,
        'legendary': 25 * 60 * 1000,
        'mythic': 30 * 60 * 1000
    };
    const cooldownTime = rarityCooldowns[carData.rarity.toLowerCase()] || 10 * 60 * 1000;
    gameData.carCooldowns[carId] = Date.now() + cooldownTime;

    // Determine race type and relevant stats
    const raceType = race.type || 1; // Default to circuit if type not specified
    let relevantStats = {};
    
    if (raceType === 1) { // Circuit race
        relevantStats = {
            pwr: carData.stats.PWR || 50,
            hdl: carData.stats.HDL || 50
        };
    } else { // Drag race
        relevantStats = {
            spd: carData.stats.SPD || 50,
            hdl: carData.stats.HDL || 50
        };
    }
    
    // Calculate difficulty modifiers (lower stats = harder game)
    const statAverage = Object.values(relevantStats).reduce((a, b) => a + b, 0) / Object.values(relevantStats).length;
    const difficultyModifier = 1 - (statAverage / 100); // 0 (easy) to 0.5 (hard)
    
    // Calculate OVR for time adjustment
    const ovr = calculateOVR(carData.stats, playerCar.upgrades);
    // Higher OVR = more time (60-120 seconds range)
    const baseDuration = 60000; // 60 seconds
    const ovrTimeBonus = Math.min(60000, Math.floor((ovr - 50) * 1200)); // 12ms per OVR point over 50
    const maxAllowedTime = (race.time || 30) * 1000;
    const duration = Math.min(baseDuration + ovrTimeBonus, maxAllowedTime);

    const minigameModal = document.createElement('div');
    minigameModal.className = 'modal';
    minigameModal.style.display = 'flex';
    document.body.appendChild(minigameModal);

    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile version - dot clicking game
        let score = 0;
        const goal = 15;
        let startTime = Date.now();
        let activeDot = null;
        let dotTimeout = null;
        let isGameActive = true;

        minigameModal.innerHTML = `
            <div class="modal-content">
                <h2>${raceType === 1 ? 'Circuit Race Challenge' : 'Drag Race Challenge'}</h2>
                <p>Tap the dots as they appear!</p>
                <div class="race-stats-info">
                    OVR: ${ovr} | Time: ${Math.round(duration/1000)}s | 
                    ${raceType === 1 ? 
                      `Power: ${relevantStats.pwr} | Handling: ${relevantStats.hdl}` : 
                      `Speed: ${relevantStats.spd} | Handling: ${relevantStats.hdl}`}
                </div>
                <div id="dot-container" style="position: relative; width: 100%; height: 300px; border: 1px solid #ccc; margin: 20px 0;"></div>
                <div class="progress-container">
                    <div class="progress-bar" id="minigame-progress"></div>
                </div>
                <p id="minigame-score">Score: 0 / ${goal}</p>
                <p id="time-remaining">Time remaining: ${Math.round(duration/1000)}s</p>
            </div>
        `;

        const dotContainer = minigameModal.querySelector('#dot-container');
        const bar = minigameModal.querySelector('#minigame-progress');
        const scoreText = minigameModal.querySelector('#minigame-score');
        const timeRemainingEl = minigameModal.querySelector('#time-remaining');

        function createDot() {
            if (!isGameActive) return;
            
            // Remove existing dot if any
            if (activeDot) {
                dotContainer.removeChild(activeDot);
                activeDot = null;
            }
            
            // Clear timeout if exists
            if (dotTimeout) clearTimeout(dotTimeout);
            
            // Create new dot
            const dot = document.createElement('div');
            dot.className = 'race-dot';
            
            // Set random position (within container bounds)
            const containerWidth = dotContainer.clientWidth;
            const containerHeight = dotContainer.clientHeight;
            const dotSize = 40 + Math.floor(difficultyModifier * 20); // Bigger dots for harder difficulty
            
            const maxX = containerWidth - dotSize;
            const maxY = containerHeight - dotSize;
            
            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY);
            
            dot.style.width = `${dotSize}px`;
            dot.style.height = `${dotSize}px`;
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            dot.style.backgroundColor = raceType === 1 ? 'lightblue' : 'lightgreen';
            dot.style.borderRadius = '50%';
            dot.style.position = 'absolute';
            dot.style.cursor = 'pointer';
            
            // Add click handler
            dot.addEventListener('click', () => {
                if (!isGameActive) return;
                
                score++;
                scoreText.textContent = `Score: ${score} / ${goal}`;
                dotContainer.removeChild(dot);
                activeDot = null;
                
                if (score >= goal) {
                    endMinigame(true);
                } else {
                    // Create new dot after short delay
                    setTimeout(createDot, 500 - (difficultyModifier * 200)); // Faster spawn for harder difficulty
                }
            });
            
            dotContainer.appendChild(dot);
            activeDot = dot;
            
            // Dot disappears after 1.5 seconds if not clicked
            dotTimeout = setTimeout(() => {
                if (activeDot === dot && isGameActive) {
                    dotContainer.removeChild(dot);
                    activeDot = null;
                    createDot(); // Show new dot immediately
                }
            }, 1500);
        }

        function updateProgress() {
            const elapsed = Date.now() - startTime;
            const percent = 100 - (elapsed / duration) * 100;
            bar.style.width = `${percent}%`;
            timeRemainingEl.textContent = `Time remaining: ${Math.max(0, Math.ceil((duration - elapsed)/1000))}s`;
            
            if (elapsed >= duration) {
                endMinigame(false);
            }
        }

        function endMinigame(success = false) {
            isGameActive = false;
            clearInterval(timer);
            if (activeDot) {
                dotContainer.removeChild(activeDot);
                activeDot = null;
            }
            if (dotTimeout) clearTimeout(dotTimeout);
            minigameModal.remove();
            finishRaceMinigame(success, raceId);
        }

        // Start the mobile game
        createDot();
        const timer = setInterval(updateProgress, 100);
        
    } else {
        // Desktop QTE minigame with new timing system (existing code)
        let score = 0;
        const goal = 15;
        const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let targetKey = '';
        let startTime = Date.now();
        let keyDisplayTime = 0;
        let isWaitingForInput = false;
        let isOnCooldown = false;
        let cooldownEnd = 0;
        let keyTimeout = null;

        minigameModal.innerHTML = `
            <div class="modal-content">
                <h2>${raceType === 1 ? 'Circuit Race Challenge' : 'Drag Race Challenge'}</h2>
                <p>Press the correct key within 1 second when it appears!</p>
                <div class="race-stats-info">
                    OVR: ${ovr} | Time: ${Math.round(duration/1000)}s | 
                    ${raceType === 1 ? 
                      `Power: ${relevantStats.pwr} | Handling: ${relevantStats.hdl}` : 
                      `Speed: ${relevantStats.spd} | Handling: ${relevantStats.hdl}`}
                </div>
                <h3 id="target-key" style="font-size: 3rem; color: ${raceType === 1 ? 'lightblue' : 'lightgreen'}; text-align: center;"></h3>
                <div id="cooldown-message" style="text-align: center; color: orange; display: none;">
                    Missed! 2 second cooldown...
                </div>
                <div class="progress-container">
                    <div class="progress-bar" id="minigame-progress"></div>
                </div>
                <p id="minigame-score">Score: 0 / ${goal}</p>
                <p id="time-remaining">Time remaining: ${Math.round(duration/1000)}s</p>
            </div>
        `;

        const bar = minigameModal.querySelector('#minigame-progress');
        const scoreText = minigameModal.querySelector('#minigame-score');
        const targetKeyEl = minigameModal.querySelector('#target-key');
        const timeRemainingEl = minigameModal.querySelector('#time-remaining');
        const cooldownMessageEl = minigameModal.querySelector('#cooldown-message');

        function getRandomKey() {
            // Add more keys to choose from when difficulty is higher
            const keyCount = Math.min(26, 10 + Math.floor(difficultyModifier * 16));
            return keys[Math.floor(Math.random() * keyCount)];
        }

        function showNewKey() {
            if (isOnCooldown) return;
            
            targetKey = getRandomKey();
            targetKeyEl.textContent = targetKey;
            keyDisplayTime = Date.now();
            isWaitingForInput = true;
            cooldownMessageEl.style.display = 'none';
            
            // Clear any existing timeout
            if (keyTimeout) clearTimeout(keyTimeout);
            
            // Set new timeout for 1 second
            keyTimeout = setTimeout(() => {
                if (isWaitingForInput && minigameModal.parentNode) {
                    // Player didn't press key in time
                    handleMissedKey();
                }
            }, 1000);
        }

        function handleMissedKey() {
            isWaitingForInput = false;
            targetKeyEl.textContent = '';
            cooldownMessageEl.style.display = 'block';
            isOnCooldown = true;
            cooldownEnd = Date.now() + 2000;
            
            const cooldownInterval = setInterval(() => {
                const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000);
                if (remaining <= 0) {
                    clearInterval(cooldownInterval);
                    isOnCooldown = false;
                    cooldownMessageEl.style.display = 'none';
                    showNewKey();
                }
            }, 100);
        }

        function updateProgress() {
            const elapsed = Date.now() - startTime;
            const percent = 100 - (elapsed / duration) * 100;
            bar.style.width = `${percent}%`;
            timeRemainingEl.textContent = `Time remaining: ${Math.max(0, Math.ceil((duration - elapsed)/1000))}s`;
            
            if (elapsed >= duration) {
                endMinigame(false);
            }
        }

        function onKeyPress(e) {
            if (!isWaitingForInput || isOnCooldown) return;
            
            // Clear the timeout immediately when a key is pressed
            if (keyTimeout) clearTimeout(keyTimeout);
            
            if (e.key.toUpperCase() === targetKey) {
                score++;
                scoreText.textContent = `Score: ${score} / ${goal}`;
                isWaitingForInput = false;
                targetKeyEl.textContent = '';
                
                if (score >= goal) {
                    endMinigame(true);
                } else {
                    // Show next key after short delay
                    setTimeout(showNewKey, 500);
                }
            } else {
                // Wrong key pressed - treat as miss
                handleMissedKey();
            }
        }

        function endMinigame(success = false) {
            clearInterval(timer);
            window.removeEventListener('keydown', onKeyPress);
            minigameModal.remove();
            finishRaceMinigame(success, raceId);
        }

        // Start the desktop game
        showNewKey();
        const timer = setInterval(updateProgress, 100);
        window.addEventListener('keydown', onKeyPress);
    }
}
// Modified finishRaceMinigame function
function finishRaceMinigame(success, raceId) {
    const race = gameData.activeRaces.find(r => r.id === raceId);
    if (!race) return;

    const playerCar = gameData.player.inventory.find(c => c.uniqueId === race.assignedCar);
    const carData = gameData.cars.find(c => c.carId === playerCar?.cardId);

    if (success) {
        // Success logic remains the same
        gameData.player.balance += race.reward;
        gameData.player.stats.peakCash = Math.max(gameData.player.balance, gameData.player.stats.peakCash);
        showNotification('Race Completed!', `You earned $${race.reward.toLocaleString()} for completing ${race.track}.`, 'success');
        recordTransaction('payment', `Race Win Payment ${race.track}`, race.reward);
        // Apply standard cooldown
        if (carData) {
            const baseCooldown = rarityCooldowns[carData.rarity.toLowerCase()] || 10 * 60 * 1000;
            gameData.carCooldowns[race.assignedCar] = Date.now() + baseCooldown;
        }
    } else {
        // Failure - apply increased cooldown
        if (carData) {
            const baseCooldown = rarityCooldowns[carData.rarity.toLowerCase()] || 10 * 60 * 1000;
            const penaltyCooldown = baseCooldown * 1.5; // 50% longer cooldown for losing
            gameData.carCooldowns[race.assignedCar] = Date.now() + Math.min(penaltyCooldown, 15 * 60 * 1000);
        }
        showNotification('Race Failed', 'You failed the race. Your car will need longer to recover!', 'error');
    }

    // Update stats and clean up
    if (!gameData.player.stats.races) {
        gameData.player.stats.races = {
            completed: 0,
            wins: 0,
            earnings: 0,
            highestPaying: { amount: 0, name: "None" },
            mostUsedCar: { id: null, count: 0, name: "None" },
            trackCounts: {}
        };
    }

    gameData.player.stats.races.completed++;
    if (success) {
        gameData.player.stats.races.wins++;
        gameData.player.stats.races.earnings += race.reward;
        
        if (race.reward > gameData.player.stats.races.highestPaying.amount) {
            gameData.player.stats.races.highestPaying = {
                amount: race.reward,
                name: race.track
            };
        }
    }

    if (!gameData.player.stats.races.trackCounts[race.track]) {
        gameData.player.stats.races.trackCounts[race.track] = 0;
    }
    gameData.player.stats.races.trackCounts[race.track]++;

    // Remove race and save
    gameData.activeRaces = gameData.activeRaces.filter(r => r.id !== raceId);
    const raceElement = document.getElementById(raceId);
    if (raceElement) raceElement.remove();
    
    renderRaceUI();
    updateRaceEmptyMessage();
    saveGame();
    updateBalanceDisplay();
    
    // Ensure cooldown is saved to localStorage
    localStorage.setItem('carCooldowns', JSON.stringify(gameData.carCooldowns));
}
 function showBanScreen(banInfo) {
    // Set body to banned state
    document.body.classList.add('banned');
    
    // Get elements
    const banOverlay = document.getElementById('banOverlay');
    const reasonText = document.getElementById('banReasonText');
    const durationText = document.getElementById('banDurationText');
    const userIdText = document.getElementById('banUserId');
    const okButton = document.getElementById('banOkButton');
    
    // Set ban info
    reasonText.textContent = banInfo.reason;
    userIdText.textContent = gameData.player.userId;
    
    if (banInfo.until) {
        const banDate = new Date(banInfo.until);
        durationText.textContent = `until ${banDate.toLocaleString()}`;
    } else {
        durationText.textContent = 'PERMANENT';
    }
    
    // Configure OK button
    okButton.onclick = function() {
        // Change button text to indicate tab needs to be closed
        okButton.textContent = 'Please close this tab';
        okButton.style.backgroundColor = '#880000';
        okButton.onclick = null; // Remove any further interaction
    };
    
    // Show the overlay
    banOverlay.style.display = 'flex';
    
    // Block all keyboard/mouse events
    document.addEventListener('keydown', blockAllInputs, true);
    document.addEventListener('click', blockAllInputs, true);
    document.addEventListener('contextmenu', blockAllInputs, true);
}

function blockAllInputs(e) {
    // Allow clicks within the ban overlay
    if (e.target.closest('.ban-overlay')) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
}

function checkBanStatus(userId) {
    const banInfo = bannedUsers[userId];
    
    if (banInfo) {
        // Check if ban is expired
        if (banInfo.until && banInfo.until < Date.now()) {
            return false; // Ban expired
        }
        return banInfo; // User is banned
    }
    return false; // User not banned
}    // Initialize the game when DOM is loaded
        document.addEventListener('DOMContentLoaded', initGame);
