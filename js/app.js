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

// Digital Sketch
const DEFAULT_SIZE = 32;
const DEFAULT_COLOR = "black";
let canvas = document.getElementById("canvas");
const clear = document.getElementById("clear");
const reset = document.getElementById("reset");
const rainbowButton = document.getElementById("rainbow");
const gridButton = document.getElementById("grid");
const value = document.getElementById("value");
const valueDisplay = document.getElementById("value-display");
const colorPicker = document.getElementById("color-choice");
let rainbowMode = false;
let gridMode = false;
let currentColor = DEFAULT_COLOR;
value.value = DEFAULT_SIZE;
valueDisplay.textContent = `${value.value}x${value.value}`;

// Event Listeners
rainbowButton.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  rainbowButton.textContent = rainbowMode ? "Chosen Color" : "Rainbow Mode";
});

gridButton.addEventListener("click", () => {
  gridMode = !gridMode;
  canvas.toggleAttribute("data-grid");
  gridButton.textContent = gridMode ? "Grid Off" : "Grid On";
});

clear.addEventListener("click", () => {
  clearDrawing("white", canvas);
});

reset.addEventListener("click", () => {
  resetApp();
  clearGrid();
  drawGrid(value.value);
});

colorPicker.addEventListener("input", () => {
  currentColor = colorPicker.value;
});

value.addEventListener("input", () => {
  valueDisplay.textContent = `${value.value}x${value.value}`;
});

value.addEventListener("mouseup", () => {
  clearGrid();
  drawGrid(value.value);
});

// Functions
function getRandomValues(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawGrid(size) {
  for (let i = 1; i <= Math.pow(size, 2); i++) {
    const square = document.createElement("div");
    square.className = "square";
    square.addEventListener("mousedown", color);
    square.addEventListener("mouseover", (e) => {
      if (e.buttons == 1) color(e);
    });
    canvas.appendChild(square);
  }
  canvas.style = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`;
}

function clearDrawing(color) {
  const squares = document.querySelectorAll(".square");
  squares.forEach((item) => {
    item.style.backgroundColor = color;
  });
}

function clearGrid() {
  let clearCanvas = document.getElementById("canvas");
  while (clearCanvas.firstElementChild) {
    clearCanvas.removeChild(clearCanvas.firstElementChild);
  }
}

function color(e) {
  if (rainbowMode) {
    rainbow(e.target);
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}

function rainbow(square) {
  let hue = getRandomValues(0, 357);
  let saturation = getRandomValues(25, 100);
  let light = getRandomValues(25, 75);
  square.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${light}%)`;
}

function resetApp() {
  value.value = DEFAULT_SIZE;
  currentColor = DEFAULT_COLOR;
  gridMode = false;
  rainbowMode = false;
  valueDisplay.textContent = `${value.value}x${value.value}`;
  rainbowButton.textContent = "Rainbow Mode";
  gridButton.textContent = "Grid On";
  colorPicker.value = "#000000";
  canvas.removeAttribute("data-grid");
}

// Start app
drawGrid(DEFAULT_SIZE);
