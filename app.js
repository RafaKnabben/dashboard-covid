const selectedCountry = document.querySelector("#selected-country");
const newCasesBra = document.querySelector("#newCasesBra");
const totalBra = document.querySelector("#totalBra");
const newDeathsBra = document.querySelector("#newDeathsBra");
const deathBra = document.querySelector("#deathBRA");
const activeBra = document.querySelector("#activeBRA");
const listCountries = document.querySelector("#countries-list");

const setCountryAPI = function () {
    const list = axios(`https://api.covid19api.com/countries`);
    return list;
}

const setCountriesList = async function () {
    const fetchCountries = await setCountryAPI();
    const arrCountries = fetchCountries.data;
    
    try { 
        arrCountries.forEach((i) => {
            const item = document.createElement("option");
            item.setAttribute("class", "list-item");
            item.setAttribute("value", `${i.Slug}`);
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

    const option = listCountries.options[listCountries.selectedIndex].value;

    const sel = await axios(`https://api.covid19api.com/total/country/${option}`);

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
    // return console.log(option);
})


// const fetchData = function () {
//     const res = axios(`https://api.covid19api.com/total/country/brazil`);
//     return res;
// }

// const selectData = async function () {

//     const sel = await fetchData();

//     const totalCasesBra = sel.data[sel.data.length -1].Confirmed;
//     const casesNewBra = totalCasesBra - sel.data[sel.data.length -2].Confirmed;
//     const totalDeathBra = sel.data[sel.data.length -1].Deaths;
//     const deathsNewBra = totalDeathBra - sel.data[sel.data.length -2].Deaths;
//     const totalActiveBra = sel.data[sel.data.length -1].Active;

//     selectedCountry.innerHTML = `${sel.data[sel.data.length -1].Country}`;
//     newCasesBra.innerHTML = `<p>${casesNewBra}</p>`;
//     totalBra.innerHTML = `<p>${totalCasesBra}</p>`;
//     newDeathsBra.innerHTML = `<p>${deathsNewBra}</p>`;
//     deathBra.innerHTML = `<p>${totalDeathBra}</p>`;
//     activeBra.innerHTML = `<p>${totalActiveBra}</p>`;
// }

// selectData();
