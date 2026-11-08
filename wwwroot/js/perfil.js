/**
 * GERENCIAR E EXIBIR PERFIL - SCRIPT PRINCIPAL
 * Este script controla o carregamento de dados do usuário, cálculo dinâmico de XP/nível, 
 * renderização de cards de jogos no backlog, abertura de modais de conquistas, animações 
 * de pop-up no estilo Steam e listagem dinâmica de insígnias conquistadas.
 */

// URL base padrão para todas as requisições da API REST do backend C#
const API_BASE_URL = "/api";
const LIMITE_DESCRICAO = 250; // Quantidade máxima de caracteres exibidos na descrição de um jogo antes de exigir o botão "Ver mais"

// ==========================================
// 1. INICIALIZAÇÃO DA PÁGINA (DOM LOADED)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Função: Verifica se a variável global do ID do usuário logado foi injetada pelo Razor na página.
    // Motivo: Permite carregar automaticamente o perfil da sessão ativa sem que o usuário precise digitar o ID manualmente.
    if (typeof USUARIO_LOGADO_ID !== 'undefined' && USUARIO_LOGADO_ID) {
        const inputId = document.getElementById("perfil-id");
        if (inputId) inputId.value = USUARIO_LOGADO_ID; // Preenche o campo de input de busca (se existir na tela)
        carregarPerfilEBacklog(USUARIO_LOGADO_ID); // Dispara a carga inicial do perfil e backlog
    }

    // Função: Configura o evento de clique no botão de busca manual de perfil por ID.
    // Motivo: Permite testar ou visualizar o perfil de qualquer ID digitado no campo de input de teste.
    const btnBuscarPerfil = document.getElementById("buscar-perfil");
    btnBuscarPerfil?.addEventListener("click", () => {
        const idPerfil = document.getElementById("perfil-id").value;
        if (!idPerfil) {
            alert("Informe um perfil"); // Validação básica caso o campo esteja vazio
            return;
        }
        carregarPerfilEBacklog(idPerfil);
    });

    // Função: Adiciona evento de redirecionamento ao clicar no botão "Gerenciar Perfil".
    // Motivo: Facilita a navegação do usuário da página principal do perfil para a tela de edição de avatares/banners.
    const btnManageProfile = document.getElementById("manage-profile");
    btnManageProfile?.addEventListener("click", () => {
        window.location.href = "/Usuario/Gerenciar"; // Rota padrão mapeada no ASP.NET Core MVC
    });
});


// ==========================================
// 2. CARREGAMENTO DE DADOS DO PERFIL E BACKLOG
// ==========================================

// Função: Realiza a requisição assíncrona GET na API para buscar os dados consolidados do perfil e seu backlog.
// Motivo: Centraliza a comunicação com o backend e distribui os dados para as funções de preenchimento visual.
async function carregarPerfilEBacklog(idPerfil) {
    try {
        const response = await fetch(`${API_BASE_URL}/Usuarios/perfil/${idPerfil}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar perfil");
        }

        const perfil = await response.json();

        // Distribui os dados recebidos para as funções de renderização da interface
        preencherPerfil(perfil);
        renderizarBacklog(perfil.backlog ?? []);

    } catch (error) {
        console.error("Erro:", error);
    }
}


// ==========================================
// 3. PREENCHIMENTO DA INTERFACE DO PERFIL (DADOS, XP E NÍVEL)
// ==========================================

// Função: Mapeia o JSON do perfil recebido da API para os elementos HTML da página principal.
// Motivo: Atualiza dinamicamente nome, bio, avatares, barra de progresso de nível, estatísticas e insígnias.
function preencherPerfil(perfil) {
    // Atualiza o nickname e ID exibidos no cabeçalho estilo Steam
    document.getElementById("username").textContent = perfil.nickname ?? "Usuário";
    document.getElementById("user-id").textContent = perfil.idPerfil ?? "";

    const tituloPerfil = document.getElementById("titulo-perfil");
    if (tituloPerfil == null) {
        tituloPerfil.textContent = perfil.titulo ?? "Velha Guarda";
    }

    // Define a imagem do avatar do usuário se houver URL válida cadastrada
    if (perfil.avatar && perfil.avatar.imagemUrl) {
        document.getElementById("avatar").src = perfil.avatar.imagemUrl;
    }

    // Define a imagem de fundo (banner) do topo do perfil
    if (perfil.banner && perfil.banner.imageUrl) {
        document.getElementById("banner-img").src = perfil.banner.imageUrl;
    }

    const backlog = perfil.backlog ?? [];

    // --- CÁLCULO DINÂMICO DE XP E NÍVEIS ---
    // Regra de Negócio:
    // - Cada jogo adicionado no backlog = 100 XP
    // - Cada jogo com status platinado/concluído/finalizado = 250 XP adicionais
    let totalJogos = backlog.length;
    let totalPlatinados = backlog.filter(jogo => {
        const status = (jogo.status || '').toLowerCase();
        return status === 'platinado' || status === 'concluido' || status === 'finalizado';
    }).length;

    let xpCalculado = (totalJogos * 100) + (totalPlatinados * 250);
    
    // Soma o XP calculado pelas regras do backlog com um bônus base de criação de conta (200 XP)
    const xpBaseConta = perfil.xpAtualBase ?? 200; 
    const xpTotalAcumulado = xpBaseConta + xpCalculado;

    // Regra de Nível: Cada nível exige exatamente 1000 XP para subir (Nível 1 + floor(XP Total / 1000))
    const nivelCalculado = Math.floor(xpTotalAcumulado / 1000) + 1;
    const xpAtualNoNivel = xpTotalAcumulado % 1000;
    const xpProximoNivel = 1000;
    const porcentagemXp = Math.min(100, Math.round((xpAtualNoNivel / xpProximoNivel) * 100));

    // Atualiza visualmente os elementos de Nível e Barra de XP na Interface
    const levelElement = document.getElementById("level");
    if (levelElement) levelElement.textContent = nivelCalculado;
    
    const levelXpText = document.querySelector(".level-xp-text");
    if (levelXpText) {
        levelXpText.textContent = `XP ${xpAtualNoNivel} / ${xpProximoNivel}`;
    }

    const levelBarFill = document.querySelector(".level-bar-fill");
    if (levelBarFill) {
        levelBarFill.style.width = `${porcentagemXp}%`;
    }

    // Preenche a biografia (Sobre mim) e links sociais do usuário
    const userBio = document.getElementById("user-bio");
    if (userBio) {
        userBio.textContent = perfil.bio ?? "Bem-vindo ao meu perfil no SAVEROOM!";
    }

    const profileLinksContainer = document.querySelector(".profile-links");
    if (profileLinksContainer) {
        const links = perfil.links ?? [];
        if (links.length > 0) {
            profileLinksContainer.innerHTML = links.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.nome}</a>
            `).join("");
        } else {
            profileLinksContainer.innerHTML = `
                <a href="#" target="_blank">Steam</a>
                <a href="#" target="_blank">Discord</a>
            `;
        }
    }

    // Atualiza dinamicamente a caixinha lateral de estatísticas da conta
    document.getElementById("stat-level").textContent = nivelCalculado;
    document.getElementById("stat-achievements").textContent = perfil.estatisticas?.totalConquistas ?? (totalPlatinados * 33 + totalJogos * 5);
    document.getElementById("stat-backlog").textContent = totalJogos;
    document.getElementById("stat-platinums").textContent = totalPlatinados;

    // Função: Dispara a busca das insígnias conquistadas pelo usuário para preencher o bloco dinâmico na Home.
    // Motivo: Substitui os crachás estáticos da interface pelos ícones reais calculados no banco de dados.
    carregarInsigniasDoPerfilNaHome(perfil.idPerfil);
}


// ==========================================
// 4. MANIPULAÇÃO DE TEXTOS E PLATAFORMAS DOS JOGOS
// ==========================================

// Função: Remove tags HTML acidentais e normaliza espaços em branco em descrições longas vindas da API RAWG.
// Motivo: Garante que o texto exibido nos cards do backlog fique limpo e sem quebras de layout.
function limparDescricao(texto) {
    return (texto || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Função: Transforma a string de plataformas separadas por vírgula em um array limpo.
// Motivo: Permite iterar e exibir as tags de plataforma individuais de forma organizada nos cards.
function obterPlataformas(jogo) {
    if (!jogo.plataformas) return [];
    return jogo.plataformas.split(",").map(p => p.trim()).filter(Boolean);
}


// ==========================================
// 5. RENDERIZAÇÃO DOS CARDS DE JOGOS (BACKLOG)
// ==========================================

// Função: Gera o código HTML dinâmico para estruturar um card individual de jogo no estilo Steam.
// Motivo: Constrói a capa, título, status, descrição truncada, botão "Ver mais", barra de progresso de conquistas e botão de modal.
function criarCardJogo(jogo, index) {
    const descricaoCompleta = limparDescricao(jogo.descricao);
    const descricaoCurta = descricaoCompleta.length > LIMITE_DESCRICAO
        ? descricaoCompleta.substring(0, LIMITE_DESCRICAO) + "..."
        : descricaoCompleta;
    
    const plataformas = obterPlataformas(jogo);
    const jogoId = jogo.idJogo ?? jogo.IdJogo ?? jogo.id ?? jogo.Id ?? jogo.idGame;
    
    const statusLower = (jogo.status || '').toLowerCase();
    const estaPlatinado = statusLower === 'platinado' || statusLower === 'concluido' || statusLower === 'finalizado';
    
    // Simulação controlada de contagem de conquistas baseada no ID do jogo para manter consistência visual
    const seed = jogoId || 1;
    const totalConquistas = (seed * 13) % 31 + 20; 
    const totalAlcancadas = estaPlatinado ? totalConquistas : ((seed * 7) % (totalConquistas + 1));
    const porcentagem = estaPlatinado ? 100 : (totalConquistas > 0 ? Math.round((totalAlcancadas / totalConquistas) * 100) : 0);

    return `
        <div class="game-card">
            <img class="game-image" src="${jogo.imagem || jogo.imagemCapa || '/img/sem-capa.jpg'}" alt="${jogo.nomeJogo}" loading="lazy">
            <div class="game-content">
                <div class="game-header">
                    <h2>${jogo.nomeJogo}</h2>
                    <span class="game-status">${jogo.status || "Backlog"}</span>
                </div>
                <p id="descricao-${index}" class="game-description" data-full="${descricaoCompleta.replace(/"/g,'&quot;')}" data-short="${descricaoCurta.replace(/"/g,'&quot;')}">
                    ${descricaoCurta}
                </p>
                ${descricaoCompleta.length > LIMITE_DESCRICAO ? `<button class="see-more" onclick="alternarDescricao(${index})">Ver mais</button>` : ""}
                <div class="activity-footer">
                    <div class="box-plataforma" title="Plataformas">
                        ${plataformas.length ? plataformas.map(p => `<span class="platform-tag">${p.substring(0,3).toUpperCase()}</span>`).join("") : '<span class="platform-tag">PC</span>'}
                    </div>
                    <div class="box-conquistas">
                        <span class="label-conquistas">Conquistas</span>
                        <span class="value-conquistas">${totalAlcancadas} / ${totalConquistas}</span>
                    </div>
                    <div class="box-progress">
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${porcentagem}%;"></div>
                        </div>
                        <span class="progress-percentage">${porcentagem}%</span>
                    </div>
                    <div class="box-trofeus">
                        <div class="trophy-badge platinum" title="Platina"></div>
                        <div class="trophy-badge gold" title="Ouro"></div>
                    </div>
                </div>
                <div class="game-actions" style="margin-top: 10px; display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn-game-page" onclick="abrirModalConquistas(${jogoId}, '${jogo.status || ''}')" style="background: rgba(102, 192, 244, 0.25); border: 1px solid #66c0f4; color: #fff; cursor: pointer; padding: 8px 16px; border-radius: 6px; font-weight: 600;">
                        Ver conquistas
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Função: Varre a lista de jogos do backlog e injeta os cards gerados no container HTML principal.
// Motivo: Exibe a lista completa de atividades e jogos do perfil na tela, limpando o estado anterior.
function renderizarBacklog(backlog) {
    const activityList = document.getElementById("activity-list");
    activityList.innerHTML = "";
    if (!backlog.length) {
        activityList.innerHTML = "<p>Nenhum jogo encontrado.</p>";
        return;
    }
    backlog.forEach((jogo, index) => {
        activityList.innerHTML += criarCardJogo(jogo, index);
    });
}

// Função: Alterna entre exibir o texto completo ou truncado da descrição de um jogo ao clicar em "Ver mais / Ver menos".
// Motivo: Melhora a legibilidade e evita que cards longos quebrem o design da página.
function alternarDescricao(index) {
    const descricao = document.getElementById(`descricao-${index}`);
    const botao = document.querySelectorAll(".see-more")[index];
    if (botao.textContent === "Ver mais") {
        descricao.textContent = descricao.dataset.full;
        botao.textContent = "Ver menos";
    } else {
        descricao.textContent = descricao.dataset.short;
        botao.textContent = "Ver mais";
    }
}


// ==========================================
// 6. MODAL DE DETALHES DE CONQUISTAS DOS JOGOS
// ==========================================

// Função: Busca na API as conquistas detalhadas de um jogo específico e abre o modal correspondente.
// Motivo: Permite visualizar quais conquistas o usuário desbloqueou e a porcentagem global de raridade.
async function abrirModalConquistas(idJogo, statusJogo = '') {
    const idPerfil = document.getElementById("perfil-id")?.value || USUARIO_LOGADO_ID;

    try {
        const response = await fetch(`${API_BASE_URL}/Backlog/jogo/${idJogo}/conquistas-detalhadas/${idPerfil}`);
        if (!response.ok) throw new Error("Erro ao carregar conquistas.");
        
        const data = await response.json();
        const statusLower = (statusJogo || '').toLowerCase();
        const estaPlatinado = statusLower === 'platinado' || statusLower === 'concluido' || statusLower === 'finalizado';

        let totalAlcancadas = data.totalAlcancadas;
        let porcentagemGeral = data.porcentagemGeral;

        let listaConquistas = data.conquistas.map(conq => ({
            ...conq,
            conquistado: estaPlatinado ? true : conq.conquistado
        }));

        if (estaPlatinado) {
            totalAlcancadas = data.totalConquistas;
            porcentagemGeral = 100;
        }

        // Preenche os dados do cabeçalho e barra de progresso do modal
        document.getElementById("modal-game-cover").src = data.capaUrl || "/img/sem-capa.jpg";
        document.getElementById("modal-game-name").textContent = data.nomeJogo.toUpperCase();
        document.getElementById("modal-progress-text").textContent = `${totalAlcancadas} DE ${data.totalConquistas} CONQUISTAS ALCANÇADAS`;
        document.getElementById("modal-progress-percent").textContent = `(${porcentagemGeral}%)`;
        document.getElementById("modal-bar-fill").style.width = `${porcentagemGeral}%`;

        // Renderiza a lista de itens de conquistas dentro do modal
        const listaContainer = document.getElementById("steam-achievements-list");
        listaContainer.innerHTML = listaConquistas.map(conq => `
            <div class="steam-achievement-item" style="opacity: ${conq.conquistado ? '1' : '0.6'};">
                <img src="${conq.iconeUrl || '/img/sem-capa.jpg'}" alt="${conq.nome}">
                <div class="steam-achievement-info">
                    <h4>${conq.nome}</h4>
                    <p>${conq.descricao}</p>
                    <p style="color: #62a3d0; font-size: 0.75rem;">Alcançada por ${conq.percentualGlobal}% dos jogadores</p>
                </div>
                <div class="steam-achievement-date">
                    ${conq.conquistado ? `Alcançada em ${conq.dataObtida || '24/10/2026'}` : 'Não alcançada'}
                </div>
            </div>
        `).join("");

        // Exibe o modal na tela alterando seu display para flex
        document.getElementById("modal-conquistas").style.display = "flex";

    } catch (error) {
        console.error(error);
        alert("Erro ao abrir conquistas do jogo.");
    }
}

// Função: Oculta o modal de conquistas da tela.
// Motivo: Permite fechar a janela flutuante ao clicar no botão "X".
function fecharModalConquistas() {
    const modal = document.getElementById("modal-conquistas");
    if (modal) {
        modal.style.display = "none";
    }
}


// ==========================================
// 7. SISTEMA DE ANIMAÇÃO DE POP-UP 
// ==========================================

// ==========================================
// 7. SISTEMA DE ANIMAÇÃO DE POP-UP 
// ==========================================

let achievementTimeout = null;

// Função: Aciona a animação de notificação no canto inferior direito da tela ao desbloquear uma insígnia/conquista.
// Motivo: Replica fielmente o feedback visual de conquistas da Steam quando o usuário atinge uma meta.
function mostrarAnimacaoConquista(titulo, descricao, iconeUrl) {
    const popup = document.getElementById("steamAchievementPopup");
    const titleEl = document.getElementById("popupTitle");
    const descEl = document.getElementById("popupDesc");
    const iconEl = document.getElementById("popupIcon");

    if (!popup || !titleEl || !descEl || !iconEl) return;

    // Cancela o temporizador anterior caso já exista um pop-up visível para evitar conflito de tempo
    if (achievementTimeout) clearTimeout(achievementTimeout);

    // Injeta os dados da insígnia no elemento do pop-up
    titleEl.textContent = titulo;
    descEl.textContent = descricao;

    // Trata o link do ícone: se começar com http (CDN externo), usa direto; senão, formata como caminho interno ou fallback
    if (iconeUrl) {
        iconEl.src = iconeUrl.startsWith("http") ? iconeUrl : "/" + iconeUrl.replace(/^\/+/, "");
    } else {
        iconEl.src = "/img/insignias/default.png";
    }

    // Adiciona a classe 'show' para disparar a animação CSS de subida na tela
    popup.classList.add("show");

    // Remove a classe 'show' após 4 segundos para esconder o pop-up automaticamente
    achievementTimeout = setTimeout(() => {
        popup.classList.remove("show");
    }, 4000);
}
// ==========================================
// 8. ADIÇÃO DE JOGOS AO BACKLOG COM GATILHO DE INSÍGNIAS
// ==========================================

// Função: Envia uma requisição POST para adicionar um jogo ao backlog e processar recompensas.
// Motivo: Permite registrar novos jogos e capturar o retorno de novas insígnias conquistadas para disparar o pop-up animado.
async function adicionarJogoAoBacklog(idPerfil, nomeJogo, status) {
    try {
        const response = await fetch(`${API}/Backlog/adicionar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idPerfil, nomeJogo, status })
        });

        if (!response.ok) throw new Error("Erro ao adicionar jogo.");

        const resultado = await response.json();
        
        // Sucesso ao adicionar
        console.log(resultado.mensagem);

        // --- VERIFICA SE HOUVE NOVAS CONQUISTAS DESBLOQUEADAS ---
        if (resultado.novasInsignias && resultado.novasInsignias.length > 0) {
            resultado.novasInsignias.forEach((insignia, index) => {
                setTimeout(() => {
                    mostrarAnimacaoConquista(insignia.nome, insignia.descricao, insignia.iconeUrl);
                }, index * 4500);
            });
        }

    } catch (error) {
        console.error("Erro:", error);
    }
}


// ==========================================
// 9. RENDERIZAÇÃO DINÂMICA DE INSÍGNIAS NA HOME DO PERFIL
// ==========================================

// Função: Busca as insígnias conquistadas pelo usuário e as exibe dinamicamente na caixinha lateral da página principal.
// Motivo: Elimina a necessidade de elementos estáticos na interface, atualizando os ícones de acordo com o progresso real no banco.
async function carregarInsigniasDoPerfilNaHome(idPerfil) {
    try {
        const response = await fetch(`${API_BASE_URL}/Usuarios/perfil/${idPerfil}/insignias`);
        if (!response.ok) return;

        const data = await response.json();
        const container = document.getElementById("badges-row");
        const countEl = document.getElementById("badges-count");

        if (!container) return;

        // Filtra apenas as insígnias que possuem a flag 'conquistada: true'
        const conquistadas = data.todas.filter(i => i.conquistada);

        if (countEl) countEl.textContent = conquistadas.length;

        if (conquistadas.length === 0) {
            container.innerHTML = `<span style="font-size: 0.8rem; color: var(--secondary);">Nenhuma insígnia conquistada ainda.</span>`;
            return;
        }

        // Gera o HTML dos ícones reais das insígnias e insere no container da página
        container.innerHTML = conquistadas.map(insignia => `
            <div class="badge-item icon" title="${insignia.nome} - ${insignia.descricao}" style="background: rgba(102, 192, 244, 0.15); border: 1px solid rgba(102, 192, 244, 0.3); border-radius: 6px; padding: 4px; display: flex; align-items: center; justify-content: center;">
                <img src="${insignia.iconeUrl}" alt="${insignia.nome}" style="width: 24px; height: 24px; object-fit: contain;">
            </div>
        `).join("");

    } catch (error) {
        console.error("Erro ao carregar insígnias na home:", error);
    }
}