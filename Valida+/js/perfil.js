document.addEventListener('DOMContentLoaded', () => {
  const perfilForm = document.getElementById('perfilForm');
  const salvarBtn = document.getElementById('salvarPerfil');
  const mensagemErro = document.getElementById('mensagem-erro');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');
  const db = firebase.firestore();

  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "../index.html";
      return;
    }

    // Preencher dados existentes
    try {
      const doc = await db.collection('usuarios').doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data();
        if (data.nome) document.getElementById('nome').value = data.nome;
        if (data.telefone) document.getElementById('telefone').value = data.telefone;
        if (data.nascimento) document.getElementById('nascimento').value = data.nascimento;
      }
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
    }

    // Atualizar dados ao enviar o formulário
    perfilForm?.addEventListener('submit', async function (event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const nascimento = document.getElementById('nascimento').value;

      mensagemErro.classList.add('d-none');
      mensagemSucesso.classList.add('d-none');

      try {
        await db.collection('usuarios').doc(user.uid).set({
          nome,
          telefone,
          nascimento
        });
        mostrarSucesso("Perfil atualizado com sucesso!");
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        mostrarErro("Erro ao atualizar perfil. Tente novamente.");
      }
    });
  });

  // Logout
  const logoutLink = document.getElementById('logoutLink');
  logoutLink?.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      window.location.href = "../index.html";
    }).catch((error) => {
      console.error('Erro ao sair:', error);
    });
  });

  function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.classList.remove('d-none');
  }

  function mostrarSucesso(mensagem) {
    mensagemSucesso.textContent = mensagem;
    mensagemSucesso.classList.remove('d-none');
  }
});
