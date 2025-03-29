// Makes it so when you update your JSON data, the homepage automatically reflects the changes.
document.addEventListener("DOMContentLoaded", () => {
  fetch('Data/speakers.json')
    .then(response => response.json())
    .then(data => {
      // Define the years you are currently working with.
      const years = ["2024", "2025"];

      years.forEach(year => {
        const container = document.querySelector(`#speakers-${year} .speakers-container`);
        if (data[year]) {
          data[year].forEach(speaker => {
            // Create a card element for each speaker.
            const card = document.createElement('div');
            card.className = 'speaker-card';
            card.innerHTML = `
              <img src="${speaker.headshot}" alt="${speaker.name} Headshot">
              <h3>${speaker.name}</h3>
              <p>${speaker.bio}</p>
            `;
            container.appendChild(card);
          });
        }
      });
    })
    .catch(error => console.error('Error fetching speaker data:', error));
});
