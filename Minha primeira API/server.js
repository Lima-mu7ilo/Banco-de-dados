//Importação do Express
const express = require('express'); 
const cors = require(`cors`)

//Cirar a Aplicação
const app = express();

//Permitir trabalhar com JSON
app.use(express.json());
app.use(cors())

//Porta onde a API vai rodar
const PORT = 3001;

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})

let usuarios = [
    {id: 1, nome: "Kauan", idade: 25},
    {id: 2, nome: "Vitor", idade: 10},
    {id: 3, nome: "Davi", idade: 22},
    {id: 4, nome: "Yasmin", idade: 99},
    {id: 5, nome: "João Vitor", idade: 21}
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

app.get('/usuarios/nome/:nome', (req, res) => {
    const buscarNome = req.params.nome.toLowerCase()
    const resultados = usuarios.filter(u => u.nome.toLowerCase().includes(buscarNome))
    if(resultados.length > 0){
        res.json(resultados)
    }else{
        res.status(404).json({mensagem: "Usuario Não Encontrado"})
    }
})

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id
    usuarios = usuarios.filter(u => u.id != id);

    res.json({message: "usuario removido com sucesso"})
});


app.post('/usuarios', (req, res) => {           
    const ultimoID = usuarios.reduce((max, usuarios) => Math.max(max, usuarios.id), 0)

    const novoUsuario = {
        "id": ultimoID + 1,
        "nome": req.body.nome,
        "idade": req.body.idade
    };

    usuarios.push(novoUsuario)
    res.status(201).json(novoUsuario);
})

app.put('/usuarios/:id', (req, res) =>{
    const id = req.params.id
    const nome = req.params.nome
    const idade = req.body.idade

    const usuario = usuarios.find(u => u.id == id)

    if(!usuario){
        return res.status(404).json({mensagem: "Usuario Não Encontrado"})
    }

    usuario.nome = nome || usuario.nome
    usuario.idade = idade || usuario.idade
    res.json(usuario)

})


app.get('/usuarios/idade/:idade', (req, res) => {
    
    const idade = req.params.idade
    resultado = usuarios.filter(u => u.idade == idade);
    
    if (resultado.length > 0){
        res.json(resultado)
    }else{
        res.status(404).json({mensagem: "Usuario Não Encontrado"})
    }
})