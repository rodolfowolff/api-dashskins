<!-- PROJECT -->
<br />
<p align="center">
  <h2 align="center">Api</h2>

  <p align="center">
    Implementar API com NestJS de um CRUD de usuarios usando banco de dados MongoDB.
  </p>
</p>

### Tecnologias Utilizadas

O projeto foi criado usando as tecnologias:

- [Typescript]
- [NestJs]
- [MongoDB]
- [Class Validator]
- [Jwt]

Para Teste

- [Vistest]

<!-- GETTING STARTED -->

A seguir estão as instruções para a instalação, configuração e uso do projeto.

### Configuração

1. Clonar o repositório

```sh
   git clone https://github.com/rodolfowolff/api-dashskins
```

2. Configuração das variaveis de ambiente

- Criar um arquivo na raiz do projeto, chamado [.env].

- Copiar o conteúdo do arquivo [.env.example] e configurar os dados conforme seus dados.

### Instalação e execução

1. Instalando os pacotes

```sh
    npm install
```

4. Executar localmente

```sh
    npm run dev
```

### Rodando aplicação localmente

No navegador, digitar <a href="http://localhost:3333/">http://localhost:3333/</a>.

No diretorio raiz da api, existe um arquivo com nome de client.http, o qual contem todas as rotas
para realizar as request, baixe o plugin REST Client

### Importante!

Deve ser criado um usuario usando a rota abaixo com os seguintes dados:

POST http://localhost:3333/users
Content-Type: application/json

{
"username": "admin",
"email": "admin@admin.com",
"age": 18,
"avatar": "https://i.pravatar.cc/150?img=50"
}

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<!-- LINKS -->

### Frontend link do projeto

<a href="https://github.com/rodolfowolff/web-dashskin">https://github.com/rodolfowolff/web-dashskin</a>

<!-- CONTACT -->

## 🐺 👨‍💻 Desenvolvedor

- [Rodolfo Wolff](https://github.com/rodolfowolff)
