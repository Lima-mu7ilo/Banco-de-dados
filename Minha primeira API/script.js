const API_URL = "http://localhost:3005/usuarios";

// Seleção de elementos do HTML
const userCardsContainer = document.getElementById('user-cards-container');
// Apenas cards para pagina.index.html

// Função para buscar e renderizar usuários
function fetchAndRenderUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => renderUsers(users))
        .catch(error => {
            console.error("Erro ao buscar usuários:", error);
            userCardsContainer.innerHTML = `<p>Erro ao carregar usuários</p>`;
        });
}

// Função para adicionar usuário
function addUser(userData) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(() => {
        addUserForm.reset();
        fetchAndRenderUsers();
    })
    .catch(error => console.error("Erro ao adicionar usuário:", error));
}

// Função para editar usuário
function editUser(userId, userData) {
    fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(() => {
        editModal.style.display = 'none';
        fetchAndRenderUsers();
    })
    .catch(error => console.error("Erro ao editar usuário:", error));
}

// Função para deletar usuário
function deleteUser(userId) {
    fetch(`${API_URL}/${userId}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchAndRenderUsers();
    })
    .catch(error => console.error("Erro ao excluir usuário:", error));
}

// Função para renderizar usuários
function renderUsers(users) {
    userCardsContainer.innerHTML = "";

    if (users.length === 0) {
        userCardsContainer.innerHTML = `<p>Nenhum usuário cadastrado</p>`;
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-info">
                <img src="${user.image || ''}" alt="Imagem do Produto" class="produto-img" style="width:100%;max-width:200px;border-radius:8px;margin-bottom:10px;object-fit:cover;">
                <p><strong>Numero do pedido:</strong> ${user.id}</p>
                <p><strong>Pedido:</strong> ${user.pedido}</p>
                <p><strong>Preço:</strong> R$ ${user.preco}</p>
            </div>
        `;
        userCardsContainer.appendChild(userCard);
    });
}

// Carregar cards ao iniciar
fetchAndRenderUsers();




