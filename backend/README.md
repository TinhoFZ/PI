# STOG API

API Backend do projeto **STOG (Sistema de Turismo Online e Gamificado)**.

O STOG transforma o turismo em uma experiência gamificada de caça ao tesouro, permitindo que usuários explorem locais reais, encontrem tesouros virtuais, completem missões e recebam recompensas.

---

# Tecnologias Utilizadas

* Node.js
* Express.js
* MySQL
* JWT (JSON Web Token)
* bcrypt
* Postman

---

# URL Base

```http
http://localhost:3000
```

---

# Autenticação

A API utiliza autenticação via JWT.

Após realizar login, envie o token no cabeçalho das requisições protegidas:

```http
Authorization: Bearer SEU_TOKEN
```

---

# Endpoints

## Cadastro de Usuário

Cria uma nova conta.

### Requisição

```http
POST /auth/register
```

### Body

```json
{
    "name": "Eduardo",
    "email": "e@a.com",
    "password": "123456"
}
```

### Resposta

```json
{
    "message": "Usuário cadastrado com sucesso"
}
```

---

## Login

Autentica um usuário e retorna um token JWT.

### Requisição

```http
POST /auth/login
```

### Body

```json
{
    "email": "e@a.com",
    "password": "123456"
}
```

### Resposta

```json
{
    "token": "JWT_TOKEN"
}
```

---

# Zonas

As zonas representam áreas geográficas onde missões e tesouros podem ser encontrados.

## Listar Todas as Zonas

### Requisição

```http
GET /zones
```

### Autenticação

Não necessária.

### Resposta

```json
[
    {
        "zone_id": 1,
        "name": "Recife Antigo",
        "description": "Área histórica da cidade"
    }
]
```

---

# Missões

Missões são desafios que podem ser aceitos pelos usuários.

## Listar Todas as Missões

### Requisição

```http
GET /quests
```

### Autenticação

Não necessária.

### Resposta

```json
[
    {
        "quest_id": 1,
        "name": "Visite o Marco Zero"
    }
]
```

---

## Aceitar Missão

Associa uma missão ao usuário autenticado.

### Requisição

```http
POST /quests/:questId/accept
```

### Exemplo

```http
POST /quests/2/accept
```

### Cabeçalhos

```http
Authorization: Bearer JWT_TOKEN
```

### Resposta

```json
{
    "message": "Missão aceita com sucesso"
}
```

---

## Listar Minhas Missões

Retorna todas as missões aceitas pelo usuário autenticado.

### Requisição

```http
GET /quests/my-quests
```

### Cabeçalhos

```http
Authorization: Bearer JWT_TOKEN
```

### Resposta

```json
[
    {
        "quest_id": 2,
        "name": "Explorar Recife Antigo",
        "completed": false
    }
]
```

---

# Tesouros

Tesouros são itens virtuais colecionáveis associados às zonas.

## Listar Todos os Tesouros

### Requisição

```http
GET /treasures
```

### Cabeçalhos

```http
Authorization: Bearer JWT_TOKEN
```

### Resposta

```json
[
    {
        "treasure_id": 1,
        "name": "Bússola Dourada",
        "description": "Artefato de um antigo explorador"
    }
]
```

---

## Coletar Tesouro

Registra um tesouro como coletado pelo usuário autenticado.

### Requisição

```http
POST /treasures/:treasureId/collect
```

### Exemplo

```http
POST /treasures/2/collect
```

### Cabeçalhos

```http
Authorization: Bearer JWT_TOKEN
```

### Resposta

```json
{
    "message": "Tesouro coletado com sucesso"
}
```

---

# Estrutura do Banco de Dados

Principais entidades:

* users
* zones
* quests
* treasures
* user_quest
* user_treasure
* rewards
* user_reward
* partners

Relacionamentos:

* Uma zona pode possuir várias missões.
* Uma zona pode possuir vários tesouros.
* Um usuário pode aceitar várias missões.
* Um usuário pode coletar vários tesouros.
* Uma missão pode gerar recompensas.
* Recompensas podem ser atribuídas a usuários.

---

# Objetivo do MVP

A versão atual do sistema contempla:

* Cadastro de usuários
* Login com JWT
* Listagem de zonas
* Listagem de missões
* Aceitação de missões
* Consulta das missões do usuário
* Listagem de tesouros
* Coleta de tesouros

---

# Funcionalidades Futuras

Funcionalidades previstas para versões posteriores:

* Geolocalização em tempo real
* Geofencing
* Sistema de Lore (história principal)
* Sistema de recompensas
* Integração com parceiros comerciais
* Ranking de usuários
* Marketplace interno
* Proteção contra Fake GPS
* Funcionamento offline

---

# Testes

O projeto possui uma coleção Postman contendo:

* Cadastro de usuário
* Login
* Listagem de zonas
* Listagem de missões
* Aceitação de missões
* Consulta das missões do usuário
* Listagem de tesouros
* Coleta de tesouros

Antes de executar os testes, certifique-se de que a API esteja rodando em:

```http
http://localhost:3000
```
