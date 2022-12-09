// Modal Document Event Listeners
const aboutButton = document.getElementById("about-button");
const aboutModal = document.getElementById("about-modal");
const closeAbout = document.getElementById("close-about");

aboutButton.addEventListener("click", () => {
  aboutModal.showModal();
});
closeAbout.addEventListener("click", () => {
  aboutModal.close();
});

// Adding divs
const canvas = document.getElementById("canvas");
for (let i = 1; i <= 64 * 64; i++) {
  const square = document.createElement("div");
  square.className = "square";
  canvas.appendChild(square);
}
