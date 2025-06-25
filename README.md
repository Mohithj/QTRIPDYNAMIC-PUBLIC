# QTrip Dynamic

**QTrip Dynamic** is an interactive travel platform designed to let users explore cities, browse adventures, and make reservations seamlessly. Built with a modern full-stack approach, this project showcases dynamic content rendering, API integration, and persistent user interactions.

---

## 🧭 Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Deployment](#deployment)  

---

## Features

- Landing page: displays city cards (destination selection)
- Dynamic adventures list per city
- Adventure detail pages featuring:
  - Info (cost, availability)
  - Image carousel
  - Real-time reservation form
- Persistent reservations view
- Filters: category, duration, cost
- Responsive UI for desktop and mobile

---

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap and custom styling  
- **Backend**: Node.js / Express (REST APIs)  
- **Persistence**: localStorage for preferences and reservations  
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render
- **Utilities**: jQuery for form handling & AJAX

---

## Project Structure

```text
QTRIPDYNAMIC-PUBLIC/
├── backend/           # REST API server
│   ├── controllers/
│   ├── routes/
│   ├── data/          # sample/adventure data JSON
│   └── index.js       # server entry
└── frontend/          # UI layer
    ├── pages/
    │   ├── index.html         # Homepage
    │   ├── adventures.html    # Subpage listing all the adventures in a particular city
    │   ├── detail.html        # Subpage showing all the details of a particular adventure
    │   └── reservations.html  # reservation page
    ├── assets/
    ├── js/
    │   ├── main.js            # global logic
    │   ├── adventures.js      # filter, fetch, render
    │   ├── detail.js          # carousel, reservation handling
    │   └── reservations.js    # load & display bookings
    └── css/
        └── styles.css
```

---

## Usage

- Explore Cities – Landing page shows selectable city cards.
- View Adventures – Click a city to fetch and display relevant adventures with filter options.
- Adventure Details – Includes information, images, reservation form, and cost/availability.
- Make Reservation – Form submission stores booking (via API or localStorage).
- View Reservations – Dedicated page listing all user reservations.

---

## Deployment

- Frontend: Deploy on Vercel
  - Use the Vercel CLI from the terminal and deploy to production.
 
- Backend: Deploy on Render
  - Connect your github repo and deploy the build using the suitable configuration.
 
---

## Live Website

The project is deployed and accessible at: 🔗 https://qtrip-dynamic-mohiths-projects-7b8688ba.vercel.app/

