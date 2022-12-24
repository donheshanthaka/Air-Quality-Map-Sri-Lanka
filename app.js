// Selectors
const sriLankaMap = document.querySelector('.sri-lanka-map');
console.log(sriLankaMap.innerHTML);

// Event Listners
sriLankaMap.addEventListener('click', (e) => {
    const id = e.explicitOriginalTarget.id;
    // console.log(e.explicitOriginalTarget.id);
    if (id in locations){
        console.log(`${locations[id].name}`);
        fetchAirQuality(locations[id].geo);
        // console.log(locations[id].geo);
    }
});

const fetchAirQuality = async ({lat, lon}) => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=dbfaf51630859f71e4864ba512db6615`;
    const response = await axios.get(url);
    // console.log(response.data.list[0].components.pm2_5)
    const pm25_aqi = pm25(response.data.list[0].components.pm2_5);
    const label = aqi_label(pm25_aqi);
    console.log(`US-AQI: ${pm25_aqi} Label: ${label}`);
    // console.log(response);

}



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
        name: 'Gampaha',
        geo: {lat: '6.5854', lon: '79.9607'}
    }
}