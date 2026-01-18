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

