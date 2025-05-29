# 💸 API de Sistema de Reembolso – Node.js

Este projeto bônus foi desenvolvido como parte do módulo de backend em Node.js. Ele consiste em uma API RESTful para gerenciar um sistema de **reembolsos**, fornecendo dados e funcionalidades para uma aplicação front-end.

A API implementa autenticação, autorização, manipulação de arquivos (upload de comprovantes), e tratamento de exceções. Além disso, utiliza o **Prisma** para abstração e gerenciamento do banco de dados relacional.

---

## 🚀 Funcionalidades

- ✅ Autenticação com geração de tokens JWT
- ✅ Criação de usuários e sessões
- ✅ Cadastro de reembolsos com comprovantes
- ✅ Upload e acesso a imagens de comprovantes
- ✅ Validações com [Zod]
- ✅ Tratamento de erros com `express-async-errors` e classe `AppError`
- ✅ Roteamento estruturado com organização RESTful

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- Zod
- Multer] (para upload de arquivos)
- express-async-errors
- JWT para autenticação

---

## 📡 Rotas da API

| Recurso     | Método | Rota                         | Descrição                                              |
|-------------|--------|------------------------------|--------------------------------------------------------|
| Sessões     | POST   | `/sessions`                  | Autentica o usuário e retorna o token JWT              |
| Usuários    | POST   | `/users`                     | Registra um novo usuário no sistema                    |
| Reembolsos  | GET    | `/refunds`                   | Lista todos os pedidos de reembolso                    |
| Reembolsos  | GET    | `/refunds/:id`               | Exibe os detalhes de um reembolso específico           |
| Reembolsos  | POST   | `/refunds`                   | Cria um novo pedido de reembolso com comprovante       |
| Uploads     | GET    | `/uploads/:filename`         | Retorna a imagem do comprovante via nome do arquivo    |

---

## 🔄 Exemplo de Fluxo de Uso

1. O usuário se autentica com `POST /sessions`
2. Registra um novo reembolso com `POST /refunds`, incluindo upload do comprovante
3. Consulta os reembolsos com `GET /refunds`
4. Visualiza o comprovante com `GET /uploads/:filename`

---

## 🧪 Tratamento de Erros

Para garantir respostas claras e organizadas, a API utiliza:

- `express-async-errors` para capturar exceções de forma automática
- Classe personalizada `AppError` para mensagens de erro específicas
- Middleware global para lidar com todos os erros da aplicação
- Validações com a biblioteca **Zod**, retornando mensagens específicas para entradas inválidas

---

## 📂 Upload de Arquivos

A API expõe arquivos públicos através da rota `/uploads`, utilizando o `app.use()` do Express para servir arquivos estáticos.

Ao fazer o upload de um comprovante (formato `.jpg`, `.png`, etc.), o backend salva o arquivo em uma pasta pública e retorna a URL de acesso, permitindo a visualização direta em navegador ou consumo pelo front-end.
