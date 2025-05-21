document.addEventListener('DOMContentLoaded', () => {
  const db = firebase.firestore();
  let usuarioLogado = null;

  const nomeInput = document.getElementById('nomeCartao');
  const numeroInput = document.getElementById('numeroCartao');
  const validadeInput = document.getElementById('validadeCartao');
  const cvvInput = document.getElementById('cvvCartao');

  const visualNome = document.getElementById('visualNome');
  const visualNumero = document.getElementById('visualNumero');
  const visualValidade = document.getElementById('visualValidade');
  const visualCVV = document.getElementById('visualCVV');
  const cartaoContainer = document.getElementById('cartaoContainer');

  nomeInput.addEventListener('input', () => {
    visualNome.textContent = nomeInput.value || "Nome no Cartão";
  });

  numeroInput.addEventListener('input', () => {
    let valor = numeroInput.value.replace(/\D/g, '').slice(0, 16);
    numeroInput.value = valor.replace(/(.{4})/g, '$1 ').trim();
    visualNumero.textContent = numeroInput.value || "0000 0000 0000 0000";
  });

  validadeInput.addEventListener('input', () => {
  let valor = validadeInput.value.replace(/\D/g, '').slice(0, 4);

  let mes = valor.substring(0, 2);
  let ano = valor.substring(2, 4);

  if (mes.length === 2 && parseInt(mes) > 12) mes = '12';
  if (mes.length === 2 && parseInt(mes) < 1) mes = '01';

  let formatado = mes;
  if (ano) formatado += '/' + ano;

  validadeInput.value = formatado;
  visualValidade.textContent = formatado || "MM/AAAA";
});



  cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
    visualCVV.textContent = cvvInput.value || "CVV";
  });

  cvvInput.addEventListener('focus', () => cartaoContainer.classList.add('flipped'));
  cvvInput.addEventListener('blur', () => cartaoContainer.classList.remove('flipped'));
  nomeInput.addEventListener('focus', () => cartaoContainer.classList.remove('flipped'));
  numeroInput.addEventListener('focus', () => cartaoContainer.classList.add('flipped'));
  validadeInput.addEventListener('focus', () => cartaoContainer.classList.add('flipped'));

  firebase.auth().onAuthStateChanged(user => {
    usuarioLogado = user || null;
  });

  document.getElementById('cartaoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!usuarioLogado) {
      alert("Você não está logado.");
      return;
    }

    const nome = nomeInput.value.trim();
    const numero = numeroInput.value.trim();
    const validadeDigitada = validadeInput.value.trim();
    const cvv = cvvInput.value.trim();

    if (!nome || !numero || !validadeDigitada || !cvv) {
      alert("Preencha todos os campos.");
      return;
    }

    const [mesStr, anoStr] = validadeDigitada.split('/');
    const mes = parseInt(mesStr);
    let ano = parseInt(anoStr);

    const agora = new Date();
    const anoAtual = agora.getFullYear() % 100;
    const novaValidade = (ano < anoAtual)
      ? `${mesStr}/${(agora.getFullYear() + 2).toString().slice(-2)}`
      : `${mesStr}/${anoStr}`;

    try {
      await db.collection('usuarios')
        .doc(usuarioLogado.uid)
        .collection('cartoes')
        .add({
          nome,
          numero,
          novaValidade,
          cvv,
          criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

      alert("Cartão salvo com sucesso.");

      document.getElementById('cartaoForm').reset();
      visualNome.textContent = "Nome no Cartão";
      visualNumero.textContent = "0000 0000 0000 0000";
      visualValidade.textContent = "MM/AAAA";
      visualCVV.textContent = "CVV";

    } catch (err) {
      console.error("Erro ao salvar cartão:", err);
      alert("Erro ao validar cartão.");
    }
  });
});
