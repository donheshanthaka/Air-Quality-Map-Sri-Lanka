const locations = {
    LKA2448: {
        name: 'Kandy',
        geo: {lat: '7.2906', lon: '80.6337'}
    },
    LKA2449: {
        name: 'Matale',
        geo: {lat: '7.4675', lon: '80.6234'}
    },
    LKA2450: {
        name: 'Nuwara Eliya',
        geo: {lat: '6.9497', lon: '80.7891'}
    },
    LKA2451: {
        name: 'Ampara',
        geo: {lat: '7.3018', lon: '81.6747'}
    },
    LKA2452: {
        name: 'Batticaloa',
        geo: {lat: '7.7310', lon: '81.6747'}
    },
    LKA2453: {
        name: 'Polonnaruwa',
        geo: {lat: '7.9403', lon: '81.0188'}
    },
    LKA2454: {
        name: 'Trincomalee',
        geo: {lat: '8.5874', lon: '81.2152'}
    },
    LKA2455: {
        name: 'Anuradhapura',
        geo: {lat: '8.3114', lon: '80.4037'}
    },
    LKA2456: {
        name: 'Vavuniya',
        geo: {lat: '8.7542', lon: '80.4982'}
    },
    LKA2457: {
        name: 'Mannar',
        geo: {lat: '8.9810', lon: '79.9044'}
    },
    LKA2458: {
        name: 'Mullaitivu',
        geo: {lat: '9.2671', lon: '80.8142'}
    },
    LKA2459: {
        name: 'Jaffna',
        geo: {lat: '9.6615', lon: '80.0255'}
    },
    LKA2460: {
        name: 'Kilinochchi',
        geo: {lat: '9.3803', lon: '80.3770'}
    },
    LKA2461: {
        name: 'Kurunegala',
        geo: {lat: '7.4818', lon: '80.3609'}
    },
    LKA2462: {
        name: 'Puttalam',
        geo: {lat: '8.0408', lon: '79.8394'}
    },
    LKA2463: {
        name: 'Ratnapura',
        geo: {lat: '6.7056', lon: '80.3847'}
    },
    LKA2464: {
        name: 'Galle',
        geo: {lat: '6.0329', lon: '80.2168'}
    },
    LKA2465: {
        name: 'Hambantota',
        geo: {lat: '6.1429', lon: '81.1212'}
    },
    LKA2466: {
        name: 'Matara',
        geo: {lat: '5.9496', lon: '80.5469'}
    },
    LKA2467: {
        name: 'Badulla',
        geo: {lat: '6.9934', lon: '81.0550'}
    },
    LKA2468: {
        name: 'Monaragala',
        geo: {lat: '6.8728', lon: '81.3507'}
    },
    LKA2469: {
        name: 'Kegalle',
        geo: {lat: '7.2513', lon: '80.3464'}
    },
    LKA2470: {
        name: 'Colombo',
        geo: {lat: '6.9271', lon: '79.8612'}
    },
    LKA2471: {
        name: 'Gampaha',
        geo: {lat: '7.0840', lon: '80.0098'}
    },
    LKA2472: {
        name: 'Kalutara',
        geo: {lat: '6.5854', lon: '79.9607'}
    }
}

const populateMap = async (locations) => {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    for (let location in locations){
        const components = await fetchAirQuality(locations[location].geo);
        locations[location].data = [];
        for (let component in components) {
            locations[location].data.push(components[component]);
        };
        const aqi = pm25(components.pm2_5);
        const label = aqi_label(aqi);
        const color = aqi_color(aqi);
        style.sheet.insertRule(`#${location}{fill:#${color};}`,0);
        locations[location].aqi = aqi;
        locations[location].label = label;
    };
    return true;
}

const updateInfo = (id) => {
    if (id in locations){
        const name = locations[id].name;
        const aqi = locations[id].aqi;
        const label = locations[id].label;
        const data = locations[id].data;
        cityName.textContent = name;
        aqiText.textContent = `AQI: ${aqi}`;
        const color = aqi_color(aqi);
        aqiTextBox.style.backgroundColor = `#${color}`;
        aqiLevelBox.style.backgroundColor = `#${color}`;
        if (label === 'Moderate') {

            aqiTextBox.style.color = 'rebeccapurple';
            aqiLevelBox.style.color = 'rebeccapurple';
        } else {
            aqiTextBox.style.color = 'white';
            aqiLevelBox.style.color = 'white';
        }
        levelText.textContent = `LEVEL: ${label}`;
        const guidelines = aqi_guidelines(aqi);
        description.innerHTML = '';
        guidelines.forEach((guideline) => {
            const text = document.createElement('li')
            text.innerText = guideline;
            description.appendChild(text);
        });
        rows.innerHTML = '';
        data.forEach((component) => {
            // console.log(component);
            const text = document.createElement('td')
            text.innerText = component;
            rows.appendChild(text);
        });
    }
}

const fetchAirQuality = async ({lat, lon}) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=dbfaf51630859f71e4864ba512db6615`;
    const response = await axios.get(url);
    return response.data.list[0].components;
}

// Selectors
const sriLankaMap = document.querySelector('.sri-lanka-map');
const cityName = document.querySelector('.city-name');
const aqiText = document.querySelector('.aqi-text');
const aqiTextBox = document.querySelector('.aqi-text');
const aqiLevelBox = document.querySelector('.level-text');
const levelText = document.querySelector('.level-text');
const description = document.querySelector('.description');
const rows = document.querySelector('.table-rows');

// Event Listners
sriLankaMap.addEventListener('click', (e) => {
    const id = e.target.id;
    updateInfo(id);
});

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.querySelector(".loader");
    await populateMap(locations);
    updateInfo('LKA2470');
    loader.classList.add("loader--hidden");
    // loader.addEventListener("transitionend", () => {
    //     document.body.removeChild(loader);
    // });
});