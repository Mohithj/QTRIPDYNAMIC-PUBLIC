import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities


  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  // console.log("From init()");
  // console.log(config.backendEndpoint);
  // console.log(cities);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let url = config.backendEndpoint;
    let res = await fetch(`${url}/cities`);
    let data = await res.json();
    return data;
  } catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const h5 = document.createElement("h5");
  const p = document.createElement("p");
  h5.textContent = city;
  p.textContent = description;

  const tileText = document.createElement("div");
  tileText.className = "tile-text"
  tileText.append(h5, p);

  const imageCity = document.createElement("img");
  imageCity.src = image;
  imageCity.alt = id;

  const tile = document.createElement("div");
  tile.className = "tile";
  tile.append(tileText, imageCity);

  const a = document.createElement("a");
  a.href = `pages/adventures/?city=${id}`;
  a.append(tile);
  a.id = id;

  const col = document.createElement("div");
  col.className = "col-6 col-lg-3 mb-3";
  col.append(a);

  const row = document.querySelector("#data");
  row.append(col);

  // console.log(row);
  // return row;

}

export { init, fetchCities, addCityToDOM };
