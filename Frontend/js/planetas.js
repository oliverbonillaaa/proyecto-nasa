const planets = [
  { name: "Mercurio", img: "img/mercurio.png" },
  { name: "Venus", img: "img/venus.png" },
  { name: "Tierra", img: "img/tierra.png" },
  { name: "Marte", img: "img/marte.png" },
  { name: "Júpiter", img: "img/jupiter.png" },
  { name: "Saturno", img: "img/saturno.png" },
  { name: "Urano", img: "img/urano.png" },
  { name: "Neptuno", img: "img/neptuno.png" }
];

let index = 0;

function showPlanet() {
  document.getElementById("planet-name").textContent = planets[index].name;
  document.getElementById("planet-img").src = planets[index].img;
}

function next() {
  index = (index + 1) % planets.length;
  showPlanet();
}

function prev() {
  index = (index - 1 + planets.length) % planets.length;
  showPlanet();
}