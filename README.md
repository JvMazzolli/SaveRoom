# SaveRoom

markdown
Backlog de Jogos - Ambiente Docker

Este projeto contém a configuração Docker e o script SQL para inicializar o banco de dados do sistema de backlog de jogos.

---

## ⚙️ Pré-requisitos
Antes de começar, instale:
- **PostgreSQL**
- **Docker Desktop**
- **pgAdmin**

---

## 🚀 Como rodar

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd SaveRoom

## Suba os containers
    
    docker-compose up --build

## Configure o pgAdmin
    Configure o pgAdmin:

Abra o pgAdmin.

Clique com o botão direito em Servers → Registrar → Server.

Preencha os campos:

Aba General

Name: backlogjogos

Aba Connection

Host name/address: localhost

Port: 5491

Maintenance database: postgres

Username: postgresql

Password: postgres