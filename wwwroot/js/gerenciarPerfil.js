/**
 * GERENCIAR PERFIL - SCRIPT PRINCIPAL 
 * Gerencia a troca de abas, carregamento de avatares, banners, bio, nickname e insígnias.
 */

const API = "/api";

// Variáveis de estado global da página
let avatarSelecionado = null;
let bannerSelecionado = null;
let insigniaSelecionada = null;
let idPerfil = null;
let toastTimeout = null;

// ==========================================
// 1. INICIALIZAÇÃO DA PÁGINA
// ==========================================
window.addEventListener("DOMContentLoaded", async () => {
    
    // --- Sistema de Abas do Menu Lateral ---
    const navItems = document.querySelectorAll(".steam-nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            if (!targetId) return;

            // Remove a classe 'active' de todos os botões e painéis de abas
            navItems.forEach(nav => nav.classList.remove("active"));
            document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

            // Ativa o botão clicado e mostra estritamente o painel correspondente
            item.classList.add("active");
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add("active");
            }
        });
    });

    // --- Identificação do Usuário Logado e Carga Inicial ---
    if (typeof USUARIO_LOGADO_ID !== 'undefined' && USUARIO_LOGADO_ID) {
        idPerfil = USUARIO_LOGADO_ID;
        
        // Executa as chamadas assíncronas para preencher os dados na tela
        await carregarPerfilAutomatico(idPerfil);
        await carregarInsigniasPerfil();
    } else {
        console.warn("Nenhum usuário logado encontrado.");
    }

    // --- Evento do Botão de Salvar Alterações ---
    document.getElementById("btnSalvar")?.addEventListener("click", salvarPerfil);

    // --- Carregamento das Galerias ---
    await carregarAvatares();
    await carregarBanners();
});


// ==========================================
// 2. SISTEMA DE NOTIFICAÇÃO TOAST
// ==========================================
function mostrarToast(mensagem, tipo = "success") {
    const toast = document.getElementById("steamToast");
    const toastMessage = document.getElementById("toastMessage");
    const progressBar = toast?.querySelector(".toast-progress");
    const icon = toast?.querySelector(".toast-icon");

    if (!toast || !toastMessage || !progressBar) return;

    // Cancela o temporizador anterior caso já exista um toast visível
    if (toastTimeout) clearTimeout(toastTimeout);

    toastMessage.textContent = mensagem;

    // Configura o visual com base no tipo (sucesso ou erro)
    if (tipo === "error") {
        toast.classList.add("error");
        if (icon) icon.textContent = "✕";
    } else {
        toast.classList.remove("error");
        if (icon) icon.textContent = "✓";
    }

    // Reinicia a barra de progresso do Toast
    progressBar.style.transition = "none";
    progressBar.style.width = "100%";

    toast.classList.add("show");

    // Animação fluida da barra de progresso esvaziando (3 segundos)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            progressBar.style.transition = "width 3s linear";
            progressBar.style.width = "0%";
        });
    });

    // Oculta o toast após 3 segundos
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// ==========================================
// 3. CARREGAMENTO DOS DADOS DO PERFIL
// ==========================================
async function carregarPerfilAutomatico(id) {
    try {
        const response = await fetch(`${API}/Usuarios/perfil/${id}`);
        if (!response.ok) throw new Error("Perfil não encontrado");
        
        const perfil = await response.json();
        
        // Preenche o Nickname no cabeçalho e no input da aba Geral
        if (perfil.nickname) {
            const headerNick = document.getElementById("headerNickname");
            if (headerNick) headerNick.textContent = perfil.nickname;

            const inputNick = document.getElementById("inputNickname");
            if (inputNick) inputNick.value = perfil.nickname;
        }

        // Preenche o campo de Bio (Sobre mim)
        if (perfil.bio !== undefined && perfil.bio !== null) {
            const inputBio = document.getElementById("inputBio");
            if (inputBio) inputBio.value = perfil.bio;
        }

        // Configura o Avatar atual
        if (perfil.avatar && perfil.avatar.imagemUrl) {
            atualizarPreviewsAvatar(perfil.avatar.imagemUrl);
            avatarSelecionado = perfil.avatar.idAvatar;
        }
        
        // Configura o Banner atual
        if (perfil.banner && perfil.banner.imageUrl) {
            const previewBanner = document.getElementById("previewBanner");
            if (previewBanner) previewBanner.src = perfil.banner.imageUrl;
            bannerSelecionado = perfil.banner.idBanner;
        }
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
    }
}

// Atualiza todas as miniaturas e pré-visualizações do avatar na tela
function atualizarPreviewsAvatar(url) {
    document.querySelectorAll(".previewAvatar, #headerAvatar").forEach(img => {
        if (img) img.src = url;
    });
}


// ==========================================
// 4. GALERIA DE AVATARES E BANNERS
// ==========================================

// Carrega os avatares disponíveis na API e monta os cards interativos
async function carregarAvatares() {
    try {
        const response = await fetch(`${API}/Perfil/avatars`);
        const avatares = await response.json();
        const container = document.getElementById("avatar-list");
        if (!container) return;
        container.innerHTML = "";
        
        avatares.forEach(avatar => {
            const card = document.createElement("div");
            card.className = "avatar-card";
            if (avatar.idAvatar === avatarSelecionado) {
                card.classList.add("selected");
            }
            card.innerHTML = `<img src="${avatar.imagemUrl}" alt="${avatar.nome || 'Avatar'}">`;
            
            // Evento de clique para selecionar o avatar
            card.addEventListener("click", () => {
                avatarSelecionado = avatar.idAvatar;
                atualizarPreviewsAvatar(avatar.imagemUrl);
                marcarSelecionado(card, ".avatar-card");
            });
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Erro ao carregar avatares:", err);
    }
}

// Carrega os banners disponíveis na API e monta os cards interativos
async function carregarBanners() {
    try {
        const response = await fetch(`${API}/Perfil/banners`);
        const banners = await response.json();
        const container = document.getElementById("banner-list");
        if (!container) return;
        container.innerHTML = "";
        
        banners.forEach(banner => {
            const card = document.createElement("div");
            card.className = "banner-card";
            if (banner.idBanner === bannerSelecionado) {
                card.classList.add("selected");
            }
            card.innerHTML = `<img src="${banner.imageUrl}" alt="${banner.nome || 'Banner'}">`;
            
            // Evento de clique para selecionar o banner
            card.addEventListener("click", () => {
                bannerSelecionado = banner.idBanner;
                const previewBanner = document.getElementById("previewBanner");
                if (previewBanner) previewBanner.src = banner.imageUrl;
                marcarSelecionado(card, ".banner-card");
            });
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Erro ao carregar banners:", err);
    }
}

// Utilitário para alternar a classe 'selected' visualmente nos itens de grade
function marcarSelecionado(elemento, seletor) {
    document.querySelectorAll(seletor).forEach(card => card.classList.remove("selected"));
    elemento.classList.add("selected");
}


// ==========================================
// 5. SISTEMA DE INSÍGNIAS EM DESTAQUE
// ==========================================

// Busca na API as insígnias do utilizador (conquistadas e bloqueadas)
async function carregarInsigniasPerfil() {
    try {
        const response = await fetch(`${API}/Usuarios/perfil/${idPerfil}/insignias`);
        if (!response.ok) throw new Error("Erro ao carregar insígnias.");

        const data = await response.json();

        // Define a insígnia em destaque atual se houver
        if (data.insigniaDestaque) {
            insigniaSelecionada = data.insigniaDestaque.idInsignia;
            atualizarPreviewDestaque(data.insigniaDestaque);
        } else {
            insigniaSelecionada = null;
            limparPreviewDestaque();
        }

        renderizarGradeInsignias(data.todas, data.insigniaDestaque?.idInsignia);
    } catch (err) {
        console.error("Erro ao carregar insígnias:", err);
    }
}

// Atualiza a caixa de visualização superior da insígnia em destaque
function atualizarPreviewDestaque(insignia) {
    const imgPreview = document.getElementById("previewInsigniaDestaque");
    const nomeEl = document.getElementById("destaqueNome");
    const descEl = document.getElementById("destaqueDesc");

    if (imgPreview) imgPreview.src = insignia.iconeUrl;
    if (nomeEl) nomeEl.textContent = insignia.nome;
    if (descEl) descEl.textContent = insignia.descricao || "Insígnia em destaque no perfil.";
}

// Reseta a caixa de visualização quando nenhuma insígnia está selecionada
function limparPreviewDestaque() {
    const imgPreview = document.getElementById("previewInsigniaDestaque");
    const nomeEl = document.getElementById("destaqueNome");
    const descEl = document.getElementById("destaqueDesc");

    if (imgPreview) imgPreview.src = "";
    if (nomeEl) nomeEl.textContent = "Nenhuma insígnia selecionada";
    if (descEl) descEl.textContent = "Selecione uma das suas insígnias conquistadas abaixo.";
}

// Monta a grelha de insígnias aplicando regras visuais para bloqueadas e desbloqueadas
function renderizarGradeInsignias(lista, idDestaqueAtual) {
    const container = document.getElementById("insignias-list");
    if (!container) return;
    container.innerHTML = "";

    lista.forEach(insignia => {
        const card = document.createElement("div");
        
        // Adiciona classe 'locked' se o usuário ainda não conquistou
        card.className = `insignia-card ${insignia.conquistada ? '' : 'locked'}`;
        
        if (insignia.idInsignia === idDestaqueAtual) {
            card.classList.add("selected");
        }

        card.innerHTML = `<img src="${insignia.iconeUrl}" title="${insignia.nome} - ${insignia.descricao}" alt="${insignia.nome}">`;

        // Se a insígnia foi conquistada, permite selecioná-la ao clicar
        if (insignia.conquistada) {
            card.addEventListener("click", () => {
                insigniaSelecionada = insignia.idInsignia;
                atualizarPreviewDestaque(insignia);
                marcarSelecionado(card, ".insignia-card");
            });
        }

        container.appendChild(card);
    });
}


// ==========================================
// 6. SALVAR ALTERAÇÕES (PERFIL + INSÍGNIA)
// ==========================================
async function salvarPerfil() {
    if (!idPerfil) {
        mostrarToast("ID do perfil não identificado.", "error");
        return;
    }

    const inputNick = document.getElementById("inputNickname");
    const inputBio = document.getElementById("inputBio");

    const novoNickname = inputNick ? inputNick.value.trim() : "";
    const novaBio = inputBio ? inputBio.value.trim() : "";

    const btn = document.getElementById("btnSalvar");
    const originalText = btn ? btn.textContent : "Salvar Alterações";
    
    if (btn) {
        btn.textContent = "Salvando...";
        btn.disabled = true;
    }

    try {
        // 1. Requisição PUT para atualizar dados básicos (Nickname, Bio, Avatar, Banner)
        const responsePerfil = await fetch(`${API}/Usuarios/perfil/${idPerfil}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idAvatar: avatarSelecionado,
                idBanner: bannerSelecionado,
                idTitulo: 1,
                nickname: novoNickname,
                bio: novaBio
            })
        });

        // 2. Requisição PUT separada para atualizar a Insígnia em Destaque selecionada
        const responseInsignia = await fetch(`${API}/Usuarios/perfil/${idPerfil}/insignia-destaque`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idInsignia: insigniaSelecionada
            })
        });

        if (!responsePerfil.ok || !responseInsignia.ok) {
            mostrarToast("Erro ao atualizar perfil.", "error");
            return;
        }

        // Atualiza dinamicamente o nickname no cabeçalho sem precisar recarregar a página
        const headerNick = document.getElementById("headerNickname");
        if (headerNick && novoNickname) headerNick.textContent = novoNickname;

        mostrarToast("Perfil atualizado com sucesso!", "success");
    } catch (error) {
        console.error("Erro ao salvar:", error);
        mostrarToast("Erro de conexão ao salvar perfil.", "error");
    } finally {
        // Restaura o botão ao estado original
        if (btn) {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    }
}

async function adicionarJogoAoBacklog(idPerfil, nomeJogo, status) {
    try {
        const response = await fetch(`${API_BASE_URL}/Backlog/adicionar`, {
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
                // Se houver mais de uma, faz um pequeno delay entre elas para não sobrepor
                setTimeout(() => {
                    mostrarAnimacaoConquista(insignia.nome, insignia.descricao, insignia.iconeUrl);
                }, index * 4500);
            });
        }

    } catch (error) {
        console.error("Erro:", error);
    }
}