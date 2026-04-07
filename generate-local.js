const fs = require('fs');
const { Country, State } = require('country-state-city');

try {
    console.log("Generating data from country-state-city...");
    
    // Get all countries
    const countries = Country.getAllCountries();
    
    let countriesData = [];
    let statesData = {};
    
    countries.forEach(c => {
        // Some phones are strings like "1", we want "+1"
        let phoneStr = String(c.phonecode);
        if (!phoneStr.startsWith('+')) {
            phoneStr = '+' + phoneStr;
        }
        
        countriesData.push({
            name: c.name,
            code: c.isoCode,
            phone: phoneStr
        });
        
        // Get states for this country
        const states = State.getStatesOfCountry(c.isoCode);
        statesData[c.isoCode] = states.map(s => s.name);
    });
    
    // Generate content for countries-data.js
    const jsContent = `const COUNTRIES_DATA = ${JSON.stringify(countriesData, null, 2)};\n\nconst STATES_DATA = ${JSON.stringify(statesData, null, 2)};\n\nwindow.Country = {\n    getAllCountries: () => COUNTRIES_DATA\n};\nwindow.State = {\n    getStatesOfCountry: (code) => {\n        const states = STATES_DATA[code] || [];\n        return states.map(name => ({ name, isoCode: name }));\n    }\n};\n`;
    
    fs.writeFileSync('./static-admission-form/countries-data.js', jsContent);
    console.log("Wrote to static-admission-form/countries-data.js");
    
    // Generate content for constants.ts
    const tsContent = `export const COUNTRIES_DATA = ${JSON.stringify(countriesData, null, 2)};\n\nexport const STATES_DATA = ${JSON.stringify(statesData, null, 2)};\n`;
    fs.appendFileSync('./lib/constants.ts', '\n\n' + tsContent);
    console.log("Appended to lib/constants.ts");

} catch(e) {
    console.error("Error:", e);
}
