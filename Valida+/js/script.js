document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const erroBox = document.getElementById('mensagem-erro');
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.location.href = "pages/dashboard.html";
      }
    });
  
    loginForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
  
      erroBox.classList.add('d-none');
  
      try {
        await firebase.auth().signInWithEmailAndPassword(email, senha);
        window.location.href = "pages/dashboard.html";
      } catch (error) {
        erroBox.textContent = traduzirErro(error.code);
        erroBox.classList.remove('d-none');
      }
    });
  
    function traduzirErro(code) {
      switch (code) {
        case 'auth/user-not-found': return 'E-mail não encontrado.';
        case 'auth/wrong-password': return 'Senha incorreta.';
        case 'auth/too-many-requests': return 'Muitas tentativas. Tente mais tarde.';
        case 'auth/invalid-email': return 'E-mail inválido.';
        default: return 'E-mail ou senha incorreto.';
      }
    }
  });
  