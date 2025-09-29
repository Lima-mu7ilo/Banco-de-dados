//Importação do Express
const express = require('express'); 
const cors = require(`cors`);

//Criar a Aplicação
const app = express();

//Permitir trabalhar com JSON
app.use(express.json());
app.use(cors())

//Porta onde a API vai rodar
const PORT = 3005;

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

let usuarios = [
    {id: 1, pedido: "feijoada", preco: 25.30},
    {id: 2, pedido: "hamburguer", preco: 10.00},
    {id: 3, pedido: "pizza", preco: 22.50},
    {id: 4, pedido: "sushi", preco: 99.99},
    {id: 5, pedido: "salada", preco: 21.75}
]
 
app.get('/', (req, res) => {
    res.send("TESTE"); 
})


app.get("/usuarios",(req , res) =>{
    res.json(usuarios)
})
app.get('/usuarios/:id', (req, res) =>{
    const id = req.params.id
    const usuario = usuarios.find(u => u.id == id)
    
    if(usuario) {
        res.json(usuario)
    }
    else{
        res.status(404).json({mensagem: "Usuario Nâo Encontrado"})
    }
}); 

app.get('/usuarios/pedido/:pedido', (req, res) => {
    const buscarPedido = req.params.pedido.toLowerCase()
    const resultados = usuarios.filter(u => u.pedido.toLowerCase().includes(buscarPedido))
    if(resultados.length > 0){
        res.json(resultados)
    }else{
        res.status(404).json({mensagem: "Pedido Não Encontrado"})
    }
})

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id
    usuarios = usuarios.filter(u => u.id != id);

    res.json({message: "usuario removido com sucesso"})
});


app.post('/usuarios', (req, res) => {           
    const ultimoID = usuarios.reduce((max, usuario) => Math.max(max, usuario.id), 0)

    const novoPedido = {
        id: ultimoID + 1,
        pedido: req.body.pedido,
        preco: req.body.preco
    };

    usuarios.push(novoPedido)
    res.status(201).json(novoPedido);
})

app.put('/usuarios/:id', (req, res) =>{
    const id = req.params.id
    const pedido = req.body.pedido
    const preco = req.body.preco

    const usuario = usuarios.find(u => u.id == id)

    if(!usuario){
        return res.status(404).json({mensagem: "Pedido Não Encontrado"})
    }

    usuario.pedido = pedido || usuario.pedido
    usuario.preco = preco || usuario.preco
    res.json(usuario)
})


// ...existing code...