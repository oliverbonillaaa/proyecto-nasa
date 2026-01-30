document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strengthText');

    // Validación de fortaleza de contraseña
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        const width = strength * 25;
        strengthBar.style.width = width + '%';
        
        const colors = ['#ff3d00', '#ff9100', '#ffc400', '#00e676'];
        const texts = ['Muy débil', 'Débil', 'Fuerte', 'Muy fuerte'];
        
        strengthBar.style.backgroundColor = colors[strength - 1] || '#ff3d00';
        strengthText.textContent = texts[strength - 1] || 'Muy débil';
        strengthText.style.color = colors[strength - 1] || '#ff3d00';
    });

    // Validación de confirmación de contraseña
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.style.borderColor = '#ff3d00';
        } else {
            confirmPasswordInput.style.borderColor = '#00e676';
        }
    });

    // Manejo del envío del formulario
    registroForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validaciones
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }
        
        if (password.length < 8) {
            showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }
        
        try {
            // Registrar usuario en Supabase
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        subscription_type: 'pending',
                        email_verified: false
                    }
                }
            });
            
            if (authError) throw authError;
            
            // Guardar en tabla de usuarios
            const { data: userData, error: userError } = await supabase
                .from('usuarios')
                .insert([
                    {
                        id: authData.user.id,
                        email: email,
                        subscription_plan: 'pending',
                        created_at: new Date().toISOString(),
                        email_verified: false
                    }
                ]);
            
            if (userError) throw userError;
            
            showNotification('Registro exitoso! Redirigiendo...', 'success');
            
            // Redirigir a selección de plan después de 2 segundos
            setTimeout(() => {
                window.location.href = 'seleccionar-plan.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error en registro:', error);
            showNotification(error.message || 'Error en el registro', 'error');
        }
    });
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Estilos para notificaciones
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 1000;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #00c853, #64dd17);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ff3d00, #ff9100);
    }
    
    .notification i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);