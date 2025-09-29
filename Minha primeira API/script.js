const API_URL = "http://localhost:3005/usuarios";

// Seleção de elementos do HTML
const userCardsContainer = document.getElementById('user-cards-container');
const addUserForm = document.getElementById('addUserForm');
const btnListUsers = document.getElementById('btnListUsers');

// Seleção de elementos do MODAL
const editModal = document.getElementById('editModal');
const editUserForm = document.getElementById('editUserForm');
const btnCancelEdit = document.getElementById('btnCancelEdit');
const editIdInput = document.getElementById('editId');
const editPedidoInput = document.getElementById('editName');
const editPrecoInput = document.getElementById('editAge');
const editImageInput = document.getElementById('editImage');

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
            <div class="card-buttons">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            </div>
        `;

        const editBtn = userCard.querySelector('.btn-edit');
        const deleteBtn = userCard.querySelector('.btn-delete');

        editBtn.addEventListener('click', () => {
            editIdInput.value = user.id;
            editPedidoInput.value = user.pedido;
            editPrecoInput.value = user.preco;
            editImageInput.value = user.image || '';
            editModal.style.display = 'flex';
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja excluir o usuário ${user.id}?`)) {
                deleteUser(user.id);
            }
        });

        userCardsContainer.appendChild(userCard);
    });
}

// EVENTOS

// Botão "Listar Usuários"
btnListUsers.addEventListener('click', fetchAndRenderUsers);

// Submissão do formulário de adicionar usuário
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const novoPedido = document.getElementById('addName').value;
    const novoPreco = parseFloat(document.getElementById('addAge').value);
    const novaImagem = document.getElementById('addImage').value;

    addUser({ pedido: novoPedido, preco: novoPreco, image: novaImagem });
});

// Submissão do formulário de edição
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = editIdInput.value;
    const novoPedido = editPedidoInput.value;
    const novoPreco = parseFloat(editPrecoInput.value);
    const novaImagem = editImageInput.value;

    editUser(userId, { pedido: novoPedido, preco: novoPreco, image: novaImagem });
});

// Cancelar edição
btnCancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
});

// Carregar usuários ao iniciar
fetchAndRenderUsers();




