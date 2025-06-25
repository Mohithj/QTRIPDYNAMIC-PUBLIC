import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const endpoint = `${config.backendEndpoint}/reservations`;
  // console.log(endpoint);
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(reservations.length);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  const noReservation = document.getElementById("no-reservation-banner");
  const yesReservation = document.getElementById("reservation-table-parent");
  if (reservations.length) {
    noReservation.style.display = "none";
    yesReservation.style.display = "block";
  } else {
    noReservation.style.display = "block";
    yesReservation.style.display = "none";
  }
    /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const reservationTable = document.getElementById("reservation-table");
  reservations.map((element) => {
    // console.log(element);
    const tr = document.createElement("tr");
    let transid = document.createElement("th");
    transid.scope = "row";
    transid.textContent = element.id;
    let name = document.createElement("td");
    name.textContent = element.name;
    let adventure = document.createElement("td");
    adventure.textContent = element.adventureName;
    let person = document.createElement("td");
    person.textContent = element.person;

    const dateEvent = new Date(element.date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const timeEvent = new Date(element.time);
    const datePart = timeEvent.toLocaleDateString("en-IN",options);
    const timePart = timeEvent.toLocaleTimeString("en-IN");

    let date = document.createElement("td");
    date.textContent = dateEvent.toLocaleDateString("en-IN");
    let price = document.createElement("td");
    price.textContent = element.price;
    let time = document.createElement("td");
    time.textContent = `${datePart}, ${timePart}`;
    
    let action = document.createElement("td");
    action.id = element.id;
    let btn = document.createElement("button");
    btn.textContent = "Visit Adventure";
    btn.classList.add("reservation-visit-button");

    const a = document.createElement("a");
    a.href = `../detail/?adventure=${element.adventure}`;

    a.append(btn);
    action.append(a);
    tr.append(transid, name, adventure, person, date, price, time, action);
    reservationTable.append(tr);
  })
}

export { fetchReservations, addReservationToTable };
