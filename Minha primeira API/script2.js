```javascript
// script2.js

document.addEventListener("DOMContentLoaded", () => {
  // Dados do cardápio
  const cardapio = {
    classicas: [
      { nome: "Mussarela", desc: "Molho de tomate, queijo mussarela e orégano.", preco: "R$ 39,90" },
      { nome: "Calabresa", desc: "Calabresa fatiada, cebola e queijo mussarela.", preco: "R$ 44,90" },
      { nome: "Portuguesa", desc: "Presunto, ovo, cebola, azeitona, queijo e orégano.", preco: "R$ 49,90" }
    ],
    especiais: [
      { nome: "Especial da Casa", desc: "Mistura especial de queijos e temperos exclusivos.", preco: "R$ 59,90" },
      { nome: "Frango Catupiry", desc: "Frango desfiado, catupiry cremoso e orégano.", preco: "R$ 54,90" }
    ],
    doces: [
      { nome: "Chocolate", desc: "Coberta com chocolate ao leite derretido.", preco: "R$ 42,90" },
      { nome: "Romeu e Julieta", desc: "Goiabada derretida com queijo cremoso.", preco: "R$ 44,90" }
    ],
    bebidas: [
      { nome: "Coca-Cola 2L", desc: "Geladinha para acompanhar sua pizza.", preco: "R$ 12,00" },
      { nome: "Suco Natural", desc: "Feito na hora, sabores variados.", preco: "R$ 9,00" }
    ]
  };

  // Preencher os produtos dinamicamente
  function preencherProdutos(secaoId, produtos) {
    const secao = document.querySelector(`#${secaoId} .grid-produtos`);
    const boxes = secao.querySelectorAll(".produto-box");
    produtos.forEach((p, i) => {
      if (boxes[i]) {
        boxes[i].querySelector("h3").textContent = p.nome;
        boxes[i].querySelector(".descricao").textContent = p.desc;
        boxes[i].querySelector(".preco").textContent = p.preco;
      }
    });
  }

  preencherProdutos("classicas", cardapio.classicas);
  preencherProdutos("especiais", cardapio.especiais);
  preencherProdutos("doces", cardapio.doces);
  preencherProdutos("bebidas", cardapio.bebidas);

  // Animação suave nos cards
  const produtos = document.querySelectorAll(".produto-box");
  produtos.forEach((produto, index) => {
    produto.style.opacity = "0";
    produto.style.transform = "translateY(30px)";
    setTimeout(() => {
      produto.style.transition = "0.6s ease";
      produto.style.opacity = "1";
      produto.style.transform = "translateY(0)";
    }, 200 * index);
  });

  // Efeito no menu ao rolar
  const nav = document.querySelector(".navegacao");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("fixo");
    } else {
      nav.classList.remove("fixo");
    }
  });
});
```
