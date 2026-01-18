/* ================= MENU LATERAL ================= */
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});


/* ================= ANIMACIÓN DE TARJETAS ================= */
document.querySelectorAll('.news-card').forEach((card, i) => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';

  setTimeout(() => {
    card.style.transition = 'all 0.6s ease';
    card.style.opacity = 1;
    card.style.transform = 'translateY(0)';
  }, i * 120);
});


/* ================= ANIMACIÓN DEL FOOTER ================= */
const footer = document.querySelector('.nasa-footer');

if (footer) {
  footer.style.opacity = 0;
  footer.style.transform = 'translateY(40px)';
  footer.style.transition = 'all 0.8s ease';

  const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.style.opacity = 1;
        footer.style.transform = 'translateY(0)';
        footerObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });

  footerObserver.observe(footer);
}
document.querySelectorAll('.mission-card').forEach((card, i) => {
  setTimeout(() => {
    card.classList.add('show');
  }, i * 120);
});
