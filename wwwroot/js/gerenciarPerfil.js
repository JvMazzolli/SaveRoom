const API = "/api";

let avatarSelecionado = null;
let bannerSelecionado = null;
let idPerfil = null;

window.addEventListener("DOMContentLoaded", async () => {
    // Pega automaticamente o ID do usuário logado vindo da sessão (integração com a parte do Carlos a unica coisa de diferença é que eu tive que criar uma nova classes para puxar pelo id do perfil que esta logado, mas furamente pretendo alterar do idperfil para idusuario)
    if (typeof USUARIO_LOGADO_ID !== 'undefined' && USUARIO_LOGADO_ID) {
        idPerfil = USUARIO_LOGADO_ID;
        await carregarPerfilAutomatico(idPerfil);
    } else {
        alert("Nenhum usuário logado encontrado.");
    }

    document.getElementById("btnSalvar")?.addEventListener("click", salvarPerfil);

    await carregarAvatares();
    await carregarBanners();
});

// Carrega os dados do perfil logado 
async function carregarPerfilAutomatico(id) {
    try {
        const response = await fetch(`${API}/Usuarios/perfil/${id}`);
        if (!response.ok) throw new Error("Perfil não encontrado");
        
        const perfil = await response.json();
        
        document.getElementById("nickname").textContent = perfil.nickname ?? "";

        if (perfil.avatar) {
            document.getElementById("previewAvatar").src = perfil.avatar.imagemUrl;
            avatarSelecionado = perfil.avatar.idAvatar;
        }
        if (perfil.banner) {
            document.getElementById("previewBanner").src = perfil.banner.imageUrl;
            bannerSelecionado = perfil.banner.idBanner;
        }
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
    }
}

// Avatares (Vou aperfeicoar)
async function carregarAvatares() {
    const response = await fetch(`${API}/Perfil/avatars`);
    const avatares = await response.json();
    const container = document.getElementById("avatar-list");
    container.innerHTML = "";
    
    avatares.forEach(avatar => {
        const card = document.createElement("div");
        card.className = "avatar-card";
        if (avatar.idAvatar === avatarSelecionado) {
            card.classList.add("selected");
        }
        card.innerHTML = `<img src="${avatar.imagemUrl}" alt="${avatar.nome}">`;
        
        card.addEventListener("click", () => {
            avatarSelecionado = avatar.idAvatar;
            document.getElementById("previewAvatar").src = avatar.imagemUrl;
            marcarSelecionado(card, ".avatar-card");
        });
        container.appendChild(card);
    });
}

// Banners (Irei aperfeicoar)
async function carregarBanners() {
    const response = await fetch(`${API}/Perfil/banners`);
    const banners = await response.json();
    const container = document.getElementById("banner-list");
    container.innerHTML = "";
    
    banners.forEach(banner => {
        const card = document.createElement("div");
        card.className = "banner-card";
        if (banner.idBanner === bannerSelecionado) {
            card.classList.add("selected");
        }
        card.innerHTML = `<img src="${banner.imageUrl}" alt="${banner.nome}">`;
        
        card.addEventListener("click", () => {
            bannerSelecionado = banner.idBanner;
            document.getElementById("previewBanner").src = banner.imageUrl;
            marcarSelecionado(card, ".banner-card");
        });
        container.appendChild(card);
    });
}

function marcarSelecionado(elemento, seletor) {
    document.querySelectorAll(seletor).forEach(card => card.classList.remove("selected"));
    elemento.classList.add("selected");
}

// Salvar alterações no perfil voi aperfeicoar ainda
async function salvarPerfil() {
    if (!idPerfil) {
        alert("ID do perfil não identificado.");
        return;
    }

    try {
        const response = await fetch(`${API}/Perfil/${idPerfil}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idAvatar: avatarSelecionado,
                idBanner: bannerSelecionado,
                idTitulo: 1,
                bio: document.getElementById("nickname").textContent
            })
        });

        if (!response.ok) {
            alert("Erro ao atualizar perfil");
            return;
        }

        alert("Perfil atualizado com sucesso!");
        window.location.href = "/Usuario/Perfil";
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro de conexão ao salvar perfil.");
    }
}