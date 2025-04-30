document.addEventListener('DOMContentLoaded', () => {
  const db = firebase.firestore();
  let usuarioLogado = null; // Variável para guardar o user corretamente depois do carregamento

  const nomeInput = document.getElementById('nomeCartao');
  const numeroInput = document.getElementById('numeroCartao');
  const validadeInput = document.getElementById('validadeCartao');
  const cvvInput = document.getElementById('cvvCartao');

  const visualNome = document.getElementById('visualNome');
  const visualNumero = document.getElementById('visualNumero');
  const visualValidade = document.getElementById('visualValidade');
  const visualCVV = document.getElementById('visualCVV');
  const cartaoContainer = document.getElementById('cartaoContainer');

  // Atualizar cartão em tempo real
  nomeInput.addEventListener('input', () => {
    visualNome.textContent = nomeInput.value || "Nome no Cartão";
  });

  numeroInput.addEventListener('input', () => {
    let valor = numeroInput.value.replace(/\D/g, '').slice(0, 16);
    numeroInput.value = valor.replace(/(.{4})/g, '$1 ').trim();
    visualNumero.textContent = numeroInput.value || "0000 0000 0000 0000";
  });  

  validadeInput.addEventListener('input', () => {
    validadeInput.value = validadeInput.value.replace(/\D/g, '').slice(0, 4); // só números
    const v = validadeInput.value;
    if (v.length === 4) {
      const mes = v.substring(0, 2);
      const ano = v.substring(2);
      visualValidade.textContent = `${mes}/${ano}`;
    } else {
      visualValidade.textContent = "MM/AAAA";
    }
  });

  cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
    visualCVV.textContent = cvvInput.value || "CVV";
  });

  // Flip no cartão ao focar CVV
  cvvInput.addEventListener('focus', () => {
    cartaoContainer.classList.add('flipped');
  });

  cvvInput.addEventListener('blur', () => {
    cartaoContainer.classList.remove('flipped');
  });
  // Flip ao clicar nos campos (frente/verso)
nomeInput.addEventListener('focus', () => {
  document.getElementById('cartaoContainer').classList.remove('flipped');
});

numeroInput.addEventListener('focus', () => {
  document.getElementById('cartaoContainer').classList.add('flipped');
});

validadeInput.addEventListener('focus', () => {
  document.getElementById('cartaoContainer').classList.add('flipped');
});


  // Verificar quando o usuário for autenticado
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      usuarioLogado = user;
    } else {
      usuarioLogado = null;
    }
  });

  // Submit de validação
  document.getElementById('cartaoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!usuarioLogado) {
      alert('Você não está logado. Atualize a página ou faça login.');
      return;
    }

    const nome = nomeInput.value.trim();
    const numero = numeroInput.value.trim();
    const validadeAtual = validadeInput.value.trim();

    if (!nome || !numero || !validadeAtual) {
      alert('Preencha todos os campos!');
      return;
    }

    const partes = validadeAtual.split("-");
    const novaValidade = `${partes[1]}/${parseInt(partes[0]) + 2}`;

    try {
      await db.collection('usuarios').doc(usuarioLogado.uid).collection('cartoes').add({
        nome: nome,
        numero: numero,
        novaValidade: novaValidade,
        criadoEm: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert('Cartão validado e salvo com sucesso!');
      document.getElementById('cartaoForm').reset();
      visualNome.textContent = "Nome no Cartão";
      visualNumero.textContent = "0000 0000 0000 0000";
      visualValidade.textContent = "MM/AAAA";
      visualCVV.textContent = "CVV";

    } catch (error) {
      console.error('Erro ao salvar no Firestore:', error);
      alert('Erro ao validar cartão. Tente novamente.');
    }
  });
});
