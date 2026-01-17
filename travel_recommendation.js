let travelData = null;

// Fetch data
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("Travel Recommendation Data:", travelData);
  })
  .catch(error => console.error(error));

// Get local time (Task 10)
function getLocalTime(timeZone) {
  const options = {
    timeZone: timeZone,
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return new Date().toLocaleTimeString('en-US', options);
}

// Search logic
document.getElementById("searchBtn").addEventListener("click", function () {
  const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!travelData || keyword === "") return;

  if (keyword === "beach" || keyword === "beaches") {
    displayResults(travelData.beaches);
  } 
  else if (keyword === "temple" || keyword === "temples") {
    displayResults(travelData.temples);
  } 
  else if (keyword === "country" || keyword === "countries") {
    const cities = [];
    travelData.countries.forEach(country => {
      country.cities.forEach(city => cities.push(city));
    });
    displayResults(cities);
  } 
  else {
    results.innerHTML = "<p>No recommendations found.</p>";
  }
});

// Display results
function displayResults(items) {
  const results = document.getElementById("results");

  items.slice(0, 2).forEach(item => {
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.padding = "20px";
    card.style.marginBottom = "20px";
    card.style.maxWidth = "600px";

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.style.width = "100%";
    img.style.height = "300px";
    img.style.objectFit = "cover";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const desc = document.createElement("p");
    desc.textContent = item.description;

    let timeZone = "UTC";
    if (item.name.includes("Japan")) timeZone = "Asia/Tokyo";
    else if (item.name.includes("Australia")) timeZone = "Australia/Sydney";
    else if (item.name.includes("Brazil")) timeZone = "America/Sao_Paulo";
    else if (item.name.includes("India")) timeZone = "Asia/Kolkata";
    else if (item.name.includes("Cambodia")) timeZone = "Asia/Phnom_Penh";

    const time = document.createElement("p");
    time.style.fontStyle = "italic";
    time.textContent = "Local Time: " + getLocalTime(timeZone);

    card.append(img, title, desc, time);
    results.appendChild(card);
  });
}

// Clear button
document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
});

