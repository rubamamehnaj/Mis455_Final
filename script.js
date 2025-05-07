document.getElementById("searchBtn").addEventListener("click", searchCountry);

function searchCountry() {
  const countryInput = document.getElementById("countryInput");
  const countryName = countryInput.value.trim();
  const resultContainer = document.getElementById("resultContainer");

  // Clear previous results
  resultContainer.innerHTML = "";

  if (!countryName) {
    resultContainer.innerHTML = "<p>Please enter a country name.</p>";
    return;
  }

  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      const country = data[0]; // Only show the first matching country

      const name = country.name.common;
      const capital = country.capital ? country.capital[0] : "N/A";
      const flag = country.flags?.svg || "";
      const currencies = country.currencies
        ? Object.values(country.currencies).map(c => c.name).join(", ")
        : "N/A";
      const region = country.region || "N/A";
      const population = country.population?.toLocaleString() || "N/A";
      const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

        const html = `
        <div class="country-info">
          <h2>${name}</h2>
          <img src="${flag}" alt="Flag of ${name}">
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Currency:</strong> ${currencies}</p>
          <p><strong>Region:</strong> ${region}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Languages:</strong> ${languages}</p>
        </div>
      `;

      resultContainer.innerHTML = html;

      // Clear input and scroll to result
      countryInput.value = "";
      resultContainer.scrollIntoView({ behavior: "smooth" });
    })
    .catch(error => {
      resultContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
