// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Contadores
const counters = document.querySelectorAll('[data-count]');
counters.forEach(counter => {
  let start = 0;
  const end = counter.dataset.count;
  const interval = setInterval(() => {
    start++;
    counter.textContent = start;
    if(start == end) clearInterval(interval);
  }, 10);
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  };
});

// Accordion
document.querySelectorAll('.accordion-item').forEach(item => {
  item.onclick = () => {
    const p = item.querySelector('p');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
  };
});

// Modal
const modal = document.getElementById('modal');
document.getElementById('openModal').onclick = () => modal.style.display = 'block';
document.getElementById('closeModal').onclick = () => modal.style.display = 'none';


document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modalPlanes');
  const btnInscribete = document.querySelector('.btn-inscribete'); // Asegúrate de que el botón tenga esta clase
  const spanClose = document.querySelector('.close');

  // Al hacer clic en Inscríbete, mostrar el modal
  btnInscribete.onclick = function() {
    modal.style.display = 'block';
  }

  // Al hacer clic en la X, cerrar el modal
  spanClose.onclick = function() {
    modal.style.display = 'none';
  }

  // Si el usuario hace clic fuera del contenido del modal, cerrarlo
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});