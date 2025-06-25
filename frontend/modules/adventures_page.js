
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const endpoint = `${config.backendEndpoint}/adventures?city=${city}`;
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    createCard(key.category, key.costPerHead, key.duration, key.id, key.image, key.name);
  });
}

function createCard(category, costPerHead, duration, id, image, name){
  const card = document.createElement("div");
  card.className = "activity-card";

  const adventureDetail = document.createElement("div");
  adventureDetail.className = "adventure-detail";
  adventureDetail.innerHTML = `
    <div>
      <h5>${name}</h5>
      <p>₹${costPerHead}</p>
    </div>
    <div>
      <h5>Duration</h5>
      <p>${duration}</p>
    </div>
  `

  const img = document.createElement("img");
  img.src = image;

  const categoryBanner = document.createElement("div");
  categoryBanner.textContent = category;
  categoryBanner.className = "category-banner";

  card.append(categoryBanner, img, adventureDetail);

  const anchor = document.createElement("a");
  anchor.href =`detail/?adventure=${id}`;
  anchor.id = id;

  anchor.append(card);

  const col = document.createElement("div");
  col.className = "col-6 col-lg-3 mb-4";

  col.append(anchor);
  
  const row = document.querySelector("#data");
  row.append(col);

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(a => a.duration >= low && a.duration <= high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(a => categoryList.includes(a.category));

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const duration = filters.duration.split("-");
  const low = duration[0];
  const high = duration[1];

  if (filters.duration.length > 0 && filters.category.length > 0){
    let filteredData = filterByDuration(list, low, high);
    filteredData = filterByCategory(filteredData, filters.category);
    return filteredData;
  }

  if (filters.duration.length > 0 && filters.category.length === 0){
    let filteredData = filterByDuration(list, low, high);
    return filteredData; 
  }

  if (filters.duration.length === 0 && filters.category.length > 0){
    let filteredData = filterByCategory(list, filters.category);
    return filteredData;
  }


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryList = document.getElementById("category-list");
  let l = filters.category.length;

  while(l > 0){
    const p = document.createElement("p");
    // p.textContent = filters.category[l-1];
    p.className = "category-filter position-relative";
    p.id = filters.category[l-1];
    p.innerHTML = `
    ${filters.category[l-1]}
    <span
    class="position-absolute btn top-0 start-100 translate-middle badge rounded-pill bg-danger"
    onclick="closePill(event)"
    >
    x
    </span>
    `
    categoryList.append(p);
    l--;
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
