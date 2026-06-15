STOG API - Coleção Postman

Coleção Postman oficial da API do projeto STOG.

Esta coleção foi criada para facilitar os testes dos endpoints disponíveis no backend, incluindo autenticação, gerenciamento de missões, tesouros e zonas de exploração.

Requisitos

Antes de utilizar a coleção, certifique-se de possuir:

Postman instalado
API STOG em execução
Banco de dados configurado
Usuário cadastrado para autenticação
Configuração do Ambiente

Crie um Environment no Postman com as seguintes variáveis:

Variável	Valor Exemplo
baseUrl	http://localhost:3000
token	


Após realizar login, copie o token JWT retornado pela API e salve-o na variável token.

Autenticação

A API utiliza autenticação JWT.

Todas as rotas protegidas utilizam o cabeçalho:

Authorization: Bearer {{token}}
Estrutura da Coleção
Auth
Register User

Cria um novo usuário.

POST {{baseUrl}}/auth/register

Exemplo de body:

{
  "name": "Eduardo",
  "email": "e@a.com",
  "password": "123456"
}
Login User

Autentica um usuário e retorna um token JWT.

POST {{baseUrl}}/auth/login

Exemplo de body:

{
  "email": "e@a.com",
  "password": "123456"
}
Get Current User

Retorna os dados do usuário autenticado.

GET {{baseUrl}}/me
Zones
Get All Zones

Lista todas as zonas cadastradas.

GET {{baseUrl}}/zones
Quests
Get All Quests

Lista todas as missões disponíveis.

GET {{baseUrl}}/quests
Accept Quest

Aceita uma missão para o usuário autenticado.

POST {{baseUrl}}/quests/{questId}/accept

Exemplo:

POST {{baseUrl}}/quests/2/accept
My Quests

Lista as missões aceitas pelo usuário autenticado.

GET {{baseUrl}}/quests/my-quests
Treasures
Get All Treasures

Lista todos os tesouros disponíveis.

GET {{baseUrl}}/treasures
Collect Treasure

Registra a coleta de um tesouro.

POST {{baseUrl}}/treasures/{treasureId}/collect

Exemplo:

POST {{baseUrl}}/treasures/2/collect
Fluxo Recomendado de Testes
1. Registrar Usuário

Execute:

POST /auth/register
2. Realizar Login

Execute:

POST /auth/login

Copie o token retornado.

3. Atualizar Variável JWT

Cole o token recebido na variável:

token
4. Testar Rotas Protegidas

Após configurar o token, execute:

Get Current User
Accept Quest
My Quests
Get All Treasures
Collect Treasure
Funcionalidades Cobertas

A coleção permite testar:

Cadastro de usuários
Login JWT
Consulta do usuário autenticado
Listagem de zonas
Listagem de missões
Aceitação de missões
Consulta das missões do usuário
Listagem de tesouros
Coleta de tesouros
Projeto STOG

O STOG (Sistema de Turismo Online e Gamificado) é uma plataforma de turismo gamificado baseada em exploração geográfica, coleta de tesouros virtuais, missões e recompensas digitais.

O objetivo do MVP é validar o núcleo da aplicação através da integração entre autenticação, missões, tesouros e zonas de exploração.