CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfil (
    id_perfil SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
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
    publicadora VARCHAR(150)
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