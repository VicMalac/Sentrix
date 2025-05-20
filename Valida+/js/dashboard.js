document.addEventListener('DOMContentLoaded', () => {
  const boasVindas = document.getElementById('boas-vindas');
  const logoutLink = document.getElementById('logoutLink');
  const validarCartaoCard = document.getElementById('validarCartaoCard');
  const historicoCard = document.getElementById('historicoCard');

  // Verifica autenticação
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const db = firebase.firestore();
      try {
        const doc = await db.collection('usuarios').doc(user.uid).get();
        if (doc.exists && doc.data().nome) {
          boasVindas.textContent = `Bem-vindo, ${doc.data().nome}!`;
        } else {
          boasVindas.textContent = `Bem-vindo, ${user.email}!`;
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        boasVindas.textContent = `Bem-vindo, ${user.email}!`;
      }
    } else {
      window.location.href = "login.html";
    }
  });

  // Logout
  logoutLink?.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
    }).catch((error) => {
      console.error('Erro ao sair:', error);
    });
  });

  // Ações dos cards
  validarCartaoCard?.addEventListener('click', () => {
    window.location.href = "validador.html";
  });

  historicoCard?.addEventListener('click', () => {
    window.location.href = "historico.html";
  });
});
const indicaMaisCard = document.getElementById('indicaMaisCard');
indicaMaisCard?.addEventListener('click', () => {
  alert('O recurso Indica+ estará disponível em breve!');
});
const planisCard = document.getElementById('planisCard');
planisCard?.addEventListener('click', () => {
  alert("O recurso Planos estará disponível em breve!");
});
