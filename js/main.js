// Dados simulados para o aplicativo
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Simulação de entregadores
const couriers = [
    { id: 1, name: 'João Silva', email: 'joao@entregaexpress.com', phone: '(11) 97777-7777', rating: 4.8, status: 'online', vehicle: 'Moto', location: { lat: -23.5505, lng: -46.6333 } },
    { id: 2, name: 'Maria Santos', email: 'maria@entregaexpress.com', phone: '(11) 96666-6666', rating: 4.9, status: 'online', vehicle: 'Carro', location: { lat: -23.5605, lng: -46.6433 } },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@entregaexpress.com', phone: '(11) 95555-5555', rating: 4.7, status: 'offline', vehicle: 'Bicicleta', location: { lat: -23.5705, lng: -46.6533 } }
];

// Simulação de clientes
const clients = [
    { id: 1, name: 'Cliente Teste', email: 'cliente@entregaexpress.com', phone: '(11) 99999-9999', address: 'Av. Paulista, 1000, São Paulo, SP' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', phone: '(11) 98888-8888', address: 'Rua Augusta, 500, São Paulo, SP' },
    { id: 3, name: 'João Santos', email: 'joao@exemplo.com', phone: '(11) 97777-7777', address: 'Av. Rebouças, 500, São Paulo, SP' }
];

// Simulação de entregas
const deliveries = [
    { 
        id: 1, 
        client_id: 1, 
        courier_id: 1, 
        origin: 'Av. Paulista, 1000, São Paulo, SP', 
        destination: 'Rua Augusta, 500, São Paulo, SP', 
        status: 'entregue', 
        created_at: '2025-05-20 15:30:00', 
        delivered_at: '2025-05-20 16:15:00',
        item: 'Documentos (0.5 kg)',
        payment: 'R$ 25,00 (Cartão)',
        rating: 5
    },
    { 
        id: 2, 
        client_id: 1, 
        courier_id: 2, 
        origin: 'Av. Brigadeiro Faria Lima, 3000, São Paulo, SP', 
        destination: 'Rua Oscar Freire, 700, São Paulo, SP', 
        status: 'em_entrega', 
        created_at: '2025-05-21 10:20:00', 
        delivered_at: null,
        item: 'Documentos (0.5 kg)',
        payment: 'R$ 18,50 (Dinheiro)',
        rating: null
    },
    { 
        id: 3, 
        client_id: 1, 
        courier_id: null, 
        origin: 'Av. Rebouças, 1500, São Paulo, SP', 
        destination: 'Rua da Consolação, 2000, São Paulo, SP', 
        status: 'aguardando', 
        created_at: '2025-05-21 13:15:00', 
        delivered_at: null,
        item: 'Encomenda média (3.0 kg)',
        payment: 'R$ 22,00 (Cartão)',
        rating: null
    }
];

// Funções simuladas para API
function updateCourierAvailability(courierId, isAvailable) {
    const courier = couriers.find(c => c.id === courierId);
    if (courier) {
        courier.status = isAvailable ? 'online' : 'offline';
        return true;
    }
    return false;
}

function getNearbyDeliveries(courierId) {
    return deliveries.filter(d => d.status === 'aguardando');
}

function acceptDelivery(courierId, deliveryId) {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery && delivery.status === 'aguardando') {
        delivery.courier_id = courierId;
        delivery.status = 'aceita';
        return true;
    }
    return false;
}

function updateDeliveryStatus(deliveryId, status) {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery) {
        delivery.status = status;
        if (status === 'entregue') {
            delivery.delivered_at = new Date().toISOString().replace('T', ' ').substring(0, 19);
        }
        return true;
    }
    return false;
}

function rateDelivery(deliveryId, rating) {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery && delivery.status === 'entregue') {
        delivery.rating = rating;
        return true;
    }
    return false;
}

// Inicialização de eventos para elementos comuns
document.addEventListener('DOMContentLoaded', function() {
    // Botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});
