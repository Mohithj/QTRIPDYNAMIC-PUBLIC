import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const endpoint = `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`;
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  let imagesNum = adventure.images.length;
  // console.log(imagesNum);
  let i=0;
  const photoGallery = document.getElementById("photo-gallery");
  while (imagesNum > 0){
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = adventure.images[i];
    img.alt = `photo-${i}`;
    img.className = "activity-card-image";
    div.append(img);
    photoGallery.append(div);
    i++
    imagesNum--;
  }
  // const p = document.createElement("p");
  // p.textContent = adventure.content;
  // document.getElementById("adventure-content").append(p);
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const carouselInnner = document.createElement("div");
  carouselInnner.className = "carousel-inner";
  let imagesLen = images.length;
  let i=0;
  while (imagesLen > 0){
    const div = document.createElement("div");
    if (i === 0)
      div.className = "carousel-item active";
    else div.className = "carousel-item";
    const img = document.createElement("img");
    img.src = images[i];
    img.alt = `photo-${i}`;
    img.className = "activity-card-image d-block w-100";
    div.append(img);
    carouselInnner.append(div);
    i++
    imagesLen--;
  }
  // console.log(carouselInnner.outerHTML);

  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  ${carouselInnner.outerHTML}
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
  `
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out");
  let available = document.getElementById("reservation-panel-available");
  if (adventure.available == true){
    soldOut.style.display = "none";
    available.style.display = "block";
  } else {
    soldOut.style.display = "block";
    available.style.display = "none";
  }
  let costPerPerson = document.getElementById("reservation-person-cost");
  costPerPerson.textContent = adventure.costPerHead;
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = Number(persons) * adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(form.elements.name.value);
    let formData = {
      name: form.elements.name.value,
      date: form.elements.date.value,
      person: Number(form.elements.person.value),
      adventure: adventure.id
    }
    post(formData);
  })

  async function post(data){
    try {
      const url = `${config.backendEndpoint}/reservations/new`;
      const response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
         }
      })
      if (!response.ok) alert("Failed!");
      else {
        alert("Success!");
        window.location.reload();
      }
      const res = await response.json();
      return res;
    } catch (error) {
      alert("Failed!");
    }
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
  if (adventure.reserved === true){
    reservedBanner.style.display = "block";
  } else reservedBanner.style.display = "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
