CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banner (
    id_banner SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO banner 
(nome, image_url)
VALUES
(
    'CyberPunk',
    'https://static.vecteezy.com/system/resources/previews/022/891/711/non_2x/futuristic-black-and-yellow-banner-in-cyberpunk-style-vector.jpg'
),
(
    'The Last Of Us',
    'https://wallpapercat.com/w/full/6/5/3/80418-3840x2160-desktop-4k-the-last-of-us-game-wallpaper-photo.jpg'
),
(
    'The Last Of Us - Ellie',
    'https://wallpapercave.com/wp/wp6448280.jpg'
),
(
    'The Last Of Us - Seatle',
    'https://cdn.mos.cms.futurecdn.net/gBGciPHnAc4G6ynEuz8pCn.jpg'
),
(
    'RDR2',
    'https://a-static.besthdwallpaper.com/red-dead-redemption-2-wallpaper-3360x1050-2618_61.jpg'
),
(
    'HALO',
    'https://www.comboinfinito.com.br/principal/wp-content/uploads/2017/03/courage-clean-desktop_wide.jpg'
),
(
    'LOST LEGACY',
    'https://farm5.staticflickr.com/4792/40646151622_ee49541c87_h.jpg'
),
(
    'BOOLDBORNE',
    'https://farm5.staticflickr.com/4798/40688580301_b99264386c_h.jpg'
),
(
    'ANIME WORLD',
    'https://wallpapercave.com/wp/wp5923739.jpg'
),
(
    'STEAM MULHARAS API',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/4561430/8dd3c38eae646ecc8b19bdaecd84fe7f5a47cff4.jpg'
),
(
    'PRIME',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1091500/db76d224cafa8d8ae6c5d3a8b94e7dafddf7c764.jpg'
),
(
    'ABYSS',
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/296870/5751ff7ba7cb877740efaef9755bd46d8ae60b9b.jpg'
);


CREATE TABLE avatar (
    id_avatar SERIAL PRIMARY KEY,
    nome VARCHAR(150),
    imagem_url TEXT NOT NULL
);

INSERT INTO avatar 
(nome, imagem_url)
VALUES
(
    'ARTHUR MORGAN',
    'https://apollo2.dl.playstation.net/cdn/UP1004/CUSA03041_00/Jl072O7AQC5WfZB05pq6tBUDWNnzfAXq.png'
),
(
    'BATMAN ARK - CORINGA',
    'https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/6eTP4WXtViqk8T0NIBjBrVwAxm3U2JQS.png'
),
(
    'KRATOS',
    'https://image.api.playstation.com/cdn/UP9000/CUSA01623_00/loRksslb1sxNXDDYbyr3rWVwDngHctUj.png'
),
(
    'ELLIE TLOF',
    'https://image.api.playstation.com/cdn/UP9000/BCUS98174_00/Fbxw3OTRwTqUARsbhTvSbtEGEg11OC9o.png'
),
(
    'RICK MORTY',
    'https://image.api.playstation.com/cdn/UP0151/CUSA09971_00/FEs8B2BDAudxV3js6SM2t4vZ88vnxSi0.png'
),
(
    'GTA AVATAR',
    'https://image.api.playstation.com/cdn/UP1004/NPUB31154_00/GFPKXf9DZUowXp1HxCco8FBSYeR7Pn9y.png'
),
(
    'GTA AVATAR BEACH',
    'https://image.api.playstation.com/cdn/UP1004/BLUS31156_00/V2bbus6FfK6ERcg5W0xPmn9FwpwzXaQw.png'
),
(
    'VAN HELSING',
    'https://apollo2.dl.playstation.net/cdn/UP1263/CUSA09370_00/f9qcm07NqaoexfXRKcKfBJkJUFEjf4Ls.png'
),
(
    'ELLIE TLOF2',
    'https://image.api.playstation.com/cdn/UP9000/CUSA07820_00/c8GRTScuiwewlzKjs6B0vNIgEGlcaQ05.png'
),
(
    'TOKYO',
    'https://image.api.playstation.com/cdn/UP1024/CUSA06978_00/VjCfrtDgk10VMIH8vIQHI1XtNBD9Fv9K.png'
),
(
    'GTR',
    'https://apollo2.dl.playstation.net/cdn/UP4312/CUSA02383_00/fNKzj1K1KaPMvxXhssIiYo0FRk9Y419w.png'
),
(
    'GHOST FACE',
    'https://vulcan.dl.playstation.net/img/cfn/11307HlWL-_HFrfG1OJj6PSJQxFpGVpJcJFNi3WosZ79MjIgeTdya7I2uknT8_vQ4UKlbPRT5KCUcUf9LjpE5XKltj810uMI.png'
),
(
    'LONDON DETECTIVE',
    'https://image.api.playstation.com/cdn/UP1023/CUSA07718_00/bBB1oJt7mUqMUKpD7D0PNHjeomeMHaPt.png'
),
(
    'MORTY',
    'https://image.api.playstation.com/cdn/UP0151/CUSA09971_00/0RcbL27NY6TiKznAHsJXUcALVKb4AMyM.png'
),
(
    'BATMAN',
    'https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/XlkEcZSBzuJPIJo8BI7l0KuY0hBYrO8c.png'
),
(
    'NICO GTA',
    'https://image.api.playstation.com/cdn/UP1017/BLUS30127_00/HTouUOCYjzulUXZwcLTJvOZLtwUlRuXW.png'
),
(
    'DI RAVELO',
    'https://image.api.playstation.com/cdn/UP0082/CUSA01493_00/QjMFlQhl29cEpRzlNL7RcbbtBuaVjj06.png'
),
(
    'GTA 5 ON',
    'https://image.api.playstation.com/cdn/UP1004/NPUB31154_00/GL72NmOF5PlPInryFHYjEJh5ocbafja6.png'
),
(
    'EREDIN',
    'https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/MGCMvrsMybLhJVRWaB3cQOk4XEv2czl1.png'
),
(
    'AKYE',
    'https://image.api.playstation.com/cdn/UP1063/CUSA02629_00/GAtnR7T7tlTHBe9ZCglvnm67LsXd7RM1.png'
),
(
    'BLOOD MOON',
    'https://image.api.playstation.com/vulcan/img/cfn/113072p6OAip4q4joa0WUAv-VnsVhMFk5S803WwwfVBWPpawMGz1isR21wyCBp0G8gvs46KDVp3sYvnunasxsCVZgrk24rgl.png'
),
(
    'DEATH AND REQUST',
    'https://image.api.playstation.com/cdn/UP0031/CUSA13132_00/lrHgGolK61RFN6pbLIo7xD6wqonvblYY.png'
);

CREATE TABLE titulo_perfil (
    id_titulo SERIAL PRIMARY KEY,
    nome VARCHAR (150),
    descricao TEXT
);

INSERT INTO titulo_perfil
(nome, descricao)
VALUES
(
    'VELHA GUARDA',
    'MAIS DE 20 JOGOS EM SEU BACKLOG, COM DATA DE LANÇAMENTO INFERIOR HÁ 1990'
),
(
    'PLAY STATION BOY',
    'POSSUI NO MÍNIMO 35 JOGOS PLAYSTATION EM SEU BACKLOG'
),
(
    'LENDA DE NIGHT CITY',
    'PLATINOU CYBERPUNK'
),
(
    'LENDA DOS JOGOS',
    'POSSUI NO MINÍMO 50 PLATINAS'
);


CREATE TABLE perfil (
    id_perfil SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_avatar INT,
    id_banner INT,
    id_titulo INT,
    nickname VARCHAR(100) NOT NULL,
    bio TEXT,
    CONSTRAINT fk_perfil_titulo_perfil FOREIGN KEY (id_titulo)
        REFERENCES public.titulo_perfil(id_titulo) ON DELETE CASCADE,
    CONSTRAINT fk_perfil_avatar FOREIGN KEY (id_avatar)
        REFERENCES public.avatar(id_avatar) ON DELETE CASCADE,
    CONSTRAINT fk_perfil_banner FOREIGN KEY (id_banner)
        REFERENCES public.banner(id_banner) ON DELETE CASCADE,
    CONSTRAINT fk_perfil_usuario FOREIGN KEY (id_usuario)
        REFERENCES public.usuario(id_usuario) ON DELETE CASCADE
);
CREATE TABLE jogo (
    id_jogo SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    data_lancamento DATE,
    id_rawg INT UNIQUE,
    imagem_capa TEXT,
    desenvolvedora VARCHAR(150),
    publicadora VARCHAR(150),
    rating DOUBLE PRECISION,
    metacritic INT,
    plataformas VARCHAR(200)
);

CREATE TABLE genero (
    id_genero SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_rawg INT UNIQUE
);


CREATE TABLE plataforma (
    id_plataforma SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100),
    id_rawg INT UNIQUE
);

CREATE TABLE backlog (
    id_backlog SERIAL PRIMARY KEY,
    id_perfil INT NOT NULL,
    id_jogo INT NOT NULL,
    nome_jogo TEXT,
    metacritic INT,
    plataformas VARCHAR(300),
    status VARCHAR(20) CHECK (status IN ('a_jogar','jogando','concluido','platinado','abandonado')),
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_conclusao TIMESTAMP,
    CONSTRAINT fk_backlog_perfil FOREIGN KEY (id_perfil)
        REFERENCES public.perfil(id_perfil) ON DELETE CASCADE,
    CONSTRAINT fk_backlog_jogo FOREIGN KEY (id_jogo)
        REFERENCES public.jogo(id_jogo) ON DELETE CASCADE
);

CREATE TABLE analise (
    id_analise SERIAL PRIMARY KEY,
    id_jogo INT NOT NULL,
    id_perfil INT NOT NULL,
    nota NUMERIC(3,1) CHECK (nota >= 0 AND nota <= 10),
    comentario TEXT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_analise_jogo FOREIGN KEY (id_jogo)
        REFERENCES public.jogo(id_jogo) ON DELETE CASCADE,
    CONSTRAINT fk_analise_perfil FOREIGN KEY (id_perfil)
        REFERENCES public.perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE conquista (
    id_conquista SERIAL PRIMARY KEY,
    id_jogo INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    icone_url TEXT,
    pontuacao INT,
    id_rawg INT UNIQUE,
    CONSTRAINT fk_conquista_jogo FOREIGN KEY (id_jogo)
        REFERENCES public.jogo(id_jogo) ON DELETE CASCADE
);

CREATE TABLE conquista_usuario (
    id_conquista INT NOT NULL,
    id_perfil INT NOT NULL,
    data_obtida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_conquista, id_perfil),
    CONSTRAINT fk_conquista_usuario_conquista FOREIGN KEY (id_conquista)
        REFERENCES public.conquista(id_conquista) ON DELETE CASCADE,
    CONSTRAINT fk_conquista_usuario_perfil FOREIGN KEY (id_perfil)
        REFERENCES public.perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE dlc (
    id_dlc SERIAL PRIMARY KEY,
    id_jogo INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    data_lancamento DATE,
    CONSTRAINT fk_dlc_jogo FOREIGN KEY (id_jogo)
        REFERENCES public.jogo(id_jogo) ON DELETE CASCADE
);


CREATE TABLE jogo_genero (
    id_jogo INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_jogo, id_genero),
    CONSTRAINT fk_jogo_genero_jogo FOREIGN KEY (id_jogo)
        REFERENCES public.jogo(id_jogo) ON DELETE CASCADE,
    CONSTRAINT fk_jogo_genero_genero FOREIGN KEY (id_genero)
        REFERENCES public.genero(id_genero) ON DELETE CASCADE
);

CREATE TABLE jogo_plataforma (
    id_jogo INT NOT NULL,
    id_plataforma INT NOT NULL,
    PRIMARY KEY (id_jogo, id_plataforma),
    CONSTRAINT fk_jogo_plataforma_jogo FOREIGN KEY (id_jogo)
        REFERENCES public.jogo(id_jogo) ON DELETE CASCADE,
    CONSTRAINT fk_jogo_plataforma_plataforma FOREIGN KEY (id_plataforma)
        REFERENCES public.plataforma(id_plataforma) ON DELETE CASCADE
);

