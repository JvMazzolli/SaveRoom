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
    imagem_adicional TEXT, 
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


-- 1. Tabela de Insígnias disponíveis no sistema (SaveRoom Badges)
CREATE TABLE insignia (
    id_insignia SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    icone_url TEXT NOT NULL,
    criterio_tipo VARCHAR(50) NOT NULL, -- ex: 'JOGOS_ADICIONADOS', 'JOGOS_PLATINADOS'
    criterio_valor INT NOT NULL          -- ex: 1, 10, 20, 50
);

-- 2. Tabela de insígnias conquistadas por cada perfil
CREATE TABLE insignia_usuario (
    id_insignia INT NOT NULL,
    id_perfil INT NOT NULL,
    data_conquista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_insignia, id_perfil),
    CONSTRAINT fk_insignia_usuario_insignia FOREIGN KEY (id_insignia)
        REFERENCES public.insignia(id_insignia) ON DELETE CASCADE,
    CONSTRAINT fk_insignia_usuario_perfil FOREIGN KEY (id_perfil)
        REFERENCES public.perfil(id_perfil) ON DELETE CASCADE
);

-- 3. Adicionar coluna na tabela perfil para armazenar a insígnia em destaque selecionada
ALTER TABLE perfil ADD COLUMN id_insignia_destaque INT;
ALTER TABLE perfil ADD CONSTRAINT fk_perfil_insignia_destaque 
    FOREIGN KEY (id_insignia_destaque) REFERENCES public.insignia(id_insignia) ON DELETE SET NULL;

-- 4. Inserir algumas insígnias iniciais de exemplo
INSERT INTO insignia (nome, descricao, icone_url, criterio_tipo, criterio_valor) VALUES
('SaveRoom de Primeira Viagem', 'Adicione seu primeiro jogo ao backlog.', 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png', 'JOGOS_ADICIONADOS', 1),
('Colecionador Iniciante', 'Adicione 10 jogos ao seu backlog.', 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png', 'JOGOS_ADICIONADOS', 10),
('Mestre do Backlog', 'Adicione 20 jogos ao seu backlog.', 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', 'JOGOS_ADICIONADOS', 20),
('Primeiro Sangue', 'Platine o seu primeiro jogo.', 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png', 'JOGOS_PLATINADOS', 1),
('Caçador de Platinas', 'Platine 10 jogos.', 'https://cdn-icons-png.flaticon.com/512/3112/3112948.png', 'JOGOS_PLATINADOS', 10);

--API OFF-----------------------------------------------------------------------------

INSERT INTO jogo 
(id_rawg, nome, descricao, data_lancamento, imagem_capa, imagem_adicional, desenvolvedora, publicadora, rating, metacritic, plataformas)
VALUES 
-- 1. Grand Theft Auto V
(
    3498, 
    'Grand Theft Auto V', 
    'Quando um malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se envolvem com alguns dos criminosos mais assustadores e loucos do submundo, o governo dos EUA e a indústria do entretenimento, eles devem realizar uma série de golpes perigosos para sobreviver.', 
    '2013-09-17', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg', 
    'Rockstar North', 
    'Rockstar Games', 
    4.47, 
    92, 
    'PC, PlayStation 5, Xbox Series X/S, PlayStation 4, Xbox One'
),

-- 2. Hollow Knight
(
    9767, 
    'Hollow Knight', 
    'Forje seu próprio caminho em Hollow Knight! Uma aventura de ação épica em um vasto reino arruinado de insetos e heróis. Explore cavernas sinuosas, lute contra criaturas maculadas e faça amizade com insetos bizarros, tudo em um estilo clássico 2D desenhado à mão.', 
    '2017-02-24', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg', 
    'Team Cherry', 
    'Team Cherry', 
    4.4, 
    90, 
    'PC, macOS, Linux, Nintendo Switch, PlayStation 4, Xbox One'
),

-- 3. The Last of Us Part I
(
    801229, 
    'The Last of Us Part I', 
    'Em uma civilização devastada, onde infectados e sobreviventes experientes correm soltos, Joel é contratado para contrabandear uma garota de 14 anos, Ellie, para fora de uma zona de quarentena militar.', 
    '2022-09-02', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg', 
    'Naughty Dog', 
    'PlayStation PC', 
    4.5, 89, 
    'PlayStation 5, PC'
),

-- 4. Horizon Zero Dawn
(
    278, 
    'Horizon Zero Dawn', 
    'Experimente a lendária jornada de Aloy para desvendar os mistérios de uma Terra do futuro controlada por máquinas. Uma exilada de sua tribo, ela luta para descobrir seu passado.', 
    '2017-02-28', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg', 
    'Guerrilla Games', 
    'PlayStation PC', 
    4.3, 89, 
    'PlayStation 4, PC'
),

-- 5. Bloodborne
(
    8012, 
    'Bloodborne', 
    'Enfrente seus pesadelos enquanto busca respostas na antiga cidade de Yharnam, agora amaldiçoada com uma doença endêmica que se espalha pelas ruas.', 
    '2015-03-24', 
    'https://image.api.playstation.com/vulcan/img/rnd/202010/2614/nlMQhRjBuUntqrhyjqjwnqJe.png', 
    'https://image.api.playstation.com/vulcan/img/rnd/202010/2614/4Kqf8v1O9c67k6b3n6Yj2w7K.png', 
    'FromSoftware', 
    'Sony Computer Entertainment', 
    4.4, 92, 
    'PlayStation 4'
),

-- 6. Super Mario Odyssey
(
    28568, 
    'Super Mario Odyssey', 
    'Explore lugares incríveis bem longe do Reino Cogumelo enquanto você se junta a Mario e seu novo aliado Cappy em uma enorme aventura 3D.', 
    '2017-10-27', 
    'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_500/ncom/en_US/games/switch/s/super-mario-odyssey-switch/hero', 
    'https://assets.nintendo.com/image/upload/f_auto/q_auto/c_max,w_1200/ncom/en_US/games/switch/s/super-mario-odyssey-switch/screenshot01', 
    'Nintendo', 
    'Nintendo', 
    4.5, 97, 
    'Nintendo Switch'
),

-- 7. The Legend of Zelda: Breath of the Wild
(
    22511, 
    'The Legend of Zelda: Breath of the Wild', 
    'Esqueça tudo que você sabe sobre os jogos The Legend of Zelda. Entre em um mundo de descobertas, exploração e aventura.', 
    '2017-03-03', 
    'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_500/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero', 
    'https://assets.nintendo.com/image/upload/f_auto/q_auto/c_max,w_1200/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/screenshot01', 
    'Nintendo', 
    'Nintendo', 
    4.7, 97, 
    'Nintendo Switch, Wii U'
),

-- 8. Persona 5 Royal
(
    326238, 
    'Persona 5 Royal', 
    'Coloque a máscara do Joker e junte-se aos Phantom Thieves of Hearts. Liberte-se das correntes da sociedade moderna e encene grandes assaltos.', 
    '2019-10-31', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg', 
    'Atlus', 
    'SEGA', 
    4.8, 95, 
    'PlayStation 5, PlayStation 4, Xbox Series X/S, PC, Switch'
),

-- 9. Sekiro: Shadows Die Twice
(
    23585, 
    'Sekiro: Shadows Die Twice', 
    'Explore o Japão no final dos anos 1500, um período brutal de conflitos, enquanto você enfrenta inimigos maiores que a vida em um mundo sombrio.', 
    '2019-03-21', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg', 
    'FromSoftware', 
    'Activision Blizzard', 
    4.5, 90, 
    'PlayStation 4, Xbox One, PC'
),

-- 10. Ghost of Tsushima
(
    58023, 
    'Ghost of Tsushima', 
    'No final do século 13, o império mongol devastou nações inteiras. Jin Sakai deve deixar de lado as tradições dos samurais para proteger a ilha de Tsushima.', 
    '2020-07-17', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg', 
    'Sucker Punch Productions', 
    'Sony Interactive Entertainment', 
    4.6, 83, 
    'PlayStation 4, PlayStation 5'
),

-- 11. Marvels Spider-Man Remastered
(
    58134, 
    'Marvels Spider-Man Remastered', 
    'Os mundos de Peter Parker e do Homem-Aranha colidem em uma história original cheia de ação.', 
    '2018-09-07', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg', 
    'Insomniac Games', 
    'PlayStation PC', 
    4.5, 87, 
    'PlayStation 5, PlayStation 4, PC'
),

-- 12. Dark Souls III
(
    2462, 
    'Dark Souls III', 
    'Conforme os fogos se apagam e o mundo cai em ruínas, a jornada continua em um universo repleto de inimigos e ambientes colossais.', 
    '2016-03-24', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg', 
    'FromSoftware', 
    'Bandai Namco', 
    4.4, 89, 
    'PlayStation 4, Xbox One, PC'
),

-- 13. DOOM Eternal
(
    25889, 
    'DOOM Eternal', 
    'Os exércitos do inferno invadiram a Terra. Torne-se o Slayer em uma campanha épica para matar demônios em várias dimensões e impedir a destruição da humanidade.', 
    '2020-03-20', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg', 
    'id Software', 
    'Bethesda Softworks', 
    4.6, 88, 
    'PlayStation 4, Xbox One, PC, Nintendo Switch'
),

-- 14. BioShock Infinite
(
    10035, 
    'BioShock Infinite', 
    'Endividado com as pessoas erradas, com a vida em risco, veterano da cavalaria dos EUA se torna mercenário. Booker DeWitt só tem uma chance de recomeçar.', 
    '2013-03-26', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/8870/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/8870/header.jpg', 
    'Irrational Games', 
    '2K Games', 
    4.4, 94, 
    'PlayStation 4, Xbox One, PC, Nintendo Switch'
),

-- 15. Mass Effect Legendary Edition
(
    513256, 
    'Mass Effect Legendary Edition', 
    'Uma pessoa é tudo o que se interpõe entre a humanidade e a maior ameaça que ela já enfrentou. Reviva a lenda de Comandante Shepard.', 
    '2021-05-14', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/library_600x900.jpg', 
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/header.jpg', 
    'BioWare', 
    'Electronic Arts', 
    4.7, 90, 
    'PlayStation 4, Xbox One, PC'
);