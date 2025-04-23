document.addEventListener("DOMContentLoaded", () => {
  fetch("Data/speakers.json")
    .then((response) => response.json())
    .then((data) => {
      const years = ["2024", "2025"];
      const searchInput = document.getElementById("speaker-search");
      const allCards = [];

      years.forEach((year) => {
        const container = document.querySelector(`#speakers-${year} .speakers-container`);
        if (data[year]) {
          data[year].forEach((speaker) => {
            const card = document.createElement("div");
            card.className = "speaker-card";

            // Set search attributes
            card.dataset.name = speaker.name.toLowerCase();
            card.dataset.title = speaker.title.toLowerCase();

            card.innerHTML = `
                <img src="${speaker.headshot}" alt="${speaker.name} Headshot">
                <h3 class="textstyle">${speaker.name}</h3>
                <p style="margin-bottom: 10px;">${speaker.title}</p>
              `;

            if (speaker.link) {
              card.style.cursor = "pointer";
              card.addEventListener("click", () => {
                window.location.href = speaker.link;
              });
            }

            container.appendChild(card);
            allCards.push(card); // Save for searching
          });
        }
      });

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        let visibleCount = 0;

        allCards.forEach((card) => {
          const name = card.dataset.name;
          const title = card.dataset.title;
          const match = name.includes(query) || title.includes(query);

          card.style.display = match ? "block" : "none";
          if (match) visibleCount++;
        });

        // Show or hide the no-results message
        const noResults = document.getElementById("no-results");
        noResults.style.display = visibleCount === 0 ? "block" : "none";
      });
    })
    .catch((error) => console.error("Error fetching speaker data:", error));
});
