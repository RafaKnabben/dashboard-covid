const selectedCountry = document.querySelector("#selected-country");
const newCasesBra = document.querySelector("#newCasesBra");
const totalBra = document.querySelector("#totalBra");
const newDeathsBra = document.querySelector("#newDeathsBra");
const deathBra = document.querySelector("#deathBRA");
const activeBra = document.querySelector("#activeBRA");
const listCountries = document.querySelector("#countries-list");
const incidence = document.querySelector("#incidence");

const setCountryAPI = function () {
    const list = axios(`https://api.covid19api.com/countries`);
    return list;
}

const testAPI = async function () {
    const sel = await axios(`https://restcountries.eu/rest/v2/alpha/mg`);
    const pops = sel.data.population;
    return pops;
}

const setCountriesList = async function () {
    const fetchCountries = await setCountryAPI();
    const arrCountries = fetchCountries.data;
    
    try {
        arrCountries.forEach((i) => {
                const item = document.createElement("option");
                item.setAttribute("class", "list-item");
                item.setAttribute("value", `${i.ISO2}`);
                item.append(i.Country);
                listCountries.appendChild(item);
        });
    } catch {
        console.error("Apparently it is not possible to list the countries.");
    }
}

setCountriesList();

window.addEventListener("click", async (e) => {
    e.preventDefault();

    const countryPick = listCountries.options[listCountries.selectedIndex].value;

    const sel = await axios(`https://api.covid19api.com/total/country/${countryPick}`);
    const selPops = await axios(`https://restcountries.eu/rest/v2/alpha/${countryPick}`)

    try {
        const pops = selPops.data.population / 100000;
        const totalCasesBra = sel.data[sel.data.length -1].Confirmed;
        const casesNewBra = totalCasesBra - sel.data[sel.data.length -2].Confirmed;
        const lastWeek = casesNewBra + (sel.data[sel.data.length -2].Confirmed - sel.data[sel.data.length -3].Confirmed) + (sel.data[sel.data.length -3].Confirmed - sel.data[sel.data.length -4].Confirmed) + (sel.data[sel.data.length -4].Confirmed - sel.data[sel.data.length -5].Confirmed) + (sel.data[sel.data.length -5].Confirmed - sel.data[sel.data.length -6].Confirmed) + (sel.data[sel.data.length -6].Confirmed - sel.data[sel.data.length -7].Confirmed) + (sel.data[sel.data.length -7].Confirmed - sel.data[sel.data.length -8].Confirmed);
        const totalDeathBra = sel.data[sel.data.length -1].Deaths;
        const deathsNewBra = totalDeathBra - sel.data[sel.data.length -2].Deaths;
        const LastWeekDeaths = deathsNewBra + (sel.data[sel.data.length -2].Deaths - sel.data[sel.data.length -3].Deaths) + (sel.data[sel.data.length -3].Deaths - sel.data[sel.data.length -4].Deaths) + (sel.data[sel.data.length -4].Deaths - sel.data[sel.data.length -5].Deaths) + (sel.data[sel.data.length -5].Deaths - sel.data[sel.data.length -6].Deaths) + (sel.data[sel.data.length -6].Deaths - sel.data[sel.data.length -7].Deaths) + (sel.data[sel.data.length -7].Deaths - sel.data[sel.data.length -8].Deaths);
        const totalActiveBra = sel.data[sel.data.length -1].Active;
        const currentIncidence = Math.round(lastWeek / pops);
        const currentDeathIncidence = Math.round(LastWeekDeaths / pops);
    
        selectedCountry.innerHTML = `${sel.data[sel.data.length -1].Country}`;
        incidence.innerHTML = `<p>${currentIncidence}</p><p>${currentDeathIncidence}</p>`;
        newCasesBra.innerHTML = `<p>${casesNewBra}</p>`;
        totalBra.innerHTML = `<p>${totalCasesBra}</p>`;
        newDeathsBra.innerHTML = `<p>${deathsNewBra}</p>`;
        deathBra.innerHTML = `<p>${totalDeathBra}</p>`;
        activeBra.innerHTML = `<p>${totalActiveBra}</p>`;
    } catch {
        console.error("Country without data.")
    }
})