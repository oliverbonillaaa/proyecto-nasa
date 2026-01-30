document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cardNumberInput = document.getElementById('cardNumber');
    const cardNameInput = document.getElementById('cardName');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCvvInput = document.getElementById('cardCvv');
    const paymentForm = document.getElementById('cardPaymentForm');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Formatear número de tarjeta
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
        
        // Actualizar visualización
        document.getElementById('cardNumberDisplay').textContent = value || '**** **** **** ****';
        
        // Detectar tipo de tarjeta
        detectCardType(value);
    });

    // Formatear fecha de expiración
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0,2) + '/' + value.substring(2,4);
        }
        e.target.value = value.substring(0,5);
        document.getElementById('cardExpiryDisplay').textContent = value || 'MM/AA';
    });

    // Actualizar nombre en tarjeta
    cardNameInput.addEventListener('input', function(e) {
        document.getElementById('cardNameDisplay').textContent = 
            e.target.value.toUpperCase() || 'NOMBRE EN TARJETA';
    });

    // Actualizar CVV
    cardCvvInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.substring(0,3);
        document.getElementById('cvvDisplay').textContent = 
            '*'.repeat(value.length) + '***'.substring(value.length);
    });

    // Sistema de pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todas las pestañas y contenidos
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar pestaña y contenido seleccionado
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Manejo del formulario de pago
    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validaciones
        if (!validateCardForm()) {
            return;
        }

        const paymentButton = document.querySelector('.pay-button');
        const loadingSpinner = document.getElementById('paymentLoading');
        
        // Mostrar loading
        paymentButton.disabled = true;
        loadingSpinner.style.display = 'block';
        
        try {
            // Simular procesamiento de pago (en producción usarías Stripe, PayPal, etc.)
            await simulatePayment();
            
            // Actualizar base de datos
            await updateSubscription();
            
            // Mostrar modal de éxito
            setTimeout(() => {
                document.getElementById('successModal').style.display = 'flex';
                loadingSpinner.style.display = 'none';
            }, 2000);
            
        } catch (error) {
            console.error('Error en el pago:', error);
            alert('Error en el pago: ' + error.message);
            paymentButton.disabled = false;
            loadingSpinner.style.display = 'none';
        }
    });

    // Crypto options
    document.querySelectorAll('.crypto-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.crypto-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            // Actualizar dirección según la criptomoneda seleccionada
            const coin = this.getAttribute('data-coin');
            updateCryptoAddress(coin);
        });
    });
});

function detectCardType(cardNumber) {
    const cardIcons = document.querySelectorAll('.card-icons i');
    cardIcons.forEach(icon => icon.style.opacity = '0.3');
    
    if (/^4/.test(cardNumber.replace(/\s/g, ''))) {
        document.querySelector('.fa-cc-visa').style.opacity = '1';
    } else if (/^5[1-5]/.test(cardNumber.replace(/\s/g, ''))) {
        document.querySelector('.fa-cc-mastercard').style.opacity = '1';
    } else if (/^3[47]/.test(cardNumber.replace(/\s/g, ''))) {
        document.querySelector('.fa-cc-amex').style.opacity = '1';
    }
}

function validateCardForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardName = document.getElementById('cardName').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;
    
    if (cardNumber.length !== 16) {
        alert('Por favor ingresa un número de tarjeta válido (16 dígitos)');
        return false;
    }
    
    if (!cardName.trim()) {
        alert('Por favor ingresa el nombre en la tarjeta');
        return false;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        alert('Por favor ingresa una fecha de expiración válida (MM/AA)');
        return false;
    }
    
    if (cardCvv.length !== 3) {
        alert('Por favor ingresa un CVV válido (3 dígitos)');
        return false;
    }
    
    return true;
}

async function simulatePayment() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                transactionId: 'NASA-' + Date.now(),
                amount: 10.00
            });
        }, 2000);
    });
}

async function updateSubscription() {
    try {
        // Obtener usuario actual
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        
        // Actualizar suscripción a VIP
        const { error: updateError } = await supabase
            .from('usuarios')
            .update({ 
                subscription_plan: 'vip',
                subscription_start: new Date().toISOString(),
                payment_status: 'paid',
                transaction_id: 'NASA-' + Date.now()
            })
            .eq('id', user.id);
        
        if (updateError) throw updateError;
        
        // Enviar email de verificación
        const { error: emailError } = await supabase.auth.resend({
            type: 'signup',
            email: user.email
        });
        
        if (emailError) throw emailError;
        
    } catch (error) {
        console.error('Error actualizando suscripción:', error);
        throw error;
    }
}

function processPayPal() {
    alert('Redirigiendo a PayPal... En un entorno real, esto conectaría con la API de PayPal.');
    // window.location.href = 'https://www.paypal.com/checkout';
}

function updateCryptoAddress(coin) {
    const addresses = {
        bitcoin: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
        ethereum: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88'
    };
    
    document.getElementById('cryptoAddress').textContent = addresses[coin] || addresses.bitcoin;
}

function copyCryptoAddress() {
    const address = document.getElementById('cryptoAddress').textContent;
    navigator.clipboard.writeText(address)
        .then(() => alert('Dirección copiada al portapapeles'))
        .catch(err => console.error('Error copiando:', err));
}

function redirectToVerification() {
    window.location.href = 'verificar-email.html?plan=vip';
}