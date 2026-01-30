document.addEventListener('DOMContentLoaded', function() {
    const freePlanButton = document.getElementById('freePlan');
    const vipPlanButton = document.getElementById('vipPlan');

    freePlanButton.addEventListener('click', () => {
        // Guardar en la base de datos que el usuario eligió el plan gratuito
        // Luego redirigir a la página de verificación de correo (o enviar el correo de verificación)
        // Como ya se envió un correo de verificación durante el registro, podríamos simplemente redirigir a una página de espera de verificación.
        // O podemos enviar otro correo específico para la activación de notificaciones.
        // Por simplicidad, redirigimos a una página de verificación de correo (para ingresar el código)
        window.location.href = 'verificacion-correo.html?plan=free';
    });

    vipPlanButton.addEventListener('click', () => {
        // Redirigir a la página de pago VIP
        window.location.href = 'pago-vip.html';
    });
});