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


