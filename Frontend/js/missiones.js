const cards = document.querySelectorAll('.mission-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

cards.forEach(card => observer.observe(card));

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".info-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.title;
    modalText.textContent = btn.dataset.text;
    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

let progress = 0;
const bar = document.getElementById("progressBar");
const percent = document.getElementById("progressPercent");
const status = document.getElementById("missionStatus");

const missionInterval = setInterval(() => {
  if (progress >= 100) {
    status.textContent = "✅ Misión completada";
    clearInterval(missionInterval);
  } else {
    progress += 1;
    bar.style.width = progress + "%";
    percent.textContent = progress + "%";
  }
}, 60);

const panel = document.getElementById("secretPanel");

window.addEventListener("scroll", () => {
  const position = panel.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight - 100) {
    panel.classList.add("show");
  }
});

function openMission(title, desc) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDesc").textContent = desc;
  document.getElementById("missionModal").style.display = "flex";
}

function closeMission() {
  document.getElementById("missionModal").style.display = "none";
}
const progressBox = document.querySelector(".mission-progress");

progressBox.addEventListener("click", () => {
  let p = 0;
  bar.style.width = "0%";
  percent.textContent = "0%";
  status.textContent = "🛰️ Iniciando nueva misión...";

  const newMission = setInterval(() => {
    if (p >= 100) {
      status.textContent = "✅ Misión finalizada con éxito";
      clearInterval(newMission);
    } else {
      p++;
      bar.style.width = p + "%";
      percent.textContent = p + "%";
    }
  }, 40);
});

function checkSecret() {
  const input = document.getElementById("secretCode").value;
  const text = document.getElementById("secretText");

  if (input === "NASA2026") {
    text.innerHTML = "🚀 <b>Proyecto Orion-X</b><br>Exploración interestelar con IA autónoma y energía cuántica.";
  } else {
    text.textContent = "❌ Clave incorrecta. Acceso denegado.";
  }
}
// 🔐 ACCESO A INFORMACIÓN CLASIFICADA
function checkSecret() {
  const input = document.getElementById("secretCode").value;
  const text = document.getElementById("secretText");
  const extra = document.getElementById("classifiedExtra");

  if (input === "NASA2026") {
    text.innerHTML =
      "🚀 <b>Proyecto Orion-X</b><br>Acceso autorizado al nivel clasificado.";
    
    extra.style.display = "block";
    localStorage.setItem("classifiedAccess", "true");
  } else {
    text.textContent = "❌ Clave incorrecta. Acceso denegado.";
  }
}
if (localStorage.getItem("classifiedAccess") === "true") {
  const extra = document.getElementById("classifiedExtra");
  const text = document.getElementById("secretText");

  if (extra && text) {
    text.innerHTML =
      "🚀 <b>Proyecto Orion-X</b><br>Acceso autorizado al nivel clasificado.";
    extra.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("accessBtn");

  if (btn) {
    btn.addEventListener("click", checkSecret);
  }
});

setInterval(() => {
  const data = Math.floor(Math.random() * 1000);
  document.getElementById("liveData").innerText =
    "📡 Señales activas: " + data;
}, 2000);

