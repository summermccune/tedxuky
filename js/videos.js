document.addEventListener("DOMContentLoaded", () => {
  fetch("Data/speakers.json")
    .then((res) => res.json())
    .then((data) => {
      const videoGrid = document.getElementById("video-grid");
      const years = ["2024", "2025"];

      years.forEach((year) => {
        if (data[year]) {
          data[year].forEach((speaker) => {
            if (speaker.videoId) {
              const videoCard = document.createElement("div");
              videoCard.className = "video-card";
              videoCard.innerHTML = `
                  <iframe 
                    width="100%" 
                    height="215" 
                    src="https://www.youtube.com/embed/${speaker.videoId}?start=${speaker.start}" 
                    title="${speaker.name}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                  </iframe>
                  <h3 class="textstyle">${speaker.name}</h3>
                  <p>${speaker.title}</p>
                `;
              videoGrid.appendChild(videoCard);
            }
          });
        }
      });
    })
    .catch((err) => console.error("Failed to load video data:", err));
});
