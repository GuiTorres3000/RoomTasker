# Dia 1- Configuração de Ambiente

#### Banco de Dados
- Usuário:
	- id, nome, email, senha (hash)
- Tarefa:
	- id, titulo, status
- Tarefa_usuário:
	 - id_usuario e id_tarefa

PS: colocar o nome de tudo em inglês
#### Arquitetura (Passos pra Começar)

Backend (Passos pra começar)
- npm para express, pg (banco de dados),bcryptjs (hash),  cors (habilitar o CORS para interação entre back e front)
- (Recomendadas pelo chat gpt): 
	- jsonwebtoken  
	- dotenv (Lê variáveis de ambiente do .env pro Nodejs)

- npm para typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcryptjs -D

- npx tsc --init

Frontend (Passos pra Começar)
- npm create vite@latest
- npm install axios react-router-dom @types/react-router-dom

Dockerfile e Docker-compose
E README.md

### Arquitetura de Pastas
Referências para as pastas:
[Arquitetura de Pastas no Backend | Node.JS](https://www.youtube.com/watch?v=WIi2-KIHRdI)
Dev José Carlos Teles

[CRUD Full Stack com Node, React & MySQL](https://www.youtube.com/watch?v=voXTVTW73E8)
Will Dev

[Estrutura de pastas para ReactJS/React Native | Code/Drops #02](https://www.youtube.com/watch?v=X2RKRKdqqwM)
RocketSeat

Backend
	Src/
			app
			controllers
			models
			middleware
			routes
			services
	package.json
	tsconfig.json

Frontend
	Scr/
			assets
			components
			pages
			services
			styles
	index.tsx