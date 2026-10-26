/* ==========================================================
   Saveroom — comportamento da página inicial

   Os jogos abaixo são dados de exemplo, só para o protótipo
   da tela. Na versão final, substitua a constante JOGOS por
   uma chamada ao back-end em C#, que por sua vez consulta a
   API RAWG (https://api.rawg.io/api/games?key=SUA_CHAVE).
   O formato esperado de cada item está em carregarJogos().
   ========================================================== */

const JOGOS = [
  { id: 1,  nome: "Hollow Knight",            ano: 2017, genero: "Metroidvania",  plataforma: "PC, Switch",     nota: 9.0, matiz: 190, status: "jogado"  },
  { id: 2,  nome: "Elden Ring",               ano: 2022, genero: "RPG de ação",   plataforma: "PC, PS5, Xbox",  nota: 9.5, matiz: 42,  status: "jogando" },
  { id: 3,  nome: "Stardew Valley",           ano: 2016, genero: "Simulação",     plataforma: "PC, Switch",     nota: 9.2, matiz: 100, status: "jogado"  },
  { id: 4,  nome: "Disco Elysium",            ano: 2019, genero: "RPG",           plataforma: "PC, PS5",        nota: 9.7, matiz: 330, status: null      },
  { id: 5,  nome: "Celeste",                  ano: 2018, genero: "Plataforma",    plataforma: "PC, Switch",     nota: 9.1, matiz: 275, status: null      },
  { id: 6,  nome: "Cyberpunk 2077",           ano: 2020, genero: "RPG de ação",   plataforma: "PC, PS5, Xbox",  nota: 7.5, matiz: 55,  status: "quero"   },
  { id: 7,  nome: "Hades",                    ano: 2020, genero: "Roguelike",     plataforma: "PC, Switch",     nota: 9.3, matiz: 15,  status: null      },
  { id: 8,  nome: "Red Dead Redemption 2",    ano: 2018, genero: "Mundo aberto",  plataforma: "PC, PS4, Xbox",  nota: 9.6, matiz: 25,  status: "quero"   },
  { id: 9,  nome: "Outer Wilds",              ano: 2019, genero: "Aventura",      plataforma: "PC, PS5",        nota: 9.4, matiz: 215, status: null      },
  { id: 10, nome: "Resident Evil 4",          ano: 2023, genero: "Survival",      plataforma: "PC, PS5, Xbox",  nota: 9.3, matiz: 145, status: "jogando" },
  { id: 11, nome: "The Witcher 3",            ano: 2015, genero: "RPG",           plataforma: "PC, PS4, Xbox",  nota: 9.5, matiz: 205, status: null      },
  { id: 12, nome: "Balatro",                  ano: 2024, genero: "Cartas",        plataforma: "PC, Switch",     nota: 9.0, matiz: 355, status: "quero"   }
];

const ROTULOS = {
  jogando: "Jogando",
  jogado:  "Jogado",
  quero:   "Quero jogar"
};

const grade      = document.getElementById("grade");
const vazio      = document.getElementById("vazio");
const campoBusca = document.getElementById("campoBusca");
const abas       = document.querySelectorAll(".aba");
const menuBotao  = document.getElementById("menuBotao");
const navegacao  = document.getElementById("navegacao");

let statusAtivo = "todos";
let termoBusca  = "";

/* ---------- Renderização ---------- */

function capaDe(jogo) {
  const h = jogo.matiz;
  return `linear-gradient(150deg,
            hsl(${h}, 30%, 26%) 0%,
            hsl(${h}, 24%, 17%) 60%,
            hsl(${h}, 20%, 12%) 100%)`;
}

function montarCartao(jogo) {
  const artigo = document.createElement("article");
  artigo.className = "cartao";

  const naColecao = jogo.status !== null;
  const selo = naColecao
    ? `<span class="selo">${ROTULOS[jogo.status]}</span>`
    : "";

  artigo.innerHTML = `
    <div class="capa" style="background: ${capaDe(jogo)}">
      <span>${jogo.nome}</span>
    </div>
    <div class="cartao-corpo">
      <p class="cartao-meta">${jogo.genero} · ${jogo.ano}</p>
      <p class="cartao-meta">${jogo.plataforma}</p>
      <p class="cartao-nota">Nota da comunidade ${jogo.nota.toFixed(1).replace(".", ",")}</p>
      ${selo}
      <button class="cartao-acao"
              data-id="${jogo.id}"
              data-na-colecao="${naColecao ? "sim" : "nao"}">
        ${naColecao ? "Remover da coleção" : "Adicionar à coleção"}
      </button>
    </div>
  `;

  return artigo;
}

function jogosFiltrados() {
  const termo = termoBusca.trim().toLowerCase();

  return JOGOS.filter(jogo => {
    const combinaStatus = statusAtivo === "todos" || jogo.status === statusAtivo;
    const combinaTermo  = jogo.nome.toLowerCase().includes(termo);
    return combinaStatus && combinaTermo;
  });
}

function desenharGrade() {
  const lista = jogosFiltrados();

  grade.innerHTML = "";
  lista.forEach(jogo => grade.appendChild(montarCartao(jogo)));

  vazio.hidden = lista.length > 0;
  atualizarContadores();
}

/* ---------- Contadores do slot ---------- */

function atualizarContadores() {
  const total   = JOGOS.filter(j => j.status !== null).length;
  const jogando = JOGOS.filter(j => j.status === "jogando").length;
  const quero   = JOGOS.filter(j => j.status === "quero").length;

  document.getElementById("contaColecao").textContent = total;
  document.getElementById("contaJogando").textContent = jogando;
  document.getElementById("contaQuero").textContent   = quero;
}

/* ---------- Eventos ---------- */

grade.addEventListener("click", evento => {
  const botao = evento.target.closest(".cartao-acao");
  if (!botao) return;

  const jogo = JOGOS.find(j => j.id === Number(botao.dataset.id));
  if (!jogo) return;

  // Sem status definido, um jogo novo entra como "Quero jogar".
  jogo.status = jogo.status === null ? "quero" : null;
  desenharGrade();
});

campoBusca.addEventListener("input", evento => {
  termoBusca = evento.target.value;
  desenharGrade();
});

abas.forEach(aba => {
  aba.addEventListener("click", () => {
    abas.forEach(outra => {
      outra.classList.remove("aba-ativa");
      outra.setAttribute("aria-selected", "false");
    });
    aba.classList.add("aba-ativa");
    aba.setAttribute("aria-selected", "true");

    statusAtivo = aba.dataset.status;
    desenharGrade();
  });
});

menuBotao.addEventListener("click", () => {
  const aberto = navegacao.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
});

/* ---------- Ponto de troca para a API RAWG ----------
   async function carregarJogos() {
     const resposta = await fetch("/api/jogos");      // endpoint do back-end C#
     const dados    = await resposta.json();
     return dados.map(item => ({
       id: item.id,
       nome: item.name,
       ano: new Date(item.released).getFullYear(),
       genero: item.genres[0]?.name ?? "Sem gênero",
       plataforma: item.platforms.map(p => p.platform.name).join(", "),
       nota: item.rating * 2,
       matiz: item.id % 360,
       status: item.statusDoUsuario ?? null
     }));
   }
--------------------------------------------------------- */

desenharGrade();
