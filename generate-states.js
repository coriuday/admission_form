const fs = require('fs');

(async () => {
    try {
        console.log("Fetching countries and states data from github...");
        const countriesRes = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
        const statesRes = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json');
        
        if (!countriesRes.ok || !statesRes.ok) {
            throw new Error(`HTTP error! countries: ${countriesRes.status}, states: ${statesRes.status}`);
        }
        
        const countries = await countriesRes.json();
        const allStates = await statesRes.json();
        
        let countriesData = [];
        let statesData = {};
        
        countries.forEach(c => {
            let phoneStr = String(c.phone_code);
            // Some phone codes might contain multiple like "+1-246", we just take the raw string or format it
            if (!phoneStr.startsWith('+')) {
                phoneStr = '+' + phoneStr;
            }
            // Strip any complex multiple codes to just the main one if we really wanted to, but keeping it as is works
            
            countriesData.push({
                name: c.name,
                code: c.iso2,
                phone: phoneStr
            });
            // Initialize empty array for this country's states
            statesData[c.iso2] = [];
        });
        
        allStates.forEach(s => {
            if (statesData[s.country_code]) {
                statesData[s.country_code].push(s.name);
            } else {
                statesData[s.country_code] = [s.name];
            }
        });
        
        const jsContent = `const COUNTRIES_DATA = ${JSON.stringify(countriesData, null, 2)};\n\nconst STATES_DATA = ${JSON.stringify(statesData, null, 2)};\n\nwindow.Country = {\n    getAllCountries: () => COUNTRIES_DATA\n};\nwindow.State = {\n    getStatesOfCountry: (code) => {\n        const states = STATES_DATA[code] || [];\n        return states.map(name => ({ name, isoCode: name }));\n    }\n};\n`;
        
        fs.writeFileSync('./static-admission-form/countries-data.js', jsContent);
        console.log("Wrote to countries-data.js");
        
        const tsContent = `export const COUNTRIES_DATA = ${JSON.stringify(countriesData, null, 2)};\n\nexport const STATES_DATA = ${JSON.stringify(statesData, null, 2)};\n`;
        fs.appendFileSync('./lib/constants.ts', '\n\n' + tsContent);
        console.log("Appended to constants.ts");
        
    } catch(e) {
        console.error("Error:", e);
    }
})();
