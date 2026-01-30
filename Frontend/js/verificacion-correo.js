document.addEventListener('DOMContentLoaded', function() {
    const verificacionForm = document.getElementById('verificacionForm');
    const mensaje = document.getElementById('mensaje');

    // Simulamos un código de verificación (en un caso real, lo enviarías por correo y lo verificarías en el backend)
    const codigoSimulado = '123456'; // En la práctica, esto debe ser generado y almacenado en la base de datos.

    verificacionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const codigoIngresado = document.getElementById('codigo').value;

        if (codigoIngresado === codigoSimulado) {
            mensaje.textContent = '¡Verificación exitosa!';
            mensaje.style.color = 'green';

            // Obtener el plan de la URL
            const urlParams = new URLSearchParams(window.location.search);
            const plan = urlParams.get('plan');

            // Aquí podrías actualizar la base de datos con el plan del usuario y marcar su correo como verificado.
            // Por ejemplo, usando Supabase para actualizar el perfil del usuario.

            // Redirigir a la página de éxito después de 2 segundos
            setTimeout(() => {
                window.location.href = 'exito.html';
            }, 2000);
        } else {
            mensaje.textContent = 'Código incorrecto. Intenta de nuevo.';
            mensaje.style.color = 'red';
        }
    });
});