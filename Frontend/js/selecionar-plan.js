function selectPlan(planType) {
    if (planType === 'free') {
        alert('¡Has seleccionado el plan Explorador Gratuito! Serás redirigido al registro.');
        // Aquí puedes redirigir a la página de registro gratuita
        // window.location.href = 'registro-free.html';
    } else if (planType === 'vip') {
        alert('¡Has seleccionado el plan Comandante VIP! Serás redirigido al proceso de pago.');
        // Aquí puedes redirigir a la página de pago
        // window.location.href = 'pago-vip.html';
    }
}

// Efecto de scroll suave para la tabla de comparación
document.addEventListener('DOMContentLoaded', function() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Efecto de confeti al seleccionar plan VIP
    const vipButton = document.querySelector('.vip-btn');
    vipButton.addEventListener('click', function() {
        createConfetti();
    });
});

// Función simple de confeti (efecto visual)
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ffc400', '#ff3d00', '#4fc3f7', '#00e676', '#2979ff'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: 50%;
            z-index: 9999;
            animation: fall ${Math.random() * 2 + 1}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        // Remover después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Añadir animación de confeti al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);