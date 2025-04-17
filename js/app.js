document.addEventListener("DOMContentLoaded", () => {
  fetch("Data/speakers.json")
    .then((response) => response.json())
    .then((data) => {
      // Define the years you are currently working with.
      const years = ["2024", "2025"];

      years.forEach((year) => {
        const container = document.querySelector(
          `#speakers-${year} .speakers-container`
        );
        if (data[year]) {
          data[year].forEach((speaker) => {
            // Create a card element for each speaker.
            const card = document.createElement("div");
            card.className = "speaker-card";
            // Build iframe only if videoId is provided
            const videoEmbed = speaker.videoId
              ? `<a href="https://www.youtube.com/watch?v=${speaker.videoId}&t=${speaker.start}s" target="_blank" rel="noopener noreferrer">
        <img src="https://img.youtube.com/vi/${speaker.videoId}/hqdefault.jpg" 
             alt="Watch ${speaker.name}'s video on YouTube" 
             style="width:100%; height:auto; border-radius:8px;"/>
     </a>`
              : "";
            card.innerHTML = `
              <img src="${speaker.headshot}" alt="${speaker.name} Headshot">
              <h3>${speaker.name}</h3>
              <p>${speaker.bio}</p>
              ${videoEmbed}
            `;
            container.appendChild(card);
          });
        }
      });
    })
    .catch((error) => console.error("Error fetching speaker data:", error));
});
