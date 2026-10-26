const API = "http://localhost:5209/api";

let avatarSelecionado = null;
let bannerSelecionado = null;
let idPerfil = null;

window.addEventListener("DOMContentLoaded", async () => {
    document
        .getElementById("btnCarregarPerfil")
        ?.addEventListener(
            "click",
            carregarPerfil
        );
    document
        .getElementById("btnSalvar")
        ?.addEventListener(
            "click",
            salvarPerfil
        );
    await carregarAvatares();
    await carregarBanners();
});

// Avatares
async function carregarAvatares() {
    const response =
        await fetch(
            `${API}/Perfil/avatars`
        );
    const avatares =
        await response.json();
    const container =
        document.getElementById(
            "avatar-list"
        );
    container.innerHTML = "";
    avatares.forEach(avatar => {
        const card =
            document.createElement("div");
        card.className =
            "avatar-card";
        card.innerHTML = `
            <img
                src="${avatar.imagemUrl}"
                alt="${avatar.nome}"
            >
        `;
        card.addEventListener(
            "click",
            () => {
                selecionarAvatar(
                    avatar.idAvatar,
                    avatar.imagemUrl
                );
                marcarSelecionado(
                    card,
                    ".avatar-card"
                );
            }
        );
        container.appendChild(card);
    });
}

// Banner
async function carregarBanners() {
    const response =
        await fetch(
            `${API}/Perfil/banners`
        );
    const banners =
        await response.json();
    const container =
        document.getElementById(
            "banner-list"
        );
    container.innerHTML = "";
    banners.forEach(banner => {
        const card =
            document.createElement("div");
        card.className =
            "banner-card";
        card.innerHTML = `
            <img
                src="${banner.imageUrl}"
                alt="${banner.nome}"
            >
        `;
        card.addEventListener(
            "click",
            () => {
                selecionarBanner(
                    banner.idBanner,
                    banner.imageUrl
                )
                marcarSelecionado(
                    card,
                    ".banner-card"
                );
            }
        );
        container.appendChild(card);
    });
}
/// Perfil
async function carregarPerfil() {
    idPerfil =
        document.getElementById(
            "idPerfil"
        ).value;
    if (!idPerfil) {

        alert(
            "Informe o ID do perfil"
        );

        return;
    }
    const response =
        await fetch(
            `${API}/Usuarios/perfil/${idPerfil}`
        );
    if (!response.ok) {

        alert(
            "Perfil não encontrado"
        );
        return;
    }
    const perfil =
        await response.json();
    document.getElementById(
        "nickname"
    ).textContent =
        perfil.nickname ?? "";

    if (perfil.avatar) {

        document.getElementById(
            "previewAvatar"
        ).src =
            perfil.avatar.imagemUrl;
    }
    if (perfil.banner) {

        document.getElementById(
            "previewBanner"
        ).src =
            perfil.banner.imageUrl;
    }
}

// Selecionar Avatar
function selecionarAvatar(
    id, imagem
){
    avatarSelecionado = id;
    document.getElementById(
        "previewAvatar"
    ).src = imagem;

    console.log(
        "Avatar selecionado:",
        id
    );
}

//Selecionar Banner
function selecionarBanner(
    id, imagem
) {
    bannerSelecionado = id;
    document.getElementById(
        "previewBanner"
    ).src = imagem;

    console.log(
        "Banner selecionado:",
        id
    );
}

// Destacar seleção
function marcarSelecionado(
    elemento, seletor
) {
    document
        .querySelectorAll(seletor)
        .forEach(card =>
            card.classList.remove(
                "selected"
            )
        );
    elemento.classList.add(
        "selected"
    );
}

// Salvar
async function salvarPerfil() {
    if (!idPerfil) {
        alert(
            "Carregue um perfil primeiro."
        );

        return;
    }
    const response =
        await fetch(
            `${API}/Perfil/${idPerfil}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    idAvatar:
                        avatarSelecionado,

                    idBanner:
                        bannerSelecionado,

                    idTitulo: 1
                })
            }
        );
    if (!response.ok) {

        alert(
            "Erro ao atualizar perfil"
        );

        return;
    }
    alert(
        "Perfil atualizado!"
    );
}