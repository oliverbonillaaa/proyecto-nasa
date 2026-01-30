document.addEventListener('DOMContentLoaded', function() {
    const pagoForm = document.getElementById('pagoForm');

    pagoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Aquí normalmente integrarías con una pasarela de pago como Stripe.
        // Para este ejemplo, simularemos un pago exitoso.

        // Simulamos una espera de 2 segundos para el pago
        setTimeout(() => {
            alert('Pago realizado con éxito.');
            // Redirigir a la página de verificación de correo para VIP
            window.location.href = 'verificacion-correo.html?plan=vip';
        }, 2000);
    });
});