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
    {image: "https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2007/12/Pizza_quatro_queijossss.jpg", id: 1, pedido: "pizza de quatro queijos", preco: 25.30},
    {image: "https://www.confeiteiradesucesso.com/wp-content/uploads/2023/12/pizzafrangocomqueijo.jpg", id: 2, pedido: "pizza de frango", preco: 40.00},
    {image: "https://swiftbr.vteximg.com.br/arquivos/ids/208740-636-636/618283-pizza-artesanal-calabresa_inn.jpg?v=638870725352100000", id: 3, pedido: "pizza de calabresa", preco: 25.50},
    {image: "https://receitason.com/wp-content/uploads/2023/04/pizza-de-atum-caseira.jpg", id: 4, pedido: "pizza de atum", preco: 35.99},
    {image: "https://www.ogastronomo.com.br/upload/389528334-curiosidades-sobre-a-pizza-portuguesa.jpg", id: 5, pedido: "pizza portuguesa", preco: 21.75}
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
        preco: req.body.preco,
        image: req.body.image
    };

    usuarios.push(novoPedido)
    res.status(201).json(novoPedido);
})

app.put('/usuarios/:id', (req, res) =>{
    const id = req.params.id
    const pedido = req.body.pedido
    const preco = req.body.preco
    const image = req.body.image

    const usuario = usuarios.find(u => u.id == id)

    if(!usuario){
        return res.status(404).json({mensagem: "Pedido Não Encontrado"})
    }

    usuario.pedido = pedido || usuario.pedido
    usuario.preco = preco || usuario.preco
    usuario.image = image || usuario.image
    res.json(usuario)
})


// ...existing code...