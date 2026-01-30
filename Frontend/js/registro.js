document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Registrar usuario en Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: 'http://tusitio.com/template/exito.html' // Puedes cambiar esta URL
            }
        });

        if (error) {
            alert('Error al registrarse: ' + error.message);
        } else {
            // Guardar el email en localStorage para usarlo en la siguiente página
            localStorage.setItem('userEmail', email);
            // Redirigir a la página de selección de notificación
            window.location.href = 'seleccionar-notificacion.html';
        }
    });
});