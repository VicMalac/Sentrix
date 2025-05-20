document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const mensagemErro = document.getElementById('mensagem-erro');

  registerForm?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('registerEmail').value.trim();
    const senha = document.getElementById('registerSenha').value.trim();

    mensagemErro.classList.add('d-none');

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, senha);
      window.location.href = "login.html";
    } catch (error) {
      mensagemErro.textContent = traduzirErro(error.code);
      mensagemErro.classList.remove('d-none');
    }
  });

  function traduzirErro(code) {
    switch (code) {
      case 'auth/email-already-in-use': return 'E-mail já cadastrado.';
      case 'auth/weak-password': return 'Senha muito fraca (mínimo 6 caracteres).';
      case 'auth/invalid-email': return 'E-mail inválido.';
      default: return 'Erro desconhecido: ' + code;
    }
  }
});
