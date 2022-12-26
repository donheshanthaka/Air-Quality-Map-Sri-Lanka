const aqi_breakpoints = [
    [0, 50],
    [51, 100],
    [101, 150],
    [151, 200],
    [201, 300],
    [301, 400],
    [401, 500],
];

const pm25_breakpoints = [
    [0.0, 12.0],
    [12.1, 35.4],
    [35.5, 55.4],
    [55.5, 150.4],
    [150.5, 250.4],
    [250.5, 350.4],
    [350.5, 500.4],
];

const aqi_labels = [
    'Good',
    'Moderate',
    'Unhealthy for Sensitive Groups',
    'Unhealthy',
    'Very Unhealthy',
    'Hazardous',
];

const aqi_colors = [
    '009966',
    'ffde33',
    'ff9933',
    'cc0033',
    '660099',
    '7e0023',
];

const guidelines = [
    ['The AQI value for your community is between 0 and 50. Air quality is satisfactory and poses little or no health risk.'],
    ['The AQI is between 51 and 100. Air quality is acceptable; however, pollution in this range may pose a moderate health concern for a very small number of individuals. People who are unusually sensitive to ozone or particle pollution may experience respiratory symptoms.'],
    ['When AQI values are between 101 and 150, members of sensitive groups may experience health effects, but the general public is unlikely to be affected.',
    'Ozone: People with lung disease, children, older adults, and people who are active outdoors are considered sensitive and therefore at greater risk.',
    'Particle pollution: People with heart or lung disease, older adults,1 and children are considered sensitive and therefore at greater risk.'
    ],
    ['Everyone may begin to experience health effects when AQI values are between 151 and 200. Members of sensitive groups may experience more serious health effects.'],
    ['AQI values between 201 and 300 trigger a health alert, meaning everyone may experience more serious health effects.'],
    ['AQI values over 300 trigger health warnings of emergency conditions. The entire population is even more likely to be affected by serious health effects.']
];

if (undefined === Array.prototype.findIndex) {
    Array.prototype.findIndex = function (callback) {
        for (let i = 0; i < this.length; i++) {
            if (callback.call(this, this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
}

const breakpointIndex = (value, breakpoints) => {
    return breakpoints.findIndex((breakpoint) => {
        if (null === breakpoint) {
            return false;
        }
        return breakpoint[0] <= value && value <= breakpoint[1];
    });
}

const aqi = (concentration, breakpoints) => {
    const index = breakpointIndex(concentration, breakpoints);

    if (-1 === index) {
        return NaN;
    }

    const i_high = aqi_breakpoints[index][1],
        i_low = aqi_breakpoints[index][0],
        c_high = breakpoints[index][1],
        c_low = breakpoints[index][0];

    return Math.round((i_high - i_low) / (c_high - c_low) * (concentration - c_low) + i_low);
}

const pm25 = (concentration) => {
    concentration = Math.floor(concentration * 10) / 10;
    return aqi(concentration, pm25_breakpoints);
};

const aqi_label = (aqi) => {
    const idx = breakpointIndex(aqi, aqi_breakpoints);
    return aqi_labels[idx];
};

const aqi_color = (aqi) => {
    const idx = breakpointIndex(aqi, aqi_breakpoints);
    return aqi_colors[idx];
};

const aqi_guidelines = (aqi) => {
    const idx = breakpointIndex(aqi, aqi_breakpoints);
    return guidelines[idx];
};
