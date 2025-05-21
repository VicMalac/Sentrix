# 💳 Valida+

**Renove seu cartão. Economize tempo. Evite burocracias.**

[🌐 Acesse agora](https://validamais.netlify.app/)

---

## 📌 Visão Geral

**Valida+** é uma plataforma web que permite aos usuários **prolongar a validade de seus cartões bancários** por mais 2 anos, de forma segura e rápida, evitando a emissão de novos cartões físicos. Desenvolvido com foco em praticidade, sustentabilidade e integração com os principais bancos brasileiros.

---

## 🚀 Acesse Online

A forma mais simples de utilizar o Valida+ é acessando diretamente:

**🔗 https://validamais.netlify.app/**

---

## 🛠️ Como Rodar Localmente (Passo a Passo)

---

### ✅ Pré-requisitos

Antes de tudo, certifique-se de ter:

- Um navegador moderno (Chrome, Firefox, Edge, etc)
- Git instalado na sua máquina 👉 [Download Git](https://git-scm.com/downloads)
- Um editor de código (opcional, mas recomendado) como o [Visual Studio Code](https://code.visualstudio.com/)

---

## 1. Clonar o Repositório



Abra o terminal (ou Prompt de Comando no Windows) e digite:

```bash
git clone https://github.com/VicMalac/Sentrix.git
```

Isso vai criar uma pasta validamais/ com os arquivos do projeto.


## Firebase: 
Conecte ao seu próprio projeto (opcional, porém não irá conseguir ver os dados se não colocar)
O sistema já vem conectado a um Firebase funcional para testes, mas se quiser salvar e visualizar seus próprios dados, siga os passos abaixo:

👉 Passos para usar seu Firebase:
Acesse https://console.firebase.google.com

Crie um novo projeto

No menu lateral, vá em Authentication → Habilite o Email/Password

Vá em Firestore Database → Crie o banco (modo de teste)

Clique em Configurar Firebase SDK e copie os dados da sua configuração:

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};