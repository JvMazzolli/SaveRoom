const API_BASE_URL = "/api";
const LIMITE_DESCRICAO = 250;

document.addEventListener("DOMContentLoaded", () => {
    // Carrega automaticamente o perfil do usuário logado na sessão ao abrir a página
    if (typeof USUARIO_LOGADO_ID !== 'undefined' && USUARIO_LOGADO_ID) {
        const inputId = document.getElementById("perfil-id");
        if (inputId) inputId.value = USUARIO_LOGADO_ID;
        carregarPerfilEBacklog(USUARIO_LOGADO_ID);
    }

    const btnBuscarPerfil = document.getElementById("buscar-perfil");
    btnBuscarPerfil?.addEventListener("click", () => {
        const idPerfil = document.getElementById("perfil-id").value;
        if (!idPerfil) {
            alert("Informe um perfil");
            return;
        }
        carregarPerfilEBacklog(idPerfil);
    });

    // Redirecionamento do botão Gerenciar Perfil
    const btnManageProfile = document.getElementById("manage-profile");
    btnManageProfile?.addEventListener("click", () => {
        window.location.href = "/Usuario/Gerenciar"; // Ajuste conforme a sua rota MVC
    });
});

async function carregarPerfilEBacklog(idPerfil) {
    try {
        const response = await fetch(`${API_BASE_URL}/Usuarios/perfil/${idPerfil}`);

        if (!response.ok) {
            throw new Error("Erro ao carregar perfil");
        }

        const perfil = await response.json();

        preencherPerfil(perfil);
        renderizarBacklog(perfil.backlog ?? []);

    } catch (error) {
        console.error("Erro:", error);
    }
}

function preencherPerfil(perfil) {
    document.getElementById("username").textContent = perfil.nickname ?? "Usuário";
    document.getElementById("user-id").textContent = perfil.idPerfil ?? "";

    const tituloPerfil = document.getElementById("titulo-perfil");
    if (tituloPerfil) {
        tituloPerfil.textContent = perfil.titulo ?? "Velha Guarda";
    }

    if (perfil.avatar && perfil.avatar.imagemUrl) {
        document.getElementById("avatar").src = perfil.avatar.imagemUrl;
    }

    if (perfil.banner && perfil.banner.imageUrl) {
        document.getElementById("banner-img").src = perfil.banner.imageUrl;
    }

    // Nível e XP
    const nivel = perfil.nivel ?? 1;
    const xpAtual = perfil.xpAtual ?? 450;
    const xpProximoNivel = perfil.xpProximoNivel ?? 1000;
    const porcentagemXp = Math.min(100, Math.round((xpAtual / xpProximoNivel) * 100));

    const levelElement = document.getElementById("level");
    if (levelElement) levelElement.textContent = nivel;
    
    const levelXpText = document.querySelector(".level-xp-text");
    if (levelXpText) {
        levelXpText.textContent = `XP ${xpAtual} / ${xpProximoNivel}`;
    }

    const levelBarFill = document.querySelector(".level-bar-fill");
    if (levelBarFill) {
        levelBarFill.style.width = `${porcentagemXp}%`;
    }

    // Bio e Links
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

    // Estatísticas
    const totalBacklogCalculado = perfil.backlog ? perfil.backlog.length : 28;
    document.getElementById("stat-level").textContent = perfil.estatisticas?.nivelConta ?? nivel;
    document.getElementById("stat-achievements").textContent = perfil.estatisticas?.totalConquistas ?? 142;
    document.getElementById("stat-backlog").textContent = perfil.estatisticas?.totalBacklog ?? totalBacklogCalculado;
    document.getElementById("stat-platinums").textContent = perfil.estatisticas?.totalPlatinas ?? 5;
}

function limparDescricao(texto) {
    return (texto || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function obterPlataformas(jogo) {
    if (!jogo.plataformas) return [];
    return jogo.plataformas.split(",").map(p => p.trim()).filter(Boolean);
}

function criarCardJogo(jogo, index) {
    const descricaoCompleta = limparDescricao(jogo.descricao);
    const descricaoCurta = descricaoCompleta.length > LIMITE_DESCRICAO
        ? descricaoCompleta.substring(0, LIMITE_DESCRICAO) + "..."
        : descricaoCompleta;
    
    const plataformas = obterPlataformas(jogo);
    const jogoId = jogo.idJogo ?? jogo.IdJogo ?? jogo.id ?? jogo.Id ?? jogo.idGame;
    
    const statusLower = (jogo.status || '').toLowerCase();
    const estaPlatinado = statusLower === 'platinado' || statusLower === 'concluido' || statusLower === 'finalizado';
    
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

        document.getElementById("modal-game-cover").src = data.capaUrl || "/img/sem-capa.jpg";
        document.getElementById("modal-game-name").textContent = data.nomeJogo.toUpperCase();
        document.getElementById("modal-progress-text").textContent = `${totalAlcancadas} DE ${data.totalConquistas} CONQUISTAS ALCANÇADAS`;
        document.getElementById("modal-progress-percent").textContent = `(${porcentagemGeral}%)`;
        document.getElementById("modal-bar-fill").style.width = `${porcentagemGeral}%`;

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

        document.getElementById("modal-conquistas").style.display = "flex";

    } catch (error) {
        console.error(error);
        alert("Erro ao abrir conquistas do jogo.");
    }
}

function fecharModalConquistas() {
    const modal = document.getElementById("modal-conquistas");
    if (modal) {
        modal.style.display = "none";
    }
}