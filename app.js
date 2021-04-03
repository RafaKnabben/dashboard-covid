const selectedCountry = document.querySelector("#selected-country");
const newCasesBra = document.querySelector("#newCasesBra");
const totalBra = document.querySelector("#totalBra");
const newDeathsBra = document.querySelector("#newDeathsBra");
const deathBra = document.querySelector("#deathBRA");
const activeBra = document.querySelector("#activeBRA");
const listCountries = document.querySelector("#countries-list");

const countryList = async function () {
    const list = await axios(`https://api.covid19api.com/countries`);

    const arrCountries = list.data;
    
try { 
    // arrCountries.forEach(item => listCountries.innerHTML = `<option>${item.Country}</option>`);
    for(i = 0; i <= arrCountries.length; i++) {
    listCountries.innerHTML = `<option>${arrCountries[i].Country}</option>`;
    }
} catch {
    console.error("Apparently it is not possible to list the countries.");
}
}

countryList();

const fetchBra = function () {
    const res = axios(`https://api.covid19api.com/total/country/brazil`);
    return res;
}

const selectBra = async function () {

    const sel = await fetchBra();

    const totalCasesBra = sel.data[sel.data.length -1].Confirmed;
    const casesNewBra = totalCasesBra - sel.data[sel.data.length -2].Confirmed;
    const totalDeathBra = sel.data[sel.data.length -1].Deaths;
    const deathsNewBra = totalDeathBra - sel.data[sel.data.length -2].Deaths;
    const totalActiveBra = sel.data[sel.data.length -1].Active;

    selectedCountry.innerHTML = `${sel.data[sel.data.length -1].Country}`;
    newCasesBra.innerHTML = `<p>${casesNewBra}</p>`;
    totalBra.innerHTML = `<p>${totalCasesBra}</p>`;
    newDeathsBra.innerHTML = `<p>${deathsNewBra}</p>`;
    deathBra.innerHTML = `<p>${totalDeathBra}</p>`;
    activeBra.innerHTML = `<p>${totalActiveBra}</p>`;
}

selectBra();
