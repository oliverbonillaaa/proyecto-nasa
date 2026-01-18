   // Crear partículas decorativas
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Tamaño aleatorio
                const size = Math.random() * 4 + 1;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Posición inicial aleatoria
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100 + 100}%`;
                
                // Retraso de animación aleatorio
                particle.style.animationDelay = `${Math.random() * 15}s`;
                
                // Duración de animación aleatoria
                const duration = Math.random() * 10 + 15;
                particle.style.animationDuration = `${duration}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Llamar a la función para crear partículas
        createParticles();
        
        // Toggle para mostrar/ocultar contraseña
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Cambiar icono
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
        
        // Manejo del envío del formulario
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                showMessage('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            // Validación simple de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simulación de envío
            showMessage('Iniciando sesión...', 'success');
            
            // Deshabilitar el botón de inicio de sesión
            const loginBtn = document.querySelector('.login-btn');
            const originalText = loginBtn.textContent;
            loginBtn.textContent = 'Iniciando sesión...';
            loginBtn.disabled = true;
            
            // Efecto de carga
            loginBtn.style.background = 'linear-gradient(135deg, rgba(108, 139, 235, 0.7) 0%, rgba(90, 125, 224, 0.7) 100%)';
            
            // Aquí normalmente se enviarían los datos al servidor
            setTimeout(() => {
                showMessage('Inicio de sesión exitoso. Redirigiendo...', 'success');
                
                // Restaurar el botón después de 2 segundos
                setTimeout(() => {
                    loginBtn.textContent = originalText;
                    loginBtn.disabled = false;
                    loginBtn.style.background = 'linear-gradient(135deg, rgba(108, 139, 235, 0.9) 0%, rgba(90, 125, 224, 0.9) 100%)';
                    
                    // Limpiar formulario después del "envío"
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('remember').checked = false;
                }, 2000);
            }, 1500);
        });
        
        // Función para mostrar mensajes
        function showMessage(message, type) {
            // Eliminar mensaje anterior si existe
            const existingMessage = document.querySelector('.message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Crear nuevo mensaje
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.textContent = message;
            
            document.body.appendChild(messageDiv);
            
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        if (messageDiv.parentNode) {
                            messageDiv.remove();
                        }
                    }, 300);
                }
            }, 3000);
        }
        
        // Simular clic en el botón de Google
        const googleBtn = document.getElementById('googleSignIn');
        googleBtn.addEventListener('click', function() {
            showMessage('Redirigiendo a Google para iniciar sesión...', 'success');
            
            // Efecto de deshabilitar el botón temporalmente
            const originalText = this.textContent;
            this.textContent = 'Redirigiendo...';
            this.disabled = true;
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        });
        
        // Selector de idioma
        const languageSelect = document.getElementById('languageSelect');
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            
            // Aquí normalmente cambiarías el idioma de la página
            // Para este ejemplo, solo mostraremos un mensaje
            const languageNames = {
                'es': 'Español',
                'en': 'Inglés',
                'fr': 'Francés',
                'de': 'Alemán',
                'pt': 'Portugués'
            };
            
            showMessage(`Idioma cambiado a ${languageNames[selectedLanguage]}`, 'success');
        });
        
        // Efecto de enfoque en los campos del formulario
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            // Efecto al enfocar
            input.addEventListener('focus', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            });
            
            // Efecto al perder el foco
            input.addEventListener('blur', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            });
        });
        
        // Añadir efecto de carga inicial
        window.addEventListener('load', function() {
            document.querySelector('.login-card').style.animationPlayState = 'running';
        });